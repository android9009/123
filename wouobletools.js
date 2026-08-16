UI.AddLabel("Wouobletools");
UI.AddLabel("Discord Antism0g#0004");
UI.AddLabel("--------------------------------------------");
UI.AddLabel("Wouoblerat LOGS");
UI.AddSliderInt("Pogness", 0, 10);
UI.AddCheckbox("Click if support dev");
const active = UI.AddCheckbox("Activate Miss Logs");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");


   //https://www.onetap.com/threads/p100-miss-logger.27580/ used as base credit to him
//Edited my wouoblerat#0004 dm maybe i add color option idk
var target = -1;
var shots_fired = 0;
var hits = 0;
var lastUpdate = 0;
var logged = false;
var jumping = false;


function getValue(val) {
    return UI.GetValue.apply(null, val);
}

function rb_fire() {
    if (!getValue(active)) return;
    target = Event.GetInt("target_index");
    shots_fired++;
    logged = false;
    lastUpdate = Globals.Curtime();
    jumping = (Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_fFlags", "FL_ONGROUND") == 256) ? true : false;
}

function p_hurt() {
    if (!getValue(active)) return;
    hit = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    if (attacker == Entity.GetLocalPlayer() && hit == target) hits++;
}

function draw() {
    fonte = Render.AddFont("Segoe UI", 12, 300);
    x = Render.GetScreenSize()[0];
    y = Render.GetScreenSize()[1];
    if (!getValue(active)) return;
    if (shots_fired > hits && (Globals.Curtime() - lastUpdate > 0.05)) {
        if (Globals.Curtime() - lastUpdate > 1) {
            shots_fired = 0;
            hits = 0;
        }
        if (jumping) {
            Render.StringCustom(x / 2 + 2, y / 2 + 4, 1, "Missed due to resolver", [0, 0, 0, 255], fonte);
            Render.StringCustom(x / 2, y / 2 + 2, 1, "Missed due to resolver", [255, 0, 0, 255], fonte);
            Sound.Play("ambient\\office\\button1");
        } else if (Globals.Curtime() - lastUpdate > 0.05) {
            Render.StringCustom(x / 2 + 2, y / 2 + 4, 1, "Missed due to resolver", [0, 0, 0, 255], fonte);
            Render.StringCustom(x / 2, y / 2 + 2, 1, "Missed due to resolver", [255, 0, 0, 255], fonte);
        }
        if (!logged) {
            if (jumping) {
                logged = true;
                Cheat.PrintColor([255, 46, 255, 300], "[");
                Cheat.PrintColor([255, 46, 255, 300], "onetap");
                Cheat.PrintColor([255, 46, 255, 300], "]");
                Cheat.PrintColor([255, 46, 255, 300], " - ");
                Cheat.PrintColor([255, 46, 255, 300], "Missed due to ");
                Cheat.PrintColor([255, 46, 255, 300], "resolver.\n");
                return;
            }
            logged = true;
            Cheat.PrintColor([255, 46, 255, 300], "[");
            Cheat.PrintColor([255, 46, 255, 300], "onetap");
            Cheat.PrintColor([255, 46, 255, 300], "]");
            Cheat.PrintColor([255, 46, 255, 300], " - ");
            Cheat.PrintColor([255, 46, 255, 300], "Missed due to ");
            Cheat.PrintColor([255, 46, 255, 300], "resolver.\n");
        }
    }
}

Cheat.RegisterCallback("ragebot_fire", "rb_fire");
Cheat.RegisterCallback("player_hurt", "p_hurt");
Cheat.RegisterCallback("Draw", "draw");

//AA  
UI.AddLabel("AA Settings")
UI.AddCheckbox("Jitter Randomizer");

var gt = Globals.Realtime();
var delay = 2; 
var max = 10;


function main(){
  if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Jitter Randomizer")){	
  if (Globals.Realtime() > gt + delay){
    gt = Globals.Realtime();
    var rand = Math.random() * max;
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", rand);
  }
}
}
Cheat.RegisterCallback("CreateMove", "main");

