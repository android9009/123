    //
     UI.AddCheckbox("Hot-Keys");
     UI.AddCheckbox("Spectator-List");
     UI.AddColorPicker("Header Text Color");
     UI.AddColorPicker("Active Text Color");
     UI.AddColorPicker("Logo Color");
     UI.AddLabel(" ");
     UI.AddColorPicker("Top Bar Color");
     UI.AddColorPicker("Bottom Bar Color");
     UI.SetColor("Script items", "Bottom Bar Color", [2, 23, 37, 255 ]);
     UI.SetColor("Script items", "Top Bar Color", [4, 13, 25, 255 ]);
     UI.SetColor("Script items", "Logo Color", [45, 121, 126, 255]);
     UI.SetColor("Script items", "Active Text Color", [255, 255, 255, 255]);
     UI.SetColor("Script items", "Header Text Color", [255, 255, 255, 255]);
     //
     const Binds_x = UI.AddSliderInt("Binds_x", 0, Global.GetScreenSize()[0])
     const Binds_y = UI.AddSliderInt("Binds_y", 0, Global.GetScreenSize()[1])
     const Bindss_x = UI.AddSliderInt("Bindss_x", +40, Global.GetScreenSize()[0])
     const Bindss_y = UI.AddSliderInt("Bindss_y", +40, Global.GetScreenSize()[1])
     UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Binds_x", false)
     UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Binds_y", false)
     UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Bindss_x", false)
     UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Bindss_y", false)
     var screensize = Global.GetScreenSize();
     //
function in_bounds(vec, x, y, x2, y2)
{
     return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}
