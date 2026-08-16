// REZOLVER — Clean, optimized build + Offset Shuffle
// Ничего функционально не удалено. Добавлен режим Offset Shuffle и пофикшен вызов Breaker V1/V2.

/////////////////////////
// Utils & Safety
/////////////////////////

function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }

function isAlive() {
    if (!World.GetServerString()) return false;
    var me = Entity.GetLocalPlayer();
    return me && Entity.IsAlive(me);
}

function ensureMinDiff(real, fake, minDiff) {
    var d = Math.abs(fake - real);
    if (d >= minDiff) return [real, fake];
    var need = minDiff - d;
    fake = (fake > real) ? clamp(fake + need, -60, 60) : clamp(fake - need, -60, 60);
    return [real, fake];
}

function vel2D(ent) {
    var v = Entity.GetProp(ent, "CBasePlayer", "m_vecVelocity[0]") || [0, 0, 0];
    var x = v[0] || 0, y = v[1] || 0;
    return Math.sqrt(x*x + y*y);
}

// Safe Register
function Register(ev, fn) {
    try { Cheat.RegisterCallback(ev, fn); }
    catch (e1) {
        try {
            var n = (typeof fn === "string") ? fn : (fn && fn.name ? fn.name : "");
            if (n) Cheat.RegisterCallback(ev, n);
        } catch (e2) {
            try {
                if (typeof Global !== "undefined" && Global.RegisterCallback) {
                    var n2 = (typeof fn === "string") ? fn : (fn && fn.name ? fn.name : "");
                    if (n2) Global.RegisterCallback(ev, n2); else Global.RegisterCallback(ev, fn);
                }
            } catch (e3) { Cheat.Print("[CB] FAILED: " + ev + "\n"); }
        }
    }
}

/////////////////////////
// Fonts
/////////////////////////

var g_font = 0;
function on_load() {
    try { g_font = Render.AddFont("Verdana", 7, 100); } catch (e) { g_font = 0; }
}

/////////////////////////
// Menu helpers (movement section)
/////////////////////////

var menu_elements_t = {}, menu_c = {}, menu_spacer = "                                                                                  ";
menu_c.call = function (fn, group, label, props) {
    if (label in menu_elements_t) throw new Error("[Menu] label must be unique");
    var key = group + menu_spacer + label, args = [key];
    var meta = { name: group, label: label, properties: props };
    if (props !== null) for (var i = 0; i < props.length; i++) args.push(props[i]);
    fn.apply(null, args); menu_elements_t[label] = meta; return label;
};
menu_c.get = function (label) {
    if (!(label in menu_elements_t)) throw new Error("[Menu] label not found");
    var h = menu_elements_t[label], key = h.name + menu_spacer + h.label;
    return UI.GetValue("Misc", "JAVASCRIPT", "Script items", key);
};
menu_c.get_hotkey = function (label) {
    if (!(label in menu_elements_t)) throw new Error("[Menu] label not found");
    var h = menu_elements_t[label], key = h.name + menu_spacer + h.label;
    return UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", key);
};

/////////////////////////
// Globals
/////////////////////////

var fx_alpha = 0, fx_frame = 0, CLANTAG = "|REZOLVER|";
var aa = 1, aad = 1, lasttime = 0, realtime = 0;

/////////////////////////
// AA sets UI (1–4) + Links
/////////////////////////

UI.AddSliderFloat("ANTI",   -180, 180);
UI.AddSliderFloat("Delta1", -180, 180);
UI.AddSliderFloat("Desync1",-180, 180);
UI.AddSliderFloat("Pitch1",    0,   7);

UI.AddSliderFloat("ANTI9",  -180, 180);
UI.AddSliderFloat("Delta2", -180, 180);
UI.AddSliderFloat("Desync2",-180, 180);
UI.AddSliderFloat("Pitch2",    0,   7);

UI.AddSliderFloat("Delta3", -180, 180);
UI.AddSliderFloat("Desync3",-180, 180);
UI.AddSliderFloat("Delta4", -180, 180);
UI.AddSliderFloat("Desync4",-180, 180);

UI.AddCheckbox("Link Delta1&Desync1");
UI.AddSliderFloat("Delta-Desync1", -180, 180);
UI.AddCheckbox("Link Delta2&Desync2");
UI.AddSliderFloat("Delta-Desync2", -180, 180);
UI.AddCheckbox("Link Delta3&Desync3");
UI.AddSliderFloat("Delta-Desync3", -180, 180);
UI.AddCheckbox("Link Delta4&Desync4");
UI.AddSliderFloat("Delta-Desync4", -180, 180);

/////////////////////////
// Main Menu
/////////////////////////

function addtomenu() {
    UI.AddLabel("— REZOLVER — Antiaim");
    UI.AddSliderInt("Antiaim_x", 0, Global.GetScreenSize()[0]);
    UI.AddSliderInt("Antiaim_y", 0, Global.GetScreenSize()[1]);
    UI.AddDropdown("Lagsync", ["0", "1"]);
    // Добавлен новый режим "Offset Shuffle" (последний пункт)
    UI.AddDropdown("Type", ["Off", "GOD mode", "Low tap", "spin", "Low_delta", "Wide_delta", "Desync wave", "LBY pulse", "Offset Shuffle"]);
    UI.AddSliderFloat("SWITCH delay", 0.05, 1.50);
    UI.AddSliderInt("AA min diff", 0, 60);
    UI.AddDropdown("Breaker", ["Off", "Lag V1", "Lag V2"]);
    UI.AddSliderFloat("Effect duration", 0, 2);

    // Desync wave
    UI.AddLabel("Desync wave");
    UI.AddSliderInt("DW min", 15, 60);
    UI.AddSliderInt("DW max", 20, 60);
    UI.AddSliderInt("DW steps", 2, 12);
    UI.AddSliderInt("DW speed", 1, 20);

    // LBY Pulse (Wide)
    UI.AddLabel("LBY Pulse (Wide)");
    UI.AddSliderInt("LBY pulse A", 0, 120);
    UI.AddSliderInt("LBY pulse B", 0, 120);
    UI.AddSliderFloat("LBY pulse hold", 0.05, 1.50);

    // Offset Shuffle (использует A1–A4 сеты)
    UI.AddLabel("Offset Shuffle");
    UI.AddDropdown("OS shuffle mode", ["Sequential", "Random"]);
    UI.AddSliderFloat("OS hold min", 0.05, 1.50);
    UI.AddSliderFloat("OS hold max", 0.05, 1.50);

    // ResolverX + HUD
    UI.AddCheckbox("ResolverX enabled");
    UI.AddCheckbox("Resolver HUD");
    UI.AddSliderInt("RZ HUD X", 0, Global.GetScreenSize()[0]);
    UI.AddSliderInt("RZ HUD Y", 0, Global.GetScreenSize()[1]);

    // Aspect ratio
    UI.AddSliderInt("Aspect ratio", 0, 500);

    // Anti Bruteforce
    UI.AddDropdown("Anti Bruteforce", ["Off", "On Hit", "On Shot"]);

    // AA HUD
    UI.AddCheckbox("AA HUD");
    var ss = Global.GetScreenSize();
    UI.AddSliderInt("AA HUD X", 0, ss[0]);
    UI.AddSliderInt("AA HUD Y", 0, ss[1]);
}

