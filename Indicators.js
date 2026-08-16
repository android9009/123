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
        
        if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
            keybindArray.push("DUCK")
        }
        if (UI.IsHotkeyActive("Rage", "General", "General", "Safe point override")) {
            keybindArray.push("SP")
        }
        if (UI.IsHotkeyActive("Rage", "Pistol", "Damage", "Minimum damage (on key)")) {
            keybindArray.push("DMG")
        }
        if (UI.IsHotkeyActive("Rage", "Pistol", "Pistol config", "Hitbox override")) {
            keybindArray.push("FB")
        }   
        var text_size = 4
        
        for (var i=0;i < keybindArray.length;i++) {
            //Global.Print("STD:" + keybindArray[i][0])
            var textHeight = text_size*5.5
            var y_add = (textHeight * i)
            var clr = [124,195,13,255]
            if (keybindArray[i] == "DMG") {
                clr = [255,255,255,255]
            }
            if (keybindArray[i] == "SP") {
                clr = [124,195,13,255]
            }
            if (keybindArray[i] == "FB") {
                clr = [124,195,13,255]
            }
             if (keybindArray[i] == "DUCK") {
                clr = [255,255,255,255]
            }       
            Render.String( x, y - y_add, 0, keybindArray[i], clr,text_size);
        }
    }
}
Global.RegisterCallback("Draw","drawFunction")