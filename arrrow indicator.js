var screen_size = Global.GetScreenSize();
var isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
UI.AddColorPicker("Arrows color");
UI.AddColorPicker("Selected arrow color");
UI.AddColorPicker("Text color");
UI.AddSliderFloat("flashing indicator", .1, 2.0);
UI.SetValue("Misc", "JAVASCRIPT", "Script items", "flashing indicator", .75);
var isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
var isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
var isHideRealActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "HideReal Hotkey" );
var isInverted;
var drawLeft = 1; drawHideReal = 1;
var drawRight = 0, drawBack = 0;

var isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
var isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
var isHideRealActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "HideReal Hotkey" );
var isInverted;
var drawLeft = 1; drawHideReal = 1;
var drawRight = 0, drawBack = 0;


function HSVtoRGB(h, s, v)
{
var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 4)
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
       
function drawString()
{
    arrowscp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Arrows color");
    textcp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Text color");
    selectedcp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Selected arrow color");
    arrows_red = arrowscp[0];
    arrows_green = arrowscp[1];
    arrows_blue = arrowscp[2];
    arrows_alpha = arrowscp[3];
    text_red = textcp[0];
    text_green = textcp[1];
    text_blue = textcp[2];
    text_alpha = textcp[3];
    selected_red = selectedcp[0];
    selected_green = selectedcp[1];
    selected_blue = selectedcp[2];
    selected_alpha = selectedcp[3];
    isHideshots = UI.IsHotkeyActive("Rage", "Exploits", "Hide shots");
    isSafepoint = UI.IsHotkeyActive("Rage", "General", "Force safe point");
    isDoubletap = UI.IsHotkeyActive("Rage", "Exploits", "Doubletap");
    isInverted = UI.IsHotkeyActive("Anti-Aim", "Inverter");
    fonts = Render.AddFont( "Arrows", 49, 400);
    Render.String(screen_size[0] /2 + 80, screen_size[1] /2 -20, 0, "DESYNC", [ text_red, text_green, text_blue, text_alpha ], 3 );
    colors = HSVtoRGB(Global.Realtime() * UI.GetValue("Misc", "JAVASCRIPT", "Script items", "flashing indicator"), 1, 2, 3);
	localplayer_index = Entity.GetLocalPlayer( );
    localplayer_alive = Entity.IsAlive( localplayer_index );
	
	if (localplayer_alive == true) {
   
    if(drawLeft)
    {
    Render.StringCustom(screen_size[0] /2 -48, screen_size[1] /2 -45, 1, "R", [ selected_red, selected_green, selected_blue, colors.g ], fonts );
    Render.StringCustom(screen_size[0] /2 -48, screen_size[1] /2 -45, 1, "R", [ 255, 255, 255, 100 ], fonts );
    Render.StringCustom(screen_size[0] /2 +48, screen_size[1] /2 -45, 1, "Q", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
    Render.StringCustom(screen_size[0] /2 +1, screen_size[1] /2 +5, 1, "T", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
	Render.StringCustom(screen_size[0] /2 -30, screen_size[1] /2 -15, 1, "V", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
	Render.StringCustom(screen_size[0] /2 +30, screen_size[1] /2 -15, 1, "X", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
    Render.String(screen_size[0] /2 + 80, screen_size[1] /2 -12, 0, isInverted ? "LEFT" : "RIGHT", [ text_red, text_green, text_blue, text_alpha ], 3 );
    Render.String(screen_size[0] /2 + 80, screen_size[1] /2 -4, 0, isHideshots ? "HIDE" : "HIDE", isHideshots ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2 + 80, screen_size[1] /2 +4, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2 + 80, screen_size[1] /2 +12, 0, isSafepoint ? "SP" : "SP", isSafepoint ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ], 3 );
    Render.StringCustom(screen_size[0] /2 -30, screen_size[1] /2 -15, 1, isInverted ? "V" : "", [ selected_red, selected_green, selected_blue, colors.g ], fonts );
    Render.StringCustom(screen_size[0] /2 +30, screen_size[1] /2 -15, 1, isInverted ? "" : "X", [ selected_red, selected_green, selected_blue, colors.g ], fonts );

    }
    else if(drawRight)
    {  
    Render.StringCustom(screen_size[0] /2 -48, screen_size[1] /2 -45, 1, "R", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
    Render.StringCustom(screen_size[0] /2 +48, screen_size[1] /2 -45, 1, "Q", [ selected_red, selected_green, selected_blue, colors.g ], fonts );
    Render.StringCustom(screen_size[0] /2 +48, screen_size[1] /2 -45, 1, "Q", [ 255, 255, 255, 100 ], fonts );
    Render.StringCustom(screen_size[0] /2 +1, screen_size[1] /2 +5, 1, "T", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
	Render.StringCustom(screen_size[0] /2 -30, screen_size[1] /2 -15, 1, "V", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
	Render.StringCustom(screen_size[0] /2 +30, screen_size[1] /2 -15, 1, "X", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
    Render.String(screen_size[0] /2 + 80, screen_size[1] /2 -12, 0, isInverted ? "LEFT" : "RIGHT", [ text_red, text_green, text_blue, text_alpha ], 3 );
    Render.String(screen_size[0] /2 + 80, screen_size[1] /2 -4, 0, isHideshots ? "HIDE" : "HIDE", isHideshots ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2 + 80, screen_size[1] /2 +4, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2 + 80, screen_size[1] /2 +12, 0, isSafepoint ? "SP" : "SP", isSafepoint ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ], 3 );
	Render.StringCustom(screen_size[0] /2 -30, screen_size[1] /2 -15, 1, isInverted ? "V" : "", [ selected_red, selected_green, selected_blue, colors.g ], fonts );
	Render.StringCustom(screen_size[0] /2 +30, screen_size[1] /2 -15, 1, isInverted ? "" : "X", [ selected_red, selected_green, selected_blue, colors.g ], fonts );
    }
    else if(drawBack)
    {
           Render.StringCustom(screen_size[0] /2 -48, screen_size[1] /2 -45, 1,  "R", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
    Render.StringCustom(screen_size[0] /2 +48, screen_size[1] /2 -45, 1, "Q", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
    Render.StringCustom(screen_size[0] /2 +1, screen_size[1] /2 +5, 1, "T", [ selected_red, selected_green, selected_blue, colors.g ], fonts );
    Render.StringCustom(screen_size[0] /2 +1, screen_size[1] /2 +5, 1, "T", [ 255, 255, 255, 100 ], fonts );
	Render.StringCustom(screen_size[0] /2 -30, screen_size[1] /2 -15, 1, "V", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
	Render.StringCustom(screen_size[0] /2 +30, screen_size[1] /2 -15, 1, "X", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
	Render.String(screen_size[0] /2 + 80, screen_size[1] /2 -12, 0, isInverted ? "LEFT" : "RIGHT", [ text_red, text_green, text_blue, text_alpha ], 3 );
	Render.String(screen_size[0] /2 + 80, screen_size[1] /2 -4, 0, isHideshots ? "HIDE" : "HIDE", isHideshots ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ], 3 );
	Render.String(screen_size[0] /2 + 80, screen_size[1] /2 +4, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ], 3 );
	Render.String(screen_size[0] /2 + 80, screen_size[1] /2 +12, 0, isSafepoint ? "SP" : "SP", isSafepoint ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ], 3 );
	Render.StringCustom(screen_size[0] /2 -30, screen_size[1] /2 -15, 1, isInverted ? "V" : "", [ selected_red, selected_green, selected_blue, colors.g ], fonts );
	Render.StringCustom(screen_size[0] /2 +30, screen_size[1] /2 -15, 1, isInverted ? "" : "X", [ selected_red, selected_green, selected_blue, colors.g ], fonts );
    }
    else if(drawHideReal)
    {
	Render.String(screen_size[0] /2 -50, screen_size[1] /2 -20, 1, "LEFT", [ 255, 255, 255, 255 ], fonts );
	Render.String(screen_size[0] /2 +50, screen_size[1] /2 -20, 1, "RIGHT", [ 255, 255, 255, 255 ], fonts );
	Render.String(screen_size[0] /2, screen_size[1] /2 +25, 1, "DOWN", [ 255, 255, 255, 255 ], fonts );
	Render.String(screen_size[0] /2 + 80 , screen_size[1] /2 -12, 0, isHideshots ? "HIDE" : "HIDE", isHideshots ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ], 3 );
	Render.String(screen_size[0] /2 + 80, screen_size[1] /2 +4, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ], 3 );
	Render.String(screen_size[0] /2 + 80, screen_size[1] /2 +12, 0, isSafepoint ? "SP" : "SP", isSafepoint ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ], 3 );
	Render.StringCustom(screen_size[0] /2 -48, screen_size[1] /2 -45, 1, "R", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
    Render.StringCustom(screen_size[0] /2 +48, screen_size[1] /2 -45, 1, "Q", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
    Render.StringCustom(screen_size[0] /2 +1, screen_size[1] /2 +5, 1, "T", [ selected_red, selected_green, selected_blue, colors.g ], fonts );
	Render.StringCustom(screen_size[0] /2 -30, screen_size[1] /2 -15, 1, "V", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
	Render.StringCustom(screen_size[0] /2 +30, screen_size[1] /2 -15, 1, "X", [ arrows_red, arrows_green, arrows_blue, 100 ], fonts );
	Render.StringCustom(screen_size[0] /2 -30, screen_size[1] /2 -15, 1, isInverted ? "V" : "", [ selected_red, selected_green, selected_blue, colors.g ], fonts );
	Render.StringCustom(screen_size[0] /2 +30, screen_size[1] /2 -15, 1, isInverted ? "" : "X", [ selected_red, selected_green, selected_blue, colors.g ], fonts );
		}
	}
}


function onCreateMove()
{
    isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
    isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
    isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
    isHideRealActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "HideReal Hotkey" );
   
    if(isLeftActive)
    {  
        drawLeft = 1;
        drawBack = 0;
        drawRight = 0;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", -90 );
        UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
    }
    else if(isRightActive)
    {  
        drawLeft = 0;
        drawBack = 0;
        drawRight = 1;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 90 );
        UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
       
    }
    else if(isBackwardsActive)
    {  
        drawLeft = 0;
        drawBack = 1;
        drawRight = 0;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
        UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
    }
    else if(isHideRealActive)
    {
        drawLeft = 0;
        drawBack = 0;
        drawRight = 0;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
        UI.SetValue("Anti-Aim", "Fake Angles", "Hide real angle", true);
    }
}

function Main()
{
    UI.AddHotkey( "Left Hotkey" );
    UI.AddHotkey( "Right Hotkey" );
    UI.AddHotkey( "Backwards Hotkey" );
    UI.AddHotkey( "HideReal Hotkey" );
   
    //  callbacks
    Global.RegisterCallback("Draw", "drawString")
    Global.RegisterCallback("CreateMove", "onCreateMove")
}
Main();