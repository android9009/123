

UI.AddCheckbox("Vizualize Indicators");
UI.AddSliderInt("Indicator Y Position", 1, 100);

function drawFunction(){
    var shouldDraw = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Vizualize Indicators");
    if (shouldDraw) {
       
        var screen_size = Global.GetScreenSize();
        var x = screen_size[0] / 92
        var y = screen_size[1] - (UI.GetValue("Misc", "JAVASCRIPT", "Script Items","Indicator Y Position") * 10)

        var hotkeyArray = [
           
        ];
        if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
            hotkeyArray.push("SHIFT")
        }
        if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
            hotkeyArray.push("FD")
        }
        if (UI.IsHotkeyActive("Rage", "General", "General", "Safe point override")) {
            hotkeyArray.push("SAFEPOINT")
        }
        if (UI.IsHotkeyActive("Rage", "Pistol", "Damage", "Minimum damage (on key)")) {
            hotkeyArray.push("MINDMG")
        }
        if (UI.IsHotkeyActive("Rage", "Pistol", "Pistol config", "Hitbox override")) {
            hotkeyArray.push("HITBOX")
    }
        if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
            hotkeyArray.push("180Z")
    }
        if (UI.IsHotkeyActive("Misc", "General", "Movement", "Auto peek")) {
            hotkeyArray.push("AUTO PEEK")
    }
    if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap")) {
        hotkeyArray.push("DT")
        }
        var text_size = 4
       
        for (var i=0;i < hotkeyArray.length;i++) {
            //Global.Print("STD:" + hotkeyArray[i][0])
            var textHeight = text_size*5.5
            var y_add = (textHeight * i)
            Render.String( x, y - y_add, 0, hotkeyArray[i], [124,195,13,255],text_size);  
        }
    }
}
Global.RegisterCallback("Draw","drawFunction")

