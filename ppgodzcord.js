UI.AddLabel( "          |   ppgodzcord   |          " );
UI.AddLabel( "______________________________________" );
UI.AddLabel( "    " );
UI.AddLabel( "             |   Anti-aim   | " );
UI.AddCheckbox("Enable");
UI.AddCheckbox("Adjust AA");
UI.AddHotkey("Anti-Aimbot Side Switch");
UI.AddCheckbox("Adjust Lag");
function get_velocity() {
    velocity = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_vecVelocity[0]");
    speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
    return speed;
}
function rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var death_angles = [];
var wish = { 
    real: 0,
    fake: 0,
    lby: 0,
    side: 0,
    limit: 0
};
var local = {
    real: 0,
    fake: 0,
    duck_amount: 0,
    shifting: false,
    in_air: false
};
var globals = {
    tick_count: 0,
    cur_time: 0,
    debug: true
}
function update() {
    globals.tick_count = Globals.Tickcount();
    globals.cur_time = Globals.Curtime();
    local.real = Math.floor(Local.GetRealYaw());
    local.fake = Math.floor(Local.GetFakeYaw());
    local.duck_amount = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_flDuckAmount");
}
function set_wish_angles() {
    AntiAim.SetOverride(1);
    AntiAim.SetRealOffset(wish.real);
    AntiAim.SetFakeOffset(wish.fake);
    AntiAim.SetLBYOffset(wish.lby);
}
function handle_hotkeys() {
    wish.side = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Anti-Aimbot Side Switch") ? 1 : 0;
    local.shifting = Input.IsKeyPressed(0x10) ? true : false;// ensure you use misc->accurate walk
    local.in_air = Input.IsKeyPressed(0x20) ? true : false; // ?\_(?)_/?
}
function adjust_antiaim() {
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Adjust AA"))
        return;
    
    if (local.shifting && get_velocity() > 1.11) {
        wish.lby = -140;
        wish.real = globals.tick_count % 2 ? rand_int(-55, -22) : rand_int(22, 55);
    }
    else {
        if (wish.side == 0) {
            wish.lby = 120;
            wish.real = globals.tick_count % 12 ? wish.real : wish.real - 11;
            if (wish.real <= -55)
                wish.real = 32;
            if (wish.real == 21)
                wish.real = -33;
        }
        else if (wish.side == 1) {
            wish.lby = -120;
            wish.real = globals.tick_count % 12 ? wish.real : wish.real + 11;           
            if (wish.real >= 55)
                wish.real = -32;
            if (wish.real == -21)
                wish.real = 33;
        }
    }
    set_wish_angles();
}
function adjust_lag() {
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Adjust Lag"))
        return;
    if (local.in_air) {
        distance_per_tick = get_velocity() * Globals.TickInterval();
        choked_ticks = Math.ceil(64.0 / distance_per_tick);
        wish.limit = Math.min(choked_ticks, 16);
    } else {
        wish.limit = rand_int(1, 9);
    }
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", wish.limit);
}
function player_death() {
    death_angles.push(wish.real);
}
function create_move() {
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Enable"))
        return;
    update();
    handle_hotkeys();
    adjust_antiaim();
    adjust_lag();
}
function draw() {
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Enable") || !globals.debug)
        return;
}
Cheat.RegisterCallback("CreateMove", "create_move");
Cheat.RegisterCallback("Draw", "draw");
Cheat.RegisterCallback("player_death", "player_death");

UI.AddLabel( "  " );
UI.AddLabel( "______________________________________" );
UI.AddLabel( "  " );
UI.AddLabel( "            |   Double-tap   | " );

UI.AddSliderInt("Double tap speed", 0, 3);

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
    var reserve = UI.GetValue("Misc", "JAVASCRIPT", "Double tap speed")

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

Cheat.RegisterCallback("CreateMove", "_TBC_CREATE_MOVE");
Cheat.RegisterCallback("Unload", "_TBC_UNLOAD");


function get_icon(a) {
    var letter = ""
    switch (a) {
        case "desert eagle":
            letter = "a"
            break
        case "dual berettas":
            letter = "b"
            break
        case "five seven":
            letter = "c"
            break
        case "glock 18":
            letter = "d"
            break
        case "ak 47":
            letter = "e"
            break
        case "aug":
            letter = "f"
            break
        case "awp":
            letter = "g"
            break
        case "famas":
            letter = "h"
            break
        case "m249":
            letter = "i"
            break
        case "g3sg1":
            letter = "j"
            break
        case "galil ar":
            letter = "k"
            break
        case "m4a4":
            letter = "l"
            break
        case "m4a1 s":
            letter = "m"
            break
        case "mac 10":
            letter = "n"
            break
        case "p2000":
            letter = "o"
            break
        case "mp5 sd":
            letter = "p"
            break
        case "ump 45":
            letter = "q"
            break
        case "xm1014":
            letter = "r"
            break
        case "pp bizon":
            letter = "s"
            break
        case "mag 7":
            letter = "t"
            break
        case "negev":
            letter = "u"
            break
        case "sawed off":
            letter = "v"
            break
        case "tec 9":
            letter = "w"
            break
        case "zeus x27":
            letter = "x"
            break
        case "p250":
            letter = "y"
            break
        case "mp7":
            letter = "z"
            break
        case "mp9":
            letter = "A"
            break
        case "nova":
            letter = "B"
            break
        case "p90":
            letter = "C"
            break
        case "scar 20":
            letter = "D"
            break
        case "sg 553":
            letter = "E"
            break
        case "ssg 08":
            letter = "F"
            break
        case "knife":
            letter = "G"
            break
        case "flashbang":
            letter = "H"
            break
        case "high explosive grenade":
            letter = "I"
            break
        case "smoke grenade":
            letter = "J"
            break
        case "molotov":
            letter = "K"
            break
        case "decoy grenade":
            letter = "L"
            break
        case "incendiary grenade":
            letter = "M"
            break
        case "c4 explosive":
            letter = "N"
            break
        case "usp s":
            letter = "P"
            break
        case "cz75 auto":
            letter = "Q"
            break
        case "r8 revolver":
            letter = "R"
            break
        case "bayonet":
            letter = "V"
            break
        case "flip knife":
            letter = "W"
            break
        case "gut knife":
            letter = "X"
            break
        case "karambit":
            letter = "Y"
            break
        case "m9 bayonet":
            letter = "Z"
            break
        case "falchion knife":
            letter = "1"
            break
        case "bowie knife":
            letter = "2"
            break
        case "butterfly knife":
            letter = "3"
            break
        case "shadow daggers":
            letter = "4"
            break
        case "ursus knife":
            letter = "5"
            break
        case "navaja knife":
            letter = "6"
            break
        case "stiletto knife":
            letter = "7"
            break
        case "skeleton knife":
            letter = "8"
            break
        case "huntsman knife":
            letter = "0"
            break
        case "talon knife":
            letter = "8"
            break
        case "classic knife":
            letter = "25"
            break
        case "paracord knife":
            letter = "Z"
            break
        case "survival knife":
            letter = "Z"
            break
        case "nomad knife":
            letter = "Z"
            break
        default:
            letter = ""
            break
    }
    return letter
}

UI.AddSliderInt("Tickbase_x", 0, Global.GetScreenSize()[0]);
UI.AddSliderInt("Tickbase_y", 0, Global.GetScreenSize()[1]);

function in_bounds(vec, x, y, x2, y2) {
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}
var fa = 0;
var sa = 0;

