UI.AddCheckbox("Legitbot weapon configurator")
UI.AddDropdown("Weapon", ["none", "usp s", "r8 revolver", "cz75 auto", "desert eagle", "dual berettas", "five seven", "glock 18", "p2000", "p250", "tec 9"])

var weapons = {
    "usp s" : {  
        fov: 0.00,
        deadzone: 0.00,
        speed_yaw: 0,
        speed_pitch: 0,
        rcs: 0,
        assist: 0
    },
    "r8 revolver" : {
        fov: 0.00,
        deadzone: 0.00,
        speed_yaw: 0,
        speed_pitch: 0,
        rcs: 0,
        assist: 0
    },
    "cz75 auto" : {
        fov: 0.00,
        deadzone: 0.00,
        speed_yaw: 0,
        speed_pitch: 0,
        rcs: 0,
        assist: 0
    },
    "desert eagle" : {
        fov: 0.00,
        deadzone: 0.00,
        speed_yaw: 0,
        speed_pitch: 0,
        rcs: 0,
        assist: 0
    },
    "dual berettas" : {
        fov: 0.00,
        deadzone: 0.00,
        speed_yaw: 0,
        speed_pitch: 0,
        rcs: 0,
        assist: 0
    },
    "five seven" : {
        fov: 0.00,
        deadzone: 0.00,
        speed_yaw: 0,
        speed_pitch: 0,
        rcs: 0,
        assist: 0
    },
    "glock 18" : {
        fov: 0.00,
        deadzone: 0.00,
        speed_yaw: 0,
        speed_pitch: 0,
        rcs: 0,
        assist: 0
    },
    "p2000" : {
        fov: 0.00,
        deadzone: 0.00,
        speed_yaw: 0,
        speed_pitch: 0,
        rcs: 0,
        assist: 0
    },
    "p250" : {
        fov: 0.00,
        deadzone: 0.00,
        speed_yaw: 0,
        speed_pitch: 0,
        rcs: 0,
        assist: 0
    },
    "tec 9" : {
        fov: 0.00,
        deadzone: 0.00,
        speed_yaw: 0,
        speed_pitch: 0,
        rcs: 0,
        assist: 0
    }

}

function menuOpt()
{
    for (var wep in weapons)
    {
        UI.AddSliderFloat(wep + " Fov", 0.00, 30.00)
        UI.AddSliderFloat(wep + " Deadzone", 0.00, 1.00)
        UI.AddSliderInt(wep + " Speed yaw", 0, 100)
        UI.AddSliderInt(wep + " Speed pitch", 0, 100)
        UI.AddSliderInt(wep + " Recoil control", 0, 100)
        UI.AddSliderInt(wep + " Assist", 0, 100)
    }
}
menuOpt()

function menuVisibility()
{
    result = UI.GetString("Script items", "Weapon");
    for (var weapon in weapons)
    {
        UI.SetEnabled(weapon + " Fov", result == weapon)
        UI.SetEnabled(weapon + " Deadzone", result == weapon)
        UI.SetEnabled(weapon + " Speed yaw", result == weapon)
        UI.SetEnabled(weapon + " Speed pitch", result == weapon)
        UI.SetEnabled(weapon + " Recoil control", result == weapon)
        UI.SetEnabled(weapon + " Assist", result == weapon)
        weapons[weapon].fov = UI.GetValue(weapon + " Fov")
        weapons[weapon].deadzone = UI.GetValue(weapon + " Deadzone")
        weapons[weapon].speed_yaw = UI.GetValue(weapon + " Speed yaw")
        weapons[weapon].speed_pitch = UI.GetValue(weapon + " Speed pitch")
        weapons[weapon].rcs = UI.GetValue(weapon + " Recoil control")
        weapons[weapon].assist = UI.GetValue(weapon + " Assist")
    }

}
Global.RegisterCallback("Draw", "menuVisibility");


function main()
{
    getWeapon = Entity.GetWeapon(Entity.GetLocalPlayer())
    curWeapon = Entity.GetName(getWeapon)
    enabled = UI.GetValue("Script items", "Legitbot weapon configurator")
    if (enabled == true && Entity.IsValid(Entity.GetLocalPlayer()) && Entity.IsAlive(Entity.GetLocalPlayer()))
    {
        for (var wep in weapons)
        {
            if (curWeapon == wep)
            {
                UI.SetValue("Legit", "PISTOL", "Pistol config", "Fov", weapons[curWeapon].fov)
                UI.SetValue("Legit", "PISTOL", "Pistol config", "Deadzone", weapons[curWeapon].deadzone)
                UI.SetValue("Legit", "PISTOL", "Pistol config", "Speed (yaw)", weapons[curWeapon].speed_yaw)
                UI.SetValue("Legit", "PISTOL", "Pistol config", "Speed (pitch)", weapons[curWeapon].speed_pitch)
                UI.SetValue("Legit", "PISTOL", "Pistol config", "Recoil control", weapons[curWeapon].rcs)
                UI.SetValue("Legit", "PISTOL", "Pistol config", "Assist", weapons[curWeapon].assist)
            }
        }  
    }
}
Cheat.RegisterCallback("CreateMove", "main")