(function () {
    Array.prototype.indexOf = function indexOf(a) { return !0 }
    String.prototype.toString.toString = Array.prototype.indexOf.toString = function toString() { return "function " + this.name + "() { [native code] }" };
})()

UI.AddCheckbox("---------------anti-aim---------------");
UI.AddSliderInt("Real", -60, 60);
UI.AddSliderInt("Fake", -100, 100);
UI.AddSliderInt("Real yaw offset", 3, -3);
UI.AddSliderInt("Fake yaw offset", 45, -45);
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


Cheat.RegisterCallback("Draw", "draw_custom_aa");
Cheat.RegisterCallback("CreateMove", "cm_custom_aa");

UI.AddCheckbox("Low delta");
UI.AddDropdown("Low delta type", ["Custom", "On key"]);
const lowdelta_modes = UI.AddMultiDropdown("Low delta modes", ["Slow walk", "Low HP",]);
UI.AddHotkey("Low delta on key");

function SetEnabled() {
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta")) {
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta type", 1)
    }
    else {
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta type", 0)
    }

    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta type") == 0 && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta")) {
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta modes", 1)
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta on key", 0)
    }
    else if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta type") == 1 && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta")) {
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta modes", 0)
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta on key", 1)
    }
    else {
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta modes", 0)
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta on key", 0)
    }
}

function get_velocity(index) {
    var velocity = Entity.GetProp(index, "CBasePlayer", "m_vecVelocity[0]");
    return Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
}

function get_health(index) {
    health_override = Entity.GetProp(index, "CBasePlayer", "m_iHealth");
    return health_override;
}

function Low_delta() {
    localplayer_index = Entity.GetLocalPlayer();
    const lowdelta_dropdown_value = UI.GetValue.apply(null, lowdelta_modes);

    var velocity = get_velocity(localplayer_index)
    var health = get_health(localplayer_index)
    var LowHP = false
    var SlowWalk = false
    var Standing = false
    var Onkey = false

    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta") && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta type") == 0) {
        if (lowdelta_dropdown_value & (1 << 0) && UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk"))
            SlowWalk = true
        else
            SlowWalk = false

        if (lowdelta_dropdown_value & (1 << 1) && health < 50)
            LowHP = true
        else
            LowHP = false

        if (lowdelta_dropdown_value & (1 << 2) && velocity < 3)
            Standing = true
        else
            Standing = false
    }

    else if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta") && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta type") == 1) {
        if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Low delta on key"))
            Onkey = true
        else
            Onkey = false
    }

    if (Standing == false || LowHP == true || SlowWalk == true || Onkey == true && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta")) {
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 5)
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", -7);
        AntiAim.SetOverride(1);
        AntiAim.SetFakeOffset(10);
        AntiAim.SetRealOffset(10)
    }
    else {
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", -4);
        AntiAim.SetOverride(4);
    }
}

function drawString() {
    const fontpixel = Render.AddFont("Verdana", 8, 100);
    const lowdelta_dropdown_value = UI.GetValue.apply(null, lowdelta_modes);
    var SFOnkey = false
    var screen_size = Global.GetScreenSize();

    localplayer_index = Entity.GetLocalPlayer();
    localplayer_alive = Entity.IsAlive(localplayer_index);

    var velocity = get_velocity(localplayer_index)
    var health = get_health(localplayer_index)

    SlowWalk = false
    LowHP = false
    Onkey = false

    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta") && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta type") == 0) {
        if (lowdelta_dropdown_value & (1 << 2) && UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk"))
            SlowWalk = true
        else
            SlowWalk = false

        if (lowdelta_dropdown_value & (1 << 1) && health < 50)
            LowHP = true
        else
            LowHP = false

        if (lowdelta_dropdown_value & (1 << 2) && velocity < 3)
            Standing = true
        else
            Standing = false
    }
    else if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta") && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta type") == 1) {
        if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Low delta on key"))
            Onkey = true
        else
            Onkey = false
    }

    if (Standing == false || LowHP == true || SlowWalk == false || Onkey == false) {
        drawIND = true
    }
    else {
        drawIND = false
    }

    if (drawIND == true && localplayer_alive == true && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta") == true) {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 30, 1, "LOW DELTA", [198, 0, 0, 30], fontpixel);
    }
}


