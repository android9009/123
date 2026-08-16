var screen_size = Global.GetScreenSize();
var isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
var isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
var isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
var isOnshotActive = UI.IsHotkeyActive( "Rage", "GENERAL", "Exploits", "Hide shots" );
var isFreestandActive = UI.IsHotkeyActive ("Misc", "JAVASCRIPT", "Freestand on Key");
var isFakeDuckActive = UI.IsHotkeyActive ("Anti-Aim", "Extra", "Fake duck");
var isInverted; 
var drawLeft = 1; drawHideReal = 1;
var drawRight = 0, drawBack = 0;
var drawDangerous = 1;
var leftWasPressed = false; var rightWasPressed = false; var backWasPressed = false;


function isDoubleTapActive()
{
	var isCheckboxActive = UI.GetValue("Rage", "Exploits", "Doubletap");
	var isKeyActive = UI.IsHotkeyActive("Rage", "Exploits", "Doubletap");
	
	return isCheckboxActive && isKeyActive;
}

function isOnshotActive()
{
	var isCheckboxActive = UI.GetValue("Rage", "Exploits", "Hide shots");
	var isKeyActive = UI.IsHotkeyActive("Rage", "Exploits", "Hide shots");
	
	return isCheckboxActive && isKeyActive;
}

function isAutowallfixActive()
{
	var isCheckboxActive = UI.GetValue("Misc", "JAVASCRIPT", "Autowall fix");
	
	return isCheckboxActive;

}

var heavy_cache = UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage")
var scout_cache = UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
var awp_cache = UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
var auto_cache = UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")
function isActive(a)
{
    return UI.IsHotkeyActive("Script Items", a)
}
function setValue(cat, value)
{
    UI.SetValue("Rage", cat.toUpperCase(), "Targeting", "Minimum damage", value)
}
function isHeavyPistol(name)
{
    if (name == "r8 revolver" || name == "desert eagle")
    {
        return true
    }
}
function isAutoSniper(name)
{
    if(name == "scar 20" || weapon_name == "g3sg1")
    {
        return true
    }
}
function onCM()
{
    heavy_value = UI.GetValue("Script items", "Heavy Pistol Mindmg")
    scout_value = UI.GetValue("Script items", "Scout Mindmg")
    awp_value = UI.GetValue("Script items", "AWP Mindmg")
    auto_value = UI.GetValue("Script items", "Auto Mindmg")
    weapon_name =  Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
  
    if (isActive("Minimum Damage Override") && isHeavyPistol(weapon_name))
    {
        setValue("HEAVY PISTOL", heavy_value)
    }
    else
	{
        setValue("HEAVY PISTOL", heavy_cache)
    }
  
    if (isActive("Minimum Damage Override") && weapon_name == "ssg 08")
    {
        setValue("SCOUT", scout_value)
    }
    else
	{
        setValue("SCOUT", scout_cache)
    }

    if (isActive("Minimum Damage Override") && weapon_name == "awp")
    {
        setValue("AWP", awp_value)
    }
    else
	{
        setValue("AWP", awp_cache)
    }

    if (isActive("Minimum Damage Override") && isAutoSniper(weapon_name))
    {
      
        setValue("AUTOSNIPER", auto_value)
    }
    else
    {
        setValue("AUTOSNIPER", auto_cache)
    }
  
    if (isActive("Magic key") && isHeavyPistol(weapon_name))
    {
        setValue("HEAVY PISTOL", 100)
		UI.SetValue( "Rage", "HEAVY PISTOL", "Accuracy", "Prefer body aim", false );
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		isMagicKey = true
		isDoubletap = false
    }
  
    if (isActive("Magic key") && weapon_name == "ssg 08")
    {
        setValue("SCOUT", 100)
		UI.SetValue( "Rage", "SCOUT", "Accuracy", "Prefer body aim", false );
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		isMagicKey = true
		isDoubletap = false
    }

    if (isActive("Magic key") && isAutoSniper(weapon_name))
    {
      
        setValue("AUTOSNIPER", 100)
		UI.SetValue( "Rage", "AUTOSNIPER", "Accuracy", "Prefer body aim", false );
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		isMagicKey = true
		isDoubletap = false
    }
}

