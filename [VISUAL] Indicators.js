var screen_size = Render.GetScreenSize( );
function onDraw()
{ 
    if( !Entity.GetLocalPlayer( ) || !Entity.IsAlive( Entity.GetLocalPlayer( ) ) || !Entity.IsValid( Entity.GetLocalPlayer( ) ) )
    return;
    Render.String(5, screen_size[1] - 400, 0, "DT", UI.IsHotkeyActive("Rage", "Exploits", "Doubletap") ? [108, 195, 18, 255] : [255, 0, 0, 255], 4.6);
    Render.String(5, screen_size[1] - 399, 0, "DT", UI.IsHotkeyActive("Rage", "Exploits", "Doubletap") ? [108, 195, 18, 255] : [255, 0, 0, 255], 4.6);

    Render.String(5, screen_size[1] - 375, 0, "DUCK", UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck") ? [255, 255, 255, 255] : [255, 255, 255], 4.5);
    Render.String(5, screen_size[1] - 374, 0, "DUCK", UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck") ? [255, 255, 255, 255] : [255, 255, 255], 4.5);

    Render.String(5, screen_size[1] - 350, 0, "HS", UI.IsHotkeyActive("Rage", "Exploits", "Hide shots") ? [255, 255, 255, 255] : [255, 255, 255], 4.5);
    Render.String(5, screen_size[1] - 349, 0, "HS", UI.IsHotkeyActive("Rage", "Exploits", "Hide shots") ? [255, 255, 255, 255] : [255, 255, 255], 4.5);
}
    Global.RegisterCallback("Draw", "onDraw");