function values(name) {
     var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", name);
     return value;
} 
function HotkeyersXD() {
         const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Binds_x"),
         y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Binds_y");
         //Color
         Color = UI.GetColor("Script items","Header Text Color");
         Color2 = UI.GetColor("Script items","Active Text Color");
         ColorLogo = UI.GetColor("Script items","Logo Color");
         ColorTop = UI.GetColor("Script items","Top Bar Color");
         ColorBottom = UI.GetColor("Script items","Bottom Bar Color");

     var h = [];

     if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
       h.push("Slow walk")
     }
     if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
       h.push("Fake Duck")
     }
     if (UI.IsHotkeyActive("Misc", "General", "Movement", "Auto peek")) {
       h.push("Auto peek")
     }
     if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
       h.push("Anti-Aim invert")
     }
     if (UI.IsHotkeyActive("Rage", "General", "General", "Safe point override")) {
       h.push("Safe point override")
     }
     if (UI.IsHotkeyActive("Rage", "Pistol", "Pistol config", "Hitbox override")) {
       h.push("Hitbox override")
	 }
	 if (UI.IsHotkeyActive("Rage", "General", "Force body aim")) {
		 h.push("Force body aim")
     }
     if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap")) {
       h.push("Doubletap")
     }
     if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {
       h.push("Hide shots")
     }
     if (UI.IsHotkeyActive("Legit", "GENERAL", "Triggerbot", "Enabled")) {
       h.push("Triggerbot")
     }

     if (!UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Hot-Keys"))

        return;
        //Light bottom
        Render.FilledRect(x + 78, y + 26, 250, 60 + 30 * (h.length - 1), ColorBottom);
        //Dark Top rectangle
        Render.FilledRect( x + 78, y + 26, 250, 30, ColorTop );
        //Logo
        Render.Circle( x + 94, y + 39, 6, ColorLogo );
        Render.Circle( x + 94, y + 39, 9, ColorLogo );
        Render.Circle( x + 94, y + 39, 3, ColorLogo );
        //Line top
        Render.Line( x + 93, y + 30, x + 93, y + 36, ColorLogo);
        Render.Line( x + 94, y + 30, x + 94, y + 36, ColorLogo);
        Render.Line( x + 95, y + 30, x + 95, y + 36, ColorLogo);
        //Line bottom
        Render.Line( x + 95, y + 42, x + 95, y + 48, ColorLogo);
        Render.Line( x + 94, y + 42, x + 94, y + 48, ColorLogo);
        Render.Line( x + 93, y + 42, x + 93, y + 48, ColorLogo);
        //line left
        Render.Line( x + 85, y + 38, x + 91, y + 38, ColorLogo);
        Render.Line( x + 85, y + 39, x + 91, y + 39, ColorLogo);
        Render.Line( x + 85, y + 40, x + 91, y + 40, ColorLogo);
        //Line Right
        Render.Line( x + 97, y + 38, x + 103, y + 38, ColorLogo);
        Render.Line( x + 97, y + 39, x + 103, y + 39, ColorLogo);
        Render.Line( x + 97, y + 40, x + 103, y + 40, ColorLogo);
        //Binds text
        Render.String(x + 110, y + 33, 0, "Binds", Color, 4, 3);
        //Logo ENd
      
        //Render Active Keybind
     for (i = 0; i < h.length; i++) {
        Render.String(x + 80, y + 65 + 25 * i, 0, h[i], Color2,4, 3);
        Render.String(x + 273, y + 65 + 25 * i, 0, "toggled", Color2,4, 3);
     }
        //Move menu
        if (Global.IsKeyPressed(1)) {
         const mouse_pos = Global.GetCursorPosition();
         if (in_bounds(mouse_pos, x, y, x + 320, y + 110)) {
          if (UI.IsMenuOpen( ) == false)
            return;
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Binds_x", mouse_pos[0] - 200);
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Binds_y", mouse_pos[1] - 60);
         }
     }

}
function get_spectators() {
    var specs = [];
    const players = Entity.GetPlayers();
    for (i = 0; i < players.length; i++) {
        const cur = players[i];
        if (Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget") != "m_hObserverTarget") {
            const obs = Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget")

            if (obs === Entity.GetLocalPlayer())
            {
                const name = Entity.GetName(cur);
                specs.push(name);
            }}}
return specs;
}
function Spectatorss() {
        const names = get_spectators();
         const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Bindss_x"),
         y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Bindss_y");
         //Color
         Color = UI.GetColor("Script items","Header Text Color");
         Color2 = UI.GetColor("Script items","Active Text Color");
         ColorLogo = UI.GetColor("Script items","Logo Color");
         ColorTop = UI.GetColor("Script items","Top Bar Color");
         ColorBottom = UI.GetColor("Script items","Bottom Bar Color");

        if (!UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Spectator-List"))

        return;
        //Light bottom
        Render.FilledRect(x + 78, y + 26, 125, 60 + 30 * (names.length - 1), ColorBottom);
        //Dark Top rectangle
        Render.FilledRect( x + 78, y + 26, 125, 30, ColorTop );
        //Logo
        Render.Circle( x + 94, y + 39, 6, ColorLogo );
        Render.Circle( x + 94, y + 39, 9, ColorLogo );
        Render.Circle( x + 94, y + 39, 3, ColorLogo );
        //Line top
        Render.Line( x + 93, y + 30, x + 93, y + 36, ColorLogo);
        Render.Line( x + 94, y + 30, x + 94, y + 36, ColorLogo);
        Render.Line( x + 95, y + 30, x + 95, y + 36, ColorLogo);
        //Line bottom
        Render.Line( x + 95, y + 42, x + 95, y + 48, ColorLogo);
        Render.Line( x + 94, y + 42, x + 94, y + 48, ColorLogo);
        Render.Line( x + 93, y + 42, x + 93, y + 48, ColorLogo);
        //line left
        Render.Line( x + 85, y + 38, x + 91, y + 38, ColorLogo);
        Render.Line( x + 85, y + 39, x + 91, y + 39, ColorLogo);
        Render.Line( x + 85, y + 40, x + 91, y + 40, ColorLogo);
        //Line Right
        Render.Line( x + 97, y + 38, x + 103, y + 38, ColorLogo);
        Render.Line( x + 97, y + 39, x + 103, y + 39, ColorLogo);
        Render.Line( x + 97, y + 40, x + 103, y + 40, ColorLogo);
        //Spectators text
        Render.String(x + 110, y + 33, 0, "Spectators", Color, 4, 3);
      
        //Logo ENd
      
        //Render Active Keybind
        for (i = 0; i < names.length; i++){
         Render.String(x + 80, y + 65 + 25 * i, 0, names[i], [255, 255, 255, 255],4, 3);
     }
  
        //Move menu
        if (Global.IsKeyPressed(1)) {
         const mouse_pos = Global.GetCursorPosition();
         if (in_bounds(mouse_pos, x + 50, y + 20, x + 220, y + 60)) {
          if (UI.IsMenuOpen( ) == false)
            return;
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Bindss_x", mouse_pos[0] - 140);
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Bindss_y", mouse_pos[1] - 35);
         }
     }

}



Global.RegisterCallback("Draw", "Spectatorss");
Global.RegisterCallback("Draw", "HotkeyersXD");