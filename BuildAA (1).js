UI.AddSliderFloat("LBY offset", -180, 180)
UI.AddSliderFloat("Real offset", -180, 180)
UI.AddSliderFloat("Fake offset", -180, 180)

UI.AddSliderFloat("Inverted LBY offset", -180, 180)
UI.AddSliderFloat("Inverted Real offset", -180, 180)
UI.AddSliderFloat("Inverted Fake offset", -180, 180)

function main() {
    var LBYOffset = UI.GetValue ("Misc", "JAVASCRIPT", "Script Items", "LBY offset")
    var RealOffset = UI.GetValue ("Misc", "JAVASCRIPT", "Script Items", "Real offset")
    var FakeOffset = UI.GetValue ("Misc", "JAVASCRIPT", "Script Items", "Fake offset")

    var LBYInvert = UI.GetValue ("Misc", "JAVASCRIPT", "Script Items", "Inverted LBY offset")
    var RealInvert = UI.GetValue ("Misc", "JAVASCRIPT", "Script Items", "Inverted Real offset")
    var FakeInvert = UI.GetValue ("Misc", "JAVASCRIPT", "Script Items", "Inverted Fake offset")

    var Inverted = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")

    if(Inverted) {
        AntiAim.SetOverride(1);
        AntiAim.SetFakeOffset(FakeInvert);
        AntiAim.SetRealOffset(RealInvert);
        AntiAim.SetLBYOffset(LBYInvert);
    } else {
        AntiAim.SetOverride(1);
        AntiAim.SetFakeOffset(FakeOffset);
        AntiAim.SetRealOffset(RealOffset);
        AntiAim.SetLBYOffset(LBYOffset);
    }
}
Cheat.RegisterCallback("CreateMove", "main");