//Antibrute
UI.AddCheckbox("Antibrute");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
var shots = 0
    
function playerhurt(){
    if(Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer())
        UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter")
	
if(UI.GetValue("Antibrute"));{
        shots++
        if(!(shots % 4)) UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter")
    }
}
Cheat.RegisterCallback("player_hurt", "playerhurt")
//MIN DMG OVERRIDE
UI.AddCheckbox("Min damage override")
UI.AddLabel("Auto min dmg");
UI.AddHotkey("minimum damage (on key)");
UI.AddSliderInt("damage", 0, 100);
UI.AddSliderInt("damage on key", 0, 100)
UI.AddLabel("Scout min dmg");
UI.AddHotkey("minimum damage scout (on key)");
UI.AddSliderInt("damage scout", 0, 101);
UI.AddSliderInt("damage on key scout", 0, 101)
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");

function menu_cb(){
var enabled = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Min damage override");
 UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Auto min dmg", r_enabled);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "minimum damage (onkey)", r_enabled);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "damage", r_enabled);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "damage on key", r_enabled);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Scout min dmg", r_enabled);
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "minimum damage scout (on key)", r_enabled);
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "damage scout", r_enabled);
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "damage on key scout", r_enabled);
}
function minDamage() {
    if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "minimum damage (on key)")) {
        UI.SetValue("AUTOSNIPER", "Minimum damage", UI.GetValue("damage on key"))
    }
    else {
        UI.SetValue("AUTOSNIPER", "Minimum damage", UI.GetValue("damage"))
    }
}
Cheat.RegisterCallback('CreateMove', "minDamage");



function minDamagescout() {
    if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "minimum damage scout (on key)")) {
        UI.SetValue("SCOUT", "Minimum damage", UI.GetValue("damage on key scout"))
    }
    else {
        UI.SetValue("SCOUT", "Minimum damage", UI.GetValue("damage scout"))
    }
}
Cheat.RegisterCallback('CreateMove', "minDamagescout");

// Indicators
UI.AddLabel("--------------------------------------------")
UI.AddLabel("Indicators")
var drawLeft = 0,
    drawRight = 0,
    drawBack = 1; // Manual purpose

//Adding controls
UI.AddSliderInt("", 0, 0);
const desync = UI.AddColorPicker("LBY Mode Color");
const hide_shots = UI.AddColorPicker("Hide shots Color");
const selected_arrow = UI.AddColorPicker("Anti-Aim Side Color");
const lefth = UI.AddHotkey("[PS] Left Hotkey");
const backh = UI.AddHotkey("[PS] Back Hotkey");
const righth = UI.AddHotkey("[PS] Right Hotkey");
UI.AddSliderInt("", 0, 0);

var isLeftActive = UI.IsHotkeyActive.apply(null, lefth);
var isRightActive = UI.IsHotkeyActive.apply(null, righth);
var isBackActive = UI.IsHotkeyActive.apply(null, backh);


