UI.AddLabel("+----- Fake Flick onKey -----+");
UI.AddHotkey("Fake Flick");
UI.AddSliderInt("X Offset", 0, Render.GetScreenSize()[0]);
UI.AddSliderInt("Y Offset", 0, Render.GetScreenSize()[1]);
color = UI.AddColorPicker("Indicator Color");
UI.AddLabel("+--------------------------------+");
function onFSN(){
    val = UI.GetValue("Rage", "Exploits", "Extras");
    if(UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Fake Flick")){
        UI.SetValue("Rage", "Exploits", "Extras", (val & 64) ? val : val + 64);
    }
    else{
        UI.SetValue("Rage", "Exploits", "Extras", (val & 64) ? val - 64 : val);
    }
}
function onDraw(){
    x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "X Offset");
    y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Y Offset");
    color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Indicator Color");
    if(UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Fake Flick")) Render.String(x, y, 0, "Fake Flick", color);
}
Cheat.RegisterCallback("FrameStageNotify", "onFSN");
Cheat.RegisterCallback("Draw", "onDraw");