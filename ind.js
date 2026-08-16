/*
*
* Author: april#0001
*
*/
//region Menu
const enable = UI.AddCheckbox("| indicators | enable");
const modules = UI.AddMultiDropdown("| indicators | active modules", [ "Doubletap", "Fakelag", "Miscellaneous", "Damage logs" ]);
const doubletap_accent = UI.AddColorPicker("| indicators | doubletap accent");
const window_accent_prim = UI.AddColorPicker("| indicators | primary accent");
const window_accent_sec = UI.AddColorPicker("| indicators | secondary accent");
const sliders = {
doubletap: {
x: UI.AddSliderInt("pos_dt_x", 10, 2560),
y: UI.AddSliderInt("pos_dt_y", 10, 1440)
},
fakelag: {
x: UI.AddSliderInt("pos_fl_x", 10, 2560),
y: UI.AddSliderInt("pos_fl_y", 10, 1440)
},
misc: {
x: UI.AddSliderInt("pos_misc_x", 10, 2560),
y: UI.AddSliderInt("pos_misc_y", 10, 1440)
}
};
//endregion
//region Dependencies
const normalize = function(angle) {
while (angle > 180)
angle -= 360;
while (angle < -180)
angle += 360;
return angle;
}
//endregion
//region Locals
var script = {
shared: {
choke_history: [0, 0, 0, 0],
choke_max: 0,
choke_inactive: false,
desync: 0,
speed: 0
},
position: {
doubletap: { x: 10, y: 10 },
fakelag: { x: 10, y: 10 },
misc: { x: 10, y: 10 }
},
hurt_logs: []
};
const weapon_info = {
// Pistols
"glock 18": {clip: 20, icon: "d"},
"p2000": {clip: 13, icon: "o"},
"dual berettas": {clip: 30, icon: "b"},
"p250": {clip: 13, icon: "y"},
"five seven": {clip: 20, icon: "c"},
"cz75 auto": {clip: 12, icon: "Q"},
"usp s": {clip: 12, icon: "P"},
"desert eagle": {clip: 7, icon: "a"},
"r8 revolver": {clip: 8, icon: "R"},
"tec 9": {clip: 18, icon: "w"},
// Heavys
"nova": {clip: 8, icon: "B"},
"xm1014": {clip: 7, icon: "r"},
"mag 7": {clip: 5, icon: "t"},
"sawed off": {clip: 7, icon: "v"},
"negev": {clip: 150, icon: "u"},
"m249": {clip: 100, icon: "i"},
// SMGs
"mp9": {clip: 30, icon: "A"},
"mp7": {clip: 30, icon: "z"},
"mp5 sd": {clip: 30, icon: "p"},
"ump 45": {clip: 25, icon: "q"},
"p90": {clip: 50, icon: "C"},
"pp bizon": {clip: 64, icon: "s"},
"mac 10": {clip: 30, icon: "n"},
// Rifles
"ak 47": {clip: 30, icon: "e"},
"m4a4": {clip: 30, icon: "l"},
"m4a1 s": {clip: 25, icon: "m"},
"famas": {clip: 25, icon: "h"},
"galil ar": {clip: 35, icon: "k"},
"aug": {clip: 30, icon: "f"},
"ssg 08": {clip: 10, icon: "F"},
"sg 553": {clip: 30, icon: "E"},
"awp": {clip: 10, icon: "g"},
"scar 20": {clip: 20, icon: "D"},
"g3sg1": {clip: 20, icon: "j"},
// Equipment
"high explosive grenade": {clip: -1, icon: "I"},
"smoke grenade": {clip: -1, icon: "J"},
"flashbang": {clip: -1, icon: "H"},
"decoy grenade": {clip: -1, icon: "L"},
"molotov": {clip: -1, icon: "K"},
"incendiary grenade": {clip: -1, icon: "M"},
"zeus x27": {clip: 1, icon: "x"},
"c4 explosive": {clip: -1, icon: "N"},
// Knives
"m9 bayonet": {clip: -1, icon: "Z"},
"bayonet": {clip: -1, icon: "V"},
"flip knife": {clip: -1, icon: "W"},
"gut knife": {clip: -1, icon: "X"},
"karambit": {clip: -1, icon: "Y"},
"butterfly knife": {clip: -1, icon: "3"},
"falchion knife": {clip: -1, icon: "1"},
"navaja knife": {clip: -1, icon: "6"},
"shadow daggers": {clip: -1, icon: "4"},
"stiletto knife": {clip: -1, icon: "7"},
"bowie knife": {clip: -1, icon: "G"},
"huntsman knife": {clip: -1, icon: "0"},
"talon knife": {clip: -1, icon: "8"},
"ursus knife": {clip: -1, icon: "5"},
"classic knife": {clip: -1, icon: "G"},
"paracord knife": {clip: -1, icon: "G"},
"survival knife": {clip: -1, icon: "G"},
"nomad knife": {clip: -1, icon: "G"},
"skeleton knife": {clip: -1, icon: "G"},
"knife": {clip: -1, icon: "G"}
};
//endregion
//region Functions
//region Render
const update_positions = function() {
const value = UI.GetValue.apply(null, modules);
if (value & (1 << 0)) {
script.position.doubletap.x = UI.GetValue.apply(null, sliders.doubletap.x);
script.position.doubletap.y = UI.GetValue.apply(null, sliders.doubletap.y);
}
if (value & (1 << 1)) {
script.position.fakelag.x = UI.GetValue.apply(null, sliders.fakelag.x);
script.position.fakelag.y = UI.GetValue.apply(null, sliders.fakelag.y);
}
if (value & (1 << 2)) {
script.position.misc.x = UI.GetValue.apply(null, sliders.misc.x);
script.position.misc.y = UI.GetValue.apply(null, sliders.misc.y);
}
}
const render_indicators = function() {
const primary = UI.GetColor.apply(null, window_accent_prim), secondary = UI.GetColor.apply(null, window_accent_sec);
const doubletapping = UI.GetValue("Rage", "GENERAL", "Exploits", "Doubletap") && UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap");
const render_doubletap = function(me) {
const weapon_icon = weapon_info[Entity.GetName(Entity.GetWeapon(me))].icon;
const charge = Exploit.GetCharge();
const instant = UI.GetValue("Rage", "GENERAL", "Exploits", "Extras") & (1 << 0);

const x = UI.GetValue.apply(null, sliders.doubletap.x), y = UI.GetValue.apply(null, sliders.doubletap.y);
const color = UI.GetColor.apply(null, doubletap_accent)
Render.FilledRect(x, y - 2, 200, 2, [color[0], color[1], color[2], color[3] * charge]);
Render.GradientRect(x, y, 200, 20, 1, [10, 10, 10, 200], [10, 10, 10, 25]);
Render.String(x + 5, y + 4, 0, "DT Mode [" + (instant ? "Offensive" : "Defensive") + "]:", [235, 235, 235, 235], 3);
Render.String(x + 100, y + 4, 0, (doubletapping ? "Active" : "Inactive"), doubletapping ? [193, 235, 80, 235] : [100, 100, 100, 235], 3);
if (weapon_icon)
Render.String(x + 5, y + 25, 0, weapon_icon || "", [235, 235, 235, 200], 5);
}
const render_fakelag = function() {
const x = UI.GetValue.apply(null, sliders.fakelag.x), y = UI.GetValue.apply(null, sliders.fakelag.y);

const alpha = Math.sin(Globals.Tickcount() * Globals.TickInterval() * 2) * 127 + 128;
const ticks = script.shared.choke_history;
const multiplier = ticks[0] / 14;
Render.GradientRect(x, y, 200, 4, 1, secondary, [secondary[0], secondary[1], secondary[2], 25]);
Render.GradientRect(x + 4, y + 4, 196, 20, 1, [10, 10, 10, 200], [10, 10, 10, 25]);
Render.GradientRect(x, y, 4, 47, 0, secondary, primary);
Render.GradientRect(x + 4, y + 27, 196, 20, 1, [10, 10, 10, 200], [10, 10, 10, 25]);
Render.GradientRect(x + 4, y + 25, 196 * multiplier, 2, 1, [25, 25, 25, 200], [235, 235, 235, 235]);
Render.GradientRect(x, y + 47, 200, 4, 1, primary, [primary[0], primary[1], primary[2], 25]);
Render.String(x + 8, y + 8, 0, "FAKE LAG:", [111, 208, 252, 200], 3);
Render.String(x + 8, y + 32, 0, "HISTORY:", [111, 208, 252, 200], 3);
Render.String(x + 75, y + 9, 0, script.shared.choke_inactive ? "INACTIVE" : "CONSTANT", script.shared.choke_inactive ? [235, 15, 15, alpha] : [80, 193, 235, alpha], 3);
Render.String(x + 75, y + 33, 0, ticks[0] + "-" + ticks[1] + "-" + ticks[2] + "-" + ticks[3], [235, 235, 235, 235], 3);
Render.String(x + 145, y + 33, 0, "M: " + script.shared.choke_max, [193, 235, 80, 235], 3);
Render.String(x + 175, y + 33, 0, "F: " + Globals.ChokedCommands(), [193, 235, 80, 235], 3);
}
const render_misc = function() {
const x = UI.GetValue.apply(null, sliders.misc.x), y = UI.GetValue.apply(null, sliders.misc.y);
const multiplier = Math.abs(script.shared.desync) / 60;
const at_targets = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "At targets");
Render.GradientRect(x, y, 200, 4, 1, secondary, [secondary[0], secondary[1], secondary[2], 25]);
Render.GradientRect(x + 4, y + 4, 196, 20, 1, [10, 10, 10, 200], [10, 10, 10, 25]);
Render.GradientRect(x, y, 4, 47, 0, secondary, primary);
Render.GradientRect(x + 4, y + 27, 196, 20, 1, [10, 10, 10, 200], [10, 10, 10, 25]);
Render.GradientRect(x + 4, y + 25, 196 * multiplier, 2, 1, [25, 25, 25, 200], [235, 235, 235, 235]);
Render.GradientRect(x, y + 47, 200, 4, 1, primary, [primary[0], primary[1], primary[2], 25]);
Render.String(x + 8, y + 9, 0, "DESYNC:", [252, 111, 240, 200], 3);
Render.String(x + 55, y + 9, 0, script.shared.desync.toFixed(1).toString(), [235, 235, 235, 200], 3);

Render.Circle(x + (script.shared.desync > 0 ? 78 : 81), y + 11, 2, [235, 235, 235, 45]);
Render.String(x + 8, y + 33, 0, "CURR. COND:", [252, 111, 240, 200], 3);
Render.String(x + 73, y + 33, 0, (doubletapping ? "Double Tap" : "Default"), [235, 235, 235, 200], 3);
Render.String(x + 95, y + 9, 0, "/", [235, 235, 235, 200], 3);
Render.String(x + 130, y + 33, 0, "/", [235, 235, 235, 200], 3);
Render.String(x + 105, y + 9, 0, "DIR:", [193, 235, 80, 200], 3);
Render.String(x + 130, y + 9, 0, (at_targets ? "AT-TGT" : "XHAIR"), [235, 235, 235, 200], 3);
Render.String(x + 140, y + 33, 0, "VEL:", [193, 235, 80, 200], 3);
Render.String(x + 165, y + 33, 0, script.shared.speed.toString(), [235, 235, 235, 200], 3);
}
const render_damage_logs = function() {
const x = Render.GetScreenSize()[0] / 2, y = Render.GetScreenSize()[1] / 2;
for (var i = 0; i < script.hurt_logs.length; i++) {
const current = script.hurt_logs;
script.hurt_logs.anim_time = Math.min(script.hurt_logs.anim_time + Globals.Frametime() / 5, 1);
if (current.anim_time === 1) {
script.hurt_logs.slice(i, 1);
continue;
}
Render.String(x - 20, y - 15 - i * 14, 1, "-" + current.dmg, [146, 255, 92, 200 * (1 - current.anim_time)], 3);
Render.String(x + 5, y - 15 - i * 14, 0, current.name, [235, 235, 235, 200 * (1 - current.anim_time)], 3);
if (current.dead) {
const width = Render.TextSize(current.name, 3);
Render.Line(x + 2, y - 10 - i * 14, x + width[0] + 8, y - 10 - i * 14, [235, 45, 45, 200 * (1 - current.anim_time)]);
}
}
}
const value = UI.GetValue.apply(null, modules);
const me = Entity.GetLocalPlayer();
if (!me || !Entity.IsAlive(me))
return;
if (value & (1 << 0))
render_doubletap(me);
if (value & (1 << 1))
render_fakelag();
if (value & (1 << 2))
render_misc();
if (value & (1 << 3))
render_damage_logs();
}
const update_choke_data = function() {
const choked = Globals.ChokedCommands();
script.shared.choke_max = Math.max(script.shared.choke_max, choked);
if (Globals.Tickcount() % 16 == 0) {
script.shared.choke_history.unshift(script.shared.choke_max);
script.shared.choke_max = 0;
if (script.shared.choke_history.length > 4)
script.shared.choke_history.pop();
script.shared.choke_inactive = true;
for (var i = 0; i < script.shared.choke_history.length; i++) {
if (script.shared.choke_history > 1) {
script.shared.choke_inactive = false;
break;
}
}
}
}
const update_misc_data = function() {
const real = Local.GetRealYaw(), fake = Local.GetFakeYaw();
const velocity = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_vecVelocity[0]");
script.shared.desync = normalize(real - fake) / 2;
script.shared.speed = Math.round(Math.sqrt(velocity[0] ** 2 + velocity[1] ** 2 + velocity[2] ** 2));
}
const handle_dragging = function() {
if (!Input.IsKeyPressed(1))
return;
const pos = Input.GetCursorPosition();
for (var label in sliders) {
const curr = sliders[label];
const x = UI.GetValue.apply(null, curr.x), y = UI.GetValue.apply(null, curr.y);
if (pos[0] >= x && pos[1] >= y && pos[0] <= x + 200 && pos[1] <= y + 35) {
UI.SetValue.apply(null, curr.x.concat(pos[0] - 100));
UI.SetValue.apply(null, curr.y.concat(pos[1] - 15));
break;
}
}
}
//endregion
//region Callbacks
const paint_thread = function() {
render_indicators();
handle_dragging();
}
const command_thread = function() {
update_choke_data();
update_misc_data();
}
const player_damage_handler = function() {
const me = Entity.GetLocalPlayer();
const userid = Entity.GetEntityFromUserID(Event.GetInt("userid"))
const attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
if (me == attacker && me != userid) {
const dmg = Event.GetInt("dmg_health");
const hp = Event.GetInt("health");
script.hurt_logs.unshift({
name: Entity.GetName(userid),
dmg: dmg,
dead: hp <= 0,
anim_time: 0
});
if (script.hurt_logs.length > 10)
script.hurt_logs.pop();
}
}
Cheat.RegisterCallback("Draw", "paint_thread");
Cheat.RegisterCallback("CreateMove", "command_thread");
Cheat.RegisterCallback("player_hurt", "player_damage_handler");
//endregion
//endregion

