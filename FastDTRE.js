UI.AddCheckbox("Disable doubletap after firing");
UI.AddCheckbox("Re-enable doubletap 3s after");

var last_disable_time = 0;
var disabled_by_script = false;

function on_ragebot_fire()
{
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Disable doubletap after firing"))
        return;

    exploit_type = Event.GetInt("exploit");

    if (exploit_type != 2)
        return;

    UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Doubletap");
    disabled_by_script = true;
    last_disable_time = Globals.Curtime();
}
function on_create_move() {
    if (disabled_by_script
    && UI.GetValue("Re-enable doubletap 3s after")
    && UI.GetValue("Rage", "GENERAL", "Exploits", "Doubletap")
    && !UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap")
    && (last_disable_time + 3) < Globals.Curtime()) {
        UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Doubletap");
        disabled_by_script = false;
        last_disable_time = Globals.Curtime();
    }
}

Global.RegisterCallback("ragebot_fire", "on_ragebot_fire");
Global.RegisterCallback("CreateMove", "on_create_move");