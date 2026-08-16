var jitter_cache = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset")
var yaw_cache = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset")
UI.AddCheckbox("Safe head");

function Safe_Head()
{
    localplayer_index = Entity.GetLocalPlayer( );


        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Safe head") && UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk"))
        {
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0);
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(0);
            AntiAim.SetRealOffset(-16);
        }
        else
        {
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_cache);
            AntiAim.SetOverride(0);
        }
}

function Main()
{
    Cheat.RegisterCallback("CreateMove", "Safe_Head");
}
Main();