/////////////////////////
// Trashtalk
/////////////////////////

var normal_killsays = ['Создатель JS "REЗOLVER"'];
var hs_killsays = ['Подпишись |https:/www.youtube.com/watch?v=ERlB-HlY8Dk&t=49s|'];
function on_death() {
    var pool = (Event.GetInt("headshot") === 1 && Math.random() > 0.5) ? hs_killsays : normal_killsays;
    var msg = pool[(Math.random() * pool.length) | 0];
    Cheat.ExecuteCommand("say " + msg);
    Local.SetClanTag("REZOLVER");
}

/////////////////////////
// Presets / A-sets
/////////////////////////

function V1() { UI.SetValue("Anti-Aim","Fake angles","LBY mode",200); UI.SetValue("Anti-Aim","Fake-Lag","Limit",1); UI.SetValue("Anti-Aim","Rage Anti-Aim","Yaw offset",40); UI.SetValue("Anti-Aim","Fake angles","LBY mode",100); Local.SetClanTag("REZOLVER"); }
function V2() { Local.SetClanTag(CLANTAG); UI.SetValue("Anti-Aim","Rage Anti-Aim","Yaw offset",-40); UI.SetValue("Anti-Aim","Fake angles","LBY mode",100); UI.SetValue("Anti-Aim","Fake-Lag","Limit",20); }
function V3() { AntiAim.SetOverride(1); AntiAim.SetFakeOffset(40); AntiAim.SetRealOffset(40); AntiAim.SetLBYOffset(40); UI.SetValue("Anti-Aim","Fake-Lag","Limit",7); }
function S1() { AntiAim.SetOverride(1); AntiAim.SetFakeOffset(-40); AntiAim.SetRealOffset(12); AntiAim.SetLBYOffset(-16); UI.SetValue("Anti-Aim","Fake-Lag","Limit",7); Local.SetClanTag("REЗOLVER"); }
function S2() { Local.SetClanTag(CLANTAG); var yo=((Math.random()*61)|0)-30; AntiAim.SetOverride(1); AntiAim.SetFakeOffset(40); AntiAim.SetRealOffset(-12); AntiAim.SetLBYOffset(16); UI.SetValue("Anti-Aim","Rage Anti-Aim","Yaw offset", yo); }

function readSet(idx) {
    var anti = UI.GetValue("Misc","JAVASCRIPT","Script items","Anti"+idx);
    var link = UI.GetValue("Misc","JAVASCRIPT","Script items","Link Delta"+idx+"&Desync"+idx);
    var d = link ? UI.GetValue("Misc","JAVASCRIPT","Script items","Delta-Desync"+idx)
                 : UI.GetValue("Misc","JAVASCRIPT","Script items","Delta"+idx);
    var s = link ? UI.GetValue("Misc","JAVASCRIPT","Script items","Delta-Desync"+idx)
                 : UI.GetValue("Misc","JAVASCRIPT","Script items","Desync"+idx);
    var p = UI.GetValue("Misc","JAVASCRIPT","Script items","Pitch"+idx);
    return { anti: anti, delta: d, desync: s, pitch: p };
}

function applySet(idx, antiKey) {
    if (!isAlive()) return;
    var inv = UI.IsHotkeyActive("Anti-Aim","Fake angles","Inverter");
    var sign = inv ? -1 : 1;
    var v = readSet(idx);
    var anti = (typeof antiKey === "string") ? UI.GetValue("Misc","JAVASCRIPT","Script items", antiKey) : v.anti;

    var real = sign * v.delta, fake = sign * anti, lby = sign * v.desync;
    var md = UI.GetValue("Misc","JAVASCRIPT","Script items","AA min diff") | 0;
    var rf = ensureMinDiff(real, fake, md);

    AntiAim.SetOverride(1);
    AntiAim.SetRealOffset(rf[0]);
    AntiAim.SetFakeOffset(rf[1]);
    AntiAim.SetLBYOffset(lby);
    UI.SetValue("Anti-Aim","Extra","Pitch", v.pitch);
}

function A1() { Local.SetClanTag(CLANTAG); applySet(1, "ANTI"); }
function A2() { applySet(3, "ANTI"); }
function A3() { applySet(2, "ANTI9"); }
function A4() { applySet(4, "ANTI9"); }

/////////////////////////
// Breakers (V1/V2) — независимые таймеры
/////////////////////////

function BR1(){ UI.SetValue("Anti-Aim","Extra","Pitch",3); }
function BR2(){ UI.SetValue("Anti-Aim","Extra","Pitch",3); }
function BR3(){ UI.SetValue("Anti-Aim","Extra","Pitch",1); }
function BRR1(){ var t=1+((Math.random()*34)|0); UI.SetValue("Anti-Aim","Fake-Lag","Trigger limit", t); }
function BRR2(){ UI.SetValue("Anti-Aim","Fake-Lag","Trigger limit",5); }
function BRR3(){ var t=2+((Math.random()*7)|0); UI.SetValue("Anti-Aim","Fake-Lag","Limit", t); }

var br1_last = 0.0, br1_state = 1;
var br2_last = 0.0, br2_state = 1;