//Polygon points aka arrows
LPx = [(Render.GetScreenSize()[0] / 2) - 50, (Render.GetScreenSize()[1] / 2) + 10];
LPy = [(Render.GetScreenSize()[0] / 2) - 50, (Render.GetScreenSize()[1] / 2) - 10];
LPz = [(Render.GetScreenSize()[0] / 2) - 70, (Render.GetScreenSize()[1] / 2)];
RPx = [(Render.GetScreenSize()[0] / 2) + 50, (Render.GetScreenSize()[1] / 2) + 10];
RPy = [(Render.GetScreenSize()[0] / 2) + 50, (Render.GetScreenSize()[1] / 2) - 10];
RPz = [(Render.GetScreenSize()[0] / 2) + 70, (Render.GetScreenSize()[1] / 2)];
LPxx = [(Render.GetScreenSize()[0] / 2) - 49, (Render.GetScreenSize()[1] / 2) + 12];
LPyy = [(Render.GetScreenSize()[0] / 2) - 49, (Render.GetScreenSize()[1] / 2) - 12];
LPzz = [(Render.GetScreenSize()[0] / 2) - 73, (Render.GetScreenSize()[1] / 2)];
RPxx = [(Render.GetScreenSize()[0] / 2) + 49, (Render.GetScreenSize()[1] / 2) + 12];
RPyy = [(Render.GetScreenSize()[0] / 2) + 49, (Render.GetScreenSize()[1] / 2) - 12];
RPzz = [(Render.GetScreenSize()[0] / 2) + 73, (Render.GetScreenSize()[1] / 2)];
BPx = [(Render.GetScreenSize()[0] / 2) + 10, (Render.GetScreenSize()[1] / 2) + 50];
BPy = [(Render.GetScreenSize()[0] / 2) - 10, (Render.GetScreenSize()[1] / 2) + 50];
BPz = [(Render.GetScreenSize()[0] / 2), (Render.GetScreenSize()[1] / 2) + 70];
BPxx = [(Render.GetScreenSize()[0] / 2) + 12, (Render.GetScreenSize()[1] / 2) + 49];
BPyy = [(Render.GetScreenSize()[0] / 2) - 12, (Render.GetScreenSize()[1] / 2) + 49];
BPzz = [(Render.GetScreenSize()[0] / 2), (Render.GetScreenSize()[1] / 2) + 73];

