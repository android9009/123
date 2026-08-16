const keybinds_x = UI.AddSliderInt("keybinds_x", 0, Global.GetScreenSize()[0])
const keybinds_y = UI.AddSliderInt("keybinds_y", 0, Global.GetScreenSize()[1])

function in_bounds(vec, x, y, x2, y2)
{
   return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

 function xy()
 {
     UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "keybinds_x", false)
     UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "keybinds_y", false)
 }
 xy();

function keybinds()
 {

     
     var watermark_name = Entity.GetName(Entity.GetLocalPlayer( ));
     var today = new Date();
     var hours1 = today.getHours();
     var minutes1 = today.getMinutes();
     var seconds1 = today.getSeconds();
     var localplayer_index = Entity.GetLocalPlayer();
     var velocity = Entity.GetProp(localplayer_index, "CBasePlayer", "m_vecVelocity[0]");
     var speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
     var finalspeed = Math.min( 9999, speed ) + 0.2
     var hours = hours1 <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":";
     var minutes = minutes1 <= 9 ? "0" + today.getMinutes() + ":" : today.getMinutes() + ":";
     var seconds = seconds1 <= 9 ? "0" + today.getSeconds() : today.getSeconds()    ;
     const tickrate = Globals.Tickrate();
     const ping = Math.floor(Global.Latency() * 1000 / 1.5);
     const fps = Math.floor( 1 / Global.Frametime() );
     var h = [];
     const fontpixel = Render.AddFont( "circe", 12, 100);
     const fontpixel1 = Render.AddFont( "circe bold", 13, 100);
     const fontpixel2 = Render.AddFont( "Circe extrabold", 12, 100);

     if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
       h.push("Slow walk")
     }
     if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
       h.push("Fake duck")
     }
     if (UI.IsHotkeyActive("Misc", "General", "Movement", "Auto peek")) {
       h.push("Auto peek")
     }
     if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
       h.push("Inverter")
     }
     if (UI.IsHotkeyActive("Rage", "General", "General", "Force safe point")) {
       h.push("Safe point")
     }
     if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Minimum damage override")) {
       h.push("Dmg override")
     }
     if (UI.IsHotkeyActive("Rage", "General", "General", "Force body aim")) {
       h.push("Body aim")
     }
     if (UI.IsHotkeyActive("Rage", "Exploits", "Double tap")) {
       h.push("Double Tap")
     }
     if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Desync on shot")) {
       h.push("On shot anti-aim")
     }
     if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {
       h.push("Hide shots")
     }
     if (UI.IsHotkeyActive("Legit", "GENERAL", "Triggerbot", "Enabled")) {
       h.push("Triggerbot")
     }

     const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_x"),
           y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_y");

     const rainbow = [
         Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
         Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
         Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
         255
     ];

     Render.FilledRect(1547, 8	, 362, 22, [0, 20, 20, 255]);
     Render.FilledRect(1548, 7	, 360, 2, [0, 20, 20, 255]);
     Render.FilledRect(1549, 6	, 358, 2, [0, 20, 20, 255]);
     Render.FilledRect(1548, 30	, 360, 2, [0, 20, 20, 255]);
     Render.FilledRect(1549, 31	, 358, 2, [0, 20, 20, 255]);
     Render.StringCustom(1555, 9, 0, "NEVERLOSE", [0, 191, 255, 255], fontpixel2);
     Render.StringCustom(1556, 10, 0, "NEVERLOSE", [255, 255, 255, 255], fontpixel2);
     Render.StringCustom(1652, 10, 0, "|                 |          |              |", [0, 60, 60, 255], fontpixel);
     Render.StringCustom(1656, 10, 0, " Phantom   " + ping + " ms   " + tickrate + " tick   " + hours + minutes + seconds, [255, 255, 255, 255], fontpixel);
     Render.FilledRect(x, y, 200, 26, [0, 0, 10, 255]);
     Render.FilledRect(x, y + 24, 200, 2, [255, 255, 255, 100]);
     Render.FilledRect(x + 1, y - 1, 198, 2, [0, 0, 10, 255]);
     Render.FilledRect(x + 2, y - 2, 196, 2, [0, 0, 10, 255]);
     Render.StringCustom(x + 39, y - 0, 0, "Binds", [255, 255, 255, 255], fontpixel1);
     Render.StringCustom(x + 9, y + 0, 0, "NL", [0, 191, 255, 255], fontpixel2);
     Render.StringCustom(x + 10, y + 1, 0, "NL", [255, 255, 255, 255], fontpixel2);
     Render.FilledRect(x + 0, y + 25, 200, 24 + 20 * (h.length - 1), [0,0,0, 10])
     for (i = 0; i < h.length; i++)
     {
        Render.StringCustom(x + 4, y + 25 + 20 * i, 0, h[i], [255, 255, 255, 255], fontpixel);
        Render.StringCustom(x + 176, y + 25 + 20 * i, 0, "on", [255, 255, 255, 255], fontpixel);
     }

     if (Global.IsKeyPressed(1)) {
         const mouse_pos = Global.GetCursorPosition();
         if (in_bounds(mouse_pos, x, y, x + 200, y + 30)) {
          if (UI.IsMenuOpen( ) == false)
            return;
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_x", mouse_pos[0] - 100);
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_y", mouse_pos[1] - 20);
         }
     }

 }

Global.RegisterCallback("Draw", "keybinds");