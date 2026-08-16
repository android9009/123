UI.AddHotkey('Legit aa');

function Legit()
{
    localplayer_index = Entity.GetLocalPlayer( );


        if (UI.IsHotkeyActive('Script items', 'Legit aa'))
        {
            UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset', 180);
            UI.SetValue('Anti-Aim', 'Extra', 'Pitch', 0);
        }
        else
        {
            UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset', 0);
            UI.SetValue('Anti-Aim', 'Extra', 'Pitch', 1);
        }
}

function Main()
{
    Cheat.RegisterCallback("CreateMove", "Legit");
}
Main();