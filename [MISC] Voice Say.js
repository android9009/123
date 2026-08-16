

UI.AddLabel("        ==Custom Kill Voice==");

UI.AddCheckbox("Enable Custom Kill Voice");
UI.AddTextbox("Normal Kill");
UI.AddCheckbox("HS Sound");
UI.AddTextbox("HS Kill");

UI.AddCheckbox("Enable Custom Button Voice");
UI.AddCheckbox("Play Sound");
UI.AddTextbox("Button Sound Name");

UI.AddCheckbox("Loopback");
UI.AddSliderFloat("Sound Length", 0.0, 10.0);

UI.AddLabel("====================");

var playing = false;
var started = 0.0

function ui(){
    if(GetScriptOption("Enable Custom Kill Voice")){
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Normal Kill", true);
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "HS Sound", true);
    }else{
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Normal Kill", false);
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "HS Sound", false);
    }
   
    if(GetScriptOption("HS Sound") && GetScriptOption("Enable Custom Kill Voice")){
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "HS Kill", true);
    }
    else UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "HS Kill", false);
   
    if(GetScriptOption("Enable Custom Button Voice")){
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Play Sound", true);
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Button Sound Name", true);
    }else{
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Play Sound", false);
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Button Sound Name", false);
    }
}

function GetScriptOption(Name)
{
    var Value = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", Name);
    return Value;
}

function PlayVoice()
{
    if (!GetScriptOption("Enable Custom Kill Voice")) return;
    if (Entity.GetEntityFromUserID(Event.GetInt("attacker")) !== Entity.GetLocalPlayer()) return;
    if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) return;
    if (UI.GetString("Misc", "JAVASCRIPT", "Script Items", "Button Sound Name").localeCompare("") == 0) return;

    started = Global.Realtime();
    playing = true;
    if (GetScriptOption("Loopback"))
    {
        Global.ExecuteCommand("voice_loopback 1");
    }
   
    if(Event.GetString("headshot").localeCompare("1") === 0 && GetScriptOption("HS Sound") === 1){
        Sound.PlayMicrophone('C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\voice_input\\' + UI.GetString("Misc", "JAVASCRIPT", "Script Items", "HS Kill"));
    } else{
        Sound.PlayMicrophone('C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\voice_input\\' + UI.GetString("Misc", "JAVASCRIPT", "Script Items", "Normal Kill"));
    }
   
}

function playOnKey(){
   
    if (!GetScriptOption("Enable Custom Button Voice")) return;
    if (GetScriptOption("Play Sound") == false) return;
    UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Play Sound", false);
    if (UI.GetString("Misc", "JAVASCRIPT", "Script Items", "Button Sound Name").localeCompare("") == 0) return;
   
    started = Global.Realtime();
    playing = true;
   
    if (GetScriptOption("Loopback"))
    {
        Global.ExecuteCommand("voice_loopback 1");
    }
   
    Sound.PlayMicrophone('C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\voice_input\\' + UI.GetString("Misc", "JAVASCRIPT", "Script Items", "Button Sound Name"));
   
}

function Reset()
{
    if (playing && Math.abs(started + GetScriptOption("Sound Length") - Global.Realtime()) < 0.05)
    {
        playing = false;
        Sound.StopMicrophone();
        Global.ExecuteCommand("voice_loopback 0");
    }
}

Global.RegisterCallback("Draw", "ui");
Global.RegisterCallback("player_death", "PlayVoice");
Global.RegisterCallback("Draw", "playOnKey");
Global.RegisterCallback("FrameStageNotify", "Reset");

