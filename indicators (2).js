//Modified by Reptar
//Originals made by :
//Signal for the idea
//Ultranite for help
//AA Indicators by 57777
//Fake Indicator by dummy (Decommissioned)
//Base by Snipi https://onetap.su/threads/release-manual-aa-indicators.13542/#post-110857
//shoutout to edeen and ntrzr
 
//If I forgot you, Please let me know
 
 
 
//indicator vars
var screen_size = Global.GetScreenSize();
var isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
var isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
var isBackActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Back Hotkey" );
var isInverted;
var drawLeft = 0;
var drawRight = 0;
var drawBack = 1;
//ui
UI.AddColorPicker("Selected arrow color");
UI.AddHotkey( "Left Hotkey" );
UI.AddHotkey( "Back Hotkey" );
UI.AddHotkey( "Right Hotkey" );
//Polygon Points
LPx = [(screen_size[0] /2) - 41, (screen_size[1] /2) + 10];
LPy = [(screen_size[0] /2) - 41, (screen_size[1] /2) - 10];
LPz = [(screen_size[0] /2) - 61, (screen_size[1] /2) + 0];
RPx = [(screen_size[0] /2) + 41, (screen_size[1] /2) + 10];
RPy = [(screen_size[0] /2) + 41, (screen_size[1] /2) - 10];
RPz = [(screen_size[0] /2) + 61, (screen_size[1] /2) + 0];
BPx = [(screen_size[0] /2) + 10, (screen_size[1] /2) + 41];
BPy = [(screen_size[0] /2) - 10, (screen_size[1] /2) + 41];
BPz = [(screen_size[0] /2) - 0, (screen_size[1] /2) + 61];
LPxx = [(screen_size[0] /2) - 42, (screen_size[1] /2) + 10];
LPyy = [(screen_size[0] /2) - 42, (screen_size[1] /2) - 10];
LPzz = [(screen_size[0] /2) - 62, (screen_size[1] /2) + 0];
RPxx = [(screen_size[0] /2) + 42, (screen_size[1] /2) + 10];
RPyy = [(screen_size[0] /2) + 42, (screen_size[1] /2) - 10];
RPzz = [(screen_size[0] /2) + 62, (screen_size[1] /2) + 0];
BPxx = [(screen_size[0] /2) + 10, (screen_size[1] /2) + 42];
BPyy = [(screen_size[0] /2) - 10, (screen_size[1] /2) + 42];
BPzz = [(screen_size[0] /2) - 0, (screen_size[1] /2) + 62];
 
Cheat.PrintColor([255, 75, 100, 25], "\n------------------------\nReptar's Indicators\n------------------------\n");
 
function render_arc(x, y, radius, radius_inner, start_angle, end_angle, segments, color)
    {
        while(360 % segments != 0)
        {
            segments++;
        }
 
        segments = 360 / segments;
 
        for (var i = start_angle; i < start_angle + end_angle; i = i + segments)
        {   
 
            var rad = i * Math.PI / 180;
            var rad2 = (i + segments) * Math.PI / 180;
 
            var rad_cos = Math.cos(rad)
            var rad_sin = Math.sin(rad)
 
            var rad2_cos = Math.cos(rad2);
            var rad2_sin = Math.sin(rad2);
 
            var x1_outer = x + rad_cos * radius;
            var y1_outer = y + rad_sin * radius;
 
            var x2_outer = x + rad2_cos * radius;
            var y2_outer = y + rad2_sin * radius;
 
            var x1_inner = x + rad_cos * radius_inner;
            var y1_inner = y + rad_sin * radius_inner;
 
            var x2_inner = x + rad2_cos * radius_inner;
            var y2_inner = y + rad2_sin * radius_inner;
 
            Render.Polygon( [
                [ x1_outer, y1_outer ],
                [ x2_outer, y2_outer ],
                [ x1_inner, y1_inner ] ],
                color
            );
 
            Render.Polygon( [
                [ x1_inner, y1_inner ],
                [ x2_outer, y2_outer ],
                [ x2_inner, y2_inner ] ],
                color
            );
        }
    }
 