function main_dt() {
    if (!World.GetServerString()) return;

    const x = UI.GetValue("Misc", "JAVASCRIPT", "Tickbase_x"),
        y = UI.GetValue("Misc", "JAVASCRIPT", "Tickbase_y");

    localplayer_index = Entity.GetLocalPlayer();
    localplayer_weapon = Entity.GetWeapon(localplayer_index);
    weapon_name = Entity.GetName(localplayer_weapon);
    g_Local_classname = Entity.GetClassName(localplayer_weapon);
    var nextattack = Entity.GetProp(localplayer_weapon, "CBaseCombatWeapon", "m_flNextPrimaryAttack");
    var CanShoot = false;
    if (nextattack <= Globals.Curtime()) {
        CanShoot = true;
    }

    var frames = 8 * Globals.Frametime();

    var font = Render.AddFont("Verdana", 7, 100);
    var fontbullet = Render.AddFont("bullet", 18, 100);
    if (CanShoot && Exploit.GetCharge() == 1 && UI.IsHotkeyActive("Rage", "Exploits", "Doubletap")) {
        var text = "DT [ppgodzcord] | tickbase(v): 16";
        var color = [89, 119, 239, 255];
    } else if (CanShoot && Exploit.GetCharge() == 1 && UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {
        var text = "DT [ppgodzcord] | tickbase(v): 7";
        var color = [89, 119, 239, 255];
    } else {
        var text = "DT [ppgodzcord] | tickbase(v): 0";
        var color = [89, 89, 89, 255];
    }
    var w = Render.TextSizeCustom(text, font)[0] + 8;

    Render.FilledRect(x, y, w, 2, color);
    Render.FilledRect(x, y + 2, w, 18, [17, 17, 17, 60]);
    Render.StringCustom(x + 5, y + 5, 0, text, [0, 0, 0, 180], font);
    Render.StringCustom(x + 4, y + 4, 0, text, [255, 255, 255, 255], font);

    Render.String(x + 4, y + 22, 0, get_icon(weapon_name), [255, 255, 255, 255], 5);
    if ((g_Local_classname == "CKnife" || g_Local_classname == "CWeaponSSG08" || g_Local_classname == "CWeaponAWP" || weapon_name == "r8 revolver" || g_Local_classname == "CHEGrenade" || g_Local_classname == "CMolotovGrenade" || g_Local_classname == "CIncendiaryGrenade" || g_Local_classname == "CFlashbang" || g_Local_classname == "CSmokeGrenade" || g_Local_classname == "CDecoyGrenade" || g_Local_classname == "CWeaponTaser" || g_Local_classname == "CC4")) {
        //return
    } else {
        if (CanShoot) {
            fa = Math.min(fa + frames, 1);
            Render.StringCustom(x + 10 + Render.TextSize(get_icon(weapon_name), 5)[0], y + 18, 0, "A", [255, 255, 255, fa * 255], fontbullet);
        } else {
            fa = 0;
        }
        if (CanShoot && Exploit.GetCharge() == 1 && UI.IsHotkeyActive("Rage", "Exploits", "Doubletap")) {
            sa = Math.min(sa + frames, 1);
            Render.StringCustom(x + 30 + Render.TextSize(get_icon(weapon_name), 5)[0], y + 18, 0, "A", [255, 255, 255, sa * 255], fontbullet);
        } else {
            sa = 0;
        }
    }


    if (Global.IsKeyPressed(1) && UI.IsMenuOpen()) {
        const mouse_pos = Global.GetCursorPosition();
        if (in_bounds(mouse_pos, x, y, x + w, y + 30)) {
            UI.SetValue("Misc", "JAVASCRIPT", "Tickbase_x", mouse_pos[0] - w / 2);
            UI.SetValue("Misc", "JAVASCRIPT", "Tickbase_y", mouse_pos[1] - 20);
        }
    }
}
Global.RegisterCallback("Draw", "main_dt");

UI.AddLabel( "  " );
UI.AddLabel( "______________________________________" );
UI.AddLabel( "  " );
UI.AddLabel( "                  |   Info   | " );
 
var username = "user";
UI.AddColorPicker("Watermark");
UI.AddCheckbox("Rainbow bar");
var color = UI.GetColor("Misc", "JAVASCRIPT", "Watermark");
if (color[3] == 0) {
    UI.SetColor("Misc", "JAVASCRIPT", "Watermark", [89, 119, 239, 255]);
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
function draw() {
    if(!World.GetServerString()) return;
    
    var today = new Date();
    var hours1 = today.getHours();
    var minutes1 = today.getMinutes();
    var seconds1 = today.getSeconds();
    var hours = hours1 <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":";
    var minutes = minutes1 <= 9 ? "0" + today.getMinutes() + ":" : today.getMinutes() + ":";
    var seconds = seconds1 <= 9 ? "0" + today.getSeconds() : today.getSeconds()    ;
    
    color = UI.GetColor("Misc", "JAVASCRIPT", "Watermark");
    var font = Render.AddFont( "Verdana", 7, 400);
    var text = " ppgodzcord | " +username+ " | delay: " +Math.round(Global.Latency() * 1000).toString()+ "ms | " +Globals.Tickrate().toString()+ "tick | " + hours + minutes + seconds;
    var h = 18;
    var w = Render.TextSizeCustom(text, font)[0] + 8;
    var x = Global.GetScreenSize()[0];
    var y = 10;
    x = x - w - 10;
    
    Render.FilledRect(x, y, w, 2, [color[0], color[1], color[2], color[3]]);
    Render.FilledRect(x, y+2, w, h, [17, 17, 17, 60]);
    
    Render.StringCustom(x+4, y + 4, 0, text, [255,255,255,255], font);
    
    if (UI.GetValue("Misc", "JAVASCRIPT", "Rainbow bar")) {
        var colors = HSVtoRGB(Global.Realtime() * 0.1, 1, 1);
        Render.GradientRect(0, 0, Global.GetScreenSize()[0]/2, 2, 1, [colors.g, colors.b, colors.r, 255], [colors.r, colors.g, colors.b, 255]);
        Render.GradientRect(Global.GetScreenSize()[0]/2, 0, Global.GetScreenSize()[0]/2, 2, 1, [colors.r, colors.g, colors.b, 255], [colors.b, colors.r, colors.g, 255]);
        Render.GradientRect(0, 2, Global.GetScreenSize()[0]/2, 2, 1, [colors.g, colors.b, colors.r, 150], [colors.r, colors.g, colors.b, 150]);
        Render.GradientRect(Global.GetScreenSize()[0]/2, 2, Global.GetScreenSize()[0]/2, 2, 1, [colors.r, colors.g, colors.b, 150], [colors.b, colors.r, colors.g, 150]);
    }
}
Cheat.RegisterCallback("Draw", "draw");

//region api
const global_print = Global.Print, global_print_chat = Global.PrintChat, global_print_color = Global.PrintColor, global_register_callback = Global.RegisterCallback, global_execute_command = Global.ExecuteCommand, global_frame_stage = Global.FrameStage, global_tickcount = Global.Tickcount, global_tickrate = Global.Tickrate, global_tick_interval = Global.TickInterval, global_curtime = Global.Curtime, global_realtime = Global.Realtime, global_frametime = Global.Frametime, global_latency = Global.Latency, global_get_view_angles = Global.GetViewAngles, global_set_view_angles = Global.SetViewAngles, global_get_map_name = Global.GetMapName, global_is_key_pressed = Global.IsKeyPressed, global_get_screen_size = Global.GetScreenSize, global_get_cursor_position = Global.GetCursorPosition, global_play_sound = Global.PlaySound, global_play_microphone = Global.PlayMicrophone, global_stop_microphone = Global.StopMicrophone, global_get_username = Global.GetUsername, global_set_clan_tag = Global.SetClanTag, globals_tickcount = Globals.Tickcount, globals_tickrate = Globals.Tickrate, globals_tick_interval = Globals.TickInterval, globals_curtime = Globals.Curtime, globals_realtime = Globals.Realtime, globals_frametime = Globals.Frametime, sound_play = Sound.Play, sound_play_microphone = Sound.PlayMicrophone, sound_stop_microphone = Sound.StopMicrophone, cheat_get_username = Cheat.GetUsername, cheat_register_callback = cheat_register_callback = new Proxy(Cheat.RegisterCallback, { apply: function(_, _, args) { switch(args[0]) { case 'paint': Cheat.RegisterCallback('Draw', args[1]); break; case 'create_move': Cheat.RegisterCallback('CreateMove', args[1]); break; case 'fsn': Cheat.RegisterCallback('FrameStageNotify', args[1]); break; default: Cheat.RegisterCallback(args[0], args[1]); break; } } }), cheat_execute_command = Cheat.ExecuteCommand, cheat_frame_stage = Cheat.FrameStage, cheat_print = Cheat.Print, cheat_print_chat = Cheat.PrintChat, cheat_print_color = Cheat.PrintColor, local_latency = Local.Latency, local_get_view_angles = Local.GetViewAngles, local_set_view_angles = Local.SetViewAngles, local_set_clan_tag = Local.SetClanTag, local_get_real_yaw = Local.GetRealYaw, local_get_fake_yaw = Local.GetFakeYaw, local_get_spread = Local.GetSpread, local_get_inaccuracy = Local.GetInaccuracy, world_get_map_name = World.GetMapName, world_get_server_string = World.GetServerString, input_get_cursor_position = Input.GetCursorPosition, input_is_key_pressed = Input.IsKeyPressed, render_string = Render.String, render_text_size = Render.TextSize, render_line = Render.Line, render_rect = Render.Rect, render_filled_rect = Render.FilledRect, render_gradient_rect = Render.GradientRect, render_circle = Render.Circle, render_filled_circle = Render.FilledCircle, render_polygon = Render.Polygon, render_world_to_screen = Render.WorldToScreen, render_add_font = Render.AddFont, render_find_font = Render.FindFont, render_string_custom = Render.StringCustom, render_textured_rect = Render.TexturedRect, render_add_texture = Render.AddTexture, render_text_size_custom = Render.TextSizeCustom, render_get_screen_size = Render.GetScreenSize, ui_get_value = UI.GetValue, ui_set_value = UI.SetValue, ui_add_checkbox = UI.AddCheckbox, ui_add_slider_int = UI.AddSliderInt, ui_add_slider_float = UI.AddSliderFloat, ui_add_hotkey = UI.AddHotkey, ui_add_label = UI.AddLabel, ui_add_dropdown = UI.AddDropdown, ui_add_multi_dropdown = UI.AddMultiDropdown, ui_add_color_picker = UI.AddColorPicker, ui_add_textbox = UI.AddTextbox, ui_set_enabled = UI.SetEnabled, ui_get_string = UI.GetString, ui_get_color = UI.GetColor, ui_set_color = UI.SetColor, ui_is_hotkey_active = UI.IsHotkeyActive, ui_toggle_hotkey = UI.ToggleHotkey, ui_is_menu_open = UI.IsMenuOpen, convar_get_int = Convar.GetInt, convar_set_int = Convar.SetInt, convar_get_float = Convar.GetFloat, convar_set_float = Convar.SetFloat, convar_get_string = Convar.GetString, convar_set_string = Convar.SetString, event_get_int = Event.GetInt, event_get_float = Event.GetFloat, event_get_string = Event.GetString, entity_get_entities = Entity.GetEntities, entity_get_entities_by_class_i_d = Entity.GetEntitiesByClassID, entity_get_players = Entity.GetPlayers, entity_get_enemies = Entity.GetEnemies, entity_get_teammates = Entity.GetTeammates, entity_get_local_player = Entity.GetLocalPlayer, entity_get_game_rules_proxy = Entity.GetGameRulesProxy, entity_get_entity_from_user_i_d = Entity.GetEntityFromUserID, entity_is_teammate = Entity.IsTeammate, entity_is_enemy = Entity.IsEnemy, entity_is_bot = Entity.IsBot, entity_is_local_player = Entity.IsLocalPlayer, entity_is_valid = Entity.IsValid, entity_is_alive = Entity.IsAlive, entity_is_dormant = Entity.IsDormant, entity_get_class_i_d = Entity.GetClassID, entity_get_class_name = Entity.GetClassName, entity_get_name = Entity.GetName, entity_get_weapon = Entity.GetWeapon, entity_get_weapons = Entity.GetWeapons, entity_get_render_origin = Entity.GetRenderOrigin, entity_get_prop = Entity.GetProp, entity_set_prop = Entity.SetProp, entity_get_hitbox_position = Entity.GetHitboxPosition, entity_get_eye_position = Entity.GetEyePosition, trace_line = Trace.Line, trace_bullet = Trace.Bullet, usercmd_set_movement = UserCMD.SetMovement, usercmd_get_movement = UserCMD.GetMovement, usercmd_set_angles = UserCMD.SetAngles, usercmd_force_jump = UserCMD.ForceJump, usercmd_force_crouch = UserCMD.ForceCrouch, antiaim_get_override = AntiAim.GetOverride, antiaim_set_override = AntiAim.SetOverride, antiaim_set_real_offset = AntiAim.SetRealOffset, antiaim_set_fake_offset = AntiAim.SetFakeOffset, antiaim_set_l_b_y_offset = AntiAim.SetLBYOffset, exploit_get_charge = Exploit.GetCharge, exploit_recharge = Exploit.Recharge, exploit_disable_recharge = Exploit.DisableRecharge, exploit_enable_recharge = Exploit.EnableRecharge, ragebot_override_minimum_damage = Ragebot.OverrideMinimumDamage, ragebot_override_hitchance = Ragebot.OverrideHitchance, ragebot_override_accuracy_boost = Ragebot.OverrideAccuracyBoost, ragebot_override_multipoint_scale = Ragebot.OverrideMultipointScale, ragebot_force_safety = Ragebot.ForceSafety;
//endregion

var screen_size = global_get_screen_size();
var bombsite, player_name, site = "";
var plating_time = 3.125;
var planting, planted, ignore_dropped, ignore_self = false;
var r = 108, g = 195, b = 18;
var rr = 108, gr = 195, br = 18;
var bomb_beginwhen = null;
const planting_height = 0;
const defuse_height = 0;

//Math functions
function lerp_pos(x1, y1, z1, x2, y2, z2, percentage)
{
    var x = (x2 - x1) + percentage + x1;
    var y = (y2 - y1) + percentage + y1;
    var z = (z2 - z1) + percentage + z1;
    return [x, y, z];
}
function distance3d(x1,y1,z1,x2,y2,z2)
{
    return Math.sqrt((x2-x1)^2+(y2-y1)^2+(z2-z1)^2);
}
function getDefuseTime(bomb_entity)
{
    var defuse_time = entity_get_prop(bomb_entity, "CPlantedC4", "m_flDefuseCountDown") - globals_curtime();
    return Math.max(0, defuse_time);
}
function getBombTime(bomb_entity)
{
    var bomb_time = entity_get_prop(bomb_entity, "CPlantedC4", "m_flC4Blow") - globals_curtime();
    return Math.max(0, bomb_time);
}
function getBombSite(bomb_entity)
{
    return bomb_site = entity_get_prop(bomb_entity, "CPlantedC4", "m_nBombSite") == 1 ? "B" : "A";
}
function getDistanceTo(a, b)
{
    var lx = a[0];
    var ly = a[1];
    var lz = a[2];
    var tx = b[0];
    var ty = b[1];
    var tz = b[2];
    var dx = lx - tx;
    var dy = ly - ty;
    var dz = lz - tz;
 
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
function getDamage(damage, armor_value)
{
    if (armor_value > 0)
    {
        var new_value = damage * .5;
        var armor = (damage - new_value) * .5;
        if (armor > armor_value)
        {
            armor = armor_value * (1 / .5);
            new_value = damage - armor;
        }
        damage = new_value;
    }
    return damage;
}
function getBombDamage(player_entity, bomb_entity)
{
    var player_pos = entity_get_render_origin(player_entity);
    var bomb_pos = entity_get_render_origin(bomb_entity);
    var distance = getDistanceTo(player_pos, bomb_pos);
    const a = 450.7;
    const b = 75.68;
    const c = 789.2;
    const d = ((distance - b) / c);
    var damage = a * Math.exp(-d * d);
    var armor_value = entity_get_prop(player_entity, "CCSPlayerResource", "m_iArmor");

    return Math.max(Math.ceil(getDamage(damage, armor_value)), 0)
}

function draw_defuse_bar()
{
    var y = screen_size[1];
    const c4 = Entity.GetEntitiesByClassID(128)[0];
    var defused_at = entity_get_prop(c4, "CPlantedC4", "m_flDefuseCountDown");
    var defuse_length = entity_get_prop(c4, "CPlantedC4", "m_flDefuseLength");
    const timer = (Entity.GetProp(c4, "CPlantedC4", "m_flC4Blow") - Globals.Curtime()).toFixed(3);
    if (defuse_length > timer)
    {
        return;
    }
    defuse_height = Math.min(y, y * (globals_curtime() - (defused_at - defuse_length)) / defuse_length);
    render_filled_rect(15, 0, 15, render_get_screen_size()[1], [32,32,32,150]);
    render_filled_rect(15, y - defuse_height, 15, y, [79, 163, 227, 255]);
}

function on_paint()
{
    var x = screen_size[0];
    var y = screen_size[1];
    const bomb_entity = entity_get_entities_by_class_i_d(128);
    var bomb = null;

    const c4 = Entity.GetEntitiesByClassID(128)[0];
    if (planting)
    {
        if (player_name != entity_get_name(entity_get_local_player()))
        {
            render_string(17, 2, 0, bombsite + " - " + player_name, [0, 0, 0, 255], 4)
            render_string(15, 0, 0, bombsite + " - " + player_name, [r, g, b, 255], 4)
        }
        planting_height =  Math.min(y, y * (globals_curtime() - bomb_beginwhen) / plating_time);
        render_filled_rect(0, 0, 15, render_get_screen_size()[1], [32,32,32,150]);
        render_filled_rect(0, y - planting_height, 15, y, [rr,gr,br,255]);
    }
    if (planted)
    {
        if (bomb_entity != null)
        {
            bomb = bomb_entity[1];
            var local_player = entity_get_local_player();
            var bomb_time_max = convar_get_float("mp_c4timer");
            const bomb_damage = getBombDamage(local_player, c4);
            var player = entity_get_prop(c4, "CPlantedC4", "m_hBombDefuser");
            if (player == 1)
            {
                draw_defuse_bar();
            }
        }
        const timer = (Entity.GetProp(c4, "CPlantedC4", "m_flC4Blow") - Globals.Curtime()).toFixed(1);
        const planted_text = getBombSite(c4) + " - " + timer.toString() + "s";
        const height = Math.min(y, y * timer/bomb_time_max);

        render_filled_rect(0, 0, 15, render_get_screen_size()[1], [32,32,32,150]);
        render_filled_rect(0, y - height, 15, y, [rr,gr,br,255]);


        render_string(17, 2, 0, planted_text, [0, 0, 0, 255], 4)
        render_string(15, 0, 0, planted_text, [r, g, b, 255], 4)
        if (timer <= 10)
        {
            r = 230,g = 235,b = 145;
        }
        if (timer <= 5)
        {
            r = 255, g = 1, b = 1;
            rr = 255, gr = 1, br = 1;
        }
        if (timer <= 0)
        {
            r = 108, g = 195, b = 18;
            rr = 108, gr = 195, br = 18;
            planted = false;
            planting = false;
            return;
        }
        if (bomb_damage >= 3)
        {
            const damage_text= entity_get_prop(local_player, "CBasePlayer", "m_iHealth") <= bomb_damage ? "FATAL" : "-" + bomb_damage.toString() + " HP";
            const damage_color = entity_get_prop(local_player, "CBasePlayer", "m_iHealth") <= bomb_damage ? [255,1,1,255] : [230,235,145, 255];
            render_string(17, 30, 0, damage_text, [0, 0, 0, 255], 4);
            render_string(15, 28, 0, damage_text, damage_color, 4);
        }
    }
}
const a_site_array = [425, 333, 79, 262, 154, 94, 281, 204, 92, 152];
const b_site_array = [426, 422, 504, 314, 405, 536, 282, 205, 97, 153];
function beginPlant()
{
    var userid = event_get_int("userid");
    site = event_get_int("site");
    if (!userid) return;
    cheat_print("[onetap] Planting on bombsite id: " + event_get_int("site")+"\n");
    if (a_site_array.indexOf(site) > -1)
    {
        site = "A";
    }
    else if (b_site_array.indexOf(site) > -1)
    {
        site = "B";
    }
    else
    {
        return;
    }

    var userid_name = entity_get_entity_from_user_i_d(userid);
    var userid_name_final = entity_get_name(userid_name);

    planting = true;
    bombsite = site;
    player_name = userid_name_final;
    bomb_beginwhen = globals_curtime();
}
function abortPlant()
{
    planting = false;
    planted = false;
    planting_height = 0;
    defuse_height = 0;
}
function bombPlanted()
{
    planting = false;
    planted = true;
}
function reset()
{
    planting = false;
    planted = false;
    planting_height = 0;
    defuse_height = 0;
    site = "";
}
cheat_register_callback("bomb_beginplant", "beginPlant");
cheat_register_callback("bomb_abortplant", "abortPlant");
cheat_register_callback("bomb_planted", "bombPlanted");
cheat_register_callback("bomb_defused", "reset");
cheat_register_callback("round_start", "reset");
cheat_register_callback("Draw", "on_paint");

const x1 = UI.AddSliderInt("Hotkeys_x", 0, Global.GetScreenSize()[0]);
const y1 = UI.AddSliderInt("Hotkeys_y", 0, Global.GetScreenSize()[1]);
UI.AddColorPicker("Hotkeys");
var colorhotkeys = UI.GetColor("Misc", "JAVASCRIPT", "Hotkeys");
if (colorhotkeys[3] == 0) {
    UI.SetColor("Misc", "JAVASCRIPT", "Hotkeys", [89, 119, 239, 3]);
}
var alpha = 0;
var maxwidth = 0;
var swalpha = 0;
var fdalpha = 0;
var apalpha = 0;
var aialpha = 0;
var spalpha = 0;
var fbalpha = 0;
var dtalpha = 0;
var hsalpha = 0;
var doalpha = 0;
var textalpha = 0;
var h = new Array();

function in_bounds(vec, x, y, x2, y2) {
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

function main_hotkeys() {
        if (!World.GetServerString()) return;
        const x = UI.GetValue("Misc", "JAVASCRIPT", "Hotkeys_x"),
            y = UI.GetValue("Misc", "JAVASCRIPT", "Hotkeys_y");
        colorhotkeys = UI.GetColor("Misc", "JAVASCRIPT", "Hotkeys");
        var font = Render.AddFont("Verdana", 7, 100);
        var frames = 8 * Globals.Frametime();
        var width = 75;
        var maxwidth = 0;
        if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
            swalpha = Math.min(swalpha + frames, 1);
        } else {
            swalpha = swalpha - frames;
            if (swalpha < 0) swalpha = 0;
            if (swalpha == 0) {
                h.splice(h.indexOf("Slow walk"));
            }
        }

        if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
            fdalpha = Math.min(fdalpha + frames, 1);
        } else {
            fdalpha = fdalpha - frames;
            if (fdalpha < 0) fdalpha = 0;
            if (fdalpha == 0) {
                h.splice(h.indexOf("Duck peek assist"));
            }
        }

        if (UI.IsHotkeyActive("Misc", "GENERAL", "Movement", "Auto peek")) {
            apalpha = Math.min(apalpha + frames, 1);
        } else {
            apalpha = apalpha - frames;
            if (apalpha < 0) apalpha = 0;
            if (apalpha == 0) {
                h.splice(h.indexOf("Auto peek"));
            }
        }

        if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
            aialpha = Math.min(aialpha + frames, 1);
        } else {
            aialpha = aialpha - frames;
            if (aialpha < 0) aialpha = 0;
            if (aialpha == 0) {
                h.splice(h.indexOf("Anti-aim inverter"));
            }
        }

        if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
            aialpha = Math.min(aialpha + frames, 1);
        } else {
            aialpha = aialpha - frames;
            if (aialpha < 0) aialpha = 0;
            if (aialpha == 0) {
                h.splice(h.indexOf("Inverter"));
            }
        }

        if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point")) {
            spalpha = Math.min(spalpha + frames, 1);
        } else {
            spalpha = spalpha - frames;
            if (spalpha < 0) spalpha = 0;
            if (spalpha == 0) {
                h.splice(h.indexOf("Safe point override"));
            }
        }

        if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim")) {
            fbalpha = Math.min(fbalpha + frames, 1);
        } else {
            fbalpha = fbalpha - frames;
            if (fbalpha < 0) fbalpha = 0;
            if (fbalpha == 0) {
                h.splice(h.indexOf("Force body aim"));
            }
        }

        if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap")) {
            dtalpha = Math.min(dtalpha + frames, 1);
        } else {
            dtalpha = dtalpha - frames;
            if (dtalpha < 0) dtalpha = 0;
            if (dtalpha == 0) {
                h.splice(h.indexOf("Double tap"));
            }
        }

        if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {
            hsalpha = Math.min(hsalpha + frames, 1);
        } else {
            hsalpha = hsalpha - frames;
            if (hsalpha < 0) hsalpha = 0;
            if (hsalpha == 0) {
                h.splice(h.indexOf("Hide shots"));
            }
        }

        if (UI.IsHotkeyActive("Damage override")) {
            doalpha = Math.min(doalpha + frames, 1);
        } else {
            doalpha = doalpha - frames;
            if (doalpha < 0) doalpha = 0;
            if (doalpha == 0) {
                h.splice(h.indexOf("Damage override"));
            }
        }

        if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
            if (h.indexOf("Slow walk") == -1)
                h.push("Slow walk")
        }
        if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
            if (h.indexOf("Duck peek assist") == -1)
                h.push("Duck peek assist")
        }
        if (UI.IsHotkeyActive("Misc", "GENERAL", "Movement", "Auto peek")) {
            if (h.indexOf("Auto peek") == -1)
                h.push("Auto peek")
        }
        if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
            if (h.indexOf("Anti-aim inverter") == -1)
                h.push("Anti-aim inverter")
        }
        if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point")) {
            if (h.indexOf("Safe point override") == -1)
                h.push("Safe point override")
        }
        if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim")) {
            if (h.indexOf("Force body aim") == -1)
                h.push("Force body aim")
        }
        if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap")) {
            if (h.indexOf("Double tap") == -1)
                h.push("Double tap")
        }
        if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {
            if (h.indexOf("Hide shots") == -1)
                h.push("Hide shots")
        }
        if (UI.IsHotkeyActive("Damage override")) {
            if (h.indexOf("Damage override") == -1)
                h.push("Damage override")
        }

        if (h.length > 0) {
            alpha = Math.min(alpha + frames, 1);
        } else {
            alpha = alpha - frames;
            if (alpha < 0) alpha = 0;
        }
        for (i = 0; i < h.length; i++) {
            if (Render.TextSizeCustom(h[i], font)[0] > maxwidth) {
                maxwidth = Render.TextSizeCustom(h[i], font)[0];
            }
        }
        if (maxwidth == 0) maxwidth = 50;
        width = width + maxwidth;
        if (alpha > 0) {
                Render.FilledRect(x, y + 3, width, 2, [colorhotkeys[0], colorhotkeys[1], colorhotkeys[2], alpha * 255]);
                Render.FilledRect(x, y + 5, width, 18, [17, 17, 17, alpha * 255]);
                Render.StringCustom(x + width / 2 - (Render.TextSizeCustom("keybinds", font)[0] / 2) + 2, y + 9, 0, "keybinds", [0, 0, 0, alpha * 255 / 1.3], font);
                Render.StringCustom(x + width / 2 - (Render.TextSizeCustom("keybinds", font)[0] / 2) + 1, y + 8, 0, "keybinds", [255, 255, 255, alpha * 255], font);
                //Render.FilledRect(x, y + 23, width, 18 * h.length, [17, 17, 17, Math.min(colorhotkeys[3], alpha * 255)]);
                for (i = 0; i < h.length; i++) {
                    switch (h[i]) {
                        case 'Slow walk':
                            Render.FilledRect(x, y + 23 + 18 * i, width, 18, [17, 17, 17, Math.min(colorhotkeys[3], Math.min(swalpha * 60, colorhotkeys[3]))]);
                            Render.StringCustom(x + 3, y + 26 + 18 * i, 0, h[i], [0, 0, 0, swalpha * 255 / 1.3], font);
                            Render.StringCustom(x + 2, y + 26 + 18 * i, 0, h[i], [255, 255, 255, swalpha * 255], font);

                            Render.StringCustom(x - 3 + width - Render.TextSizeCustom("[holding]", font)[0], y + 26 + 18 * i, 0, "[holding]", [0, 0, 0, swalpha * 255 / 1.3], font);
                            Render.StringCustom(x - 2 + width - Render.TextSizeCustom("[holding]", font)[0], y + 26 + 18 * i, 0, "[holding]", [255, 255, 255, swalpha * 255], font);
                            break;
                        case 'Duck peek assist':
                            Render.FilledRect(x, y + 23 + 18 * i, width, 18, [17, 17, 17, Math.min(colorhotkeys[3], Math.min(fdalpha * 60, colorhotkeys[3]))]);
                            Render.StringCustom(x + 3, y + 26 + 18 * i, 0, h[i], [0, 0, 0, fdalpha * 255 / 1.3], font);
                            Render.StringCustom(x + 2, y + 26 + 18 * i, 0, h[i], [255, 255, 255, fdalpha * 255], font);

                            Render.StringCustom(x - 3 + width - Render.TextSizeCustom("[holding]", font)[0], y + 26 + 18 * i, 0, "[holding]", [0, 0, 0, fdalpha * 255 / 1.3], font);
                            Render.StringCustom(x - 2 + width - Render.TextSizeCustom("[holding]", font)[0], y + 26 + 18 * i, 0, "[holding]", [255, 255, 255, fdalpha * 255], font);
                            break;
                        case 'Auto peek':
                            Render.FilledRect(x, y + 23 + 18 * i, width, 18, [17, 17, 17, Math.min(colorhotkeys[3], Math.min(apalpha * 60, colorhotkeys[3]))]);
                            Render.StringCustom(x + 3, y + 26 + 18 * i, 0, h[i], [0, 0, 0, apalpha * 255 / 1.3], font);
                            Render.StringCustom(x + 2, y + 26 + 18 * i, 0, h[i], [255, 255, 255, apalpha * 255], font);

                            Render.StringCustom(x - 3 + width - Render.TextSizeCustom("[toggled]", font)[0], y + 26 + 18 * i, 0, "[toggled]", [0, 0, 0, apalpha * 255 / 1.3], font);
                            Render.StringCustom(x - 2 + width - Render.TextSizeCustom("[toggled]", font)[0], y + 26 + 18 * i, 0, "[toggled]", [255, 255, 255, apalpha * 255], font);
                            break;
                        case 'Anti-aim inverter':
                            Render.FilledRect(x, y + 23 + 18 * i, width, 18, [17, 17, 17, Math.min(colorhotkeys[3], Math.min(aialpha * 60, colorhotkeys[3]))]);
                            Render.StringCustom(x + 3, y + 26 + 18 * i, 0, h[i], [0, 0, 0, aialpha * 255 / 1.3], font);
                            Render.StringCustom(x + 2, y + 26 + 18 * i, 0, h[i], [255, 255, 255, aialpha * 255], font);

                            Render.StringCustom(x - 3 + width - Render.TextSizeCustom("[toggled]", font)[0], y + 26 + 18 * i, 0, "[toggled]", [0, 0, 0, aialpha * 255 / 1.3], font);
                            Render.StringCustom(x - 2 + width - Render.TextSizeCustom("[toggled]", font)[0], y + 26 + 18 * i, 0, "[toggled]", [255, 255, 255, aialpha * 255], font);
                            break;
                        case 'Safe point override':
                            Render.FilledRect(x, y + 23 + 18 * i, width, 18, [17, 17, 17, Math.min(colorhotkeys[3], Math.min(spalpha * 60, colorhotkeys[3]))]);
                            Render.StringCustom(x + 3, y + 26 + 18 * i, 0, h[i], [0, 0, 0, spalpha * 255 / 1.3], font);
                            Render.StringCustom(x + 2, y + 26 + 18 * i, 0, h[i], [255, 255, 255, spalpha * 255], font);

                            Render.StringCustom(x - 3 + width - Render.TextSizeCustom("[toggled]", font)[0], y + 26 + 18 * i, 0, "[toggled]", [0, 0, 0, spalpha * 255 / 1.3], font);
                            Render.StringCustom(x - 2 + width - Render.TextSizeCustom("[toggled]", font)[0], y + 26 + 18 * i, 0, "[toggled]", [255, 255, 255, spalpha * 255], font);
                            break;
                        case 'Force body aim':
                            Render.FilledRect(x, y + 23 + 18 * i, width, 18, [17, 17, 17, Math.min(colorhotkeys[3], Math.min(fbalpha * 60, colorhotkeys[3]))]);
                            Render.StringCustom(x + 3, y + 26 + 18 * i, 0, h[i], [0, 0, 0, fbalpha * 255 / 1.3], font);
                            Render.StringCustom(x + 2, y + 26 + 18 * i, 0, h[i], [255, 255, 255, fbalpha * 255], font);

                            Render.StringCustom(x - 3 + width - Render.TextSizeCustom("[holding]", font)[0], y + 26 + 18 * i, 0, "[holding]", [0, 0, 0, fbalpha * 255 / 1.3], font);
                            Render.StringCustom(x - 2 + width - Render.TextSizeCustom("[holding]", font)[0], y + 26 + 18 * i, 0, "[holding]", [255, 255, 255, fbalpha * 255], font);
                            break;
                        case 'Double tap':
                            Render.FilledRect(x, y + 23 + 18 * i, width, 18, [17, 17, 17, Math.min(colorhotkeys[3], Math.min(dtalpha * 60, colorhotkeys[3]))]);
                            Render.StringCustom(x + 3, y + 26 + 18 * i, 0, h[i], [0, 0, 0, dtalpha * 255 / 1.3], font);
                            Render.StringCustom(x + 2, y + 26 + 18 * i, 0, h[i], [255, 255, 255, dtalpha * 255], font);

                            Render.StringCustom(x - 3 + width - Render.TextSizeCustom("[toggled]", font)[0], y + 26 + 18 * i, 0, "[toggled]", [0, 0, 0, dtalpha * 255 / 1.3], font);
                            Render.StringCustom(x - 2 + width - Render.TextSizeCustom("[toggled]", font)[0], y + 26 + 18 * i, 0, "[toggled]", [255, 255, 255, dtalpha * 255], font);
                            break;
                        case 'Hide shots':
                            Render.FilledRect(x, y + 23 + 18 * i, width, 18, [17, 17, 17, Math.min(colorhotkeys[3], Math.min(hsalpha * 60, colorhotkeys[3]))]);
                            Render.StringCustom(x + 3, y + 26 + 18 * i, 0, h[i], [0, 0, 0, hsalpha * 255 / 1.3], font);
                            Render.StringCustom(x + 2, y + 26 + 18 * i, 0, h[i], [255, 255, 255, hsalpha * 255], font);

                            Render.StringCustom(x - 3 + width - Render.TextSizeCustom("[toggled]", font)[0], y + 26 + 18 * i, 0, "[toggled]", [0, 0, 0, hsalpha * 255 / 1.3], font);
                            Render.StringCustom(x - 2 + width - Render.TextSizeCustom("[toggled]", font)[0], y + 26 + 18 * i, 0, "[toggled]", [255, 255, 255, hsalpha * 255], font);
                            break;
                        case 'Damage override':
                            Render.FilledRect(x, y + 23 + 18 * i, width, 18, [17, 17, 17, Math.min(colorhotkeys[3], Math.min(doalpha * 60, colorhotkeys[3]))]);
                            Render.StringCustom(x + 3, y + 26 + 18 * i, 0, h[i], [0, 0, 0, doalpha * 255 / 1.3], font);
                            Render.StringCustom(x + 2, y + 26 + 18 * i, 0, h[i], [255, 255, 255, doalpha * 255], font);

                            Render.StringCustom(x - 3 + width - Render.TextSizeCustom("[holding]", font)[0], y + 26 + 18 * i, 0, "[holding]", [0, 0, 0, doalpha * 255 / 1.3], font);
                            Render.StringCustom(x - 2 + width - Render.TextSizeCustom("[holding]", font)[0], y + 26 + 18 * i, 0, "[holding]", [255, 255, 255, doalpha * 255], font);
                            break;
                    }

                }
        }
        if (Global.IsKeyPressed(1) && UI.IsMenuOpen()) {
            const mouse_pos = Global.GetCursorPosition();
            if (in_bounds(mouse_pos, x, y, x + width, y + 30)) {
                UI.SetValue("Misc", "JAVASCRIPT", "Hotkeys_x", mouse_pos[0] - width / 2);
                UI.SetValue("Misc", "JAVASCRIPT", "Hotkeys_y", mouse_pos[1] - 20);
            }
        }
}
Global.RegisterCallback("Draw", "main_hotkeys")
//Anti-aims
UI.AddSliderInt("Antiaim_x", 0, Global.GetScreenSize()[0]);
UI.AddSliderInt("Antiaim_y", 0, Global.GetScreenSize()[1]);

