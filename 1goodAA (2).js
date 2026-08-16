UI.AddLabel("===================")
UI.AddLabel("static desync & instant invert")
UI.AddLabel("status: loaded")
UI.AddCheckbox("enable invert on local shot")
UI.AddLabel("===================")

function main() {

    var Inverted = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter") 
    if(Inverted) {
        AntiAim.SetOverride(1);
        AntiAim.SetFakeOffset(0);
        AntiAim.SetRealOffset(-45);
        AntiAim.SetLBYOffset(0);
    } else {
        AntiAim.SetOverride(1);
        AntiAim.SetFakeOffset(0);
        AntiAim.SetRealOffset(45);
        AntiAim.SetLBYOffset(0);
    }
}


function invert()
{
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "enable invert on local shot"))
    UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter")
}
Global.RegisterCallback("ragebot_fire", "invert");


Cheat.RegisterCallback("CreateMove", "main");