function drawString()
{
    var isInverted = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
    var lby_mode = UI.GetValue("Anti-Aim", "Fake angles", "LBY mode");
    const alpha = Math.sin(Math.abs(-Math.PI + (Globals.Curtime() * (1 / .75)) % (Math.PI * 2))) * 255; //Pulse const

    textcp = UI.GetColor.apply(null, desync);
    hidecp = UI.GetColor.apply(null, hide_shots);
    selectedcp = UI.GetColor.apply(null, selected_arrow);

    isHideshots = UI.IsHotkeyActive("Rage", "Exploits", "Hide shots");
    isFakeduck = UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck");

    if(Entity.IsAlive(Entity.GetLocalPlayer()))
    {
        //Shadows
        Render.Polygon([LPxx, LPzz, LPyy], [0, 0, 0, 60]);
        Render.Polygon([RPyy, RPzz, RPxx], [0, 0, 0, 60]);
        Render.Polygon([BPyy, BPxx, BPzz], [0, 0, 0, 60]);

        Render.String(Render.GetScreenSize()[0] / 2 + 1, Render.GetScreenSize()[1] / 2 + 101, 1, isInverted ? "LEFT" : "RIGHT", [0, 0, 0, 255], 3);
        Render.String(Render.GetScreenSize()[0] / 2 + 1, Render.GetScreenSize()[1] / 2 + 111, 1, "DT", [0, 0, 0, 255], 3);
        Render.String(Render.GetScreenSize()[0] / 2 + 1, Render.GetScreenSize()[1] / 2 + 121, 1, isHideshots ? "HIDE" : "ANIM", [0, 0, 0, 255], 3);
        Render.String(Render.GetScreenSize()[0] / 2 + 1, Render.GetScreenSize()[1] / 2 + 131, 1, isFakeduck ? "DUCK" : "", [0, 0, 0, 0], 3);

        if (!UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim"))
        {
            switch (lby_mode)
            {
                case 0: Render.String(Render.GetScreenSize()[0] / 2 + 1, Render.GetScreenSize()[1] / 2 + 91, 1, "NORM", [0, 0, 0, 255], 3); break;
                case 1: Render.String(Render.GetScreenSize()[0] / 2 + 1, Render.GetScreenSize()[1] / 2 + 91, 1, "OPPOSITE", [0, 0, 0, 255], 3); break;
                case 2: Render.String(Render.GetScreenSize()[0] / 2 + 1, Render.GetScreenSize()[1] / 2 + 91, 1, "SWAY", [0, 0, 0, 255], 3); break;
            }
        }
        else
        {
            Render.String(Render.GetScreenSize()[0] / 2 + 1, Render.GetScreenSize()[1] / 2 + 91, 1, "BODY", [0, 0, 0, 255], 3);
        }

        var dtcol = [255, 255, 255, 255];
        if(Exploit.GetCharge() == 1 && UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))
            dtcol = [108, 195, 18, 255];
        else if (Exploit.GetCharge() < 1 && UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))
            dtcol = [255, 1, 1, 255];
		else
			dtcol = [255, 1, 1, 255];

        //indicators
        Render.String(Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2 + 100, 1, isInverted ? "LEFT" : "RIGHT", [255, 255, 255, 255], 3);
        Render.String(Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2 + 110, 1, "DT", dtcol, 3);
        Render.String(Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2 + 120, 1, isHideshots ? "HIDE" : "ANIM", isHideshots ? [hidecp[0], hidecp[1], hidecp[2], hidecp[3]] : [255, 153, 0, alpha], 3);
        Render.String(Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2 + 130, 1, isFakeduck ? "DUCK" : "", [255, 255, 255, 255], 3);


        if (!UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim"))
        {
            switch (lby_mode)
            {
                case 0: Render.String(Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2 + 90, 1, "NORM", [textcp[0], textcp[1], textcp[2], textcp[3]], 3); break;
                case 1: Render.String(Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2 + 90, 1, "OPPOSITE", [textcp[0], textcp[1], textcp[2], textcp[3]], 3); break;
                case 2: Render.String(Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2 + 90, 1, "SWAY", [textcp[0], textcp[1], textcp[2], textcp[3]], 3); break;
            }
        }
        else
        {
            Render.String(Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2 + 90, 1, "BODY", [108, 156, 53, 255], 3);
        }

        //DT Circle indicator
        angle = 90;
        max_angle = 360 * Exploit.GetCharge();
        if(Exploit.GetCharge() <= 0.23076923191547394)
            max_angle = 0;
        if (max_angle != 0 && max_angle != 360 && UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))
        {
            render_arc(Render.GetScreenSize()[0] / 2 + 14, Render.GetScreenSize()[1] / 2 + 114.6, 4.5, 2.5, -90, 360, 360, [0, 0, 0, 255]);
            render_arc(Render.GetScreenSize()[0] / 2 + 14, Render.GetScreenSize()[1] / 2 + 114.6, 4.5, 2.5, -90, max_angle, 360, [255, 1, 1, 255]);
        }

        //Manual indicator
        with(Render)
        {
            if (drawLeft)
                Polygon([LPx, LPz, LPy], [selectedcp[0], selectedcp[1], selectedcp[2], alpha]);
            else if (drawRight)
                Polygon([RPy, RPz, RPx], [selectedcp[0], selectedcp[1], selectedcp[2], alpha]);
            else if (drawBack)
                Polygon([BPy, BPx, BPz], [selectedcp[0], selectedcp[1], selectedcp[2], alpha]);
        }
    }
}

function onCreateMove()
{
    isLeftActive = UI.IsHotkeyActive.apply(null, lefth);
    isRightActive = UI.IsHotkeyActive.apply(null, righth);
    isBackActive = UI.IsHotkeyActive.apply(null, backh);

    if(isLeftActive)
    {
        drawLeft = 1;
        drawBack = 0;
        drawRight = 0;
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", -21);
        UI.SetValue("Anti-Aim", "Fake angles", "Hide real angle", false);
    }
    else if(isRightActive)
    {
        drawLeft = 0;
        drawBack = 0;
        drawRight = 1;
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 19);
        UI.SetValue("Anti-Aim", "Fake angles", "Hide real angle", false);
    }
    else if(isBackActive)
    {
        drawLeft = 0;
        drawBack = 1;
        drawRight = 0;
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", -3);
        UI.SetValue("Anti-Aim", "Fake angles", "Hide real angle", false);
    }
}