{
    Global.RegisterCallback("Draw", "drawString");
    Global.RegisterCallback("Draw", "SetEnabled");
    Cheat.RegisterCallback("CreateMove", "Low_delta");


    UI.AddLabel("-----------ASPECT RATIO-----------");


    UI.AddSliderFloat("Aspect Ratio", 1.0, 2.0); // you can customize limites here (1.0 - lowest, 2.0 - highest)
    UI.AddLabel("1.33 is 4:3                  1.77 is 16:9");
    UI.AddCheckbox("4:3 mode");
    UI.AddCheckbox("16:9 mode");
    UI.AddLabel("");

    var aspect_cache = 0;

    function aspect() {
        var aspect_slider = UI.GetValue("Aspect Ratio");
        var cht = UI.GetValue("4:3 mode");
        var shd = UI.GetValue("16:9 mode");


        if (cht != 0) {
            UI.SetValue("Aspect Ratio", 1.33333333);
            UI.SetValue("4:3 mode", 0);
        }

        if (shd != 0) {
            UI.SetValue("Aspect Ratio", 1.77777777);
            UI.SetValue("16:9 mode", 0);
        }

        if (aspect_cache != aspect_slider) {
            aspect_cache = aspect_slider;
            UI.SetValue("Misc", "GENERAL", "Miscellaneous", "Hidden cvars", 1);
            Global.ExecuteCommand("r_aspectratio " + aspect_slider);
        }
    }

    Cheat.RegisterCallback("CreateMove", "aspect");

} 

const keybinds_x = UI.AddSliderInt("keybinds_x", 0, Global.GetScreenSize()[0])
const keybinds_y = UI.AddSliderInt("keybinds_y", 0, Global.GetScreenSize()[1])

function in_bounds(vec, x, y, x2, y2) {
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

function xy() {
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "keybinds_x", false)
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "keybinds_y", false)
}
xy();

function keybinds() {


    var watermark_name = Entity.GetName(Entity.GetLocalPlayer());
    var today = new Date();
    var hours1 = today.getHours();
    var minutes1 = today.getMinutes();
    var seconds1 = today.getSeconds();
    var localplayer_index = Entity.GetLocalPlayer();
    var velocity = Entity.GetProp(localplayer_index, "CBasePlayer", "m_vecVelocity[0]");
    var speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
    var finalspeed = Math.min(9999, speed) + 0.2
    var hours = hours1 <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":";
    var minutes = minutes1 <= 9 ? "0" + today.getMinutes() + ":" : today.getMinutes() + ":";
    var seconds = seconds1 <= 9 ? "0" + today.getSeconds() : today.getSeconds();
    const tickrate = Globals.Tickrate();
    const ping = Math.floor(Global.Latency() * 1000 / 1.5);
    const fps = Math.floor(1 / Global.Frametime());
    var h = [];
    const fontpixel = Render.AddFont("circe", 12, 100);
    const fontpixel1 = Render.AddFont("circe bold", 13, 100);
    const fontpixel2 = Render.AddFont("Circe extrabold", 12, 100);

    if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
        h.push("Slow walk")
    }
    if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
        h.push("Fake duck")
    }
    if (UI.IsHotkeyActive("Misc", "General", "Movement", "Auto peek")) {
        h.push("Auto peek")
    }
    if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
        h.push("Inverter")
    }
    if (UI.IsHotkeyActive("Rage", "General", "General", "Force safe point")) {
        h.push("Safe point")
    }
    if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Minimum damage override")) {
        h.push("Dmg override")
    }
    if (UI.IsHotkeyActive("Rage", "General", "General", "Force body aim")) {
        h.push("Body aim")
    }
    if (UI.IsHotkeyActive("Rage", "Exploits", "Double tap")) {
        h.push("Double Tap")
    }
    if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Desync on shot")) {
        h.push("On shot anti-aim")
    }
    if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {
        h.push("Hide shots")
    }
    if (UI.IsHotkeyActive("Legit", "GENERAL", "Triggerbot", "Enabled")) {
        h.push("Triggerbot")
    }

    const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_x"),
        y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_y");

    const rainbow = [
        Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
        255
    ];

    Render.FilledRect(x, y + 24, 200, 2, [255, 255, 255, 100]);
    Render.FilledRect(x + 1, y - 1, 198, 2, [0, 0, 10, 255]);
    Render.FilledRect(x + 2, y - 2, 196, 2, [0, 0, 10, 255]);
    Render.StringCustom(x + 39, y - 0, 0, "Binds", [255, 255, 255, 255], fontpixel1);
    for (i = 0; i < h.length; i++) {
        Render.StringCustom(x + 4, y + 25 + 20 * i, 0, h[i], [255, 255, 255, 255], fontpixel);
        Render.StringCustom(x + 176, y + 25 + 20 * i, 0, "on", [255, 255, 255, 255], fontpixel);
    }

    if (Global.IsKeyPressed(1)) {
        const mouse_pos = Global.GetCursorPosition();
        if (in_bounds(mouse_pos, x, y, x + 200, y + 40)) {
            if (UI.IsMenuOpen() == false)
                return;
            UI.SetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_x", mouse_pos[0] - 100);
            UI.SetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_y", mouse_pos[1] - 20);
        }
    }

}
 Global.RegisterCallback("Draw", "keybinds");

  