function in_bounds(vec, x, y, x2, y2) {
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

function draw_arc(x, y, radius, start_angle, percent, thickness, color) {
        var precision = (2 * Math.PI) / 30;
        var step = Math.PI / 180;
        var inner = radius - thickness;
        var end_angle = (start_angle + percent) * step;
        var start_angle = (start_angle * Math.PI) / 180;

        for (; radius > inner; --radius) {
            for (var angle = start_angle; angle < end_angle; angle += precision) {
                var cx = Math.round(x + radius * Math.cos(angle));
                var cy = Math.round(y + radius * Math.sin(angle));

                var cx2 = Math.round(x + radius * Math.cos(angle + precision));
                var cy2 = Math.round(y + radius * Math.sin(angle + precision));

                Render.Line(cx, cy, cx2, cy2, color);
            }
        }
}

function main_aa() {
    if (!World.GetServerString()) return;

    const x = UI.GetValue("Misc", "JAVASCRIPT", "Antiaim_x"),
        y = UI.GetValue("Misc", "JAVASCRIPT", "Antiaim_y");

    var font = Render.AddFont("Verdana", 7, 100);
    var RealYaw = Local.GetRealYaw();
    var FakeYaw = Local.GetFakeYaw();
    var delta = Math.min(Math.abs(RealYaw - FakeYaw) / 2, 60).toFixed(1);
    var safety = Math.min(Math.round(1.7 * Math.abs(delta)), 100);
    if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
        var side = "<";
    } else {
        var side = ">";
    }
    var text = "    FAKE (" + delta.toString() + "  ) | safety: " + safety.toString() + "% | side: " + side;
    var w = Render.TextSizeCustom(text, font)[0] + 8;

    Render.FilledRect(x - w, y, w, 2, [89, 89 + (delta / 2), 89 + (delta / 0.4), 255]);
    Render.FilledRect(x - w, y + 2, w, 18, [17, 17, 17, 60]);
    Render.StringCustom(x + 5 - w, y + 5, 0, text, [0, 0, 0, 180], font);
    Render.StringCustom(x + 4 - w, y + 4, 0, text, [255, 255, 255, 255], font);
    Render.Circle(x + 18 - w + Render.TextSizeCustom("FAKE (" + delta.toString(), font)[0], y + 8, 1, [255, 255, 255, 255]);
    draw_arc(x + 7 - w, y + 10, 5, 0, delta * 6, 2, [89, 119, 239, 255]);
    if (Global.IsKeyPressed(1) && UI.IsMenuOpen()) {
        const mouse_pos = Global.GetCursorPosition();
        if (in_bounds(mouse_pos, x - w, y, x + w, y + 30)) {
            UI.SetValue("Misc", "JAVASCRIPT", "Antiaim_x", mouse_pos[0] + w / 2);
            UI.SetValue("Misc", "JAVASCRIPT", "Antiaim_y", mouse_pos[1] - 20);
        }
    }
}
Global.RegisterCallback("Draw", "main_aa");


