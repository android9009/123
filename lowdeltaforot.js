UI.AddLabel("Low Delta by DZH1GURD4");
UI.AddHotkey("Invertor Key");

function override () {
    if(UI.IsHotkeyActive("Script items","Invertor Key")){
        AntiAim.SetOverride(1)
        AntiAim.SetFakeOffset(4)
        AntiAim.SetRealOffset(-12)
        AntiAim.SetLBYOffset(16)
    }else{
        AntiAim.SetOverride(1)
        AntiAim.SetFakeOffset(-4)
        AntiAim.SetRealOffset(12)
        AntiAim.SetLBYOffset(-16)
    }
}

function onunload() {
    AntiAim.SetOverride(0)
}

Cheat.RegisterCallback("Unload", "onunload")
Cheat.RegisterCallback("CreateMove","override");