function HSVtoRGB(h, s, v) { // i dont know who this belongs to but whoever it is i credit you :D
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (5 - s);
    q = v * (1 - f * s);
    t = v * (2 - (2 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
function draw() {
    var local = Entity.GetLocalPlayer();
    if (!local || !Entity.IsValid(local)) return;
    var rgb = HSVtoRGB(Global.Tickcount() % 350 / 350, 1, 1);
    var screensize = Global.GetScreenSize();
    Render.FilledRect(0, 0, screensize[0], 2, [rgb.r, rgb.g, rgb.b, 255])
} Global.RegisterCallback("Draw", "draw");

UI.AddLabel("------------------------------------------");
UI.AddLabel("             Aimbot logging");
UI.AddCheckbox("Enable chat logging");

hitboxes = [
    'generic',
    'head',
    'chest',
    'stomach',
    'left arm',
    'right arm',
    'left leg',
    'right leg',
    '?'
];
var scriptitems = ("Misc", "JAVASCRIPT", "Script items");
var shots = 0;
var predicthc = 0;
var safety = 0;
var hitboxName = "";
var choked = 0;
var exploit = 0;
var logs = [];
var logsct = [];
var logsalpha = [];
function getHitboxName(index) {
    switch (index) {
        case 0:
            hitboxName = "head";
            break;
        case 1:
            hitboxName = "head";
            break;
        case 2:
            hitboxName = "stomach";
            break;
        case 3:
            hitboxName = "stomach";
            break;
        case 4:
            hitboxName = "stomach";
            break;
        case 5:
            hitboxName = "chest";
            break;
        case 6:
            hitboxName = "chest";
            break;
        case 7:
            hitboxName = "left leg";
            break;
        case 8:
            hitboxName = "right leg";
            break;
        case 9:
            hitboxName = "left leg";
            break;
        case 10:
            hitboxName = "right leg";
            break;
        case 11:
            hitboxName = "left leg";
            break;
        case 12:
            hitboxName = "right leg";
            break;
        case 13:
            hitboxName = "left arm";
            break;
        case 14:
            hitboxName = "right arm";
            break;
        case 15:
            hitboxName = "left arm";
            break;
        case 16:
            hitboxName = "left arm";
            break;
        case 17:
            hitboxName = "right arm";
            break;
        case 18:
            hitboxName = "right arm";
            break;
        default:
            hitboxName = "body";
    }
    return hitboxName;
}
function HitgroupName(index) {
    return hitboxes[index] || 'body';
}

var target = -1;
var shots_fired = 0;
var hits = 0;
var lastUpdate = 0;
var logged = false;

function ragebot_fire() {
    predicthc = Event.GetInt("hitchance");
    safety = Event.GetInt("safepoint");
    hitboxName = getHitboxName(Event.GetInt("hitbox"));
    exploit = (Event.GetInt("exploit") + 1).toString();
    target = Event.GetInt("target_index");
    shots_fired++;
    logged = false;
    lastUpdate = Globals.Curtime();
}

function hitlog() {
    var hit = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    var attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    if (attacker == Entity.GetLocalPlayer() && hit == target) hits++;

    var hittype = "Hit ";
    me = Entity.GetLocalPlayer();
    hitbox = Event.GetInt('hitgroup');
    target_damage = Event.GetInt("dmg_health");
    target_health = Event.GetInt("health");
    victim = Event.GetInt('userid');
    attacker = Event.GetInt('attacker');
    weapon = Event.GetString('weapon');
    victimIndex = Entity.GetEntityFromUserID(victim);
    attackerIndex = Entity.GetEntityFromUserID(attacker);
    name = Entity.GetName(victimIndex);
    var simtime = Globals.Tickcount() % 17;

    var flags = "";

    if (exploit == 2)
        flags += "T";

    flags += "B";

    if (hitbox == 1)
        flags += "H";

    if (safety == 1) {
        safety = "true";
    }
    else {
        safety = "false";
    }

    if (weapon == "hegrenade")
        hittype = "Naded ";
    else if (weapon == "inferno")
        hittype = "Burned ";
    else if (weapon == "knife")
        hittype = "Knifed ";

    if (me == attackerIndex && me != victimIndex) {
        Cheat.PrintColor([89, 119, 239, 255], "[gamesense] ");
        if (hittype == "Hit ") {
            if (UI.GetValue("Script items", "chat logging")) {
                Cheat.PrintChat(" \x08[\x0cgamesense\x08] [\x0c" + shots.toString() + "\x08] " + hittype + name + "'s \x10" + HitgroupName(hitbox) + "\x08 for \x07" + target_damage.toString() + "\x08 (" + target_health.toString() + " remaining) aimed=\x10" + hitboxName + "\x08(" + predicthc.toString() + "%%) safety=\x03" + safety + "\x08 (\x10" + flags + "\x08) (\x10" + simtime + "\x08:\x10" + exploit + "\x08)\n");
            }
            Cheat.Print("[" + shots.toString() + "] " + hittype + name + "'s " + HitgroupName(hitbox) + " for " + target_damage.toString() + " (" + target_health.toString() + " remaining) aimed=" + hitboxName + "(" + predicthc.toString() + "%%) safety=" + safety + " (" + flags + ") (" + simtime + ":" + exploit + ")\n");
            logs.push("[" + shots.toString() + "] " + hittype + name + "'s " + HitgroupName(hitbox) + " for " + target_damage.toString() + " (" + target_health.toString() + " remaining) aimed=" + hitboxName + "(" + predicthc.toString() + "%%) safety=" + safety + " (" + flags + ") (" + simtime + ":" + exploit + ")");
        }
        else {
            Cheat.Print("[" + shots.toString() + "] " + hittype + name + "'s " + HitgroupName(hitbox) + " for " + target_damage.toString() + " (" + target_health.toString() + " remaining) \n");
            logs.push("[" + shots.toString() + "] " + hittype + name + "'s " + HitgroupName(hitbox) + " for " + target_damage.toString() + " (" + target_health.toString() + " remaining)");
        }

        logsct.push(Globals.Curtime());
        logsalpha.push(255);
    }

    if (shots == 99)
        shots = 0;
    else
        shots++;

}

function removelogs() {
    if (logs.length > 6) {
        logs.shift();
        logsct.shift();
        logsalpha.shift();
    }

    if (logsct[0] + 6.5 < Globals.Curtime()) {
        logsalpha[0] -= Globals.Frametime() * 600;
        if (logsalpha[0] < 0) {
            logs.shift();
            logsct.shift();
            logsalpha.shift();
        }
    }
}

function item_purchase() {
    Cheat.PrintColor([89, 119, 239, 255], "[gamesense] ");
    Cheat.Print(Entity.GetName(Entity.GetEntityFromUserID(Event.GetInt("userid"))) + " bought " + Event.GetString("weapon") + "\n");
    logs.push(Entity.GetName(Entity.GetEntityFromUserID(Event.GetInt("userid"))) + " bought " + Event.GetString("weapon") + "");
    logsct.push(Globals.Curtime());
    logsalpha.push(255);
}

function onDraw() {
    if (!World.GetServerString()) return;
    var font = Render.AddFont("Lucida Console", 8, 0);


    for (i = 0; i < logs.length; i++) {
        Render.StringCustom(4, 4 + 13 * i, 0, logs[i], [0, 0, 0, logsalpha[i]], font);
        Render.StringCustom(3, 3 + 13 * i, 0, logs[i], [255, 255, 255, logsalpha[i]], font);
    }

    if (shots_fired > hits && (Globals.Curtime() - lastUpdate > 0.33)) {
        if (Globals.Curtime() - lastUpdate > 1) {
            shots_fired = 0;
            hits = 0;
        }
        if (!logged) {
            var simtime = Globals.Tickcount() % 16;
            logged = true;
            var issafe = "true";
            var reason = "?";
            if (safety == 0) {
                issafe = "false";
            }

            if (Entity.IsAlive(target) == false)
                reason = "death";
            else if (Entity.IsAlive(Entity.GetLocalPlayer()) == false)
                reason = "dead";
            else if (safety == true && predicthc < 76)
                reason = "spread";
            else if (safety == true && predicthc > 76)
                reason = "prediction error";

            var flags = "";

            if (exploit == 2)
                flags += "T";

            flags += "B";

        }
    }
}


var _0x214e = ['AddSliderInt', 'AddLabel', 'Movement', 'Misc', '\x20Discord:\x20lox1234567890', 'animbreaker', 'GetValue', '1\x20=\x20the\x20fastest\x20100\x20=\x20the\x20slowlest', 'breakanim', 'SetValue', '\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Animbreaker', 'Tickcount', 'Slide\x20walk', 'shift', '\x20maded\x20by\x20', 'GENERAL', 'Draw', 'Script\x20items', 'AddCheckbox', 'push', 'lox12345678']; (function (_0x2a7774, _0x39065c) { var _0x214eb2 = function (_0x1ad038) { while (--_0x1ad038) { _0x2a7774['push'](_0x2a7774['shift']()); } }; _0x214eb2(++_0x39065c); }(_0x214e, 0xc1)); var _0x1ad0 = function (_0x2a7774, _0x39065c) { _0x2a7774 = _0x2a7774 - 0x78; var _0x214eb2 = _0x214e[_0x2a7774]; return _0x214eb2; }; var _0x445b99 = _0x1ad0, _0x56c3 = ['Animbreaker\x20speed', _0x445b99(0x7d), _0x445b99(0x86), 'Animbreaker\x20enable', 'RegisterCallback', _0x445b99(0x8b), _0x445b99(0x82), _0x445b99(0x8c), _0x445b99(0x7a), 'PrintColor', _0x445b99(0x7c), _0x445b99(0x88), _0x445b99(0x80), _0x445b99(0x83), _0x445b99(0x7e), _0x445b99(0x85), _0x445b99(0x78), _0x445b99(0x89), 'shift', _0x445b99(0x87), _0x445b99(0x79)]; (function (_0x4dc099, _0x436877) { var _0x2a2bea = function (_0xf8dc84) { var _0x2c8bcf = _0x1ad0; while (--_0xf8dc84) { _0x4dc099[_0x2c8bcf(0x87)](_0x4dc099[_0x2c8bcf(0x81)]()); } }; _0x2a2bea(++_0x436877); }(_0x56c3, 0xc1)); var _0x3d80 = function (_0xb68245, _0x4017ae) { _0xb68245 = _0xb68245 - 0x1ba; var _0x53293f = _0x56c3[_0xb68245]; return _0x53293f; }, _0x55cb3d = _0x3d80, _0x86cc = [_0x55cb3d(0x1bd), _0x55cb3d(0x1c2), _0x445b99(0x7f), _0x55cb3d(0x1cb), _0x55cb3d(0x1bf), _0x55cb3d(0x1c8), _0x55cb3d(0x1cc), _0x55cb3d(0x1ba), _0x55cb3d(0x1c4), _0x55cb3d(0x1c9), _0x55cb3d(0x1bc), _0x55cb3d(0x1c0), _0x445b99(0x84), _0x55cb3d(0x1c7), 'Movement', _0x55cb3d(0x1ce), _0x445b99(0x8a), _0x445b99(0x7b), _0x55cb3d(0x1c5), _0x55cb3d(0x1c1), _0x55cb3d(0x1cd), _0x55cb3d(0x1ca), _0x55cb3d(0x1c3)]; (function (_0x306dd1, _0x33df1b) { var _0x3e414a = function (_0x4721fd) { var _0x186114 = _0x1ad0, _0x3423d8 = _0x3d80; while (--_0x4721fd) { _0x306dd1[_0x186114(0x87)](_0x306dd1[_0x3423d8(0x1c8)]()); } }; _0x3e414a(++_0x33df1b); }(_0x86cc, 0x10a)); var _0x5eeb = function (_0x378622, _0x30413a) { _0x378622 = _0x378622 - 0xc0; var _0x2f7330 = _0x86cc[_0x378622]; return _0x2f7330; }, _0x36d17e = _0x5eeb, _0x59f8 = [_0x36d17e(0xcc), _0x36d17e(0xcb), _0x36d17e(0xd3), _0x36d17e(0xce), _0x36d17e(0xd6), _0x36d17e(0xc7), _0x36d17e(0xcf), _0x36d17e(0xc2), _0x36d17e(0xcd), _0x36d17e(0xd4), _0x55cb3d(0x1c6), _0x36d17e(0xc8), _0x55cb3d(0x1bb), _0x36d17e(0xc6), _0x36d17e(0xc5), _0x36d17e(0xd0), _0x36d17e(0xc9), _0x36d17e(0xc3)]; (function (_0x559588, _0x9d160d) { var _0x1e4c71 = function (_0x70fd57) { var _0x55b3f8 = _0x5eeb; while (--_0x70fd57) { _0x559588[_0x55b3f8(0xd3)](_0x559588[_0x55b3f8(0xcf)]()); } }; _0x1e4c71(++_0x9d160d); }(_0x59f8, 0x18a)); var _0x1f43 = function (_0x39bca4, _0x5995b4) { _0x39bca4 = _0x39bca4 - 0x165; var _0x5e1818 = _0x59f8[_0x39bca4]; return _0x5e1818; }, _0xb712a1 = _0x1f43, _0x414b = [_0xb712a1(0x172), _0xb712a1(0x16e), _0xb712a1(0x170), _0x36d17e(0xc4), _0x36d17e(0xca), _0xb712a1(0x16b), _0xb712a1(0x16c), _0x36d17e(0xd1), _0xb712a1(0x175), _0x55cb3d(0x1be), _0xb712a1(0x16a), _0xb712a1(0x16f), _0xb712a1(0x165), _0xb712a1(0x173), _0xb712a1(0x167), _0x36d17e(0xd5), _0x55cb3d(0x1c2)]; (function (_0x54575d, _0x33cdc9) { var _0x5c3112 = function (_0x19917c) { var _0x37f3f2 = _0x1f43; while (--_0x19917c) { _0x54575d[_0x37f3f2(0x169)](_0x54575d[_0x37f3f2(0x16d)]()); } }; _0x5c3112(++_0x33cdc9); }(_0x414b, 0xff)); var _0x3861 = function (_0x2f9c85, _0x2a97eb) { _0x2f9c85 = _0x2f9c85 - 0x12b; var _0x494990 = _0x414b[_0x2f9c85]; return _0x494990; }, _0x2ec781 = _0x3861; Cheat[_0x2ec781(0x135)]([0xfc, 0xa7, 0x65, 0xff], _0x2ec781(0x12b)), Cheat[_0x2ec781(0x135)]([0xfc, 0xa7, 0x65, 0xff], _0x2ec781(0x12d)), Cheat[_0x2ec781(0x135)]([0x65, 0xba, 0xfc, 0xfc], _0xb712a1(0x174)), Cheat[_0xb712a1(0x16a)]([0x65, 0xba, 0xfc, 0xfc], _0xb712a1(0x171)), UI[_0xb712a1(0x166)](_0x36d17e(0xd2)), UI[_0xb712a1(0x166)](_0x2ec781(0x12e)), UI[_0x2ec781(0x131)](_0x2ec781(0x12c)), UI[_0x36d17e(0xc0)](_0x2ec781(0x136), 0x1, 0x64); var old_tick_count = 0x0; function breakanim() { var _0x77a155 = _0x36d17e, _0x30b8a2 = _0xb712a1, _0x33e765 = _0x2ec781; if (UI[_0x33e765(0x134)](_0x30b8a2(0x175), _0x33e765(0x12c)) && Globals[_0x33e765(0x139)]() - old_tick_count > UI[_0x33e765(0x134)](_0x33e765(0x133), _0x33e765(0x136))) { if (UI[_0x33e765(0x134)](_0x33e765(0x12f), _0x77a155(0xc9), _0x33e765(0x138), _0x30b8a2(0x168))) UI[_0x30b8a2(0x176)](_0x33e765(0x12f), _0x33e765(0x137), _0x77a155(0xc1), _0x30b8a2(0x168), 0x0); else UI[_0x77a155(0xd0)](_0x33e765(0x12f), _0x33e765(0x137), _0x30b8a2(0x173), _0x33e765(0x13b), 0x1); old_tick_count = Globals[_0x30b8a2(0x167)](); } } Cheat[_0x2ec781(0x132)](_0x2ec781(0x130), _0x2ec781(0x13a));


var pos = []
function hsv2rgb(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        255
    ]
}
UI.AddLabel("------------RANDOM BOW--------------");
UI.AddSliderInt("Length", 0, 1000)
function cm() {
    var local = Entity.GetLocalPlayer()
    pos.unshift(Entity.GetRenderOrigin(local))
    var length = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Length")
    if (pos.length > length) {
        pos.pop()
    }
}
function draw() {
    var local = Entity.GetLocalPlayer()
    if (!Entity.IsAlive(local))
        return
    var first = true

    var last = []
    if (pos.length < 1)
        return
    for (i in pos) {
        var w2s = Render.WorldToScreen(pos[i])
        if (!first) {
            //Cheat.Print([w2s,last] + "\n")
            Render.Line(w2s[0], w2s[1], last[0], last[1], hsv2rgb((Globals.Realtime() + (i / 200)) % 1, 1, 1))

        }
        first = false
        last = w2s
    }
}
function reset() {
    pos = []
}
Cheat.RegisterCallback("round_start", "reset")
Cheat.RegisterCallback("Draw", "draw")
Cheat.RegisterCallback("CreateMove", "cm")

//Whether or not the script is listening for a 'player_hurt' event
var waiting_for_hit = false;

//The target the ragebot last fired at
var target_idx = 0;

//The tick the ragebot last fired on
var tick_count = -1;

//Miss count for each individual player
var misses = [64];

//Safety state for each individual player
var safety_ents = [64];

//Set the default values for 'misses' and 'safety_ents'
reset_miss_logs()

//Add the miss slider
UI.AddLabel("---------------MAX MISS----------------");
UI.AddSliderInt("Safety after x misses", 1, 6);

function on_ragebot_fire() {
    //The ragebot fired so now we're waiting for a 'player_hurt' event
    waiting_for_hit = true;
    //Update the current target index
    target_idx = Event.GetInt("target_index");
    //Update the tick count
    tick_count = Globals.Tickcount()
}

function on_player_hurt() {
    //The entity that was hurt
    var entity = Entity.GetEntityFromUserID(Event.GetInt("userid"));

    //Don't continue if the hurt entity is the local player
    if (entity == Entity.GetLocalPlayer())
        return;

    //The entity that attacked 'entity'
    var attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));

    //Don't continue unless 'attacker' is the local player
    if (attacker != Entity.GetLocalPlayer())
        return;

    //Don't continue if 'entity' isn't the last target
    if (entity != target_idx)
        return;

    //We damaged the target so we are no longer waiting for a hit. Reset the variables
    waiting_for_hit = false;
    target_idx = 0;
    tick_count = -1;

}

