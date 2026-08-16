var screen_size = Global.GetScreenSize();
var isInverted; 
var drawDangerous = 1;

var heavy_cache = UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage")
var scout_cache = UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
var awp_cache = UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
var auto_cache = UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")

function isActive(a)
{
    return UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", a)
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
    heavy_value = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Heavy Pistol Mindmg")
    scout_value = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Scout Mindmg")
    awp_value = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "AWP Mindmg")
    auto_value = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Auto Mindmg")
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
    heavy = UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage")
    scout = UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
    awp = UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
    auto = UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")
    var str = ""
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Show currently mindamage") && Entity.IsValid(Entity.GetLocalPlayer()) && Entity.IsAlive(Entity.GetLocalPlayer()))
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
        Render.String(screen_size[0] /2 -935 , screen_size[1] /2 +225, 1, str+"", [255,255,255,255], 4)
}

function drawString()
{
	isDoubletap = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap");
	isInverted = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
	isHideReal = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Hide real angle");
	isHideShots = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots");
	isMagicKey = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Magic key");
	isFreestand = UI.IsHotkeyActive ("Misc", "JAVASCRIPT", "Script items", "Freestand on Key");
	isFakeDuck = UI.IsHotkeyActive ("Anti-Aim", "Extra", "Fake duck");
	isIndicators = UI.IsHotkeyActive ("Misc", "JAVASCRIPT", "Script items", "Indicators");
	isSyncFake = UI.IsHotkeyActive ("Misc", "JAVASCRIPT", "Script items", "Sync fake on key");
	isIndFb = UI.IsHotkeyActive ("Rage", "GENERAL", "General", "Force body aim");
	isIndSp = UI.IsHotkeyActive ("Rage", "GENERAL", "General", "Force safe point");
	isIndLag = UI.GetValue ("Anti-Aim", "Fake-Lag", "Enabled");
	{
		

	if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots"))
	{
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Hide shots", true);
		UI.SetValue( "Rage", "AUTOSNIPER", "Accuracy", "Prefer body aim", false );
		isDoubletap = false
		isHideShots = true
	}
	else if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))
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
    else if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots"))
	{
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		
		isDoubletap = false
	}
	else
	
		if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Freestand on Key"))
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
	
	
	
	if ((UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Magic key")) && localplayer_alive == true)
	{
		UI.SetValue( "Rage", "GENERAL", "Exploits", "Doubletap", false);
		isDoubletap = false
	}
	
		if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Indicators") == true)
	{
		isIndicators = true;
	}
	
		if (UI.GetValue ("Misc", "JAVASCRIPT", "Script items", "Indicators") == true && localplayer_alive == true)
		{
	      Render.String(screen_size[0] /2 -935 , screen_size[1] /2 +198, 1, isIndFb ? "fb" : "fb", isIndFb ? [ 127, 255, 0, 255 ] : [ 255, 0, 0, 255 ],4 );
		  Render.String(screen_size[0] /2 -890 , screen_size[1] /2 +222, 1, isIndSp ? "sp" : "sp", isIndSp ? [ 127, 255, 0, 255 ] : [ 255, 0, 0, 255 ],4 );
		  Render.String(screen_size[0] /2 -855 , screen_size[1] /2 +198, 1, isIndLag ? "lag" : "lag", isIndLag ? [ 127, 255, 0, 255 ] : [ 255, 0, 0, 255 ],4 );
		}


     if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable Anti-Aim") == true && localplayer_alive == true)
     {
	  Render.String(screen_size[0] /2 , screen_size[1] /2 +25, 1, "fake yaw", [ 207, 177, 255, 255 ] );
     }
	  
     if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Sync fake on key") == true && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable Anti-Aim") == true && localplayer_alive == true)
     {
       UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", 1);
	   isSyncFake = true;
       Render.String(screen_size[0] /2 , screen_size[1] /2 +38, 1, "dynamic", [ 207, 177, 255, 255 ] );
     }
     else if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Sync fake on key") == false && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable Anti-Aim") == true && localplayer_alive == true)
     {
	  Render.String(screen_size[0] /2 , screen_size[1] /2 +38, 1, "defoult", [ 255, 0, 0, 255 ] );
      UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", 0);
     }
	
	if(drawDangerous && localplayer_alive == true)
	{
		Render.String(screen_size[0] /2 , screen_size[1] /2 +52, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 65, 105, 225, 255 ] : [ 255, 0, 0, 0 ] );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +52, 1, isHideShots ? "AA" : "AA", isHideShots ? [ 65, 105, 225, 255 ] : [ 255, 0, 0, 0 ] );
		Render.String(screen_size[0] /2 -35 , screen_size[1] /3 -35, 1, isMagicKey ? "WARNING!" : "WARNING!", isMagicKey ? [ 255, 0, 0, 255 ] : [ 255, 0, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 +35 , screen_size[1] /3 -35, 1, isMagicKey ? "delay shot" : "delay shot", isMagicKey ? [ 0, 204, 0, 255 ] : [ 0, 204, 0, 0 ],3,5 );
		Render.String(screen_size[0] /2 -893 , screen_size[1] /2 +450, 1, isFreestand ? "Freestand" : "Freestand", isFreestand ? [ 255, 255, 255, 255 ] : [ 0, 204, 0, 0 ],4 );
	}
  }
}


var olDoubleTapick = 0
var lastPressed = 0


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
	UI.AddCheckbox("Indicators");
	UI.AddHotkey("Magic key");
	
    UI.AddCheckbox("Show currently mindamage")
	UI.AddHotkey("Minimum Damage Override")
    UI.AddSliderInt("Heavy Pistol Mindmg", 0, 130)
    UI.AddSliderInt("Scout Mindmg", 0, 130)
    UI.AddSliderInt("AWP Mindmg", 0, 130)
    UI.AddSliderInt("Auto Mindmg", 0, 130)

    UI.AddLabel("                   Anti-Aim            ");
    UI.AddCheckbox("Enable Anti-Aim");
    UI.AddHotkey("Sync fake on key");
    UI.AddHotkey("Freestand on Key");
    UI.AddCheckbox("Safe head");
	
	//  callbacks
	Global.RegisterCallback("Draw", "drawString")
	Global.RegisterCallback("player_connect_full", "player_connect")
	Cheat.RegisterCallback("CreateMove", "onCM")
	Cheat.RegisterCallback("Draw", "indicator")
}
Main();