function breakerv1(){
    if (!isAlive()) return;
    var status = UI.GetValue("Misc","JAVASCRIPT","Script items","Lagsync");
    if (status !== 1) return;
    var delay  = UI.GetValue("Misc","JAVASCRIPT","Script items","SWITCH delay");
    var now    = Global.Realtime();
    if (br1_last === 0) br1_last = now;

    if (now - br1_last >= delay){
        br1_state = (br1_state % 3) + 1;
        if      (br1_state === 1) BR1();
        else if (br1_state === 2) BR2();
        else                      BR3();
        br1_last = now;
    }
}
function breakerv2(){
    if (!isAlive()) return;
    var status = UI.GetValue("Misc","JAVASCRIPT","Script items","Lagsync");
    var delay  = UI.GetValue("Misc","JAVASCRIPT","Script items","SWITCH delay");
    var now    = Global.Realtime();
    if (br2_last === 0) br2_last = now;

    if (now - br2_last >= delay){
        if (status === 1) br2_state = 1 + ((Math.random() * 3) | 0);
        else              br2_state = (br2_state % 3) + 1;

        if      (br2_state === 1) BRR1();
        else if (br2_state === 2) BRR2();
        else                      BRR3();

        br2_last = now;
    }
}
function breakerdisable(){}

/////////////////////////
// Desync wave
/////////////////////////

var dw_last_step = 0, dw_hold_ticks = 0;
function lagsync_desyncwave() {
    if (!isAlive()) return;

    var inv = UI.IsHotkeyActive("Anti-Aim","Fake angles","Inverter");
    var sign = inv ? -1 : 1;

    var DW_MIN = UI.GetValue("Misc","JAVASCRIPT","Script items","DW min");
    var DW_MAX = UI.GetValue("Misc","JAVASCRIPT","Script items","DW max");
    var DW_STEPS = UI.GetValue("Misc","JAVASCRIPT","Script items","DW steps");
    var DW_SPEED = UI.GetValue("Misc","JAVASCRIPT","Script items","DW speed");

    DW_MIN = clamp(DW_MIN, 15, 60);
    DW_MAX = clamp(DW_MAX, DW_MIN + 6, 60);
    DW_STEPS = clamp(DW_STEPS, 2, 12);
    DW_SPEED = clamp(DW_SPEED, 1, 20);

    var t = Global.Realtime() * DW_SPEED;
    var s = Math.sin(t) * 0.5 + 0.5;
    var amp = DW_MIN + s * (DW_MAX - DW_MIN);

    var step_size = Math.max(1, Math.round((DW_MAX - DW_MIN) / Math.max(2, DW_STEPS)));
    amp = Math.floor(amp / step_size) * step_size;

    if (dw_hold_ticks > 0) { amp = dw_last_step; dw_hold_ticks--; }
    else { dw_last_step = amp; if (Math.random() < 0.20) dw_hold_ticks = 1; }

    var speed2d = vel2D(Entity.GetLocalPlayer());
    var flags = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_fFlags");
    var on_ground = (flags & 1);
    var slow = UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk");
    var scale = (!on_ground) ? 1.15 : ((slow || speed2d < 20) ? 0.90 : 1.0);

    var ampScaled = clamp(Math.round(amp * scale), DW_MIN, 60);
    var real = sign * ((ampScaled * 0.25) | 0);
    var fake = -sign * clamp(((ampScaled * 1.10) | 0) + 8, 0, 60);
    var lby  = sign * 20;

    var md = UI.GetValue("Misc","JAVASCRIPT","Script items","AA min diff") | 0;
    var rf = ensureMinDiff(real, fake, md);

    AntiAim.SetOverride(1);
    AntiAim.SetRealOffset(rf[0]); AntiAim.SetFakeOffset(rf[1]); AntiAim.SetLBYOffset(lby);
}

function lagsyncdisable() {}

/////////////////////////
// LBY Pulse (Wide base)
/////////////////////////

var lby_pulse_next = 0.0, lby_pulse_state = false;
function lagsync_lbypulse() {
    if (!isAlive()) return;

    var inv  = UI.IsHotkeyActive("Anti-Aim","Fake angles","Inverter");
    var sign = inv ? 1 : -1;

    var lbyA = UI.GetValue("Misc","JAVASCRIPT","Script items","LBY pulse A");
    var lbyB = UI.GetValue("Misc","JAVASCRIPT","Script items","LBY pulse B");
    var hold = UI.GetValue("Misc","JAVASCRIPT","Script items","LBY pulse hold");

    var now = Global.Realtime();
    if (now >= lby_pulse_next) {
        lby_pulse_state = !lby_pulse_state;
        lby_pulse_next = now + clamp(hold, 0.05, 1.50);
    }

    var real = sign * 40, fake = -4;
    var lby  = -sign * clamp(lby_pulse_state ? lbyB : lbyA, 0, 120);

    AntiAim.SetOverride(1);
    AntiAim.SetRealOffset(real); AntiAim.SetFakeOffset(fake); AntiAim.SetLBYOffset(lby);
}

/////////////////////////
// Offset Shuffle (новый режим)
/////////////////////////

var os_state = 1, os_next = 0.0;
function lagsync_offsetshuffle() {
    if (!isAlive()) return;

    var now  = Global.Realtime();
    var mode = UI.GetValue("Misc","JAVASCRIPT","Script items","OS shuffle mode"); // 0 = seq, 1 = rnd
    var hmin = UI.GetValue("Misc","JAVASCRIPT","Script items","OS hold min");
    var hmax = UI.GetValue("Misc","JAVASCRIPT","Script items","OS hold max");
    if (hmax < hmin) hmax = hmin;

    if (now >= os_next) {
        if (mode === 1) os_state = 1 + ((Math.random() * 4) | 0);
        else            os_state = (os_state % 4) + 1;

        var hold = clamp(hmin + Math.random() * Math.max(0, hmax - hmin), hmin, hmax);
        os_next = now + hold;
    }

    if      (os_state === 1) A1();
    else if (os_state === 2) A2();
    else if (os_state === 3) A3();
    else                     A4();
}

/////////////////////////
// Lagsync modes & main (breaker после режима)
/////////////////////////

function lagsyncv1() { // Low tap
    var status = UI.GetValue("Misc","JAVASCRIPT","Script items","Lagsync");
    var de     = UI.GetValue("Misc","JAVASCRIPT","Script items","SWITCH delay");
    realtime = Global.Realtime(); if (!lasttime) lasttime = realtime;

    if (realtime - lasttime >= de) {
        if (status === 1) { aad = aa + 1; if (aad > 2) aad = 1; aa = aad; }
        if (aa === 1) S1(); else S2();
        lasttime = realtime;
    }
}

