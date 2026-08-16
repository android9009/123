var screen_size = Render.GetScreenSize( );


function Draw() { 

    //Draws Indicators When Alive
    iLocalPlayer = Entity.GetLocalPlayer();
    if(!Entity.IsAlive(iLocalPlayer))    return;

    //Keybinds
    Render.String(6, screen_size[1] - 500, 0, "DT", UI.IsHotkeyActive("Rage", "Exploits", "Doubletap") ? [0, 0, 0, 255] : [255, 255, 255], 4.5);
    Render.String(4, screen_size[1] - 501, 0, "DT", UI.IsHotkeyActive("Rage", "Exploits", "Doubletap") ? [108, 195, 18, 255] : [255, 255, 255], 4.5);

    Render.String(6, screen_size[1] - 475, 0, "FD", UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck") ? [0, 0, 0, 255] : [255, 255, 255], 4.5);
    Render.String(4, screen_size[1] - 476, 0, "FD", UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck") ? [108, 195, 18, 255] : [255, 255, 255], 4.5);
    
    Render.String(6, screen_size[1] - 450, 0, "HS", UI.IsHotkeyActive("Rage", "Exploits", "Hide shots") ? [0, 0, 0, 255] : [255, 255, 255], 4.5);
    Render.String(4, screen_size[1] - 451, 0, "HS", UI.IsHotkeyActive("Rage", "Exploits", "Hide shots") ? [108, 195, 18, 255] : [255, 255, 255], 4.5);

    Render.String(6, screen_size[1] - 425, 0, "SWITCH", UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter") ? [0, 0, 0, 255] : [255, 255, 255], 4.5);
    Render.String(4, screen_size[1] - 426, 0, "SWITCH", UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter") ? [108, 195, 18, 255] : [255, 255, 255], 4.5);

    Render.String(6, screen_size[1] - 400, 0, "WALK", UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk") ? [0, 0, 0, 255] : [255, 255, 255], 4.5);
    Render.String(4, screen_size[1] - 401, 0, "WALK", UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk") ? [108, 195, 18, 255] : [255, 255, 255], 4.5);

    Render.String(6, screen_size[1] - 375, 0, "MIN DMG", UI.IsHotkeyActive("Rage", "Damage", "Minimum damage (on key)") ? [0, 0, 0, 255] : [255, 255, 255], 4.5);
    Render.String(4, screen_size[1] - 376, 0, "MIN DMG", UI.IsHotkeyActive("Rage", "Damage", "Minimum damage (on key)") ? [108, 195, 18, 255] : [255, 255, 255], 4.5);
    
}
    Global.RegisterCallback("Draw", "Draw");