UI.AddLabel( "  " );
UI.AddLabel( "______________________________________" );
UI.AddLabel( "  " );
UI.AddLabel( "              |   Auto-strafe   | " );

var a = UI.AddSliderInt("Turn speed",0, 500)
function d()
{
    UI.SetValue("Misc", "GENERAL", "Movement", "Turn speed", UI.GetValue.apply(null,a))
}
Cheat.RegisterCallback("Draw", "d")

UI.AddLabel( "  " );
UI.AddLabel( "______________________________________" );
UI.AddLabel( "  " );
UI.AddLabel( "                |   Manuals   | " );

UI.AddColorPicker("Selected arrow color");
UI.AddColorPicker("Selected fake arrow color");
UI.AddSliderFloat("manual arrow fade speed", 0, 1);
UI.AddHotkey( "Left Hotkey" );
UI.AddHotkey( "Back Hotkey" );
UI.AddHotkey( "Right Hotkey" );
UI.AddLabel( "  " );
UI.AddLabel( "______________________________________" );
UI.AddLabel( "  " );
UI.AddLabel( "            |   FAKE indicator   | " );
UI.AddSliderInt("Circle Radius", 10, 50);
UI.AddSliderInt("Arc Length", 0, 90);
UI.AddSliderInt("Arc Thickness", 0, 20);
UI.AddSliderInt("Arc Precision (Use less for more fps)", 20, 500);
UI.AddColorPicker("Circle Color");
UI.AddColorPicker("Real Color");
UI.AddColorPicker("Fake Color");
3
//indicator vars
var screen_size = Global.GetScreenSize();
var isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Left Hotkey" );
var isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Right Hotkey" );
var isBackActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Back Hotkey" );
var isInverted;
var drawLeft = 0;
var drawRight = 0;
var drawBack = 1;
//Polygon Points
LPx = [(screen_size[0] /2) - 43, (screen_size[1] /2) + 13];
LPy = [(screen_size[0] /2) - 43, (screen_size[1] /2) - 7];
LPz = [(screen_size[0] /2) - 63, (screen_size[1] /2) + 3];
RPx = [(screen_size[0] /2) + 42, (screen_size[1] /2) + 13];
RPy = [(screen_size[0] /2) + 42, (screen_size[1] /2) - 7];
RPz = [(screen_size[0] /2) + 62, (screen_size[1] /2) + 3];
LPxx = [(screen_size[0] /2) - 42, (screen_size[1] /2) + 14];
LPyy = [(screen_size[0] /2) - 42, (screen_size[1] /2) - 6];
LPzz = [(screen_size[0] /2) - 62, (screen_size[1] /2) + 4];
RPxx = [(screen_size[0] /2) + 42, (screen_size[1] /2) + 14];
RPyy = [(screen_size[0] /2) + 42, (screen_size[1] /2) - 6];
RPzz = [(screen_size[0] /2) + 62, (screen_size[1] /2) + 4];
BPx = [(screen_size[0] /2) + 9, (screen_size[1] /2) + 47];
BPy = [(screen_size[0] /2) - 11, (screen_size[1] /2) + 47];
BPz = [(screen_size[0] /2) - 1, (screen_size[1] /2) + 67];
BPxx = [(screen_size[0] /2) + 10, (screen_size[1] /2) + 48];
BPyy = [(screen_size[0] /2) - 10, (screen_size[1] /2) + 48];
BPzz = [(screen_size[0] /2), (screen_size[1] /2) + 68];
// here is the Polygon for fake 
FPLx = [(screen_size[0] /2) - 54, (screen_size[1] /2) + 32];
FPLy = [(screen_size[0] /2) - 30, (screen_size[1] /2) + 56];
FPLz = [(screen_size[0] /2) - 51, (screen_size[1] /2) + 53];
FPRx = [(screen_size[0] /2) + 54, (screen_size[1] /2) + 32];
FPRy = [(screen_size[0] /2) + 30, (screen_size[1] /2) + 56];
FPRz = [(screen_size[0] /2) + 51, (screen_size[1] /2) + 53];
FPLxx = [(screen_size[0] /2) - 56, (screen_size[1] /2) + 31];
FPLyy = [(screen_size[0] /2) - 32, (screen_size[1] /2) + 55];
FPLzz = [(screen_size[0] /2) - 53, (screen_size[1] /2) + 52];
FPRxx = [(screen_size[0] /2) + 53, (screen_size[1] /2) + 31];
FPRyy = [(screen_size[0] /2) + 29, (screen_size[1] /2) + 55];
FPRzz = [(screen_size[0] /2) + 50, (screen_size[1] /2) + 52];
 