function lagsyncv2() { // GOD mode
    var status = UI.GetValue("Misc","JAVASCRIPT","Script items","Lagsync");
    var de     = UI.GetValue("Misc","JAVASCRIPT","Script items","SWITCH delay");
    realtime = Global.Realtime(); if (!lasttime) lasttime = realtime;

    if (realtime - lasttime >= de) {
        if (status === 1) { aad = aa + 1; if (aad > 3) aad = 1; aa = aad; }
        if      (aa === 1) V1();
        else if (aa === 2) V2();
        else               V3();
        lasttime = realtime;
    }
}

function lagsyncv3() { // spin A1–A4
    var status = UI.GetValue("Misc","JAVASCRIPT","Script items","Lagsync");
    var de     = UI.GetValue("Misc","JAVASCRIPT","Script items","SWITCH delay");
    realtime = Global.Realtime(); if (!lasttime) lasttime = realtime;

    if (realtime - lasttime >= de) {
        if (status === 1) aa = 1 + ((Math.random() * 4) | 0);
        else { aa = aa + 1; if (aa > 4) aa = 1; }
        lasttime = realtime;
    }

    if      (aa === 1) A1();
    else if (aa === 2) A2();
    else if (aa === 3) A3();
    else               A4();
}

function lagsyncv4() { // Low_delta + min diff
    if (!isAlive()) return;
    Local.SetClanTag(CLANTAG);
    var inv = UI.IsHotkeyActive("Anti-Aim","Fake angles","Inverter");
    var sign = inv ? -1 : 1;
    var real = sign * 12, fake = -4, lby = -sign * 16;
    var md = UI.GetValue("Misc","JAVASCRIPT","Script items","AA min diff") | 0;
    var rf = ensureMinDiff(real, fake, md);
    AntiAim.SetOverride(1);
    AntiAim.SetRealOffset(rf[0]); AntiAim.SetFakeOffset(rf[1]); AntiAim.SetLBYOffset(lby);
    UI.SetValue("Anti-Aim","Extra","Pitch", 3);
}

function lagsyncv5() { // Wide_delta + min diff
    if (!isAlive()) return;
    Local.SetClanTag(CLANTAG);
    var inv = UI.IsHotkeyActive("Anti-Aim","Fake angles","Inverter");
    var sign = inv ? -1 : 1;
    var real = sign * 40, fake = -4, lby = -sign * 70;
    var md = UI.GetValue("Misc","JAVASCRIPT","Script items","AA min diff") | 0;
    var rf = ensureMinDiff(real, fake, md);
    AntiAim.SetOverride(1);
    AntiAim.SetRealOffset(rf[0]); AntiAim.SetFakeOffset(rf[1]); AntiAim.SetLBYOffset(lby);
    UI.SetValue("Anti-Aim","Extra","Pitch", 3);
}

// Главный роутер: сначала режим, потом breaker
function lagsyncmain() {
    if (!isAlive()) return;

    var mode    = UI.GetValue("Misc","JAVASCRIPT","Script items","Type");
    var breaker = UI.GetValue("Misc","JAVASCRIPT","Script items","Breaker");

    switch (mode) {
        case 0:  lagsyncdisable();       break;
        case 1:  lagsyncv2();            break; // GOD
        case 2:  lagsyncv1();            break; // Low tap
        case 3:  lagsyncv3();            break; // spin
        case 4:  lagsyncv4();            break; // Low_delta
        case 5:  lagsyncv5();            break; // Wide_delta
        case 6:  lagsync_desyncwave();   break; // Desync wave
        case 7:  lagsync_lbypulse();     break; // LBY pulse
        case 8:  lagsync_offsetshuffle();break; // Offset Shuffle
    }

    if      (breaker === 1) breakerv1();
    else if (breaker === 2) breakerv2();
    else                    breakerdisable();
}

/////////////////////////
// AA HUD
/////////////////////////

function draw_arc(cx, cy, r, startDeg, endDeg, col) {
    var step = (2 * Math.PI) / 30, a0 = (startDeg * Math.PI) / 180, a1 = (endDeg * Math.PI) / 180;
    for (var a = a0; a < a1; a += step) {
        var x1 = Math.round(cx + r * Math.cos(a)),   y1 = Math.round(cy + r * Math.sin(a));
        var x2 = Math.round(cx + r * Math.cos(a+step)), y2 = Math.round(cy + r * Math.sin(a+step));
        Render.Line(x1, y1, x2, y2, col);
    }
}
function in_bounds(pt, x, y, w, h) {
    return (pt[0] >= x && pt[1] >= y && pt[0] <= x + w && pt[1] <= y + h);
}

function main_aa() {
    if (!isAlive()) return;

    var x = UI.GetValue("Misc","JAVASCRIPT","Script items","Antiaim_x");
    var y = UI.GetValue("Misc","JAVASCRIPT","Script items","Antiaim_y");
    var f = g_font || Render.AddFont("Verdana", 7, 100);

    var ry = Local.GetRealYaw(), fy = Local.GetFakeYaw();
    var gap = Math.min(Math.abs(ry - fy) / 2, 60).toFixed(1);
    var inv = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
    var side = inv ? "<-" : "->";
    var text = "FAKE(" + gap + ") | side " + side + " | REЗOLVER";

    var w = Render.TextSizeCustom(text, f)[0] + 10;
    Render.FilledRect(x - w, y, w, 2, [100, 150, 255, 100]);
    Render.FilledRect(x - w, y + 2, w, 18, [17, 17, 17, 180]);
    Render.StringCustom(x - w + 4, y + 4, 0, text, [230, 230, 230, 255], f);
    draw_arc(x - w + 10, y + 11, 5, 0, parseFloat(gap) * 6, [0, 255, 0, 220]);

    if (UI.IsMenuOpen() && Global.IsKeyPressed(1)) {
        var cur = Global.GetCursorPosition();
        if (in_bounds(cur, x - w, y, w, 20)) {
            UI.SetValue("Misc","JAVASCRIPT","Script items","Antiaim_x", cur[0] + w / 2);
            UI.SetValue("Misc","JAVASCRIPT","Script items","Antiaim_y", cur[1] - 12);
        }
    }
}

/////////////////////////
// ResolverX + HUD
/////////////////////////

