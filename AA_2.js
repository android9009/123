var screen_size = Global.GetScreenSize();

var isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
var isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
var isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
var isForwardActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Forward Hotkey" );
var isInverted; 
var drawLeft = 1; drawHideReal = 1;
var drawRight = 0, drawBack = 0;
var leftWasPressed = false; var rightWasPressed = false; var backWasPressed = false; var upWasPressed = false;
var time, delay, fillbar, shotsfired;

//Weapon fire event
function EVENT_WEAPON_FIRE()
{
    iShotsFired = Event.GetInt("userid"); iShotsFired_index = Entity.GetEntityFromUserID(iShotsFired);
 
    if(Entity.GetLocalPlayer() == iShotsFired_index)
    {
        if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap", "Enabled"))
        {
            //Released only once
            if(shotsfired == 0)
            {
                time = Globals.Curtime();
                delay = time+0.3;
                fillbar = 0;
            }            
        }    
    }    
}


var jump = false

function drawString()
{

	arrows_color = UI.GetColor( "Misc", "JAVASCRIPT", "Script items", "Arrows color" );
	s_arrow_color = UI.GetColor( "Misc", "JAVASCRIPT", "Script items", "Selected arrow color" );
	
	isDoubletap = UI.IsHotkeyActive("Rage", "Exploits", "Doubletap");
	isInverted = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
	isHideReal = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Hide real angle");
	isHIDESHOTS = UI.IsHotkeyActive("Rage", "Exploits", "Hide shots");
	isDMG = UI.IsHotkeyActive("Rage", "Damage", "Minimum damage (on key)");
	isSP = UI.IsHotkeyActive("Rage", "General", "Safe point override");
	isOVHBX = UI.IsHotkeyActive("Rage", "General config", "Hitbox override");
	isFD = UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck");
	arrows_type = UI.GetValue( "Misc", "JAVASCRIPT", "Script items", "Arrows" );

	dt_color = [255,0,0,255]

	Render.String(screen_size[0] /2 +5, screen_size[1] /2 +40, 0, "FAKE YAW", [ 177, 151, 255, 255 ],3 );

	is_DT = false

	g_Local = Entity.GetLocalPlayer( );
	g_Local_weapon = Entity.GetWeapon(g_Local);
	weapon_name = Entity.GetName(g_Local_weapon);
	g_Local_classname = Entity.GetClassName( g_Local_weapon );

	DT = "DT ";
	add_y = 58;

	if(UI.GetValue( "Rage", "GENERAL", "Exploits", "Doubletap" ))
    {
        //Enabled
        if(isDoubletap)
        {
            curtime = Globals.Curtime();
         
            //>_<
            if (curtime <= delay)
            {
                fillbar+=2;
                shotsfired = 1;    
             
                //Not allowing fill more
                if(fillbar >= 30) fillbar = 30;
				dt_color = [255, 0, 0, 255]
			}
            else
            {
				dt_color = [0, 255, 0, 255]
                shotsfired = 0;    //Released
            }    
        }
        else
        {
			//Disabled
			dt_color = [255, 0, 0, 255]
        }    
    }    
	
	if ((g_Local_classname == "CKnife" || g_Local_classname == "CWeaponSSG08" || g_Local_classname == "CWeaponAWP" || weapon_name == "r8 revolver" || g_Local_classname == "CHEGrenade" || g_Local_classname == "CMolotovGrenade" || g_Local_classname == "CIncendiaryGrenade" || g_Local_classname == "CFlashbang" || g_Local_classname == "CSmokeGrenade" || g_Local_classname == "CDecoyGrenade" || g_Local_classname == "CWeaponTaser" || g_Local_classname == "CC4")) 
	{
		if (isFD) {
			DT = DT + "(fakeduck)";
		} else {
			DT = DT + "(active weapon)";
		} 
		is_DT = false;
	} else 
	{
		DT = isFD ? "DT (fakeduck)" : "DT ";
		is_DT = !isFD & isDoubletap;
	}

	UI.SetValue( "Rage", "Exploits", "Doubletap", is_DT );
	if (arrows_type == 1) {
	Render.Polygon( [ [ screen_size[0] /2 -62, screen_size[1] /2 ], [ screen_size[0] /2 -45, screen_size[1] /2 -10 ], [ screen_size[0] /2 -45, screen_size[1] /2 + 10] ], drawLeft ? s_arrow_color : arrows_color ); // LEFT

	Render.Polygon( [ [ screen_size[0] /2 - 10, screen_size[1] /2 + 35 ], [ screen_size[0] /2 + 10, screen_size[1] /2 +35 ], [ screen_size[0] /2, screen_size[1] /2 + 52] ], drawBack ? s_arrow_color : arrows_color ); // BACK

	Render.Polygon( [ [ screen_size[0] /2 + 45, screen_size[1] /2 + 10], [ screen_size[0] /2 + 45, screen_size[1] /2 -10], [ screen_size[0] /2 + 62, screen_size[1] /2] ], drawRight ? s_arrow_color : arrows_color ); // RIGHT
	}
	if (arrows_type == 2) {
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -20, 1,  "<", drawLeft ? s_arrow_color : arrows_color, 4 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -20, 1,  ">", drawRight ? s_arrow_color : arrows_color, 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +20, 1,  "v", drawBack ? s_arrow_color : arrows_color, 4 );		
	}
	if(drawLeft)
	{
		Render.String(screen_size[0] /2 +5, screen_size[1] /2 +49, 0, isInverted ? "DYNAMIC" : "DYNAMIC", [ 209, 139, 230, 255 ],3 );
		Render.String(screen_size[0] /2 +5, screen_size[1] /2 +58, 0, is_DT ? DT : DT, dt_color,3 );
		if (isHIDESHOTS) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "ONSHOT", [ 124, 195, 13, 255 ],3 );
		}
		if (isDMG) {
			add_y = add_y + 9;
		    Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "DMG", [ 255, 255, 255, 255 ],3 );
		}
		if (isFD) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "DUCK", [ 255, 255, 255, 255 ] ,3 );
		}
		if (isSP) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "SP", [ 124, 195, 13, 255 ] ,3 );
		}
		if (isOVHBX) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "FB", [ 124, 195, 13, 255 ] ,3 );
		}
	}
	else if(drawRight)
	{	
		Render.String(screen_size[0] /2 +5, screen_size[1] /2 +49, 0, isInverted ? "DYNAMIC" : "DYNAMIC", [ 209, 139, 230, 255 ],3 );
		Render.String(screen_size[0] /2 +5, screen_size[1] /2 +58, 0, is_DT ? DT : DT, dt_color,3 );
		if (isHIDESHOTS) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "ONSHOT", [ 124, 195, 13, 255 ],3 );
		}
		if (isDMG) {
			add_y = add_y + 9;
		    Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "DMG", [ 255, 255, 255, 255 ],3 );
		}
		if (isFD) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "DUCK", [ 255, 255, 255, 255 ],3 );
		}
				if (isSP) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "SP", [ 124, 195, 13, 255 ] ,3 );
		}
		if (isOVHBX) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "FB", [ 124, 195, 13, 255 ] ,3 );
		}
	}
	else if(drawBack)
	{
		Render.String(screen_size[0] /2 +5, screen_size[1] /2 +49, 0, isInverted ? "DYNAMIC" : "DYNAMIC", [ 209, 139, 230, 255 ],3 );
		Render.String(screen_size[0] /2 +5, screen_size[1] /2 +58, 0, is_DT ? DT : DT, dt_color,3 );
		if (isHIDESHOTS) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "ONSHOT", [ 124, 195, 13, 255 ],3 );
		}
		if (isDMG) {
			add_y = add_y + 9;
		    Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "DMG", [ 255, 255, 255, 255 ],3 );
		}
		if (isFD) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "DUCK", [ 255, 255, 255, 255 ],3 );
		}
				if (isSP) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "SP", [ 124, 195, 13, 255 ] ,3 );
		}
		if (isOVHBX) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "FB", [ 124, 195, 13, 255 ] ,3 );
		}
	}
	else if(drawHideReal)
	{
		Render.String(screen_size[0] /2 +5, screen_size[1] /2 +49, 0, isHideReal ? "DYNAMIC" : "DYNAMIC", [ 209, 139, 230, 255 ],3 );
		Render.String(screen_size[0] /2 +5, screen_size[1] /2 +58, 0, is_DT ? DT : DT, dt_color,3 );
		if (isHIDESHOTS) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "ONSHOT", [ 124, 195, 13, 255 ],3 );
		}
		if (isDMG) {
			add_y = add_y + 9;
		    Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "DMG", [ 255, 255, 255, 255 ],3 );
		}
		if (isFD) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2+5 , screen_size[1] /2 + add_y, 0, "DUCK", [ 255, 255, 255, 255 ],3 );
		}
				if (isSP) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "SP", [ 124, 195, 13, 255 ] ,3 );
		}
		if (isOVHBX) {
			add_y = add_y + 9;
			Render.String(screen_size[0] /2 +5, screen_size[1] /2 + add_y, 0, "FB", [ 124, 195, 13, 255 ] ,3 );
		}
	}
}
var oldTick = 0
var lastPressed = 0
var isHideRealActive = false
function onCreateMove()
{
	isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
	isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
	isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
	isForwardActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Forward Hotkey" );
	
	
	if(isLeftActive && leftWasPressed == false)
	{	
		lastPressed = Global.Tickcount();
		isHideRealActive = false;
		leftWasPressed = true;
		backWasPressed = false;
		rightWasPressed = false;
		upWasPressed = false;
		drawLeft = 1;
		drawBack = 0;
		drawRight = 0;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", -90 );
		UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
	} else if(isLeftActive && leftWasPressed == true && Global.Tickcount() > lastPressed + 16){
		isHideRealActive = true;
		oldTick = Global.Tickcount();
	}
	if(isRightActive && rightWasPressed == false)
	{	
		lastPressed = Global.Tickcount();
		isHideRealActive = false;
		backWasPressed = false;
		leftWasPressed = false;
		rightWasPressed = true;
		upWasPressed = false;
		drawLeft = 0;
		drawBack = 0;
		drawRight = 1;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 90 );
		UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
		
	} else if(isRightActive && rightWasPressed == true && Global.Tickcount() > lastPressed + 16){
		isHideRealActive = true;
		oldTick = Global.Tickcount();
	}
	if(isBackwardsActive && backWasPressed == false && Global.Tickcount() > lastPressed + 16)
	{	
		lastPressed = Global.Tickcount();
		isHideRealActive = false;
		backWasPressed = true;
		rightWasPressed = false;
		leftWasPressed = false;
		upWasPressed = false;
		drawLeft = 0;
		drawBack = 1;
		drawRight = 0;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
		UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
	} else if(isBackwardsActive && backWasPressed == true && Global.Tickcount() > lastPressed + 16) {
		isHideRealActive = true;
		oldTick = Global.Tickcount();
	}
	if(isForwardActive && upWasPressed == false && Global.Tickcount() > lastPressed + 16)
	{	
		lastPressed = Global.Tickcount();
		isHideRealActive = false;
		backWasPressed = false;
		rightWasPressed = false;
		leftWasPressed = false;
		upWasPressed = true;
		drawLeft = 0;
		drawBack = 0;
		drawRight = 0;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 180 );
		UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
	}
	if(isHideRealActive)
	{
		
		if (Global.Tickcount() > oldTick + 16){
			backWasPressed = false;
			rightWasPressed = false;
			leftWasPressed = false;
			upWasPressed = false;
			oldTick = Global.Tickcount();
		}
		
		drawLeft = 0;
		drawBack = 0;
		drawRight = 0;
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
		UI.SetValue("Anti-Aim", "Fake Angles", "Hide real angle", true);
	}
	UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "At targets", isHideRealActive ? true : false ); 
}

function player_connect(){
    lastPressed = Global.Tickcount();
    oldTick = Global.Tickcount();

    time = Globals.Curtime();
    delay = time+0.3;
}

function Main()
{
	UI.AddDropdown( "Arrows", [ "Off", "triangle", "arrows" ] );
	UI.AddColorPicker( "Arrows color" )
	UI.AddColorPicker( "Selected arrow color" )


	UI.AddHotkey( "Left Hotkey" );
	UI.AddHotkey( "Right Hotkey" );
	UI.AddHotkey( "Backwards Hotkey" );
	UI.AddHotkey( "Forward Hotkey" );
	
	//  callbacks
	Global.RegisterCallback("Draw", "drawString")
	Global.RegisterCallback("CreateMove", "onCreateMove")
	Global.RegisterCallback("player_connect_full", "player_connect")
	Global.RegisterCallback("weapon_fire", "EVENT_WEAPON_FIRE");
}
Main();
