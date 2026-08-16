UI.AddCheckbox("Use custom anti-aim"); //Master switch
UI.AddDropdown("Builder setting", ["Right", "Left"]);
UI.AddSliderInt("Real (R)", -180,180);
UI.AddSliderInt("Fake (R)", -60,60);
UI.AddSliderInt("Real yaw offset (R)", 0,60);
UI.AddSliderInt("Fake yaw offset (R)", 0,60);
UI.AddCheckbox("Use eye yaw for LBY (R)");
UI.AddSliderInt("Real (L)", -180,180);
UI.AddSliderInt("Fake (L)", -60,60);
UI.AddSliderInt("Real yaw offset (L)", 0,60);
UI.AddSliderInt("Fake yaw offset (L)", 0,60);
UI.AddCheckbox("Use eye yaw for LBY (L)");
UI.AddHotkey("Invert");
//fuck yall losers putting your UI initialization into functions like fucking clowns Ill fuck u up

var scriptitems = ["Misc", "JAVASCRIPT", "Script Items"];
function menu_cb() {
    var enabled = UI.GetValue(scriptitems, "Use custom anti-aim");
    var r_enabled = UI.GetValue(scriptitems, "Builder setting") == 0 && enabled;
    UI.SetEnabled(scriptitems, "Real (R)", r_enabled);
    UI.SetEnabled(scriptitems, "Fake (R)", r_enabled);
    UI.SetEnabled(scriptitems, "Real yaw offset (R)", r_enabled);
    UI.SetEnabled(scriptitems, "Fake yaw offset (R)", r_enabled);
    UI.SetEnabled(scriptitems, "Use eye yaw for LBY (R)", r_enabled);
  
    var l_enabled = UI.GetValue(scriptitems, "Builder setting") == 1 && enabled;
    UI.SetEnabled(scriptitems, "Real (L)", l_enabled);
    UI.SetEnabled(scriptitems, "Fake (L)", l_enabled);
    UI.SetEnabled(scriptitems, "Real yaw offset (L)", l_enabled);
    UI.SetEnabled(scriptitems, "Fake yaw offset (L)", l_enabled);
    UI.SetEnabled(scriptitems, "Use eye yaw for LBY (L)", l_enabled);
  
    UI.SetEnabled(scriptitems, "Builder setting", enabled);
    UI.SetEnabled(scriptitems, "Invert", enabled);
}
function draw_custom_aa() {
    if (UI.IsMenuOpen()) {menu_cb();}
}
//SetRealOffset operates like our target "real angle" but requires the math of (real - fake)
//SetFakeOffset set to our real angle to make our shit work
//SetLBYOffset operates as our fake angle
function aa_sys() {
    var enabled = UI.GetValue(scriptitems, "Use custom anti-aim");
    enabled ? AntiAim.SetOverride(1) : AntiAim.SetOverride(0);
  
    var m_side;//merp
    var m_invert = UI.IsHotkeyActive(scriptitems, "Invert");
    if (m_invert) {
        m_side = " (L)";
    } else {
        m_side = " (R)";
    }
    var m_fake = UI.GetValue(scriptitems, "Fake" + m_side);
    var m_real = UI.GetValue(scriptitems, "Real" + m_side);
    var m_use_ey = UI.GetValue(scriptitems, "Use eye yaw for LBY" + m_side);
    var m_ryaw_offset_val = UI.GetValue(scriptitems, "Real yaw offset" + m_side);
    var m_fyaw_offset_val = UI.GetValue(scriptitems, "Fake yaw offset" + m_side);
    setAntiaim(m_real, m_fake, m_use_ey, m_ryaw_offset_val, m_fyaw_offset_val);
}

function setAntiaim(caa_real, caa_fake, caa_use_ey, caa_ryaw_offset_val, caa_fyaw_offset_val) {
  
    var caa_realyaw_offset = caa_use_ey ? caa_ryaw_offset_val : (caa_ryaw_offset_val * 2);
  
    AntiAim.SetFakeOffset(caa_real);
  
    if (caa_fake > 0) {
        AntiAim.SetRealOffset(caa_real - caa_fake + caa_realyaw_offset);
        if (caa_fake < caa_fyaw_offset_val) {
            caa_fyaw_offset_val = caa_fake;
        }//Clamp our fake yaw
        caa_use_ey ? AntiAim.SetLBYOffset(caa_real - caa_fyaw_offset_val) : AntiAim.SetLBYOffset(caa_real + caa_fake - caa_fyaw_offset_val * 2);
    } else {
        if (caa_fake > caa_fyaw_offset_val) {
            caa_fyaw_offset_val = caa_fake;
        }//Clamp our fake yaw (todo update this and above one to be more dynamic / working better x.x)
        AntiAim.SetRealOffset(caa_real - caa_fake - caa_realyaw_offset);
        caa_use_ey ? AntiAim.SetLBYOffset(caa_real + caa_fyaw_offset_val) : AntiAim.SetLBYOffset(caa_real + caa_fake + caa_fyaw_offset_val * 2);
    }
}

Cheat.RegisterCallback("Draw","draw_custom_aa");
Cheat.RegisterCallback("CreateMove","aa_sys");