var RZ = { pending: [], st: {}, lastToggle: 0.0, baim_until: 0.0, curTarget: -1, baim_active: false };
var RZ_BAIM_PATHS = [["Rage","General","Force body aim"],["Rage","Aimbot","Force body aim"],["Ragebot","General","Force body aim"],["Ragebot","Accuracy","Force body aim"]];
var RZ_SAFE_PATHS = [["Rage","General","Force safe point"],["Rage","Aimbot","Force safe point"],["Ragebot","General","Force safe point"],["Ragebot","Accuracy","Force safe point"]];
var RZ_SEEDS = [
    {invert:null, baim:false, safepoint:false},
    {invert:true, baim:false, safepoint:false},
    {invert:null, baim:true, safepoint:false},
    {invert:true, baim:true, safepoint:false},
    {invert:null, baim:false, safepoint:true},
    {invert:true, baim:false, safepoint:true}
];

function RZ_len(a){ return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]); }
function RZ_sub(a,b){ return [a[0]-b[0],a[1]-b[1],a[2]-b[2]]; }
function RZ_dist_point_to_segment(P,A,B){
    var L=RZ_sub(P,A), D=RZ_sub(B,A), len=RZ_len(D); if(len<1e-6) return RZ_len(L);
    var n=[D[0]/len,D[1]/len,D[2]/len], t=L[0]*n[0]+L[1]*n[1]+L[2]*n[2];
    t = clamp(t, 0, len);
    var C=[A[0]+n[0]*t,A[1]+n[1]*t,A[2]+n[2]*t];
    return RZ_len(RZ_sub(P,C));
}
function RZ_isActive(p){ try{ return UI.IsHotkeyActive(p[0],p[1],p[2]); }catch(e){ return false; } }
function RZ_toggle(p){ try{ return UI.ToggleHotkey(p[0],p[1],p[2]); }catch(e){ return false; } }
function RZ_setHotkey(paths,on){
    var now=Global.Realtime(); if(now-RZ.lastToggle<0.05) return;
    var active=false, idx=-1;
    for (var i=0;i<paths.length;i++){ if(RZ_isActive(paths[i])){ active=true; idx=i; break; } }
    if (on && !active){ for (var j=0;j<paths.length;j++){ if(RZ_toggle(paths[j])){ RZ.lastToggle=now; break; } } }
    if (!on && active){ if (idx>=0 && RZ_toggle(paths[idx])) RZ.lastToggle=now; }
}
function RZ_setBAIM(on){ RZ_setHotkey(RZ_BAIM_PATHS,on); }
function RZ_setSAFE(on){ RZ_setHotkey(RZ_SAFE_PATHS,on); }
function RZ_setInvert(desired){
    if (desired===null) return;
    var cur = UI.IsHotkeyActive("Anti-Aim","Fake angles","Inverter");
    if (!!desired !== !!cur) UI.ToggleHotkey("Anti-Aim","Fake angles","Inverter");
}
function RZ_get(e){ if(!RZ.st[e]) RZ.st[e]={seed:0,lastApplied:-1,miss:0,hit:0,lowdelta_until:0.0}; return RZ.st[e]; }

function RZ_nearestEnemyToImpact(pos){
    var list=Entity.GetPlayers(), best=-1, bestD=1e9;
    for (var i=0;i<list.length;i++){
        var e=list[i]; if(!Entity.IsEnemy(e)||!Entity.IsAlive(e)||Entity.IsDormant(e)) continue;
        var head=Entity.GetHitboxPosition(e,0); if(!head) continue;
        var d=RZ_len(RZ_sub(pos,head)); if(d<bestD){ bestD=d; best=e; }
    }
    return best;
}
function RZ_OnBulletImpact(){
    if (!UI.GetValue("Misc","JAVASCRIPT","Script items","ResolverX enabled")) return;
    var me=Entity.GetLocalPlayer(); if (!me) return;
    var uid=Entity.GetEntityFromUserID(Event.GetInt("userid")); if (uid!==me) return;
    var pos=[Event.GetFloat("x"),Event.GetFloat("y"),Event.GetFloat("z")];
    var eye=Entity.GetEyePosition(me);
    var target=RZ_nearestEnemyToImpact(pos);
    if (target!==-1) RZ.pending.push({i:target,time:Global.Curtime(),pos:pos,start:eye});
}
function RZ_OnHurt(){
    if (!UI.GetValue("Misc","JAVASCRIPT","Script items","ResolverX enabled")) return;
    var me=Entity.GetLocalPlayer(); if(!me) return;
    var attacker=Entity.GetEntityFromUserID(Event.GetInt("attacker")); if(attacker!==me) return;
    var victim=Entity.GetEntityFromUserID(Event.GetInt("userid")); if(!victim) return;
    RZ_get(victim).hit++;
    var now=Global.Curtime(), idx=-1, bestDt=1e9;
    for (var k=0;k<RZ.pending.length;k++){
        if (RZ.pending[k].i===victim){
            var dt=Math.abs(now-RZ.pending[k].time);
            if (dt<bestDt){ bestDt=dt; idx=k; }
        }
    }
    if (idx>=0) RZ.pending.splice(idx,1);
    RZ_get(victim).seed=0;
}
function RZ_applySeed(sd){ RZ_setInvert(sd.invert); RZ_setBAIM(!!sd.baim); RZ_setSAFE(!!sd.safepoint); }