username = Cheat.GetUsername();
//------------------Circle------------------------
function render_arc(x, y, radius, radius_inner, start_angle, end_angle, segments, color)
    {
        while(360 % segments != 0)
        {
            segments++;
        }
 
        segments = 360 / segments;
 
        for (var i = start_angle; i < start_angle + end_angle; i = i + segments)
        {   
 
            var rad = i * Math.PI / 180;
            var rad2 = (i + segments) * Math.PI / 180;
 
            var rad_cos = Math.cos(rad)
            var rad_sin = Math.sin(rad)
 
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
 
            Render.Polygon( [
                [ x1_outer, y1_outer ],
                [ x2_outer, y2_outer ],
                [ x1_inner, y1_inner ] ],
                color
            );
 
            Render.Polygon( [
                [ x1_inner, y1_inner ],
                [ x2_outer, y2_outer ],
                [ x2_inner, y2_inner ] ],
                color
            );
        }
    }
 
// Default 
UI.SetColor("Misc", "Selected arrow color", [36, 116, 181, 255]);
UI.SetColor("Misc", "Selected fake arrow color", [222, 120, 151, 255]);
function drawString()
{
    fadesp = UI.GetValue("Misc", "manual arrow fade speed");
    selectedcp = UI.GetColor("Misc", "JAVASCRIPT", "Selected arrow color");
    selected_red = selectedcp[0];
    selected_green = selectedcp[1];
    selected_blue = selectedcp[2];
    selected_alpha = selectedcp[3];
    selectedfcp = UI.GetColor("Misc", "JAVASCRIPT", "Selected fake arrow color");
    selectedf_r = selectedfcp[0];
    selectedf_g = selectedfcp[1];
    selectedf_b = selectedfcp[2];
    selectedf_al = selectedfcp[3];
    const alpha = Math.sin(Math.abs(-Math.PI + (Globals.Curtime() * (1 / fadesp)) % (Math.PI * 2))) * 255;
    const Falpha = Math.sin(Math.abs(-Math.PI + (Globals.Curtime() * (1 / .75)) % (Math.PI * 2))) * 255;
    const alphaa = Math.sin(Math.abs(-Math.PI + (Globals.Curtime() * (1 / .3)) % (Math.PI * 2))) * 255;
    isHideshots = UI.IsHotkeyActive("Rage", "Exploits", "Hide shots");
    isFakeduck = UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck");
    isDoubletap = UI.IsHotkeyActive("Rage", "Exploits", "Doubletap");
    isInverted = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter" );
    isBAIM = UI.IsHotkeyActive("Rage", "General", "Force body aim");
    isLbyMode = UI.GetValue("Anti-Aim", "Fake angles", "LBY mode");
    isDesyncMode = UI.GetValue("Anti-Aim", "Fake angles", "Fake desync");
    isOVRD = UI.IsHotkeyActive("Rage", "General", "Resolver override")
    localplayer_index = Entity.GetLocalPlayer( );
    localplayer_alive = Entity.IsAlive( localplayer_index );
    charge = Exploit.GetCharge();
    max_angle = 360*Exploit.GetCharge();
    center = Render.GetScreenSize();
    X = center[0] / 2
    Y = center[1] / 2
    limit = UI.GetValue("Anti-Aim", "Limit" );
    jitter = UI.GetValue("Anti-Aim", "Jitter" );
    tlimit = UI.GetValue("Anti-Aim", "Trigger limit");
    //Fake Indicator Plus
    var difference = Math.abs( Local.GetRealYaw( ) - Local.GetFakeYaw( ) );
    //Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +101, 1, "FAKE", [ 0, 0, 0, 0 ], 3 );
    //Render.String(screen_size[0] /2, screen_size[1] /2 +100, 1, "FAKE", [ difference * 255 / 58, 255 - ( difference * 255 / 58 ), 0 , 0], 3 )
    
    if (localplayer_alive == true){
    //Shadows
    Render.Polygon([LPxx, LPzz, LPyy], [0, 0, 0, 150] );
    Render.Polygon([RPyy, RPzz, RPxx], [0, 0, 0, 150] );
    Render.Polygon([BPyy, BPxx, BPzz], [0, 0, 0, 150] );
    Render.Polygon([FPLx, FPLy, FPLz], [0, 0, 0, 120] );
    Render.Polygon([FPRx, FPRz, FPRy], [0, 0, 0, 120] );
    Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +91, 1, isOVRD ? "OVERRIDING" : "#"+username+"#", isOVRD ? [ 0, 0, 0, 0 ] : [ 0, 0, 0, 0 ], 3 );
    Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +101, 1, isLbyMode ? "FAKE" : "NORM", [ 0, 0, 0, 0 ], 3 );
    Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +131, 1, isBAIM ? "BAIM" : "HITBOX", isBAIM ? [ 0, 0, 0, 0 ] : [ 0, 0, 0, 0 ], 3 );
    Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +141, 1, isHideshots ? "HIDE" : "ANIM", isHideshots ? [ 0, 0, 0, 0 ] : [ 0, 0, 0, 0 ], 3 );
    Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +151, 1, isFakeduck ? "DUCK" : "DUCK", isFakeduck ? [ 0, 0, 0, 0 ] : [ 0, 0, 0, 0 ], 3 );
    Render.String( 6, screen_size[1] - 344, 0,"   "+"FL: "+limit+" - "+jitter+" - "+tlimit.toString(), [0, 0, 0, 0], 4);  
    //indicators
    Render.String(screen_size[0] /2, screen_size[1] /2 +90, 1, isOVRD ? "OVERRIDING" : "#"+username+"#", isOVRD ? [ 241, 86, 66, 0   ] : [ 255, 255, 255 ,0 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +100, 1, isLbyMode ? "FAKE" : "NORM", [ 23, 190, 240, 0], 3 );
    Render.String( 5, screen_size[1] - 345, 0,"   "+"FL: "+limit+" - "+jitter+" - "+tlimit.toString(), [255, 255, 255, 0], 4);
    if (isDoubletap){
        if (charge >= 1){
    Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +121, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 0, 0, 0, 0 ] : [ 0, 0, 0, 0 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +120, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 65, 179, 73, 0 ] : [ 255, 0, 0, 0 ], 3 );}
    if (charge < 1){
        Render.String(screen_size[0] /2 -4, screen_size[1] /2 +121, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 0, 0, 0, 0 ] : [ 0, 0, 0, 0 ], 3 );
        Render.String(screen_size[0] /2 -5, screen_size[1] /2 +120, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 248, 223, 112, 0 ] : [ 255, 0, 0, 0 ], 3 );
        render_arc(X + 9, Y + 124, 5, 2.4, -90, 360, 360, [120, 120, 120, 0]);
        render_arc(X + 9, Y + 124, 5, 2.4, -90, max_angle, 360, [248, 223, 112, 0]);
    }
    }
    if (!isDoubletap){
    Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +121, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 0, 0, 0, 0 ] : [ 0, 0, 0, 0 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +120, 1, isDoubletap ? "DT" : "DT", isDoubletap ? [ 65, 179, 73, 0 ] : [ 255, 0, 0, 0 ], 3 );}
    Render.String(screen_size[0] /2, screen_size[1] /2 +130, 1, isBAIM ? "BAIM" : "HITBOX", isBAIM ? [ 0, 255, 255, 0 ] : [ 255, 255, 255, 0 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +140, 1, isHideshots ? "HIDE" : "ANIM", isHideshots ? [ 145, 120, 229, 0 ] : [ 255, 153, 0, 0 ], 3 );
    Render.String(screen_size[0] /2, screen_size[1] /2 +150, 1, isFakeduck ? "DUCK" : "DUCK", isFakeduck ? [ 255, 255, 255, 0 ] : [ 255, 0, 0, 0 ], 3 );
    //inverter indicators
    if(isDesyncMode == 0)
    {
        Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +111, 1, isInverted ? "LEFT" : "RIGHT", [ 0, 0, 0, 0 ], 3 );
        Render.String(screen_size[0] /2, screen_size[1] /2 +110, 1, isInverted ? "LEFT" : "RIGHT", [ 255, 255, 255, 0 ], 3 );
        if(isInverted){
        Render.Polygon([FPLxx, FPLyy, FPLzz], [selectedf_r, selectedf_g, selectedf_b, selectedf_al] );
        }else{
        Render.Polygon([FPRyy, FPRxx, FPRzz], [selectedf_r, selectedf_g, selectedf_b, selectedf_al] );
        }
    }
    else if(isDesyncMode == 1)
    {
        Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +111, 1, isInverted ? "RIGHT" : "LEFT", [ 0, 0, 0, 0 ]);
        Render.String(screen_size[0] /2, screen_size[1] /2 +110, 1, isInverted ? "RIGHT" : "LEFT", [ 255, 255, 255, 0 ], 3 );
        if(isInverted){
        Render.Polygon([FPRxx, FPRzz, FPRyy], [selectedf_r, selectedf_g, selectedf_b, selectedf_al] );
        }else{
        Render.Polygon([FPLxx, FPLyy, FPLzz], [selectedf_r, selectedf_g, selectedf_b, selectedf_al] );
        }
    }
    
    if(drawLeft)
    {
        Render.Polygon([LPx, LPz, LPy], [ selected_red, selected_green, selected_blue, alpha] );
    }
    else if(drawRight)
    {      
        Render.Polygon([RPy, RPz, RPx], [ selected_red, selected_green, selected_blue, alpha] );
    }
    else if(drawBack)
    {
        Render.Polygon([BPy, BPx, BPz], [ selected_red, selected_green, selected_blue, alpha] );
    }   
}}
function onCreateMove()
{
    isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Left Hotkey" );
    isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT",  "Right Hotkey" );
    isBackActive = UI.IsHotkeyActive("Misc", "JAVASCRIPT",  "Back Hotkey" );
    isFakeduck = UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck");
    if(isLeftActive)
    {  
        drawLeft = 1;
        drawBack = 0;
        drawRight = 0;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", -90 );
        UI.SetValue( "Anti-Aim", "Fake angles", "Hide real angle", false);
    }
    else if(isRightActive)
    {  
        drawLeft = 0;
        drawBack = 0;
        drawRight = 1;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 90 );
        UI.SetValue( "Anti-Aim", "Fake angles", "Hide real angle", false);
       
    }
        else if(isBackActive)
    {  
        drawLeft = 0;
        drawBack = 1;
        drawRight = 0;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
        UI.SetValue( "Anti-Aim", "Fake angles", "Hide real angle", true);
       
    }
}
 