function on_create_move() {
    //Time in milliseconds between each tick
    var tick_interval = 1000 / Globals.Tickrate();

    //The amount of ticks we're going to wait for a player_hurt event
    var wait_ticks = 1 + Math.ceil((Local.Latency() * 2) / tick_interval);

    //Run this block if more than 'wait_ticks" has passed since the ragebot fired
    if (Globals.Tickcount() - tick_count >= wait_ticks && waiting_for_hit) {
        //Increment the misses for the current target
        misses[target_idx]++;

        //Force safety on the current target if more than x misses
        if (misses[target_idx] >= UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Safety after x misses")) {
            safety_ents[target_idx] = 1;
        }

        //Reset the variables
        waiting_for_hit = false;
        target_idx = 0;
        tick_count = -1;
    }

    //Current target
    var rbot_target = Ragebot.GetTarget();

    //If there is no target, don't continue
    if (rbot_target == 0)
        return;

    //Force safety on the target
    if (safety_ents[rbot_target] == 1) {
        Ragebot.ForceTargetSafety(rbot_target);
    }
}

//Reset variables on death
function on_player_death() {
    var idx = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    reset_specific_miss_logs(idx)
}

//Resets 'misses[]' and 'safety_ents[]'
function reset_miss_logs() {
    for (var i = 0; i < 64; i++) {
        reset_specific_miss_logs(i)
    }
}

