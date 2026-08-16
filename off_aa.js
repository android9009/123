function disable_i()
{
    UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Enabled", false);
    UI.SetValue( "Anti-Aim", "Fake-Lag", "Enabled", false);
}

Cheat.RegisterCallback("round_end", "disable_i");

function enable_i()
{
    UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Enabled", true);
    UI.SetValue( "Anti-Aim", "Fake-Lag", "Enabled", true);
}

Cheat.RegisterCallback("round_start", "enable_i");