//-------------------------hitlog--------------------------
hitboxes = [
  'generic',
  'head',
  'chest',
  'stomach',
  'left arm',
  'right arm',
  'left leg',
  'right leg',
  'body'
];
function getHitboxName(index) {
  return hitboxes[index] || 'Generic';
}
function hitlog()
{
    me = Entity.GetLocalPlayer();
    hitbox = Event.GetInt('hitgroup');
    target_damage = Event.GetInt("dmg_health");
    victim = Event.GetInt('userid');
    attacker = Event.GetInt('attacker');
    victimIndex = Entity.GetEntityFromUserID(victim);
    attackerIndex = Entity.GetEntityFromUserID(attacker);
    name = Entity.GetName(victimIndex);
    var namee = "ppgodzcord"
 
if( UI.GetValue ( "Misc", "JAVASCRIPT", "logs in chat" ) ){
if (me == attackerIndex && me != victimIndex) {
    Global.PrintChat("\x01[\x06" + namee + "\x01] \x04" + "\x01hurt \x04" + name + " \x01for \x04" + target_damage + " \x01in \x04" + getHitboxName(hitbox))
}
}
}
 
//-----------------------Draw Shooooooot-----------------------
var timee, delayy, delayyy, shotsfired;
//FIREEEEEEEEEEEEEEEEEEEEE!!!!!!!!!
function WEAPON_FIRE()
{
    iShotsFired = Event.GetInt("userid"); iShotsFired_index = Entity.GetEntityFromUserID(iShotsFired);
    
    if(Entity.GetLocalPlayer() == iShotsFired_index)
    {
        if(shotsfired == 0)
        {   
            timee = Globals.Curtime();
            delayy = timee+0.005;
            delayyy = timee+0.33
        }       
    }       
}
 
function DrawSHOOT()
{
    localplayer_index = Entity.GetLocalPlayer( );
    localplayer_alive = Entity.IsAlive( localplayer_index );
    curtime = Globals.Curtime();
    if (localplayer_alive == true){
        if (curtime <= delayyy){
        shotsfired = 1;
        Render.String(screen_size[0] /2 + 1, screen_size[1] /2 +81, 1, "ATTACKING", [ 0, 0, 0, 0 ], 3 );
        Render.String(screen_size[0] /2, screen_size[1] /2 +80, 1, "ATTACKING", [ 254, 209, 16, 0], 3 );
    }else{
        shotsfired = 0;
    }
}
}   
       
function getValue(name)
{
    var value = UI.GetValue(name);
 
    return value;
}
 
function Main()
{
    UI.AddCheckbox("logs in chat");
    Global.RegisterCallback("player_hurt", "hitlog");
    Global.RegisterCallback("weapon_fire", "WEAPON_FIRE");
    Global.RegisterCallback("Draw", "DrawSHOOT");   
    Global.RegisterCallback("Draw", "drawString");
    Global.RegisterCallback("CreateMove", "onCreateMove");
}
 
Main();
 
//--------------------FAKE indicator BY I don know, BUT thanks alot------------------------
 
