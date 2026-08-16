UI.AddCheckbox("Fast duck");

function on_create_move()
{
    var buttons = UserCMD.GetButtons();
    
    if(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Fast duck"))
        UserCMD.SetButtons(buttons | (1 << 22));
}

Cheat.RegisterCallback("CreateMove", "on_create_move");