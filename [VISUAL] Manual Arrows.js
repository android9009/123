var screen_size = Global.GetScreenSize();
var isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
var isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
var isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
var drawLeft = 1;
var drawRight = 0, drawBack = 0;

function HSVtoRGB(h, s, v)
{
    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6)
    {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}


const draw_triangle = function(x, y, size, col, narrowness, dir)
{
    for (var i = 0; i < size; i++)
    {
        // Left
        if (dir === 1)
        {
            Render.Line(x + i + 1 - size / 2, y - i / narrowness + 1, x + i + 1 - size / 2, y + i / narrowness + 1, col);
        }

        // Right
        if (dir === 2)
        {
            Render.Line(x - i - 1 + size / 2, y - i / narrowness + 1, x - i - 1 + size / 2, y + i / narrowness + 1, col);
        }

        // Down
        if (dir === 3)
        {
            Render.Line(x + i / narrowness + 1, y - i - 1, x - i / narrowness + 1, y - i - 1, col);
        }

    }

};

function drawString()
{
	selectedcp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Selected arrow color");
    selected_red = selectedcp[0];
    selected_green = selectedcp[1];
    selected_blue = selectedcp[2];
    selected_alpha = selectedcp[3];
    var colors = UI.GetColor("MISC", "JAVASCRIPT", "Script items", "Selected arrow color")
	var color = UI.GetColor("MISC", "JAVASCRIPT", "Script items", "Arrow color")
    const x = Render.GetScreenSize()[0], y = Render.GetScreenSize()[1];
	const alpha = Math.sin(Math.abs(-Math.PI + (Globals.Curtime() * (1 / .75)) % (Math.PI * 2))) * 255;
	
	isHideshots = UI.IsHotkeyActive("Rage", "Exploits", "Hide shots");
    isFakeduck = UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck");
    isDoubletap = UI.IsHotkeyActive("Rage", "Exploits", "Doubletap");
    isInverted = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter" );
    isDmgActive = UI.IsHotkeyActive("Rage", "GENERAL", "Accuracy", "Minimum damage (on key)");
    isLbyMode = UI.GetValue("Anti-Aim", "Fake angles", "LBY mode");
    isDesyncMode = UI.GetValue("Anti-Aim", "Fake angles", "Fake desync");
	
    localplayer_index = Entity.GetLocalPlayer( );
    localplayer_alive = Entity.IsAlive( localplayer_index );

    if (localplayer_alive == true){
    //Shadows
    Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +101, 1, isLbyMode ? "FAKE" : "NORM", [ 0, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +121, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 0, 0, 0, 255 ] : [ 0, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +131, 1, isDmgActive ? "WALL" : "DMG", isDmgActive ? [ 0, 0, 0, 255 ] : [ 0, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +141, 1, isHideshots ? "HIDE" : "ANIM", isHideshots ? [ 0, 0, 0, 255 ] : [ 0, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +151, 1, isFakeduck ? "DUCK" : "", isFakeduck ? [ 0, 0, 0, 255 ] : [ 0, 0, 0, 0 ], 3 );
    
    //indicators
    Render.String(screen_size[0] /2, screen_size[1] /2 +100, 1, isLbyMode ? "FAKE" : "NORM", [ 0, 255, 255 , 255], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +120, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 0, 255, 0, 255 ] : [ 255, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +130, 1, isDmgActive ? "WALL" : "DMG", isDmgActive ? [ 255, 159, 212, 255] : [ 255, 159, 212, 255 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +140, 1, isHideshots ? "HIDE" : "ANIM", isHideshots ? [ 145, 120, 229, 255 ] : [ 255, 153, 0, alpha ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +150, 1, isFakeduck ? "DUCK" : "", isFakeduck ? [ 255, 255, 255, 255 ] : [ 0, 0, 0, 0 ], 3 );
	
	//inverter indicators
    if(isDesyncMode == 0)
    {
        Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +111, 1, isInverted ? "LEFT" : "RIGHT", [ 0, 0, 0, 255 ], 3 );
        Render.String(screen_size[0] /2, screen_size[1] /2 +110, 1, isInverted ? "LEFT" : "RIGHT", [ 255, 255, 255, 255 ], 3 );
    }
    else if(isDesyncMode == 1)
    {
        Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +111, 1, isInverted ? "RIGHT" : "LEFT", [ 0, 0, 0, 255 ], 3 );
        Render.String(screen_size[0] /2, screen_size[1] /2 +110, 1, isInverted ? "RIGHT" : "LEFT", [ 255, 255, 255, 255 ], 3 );
    }

    draw_triangle(x / 2 - 50, y / 2, 20, color, 2, 1)
    draw_triangle(x / 2 + 50, y / 2, 20, color, 2, 2)
    draw_triangle(x / 2 - 1, y / 2 + 60, 20, color, 2, 3)

    if (drawLeft == 1)
    {
        draw_triangle(x / 2 - 50, y / 2, 20, [ selected_red, selected_green, selected_blue, alpha], 2, 1)
    }

    if (drawRight == 1)
    {
        draw_triangle(x / 2 + 50, y / 2, 20, [ selected_red, selected_green, selected_blue, alpha], 2, 2)
    }

    if (drawBack == 1)
    {
        draw_triangle(x / 2 - 1, y / 2 + 60, 20, [ selected_red, selected_green, selected_blue, alpha], 2, 3)
		}
    }
}

function onCreateMove()
{
    isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
    isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
    isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );

    if(isLeftActive)
    {
        drawLeft = 1;
        drawBack = 0;
        drawRight = 0;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", -90);
    }
    else if(isRightActive)
    {
        drawLeft = 0;
        drawBack = 0;
        drawRight = 1;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 90);
    }
    else if(isBackwardsActive)
    {
        drawLeft = 0;
        drawBack = 1;
        drawRight = 0;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0);
    }
}



function Main()
{
    UI.AddHotkey( "Left Hotkey" );
    UI.AddHotkey( "Right Hotkey" );
    UI.AddHotkey( "Backwards Hotkey" );
	UI.AddHotkey( "Rainbow Arrows" );
	UI.AddColorPicker("Selected arrow color");
    UI.AddColorPicker("Arrow color");

    //  callbacks
    Global.RegisterCallback("Draw", "drawString")
    Global.RegisterCallback("CreateMove", "onCreateMove")
}
Main();