function indicator()
{
    screen = Render.GetScreenSize()
    wep = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    x = screen[0]/2
    y = screen[1]/2
    heavy = "DMG: " + UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage")
    scout = "DMG: " + UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
    awp = "DMG: " + UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
    auto = "DMG: " + UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")
    var str = ""
    if (UI.GetValue("Script items", "Show currently mindamage") && Entity.IsValid(Entity.GetLocalPlayer()) && Entity.IsAlive(Entity.GetLocalPlayer()))
    {
        if (isHeavyPistol(wep))
        {
            str = heavy
        }
        else if(wep == "ssg 08")
        {
            str = scout
        }
        else if(wep == "awp")
        {
            str = awp
        }
        else if (isAutoSniper(wep))
        {
            str = auto
        }
    }
        Render.String(screen_size[0] /2 -898 , screen_size[1] /2 +450, 1, str+"", [255,255,255,255], 3)
}

function drawString()
{
	arrows_color = UI.GetColor( "Misc", "JAVASCRIPT", "Script items", "Arrows color" );
	s_arrow_color = UI.GetColor( "Misc", "JAVASCRIPT", "Script items", "Selected arrow color" );
	isDoubletap = UI.IsHotkeyActive("Rage", "Exploits", "Doubletap");
	isInverted = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
	isHideReal = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Hide real angle");
	isHideShots = UI.IsHotkeyActive("Rage", "Exploits", "Hide shots");
	isMagicKey = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Magic key");
	isFreestand = UI.IsHotkeyActive ("Misc", "JAVASCRIPT", "Freestand on Key");
	isFakeDuck = UI.IsHotkeyActive ("Anti-Aim", "Extra", "Fake duck");
	{
		

	if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots"))
	{
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Hide shots", true);
		UI.SetValue( "Rage", "AUTOSNIPER", "Accuracy", "Prefer body aim", false );
		isDoubletap = false
		isHideShots = true
	}
	else if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap"))
	 {
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", true);
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Hide shots", false);
		UI.SetValue( "Rage", "AUTOSNIPER", "Accuracy", "Prefer body aim", true );
	    isDoubletap = true
		isHideShots = false
	 }
	else
	 {
		UI.SetValue( "Rage", "AUTOSNIPER", "Accuracy", "Prefer body aim", false );
	 }
	
	
	g_Local = Entity.GetLocalPlayer( );
	g_Local_weapon = Entity.GetWeapon(g_Local);
	weapon_name = Entity.GetName(g_Local_weapon);
	g_Local_classname = Entity.GetClassName( g_Local_weapon );
	localplayer_index = Entity.GetLocalPlayer( );
	localplayer_alive = Entity.IsAlive( localplayer_index );
	
	 if ((g_Local_classname == "CKnife" || g_Local_classname == "CWeaponSSG08" || g_Local_classname == "CWeaponAWP" || weapon_name == "r8 revolver" || g_Local_classname == "CHEGrenade" || g_Local_classname == "CMolotovGrenade" || g_Local_classname == "CIncendiaryGrenade" || g_Local_classname == "CFlashbang" || g_Local_classname == "CSmokeGrenade" || g_Local_classname == "CDecoyGrenade" || g_Local_classname == "CWeaponTaser" || g_Local_classname == "CC4"))
	{
        UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		isDoubletap = false
	}
    else if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots"))
	{
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		
		isDoubletap = false
	}
	else
	
		if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Freestand on Key"))
		{
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", true);
			isFreestand = true
		}
		else
		{
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", false);
			isFreestand = false
		}
		
		if ((UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) && localplayer_alive == true)
	{
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Hide shots", false);
        isDoubletap = false
		isHideShots = false
    }
	
		if (isAutowallfixActive() == 1 && (weapon_name == "r8 revolver" || g_Local_classname == "CWeaponSSG08") && UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots"))
		{
			UI.SetValue("Visual", "SELF", "ESP", "Hold firing animation", false);
		}
		else
		{
			UI.SetValue("Visual", "SELF", "ESP", "Hold firing animation", true);
		}
	
	
	if ((UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Magic key")) && localplayer_alive == true)
	{
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		isDoubletap = false
	}
	
	
	if(drawDangerous && localplayer_alive == true)
	{
		Render.String(screen_size[0] /2 , screen_size[1] /2 +53, 1, isInverted ? "Left" : "Right", [ 57, 172, 115, 255 ],3,9 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +80, 1, isDoubletap ? "DoubleTap" : "DoubleTap", isDoubletap ? [ 57, 172, 115, 255 ] : [ 255, 0, 0, 0 ],3,4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isHideShots ? "Onshot" : "Onshot", isHideShots ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -35 , screen_size[1] /3 -35, 1, isMagicKey ? "WARNING!" : "WARNING!", isMagicKey ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 +35 , screen_size[1] /3 -35, 1, isMagicKey ? "delay shot" : "delay shot", isMagicKey ? [ 0, 204, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -893 , screen_size[1] /2 +450, 1, isFreestand ? "Freestand" : "Freestand", isFreestand ? [ 255, 255, 255, 255 ] : [ 0, 204, 0, 0 ],4 );
	}
	
	if(drawLeft && localplayer_alive == true)
	{
		Render.String(screen_size[0] /2 , screen_size[1] /2 +53, 1, isInverted ? "Left" : "Right", [ 57, 172, 115, 255 ],3,9 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +80, 1, isDoubletap ? "DoubleTap" : "DoubleTap", isDoubletap ? [ 57, 172, 115, 255 ] : [ 255, 0, 0, 0 ],3,4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isHideShots ? "Onshot" : "Onshot", isHideShots ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -35 , screen_size[1] /3 -35, 1, isMagicKey ? "WARNING!" : "WARNING!", isMagicKey ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 +35 , screen_size[1] /3 -35, 1, isMagicKey ? "delay shot" : "delay shot", isMagicKey ? [ 0, 204, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
        Render.String(screen_size[0] /2 -893 , screen_size[1] /2 +450, 1, isFreestand ? "Freestand" : "Freestand", isFreestand ? [ 255, 255, 255, 255 ] : [ 0, 204, 0, 0 ],4 );
	}
	else if(drawRight && localplayer_alive == true)
	{	
		Render.String(screen_size[0] /2 , screen_size[1] /2 +53, 1, isInverted ? "Left" : "Right", [ 57, 172, 115, 255 ],3,9 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +80, 1, isDoubletap ? "DoubleTap" : "DoubleTap", isDoubletap ? [ 57, 172, 115, 255 ] : [ 255, 0, 0, 0 ],3,4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isHideShots ? "Onshot" : "Onshot", isHideShots ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -35 , screen_size[1] /3 -35, 1, isMagicKey ? "WARNING!" : "WARNING!", isMagicKey ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 +35 , screen_size[1] /3 -35, 1, isMagicKey ? "delay shot" : "delay shot", isMagicKey ? [ 0, 204, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -893 , screen_size[1] /2 +450, 1, isFreestand ? "Freestand" : "Freestand", isFreestand ? [ 255, 255, 255, 255 ] : [ 0, 204, 0, 0 ],4 );
	}
	else if(drawBack && localplayer_alive == true)
	{
		Render.String(screen_size[0] /2 , screen_size[1] /2 +53, 1, isInverted ? "Left" : "Right", [ 57, 172, 115, 255 ],3,9 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isDoubletap ? "DoubleTap" : "DoubleTap", isDoubletap ? [ 57, 172, 115, 255 ] : [ 255, 0, 0, 0 ],3,4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isHideShots ? "Onshot" : "Onshot", isHideShots ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -35 , screen_size[1] /3 -35, 1, isMagicKey ? "WARNING!" : "WARNING!", isMagicKey ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 +35 , screen_size[1] /3 -35, 1, isMagicKey ? "delay shot" : "delay shot", isMagicKey ? [ 0, 204, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -893 , screen_size[1] /2 +450, 1, isFreestand ? "Freestand" : "Freestand", isFreestand ? [ 255, 255, 255, 255 ] : [ 0, 204, 0, 0 ],4 );
	}
	else if(drawHideReal && localplayer_alive == true)
	{
		Render.String(screen_size[0] /2 , screen_size[1] /2 +53, 1, isInverted ? "Left" : "Right", [ 57, 172, 115, 255 ],3,9 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isDoubletap ? "DoubleTap" : "DoubleTap", isDoubletap ? [ 57, 172, 115, 255 ] : [ 255, 0, 0, 0 ],3,4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isHideShots ? "Onshot" : "Onshot", isHideShots ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -35 , screen_size[1] /3 -35, 1, isMagicKey ? "WARNING!" : "WARNING!", isMagicKey ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 +35 , screen_size[1] /3 -35, 1, isMagicKey ? "delay shot" : "delay shot", isMagicKey ? [ 0, 204, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -893 , screen_size[1] /2 +450, 1, isFreestand ? "Freestand" : "Freestand", isFreestand ? [ 255, 255, 255, 255 ] : [ 0, 204, 0, 0 ],4 );
	}

  }
}


var olDoubleTapick = 0
var lastPressed = 0
var isHideRealActive = false

function onCreateMove()
{
	isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
	isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
	isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
	
	
	if(isLeftActive && leftWasPressed == false)
	{	
		lastPressed = Global.Tickcount();
		isHideRealActive = false;
		leftWasPressed = true;
		backWasPressed = false;
		rightWasPressed = false;
		drawLeft = 1;
		drawBack = 0;
		drawRight = 0;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
		UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", false);
	} else if(isLeftActive && leftWasPressed == true && Global.Tickcount() > lastPressed + 16){
		isHideRealActive = true;
		olDoubleTapick = Global.Tickcount();
	}
	if(isRightActive && rightWasPressed == false)
	{	
		lastPressed = Global.Tickcount();
		isHideRealActive = false;
		backWasPressed = false;
		leftWasPressed = false;
		rightWasPressed = true;
		drawLeft = 0;
		drawBack = 0;
		drawRight = 1;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
		UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", false);
		
	} else if(isRightActive && rightWasPressed == true && Global.Tickcount() > lastPressed + 16){
		isHideRealActive = true;
		olDoubleTapick = Global.Tickcount();
	}
	if(isBackwardsActive && backWasPressed == false && Global.Tickcount() > lastPressed + 16)
	{	
		lastPressed = Global.Tickcount();
		isHideRealActive = false;
		backWasPressed = true;
		rightWasPressed = false;
		leftWasPressed = false;
		drawLeft = 0;
		drawBack = 1;
		drawRight = 0;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
		UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", false);
	} else if(isBackwardsActive && backWasPressed == true && Global.Tickcount() > lastPressed + 16) {
		isHideRealActive = true;
		olDoubleTapick = Global.Tickcount();
	}
	if(isHideRealActive)
	{
		
		if (Global.Tickcount() > olDoubleTapick + 16){
			backWasPressed = false;
			rightWasPressed = false;
			leftWasPressed = false;
			olDoubleTapick = Global.Tickcount();
		}
		
		drawLeft = 0;
		drawBack = 0;
		drawRight = 0;
	}

}


function player_connect(){
	var uid = Event.GetInt("userid");
	if (Entity.GetEntityFromUserID(uid) == Entity.GetLocalPlayer()) {
		lastPressed = Global.Tickcount();
		olDoubleTapick = Global.Tickcount();
	}
}

function Main()
{
	UI.AddLabel("                   Fixes            ");
	UI.AddCheckbox("Autowall fix");
	UI.AddHotkey("Magic key");
	UI.AddHotkey("Freestand on Key");
	
    UI.AddCheckbox("Show currently mindamage")
	UI.AddHotkey("Minimum Damage Override")
    UI.AddSliderInt("Heavy Pistol Mindmg", 0, 130)
    UI.AddSliderInt("Scout Mindmg", 0, 130)
    UI.AddSliderInt("AWP Mindmg", 0, 130)
    UI.AddSliderInt("Auto Mindmg", 0, 130)
	
	//  callbacks
	Global.RegisterCallback("Draw", "drawString")
	Global.RegisterCallback("CreateMove", "onCreateMove")
	Global.RegisterCallback("player_connect_full", "player_connect")
	Cheat.RegisterCallback("CreateMove", "onCM")
	Cheat.RegisterCallback("Draw", "indicator")
}
Main();