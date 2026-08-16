UI.AddCheckbox("Hide Chat");
function hide()
{


var i_chat = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Hide Chat");
if (i_chat)
{
    Cheat.ExecuteCommand("cl_chatfilters 0")
}
else
{
    Cheat.ExecuteCommand("cl_chatfilters 63")
}


}
Cheat.RegisterCallback("CreateMove", "hide");