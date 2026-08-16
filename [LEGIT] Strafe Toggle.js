/*
|
|   Date: 20/02/2020
|   Project: Autostrafe toggle
|   By: Sean
|   notes: Credit to Edeen for proofreading and assisting with getting strafe condition checks in order.
|
*/

UI.AddLabel("________________________________________");
UI.AddLabel("                 Toggle Strafe");
UI.AddHotkey("set toggle key");
UI.AddLabel("________________________________________");




var strafe_state = UI.GetValue("Misc", "GENERAL", "Movement", "Auto strafe")

function strafe_toggle()
{
if (UI.IsHotkeyActive("Script items", "set toggle key")  == true)
{
UI.SetValue("Misc", "GENERAL", "Movement", "Auto strafe", strafe_state)
}
if (UI.IsHotkeyActive("Script items", "set toggle key")  == false)
{
UI.SetValue("Misc", "GENERAL", "Movement", "Auto strafe", 0)
}
}

function Indicator(){

    if (UI.IsHotkeyActive("Script items", "set toggle key") != true)
    {
        Render.String(10, 10, 0, "Strafe Disabled", [255, 0 , 0, 255], 4);
    }
    else
    {
        Render.String(10, 10, 0, "Strafe Enabled", [0, 255 , 0, 255], 4);
    }

}
Cheat.RegisterCallback("Draw", "Indicator")
Global.RegisterCallback("CreateMove", "strafe_toggle")