function RZ_Update(){
    if (!UI.GetValue("Misc","JAVASCRIPT","Script items","ResolverX enabled")){ RZ_setBAIM(false); RZ_setSAFE(false); RZ.curTarget=-1; RZ.baim_active=false; return; }
    if (!isAlive()){ RZ_setBAIM(false); RZ_setSAFE(false); RZ.curTarget=-1; RZ.baim_active=false; return; }
    var now=Global.Curtime();

    for (var k=RZ.pending.length-1;k>=0;k--){
        var it=RZ.pending[k];
        if (now - it.time > 0.20){
            var head=Entity.GetHitboxPosition(it.i,0);
            if (head){
                var d=RZ_dist_point_to_segment(head,it.start,it.pos);
                if (d<26){
                    var st=RZ_get(it.i);
                    st.miss++; st.seed=(st.seed+1)%RZ_SEEDS.length;
                    st.lowdelta_until=now+2.0; RZ.baim_until=now+1.0;
                }
            }
            RZ.pending.splice(k,1);
        }
    }

    var want_baim=(RZ.baim_until>now);
    if(!want_baim){
        var enemies=Entity.GetPlayers();
        for (var i=0;i<enemies.length;i++){
            var e=enemies[i]; if(!Entity.IsEnemy(e)) continue;
            var st=RZ.st[e]; if (st && st.lowdelta_until>now){ want_baim=true; break; }
        }
    }
    RZ_setBAIM(want_baim); RZ.baim_active=want_baim;

    var target=-1;
    if (RZ.pending.length>0) target=RZ.pending[RZ.pending.length-1].i;
    if (target===-1){
        var list=Entity.GetPlayers();
        for (var j=0;j<list.length;j++){
            var en=list[j]; if(!Entity.IsEnemy(en)||!Entity.IsAlive(en)||Entity.IsDormant(en)) continue;
            var st2=RZ.st[en]; if(st2 && st2.lowdelta_until>now){ target=en; break; }
        }
    }
    RZ.curTarget=target;
    if (target!==-1){
        var stt=RZ_get(target);
        if (stt.seed!==stt.lastApplied){
            var sd=RZ_SEEDS[stt.seed]; RZ_applySeed(sd); stt.lastApplied=stt.seed;
        }
    }
}

function RZ_DrawHUD(){
    if (!UI.GetValue("Misc","JAVASCRIPT","Script items","Resolver HUD")) return;
    if (!World.GetServerString()) return;

    var x=UI.GetValue("Misc","JAVASCRIPT","Script items","RZ HUD X");
    var y=UI.GetValue("Misc","JAVASCRIPT","Script items","RZ HUD Y");
    var tg=RZ.curTarget, name=tg>0 ? (Entity.GetName?Entity.GetName(tg):("ent#"+tg)) : "none";
    var seedIdx=tg>0 ? RZ_get(tg).seed : -1, sd=(seedIdx>=0)?RZ_SEEDS[seedIdx]:null;
    var seedName=sd?((sd.invert?"INV":"BASE")+(sd.baim?"+BAIM":"")+(sd.safepoint?"+SAFE":"")):"-";
    var pending=RZ.pending.length, baim=RZ.baim_active;

    var f=g_font||Render.AddFont("Verdana",7,100);
    var s="RESOLVER | target: "+name+" | seed: "+(seedIdx>=0?seedIdx:"-")+" ["+seedName+"] | BAIM: "+(baim?"ON":"OFF")+" | pending: "+pending;
    var w=Render.TextSizeCustom(s,f)[0]+10;

    Render.FilledRect(x-w,y,w,2, baim?[0,200,90,100]:[89,129,239,100]);
    Render.FilledRect(x-w,y+2,w,18,[17,17,17,180]);
    Render.StringCustom(x-w+4,y+4,0,s, baim?[0,220,120,255]:[204,0,204,255], f);
}

/////////////////////////
// Movement / Air Stuck / Jump tools
/////////////////////////

var vec3 = {};
vec3.new = function (arr) { return {x:arr[0], y:arr[1], z:arr[2]}; };

var mv_info     = menu_c.call(UI.AddCheckbox, "Movement", "Draw movement info", null);
var mv_info_off = menu_c.call(UI.AddSliderInt, "Movement", "Info chart offset", [0,500]);

var jb   = menu_c.call(UI.AddHotkey,"Movement","Jump bug",null);
var cb   = menu_c.call(UI.AddHotkey,"Movement","Crouch bug",null);
var lj   = menu_c.call(UI.AddHotkey,"Movement","Long jump",null);
var hk_as= menu_c.call(UI.AddHotkey,"Exploit","Air stuck",null);

var as_saved_fl=-1, as_prev_fl=-1, as_suppressed_move=false;
function AirStuck_Update() {
    if (!World.GetServerString()) {
        if (as_saved_fl!==-1 && as_prev_fl!==as_saved_fl) { UI.SetValue("Anti-Aim","Fake-Lag","Limit",as_saved_fl); as_prev_fl=as_saved_fl; }
        as_saved_fl = -1; as_suppressed_move = false; return;
    }
    var me=Entity.GetLocalPlayer(); if (!me || !Entity.IsAlive(me)) {
        if (as_saved_fl!==-1 && as_prev_fl!==as_saved_fl) { UI.SetValue("Anti-Aim","Fake-Lag","Limit",as_saved_fl); as_prev_fl=as_saved_fl; }
        as_saved_fl = -1; as_suppressed_move=false; return;
    }
    var active = menu_c.get_hotkey(hk_as);
    var flags = Entity.GetProp(me,"CBasePlayer","m_fFlags"); var on_ground=(flags&1);
    if (active && !on_ground) {
        if (as_saved_fl===-1) as_saved_fl=UI.GetValue("Anti-Aim","Fake-Lag","Limit");
        if (as_prev_fl!==16) { UI.SetValue("Anti-Aim","Fake-Lag","Limit",16); as_prev_fl=16; }
        if (!as_suppressed_move) { Cheat.ExecuteCommand("-forward;-back;-moveleft;-moveright"); as_suppressed_move=true; }
    } else {
        if (as_saved_fl!==-1 && as_prev_fl!==as_saved_fl) { UI.SetValue("Anti-Aim","Fake-Lag","Limit",as_saved_fl); as_prev_fl=as_saved_fl; }
        as_saved_fl=-1; if (as_suppressed_move) as_suppressed_move=false;
    }
}

