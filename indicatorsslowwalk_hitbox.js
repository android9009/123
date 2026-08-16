UI.AddCheckbox("Draw indicators");
UI.AddSliderInt("Indicator offset", 1, 100);

function drawFunction(){
    var shouldDraw = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Draw indicators");
    if (shouldDraw) {
        
        var screen_size = Global.GetScreenSize();
        var x = screen_size[0] / 92
        var y = screen_size[1] - (UI.GetValue("Misc", "JAVASCRIPT", "Script Items","Indicator offset") * 10)

        var keybindArray = [
            
        ];
        if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
            keybindArray.push("SLOW")
        }
        if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
            keybindArray.push("DUCK")
        }
        if (UI.IsHotkeyActive("Rage", "General", "General", "Safe point override")) {
            keybindArray.push("SAFE")
        }
        if (UI.IsHotkeyActive("Rage", "Pistol", "Damage", "Minimum damage (on key)")) {
            keybindArray.push("MIN DMG")
        }
        if (UI.IsHotkeyActive("Rage", "Pistol", "Pistol config", "Hitbox override")) {
            keybindArray.push("HITBOX")
        }
        var text_size = 4
        
        for (var i=0;i < keybindArray.length;i++) {
            //Global.Print("STD:" + keybindArray[i][0])
            var textHeight = text_size*5.5
            var y_add = (textHeight * i)
            Render.String( x, y - y_add, 0, keybindArray[i], [124,195,13,255],text_size);
        }
    }
}
Global.RegisterCallback("Draw","drawFunction")