var math = require("mathlib.js")
var attacked = false
var settings = UI.AddMultiDropdown("Knifebot", ["Backstab", "Normal", "Doubletap (inconsistent)"])
var backstab = UI.AddHotkey("Wait for backstab")
function isbehind(enemy) {
    var delta = math.VectorSub(Entity.GetRenderOrigin(enemy), Entity.GetEyePosition(Entity.GetLocalPlayer()))
    delta[2] = 0

    var ang = Entity.GetProp(enemy, "CCSPlayer", "m_angEyeAngles")
    ang[0] = ang[0] / 180 * Math.PI
    ang[1] = ang[1] / 180 * Math.PI
    var forward = math.AngleVectors(ang)
    forward[2] = 0
    return (delta[0] * forward[0] + delta[1] * forward[1]) > 18
}
var next_tick_shift = false
function oncm() {
    var local = Entity.GetLocalPlayer()
    var enemies = Entity.GetEnemies()
    if (!(Entity.GetName(Entity.GetWeapon(local)).includes("knife")))
        return
    var weapon = Entity.GetWeapon(local)
    var next_attack = Entity.GetProp(weapon, "DT_BaseCombatWeapon", "m_flNextPrimaryAttack")
    var tickbase = Entity.GetProp(local, "DT_CSPlayer", "m_nTickBase")
    var server_time = tickbase * Globals.TickInterval()
    if(next_attack > server_time)
        return
    var best = -1
    var maxdist = 65
    for (i in enemies) {
        if (Entity.IsAlive(enemies[i])) {
            var start = Entity.GetEyePosition(local)
            var end = Entity.GetHitboxPosition(enemies[i], 3)
            var delta = math.VectorSub(start, end)
            delta = math.VectorLength(delta)
            if (delta < maxdist) {
                maxdist = delta
                best = enemies[i]
            }

            var end = Entity.GetHitboxPosition(enemies[i], 5)
            var delta = math.VectorSub(start, end)
            delta = math.VectorLength(delta)
            if (delta < maxdist) {
                maxdist = delta
                best = enemies[i]
            }

            var end = Entity.GetHitboxPosition(enemies[i], 4)
            var delta = math.VectorSub(start, end)
            delta = math.VectorLength(delta)
            if (delta < maxdist) {
                maxdist = delta
                best = enemies[i]
            }

            var end = Entity.GetRenderOrigin(enemies[i]); end[2] += 30
            var delta = math.VectorSub(start, end)
            delta = math.VectorLength(delta)
            if (delta < maxdist) {
                maxdist = delta
                best = enemies[i]
            }
        }
    }
    if (best == -1)
        return
    var start = Entity.GetEyePosition(local)
    var end = Entity.GetHitboxPosition(best, 3)
    var ang = math.CalculateAngle(start, end)
    if (isbehind(enemies[i]) && maxdist < 70 && (UI.GetValue.apply(null, settings) & 1)) {
        attacked = true
        var buttons = UserCMD.GetButtons()
        buttons |= 2048
        UserCMD.SetButtons(buttons)

        UserCMD.SetViewAngles(ang, true)
    }
    else if (UI.GetValue.apply(null, settings) & 2) {
        var can_slash = false
        var health = Entity.GetProp(best, "CBasePlayer", "m_iHealth")
        if (health <= 55)
            can_slash = true
        var buttons = UserCMD.GetButtons()
        if (can_slash && UI.IsHotkeyActive.apply(null, backstab)) {
            buttons |= 2048
            var dt = Exploit.GetCharge() == 1 && UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap")

            UserCMD.SetViewAngles(ang, true)
            UserCMD.SetButtons(buttons)
        }
        else if (!UI.IsHotkeyActive.apply(null, backstab)) {
            buttons |= can_slash ? 2048 : 1
            var dt = Exploit.GetCharge() == 1 && UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap")

            if (buttons & 1 && dt && (UI.GetValue.apply(null, settings) & 4)) {
                UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Doubletap")
            }

            UserCMD.SetViewAngles(ang, true)
            UserCMD.SetButtons(buttons)
        }
    }
}
Cheat.RegisterCallback("CreateMove", "oncm")