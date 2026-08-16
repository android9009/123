/*
* This code belongs to an unknown person, but I am grateful to.
*/

function getPlayerHealth(index) {
    return Entity.GetProp(index, "CPlayerResource", "m_iHealth");
}
function main() {
    var body = UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim")
    enemy = Ragebot.GetTarget()
    healh = getPlayerHealth(enemy)
    if (healh < 65) {
        if (!body) {
            UI.ToggleHotkey("Rage", "GENERAL", "General", "Force body aim")
        }
    }
    else {
        if (body) {
            UI.ToggleHotkey("Rage", "GENERAL", "General", "Force body aim")
        }
    }
}
Cheat.RegisterCallback("CreateMove", "main")