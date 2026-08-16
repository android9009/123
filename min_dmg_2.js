UI.AddCheckbox("Display indicator")
UI.AddHotkey("Override min dmg")
UI.AddSliderInt("Heavy Pistol Mindmg", 0, 130)
UI.AddSliderInt("Scout Mindmg", 0, 130)
UI.AddSliderInt("AWP Mindmg", 0, 130)
UI.AddSliderInt("Auto Mindmg", 0, 130)

var heavy_cache = UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage")
var scout_cache = UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
var awp_cache = UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
var auto_cache = UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")
function isActive(a)
{
    return UI.IsHotkeyActive("Script items", a)
}
function setValue(cat, value)
{
    UI.SetValue("Rage", cat.toUpperCase(), "Targeting", "Minimum damage", value)
}
var first = true;
function isHeavyPistol(name)
{
    if (name == "r8 revolver" || name == "desert eagle")
    {
        return true
    }
}
function isAutoSniper(name)
{
    if(name == "scar 20" || name == "g3sg1")
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

    if (UI.IsMenuOpen( ) == true)
    {
        if(first)
        {
          setValue("SCOUT", scout_cache)
          setValue("HEAVY PISTOL", heavy_cache)
          setValue("AWP", awp_cache)
          setValue("AUTOSNIPER", auto_cache)
          first = false;
        }
        heavy_cache = UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage")
        scout_cache = UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
        awp_cache = UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
        auto_cache = UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")
        return;
    }
    else
    {
      first = true;
    }

    if (isActive("Override min dmg"))
    {
        setValue("SCOUT", scout_value)
        setValue("AWP", awp_value)
        setValue("HEAVY PISTOL", heavy_value)
        setValue("AUTOSNIPER", auto_value)
        return;
    }
    else{
        setValue("SCOUT", scout_cache)
        setValue("HEAVY PISTOL", heavy_cache)
        setValue("AWP", awp_cache)
        setValue("AUTOSNIPER", auto_cache)
      
    }

}
function indicator()
{
    screen = Render.GetScreenSize()
    wep = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    x = screen[0]/55
    y = screen[1]/2
    heavy = "DMG: " + UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage")
    scout = "DMG: " + UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
    awp = "DMG: " + UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
    auto = "DMG: " + UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")
    var str = ""
    if (UI.GetValue("Script items", "Display indicator") && Entity.IsValid(Entity.GetLocalPlayer()) && Entity.IsAlive(Entity.GetLocalPlayer()))
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
    Render.String(x, y, 0, str+"", [255,255,255,255])
}
Cheat.RegisterCallback("Draw", "indicator")
Cheat.RegisterCallback("CreateMove", "onCM")