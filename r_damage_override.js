var screen_size = Global.GetScreenSize();

function isActive(a)
{
    return UI.IsHotkeyActive("Script items", a)
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


	g_Local = Entity.GetLocalPlayer( );
	g_Local_weapon = Entity.GetWeapon(g_Local);
	weapon_name = Entity.GetName(g_Local_weapon);
	g_Local_classname = Entity.GetClassName( g_Local_weapon );


var restore_values = false
function override_mindmg()
{
	if(!isActive("Minimum damage override"))
	{
		if (restore_values)
		{
			restore_values = false;
	
			setValue("HEAVY PISTOL", heavy_cache)
			setValue("SCOUT", scout_cache)
			setValue("AWP", awp_cache)
			setValue("AUTOSNIPER", auto_cache)
		}
		else
		{
 			heavy_cache = UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage")
 			scout_cache = UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
 			awp_cache = UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
 			auto_cache = UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")
		}

		return;
	}

	restore_values = true;
	
	heavy_value = UI.GetValue("Misc","JAVASCRIPT","Script items", "Heavy Pistol Mindmg")
    scout_value = UI.GetValue("Misc","JAVASCRIPT","Script items", "Scout Mindmg")
    awp_value = UI.GetValue("Misc","JAVASCRIPT","Script items", "AWP Mindmg")
    auto_value = UI.GetValue("Misc","JAVASCRIPT","Script items", "Auto Mindmg")
    weapon_name = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))

    if (isHeavyPistol(weapon_name))
    {
		setValue("HEAVY PISTOL", heavy_value)
    }
    
    if (weapon_name == "ssg 08")
    {
		setValue("SCOUT", scout_value)
    }

    if (weapon_name == "awp")
    {
		setValue("AWP", awp_value)
    }

    if (isAutoSniper(weapon_name))
    {    
		setValue("AUTOSNIPER", auto_value)
    }
}

var oldTick = 0
var lastPressed = 0
var isHideRealActive = false
function onCreateMove()
{
	override_mindmg();
}
function player_connect(){
    lastPressed = Global.Tickcount();
    oldTick = Global.Tickcount();
}

function Main()
{

	UI.AddHotkey("Minimum damage override")
	UI.AddSliderInt("Heavy Pistol Mindmg", 0, 130)
	UI.AddSliderInt("Scout Mindmg", 0, 130)
	UI.AddSliderInt("AWP Mindmg", 0, 130)
	UI.AddSliderInt("Auto Mindmg", 0, 130)
	
	//  callbacks
	Global.RegisterCallback("CreateMove", "onCreateMove")
	Global.RegisterCallback("player_connect_full", "player_connect")
}


Main();