// Default values //
UI.SetValue("Misc", "JAVASCRIPT", "Circle Radius", 37);
UI.SetValue("Misc", "JAVASCRIPT", "Arc Length", 30);
UI.SetValue("Misc", "JAVASCRIPT", "Arc Thickness", 2);
UI.SetValue("Misc", "JAVASCRIPT", "Arc Precision (Use less for more fps)", 250);
UI.SetColor("Misc", "JAVASCRIPT", "Circle Color", [0, 0, 0, 0]);
UI.SetColor("Misc", "JAVASCRIPT", "Real Color", [255, 0, 196, 0]);
UI.SetColor("Misc", "JAVASCRIPT", "Fake Color", [35, 254, 250, 0]);
 
// Settings //
var circle_radius       = UI.GetValue("Misc", "JAVASCRIPT", "Circle Radius");
var arc_length          = UI.GetValue("Misc", "JAVASCRIPT", "Arc Length");
var arc_thickness       = UI.GetValue("Misc", "JAVASCRIPT", "Arc Thickness");
var arc_precision       = UI.GetValue("Misc", "JAVASCRIPT", "Arc Precision (Use less for more fps)");
var circle_color        = UI.GetColor("Misc", "JAVASCRIPT", "Circle Color");
var real_color          = UI.GetColor("Misc", "JAVASCRIPT", "Real Color");
var fake_color          = UI.GetColor("Misc", "JAVASCRIPT", "Fake Color");
 
function update_settings()
{
    circle_radius       = UI.GetValue("Misc", "JAVASCRIPT", "Circle Radius");
    arc_length          = UI.GetValue("Misc", "JAVASCRIPT", "Arc Length");
    arc_thickness       = UI.GetValue("Misc", "JAVASCRIPT", "Arc Thickness");
    arc_precision       = UI.GetValue("Misc", "JAVASCRIPT", "Arc Precision (Use less for more fps)");
    circle_color        = UI.GetColor("Misc", "JAVASCRIPT", "Circle Color");
    real_color          = UI.GetColor("Misc", "JAVASCRIPT", "Real Color");
    fake_color          = UI.GetColor("Misc", "JAVASCRIPT", "Fake Color");
 
 
    if(arc_thickness > circle_radius)
        UI.SetValue("Misc", "JAVASCRIPT", "Arc Thickness", circle_radius);
}
 
function draw_circle(x, y, radius, thickness, color)
{
    var inner = radius - thickness;
 
    for(; radius > inner; --radius)
    {
        Render.Circle(x, y, radius, color);
    }
}
 
function draw_arc(x, y, radius, start_angle, percent, thickness, color)
{
    var precision   = (2 * Math.PI) / arc_precision;
    var step        = Math.PI / 180;
    var inner       = radius - thickness;
    var end_angle   = (start_angle + percent) * step;
    var start_angle = (start_angle * Math.PI) / 180;
 
    for(; radius > inner; --radius)
    {
        for(var angle = start_angle; angle < end_angle; angle += precision)
        {
            var cx = Math.round(x + radius * Math.cos(angle));
            var cy = Math.round(y + radius * Math.sin(angle));
 
            var cx2 = Math.round(x + radius * Math.cos(angle + precision));
            var cy2 = Math.round(y + radius * Math.sin(angle + precision));
 
            Render.Line(cx, cy, cx2, cy2, color);
        }
    }
}
 
function adjust_angle(angle)
{
    if(angle < 0)
    {
        angle = (90 + angle * (-1));
    }
    else if(angle > 0)
    {
        angle = (90 - angle);
    }
 
    return angle;
}
 
function circle_main()
{
    var local_player = Entity.GetLocalPlayer();
 
    if(!Entity.IsAlive(local_player))
        return;
 
    update_settings();
 
    var screen_size     = Render.GetScreenSize();
    var screen_middle_x = screen_size[0] * 0.5;
    var screen_middle_y = screen_size[1] * 0.5;
 
    var view_angles = Local.GetViewAngles();
 
    var real_yaw = Local.GetRealYaw();
    var fake_yaw = Local.GetFakeYaw();
    var view_yaw = view_angles[1] - 180;
 
    var real = adjust_angle(real_yaw - view_yaw);
    var fake = adjust_angle(fake_yaw - view_yaw);
 
    draw_circle(screen_middle_x, screen_middle_y, circle_radius, arc_thickness, circle_color);
    draw_arc(screen_middle_x, screen_middle_y, circle_radius, fake - (arc_length * 0.5), arc_length, arc_thickness, fake_color);
    draw_arc(screen_middle_x, screen_middle_y, circle_radius, real - (arc_length * 0.5), arc_length, arc_thickness, real_color);
    
    var text_offset = screen_middle_y + circle_radius;
    var text_spacing = screen_size[1] * 0.0185185185;
 
}
Cheat.RegisterCallback("Draw", "circle_main");
function display() {
 
    if(Global.GetMapName() == "")
        return;{
    }
    
    function isHeavyPistol(name)
{
    if (name == "r8 revolver" || name == "desert eagle")
    {
        return true
    }
}
    function isPistol(name)
{
    if(weapon_name == "p2000" || weapon_name == "tec9" || weapon_name == "glock 18" || weapon_name == "five seven" || weapon_name == "usp s" || name == "dual berettas" || name == "p250" || name == "cz75 auto")
    {
        return true
    }
}     
    function isAutoSniper(name)
{
    if(name == "scar 20" || weapon_name == "g3sg1")
    {
        return true
    }
}
    function isOthers(name)
{
    if(name == "m249" || weapon_name == "mag 7" || name == "nova" || name == "xm1014" || name == "negav" || name == "mp7" || name == "ump 45" || name == "P90" || name == "PP bizon" || weapon_name == "mac 10" || weapon_name == "ak 47" || weapon_name == "Galil AR" || weapon_name == "sawed off" || weapon_name == "SG 553" || name == "zeus x27" || name == "mp5 sd" || weapon_name == "mp9" || weapon_name == "famas" || weapon_name == "m4a4" || weapon_name == "m4a1 s" || weapon_name == "AUG")
    {
        return true
    }
}
 
    weapon_name =  Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    wep = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    var str = " "
    arroww = "              ->"
    if (Entity.IsValid(Entity.GetLocalPlayer()) && Entity.IsAlive(Entity.GetLocalPlayer()))
    {
        if (isPistol(wep))
        {
            str = ("   DMG        "+UI.GetValue("Rage","PISTOL", "Minimum damage"));
            
        }
        else if (isHeavyPistol(wep))
        {
            str = ("   DMG        "+UI.GetValue("Rage", "HEAVY PISTOL", "Minimum damage"));
            
        }
        else if(wep == "ssg 08")
        {
            str = ("   DMG        "+UI.GetValue("Rage", "SCOUT", "Minimum damage"));
            
        }
        else if(wep == "awp")
        {
            str = ("   DMG        "+UI.GetValue("Rage", "AWP", "Minimum damage"));
            
        }
        else if (isAutoSniper(wep))
        {
            str = ("   DMG        "+UI.GetValue("Rage", "AUTOSNIPER", "Minimum damage"));
            
        }
        else if (isOthers(wep))
            str = ("   DMG        "+UI.GetValue("Rage", "GENERAL", "Minimum damage"));
        
    }
    
    Render.String( 6, screen_size[1] - 397, 0, str+"", [0,0,0,255],4);
    Render.String( 6, screen_size[1] - 397, 0,"   DMG", [0,0,0,255],4);
    Render.String( 8, screen_size[1] - 398, 0,arroww+"", [0,0,0,255],4);
    Render.String( 5, screen_size[1] - 398, 0, str+"", [255, 255, 255, 255],4);
    Render.String( 5, screen_size[1] - 398, 0,"   DMG", [255, 255, 255, 255],4);
    Render.String( 7, screen_size[1] - 399, 0,arroww+"", [255, 255, 255, 255],4);
}
Cheat.RegisterCallback("Draw", "display");

UI.AddLabel( "  " );
UI.AddLabel( "______________________________________" );
UI.AddLabel( "  " );
UI.AddLabel( "            |   Trashtalk   | " );

UI.AddCheckbox("trashtalk");
const normal_killsays = ["а у вас походу умирать это семейное)", "нахуя пидораса убил?", "чао персик дозревай", "уважаемый в тюрьме вы будете водолазом",
    "говори буду плохо говорить буду сосать, буду плохо сосать буду пересасывать", "долбаеб иди башмачки в сундучок школьный собирай", "ботинок ебаный чо слетел", "братик маме привет передай",
    "не противник",
    "а ты че клоун???", "я обоссал тебя (", "ты че там отлетел то?",
    "упал хуета ебаная , но в боди забрал да похуй все равно упал",
    "*DEAD* ливай с хвх (", "до связи башмак",
    "нищета глупейшая играть учись", "опущен сын твари",
    "нищий улетел", "*DEAD* пофикси нищ", "сразу видно кфг иссуе мб конфиг у меня прикупишь ?",
    "животное аддон скачай а то падаешь", "оттарабанен армянская королева", "сука не позорься и ливни",
    "улетел тапочек ебаный", "единицей свалился фуфлыжник",
    "зачем ты играешь тут безмозглый", "иди кумыса попей очередняра",
    "откисай сочняра", "АХАХА ЕБАТЬ У ТЕБЯ ЧЕРЕПНАЯ КОРОБКА ПРЯМ КАК [XML-RPC] No-Spread 24/7 | aim_ag_texture_2 ONLY!",
    "на мыло и веревку то деньги есть????", "ИЩИ СЕБЯ НА pornoeb.cc/sochniki",
    "свежий кабанчик", "до связи на подскоке кабанчик", "скажи маме сухарики купить долбаеб", "ебать ты красиво на бутылку присел , тебе дать альт ?",
    "прости что без смазки)", "алло это скорая? тут такая ситуация пареню который упал нужна скорая)", "ало ты мапу лузаешь дура очнись",
    "тяжело с кряком????", "ЕБУЧЕСТЬ ВТОРОГО РАЗРЯДА ВЫДВИЖЕНЕЦ ОТКИС", "але а противники то где???", "ты по легиту играешь ?", "ХУЕПРЫГАЛО ТУСОВОЧНОЕ КУДА ПОЛЕТЕЛО", "ты куда жертва козьего аборта",
    "iq?", "·٠●•۩۞۩ОтДыХаЙ (ٿ) НуБяРа۩۞۩•●٠·", "ты то куда лезешь сын фантомного стационарного спец изолированого металлформовочного механизма", "╭∩╮( ⚆ ʖ ⚆)╭∩╮ ДоПрыГался(ت)ДрУжоЧеК"
];
    
