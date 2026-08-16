UI.AddSliderInt("x offset[ind]", 0, Render.GetScreenSize()[0])
UI.AddSliderInt("y offset[ind]", 0, Render.GetScreenSize()[1])
UI.AddColorPicker("Color[ind]")
localplayer_index = Entity.GetLocalPlayer( );
localplayer_alive = Entity.IsAlive( localplayer_index );
//var jitternewoffset = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
//var yawoffset = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
var TriggerLim = UI.GetValue("Anti-Aim", "Fake-Lag", "Trigger imit");
var Lim = UI.GetValue("Anti-Aim", "Fake-Lag", "Limit");
UI.IsHotkeyActive("Anti-Aim", "Rage Anti-Aim", "At targets", true)
UI.IsHotkeyActive("Anti-Aim", "Rage Anti-Aim", "At targets", false)

function randomIntFrom(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
function aa(){

    jitternewoffset =  randomIntFrom(-100, 100)
    yawoffset = randomIntFrom(-20, 20)
    Lim = 12
    TriggerLim = 14;
    
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitternewoffset);
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawoffset);
    UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", false);
    UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
    UI.SetValue("Anti-Aim", "Fake angles", "Desync on shot", true);

    
    
    // Fake Lag
    UI.SetValue("Anti-Aim", "Fake-Lag", "Trigger limit", TriggerLim);
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit",Lim);
}
function paint()
{
  
    var x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "x offset[ind]")
    var y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "y offset[ind]")
    Render.FilledRect(x, y, 160, 93, [17,17,17,125])
    Render.FilledRect(x, y, 160, 25, [17,17,17,255])
    Render.FilledRect(x, y, 160, 2, UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Color[ind]"))
   // Render.FilledRect(x, y+93, 160, 2, UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Color[ind]"))
    Render.String(x+30,y+8, 0, "[ax1osync] info", [255,255,255,255],10)
      
        Render.String(x+5, y+5+ 25, 0, "Yaw:" + UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset"), [0, 255, 0, 255] , 8)
        Render.String(x+5, y+5+40, 0, "Jitter:" + UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset"), [255, 255, 255, 255], 8)
            if (UI.IsHotkeyActive("Anti-Aim", "Rage Anti-Aim", "At targets"))
        {
             Render.String(x+5, y + 60, 0, "Targeting: true" , [255, 255, 255, 255], 8)
        }
            else {
            Render.String(x+5, y + 60, 0, "Targeting: false" ,  [255, 255, 255, 255], 8)
        }
             if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter"))
        {
            Render.String(x+5, y + 60 + 15, 0, "Desync: left"  , [0, 255, 0, 255], 8) 
        }
            else
        Render.String(x+5, y + 60 + 15, 0, "Desync: right "  , [0, 255, 0, 255], 8)
    }
 
Cheat.RegisterCallback("CreateMove", "aa");
Cheat.RegisterCallback("Draw", "paint")