var screen_size = Global.GetScreenSize();
var isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
var isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
var isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
var isKeyActive = UI.IsHotkeyActive( "Rage", "GENERAL", "Exploits", "Hide shots" );
var isDangerousActive = UI.IsHotkeyActive ( "Misc", "JAVASCRIPT", "Script items", "tank aa" );
var isFreestandActive = UI.IsHotkeyActive ("Misc", "JAVASCRIPT", "Freestand on Key");
var isFakeDuckActive = UI.IsHotkeyActive ("Anti-Aim", "Extra", "Fake duck");
var isInverted; 
var drawLeft = 1; drawHideReal = 1;
var drawRight = 0, drawBack = 0;
var drawDangerous = 1;
var leftWasPressed = false; var rightWasPressed = false; var backWasPressed = false; dangerousWasPressed = false;
function playSoundOnKill()
{
    localplayer_index = Entity.GetLocalPlayer();
    attacker = Event.GetInt("attacker");
    attacker_index = Entity.GetEntityFromUserID(attacker);

    if (attacker_index == localplayer_index)
    {
        Sound.Play("C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\ot\\scripts\\headshot.wav");
    }

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
	isDangerous = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Dangerous AA");
	isSafePoints = UI.IsHotkeyActive("Rage", "GENERAL", "General", "Strict safety");
	isFreestand = UI.IsHotkeyActive ("Misc", "JAVASCRIPT", "Freestand on Key");
	isFakeDuck = UI.IsHotkeyActive ("Anti-Aim", "Extra", "Fake duck");
	isAwpMindmg = UI.IsHotkeyActive ("Rage", "AWP", "Damage", "Minimum damage (on key)");
	isScoutMindmg = UI.IsHotkeyActive ("Rage", "SCOUT", "Damage", "Minimum damage (on key)");
	isScarMindmg = UI.IsHotkeyActive ("Rage", "AUTOSNIPER", "Damage", "Minimum damage (on key)");
	isHeavypistol = UI.IsHotkeyActive ("Rage", "HEAVY PISTOL", "Damage", "Minimum damage (on key)");
	isWavystyle = UI.IsHotkeyActive ("Misc", "JAVASCRIPT", "Wavy style");
	{
		

	if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots"))  {
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Hide shots", true);
		isDoubletap = false
	}
	else if
	   (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap"))  {
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", true);
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Hide shots", false);
		UI.SetValue( "Misc","JAVASCRIPT", "Script items", "Magic key", false );
		UI.SetValue( "Rage", "GENERAL", "General", "Strict safety", true );
	    isDoubletap = true
		isSafePoints = true
	}
	else
	{
		UI.SetValue( "Rage", "GENERAL", "General", "Strict safety", false );
	}
	
	if (UI.IsHotkeyActive("Misc","JAVASCRIPT", "Script items", "Magic key" ))  {
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		UI.SetValue( "Misc","JAVASCRIPT", "Script items", "Magic key", true );
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Hide shots", false);
		UI.SetValue( "Rage", "GENERAL", "General", "Strict safety", false );
		isMagicKey = true
		isDoubletap = false
		isHideShots = false
		isSafePoints = false
	}
	if (UI.IsHotkeyActive("Misc","JAVASCRIPT", "Script items", "Magic key"))  {
		 UI.SetValue( "Rage", "PISTOL", "Damage", "Minimum damage (visible)", 45 );
         UI.SetValue( "Rage", "HEAVY PISTOL", "Damage", "Minimum damage (visible)", 100 );
         UI.SetValue( "Rage", "SCOUT", "Damage", "Minimum damage (visible)", 101 );
         UI.SetValue( "Rage", "AUTOSNIPER", "Damage", "Minimum damage (visible)", 100 );
		 
		 UI.SetValue( "Rage", "PISTOL", "Damage", "Minimum damage (behind wall)", 45 );
         UI.SetValue( "Rage", "HEAVY PISTOL", "Damage", "Minimum damage (behind wall)", 100 );
         UI.SetValue( "Rage", "SCOUT", "Damage", "Minimum damage (behind wall)", 101 );
         UI.SetValue( "Rage", "AUTOSNIPER", "Damage", "Minimum damage (behind wall)", 100 );
		 isMagicKey = true
		 isDoubletap = false
	}
    else
	{
		 UI.SetValue( "Rage", "PISTOL", "Damage", "Minimum damage (visible)", 20 );
         UI.SetValue( "Rage", "HEAVY PISTOL", "Damage", "Minimum damage (visible)", 35 );
         UI.SetValue( "Rage", "SCOUT", "Damage", "Minimum damage (visible)", 75 );
         UI.SetValue( "Rage", "AUTOSNIPER", "Damage", "Minimum damage (visible)", 20 );
		 
		 UI.SetValue( "Rage", "PISTOL", "Damage", "Minimum damage (behind wall)", 30 );
         UI.SetValue( "Rage", "HEAVY PISTOL", "Damage", "Minimum damage (behind wall)", 20 );
         UI.SetValue( "Rage", "SCOUT", "Damage", "Minimum damage (behind wall)", 75 );
         UI.SetValue( "Rage", "AUTOSNIPER", "Damage", "Minimum damage (behind wall)", 20 );
		 isMagicKey = false
	}
	
	g_Local = Entity.GetLocalPlayer( );
	g_Local_weapon = Entity.GetWeapon(g_Local);
	weapon_name = Entity.GetName(g_Local_weapon);
	g_Local_classname = Entity.GetClassName( g_Local_weapon );
	localplayer_index = Entity.GetLocalPlayer( );
	localplayer_alive = Entity.IsAlive( localplayer_index );
	if ((g_Local_classname == "CWeaponAWP"))
    {
        UI.SetValue( "Rage", "GENERAL", "General", "Strict safety", true );
		isSafePoints = true
	}
	else 
	{
		UI.SetValue( "Rage", "GENERAL", "General", "Strict safety", false );
		isSafePoints = false
	}
	
		if ((g_Local_classname == "CWeaponSSG08"))
    {
		UI.SetValue( "Rage", "GENERAL", "General", "Lethal safety", true );
	}
	else 
	{
		UI.SetValue( "Rage", "GENERAL", "General", "Lethal safety", false );
	}
	
	 if ((g_Local_classname == "CKnife" || g_Local_classname == "CWeaponSSG08" || g_Local_classname == "CWeaponAWP" || weapon_name == "r8 revolver" || g_Local_classname == "CHEGrenade" || g_Local_classname == "CMolotovGrenade" || g_Local_classname == "CIncendiaryGrenade" || g_Local_classname == "CFlashbang" || g_Local_classname == "CSmokeGrenade" || g_Local_classname == "CDecoyGrenade" || g_Local_classname == "CWeaponTaser" || g_Local_classname == "CC4"))
	{
        UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		UI.SetEnabled( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		isDoubletap = false
	}
    else if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots"))
	{
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		
		isDoubletap = false
	}
	else
		if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap") && localplayer_alive == true)
	{
		UI.SetEnabled( "Rage", "GENERAL", "Exploits", "Doubletap", true);
		UI.SetValue("Rage", "AUTOSNIPER", "Damage", "Minimum damage (visible)", 40);
		UI.SetValue("Rage", "AUTOSNIPER", "Damage", "Minimum damage (behind wall)", 40);
		isDoubletap = true
		isMagicKey = false
		isHideShots = false
	}
	else

	{
		UI.SetValue("Rage", "AUTOSNIPER", "Damage", "Minimum damage (visible)", 20);
		UI.SetValue("Rage", "AUTOSNIPER", "Damage", "Minimum damage (behind wall)", 20);
		isDoubletap = false
		isSafePoints = false
	}
	
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
        UI.SetEnabled( "Rage", "GENERAL", "Exploits", "Doubletap", true);
		UI.SetEnabled( "Rage", "GENERAL", "Exploits", "Hide shots", true);	
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Hide shots", false);
		UI.SetValue("Rage", "AUTOSNIPER", "Accuracy", "Hitchance", 80);
		UI.SetValue("Rage", "PISTOL", "Accuracy", "Hitchance", 70);
		UI.SetValue("Rage", "HEAVY PISTOL", "Accuracy", "Hitchance", 75);
		UI.SetValue("Rage", "SCOUT", "Accuracy", "Hitchance", 90);
		UI.SetValue("Rage", "AWP", "Accuracy", "Hitchance", 100);
		isSafePoints = true
        isDoubletap = false
		isHideShots = false
    }
	else
	{
		UI.SetValue("Rage", "AUTOSNIPER", "Accuracy", "Hitchance", 60);
		UI.SetValue("Rage", "PISTOL", "Accuracy", "Hitchance", 38);
		UI.SetValue("Rage", "HEAVY PISTOL", "Accuracy", "Hitchance", 50);
		UI.SetValue("Rage", "SCOUT", "Accuracy", "Hitchance", 80);
		UI.SetValue("Rage", "AWP", "Accuracy", "Hitchance", 84);
	}
	
		if ((g_Local_classname == "CWeaponAWP" && UI.IsHotkeyActive("Rage", "AWP", "Damage", "Minimum damage (on key)")))
		{
			UI.SetValue("Rage", "AWP", "Accuracy", "Accuracy boost", 80);
		    isAwpMindmg = true
		}
		else
		{
			UI.SetValue("Rage", "AWP", "Accuracy", "Accuracy boost", 88);
		    isAwpMindmg = false
		}
		
}
	
	if(drawDangerous && localplayer_alive == true)
	{
		Render.String(screen_size[0] /2 , screen_size[1] /2 +53, 1, isInverted ? "Left" : "Right", [ 57, 172, 115, 255 ],3,9 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +80, 1, isDoubletap ? "DoubleTap" : "DoubleTap", isDoubletap ? [ 57, 172, 115, 255 ] : [ 255, 0, 0, 0 ],3,4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isHideShots ? "Onshot" : "Onshot", isHideShots ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -35 , screen_size[1] /3 -35, 1, isMagicKey ? "WARNING!" : "WARNING!", isMagicKey ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 +35 , screen_size[1] /3 -35, 1, isMagicKey ? "delay shot" : "delay shot", isMagicKey ? [ 0, 204, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +5, 1, isDangerous ? "Dangerous" : "Dangerous", isDangerous ? [ 255, 0, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +105, 1, isSafePoints ? "Very safety" : "Very safety", isSafePoints ? [ 255, 192, 203, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -893 , screen_size[1] /2 +450, 1, isFreestand ? "Freestand" : "Freestand", isFreestand ? [ 255, 255, 255, 255 ] : [ 0, 204, 0, 0 ],4 );
		Render.String(screen_size[0] /2 -900 , screen_size[1] /2 +420, 1, isAwpMindmg ? "Mindmg" : "Mindmg", isAwpMindmg ? [ 255, 255, 255, 255 ] : [ 255, 255, 255, 0 ],4 );
	}
	
	if(drawLeft && localplayer_alive == true)
	{
		Render.String(screen_size[0] /2 , screen_size[1] /2 +53, 1, isInverted ? "Left" : "Right", [ 57, 172, 115, 255 ],3,9 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +80, 1, isDoubletap ? "DoubleTap" : "DoubleTap", isDoubletap ? [ 57, 172, 115, 255 ] : [ 255, 0, 0, 0 ],3,4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isHideShots ? "Onshot" : "Onshot", isHideShots ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -35 , screen_size[1] /3 -35, 1, isMagicKey ? "WARNING!" : "WARNING!", isMagicKey ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 +35 , screen_size[1] /3 -35, 1, isMagicKey ? "delay shot" : "delay shot", isMagicKey ? [ 0, 204, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +5, 1, isDangerous ? "Dangerous" : "Dangerous", isDangerous ? [ 255, 0, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +105, 1, isSafePoints ? "Very safety" : "Very safety", isSafePoints ? [ 255, 192, 203, 255 ] : [ 0, 204, 0, 0 ],3,5 );
        Render.String(screen_size[0] /2 -893 , screen_size[1] /2 +450, 1, isFreestand ? "Freestand" : "Freestand", isFreestand ? [ 255, 255, 255, 255 ] : [ 0, 204, 0, 0 ],4 );
		Render.String(screen_size[0] /2 -900 , screen_size[1] /2 +420, 1, isAwpMindmg ? "Mindmg" : "Mindmg", isAwpMindmg ? [ 255, 255, 255, 255 ] : [ 255, 255, 255, 0 ],4 );
	}
	else if(drawRight && localplayer_alive == true)
	{	
		Render.String(screen_size[0] /2 , screen_size[1] /2 +53, 1, isInverted ? "Left" : "Right", [ 57, 172, 115, 255 ],3,9 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +80, 1, isDoubletap ? "DoubleTap" : "DoubleTap", isDoubletap ? [ 57, 172, 115, 255 ] : [ 255, 0, 0, 0 ],3,4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isHideShots ? "Onshot" : "Onshot", isHideShots ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -35 , screen_size[1] /3 -35, 1, isMagicKey ? "WARNING!" : "WARNING!", isMagicKey ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 +35 , screen_size[1] /3 -35, 1, isMagicKey ? "delay shot" : "delay shot", isMagicKey ? [ 0, 204, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +5, 1, isDangerous ? "Dangerous" : "Dangerous", isDangerous ? [ 255, 0, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +105, 1, isSafePoints ? "Very safety" : "Very safety", isSafePoints ? [ 255, 192, 203, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -893 , screen_size[1] /2 +450, 1, isFreestand ? "Freestand" : "Freestand", isFreestand ? [ 255, 255, 255, 255 ] : [ 0, 204, 0, 0 ],4 );
		Render.String(screen_size[0] /2 -900 , screen_size[1] /2 +420, 1, isAwpMindmg ? "Mindmg" : "Mindmg", isAwpMindmg ? [ 255, 255, 255, 255 ] : [ 255, 255, 255, 0 ],4 );
	}
	else if(drawBack && localplayer_alive == true)
	{
		Render.String(screen_size[0] /2 , screen_size[1] /2 +53, 1, isInverted ? "Left" : "Right", [ 57, 172, 115, 255 ],3,9 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isDoubletap ? "DoubleTap" : "DoubleTap", isDoubletap ? [ 57, 172, 115, 255 ] : [ 255, 0, 0, 0 ],3,4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isHideShots ? "Onshot" : "Onshot", isHideShots ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -35 , screen_size[1] /3 -35, 1, isMagicKey ? "WARNING!" : "WARNING!", isMagicKey ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 +35 , screen_size[1] /3 -35, 1, isMagicKey ? "delay shot" : "delay shot", isMagicKey ? [ 0, 204, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +5, 1, isDangerous ? "Dangerous" : "Dangerous", isDangerous ? [ 255, 0, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +105, 1, isSafePoints ? "Very safety" : "Very safety", isSafePoints ? [ 255, 192, 203, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -893 , screen_size[1] /2 +450, 1, isFreestand ? "Freestand" : "Freestand", isFreestand ? [ 255, 255, 255, 255 ] : [ 0, 204, 0, 0 ],4 );
		Render.String(screen_size[0] /2 -900 , screen_size[1] /2 +420, 1, isAwpMindmg ? "Mindmg" : "Mindmg", isAwpMindmg ? [ 255, 255, 255, 255 ] : [ 255, 255, 255, 0 ],4 );
	}
	else if(drawHideReal && localplayer_alive == true)
	{
		Render.String(screen_size[0] /2 , screen_size[1] /2 +53, 1, isInverted ? "Left" : "Right", [ 57, 172, 115, 255 ],3,9 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isDoubletap ? "DoubleTap" : "DoubleTap", isDoubletap ? [ 57, 172, 115, 255 ] : [ 255, 0, 0, 0 ],3,4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +67, 1, isHideShots ? "Onshot" : "Onshot", isHideShots ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -35 , screen_size[1] /3 -35, 1, isMagicKey ? "WARNING!" : "WARNING!", isMagicKey ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 +35 , screen_size[1] /3 -35, 1, isMagicKey ? "delay shot" : "delay shot", isMagicKey ? [ 0, 204, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +5, 1, isDangerous ? "Dangerous" : "Dangerous", isDangerous ? [ 255, 0, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +105, 1, isSafePoints ? "Very safety" : "Very safety", isSafePoints ? [ 255, 192, 203, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -893 , screen_size[1] /2 +450, 1, isFreestand ? "Freestand" : "Freestand", isFreestand ? [ 255, 255, 255, 255 ] : [ 0, 204, 0, 0 ],4 );
		Render.String(screen_size[0] /2 -900 , screen_size[1] /2 +420, 1, isAwpMindmg ? "Mindmg" : "Mindmg", isAwpMindmg ? [ 255, 255, 255, 255 ] : [ 255, 255, 255, 0 ],4 );
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
	if(isDangerousActive)
	{
		
		if (Global.Tickcount() > olDoubleTapick + 16)
		{
			backWasPressed = false
			rightWasPressed = false
			leftWasPressed = false
			dangerousWasPressed = true
			olDoubleTapick = Global.Tickcount();
		}
		
		drawLeft = 0;
		drawBack = 0;
		drawRight = 0;
		drawDangerous = 1;
		AntiAim.SetOverride(1);
        AntiAim.SetFakeOffset(30); // <----- This will setup your fake offset.
        AntiAim.SetRealOffset(-30);
        AntiAim.SetLBYOffset(90);
	}
	else
	{
		AntiAim.SetOverride(0);
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
	UI.AddCheckbox("tank aa");
	UI.AddHotkey( "Magic key" );
	UI.AddHotkey( "Dangerous AA" );
	UI.AddHotkey( "Freestand on Key" );
	UI.AddCheckbox( "Autowall fix" );
	UI.AddHotkey( "Wavy style" );
	UI.AddCheckbox( "1000$ script" );
	UI.AddDropdown( "Play sound", ["Lovi pilulu frayer", "Poluchay pidor", "Vlip ochkarik", "Zdes vam ne kurort", "V golovu"]);
	
	//  callbacks
	Global.RegisterCallback("Draw", "drawString")
	Global.RegisterCallback("CreateMove", "onCreateMove")
	Global.RegisterCallback("player_connect_full", "player_connect")
	Cheat.RegisterCallback("player_death", "playSoundOnKill");
}
Main();