var max_radius=Math.PI*2, step=max_radius/24, unduck=false, is_lj=false, last_log=0, velocity_data=[];
function do_jump_bug(Q){
    if (!isAlive()) return;
    var P=Entity.GetLocalPlayer();
    if (!menu_c.get_hotkey(jb) && !menu_c.get_hotkey(cb)) { if (unduck) { unduck=false; Cheat.ExecuteCommand("-duck"); } return; }
    if (unduck) { unduck=false; Cheat.ExecuteCommand("-duck"); }

    var N = Entity.GetProp(P,"CBasePlayer","m_fFlags");
    var O0=vec3.new(Entity.GetProp(P,"CBaseEntity","m_vecOrigin"));
    var V0=Entity.GetProp(P,"CBasePlayer","m_vecVelocity[0]")||[0,0,0];
    var T ={x:V0[0]*Global.TickInterval(), y:V0[1]*Global.TickInterval(), z:0};
    var O ={x:O0.x+T.x, y:O0.y+T.y, z:O0.z+T.z};

    if (N & 1) { if (Q && UserCMD && UserCMD.ForceJump) UserCMD.ForceJump(); return; }

    for (var f=0; f<max_radius; f+=step){
        var R={x:O.x+Math.cos(f)*17, y:O.y+Math.sin(f)*17, z:O.z};
        var M={x:R.x, y:R.y, z:R.z-9};
        var S=Trace.Line(P, [R.x,R.y,R.z], [M.x,M.y,M.z]);
        if (!S || typeof S[1] === "undefined") continue;
        if (S[1] !== 0 && S[1] !== 1) { Cheat.ExecuteCommand("+duck"); unduck = true; return; }
    }
}
function do_long_jump(){
    if (!isAlive()) return;
    var P=Entity.GetLocalPlayer(), N=Entity.GetProp(P,"CBasePlayer","m_fFlags");
    if (!menu_c.get_hotkey(lj)) { if (is_lj) { is_lj=false; Cheat.ExecuteCommand("-jump"); UI.SetValue("Misc","Movement","Auto strafe",0); } return; }
    if (N & 1) { if (is_lj) { is_lj=false; Cheat.ExecuteCommand("-jump"); UI.SetValue("Misc","Movement","Auto strafe",0); } }
    else {
        if (!is_lj) { is_lj=true; UI.SetValue("Misc","Movement","Auto strafe",3); return; }
        Cheat.ExecuteCommand("+jump");
    }
}
function do_velocity_info(){
    if (!menu_c.get(mv_info) || !isAlive()) return;
    var P=Entity.GetLocalPlayer(), ss=Render.GetScreenSize(), k=ss[0], l=ss[1]+menu_c.get(mv_info_off);
    var o=Entity.GetProp(P,"CBasePlayer","m_vecVelocity[0]")||[0,0,0], Y=Math.sqrt((o[0]||0)*(o[0]||0)+(o[1]||0)*(o[1]||0));
    Render.String(k/2, l/2+150,1, (Y|0).toString(), [255,255,255,255], 4);
    Render.String(k/2+1, l/2+185,1, "u/s", [225,225,225,255], 2);
    Render.Line(k/2-100,l/2+25,k/2-100,l/2+145,[100,100,100,255]);
    Render.Line(k/2-115,l/2+130,k/2+95,l/2+130,[100,100,100,255]);
    if (Global.Curtime()-last_log>Global.TickInterval()){ last_log=Global.Curtime(); velocity_data.unshift([Y,true]); }
    if (velocity_data.length>40) velocity_data.pop();
    for (var f=0; f<velocity_data.length-1; f++){
        var U=velocity_data[f][0], X=velocity_data[f+1][0];
        Render.Line(k/2+90-(f-1)*5, l/2+130-(clamp(U,0,450)*75/320), k/2+90-f*5, l/2+130-(clamp(X,0,450)*75/320), [200,200,200,255]);
    }
}

/////////////////////////
// Legit AA overlay on E
/////////////////////////

var LEGIT_E_KEY = 0x45, legitE_saved_fl = -1, legitE_prev_fl = -1, legitE_active = false;
function LegitAA_E_Draw() {
    if (!isAlive()) { legitE_active = false; return; }
    if (!Global.IsKeyPressed(LEGIT_E_KEY)) { legitE_active = false; return; }

    var me = Entity.GetLocalPlayer(), inv = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
    var sign = inv ? -1 : 1, s = vel2D(me);
    var flags = Entity.GetProp(me, "CBasePlayer", "m_fFlags"); var on_ground = (flags & 1);
    var t = (Math.floor(Global.Realtime() * 12) % 2) ? 1 : -1;
    var amp = !on_ground ? 4 : (s > 20 ? 3 : 2);

    AntiAim.SetOverride(1);
    AntiAim.SetRealOffset(sign * (t * amp));
    AntiAim.SetFakeOffset(0);
    AntiAim.SetLBYOffset(0);
    legitE_active = true;
}
function LegitAA_E_UpdateFL() {
    if (!World.GetServerString()) {
        if (legitE_saved_fl !== -1 && legitE_prev_fl !== legitE_saved_fl) { UI.SetValue("Anti-Aim","Fake-Lag","Limit",legitE_saved_fl); legitE_prev_fl=legitE_saved_fl; }
        legitE_saved_fl = -1; legitE_active=false; return;
    }
    if (legitE_active) {
        if (legitE_saved_fl === -1) legitE_saved_fl = UI.GetValue("Anti-Aim","Fake-Lag","Limit");
        if (legitE_prev_fl !== 3) { UI.SetValue("Anti-Aim","Fake-Lag","Limit",3); legitE_prev_fl=3; }
    } else {
        if (legitE_saved_fl !== -1 && legitE_prev_fl !== legitE_saved_fl) { UI.SetValue("Anti-Aim","Fake-Lag","Limit",legitE_saved_fl); legitE_prev_fl=legitE_saved_fl; }
        legitE_saved_fl = -1;
    }
}

/////////////////////////
// Visual effect on kill
/////////////////////////

function render_effect(){
    if (fx_alpha === 0) return;
    var dur = UI.GetValue("Misc","JAVASCRIPT","Script items","Effect duration"); if (!dur || dur <= 0) dur = 1;
    var cd = (1/dur)*Global.Frametime()*255, ce=(1/dur)*Global.Frametime()*360;
    fx_alpha = clamp(fx_alpha - cd, 0, 255);
    fx_frame = clamp(fx_frame - ce, 0, 360);

    var k=Global.GetScreenSize()[0], l=Global.GetScreenSize()[1];
    Render.GradientRect(0,0,k,fx_frame,0,[128,195,255,fx_alpha],[128,195,255,0]);
    Render.GradientRect(0,l-fx_frame,k,fx_frame,0,[128,195,255,0],[128,195,255,fx_alpha]);
    Render.GradientRect(k-fx_frame,0,fx_frame,l,1,[128,195,255,0],[128,195,255,fx_alpha]);
    Render.GradientRect(0,0,fx_frame,l,1,[128,195,255,fx_alpha],[128,195,255,0]);
}
function on_death_effect(){
    var attacker=Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    var victim  =Entity.GetEntityFromUserID(Event.GetInt("userid"));
    var me=Entity.GetLocalPlayer();
    if (me && attacker===me && victim!==me) { fx_alpha=255; fx_frame=360; }
}