function drawString()
{
    selectedcp = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Selected arrow color");
    selected_red = selectedcp[0];
    selected_green = selectedcp[1];
    selected_blue = selectedcp[2];
    selected_alpha = selectedcp[3];
    const alpha = Math.sin(Math.abs(-Math.PI + (Globals.Curtime() * (1 / 1)) % (Math.PI * 2))) * 255;
    const alphax = Math.sin(Math.abs(-Math.PI + (Globals.Curtime() * (1 / .5)) % (Math.PI * 2))) * 255;
    isHideshots = UI.IsHotkeyActive("Rage", "Exploits", "Hide shots");
    isFakeduck = UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck");
    isDoubletap = UI.IsHotkeyActive("Rage", "Exploits", "Doubletap");
    isInverted = UI.IsHotkeyActive("Anti-Aim", "Inverter" );
    isLbyMode = UI.GetValue("Anti-Aim", "LBY mode");
    isBAIM = UI.IsHotkeyActive("Rage", "Force body aim");
    isDesyncMode = UI.GetValue("Anti-Aim", "Fake desync");
    localplayer_index = Entity.GetLocalPlayer( );
    localplayer_alive = Entity.IsAlive( localplayer_index );
    charge = Exploit.GetCharge();
    max_angle = 360*Exploit.GetCharge();
    center = Render.GetScreenSize();
    X = center[0] / 2
    Y = center[1] / 2
    //Fake Indicator Plus
    //Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +101, 1, "FAKE", [ 0, 0, 0, 255 ], 3 );
    //Render.String(screen_size[0] /2, screen_size[1] /2 +100, 1, "FAKE", [ difference * 255 / 58, 255 - ( difference * 255 / 58 ), 0 , 255], 3 );
    
    if (localplayer_alive == true){
    //Shadows
    Render.Polygon([LPxx, LPzz, LPyy], [0, 0, 0, 150] );
    Render.Polygon([RPyy, RPzz, RPxx], [0, 0, 0, 150] );
    Render.Polygon([BPyy, BPxx, BPzz], [0, 0, 0, 150] );
    
    Render.String(screen_size[0] /2, screen_size[1] /2 +76, 1, isBAIM ? "BODY" : "NORM", [ 0, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +116, 1, isFakeduck ? "DUCK" : "", isFakeduck ? [ 0, 0, 0, 255 ] : [ 0, 0, 0, 0 ], 3 );
 
    //indicators
    Render.String(screen_size[0] /2, screen_size[1] /2 +75, 1, isBAIM ? "BODY" : "NORM", isBAIM ? [ 65, 180, 80, 255 ] : [ 45, 135, 185, 255 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +115, 1, isFakeduck ? "DUCK" : "", isFakeduck ? [ 255, 255, 255, 255 ] : [ 0, 0, 0, 0 ], 3 );
    
    if (isDoubletap){
        if (charge >= 1){
    Render.String(screen_size[0] /2, screen_size[1] /2 +96, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 0, 0, 0, 255 ] : [ 0, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +95, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 65, 180, 80, 255 ] : [ 255, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +106, 1, isHideshots ? "HIDE" : "ANIM", isHideshots ? [ 0, 0, 0, 255 ] : [ 0, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +105, 1, isHideshots ? "HIDE" : "ANIM", isHideshots ? [ 145, 120, 229, 255 ] : [ 255, 153, 0, alpha ], 3 );}
    if (charge < 1){
        Render.String(screen_size[0] /2 -5, screen_size[1] /2 +96, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 0, 0, 0, 255 ] : [ 0, 0, 0, 255 ], 3 );
        Render.String(screen_size[0] /2 -5, screen_size[1] /2 +95, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 255-(charge*190), charge*180, charge*80,  255 ] : [ 255, 0, 0, 255 ], 3 );
        Render.String(screen_size[0] /2, screen_size[1] /2 +106, 1, "ANIM", [ 0, 0, 0, 255 ], 3 );
        Render.String(screen_size[0] /2, screen_size[1] /2 +105, 1, "ANIM", [ 255, 153, 0, alpha ], 3 );
        render_arc(X + 8, Y + 99, 5, 2.5, -90, 360, 36, [120, 120, 120, 190]);
        render_arc(X + 8, Y + 99, 5, 2.5, -90, max_angle, 36, [ 255-(charge*190), charge*180, charge*80, 255]);
    }
    }if (!isDoubletap){
    Render.String(screen_size[0] /2, screen_size[1] /2 +96, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 0, 0, 0, 255 ] : [ 0, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +95, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 65, 180, 80, 255 ] : [ 255, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +106, 1, isHideshots ? "HIDE" : "ANIM", [ 0, 0, 0, 255 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +105, 1, isHideshots ? "HIDE" : "ANIM", isHideshots ? [ 145, 120, 229, 255 ] : [ 255, 153, 0, alpha ], 3 );  
    }
    
    //inverter indicators
    if(isDesyncMode == 0)
    {
        Render.String(screen_size[0] /2, screen_size[1] /2 +86, 1, isInverted ? "LEFT" : "RIGHT", [ 0, 0, 0, 255 ], 3 );
        Render.String(screen_size[0] /2, screen_size[1] /2 +85, 1, isInverted ? "LEFT" : "RIGHT", [ 255, 255, 255, 255 ], 3 );
    }
    else if(isDesyncMode == 1)
    {
        Render.String(screen_size[0] /2, screen_size[1] /2 +86, 1, isInverted ? "RIGHT" : "LEFT", [ 0, 0, 0, 255 ], 3 );
        Render.String(screen_size[0] /2, screen_size[1] /2 +85, 1, isInverted ? "RIGHT" : "LEFT", [ 255, 255, 255, 255 ], 3 );
    }
 
    
    if(drawLeft)
    {
        Render.Polygon([LPx, LPz, LPy], [ selected_red, selected_green, selected_blue, alphax] );
    }
    else if(drawRight)
    {      
        Render.Polygon([RPy, RPz, RPx], [ selected_red, selected_green, selected_blue, alphax] );
    }
    else if(drawBack)
    {
        Render.Polygon([BPy, BPx, BPz], [ selected_red, selected_green, selected_blue, alphax] );
    }
}}
 
function onCreateMove()
{
    isLeftActive = UI.IsHotkeyActive( "Misc", "Left Hotkey" );
    isRightActive = UI.IsHotkeyActive( "Misc", "Right Hotkey" );
    isBackActive = UI.IsHotkeyActive("Misc", "Back Hotkey" );
   
    if(isLeftActive)
    {  
        drawLeft = 1;
        drawBack = 0;
        drawRight = 0;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", -85 );
    }
    else if(isRightActive)
    {  
        drawLeft = 0;
        drawBack = 0;
        drawRight = 1;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 85 );
    }
        else if(isBackActive)
    {  
        drawLeft = 0;
        drawBack = 1;
        drawRight = 0;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
    }
}
 
 
function Main()
{
    Global.RegisterCallback("Draw", "drawString")
    Global.RegisterCallback("CreateMove", "onCreateMove")
}
 
Main();