const hs_killsays = ["держи зонтик ☂, тебя обоссали", "Держи ✈ и лети нахуй !", "слишком сочный для Djamic.technologies",
    "сьебался нахуй таракан усатый", "мать твою ебал", "нахуй ты упал иди вставай и на завод",
    "не по сезону шуршишь фраер",
    "ИЗИ ЧМО ЕБАНОЕ",
    "ливай блять не позорься",
    "AХАХ ПИДОР УПАЛ С ВАНВЕЯ ХАХАХА ОНЛИ БАИМ В БОДИ ПОТЕЕТ НА ФД АХА", "АХАХА УЛЕТЕЛ ЧМОШНИК",
    "1 МАТЬ ЖАЛЬ",
    "тебе права голоса не давали thirdworlder ебаный",
    "на завод иди",
    "не не он опять упал на конлени",
    "вставай заебал , завтра в школу", "гет гуд гет иди нахуй",
    "by SANCHEZj hvh boss",
    "ну нет почему он ложится когда я прохожу", "у тебя ник нейм адео?", "парень тебе ник придумать?",
    "такой тупой :(",
    "хватит получать хс ,лучше возьми свою руку и иди дрочи",
    "нет нет этот крякер такой смешной",
    "1 сын шлюхи",
    "1 мать твою ебал",
    "преобрети мой кфг клоун",
    "об кафель голову разбил?",
    "мать твою ебал",
    "хуесос дальше адайся ко мне",
    "ещё раз позови к себе на бекап",
    "не противник",
    "ник нейм дориан(",
    "iq ?",
    "упал = минус мать", "не пиши мне",
    "жаль конечно что против тебя играю, но куда деваться", "адиничкой упал", "сынок зачем тебе это ?",
    "давно в рот берёшь?", "мне можно", "ты меня так заебал , ливни уже",
    "ничему жизнь не учит (", "я не понял, ты такой жирный потомучто дошики каждый день жрешь?",
    "братка го я тебе бекап позову", "толстяк даже пройти спокойно не может"
];

function on_player_death()
{
    if(UI.GetValue("Misc", "trashtalk"))
    {
        const victim = Entity.GetEntityFromUserID(Event.GetInt("userid"));
        const attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
        const headshot = Event.GetInt("headshot") == 1;
        
        if(Entity.IsLocalPlayer(attacker) && attacker != victim)
        {
            const normal_say = normal_killsays[Math.floor(Math.random() * normal_killsays.length)];
            const hs_say = hs_killsays[Math.floor(Math.random() * hs_killsays.length)];
            
            if(headshot && Math.random() * 2 > 1) //gamer style randomizer
            {
                Cheat.ExecuteCommand("say " + hs_say);
                return;
            }
            Cheat.ExecuteCommand("say " + normal_say);
        }
    }
}

var killsay_amt = normal_killsays.length + hs_killsays.length;

Cheat.Print("trashtalk js loaded, killsay count: " + killsay_amt + "\n");
Cheat.RegisterCallback("player_death", "on_player_death");

UI.AddLabel( "  " );
UI.AddLabel( "______________________________________" );
UI.AddLabel( "  " );
UI.AddLabel( "            |   Aspectratio   | " );


UI.AddSliderFloat( "Aspect Ratio", 0.0, 5.0 );


function aspectratio( ) {
menu_val = UI.GetValue("Aspect Ratio");
string_menu_val = menu_val.toString();

Convar.SetString ("r_aspectratio", string_menu_val );
}

Cheat.RegisterCallback( "FrameStageNotify", "aspectratio" );

UI.AddLabel( "  " );
UI.AddLabel( "______________________________________" );
UI.AddLabel( "  " );
UI.AddLabel( "          |   Fast auto-buy   | " );


var run = false;
var estimate = 0;
var firstBuy = 0;
var alias = [
    ["Off"],
    ["awp"],
    ["ssg08"],
    ["scar20", "g3sg1"]
]

function roundEnded() {
    run = true;
    estimate = Globals.Curtime()+Convar.GetInt("mp_round_restart_delay");
    firstBuy = 0;
}

function purchase(index) {
    alias[index].forEach(function(v) { Cheat.ExecuteCommand("buy "+v); })
    run = false;
}

function onDraw() {
    run && Globals.Curtime()+(Local.Latency()/1000) >= estimate && purchase(UI.GetValue.apply(this, dropdown));
}

function purchased() {
    if (firstBuy == 0) firstBuy = Globals.Curtime()-estimate;
    if (!Entity.GetEntityFromUserID(Event.GetInt("userid")) || firstBuy == -1) return;

    Cheat.Print("The first item of the round was purchased at " + firstBuy + "s, you purchased at " + (Globals.Curtime()-estimate) + "s.\n");
    firstBuy = -1;
}

var dropdown = UI.AddDropdown("Fastest Autobuy", ["Off", "AWP", "Scout", "Auto"]);

Cheat.RegisterCallback("round_end", "roundEnded");
Cheat.RegisterCallback("Draw", "onDraw");
Cheat.RegisterCallback("item_purchase", "purchased");
UI.AddLabel( "" );
UI.AddLabel( "______________________________________" );
UI.AddLabel( "" );
function pHurt() {
    attackerEntity = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    localEntity = Entity.GetLocalPlayer();
    
    if (attackerEntity == localEntity) {
        victimName = Entity.GetName(Entity.GetEntityFromUserID(Event.GetInt("userid")));
        
        //Get hitgroup as a string
        
        hitboxName = hitgroupToHitbox(Event.GetInt("hitgroup"));
        
        damageDone = Event.GetInt("dmg_health");
        healthRemaining = Event.GetInt("health");
        
        hurtLogs.push([victimName, hitboxName, damageDone, healthRemaining, 0, 255, (Math.random() * (0.2 - 1.200) + 1.200).toFixed(4), Globals.Curtime()]);
    }
}

// [ victimName, hitboxName, damageDone, healthRemaining, curLength, opacity ];
hurtLogs = [ ];

function main() {
    Cheat.RegisterCallback("player_hurt", "pHurt");
    Cheat.RegisterCallback("Draw", "drawLogs");
    Cheat.RegisterCallback("Draw", "showOrHide");
}

typeSpeed = 0.05;
fadeOutSpeed = 2;
showDelayTime = typeSpeed + Globals.Curtime();
function showOrHide() {
    
    
    for (var i = 0; i < hurtLogs.length; i++) {
        hurtLogs[i][4]++;
        toSay = "Hit " + victimName + " in the " + hitboxName + " for " + damageDone + " damage (" + healthRemaining + " health remaining)";
        if(Globals.Curtime() - hurtLogs[i][7] < 2)
        {
            continue
        }
        hurtLogs[i][5] -= Globals.Frametime() * 500;
        
        if (hurtLogs[i][5] < 0) {
            hurtLogs.shift(i, 1);
        }
    }
}

function drawLogs() {
    
    textX = 10;
    textY = 10;
    textYIncrement = 15;
    
    textCol = [255, 255, 255];
    if (UI.GetValue("Misc", "JAVASCRIPT")) {
        rainbowCol = HSVtoRGB( Global.Realtime(), 1, 1 );
    }
    
    for (var i = 0; i < hurtLogs.length; i++) {
        currentLog = hurtLogs[i];
        
        victimName = currentLog[0];
        hitboxName = currentLog[1];
        damageDone = currentLog[2];
        healthRemaining = currentLog[3];

        consolasFont = Render.AddFont("Consolas", 10, 90);
        
        currentTextPos = textY + (textYIncrement * i);
        
        toSay = "Hit " + victimName + " in the " + hitboxName + " for " + damageDone + " damage (" + healthRemaining + " health remaining)";

        textCol = [89, 119, 239, 255];
        
        Render.StringCustom(textX + 1, currentTextPos + 1, 0, toSay, [0, 0, 0, hurtLogs[i][5]], consolasFont);
        Render.StringCustom(textX, currentTextPos, 0, toSay, [textCol[0], textCol[1], textCol[2], hurtLogs[i][5]], consolasFont);
    }
}

main();


function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}



function hitgroupToHitbox(hitgroup) {
    hitbox = "UNKNOWN";
    
    switch (hitgroup) {
        case 0:
        hitbox =  "head";
        break;
        case 1:
        hitbox =  "neck";
        break;
        case 2:
        hitbox =  "pelvis";
        break;
        case 3:
        hitbox =  "body";
        break;
        case 4:
        hitbox =  "chest";
        break;
        case 5:
        hitbox =  "chest";
        break;
        case 6:
        hitbox =  "upper chest";
        break;
        case 7:
        hitbox =  "left thigh";
        break;
        case 8:
        hitbox =  "right thigh";
        break;
        case 9:
        hitbox =  "left calf";
        break;
        case 10:
        hitbox =  "right calf";
        break;
        case 11:
        hitbox =  "left foot";
        break;
        case 12:
        hitbox =  "right foot";
        break;
        case 13:
        hitbox =  "left hand";
        break;
        case 14:
        hitbox =  "right hand";
        break;
        case 15:
        hitbox =  "left arm";
        break;
        case 16:
        hitbox =  "left forearm";
        break;
        case 17:
        hitbox =  "right arm";
        break;
        case 18:
        hitbox =  "right forearm";
    }
    return hitbox;
}




function HSVtoRGB(h, s, v)
{
    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6)
    {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}
UI.AddDropdown( "Clantag", [ "Disabled", "ppgodzcord"] );
UI.AddSliderInt( "Custom ClanTag Speed", 4.5, 4.5 );
var lasttime = 0;
function onRender( )
{
var tag = UI.GetValue("Clantag" );
var speed = UI.GetValue("Custom ClanTag Speed" );
var time = parseInt((Globals.Curtime() * speed))
if (time != lasttime)
{
if(tag == 0) { Local.SetClanTag(""); }
if(tag == 1)
{
switch((time) % 30)
{

case 0:  Local.SetClanTag(" pp"); break; 
case 1:  Local.SetClanTag(" ppg"); break; 
case 2:  Local.SetClanTag(" ppgo"); break; 
case 3:  Local.SetClanTag(" ppgod"); break; 
case 4:  Local.SetClanTag(" ppgodz"); break; 
case 5:  Local.SetClanTag(" ppgodzco"); break; 
case 6:  Local.SetClanTag(" ppgodzcord"); break; 
case 7:  Local.SetClanTag(" ppgodzcor"); break; 
case 8:  Local.SetClanTag(" ppgodzco "); break; 
case 9:  Local.SetClanTag(" ppgodzc "); break; 
case 10: Local.SetClanTag(" ppgodz "); break; 
case 11: Local.SetClanTag(" ppgod "); break; 
case 12: Local.SetClanTag(" ppgo "); break; 
case 13: Local.SetClanTag(" ppg "); break; 
case 14: Local.SetClanTag(" pp "); break; 
case 15: Local.SetClanTag(" p "); break; 
case 16: Local.SetClanTag("  "); break; 
case 17: Local.SetClanTag(" pp "); break; 
case 18: Local.SetClanTag(" ppgo "); break; 
case 19: Local.SetClanTag(" ppgodz "); break; 
case 20: Local.SetClanTag(" ppgodzc "); break; 
case 21: Local.SetClanTag(" ppgodzco "); break; 
case 22: Local.SetClanTag(" ppgodzcor "); break; 
case 23: Local.SetClanTag(" ppgodzcord "); break; 
case 24: Local.SetClanTag(" ppgodzcor "); break; 
case 25: Local.SetClanTag(" ppgodzco "); break; 
case 26: Local.SetClanTag(" ppgodzc "); break; 
case 27: Local.SetClanTag(" ppgodz "); break; 
case 28: Local.SetClanTag(" ppg "); break; 
case 29: Local.SetClanTag(" p "); break; 
case 30: Local.SetClanTag("  "); break; 

}
}
}
lasttime = time;
}
Cheat.RegisterCallback("Draw", "onRender");