//Minor
function render_arc(x, y, radius, radius_inner, start_angle, end_angle, segments, color)
{
    while(360 % segments != 0)
    {
        segments++;
    }

    segments = 360 / segments;
    for(var i = start_angle; i < start_angle + end_angle; i = i + segments)
    {
        var rad = i * Math.PI / 180;
        var rad2 = (i + segments) * Math.PI / 180;
        var rad_cos = Math.cos(rad);
        var rad_sin = Math.sin(rad);
        var rad2_cos = Math.cos(rad2);
        var rad2_sin = Math.sin(rad2);
        var x1_outer = x + rad_cos * radius;
        var y1_outer = y + rad_sin * radius;
        var x2_outer = x + rad2_cos * radius;
        var y2_outer = y + rad2_sin * radius;
        var x1_inner = x + rad_cos * radius_inner;
        var y1_inner = y + rad_sin * radius_inner;
        var x2_inner = x + rad2_cos * radius_inner;
        var y2_inner = y + rad2_sin * radius_inner;

        Render.Polygon([
            [x1_outer, y1_outer],
            [x2_outer, y2_outer],
            [x1_inner, y1_inner]
        ], color);
        Render.Polygon([
            [x1_inner, y1_inner],
            [x2_outer, y2_outer],
            [x2_inner, y2_inner]
        ], color);
    }
}

Cheat.RegisterCallback("Draw", "drawString");
Cheat.RegisterCallback("CreateMove", "onCreateMove");

UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");

// WATERMARK GIVEN TO ME BY FRIEND CREDITS: UNKNOWN

UI.AddCheckbox("Watermark")
UI.AddColorPicker("Watermark color")
UI.SetColor("Script items", "watermark Color", [255, 0, 0, 255]);
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");

function watermark() {
    const ping = Math.floor(Global.Latency() * 1000 / 1.5);
    const fps = Math.floor(1 / Global.Frametime());
    var today = new Date();
    var datetime = today.getHours() + ":" + today.getMinutes() + ":" + (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds());
    var tickrate = Global.Tickrate()
    var username = Cheat.GetUsername();
    var ip = World.GetServerString();
    var watermark_string = " Wouobletools [ADMIN] | " + username + " | " + fps + " | " + tickrate + " tick | " + ping + "ms";
    var colors = UI.GetColor("Script items", "Watermark color") 
    var watermark_font = Render.AddFont("Arial", 9, 150);
    var screensize = Render.GetScreenSize();
    var string_size = Render.TextSizeCustom(watermark_string, watermark_font);

    if (UI.GetValue("Script items", "Watermark")) {
        Render.FilledRect(screensize[0] * 0.99 - string_size[0], 9.5, string_size[0] + 10, 23, [0, 0, 0, 240]);
        Render.StringCustom(screensize[0] * 0.99 - string_size[0] + 5, 13, 0, watermark_string, colors, watermark_font);
		Render.FilledRect(screensize[0] * 0.99 - string_size[0], 10, string_size[0] + 10, 1, [125, 137, 238, 234]);
    }
}

Cheat.RegisterCallback("Draw", "watermark");


//Doubletap   //https://www.onetap.com/threads/release-fast-dt-recharge.16281/
      
UI.AddLabel("--------------------------------------------")
UI.AddLabel("Doubletap")
UI.AddSliderInt("Tolerance", 0, 8);
UI.AddSliderInt("Shift", 0, 16);
UI.AddSliderInt("Shift amount", 8, 14)
UI.AddSliderInt("Tolerance", 1, 8)
UI.AddSliderInt("Double tap tolerance", 0, 3);
UI.AddCheckbox("Fast recharge")
UI.AddSliderInt("Recharge time", 0, 64)
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");
UI.AddLabel(" ");