/////////////////////////
// Aspect ratio
/////////////////////////

function fsn(){
    var v=UI.GetValue("Misc","JAVASCRIPT","Script items","Aspect ratio");
    if (Global.FrameStage() === 5) Cheat.ExecuteCommand("r_aspectratio " + (v/100));
}

/////////////////////////
// Anti Bruteforce
/////////////////////////

function radian(cc){ return cc*Math.PI/180.0; }
function ExtendVector(base, ang, dist){ var bn=radian(ang); return [dist*Math.cos(bn)+base[0], dist*Math.sin(bn)+base[1], base[2]]; }
function VectorAdd(a,b){ return [a[0]+b[0],a[1]+b[1],a[2]+b[2]]; }
function VectorSubtract(a,b){ return [a[0]-b[0],a[1]-b[1],a[2]-b[2]]; }
function VectorMultiply(a,b){ return [a[0]*b[0],a[1]*b[1],a[2]*b[2]]; }
function VectorLength(x,y,z){ return Math.sqrt(x*x+y*y+z*z); }
function VectorNormalize(a){ var G=VectorLength(a[0],a[1],a[2]); return [a[0]/G,a[1]/G,a[2]/G]; }
function VectorDot(a,b){ return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]; }
function VectorDistance(a,b){ return VectorLength(a[0]-b[0],a[1]-b[1],a[2]-b[2]); }
function ClosestPointOnRay(K,J,I){
    var L=VectorSubtract(K,J), F=VectorSubtract(I,J), G=VectorLength(F[0],F[1],F[2]);
    F=VectorNormalize(F); var H=VectorDot(F,L); if (H<0.0) return J; if (H>G) return I;
    return VectorAdd(J, VectorMultiply(F,[H,H,H]));
}
function Flip(){ UI.ToggleHotkey("Anti-Aim","Fake angles","Inverter"); }

var lastHitTime=0.0, lastImpactTimes=[0.0], lastImpacts=[[0.0,0.0,0.0]];
function OnHurt(){
    if (UI.GetValue("Misc","JAVASCRIPT","Script items","Anti Bruteforce") === 0) return;
    if (Entity.GetEntityFromUserID(Event.GetInt("userid")) !== Entity.GetLocalPlayer()) return;
    var hg = Event.GetInt("hitgroup");
    if (hg === 1 || hg === 6 || hg === 7){
        var now = Global.Curtime();
        if (Math.abs(lastHitTime - now) > 0.5) { lastHitTime = now; Flip(); }
    }
}
function OnBulletImpact(){
    if (UI.GetValue("Misc","JAVASCRIPT","Script items","Anti Bruteforce") !== 2) return;
    var now = Global.Curtime(); if (Math.abs(lastHitTime - now) < 0.5) return;
    var uid = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    var impact = [Event.GetFloat("x"),Event.GetFloat("y"),Event.GetFloat("z"), now];

    if (Entity.IsValid(uid) && Entity.IsEnemy(uid)){
        var eye;
        if (!Entity.IsDormant(uid)) eye = Entity.GetEyePosition(uid);
        else {
            if (Math.abs(lastImpactTimes[uid] - now) < 0.1) eye = lastImpacts[uid];
            else { lastImpacts[uid] = impact; lastImpactTimes[uid] = now; return; }
        }
        var me   = Entity.GetLocalPlayer();
        var myEye= Entity.GetEyePosition(me);
        var myOrg= Entity.GetProp(me,"CBaseEntity","m_vecOrigin");
        var mid  = VectorMultiply(VectorAdd(myEye,myOrg), [0.5,0.5,0.5]);
        var closest=ClosestPointOnRay(mid, eye, impact), d=VectorDistance(mid,closest);
        if (d < 128.0){
            var ry=Local.GetRealYaw(), fy=Local.GetFakeYaw();
            var c1=ClosestPointOnRay(myEye,eye,impact), d1=VectorDistance(myEye,c1);
            var c2=ClosestPointOnRay(myOrg,eye,impact), d2=VectorDistance(myOrg,c2);
            var best,w,j;
            if (d<d1 && d<d2){ best=closest; w=ExtendVector(closest,ry+180.0,10.0); j=ExtendVector(closest,fy+180.0,10.0); }
            else if (d2<d1){
                best=c2;
                var x1=ExtendVector(closest,ry-30.0+100.0,10.0), x2=ExtendVector(closest,ry-30.0-100.0,10.0);
                var k1=ExtendVector(closest,fy-30.0+100.0,10.0), k2=ExtendVector(closest,fy-30.0-100.0,10.0);
                w=(VectorDistance(c2,x1)<VectorDistance(c2,x2))?x1:x2;
                j=(VectorDistance(c2,k1)<VectorDistance(c2,k2))?k1:k2;
            } else { best=c1; w=ExtendVector(closest,ry,10.0); j=ExtendVector(closest,fy,10.0); }
            if (VectorDistance(best,j) < VectorDistance(best,w)) { lastHitTime = now; Flip(); }
        }
        lastImpacts[uid] = impact; lastImpactTimes[uid] = now;
    }
}

/////////////////////////
// CreateMove & Draw
/////////////////////////

function on_create_move() {
    if (!World.GetServerString()) return;
    do_jump_bug(menu_c.get_hotkey(jb));
    do_long_jump();
    RZ_Update();
    AirStuck_Update();
    LegitAA_E_UpdateFL();
}
function on_draw() {
    do_velocity_info();
    lagsyncmain();
    main_aa();
    RZ_DrawHUD();
    LegitAA_E_Draw();
    render_effect();
}

function reset() { last_log = Global.Curtime(); velocity_data = []; }

/////////////////////////
// Init & Register
/////////////////////////

addtomenu();

Register("player_connect_full", on_load);
Register("player_connect_full", reset);

Register("player_death", on_death);
Register("player_death", on_death_effect);

Register("CreateMove", on_create_move);
Register("Draw", on_draw);

Register("player_hurt", OnHurt);
Register("bullet_impact", OnBulletImpact);

// ResolverX
Register("bullet_impact", RZ_OnBulletImpact);
Register("player_hurt", RZ_OnHurt);

// Aspect ratio
Register("FrameStageNotify", fsn);