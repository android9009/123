UI.AddCheckbox("Enable");
//UI.AddDropdown("Tab", [ "GENERAL", "PISTOL", "HEAVY PISTOL", "SCOUT", "AWP", "AUTOSNIPER"] );
UI.AddHotkey("Hitbox Override Key");
UI.AddMultiDropdown("Hitbox Override", [ "Head", "Upper Chest", "Chest", "Lower Chest", "Stomach", "Pelvis", "Legs", "Feet" ] );
UI.AddMultiDropdown("Base Hitboxes", [ "Head", "Upper Chest", "Chest", "Lower Chest", "Stomach", "Pelvis", "Legs", "Feet" ] );

//Cheat.PrintChat(GetScriptOption("Tab") + "\n");

function override()
{
    if(!(GetScriptOption("Enable"))) return;
    if(UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Hitbox Override Key") === 1)
    {
        if(GetScriptOption("Hitbox Override") != 0) UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Hitboxes", GetScriptOption("Hitbox Override"));
        uired = 0;
        uigreen = 255;

    }
    else
    {
        UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Hitboxes", GetScriptOption("Base Hitboxes"));
        uired = 255;
        uigreen = 0;
    }
}

function GetScriptOption(Name)
{
    var Value = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", Name);
    return Value;
}

Cheat.RegisterCallback("Draw", "override");