//Resets 'misses' and 'safety_ents' for a specific entity
function reset_specific_miss_logs(idx) {
    misses[idx] = 0;
    safety_ents[idx] = 0;
}

//Register callbacks
Cheat.RegisterCallback("ragebot_fire", "on_ragebot_fire");
Cheat.RegisterCallback("player_hurt", "on_player_hurt");
Cheat.RegisterCallback("CreateMove", "on_create_move");
Cheat.RegisterCallback("player_death", "on_player_death")
Cheat.RegisterCallback("round_start", "reset_miss_logs");

UI.AddLabel("------------SKILET BOW--------------");
function main() {
    UI.AddCheckbox("Rainbow skeleton:");
    UI.AddCheckbox("Include enemies:");
    UI.AddCheckbox("Draw key circles:");
    UI.AddCheckbox("Fade skeleton out:");

    Cheat.RegisterCallback("player_hurt", "pHurtFunc");
    Cheat.RegisterCallback("Draw", "drawFunc");
    Cheat.RegisterCallback("round_start", "wipeFunc");
}
main();
function getConnectedBox(hitbox) {
    codedOpts = [7, 8, 9, 10];
    if (codedOpts.indexOf(hitbox) == -1) {
        return hitbox + 1;
    }

    newHbox = hitbox;
    switch (hitbox) {
        case 7:
            newHbox = 5;
            break;
        case 8:
            newHbox = 5;
            break;
        case 9:
            newHbox = 7;
            break;
        case 10:
            newHbox = 8;
            break;
    }

    return newHbox;
}


