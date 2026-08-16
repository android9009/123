UI.AddCheckbox("Fix zoom sensitivity");
function zoomfix(){
    if (Cheat.FrameStage() == 5) {
        var zoom_sens = Convar.GetFloat("zoom_sensitivity_ratio_mouse");
        if (UI.GetValue("Misc", "JAVASCRIPT", "Scipt items", "Fix zoom sensitivity")) {
            var zoom_current_sens = Convar.GetFloat("sensitivity");
            var zoom_fov = UI.GetValue("Visual", "WORLD", "View", "Field of view");
            var fixed_zoom_sens = zoom_fov / 100 * zoom_current_sens;
            if (zoom_sens != fixed_zoom_sens) {
                Cheat.ExecuteCommand("zoom_sensitivity_ratio_mouse " + fixed_zoom_sens);
                Cheat.ExecuteCommand("zoom_sensitivity_ratio_joystick " + fixed_zoom_sens);
            }
        } else {
            if (zoom_sens != 1.0) {
                Cheat.ExecuteCommand("zoom_sensitivity_ratio_mouse " + 1.0);
                Cheat.ExecuteCommand("zoom_sensitivity_ratio_joystick " + 1.0);
            }
        }
    }
}
Cheat.RegisterCallback("FrameStageNotify", "zoomfix");