function _FrameNetUpdateStart( )
{
    Exploit.OverrideTolerance(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Tolerance"));
    Exploit.OverrideShift(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Shift"));
}


function can_shift_shot(ticks_to_shift) {
    var me = Entity.GetLocalPlayer();
    var wpn = Entity.GetWeapon(me);

    if (me == null || wpn == null)
        return false;

    var tickbase = Entity.GetProp(me, "CCSPlayer", "m_nTickBase");
    var curtime = Globals.TickInterval() * (tickbase-ticks_to_shift)

    if (curtime < Entity.GetProp(me, "CCSPlayer", "m_flNextAttack"))
        return false;

    if (curtime < Entity.GetProp(wpn, "CBaseCombatWeapon", "m_flNextPrimaryAttack"))
        return false;

    return true;
}

function _TBC_CREATE_MOVE() {
    var is_charged = Exploit.GetCharge()
    var reserve = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Double tap tolerance")

    Exploit[(is_charged != 1 ? "Enable" : "Disable") + "Recharge"]()

    if (can_shift_shot(14) && is_charged != 1) {
        Exploit.DisableRecharge();
        Exploit.Recharge()
    }

    Exploit.OverrideTolerance(reserve);
    Exploit.OverrideShift(14-reserve);
}

function _TBC_UNLOAD() {
    Exploit.EnableRecharge();
}



var last_shot_tick = 0
var in_recharge = false
var shot = false
var was_not_dt = false

function weapon_fire() {
    if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) {
        last_shot_tick = Globals.Tickcount()
        shot = true
    }
}
function cm() {
    
    Exploit.OverrideShift(UI.GetValue("Script items", "Shift amount"))
    Exploit.OverrideTolerance(UI.GetValue("Script items", "Tolerance"))
    var dt = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap") && UI.GetValue("Rage", "GENERAL", "Exploits", "Doubletap")
    var hs = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots") && UI.GetValue("Rage", "GENERAL", "Exploits", "Hide shots")
    if(!UI.GetValue("Script items", "Fast recharge") || (hs && !dt)) {
        Exploit.EnableRecharge()
        return
    }
    Exploit.DisableRecharge()
    var charge = Exploit.GetCharge()
    if (charge != 1) {
        if (UI.GetValue("Anti-Aim", "Extra", "Fake duck") || 
            !dt)
        {
            was_not_dt = true
            return
        }
        if (Globals.Tickcount() - last_shot_tick > UI.GetValue("Script items", "Recharge time") && shot) {
            in_recharge = true
            shot = false
        }
        if(was_not_dt)
        {
            was_not_dt = false
            in_recharge = true
        }
    }
    if (in_recharge) {
        Exploit.Recharge()
        if (charge == 1) {
            in_recharge = false
        }
    }
}
function unload() {
    Exploit.EnableRecharge()
    Exploit.OverrideShift(12)
    Exploit.OverrideTolerance(2)
}
function round_start() {
    last_shot_tick = 0
    in_recharge = true
}
Cheat.RegisterCallback("round_start", "round_start")
Cheat.RegisterCallback("Unload", "unload")
Cheat.RegisterCallback("CreateMove", "cm")
Cheat.RegisterCallback("weapon_fire", "weapon_fire")
Cheat.RegisterCallback("CreateMove", "_TBC_CREATE_MOVE");
Cheat.RegisterCallback("Unload", "_TBC_UNLOAD");
Cheat.RegisterCallback("FRAME_NET_UPDATE_START", "_FrameNetUpdateStart");



//CLANTAG
UI.AddLabel("--------------------------------------------")
UI.AddLabel("Clantag(sorta broken)")
UI.AddCheckbox("Clantag Enable");
function cltag(){
    if(UI.GetValue("Script items", "Clantag Enable")){
        Local.SetClanTag("wouobletools")
	}
}
Cheat.RegisterCallback("Draw", "cltag")

// crash
function crsh(){
	if(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Click if support dev"))
	Cheat.ExecuteCommand("quit");
}
Cheat.RegisterCallback("Draw", "crsh");