UI.AddCheckbox("Use custom anti-aim");
UI.AddSliderInt("Real", -180,180);
UI.AddSliderInt("Fake", -60,60);
UI.AddSliderInt("Real yaw offset", 0,60);
UI.AddSliderInt("Fake yaw offset", 0,60);
UI.AddCheckbox("Use eye yaw for LBY");
//fuck yall losers putting your UI initialization into functions like fucking clowns Ill fuck u up

var scriptitems = ["Misc", "JAVASCRIPT", "Script Items"];

function menu_cb() {
    var enabled = UI.GetValue(scriptitems, "Use custom anti-aim");
    UI.SetEnabled(scriptitems, "Real", enabled);
    UI.SetEnabled(scriptitems, "Fake", enabled);
    UI.SetEnabled(scriptitems, "Real yaw offset", enabled);
    UI.SetEnabled(scriptitems, "Fake yaw offset", enabled);
    UI.SetEnabled(scriptitems, "Use eye yaw for LBY", enabled);
}

function draw_custom_aa() {
    menu_cb();
}

function cm_custom_aa() {
    var enabled = UI.GetValue(scriptitems, "Use custom anti-aim");
    if (enabled) {
        AntiAim.SetOverride(1);
        var caa_fake = UI.GetValue(scriptitems, "Fake");
        var caa_real = UI.GetValue(scriptitems, "Real");
        var caa_use_ey = UI.GetValue(scriptitems, "Use eye yaw for LBY");
        var caa_ryaw_offset_val = UI.GetValue(scriptitems, "Real yaw offset");
        var caa_fyaw_offset_val = UI.GetValue(scriptitems, "Fake yaw offset");
       
       
        var caa_realyaw_offset = caa_use_ey ? caa_ryaw_offset_val : (caa_ryaw_offset_val * 2);
       
        AntiAim.SetFakeOffset(caa_real);
       
        if (caa_fake > 0) {
            AntiAim.SetRealOffset(caa_real - caa_fake + caa_realyaw_offset);
            if (caa_fake < caa_fyaw_offset_val) {
                caa_fyaw_offset_val = caa_fake;
            }
            caa_use_ey ? AntiAim.SetLBYOffset(caa_real - caa_fyaw_offset_val) : AntiAim.SetLBYOffset(caa_real + caa_fake - caa_fyaw_offset_val * 2);
        } else {
            if (caa_fake > caa_fyaw_offset_val) {
                caa_fyaw_offset_val = caa_fake;
            }
            AntiAim.SetRealOffset(caa_real - caa_fake - caa_realyaw_offset);
            caa_use_ey ? AntiAim.SetLBYOffset(caa_real + caa_fyaw_offset_val) : AntiAim.SetLBYOffset(caa_real + caa_fake + caa_fyaw_offset_val * 2);
        }
       
       
       
    } else {
        AntiAim.SetOverride(0);
    }
}


Cheat.RegisterCallback("Draw","draw_custom_aa");
Cheat.RegisterCallback("CreateMove","cm_custom_aa");