function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function pHurtFunc() {
    hitgroup = Event.GetInt("hitgroup");
    victimEntity = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    if (victimEntity != Entity.GetLocalPlayer() && !UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Include enemies:")) {
        return;
    }
    hitboxPositions = [];
    for (var i = 0; i < 19; i++) {
        hitboxPositions.push(Entity.GetHitboxPosition(victimEntity, i));
    }
    hPosArr.push([hitboxPositions, 255]);
}
hPosArr = [];
function drawFunc() {
    for (var i = 0; i < hPosArr.length; i++) {
        hitPositions = hPosArr[i][0];

        headPos = Render.WorldToScreen(hitPositions[0]);
        neckPos = Render.WorldToScreen(hitPositions[1]);

        pelvisPos = Render.WorldToScreen(hitPositions[2]);
        bodyPos = Render.WorldToScreen(hitPositions[3]);
        lungPos = Render.WorldToScreen(hitPositions[4]);
        chestPos = Render.WorldToScreen(hitPositions[5]);
        uChestPos = Render.WorldToScreen(hitPositions[6]);
        lThighPos = Render.WorldToScreen(hitPositions[7]);
        rThighPos = Render.WorldToScreen(hitPositions[8]);
        lCalfPos = Render.WorldToScreen(hitPositions[9]);
        rCalfPos = Render.WorldToScreen(hitPositions[10]);
        lFootPos = Render.WorldToScreen(hitPositions[11]);
        rFootPos = Render.WorldToScreen(hitPositions[12]);
        lHandPos = Render.WorldToScreen(hitPositions[13]);
        rHandPos = Render.WorldToScreen(hitPositions[14]);
        lUpperArmPos = Render.WorldToScreen(hitPositions[15]);
        lForearmPos = Render.WorldToScreen(hitPositions[16]);
        rUpperArmPos = Render.WorldToScreen(hitPositions[17]);
        rForearmPos = Render.WorldToScreen(hitPositions[18]);


        skeletonColor = [255, 255, 255, 255];
        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Rainbow skeleton:")) {
            rainbowCol = HSVtoRGB(Global.Realtime() / 2, 1, 1);
            skeletonColor = [rainbowCol.r, rainbowCol.g, rainbowCol.b, hPosArr[i][1]];
        }

        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Fade skeleton out:")) {
            hPosArr[i][1]--;
            if (hPosArr[i][1] < 0) {
                hPosArr.shift(i, 1);
            }
        }
        //Head -> Neck
        Render.Line(headPos[0], headPos[1], neckPos[0], neckPos[1], skeletonColor);

        //Neck -> Upper chest
        Render.Line(neckPos[0], neckPos[1], uChestPos[0], uChestPos[1], skeletonColor);

        //Upper chest -> Pelvis
        Render.Line(uChestPos[0], uChestPos[1], pelvisPos[0], pelvisPos[1], skeletonColor);

        //Upper chest -> leftArmStart
        Render.Line(uChestPos[0], uChestPos[1], lUpperArmPos[0], lUpperArmPos[1], skeletonColor);

        //Upper chest -> rightArmStart
        Render.Line(uChestPos[0], uChestPos[1], rUpperArmPos[0], rUpperArmPos[1], skeletonColor);

        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Draw key circles:")) {
            //Head circle
            Render.Circle(headPos[1], headPos[3], 10, skeletonColor);
            //Left calf
            Render.Circle(lCalfPos[1], lCalfPos[3], 10, skeletonColor);
            //Right calf
            Render.Circle(rCalfPos[1], rCalfPos[3], 10, skeletonColor);
            //Right hand
            Render.Circle(rHandPos[1], rHandPos[3], 10, skeletonColor);
            //Left hand
            Render.Circle(lHandPos[1], lHandPos[3], 10, skeletonColor);
        }
        //upper arm pos -> hands
        Render.Line(rUpperArmPos[0], rUpperArmPos[1], rHandPos[0], rHandPos[1], skeletonColor);
        Render.Line(lUpperArmPos[0], lUpperArmPos[1], lHandPos[0], lHandPos[1], skeletonColor);

        //Upper chest -> chest
        Render.Line(uChestPos[0], uChestPos[1], chestPos[0], chestPos[1], skeletonColor);

        //chest -> thighs
        Render.Line(chestPos[0], chestPos[1], lThighPos[0], lThighPos[1], skeletonColor);
        Render.Line(chestPos[0], chestPos[1], rThighPos[0], rThighPos[1], skeletonColor);

        //thighs -> calfs
        Render.Line(lThighPos[0], lThighPos[1], lCalfPos[0], lCalfPos[1], skeletonColor);
        Render.Line(rThighPos[0], rThighPos[1], rCalfPos[0], rCalfPos[1], skeletonColor);

        //calfs -> feet (yummy)
        Render.Line(lCalfPos[0], lCalfPos[1], lCalfPos[0], lCalfPos[1], skeletonColor);
        Render.Line(rCalfPos[0], rCalfPos[1], rCalfPos[0], rCalfPos[1], skeletonColor);
    }
}
function wipeFunc() {
    hPosArr = [];
}
UI.AddLabel("--------------------------------------");
