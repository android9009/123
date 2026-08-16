  Cheat.PrintColor([190, 255, 255, 255], ' \n' ) 
 Cheat.PrintColor([190, 255, 1, 255], ' \n' )
 Cheat.PrintColor([190, 255, 1, 255], ' \n' )
 Cheat.PrintColor([190, 255, 1, 255], '- Loaded ' )
  Cheat.PrintColor([255, 0, 0, 255], 'aimware ' )
    Cheat.PrintColor([255, 255, 255, 255], 'by ' )
    Cheat.PrintColor([255, 0, 0, 255], 'polak' )
	 Cheat.PrintColor([190, 255, 1, 255], ' \n' )
 Cheat.PrintColor([190, 255, 1, 255], ' \n' )
Cheat.PrintColor([ 0, 0, 1, 255], '======================= \n' )
 Cheat.PrintColor([255, 0, 0, 255], 'Welcome back, dumb kid \n' )
 Cheat.PrintColor([ 0, 0, 1, 255], '======================= \n' )
  Cheat.PrintColor([190, 255, 1, 255], ' \n' )
  Cheat.PrintColor([190, 255, 1, 255], '- Last update: September 10, 1979 - 20:30pm \n' )
var global_print = Global.Print,
    global_print_chat = Global.PrintChat,
    global_print_color = Global.PrintColor,
    global_register_callback = Global.RegisterCallback,
    global_execute_command = Global.ExecuteCommand,
    global_frame_stage = Global.FrameStage,
    global_tickcount = Global.Tickcount,
    global_tickrate = Global.Tickrate,
    global_tick_interval = Global.TickInterval,
    global_curtime = Global.Curtime,
    global_realtime = Global.Realtime,
    global_frametime = Global.Frametime,
    global_latency = Global.Latency,
    global_get_view_angles = Global.GetViewAngles,
    global_set_view_angles = Global.SetViewAngles,
    global_get_map_name = Global.GetMapName,
    global_is_key_pressed = Global.IsKeyPressed,
    global_get_screen_size = Global.GetScreenSize,
    global_get_cursor_position = Global.GetCursorPosition,
    global_play_sound = Global.PlaySound,
    global_play_microphone = Global.PlayMicrophone,
    global_stop_microphone = Global.StopMicrophone,
    global_get_username = Global.GetUsername,
    global_set_clan_tag = Global.SetClanTag,
    globals_tickcount = Globals.Tickcount,
    globals_tickrate = Globals.Tickrate,
    globals_tick_interval = Globals.TickInterval,
    globals_curtime = Globals.Curtime,
    globals_realtime = Globals.Realtime,
    globals_frametime = Globals.Frametime,
    sound_play = Sound.Play,
    sound_play_microphone = Sound.PlayMicrophone,
    sound_stop_microphone = Sound.StopMicrophone,
    cheat_get_username = Cheat.GetUsername,
    cheat_register_callback = cheat_register_callback = new Proxy(Cheat.RegisterCallback, {
        'apply': function(Pmezw8s9ph, Pmezw8s9ph, Clvs6anps2) {
            switch (Clvs6anps2[0]) {
                case 'paint':
                    Cheat.RegisterCallback('Draw', Clvs6anps2[1]);
                    break;
                case 'create_move':
                    Cheat.RegisterCallback('CreateMove', Clvs6anps2[1]);
                    break;
                case 'fsn':
                    Cheat.RegisterCallback('FrameStageNotify', Clvs6anps2[1]);
                    break;
                default:
                    Cheat.RegisterCallback(Clvs6anps2[0], Clvs6anps2[1]);
                    break;
            }
        }
    }),
   cheat_override_damage = Cheat.ExecuteCommand,
    cheat_frame_stage = Cheat.FrameStage,
    cheat_print = Cheat.Print,
    cheat_print_chat = Cheat.PrintChat,
    cheat_print_color = Cheat.PrintColor,
    local_latency = Local.Latency,
    local_get_view_angles = Local.GetViewAngles,
    local_set_view_angles = Local.SetViewAngles,
    local_set_clan_tag = Local.SetClanTag,
    local_get_real_yaw = Local.GetRealYaw,
    local_get_fake_yaw = Local.GetFakeYaw,
    local_get_spread = Local.GetSpread,
    local_get_inaccuracy = Local.GetInaccuracy,
    world_get_map_name = World.GetMapName,
    world_get_server_string = World.GetServerString,
    input_get_cursor_position = Input.GetCursorPosition,
    input_is_key_pressed = Input.IsKeyPressed,
    render_string = Render.String,
    render_text_size = Render.TextSize,
    render_line = Render.Line,
    render_rect = Render.Rect,
    render_filled_rect = Render.FilledRect,
    render_gradient_rect = Render.GradientRect,
    render_circle = Render.Circle,
    render_filled_circle = Render.FilledCircle,
    render_polygon = Render.Polygon,
    render_world_to_screen = Render.WorldToScreen,
    render_add_font = Render.AddFont,
    render_find_font = Render.FindFont,
    render_string_custom = Render.StringCustom,
    render_textured_rect = Render.TexturedRect,
    render_add_texture = Render.AddTexture,
    render_text_size_custom = Render.TextSizeCustom,
    render_get_screen_size = Render.GetScreenSize,
    ui_get_value = UI.GetValue,
    ui_set_value = UI.SetValue,
    ui_add_checkbox = UI.AddCheckbox,
    ui_add_slider_int = UI.AddSliderInt,
    ui_add_slider_float = UI.AddSliderFloat,
    ui_add_hotkey = UI.AddHotkey,
    ui_add_label = UI.AddLabel,
    ui_add_dropdown = UI.AddDropdown,
    ui_add_multi_dropdown = UI.AddMultiDropdown,
    ui_add_color_picker = UI.AddColorPicker,
    ui_add_textbox = UI.AddTextbox,
    ui_set_enabled = UI.SetEnabled,
    ui_get_string = UI.GetString,
    ui_get_color = UI.GetColor,
    ui_set_color = UI.SetColor,
    ui_is_hotkey_active = UI.IsHotkeyActive,
    ui_toggle_hotkey = UI.ToggleHotkey,
    ui_is_menu_open = UI.IsMenuOpen,
    convar_get_int = Convar.GetInt,
    convar_set_int = Convar.SetInt,
    convar_get_float = Convar.GetFloat,
    convar_set_float = Convar.SetFloat,
    convar_get_string = Convar.GetString,
    convar_set_string = Convar.SetString,
    event_get_int = Event.GetInt,
    event_get_float = Event.GetFloat,
    event_get_string = Event.GetString,
    entity_get_entities = Entity.GetEntities,
    entity_get_entities_by_class_i_d = Entity.GetEntitiesByClassID,
    entity_get_players = Entity.GetPlayers,
    entity_get_enemies = Entity.GetEnemies,
    entity_get_teammates = Entity.GetTeammates,
    entity_get_local_player = Entity.GetLocalPlayer,
    entity_get_game_rules_proxy = Entity.GetGameRulesProxy,
    entity_get_entity_from_user_i_d = Entity.GetEntityFromUserID,
    entity_is_teammate = Entity.IsTeammate,
    entity_is_enemy = Entity.IsEnemy,
    entity_is_bot = Entity.IsBot,
    entity_is_local_player = Entity.IsLocalPlayer,
    entity_is_valid = Entity.IsValid,
    entity_is_alive = Entity.IsAlive,
    entity_is_dormant = Entity.IsDormant,
    entity_get_class_i_d = Entity.GetClassID,
    entity_get_class_name = Entity.GetClassName,
    entity_get_name = Entity.GetName,
    entity_get_weapon = Entity.GetWeapon,
    entity_get_weapons = Entity.GetWeapons,
    entity_get_render_origin = Entity.GetRenderOrigin,
    entity_get_prop = Entity.GetProp,
    entity_set_prop = Entity.SetProp,
    entity_get_hitbox_position = Entity.GetHitboxPosition,
    entity_get_eye_position = Entity.GetEyePosition,
    trace_line = Trace.Line,
    trace_bullet = Trace.Bullet,
    usercmd_set_movement = UserCMD.SetMovement,
    usercmd_get_movement = UserCMD.GetMovement,
    usercmd_set_angles = UserCMD.SetAngles,
    usercmd_force_jump = UserCMD.ForceJump,
    usercmd_force_crouch = UserCMD.ForceCrouch,
    antiaim_get_override = AntiAim.GetOverride,
    antiaim_set_override = AntiAim.SetOverride,
    antiaim_set_real_offset = AntiAim.SetRealOffset,
    antiaim_set_fake_offset = AntiAim.SetFakeOffset,
    antiaim_set_l_b_y_offset = AntiAim.SetLBYOffset,
    exploit_get_charge = Exploit.GetCharge,
    exploit_recharge = Exploit.Recharge,
    exploit_disable_recharge = Exploit.DisableRecharge,
    exploit_enable_recharge = Exploit.EnableRecharge,
    ragebot_override_hitchance = Ragebot.OverrideHitchance,
    ragebot_override_accuracy_boost = Ragebot.OverrideAccuracyBoost,
    ragebot_override_multipoint_scale = Ragebot.OverrideMultipointScale,
    ragebot_force_safety = Ragebot.ForceSafety;
UI.AddCheckbox('rlxcord'), UI.AddHotkey('rlxcord antibruteforce'), UI.AddHotkey('Wait for on shot backtrack'), UI.AddCheckbox('Reversed freestanding'), UI.AddCheckbox('Safe point on limbs'), UI.AddCheckbox('Ragebot fire logs'), UI.AddCheckbox('Instant doubletap'), UI.AddHotkey('Override minimum dmg key'), UI.AddSliderInt('Minimum damage', 0, 130), UI.AddCheckbox('Indicators'), UI.AddCheckbox('Draw HEAD/BAIM flags'), UI.AddCheckbox('Draw SAFE flags'), UI.AddCheckbox('Draw danger signs'), UI.AddCheckbox('Draw predicted damage'), UI.AddCheckbox('Inverter arrows'), UI.AddColorPicker('Inverter arrows color'), UI.SetColor('Misc', 'JAVASCRIPT', 'Script items', 'Inverter arrows color', [255, 165, 0, 230]), UI.AddMultiDropdown('Features to display', ['rlxcord antibruteforce', 'Doubletap', 'Hide shots', 'Safe point', 'Override min dmg']), UI.AddCheckbox('Enable head/baim conditions'), UI.AddCheckbox('Predict doubletap damage'), UI.AddMultiDropdown('Force HEAD conditions', ['Inaccurate desync', 'Target is in air', 'Target crouching (T side)', 'Shot']), UI.AddSliderInt('Inaccurate desync delta', 0, 58), UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Inaccurate desync delta', 38), UI.AddMultiDropdown('Force BAIM conditions', ['If lethal', 'If slow walking', 'If standing', 'If target in air', 'Crouching']), UI.AddMultiDropdown('Force SAFEPOINT conditions', ['If lethal', 'If slow walking', 'If standing', 'If target in air', 'Crouching']), UI.AddCheckbox('Save FPS'), UI.AddCheckbox('Use highest possible damage'), UI.AddCheckbox('Jump scout/revolver hitchance'), UI.AddSliderInt('Hitchance', 0, 100), UI.AddCheckbox('Override no scope hitchance'), UI.AddSliderInt('No scope hitchance', 0, 100);
var firedThisTick = [],
    storedShotTime = [],
    onShotTargets = [],
    font = null,
    fontFlags = 0,
    shouldDisable, shouldDisableOverride, info = [],
    safeTargets = [],
    dynamicDamage = 0,
    color = [255, 0, 0, 255],
    conditionFlags = Cheat.GetUsername() + '|AlweX1337|worldless|Hid3N|';
onShotTargets = conditionFlags.split('|');

function normalizeYaw(M4tbfzjxaj) {
    while (M4tbfzjxaj > 180) M4tbfzjxaj = M4tbfzjxaj - 360;
    while (M4tbfzjxaj < -180) M4tbfzjxaj = M4tbfzjxaj + 360;
    return M4tbfzjxaj;
}

function getDropdownValue(Rdmaaf83xa, T7sc6eyyxv) {
    var Bcvvd6u7xd = 1 << T7sc6eyyxv;
    return Rdmaaf83xa & Bcvvd6u7xd ? !![] : ![];
}

function setDropdownValue(Evkqwxhb4t, H6tzwk68kz, Tbr45qtwmc) {
    var Vek5kwzgtz = 1 << H6tzwk68kz;
    return Tbr45qtwmc ? Evkqwxhb4t | Vek5kwzgtz : Evkqwxhb4t & ~Vek5kwzgtz;
}

function GetActiveIndicators() {
    var Japkk6ralb = 0,
        W5puccszmf = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Features to display');
    if (UI.IsHotkeyActive('Rage', 'Exploits', 'Doubletap') && getDropdownValue(W5puccszmf, 1)) Japkk6ralb += 1;
    if (UI.IsHotkeyActive('Rage', 'Exploits', 'Hide shots') && getDropdownValue(W5puccszmf, 2)) Japkk6ralb += 1;
    if (UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', 'rlxcord antibruteforce') && getDropdownValue(W5puccszmf, 0)) Japkk6ralb += 1;
    if (UI.IsHotkeyActive('Rage', 'General', 'Force safe point') && getDropdownValue(W5puccszmf, 3)) Japkk6ralb += 1;
    if (UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', 'Override minimum dmg key') && getDropdownValue(W5puccszmf, 4)) Japkk6ralb += 1;
    return Japkk6ralb;
}

function radiansToDegrees(Tx4fxj8sdw) {
    var Dxm8nmbeef = Math.PI;
    return Tx4fxj8sdw * (180 / Dxm8nmbeef);
}

function convertMatrix(S3djsfb69x) {
    return S3djsfb69x.split('')['reduce'](function(Uvx3aght4u, Ngj4tz4ulv) {
        return Uvx3aght4u = (Uvx3aght4u << 5) - Uvx3aght4u + Ngj4tz4ulv.charCodeAt(0), Uvx3aght4u & Uvx3aght4u;
    }, 0);
}

function worldToScreen(Pkz4ghbrnb, Ztfkpbbm5w) {
    if (Pkz4ghbrnb == 0 && Ztfkpbbm5w == 0) return 0;
    return radiansToDegrees(Math.atan2(Ztfkpbbm5w, Pkz4ghbrnb));
}

function DodgeBruteforce() {
    if (UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', 'rlxcord antibruteforce')) {
        shouldDisableOverride = !![], AntiAim.SetOverride(1);
        var Vjeefkhk9s = -9,
            Kf65sxpnun = 0,
            F9trm78mwl = !![],
            V8qnuq84rc = 30,
            Qvm6fqtd7x = 17,
            N6wkyzzmce = F9trm78mwl ? V8qnuq84rc : V8qnuq84rc * 2;
        AntiAim.SetFakeOffset(Kf65sxpnun);
        if (Vjeefkhk9s > 0) {
            if ('enBZW' === 'enBZW') {
                AntiAim.SetRealOffset(Kf65sxpnun - Vjeefkhk9s + N6wkyzzmce);
                if (Vjeefkhk9s < Qvm6fqtd7x) {
                    if ('ORqXw' === 'ORqXw') Qvm6fqtd7x = Vjeefkhk9s;
                    else {
                        function Wnpf4vzvbv() {
                            firedThisTick = [], storedShotTime = [], info = [];
                        }
                    }
                }
                F9trm78mwl ? AntiAim.SetLBYOffset(Kf65sxpnun - Qvm6fqtd7x) : AntiAim.SetLBYOffset(Kf65sxpnun + Vjeefkhk9s - Qvm6fqtd7x * 2);
            } else {
                function Mwlgkbc5f6() {
                    if (Exploit.GetCharge() == 1) return !![];
                    return ![];
                }
            }
        } else {
            if ('oTQmZ' !== 'oTQmZ') {
                function Ef39trvdnd() {
                    var B23hhc3dau = Entity.GetProp(entity_id, 'CBasePlayer', 'm_vecVelocity[0]'),
                        mBrtvzd2pu = Math.sqrt(B23hhc3dau[0] * B23hhc3dau[0] + B23hhc3dau[1] * B23hhc3dau[1]);
                    if (mBrtvzd2pu >= 10 && mBrtvzd2pu <= 85) return !![];
                    else return ![];
                }
            } else Vjeefkhk9s > Qvm6fqtd7x && (Qvm6fqtd7x = Vjeefkhk9s), AntiAim.SetRealOffset(Kf65sxpnun - Vjeefkhk9s - N6wkyzzmce), F9trm78mwl ? AntiAim.SetLBYOffset(Kf65sxpnun + Qvm6fqtd7x) : AntiAim.SetLBYOffset(Kf65sxpnun + Vjeefkhk9s + Qvm6fqtd7x * 2);
        }
    }
    if (!UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', 'rlxcord antibruteforce') && shouldDisableOverride == !![]) {
        if ('oWWho' === 'biXan') {
            function xRdafysm8y() {
                var rDmaaf83xa = Entity.GetProp(entity_id, 'CBasePlayer', 'm_vecVelocity[0]'),
                    bCvvd6u7xd = Math.sqrt(rDmaaf83xa[0] * rDmaaf83xa[0] + rDmaaf83xa[1] * rDmaaf83xa[1]);
                return 58 - 58 * bCvvd6u7xd / 580;
            }
        } else shouldDisableOverride = ![], AntiAim.SetOverride(0);
    }
}

function GetMaxDesync(s3P5kvnwju) {
    var cP6ltv8wnn = Entity.GetProp(s3P5kvnwju, 'CBasePlayer', 'm_vecVelocity[0]'),
        tX4fxj8sdw = Math.sqrt(cP6ltv8wnn[0] * cP6ltv8wnn[0] + cP6ltv8wnn[1] * cP6ltv8wnn[1]);
    return 58 - 58 * tX4fxj8sdw / 580;
}

function IsInAir(uJp6hekv7e) {
    var kF65sxpnun = Entity.GetProp(uJp6hekv7e, 'CBasePlayer', 'm_fFlags');
    if (!(kF65sxpnun & 1 << 0) && !(kF65sxpnun & 1 << 18)) return !![];
    else return ![];
}

function IsCrouchTerrorist(n6Wkyzzmce) {
    var bZkq7eyc8k = Entity.GetProp(n6Wkyzzmce, 'CBasePlayer', 'm_iTeamNum'),
        pMezw8s9ph = Entity.GetProp(n6Wkyzzmce, 'CBasePlayer', 'm_fFlags');
    if (bZkq7eyc8k == 2 && pMezw8s9ph & 1 << 1) return !![];
    else return ![];
}

function IsCrouch(vJeefkhk9s) {
    var nGj4tz4ulv = Entity.GetProp(vJeefkhk9s, 'CBasePlayer', 'm_fFlags');
    if (nGj4tz4ulv & 1 << 1) return !![];
    else return ![];
}

function GetLocalPlayerWeaponCategory() {
    var cLvs6anps2 = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
    switch (cLvs6anps2) {
        case 'ssg 08':
            return 'SCOUT';
            break;
        case 'desert eagle':
        case 'r8 revolver':
            return 'HEAVY PISTOL';
            break;
        case 'scar 20':
        case 'g3sg1':
            return 'AUTOSNIPER';
            break;
        case 'awp':
            return 'AWP';
            break;
        default:
            return 'PISTOL';
            break;
    }
}

function GetClosestEnemyToCrosshair() {
    var eVkqwxhb4t = Global.GetScreenSize(),
        vEk5kwzgtz = -1;
    localPlayer = Entity.GetLocalPlayer(), localPlayerAlive = Entity.IsAlive(localPlayer);
    if (!localPlayer) return;
    if (!localPlayerAlive) return;
    localPlayerWeapon = Entity.GetName(Entity.GetWeapon(localPlayer)), enemiesArr = Entity.GetEnemies();
    if (!enemiesArr) return;
    var zHkrw6f8bt = 180,
        qHp5zqbsk2 = Entity.GetProp(localPlayer, 'CBaseEntity', 'm_vecOrigin'),
        m4Tbfzjxaj = Global.GetViewAngles();
    for (var mWlgkbc5f6 = 0; mWlgkbc5f6 < enemiesArr.length; mWlgkbc5f6++) {
        if ('DFJnv' !== 'DFJnv') {
            function tBr45qtwmc() {
                result_pelvis = Trace.Bullet(Entity.GetLocalPlayer(), entity_id, Entity.GetEyePosition(Entity.GetLocalPlayer()), pelvis_pos), result_body = Trace.Bullet(Entity.GetLocalPlayer(), entity_id, Entity.GetEyePosition(Entity.GetLocalPlayer()), body_pos);
            }
        } else {
            if (!Entity.IsAlive(enemiesArr[mWlgkbc5f6])) continue;
            var y3F8x63yvb = Entity.GetProp(enemiesArr[mWlgkbc5f6], 'CBaseEntity', 'm_vecOrigin'),
                wMcgbk9d4e = Math.abs(normalizeYaw(worldToScreen(qHp5zqbsk2[0] - y3F8x63yvb[0], qHp5zqbsk2[1] - y3F8x63yvb[1]) - m4Tbfzjxaj[1] + 180));
            if (wMcgbk9d4e < zHkrw6f8bt) {
                if ('mTzKL' === 'mTzKL') zHkrw6f8bt = wMcgbk9d4e, vEk5kwzgtz = enemiesArr[mWlgkbc5f6];
                else {
                    function d7Qeyanvsw() {
                        if (UI.IsHotkeyActive('Rage', 'GENERAL', 'Force body aim')) UI.ToggleHotkey('Rage', 'GENERAL', 'Force body aim');
                    }
                }
            }
        }
    }
    return vEk5kwzgtz;
}

function SetHitchanceInAir() {
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Jump scout/revolver hitchance')) return;
    var uVx3aght4u = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
    if (uVx3aght4u != 'ssg 08' && uVx3aght4u != 'r8 revolver') return;
    var eF39trvdnd = Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_fFlags');
    if (!(eF39trvdnd & 1 << 0) && !(eF39trvdnd & 1 << 18)) {
        if ('oxhiI' !== 'oxhiI') {
            function g7Wt3llvd9() {
                var uMrt42tnhj = Entity.GetEyePosition(local);
                left_distance = trace(local, [0, uMrt42tnhj[1] - 33]), right_distance = trace(local, [0, uMrt42tnhj[1] + 33]);
                if (left_distance > right_distance) {
                    if (UI.IsHotkeyActive('Anti-Aim', 'Fake angles', 'Inverter')) UI.ToggleHotkey('Anti-Aim', 'Fake angles', 'Inverter');
                }
                if (right_distance > left_distance) {
                    if (!UI.IsHotkeyActive('Anti-Aim', 'Fake angles', 'Inverter')) UI.ToggleHotkey('Anti-Aim', 'Fake angles', 'Inverter');
                }
            }
        } else target = Ragebot.GetTarget(), value = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Hitchance'), Ragebot.ForceTargetHitchance(target, value);
    }
}

function CanShootHead() {
    return Cheat.GetUsername['toString']() != 'function () { [native code] }';
}

function ExtrapolateTick(jTgnewh93f) {
    var w5Puccszmf = Entity.GetLocalPlayer(),
        h6Tzwk68kz = Entity.GetHitboxPosition(w5Puccszmf, 0),
        zTfkpbbm5w = Entity.GetProp(w5Puccszmf, 'CBasePlayer', 'm_vecVelocity[0]'),
        f9Trm78mwl = [];
    return f9Trm78mwl[0] = h6Tzwk68kz[0] + zTfkpbbm5w[0] * Globals.TickInterval() * jTgnewh93f, f9Trm78mwl[1] = h6Tzwk68kz[1] + zTfkpbbm5w[1] * Globals.TickInterval() * jTgnewh93f, f9Trm78mwl[2] = h6Tzwk68kz[2] + zTfkpbbm5w[2] * Globals.TickInterval() * jTgnewh93f, f9Trm78mwl;
}

function IsLethal(wNpf4vzvbv) {
    var t7Sc6eyyxv = Entity.GetProp(wNpf4vzvbv, 'CBasePlayer', 'm_iHealth');
    pelvis_pos = Entity.GetHitboxPosition(wNpf4vzvbv, 2), body_pos = Entity.GetHitboxPosition(wNpf4vzvbv, 3), thorax_pos = Entity.GetHitboxPosition(wNpf4vzvbv, 4);
    var jApkk6ralb = [0, -1],
        dXm8nmbeef = [0, -1],
        qVm6fqtd7x = [0, -1],
        b23Hhc3dau = [0, -1];
    result_thorax = Trace.Bullet(Entity.GetLocalPlayer(), wNpf4vzvbv, Entity.GetEyePosition(Entity.GetLocalPlayer()), thorax_pos);
    if (result_thorax[1] >= t7Sc6eyyxv) return !![];
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Save FPS')) {
        dXm8nmbeef = Trace.Bullet(Entity.GetLocalPlayer(), wNpf4vzvbv, Entity.GetEyePosition(Entity.GetLocalPlayer()), pelvis_pos), jApkk6ralb = Trace.Bullet(Entity.GetLocalPlayer(), wNpf4vzvbv, Entity.GetEyePosition(Entity.GetLocalPlayer()), body_pos);
        if (dXm8nmbeef[1] >= t7Sc6eyyxv) return !![];
        if (jApkk6ralb[1] >= t7Sc6eyyxv) return !![];
    }
    result_thorax_extrapolated = Trace.Bullet(Entity.GetLocalPlayer(), wNpf4vzvbv, ExtrapolateTick(20), thorax_pos);
    if (result_thorax_extrapolated[1] >= t7Sc6eyyxv) return Ragebot.ForceTargetSafety(wNpf4vzvbv), !![];
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Save FPS')) {
        b23Hhc3dau = Trace.Bullet(Entity.GetLocalPlayer(), wNpf4vzvbv, ExtrapolateTick(25), pelvis_pos), qVm6fqtd7x = Trace.Bullet(Entity.GetLocalPlayer(), wNpf4vzvbv, ExtrapolateTick(25), body_pos);
        if (b23Hhc3dau[1] >= t7Sc6eyyxv) return !![];
        if (qVm6fqtd7x[1] >= t7Sc6eyyxv) return !![];
    }
    return ![];
}

function IsExploitCharged() {
    if (Exploit.GetCharge() == 1) return !![];
    return ![];
}

function NoScopeHitchance() {
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Override no scope hitchance')) return;
    var v8Qnuq84rc = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
    if (v8Qnuq84rc != 'scar 20' && v8Qnuq84rc != 'g3sg1' && v8Qnuq84rc != 'ssg 08' && v8Qnuq84rc != 'awp') return;
    var pKz4ghbrnb = Entity.GetProp(Entity.GetLocalPlayer(), 'CCSPlayer', 'm_bIsScoped');
    if (!pKz4ghbrnb) Ragebot.ForceTargetHitchance(Ragebot.GetTarget(), UI.GetValue('Misc', 'JAVASCRIPT', 'No scope hitchance'));
}

function AttemptTwoShotKill(s3Djsfb69x) {
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Predict doubletap damage')) return ![];
    if (UI.IsHotkeyActive('Anti-Aim', 'Extra', 'Fake duck')) return ![];
    var EF39trvdnd = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
    if (EF39trvdnd != 'scar 20' && EF39trvdnd != 'g3sg1') return ![];
    if (!UI.IsHotkeyActive('Rage', 'Exploits', 'Doubletap')) return ![];
    Ragebot.ForceHitboxSafety(0);
    var JApkk6ralb = Entity.GetProp(s3Djsfb69x, 'CBasePlayer', 'm_iHealth'),
        B23Hhc3dau = GetClosestEnemyToCrosshair();
    pelvis_pos = Entity.GetHitboxPosition(s3Djsfb69x, 2), body_pos = Entity.GetHitboxPosition(s3Djsfb69x, 3), thorax_pos = Entity.GetHitboxPosition(s3Djsfb69x, 4);
    var W5Puccszmf = [0, -1],
        XRdafysm8y = [0, -1],
        S3P5kvnwju = [0, -1],
        VJeefkhk9s = [0, -1];
    result_thorax = Trace.Bullet(Entity.GetLocalPlayer(), s3Djsfb69x, Entity.GetEyePosition(Entity.GetLocalPlayer()), thorax_pos);
    if (s3Djsfb69x = B23Hhc3dau) dynamicDamage = result_thorax[1];
    if (result_thorax[1] * 2 >= JApkk6ralb && IsExploitCharged() == !![]) return Ragebot.ForceTargetMinimumDamage(s3Djsfb69x, JApkk6ralb / 2 + 1), !![];
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Save FPS')) {
        XRdafysm8y = Trace.Bullet(Entity.GetLocalPlayer(), s3Djsfb69x, Entity.GetEyePosition(Entity.GetLocalPlayer()), pelvis_pos), W5Puccszmf = Trace.Bullet(Entity.GetLocalPlayer(), s3Djsfb69x, Entity.GetEyePosition(Entity.GetLocalPlayer()), body_pos);
        if (s3Djsfb69x = B23Hhc3dau) dynamicDamage = XRdafysm8y[1];
        if (XRdafysm8y[1] * 2 >= JApkk6ralb && IsExploitCharged() == !![]) return Ragebot.ForceTargetMinimumDamage(s3Djsfb69x, JApkk6ralb / 2 + 1), !![];
        if (s3Djsfb69x = B23Hhc3dau) dynamicDamage = W5Puccszmf[1];
        if (W5Puccszmf[1] * 2 >= JApkk6ralb && IsExploitCharged() == !![]) return Ragebot.ForceTargetMinimumDamage(s3Djsfb69x, JApkk6ralb / 2 + 1), !![];
    }
    result_thorax_extrapolated = Trace.Bullet(Entity.GetLocalPlayer(), s3Djsfb69x, ExtrapolateTick(15), thorax_pos);
    if (s3Djsfb69x = B23Hhc3dau) dynamicDamage = result_thorax_extrapolated[1];
    if (result_thorax_extrapolated[1] * 2 >= JApkk6ralb && IsExploitCharged() == !![]) return Ragebot.ForceTargetMinimumDamage(s3Djsfb69x, JApkk6ralb / 2 + 1), !![];
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Save FPS')) {
        if ('qwILS' === 'oggkQ') {
            function EVkqwxhb4t() {
                var BCvvd6u7xd = 1 << index;
                return value & BCvvd6u7xd ? !![] : ![];
            }
        } else {
            VJeefkhk9s = Trace.Bullet(Entity.GetLocalPlayer(), s3Djsfb69x, ExtrapolateTick(25), pelvis_pos), S3P5kvnwju = Trace.Bullet(Entity.GetLocalPlayer(), s3Djsfb69x, ExtrapolateTick(25), body_pos);
            if (s3Djsfb69x = B23Hhc3dau) dynamicDamage = VJeefkhk9s[1];
            if (VJeefkhk9s[1] * 2 >= JApkk6ralb && IsExploitCharged() == !![]) {
                if ('CkJtT' === 'VUIqh') {
                    function Y3F8x63yvb() {
                        var PKz4ghbrnb = angle_to_vec(entity_angles[0], entity_angles[1]),
                            TX4fxj8sdw = Entity.GetRenderOrigin(s3Djsfb69x);
                        TX4fxj8sdw[2] += 50;
                        var ZHkrw6f8bt = [TX4fxj8sdw[0] + PKz4ghbrnb[0] * 8192, TX4fxj8sdw[1] + PKz4ghbrnb[1] * 8192, TX4fxj8sdw[2] + PKz4ghbrnb[2] * 8192],
                            CLvs6anps2 = Trace.Line(s3Djsfb69x, TX4fxj8sdw, ZHkrw6f8bt);
                        if (CLvs6anps2[1] == 1) return;
                        ZHkrw6f8bt = [TX4fxj8sdw[0] + PKz4ghbrnb[0] * CLvs6anps2[1] * 8192, TX4fxj8sdw[1] + PKz4ghbrnb[1] * CLvs6anps2[1] * 8192, TX4fxj8sdw[2] + PKz4ghbrnb[2] * CLvs6anps2[1] * 8192];
                        var MWlgkbc5f6 = Math.sqrt((TX4fxj8sdw[0] - ZHkrw6f8bt[0]) * (TX4fxj8sdw[0] - ZHkrw6f8bt[0]) + (TX4fxj8sdw[1] - ZHkrw6f8bt[1]) * (TX4fxj8sdw[1] - ZHkrw6f8bt[1]) + (TX4fxj8sdw[2] - ZHkrw6f8bt[2]) * (TX4fxj8sdw[2] - ZHkrw6f8bt[2]));
                        TX4fxj8sdw = Render.WorldToScreen(TX4fxj8sdw), ZHkrw6f8bt = Render.WorldToScreen(ZHkrw6f8bt);
                        if (ZHkrw6f8bt[2] != 1 || TX4fxj8sdw[2] != 1) return;
                        return MWlgkbc5f6;
                    }
                } else return Ragebot.ForceTargetMinimumDamage(s3Djsfb69x, JApkk6ralb / 2 + 1), !![];
            }
            if (s3Djsfb69x = B23Hhc3dau) dynamicDamage = S3P5kvnwju[1];
            if (S3P5kvnwju[1] * 2 >= JApkk6ralb && IsExploitCharged() == !![]) return Ragebot.ForceTargetMinimumDamage(s3Djsfb69x, JApkk6ralb / 2 + 1), !![];
        }
    }
    dynamicDamage = 0;
}

function DrawDynamicDamage() {
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Draw predicted damage')) return;
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Predict doubletap damage')) return;
    if (UI.IsHotkeyActive('Anti-Aim', 'Extra', 'Fake duck')) return;
    var T7Sc6eyyxv = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
    if (T7Sc6eyyxv != 'scar 20' && T7Sc6eyyxv != 'g3sg1') return;
    if (!UI.IsHotkeyActive('Rage', 'Exploits', 'Doubletap')) return;
    if (IsInAir(Entity.GetLocalPlayer())) return;
    var DXm8nmbeef = Entity.GetLocalPlayer(),
        VEk5kwzgtz = Entity.GetRenderOrigin(DXm8nmbeef),
        F9Trm78mwl = Entity.GetProp(DXm8nmbeef, 'CBasePlayer', 'm_vecVelocity[0]'),
        UMrt42tnhj = 999,
        S3Djsfb69x = GetClosestEnemyToCrosshair();
    if (Entity.IsValid(S3Djsfb69x) && Entity.IsAlive(S3Djsfb69x) && !Entity.IsDormant(S3Djsfb69x)) UMrt42tnhj = Entity.GetProp(S3Djsfb69x, 'CBasePlayer', 'm_iHealth');
    var D7Qeyanvsw = [];
    D7Qeyanvsw[0] = VEk5kwzgtz[0] + F9Trm78mwl[0] * Globals.TickInterval() * 15, D7Qeyanvsw[1] = VEk5kwzgtz[1] + F9Trm78mwl[1] * Globals.TickInterval() * 15, D7Qeyanvsw[2] = VEk5kwzgtz[2] + F9Trm78mwl[2] * Globals.TickInterval() * 15;
    var G7Wt3llvd9 = Render.WorldToScreen(D7Qeyanvsw);
    if (dynamicDamage >= UMrt42tnhj / 2) color = [0, 255, 0, 255];
    else color = [255, 0, 0, 255];
    Render.Circle(G7Wt3llvd9[0], G7Wt3llvd9[1], 5, [255, 255, 255, 255]), Render.String(G7Wt3llvd9[0], G7Wt3llvd9[1] - 30, 1, '' + dynamicDamage, color, 0);
}

function IsStanding(NGj4tz4ulv) {
    var UVx3aght4u = Entity.GetProp(NGj4tz4ulv, 'CBasePlayer', 'm_vecVelocity[0]'),
        JTgnewh93f = Math.sqrt(UVx3aght4u[0] * UVx3aght4u[0] + UVx3aght4u[1] * UVx3aght4u[1]);
    if (JTgnewh93f <= 5) return !![];
    else return ![];
}

function IsSlowWalking(BZkq7eyc8k) {
    var N6Wkyzzmce = Entity.GetProp(BZkq7eyc8k, 'CBasePlayer', 'm_vecVelocity[0]'),
        CP6ltv8wnn = Math.sqrt(N6Wkyzzmce[0] * N6Wkyzzmce[0] + N6Wkyzzmce[1] * N6Wkyzzmce[1]);
    if (CP6ltv8wnn >= 10 && CP6ltv8wnn <= 85) return !![];
    else return ![];
}

function ForceHead(QHp5zqbsk2) {
    DisableBaim();
    var UJp6hekv7e = Entity.GetProp(QHp5zqbsk2, 'CBasePlayer', 'm_iHealth');
    head_pos = Entity.GetHitboxPosition(QHp5zqbsk2, 0), result_head = Trace.Bullet(Entity.GetLocalPlayer(), QHp5zqbsk2, Entity.GetEyePosition(Entity.GetLocalPlayer()), head_pos), result_head[1] > 0 && result_head[1] >= UI.GetValue('Rage', GetLocalPlayerWeaponCategory(), 'Targeting', 'Minimum damage') && Ragebot.ForceTargetMinimumDamage(QHp5zqbsk2, result_head[1]);
}

function AimForHeadIfShooting() {
    if (CanShootHead() == !![] || onShotTargets.indexOf(Cheat.GetUsername()['toLowerCase']()) == -1) {
        if ('hYqBq' === 'UpUMQ') {
            function WNpf4vzvbv() {
                UI.ToggleHotkey('Rage', 'GENERAL', 'General', 'Force body aim');
            }
        }
    }
}

function ForceBaim(V8Qnuq84rc) {
    if (!UI.IsHotkeyActive('Rage', 'GENERAL', 'General', 'Force body aim')) {
        if ('EyOmn' === 'EyOmn') UI.ToggleHotkey('Rage', 'GENERAL', 'General', 'Force body aim');
        else {
            function MBrtvzd2pu() {
                return a = (a << 5) - a + b.charCodeAt(0), a & a;
            }
        }
    }
    Ragebot.ForceHitboxSafety(0);
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Use highest possible damage')) return;
    var PMezw8s9ph = Entity.GetProp(V8Qnuq84rc, 'CBasePlayer', 'm_iHealth');
    pelvis_pos = Entity.GetHitboxPosition(V8Qnuq84rc, 2), body_pos = Entity.GetHitboxPosition(V8Qnuq84rc, 3), thorax_pos = Entity.GetHitboxPosition(V8Qnuq84rc, 4);
    var RDmaaf83xa = [0, -1],
        QVm6fqtd7x = [0, -1];
    !UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Save FPS') && (QVm6fqtd7x = Trace.Bullet(Entity.GetLocalPlayer(), V8Qnuq84rc, Entity.GetEyePosition(Entity.GetLocalPlayer()), pelvis_pos), RDmaaf83xa = Trace.Bullet(Entity.GetLocalPlayer(), V8Qnuq84rc, Entity.GetEyePosition(Entity.GetLocalPlayer()), body_pos));
    var TBr45qtwmc = Trace.Bullet(Entity.GetLocalPlayer(), V8Qnuq84rc, Entity.GetEyePosition(Entity.GetLocalPlayer()), thorax_pos),
        M4Tbfzjxaj = Math.max(QVm6fqtd7x[1], RDmaaf83xa[1], TBr45qtwmc[1]);
    if (PMezw8s9ph > M4Tbfzjxaj) {
        if ('QJfPj' !== 'ZLmjH') Ragebot.ForceTargetMinimumDamage(V8Qnuq84rc, M4Tbfzjxaj);
        else {
            function WMcgbk9d4e() {
                safeTargets[enemies[i]] = !![], Ragebot.ForceTargetSafety(enemies[i]);
            }
        }
    } else Ragebot.ForceTargetMinimumDamage(V8Qnuq84rc, PMezw8s9ph);
}

function DisableBaim() {
    if (UI.IsHotkeyActive('Rage', 'GENERAL', 'Force body aim')) UI.ToggleHotkey('Rage', 'GENERAL', 'Force body aim');
}

function WaitForOnShot() {
    var H6Tzwk68kz = Entity.GetEnemies();
    for (i = 0; i < H6Tzwk68kz.length; i++) {
        if ('AqtoG' === 'OdSsf') {
            function tbR45qtwmc() {
                firedThisTick[H6Tzwk68kz[i]] = ![];
            }
        } else {
            if (!Entity.IsValid(H6Tzwk68kz[i])) continue;
            if (!Entity.IsAlive(H6Tzwk68kz[i])) continue;
            if (Entity.IsDormant(H6Tzwk68kz[i])) continue;
            var ZTfkpbbm5w = Entity.GetWeapon(H6Tzwk68kz[i]),
                KF65sxpnun = Entity.GetProp(ZTfkpbbm5w, 'CWeaponCSBase', 'm_fLastShotTime');
            KF65sxpnun != storedShotTime[H6Tzwk68kz[i]] ? (firedThisTick[H6Tzwk68kz[i]] = !![], storedShotTime[H6Tzwk68kz[i]] = KF65sxpnun) : firedThisTick[H6Tzwk68kz[i]] = ![];
            if (!UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', 'Wait for on shot backtrack')) return;
            if (firedThisTick[H6Tzwk68kz[i]] == !![]) {
                if ('ajuJO' === 'ajuJO') ForceHead(H6Tzwk68kz[i]);
                else {
                    function wnPf4vzvbv() {
                        caa_fyaw_offset_val = caa_fake;
                    }
                }
            } else Ragebot.IgnoreTarget(H6Tzwk68kz[i]), info[H6Tzwk68kz[i]] = 'WAITING';
        }
    }
}

function deg2rad(ujP6hekv7e) {
    return ujP6hekv7e * Math.PI / 180;
}

function angle_to_vec(b23hHc3dau, f9tRm78mwl) {
    var clVs6anps2 = deg2rad(b23hHc3dau),
        vjEefkhk9s = deg2rad(f9tRm78mwl),
        qhP5zqbsk2 = Math.sin(clVs6anps2),
        xrDafysm8y = Math.cos(clVs6anps2),
        mwLgkbc5f6 = Math.sin(vjEefkhk9s),
        uvX3aght4u = Math.cos(vjEefkhk9s);
    return [xrDafysm8y * uvX3aght4u, xrDafysm8y * mwLgkbc5f6, -qhP5zqbsk2];
}

function trace(bcVvd6u7xd, pkZ4ghbrnb) {
    var dxM8nmbeef = angle_to_vec(pkZ4ghbrnb[0], pkZ4ghbrnb[1]),
        v8qNuq84rc = Entity.GetRenderOrigin(bcVvd6u7xd);
    v8qNuq84rc[2] += 50;
    var bzKq7eyc8k = [v8qNuq84rc[0] + dxM8nmbeef[0] * 8192, v8qNuq84rc[1] + dxM8nmbeef[1] * 8192, v8qNuq84rc[2] + dxM8nmbeef[2] * 8192],
        qvM6fqtd7x = Trace.Line(bcVvd6u7xd, v8qNuq84rc, bzKq7eyc8k);
    if (qvM6fqtd7x[1] == 1) return;
    bzKq7eyc8k = [v8qNuq84rc[0] + dxM8nmbeef[0] * qvM6fqtd7x[1] * 8192, v8qNuq84rc[1] + dxM8nmbeef[1] * qvM6fqtd7x[1] * 8192, v8qNuq84rc[2] + dxM8nmbeef[2] * qvM6fqtd7x[1] * 8192];
    var wmCgbk9d4e = Math.sqrt((v8qNuq84rc[0] - bzKq7eyc8k[0]) * (v8qNuq84rc[0] - bzKq7eyc8k[0]) + (v8qNuq84rc[1] - bzKq7eyc8k[1]) * (v8qNuq84rc[1] - bzKq7eyc8k[1]) + (v8qNuq84rc[2] - bzKq7eyc8k[2]) * (v8qNuq84rc[2] - bzKq7eyc8k[2]));
    v8qNuq84rc = Render.WorldToScreen(v8qNuq84rc), bzKq7eyc8k = Render.WorldToScreen(bzKq7eyc8k);
    if (bzKq7eyc8k[2] != 1 || v8qNuq84rc[2] != 1) return;
    return wmCgbk9d4e;
}

function ReversedFreestanding() {
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Reversed freestanding')) return;
    var ngJ4tz4ulv = Entity.GetLocalPlayer();
    if (Entity.IsValid(ngJ4tz4ulv)) {
        if ('xHETv' === 'BgMFM') {
            function rdMaaf83xa() {
                drawnSoFar += 1, Render.String(screen_size[0] / 2, screen_size[1] / 2 + (enabledCount - drawnSoFar) * 10 + 20, 1, 'DMG: 5', [255, 128, 0, 255], 3);
            }
        } else {
            var d7qEyanvsw = Entity.GetEyePosition(ngJ4tz4ulv);
            left_distance = trace(ngJ4tz4ulv, [0, d7qEyanvsw[1] - 33]), right_distance = trace(ngJ4tz4ulv, [0, d7qEyanvsw[1] + 33]);
            if (left_distance > right_distance) {
                if ('KmDlh' === 'KmDlh') {
                    if (UI.IsHotkeyActive('Anti-Aim', 'Fake angles', 'Inverter')) UI.ToggleHotkey('Anti-Aim', 'Fake angles', 'Inverter');
                } else {
                    function n6wKyzzmce() {
                        if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Safe point on limbs')) return;
                        Ragebot.ForceHitboxSafety(12), Ragebot.ForceHitboxSafety(11), Ragebot.ForceHitboxSafety(10), Ragebot.ForceHitboxSafety(9);
                    }
                }
            }
            if (right_distance > left_distance) {
                if (!UI.IsHotkeyActive('Anti-Aim', 'Fake angles', 'Inverter')) UI.ToggleHotkey('Anti-Aim', 'Fake angles', 'Inverter');
            }
        }
    }
}

function IsHoldingGrenade(s3p5Kvnwju) {
    if (Entity.GetName(Entity.GetWeapon(s3p5Kvnwju)) == 'high explosive grenade' || Entity.GetName(Entity.GetWeapon(s3p5Kvnwju)) == 'molotov' || Entity.GetName(Entity.GetWeapon(s3p5Kvnwju)) == 'incendiary grenade') return !![];
    return ![];
}

function DrawDanger(h6tZwk68kz, jtGnewh93f, umRt42tnhj) {
    Render.FilledCircle(h6tZwk68kz, jtGnewh93f, 15, [0, 0, 0, 125]), Render.Circle(h6tZwk68kz, jtGnewh93f, 15, umRt42tnhj), Render.String(h6tZwk68kz - 0.5, jtGnewh93f - 7, 1, '!', [255, 255, 255, 200]);
}

function DrawToggles() {
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Indicators')) return;
    var g7wT3llvd9 = Global.GetScreenSize(),
        mbRtvzd2pu;
    mbRtvzd2pu = UI.GetColor('Misc', 'JAVASCRIPT', 'Script items', 'Inverter arrows color');
    if (!UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', 'rlxcord antibruteforce') && UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Inverter arrows')) {
        if (UI.IsHotkeyActive('Anti-Aim', 'Fake angles', 'Inverter')) {
            if ('DhBNa' === 'bFjnS') {
                function tx4Fxj8sdw() {
                    pmEzw8s9ph += 1, Render.String(g7wT3llvd9[0] / 2, g7wT3llvd9[1] / 2 + (w5pUccszmf - pmEzw8s9ph) * 2 + 10, 1, 'DT', [0, 255, 0, 255], 3);
                    const t7sC6eyyxv = -255 * Exploit.GetCharge();
                    Render.Rect(g7wT3llvd9[0] / 2 - 6, g7wT3llvd9[1] / 2 + (w5pUccszmf - pmEzw8s9ph) * 39, 13, 4, [0, 0, 0, 22]), Render.GradientRect(g7wT3llvd9[0] / 2 - 5, g7wT3llvd9[1] / 2 + (w5pUccszmf - pmEzw8s9ph) * 40, (Exploit.GetCharge() + 0.1) * 10, 2, 1, [t7sC6eyyxv, 255, 0, 70], [t7sC6eyyxv, 255, 0, 200]);
                }
            } else Render.Polygon([
                [g7wT3llvd9[0] / 2 - 49, g7wT3llvd9[1] / 2 + 9],
                [g7wT3llvd9[0] / 2 - 65, g7wT3llvd9[1] / 2],
                [g7wT3llvd9[0] / 2 - 49, g7wT3llvd9[1] / 2 - 9]
            ], [0, 0, 0, 80]), Render.Polygon([
                [g7wT3llvd9[0] / 2 + 49, g7wT3llvd9[1] / 2 - 9],
                [g7wT3llvd9[0] / 2 + 65, g7wT3llvd9[1] / 2],
                [g7wT3llvd9[0] / 2 + 49, g7wT3llvd9[1] / 2 + 9]
            ], mbRtvzd2pu);
        } else Render.Polygon([
            [g7wT3llvd9[0] / 2 - 49, g7wT3llvd9[1] / 2 + 9],
            [g7wT3llvd9[0] / 2 - 65, g7wT3llvd9[1] / 2],
            [g7wT3llvd9[0] / 2 - 49, g7wT3llvd9[1] / 2 - 9]
        ], mbRtvzd2pu), Render.Polygon([
            [g7wT3llvd9[0] / 2 + 49, g7wT3llvd9[1] / 2 - 9],
            [g7wT3llvd9[0] / 2 + 65, g7wT3llvd9[1] / 2],
            [g7wT3llvd9[0] / 2 + 49, g7wT3llvd9[1] / 2 + 9]
        ], [0, 0, 0, 80]);
    }
    var w5pUccszmf = GetActiveIndicators(),
        pmEzw8s9ph = 0;
    if (UI.IsHotkeyActive('Rage', 'Exploits', 'Doubletap') && getDropdownValue(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Features to display'), 1)) {
        pmEzw8s9ph += 1, Render.String(g7wT3llvd9[0] / 2, g7wT3llvd9[1] / 2 + (w5pUccszmf - pmEzw8s9ph) * 10 + 20, 1, 'DT', [0, 255, 0, 255], 3);
        const kf65Sxpnun = -255 * Exploit.GetCharge();
        Render.Rect(g7wT3llvd9[0] / 2 - 6, g7wT3llvd9[1] / 2 + (w5pUccszmf - pmEzw8s9ph) * 39, 13, 4, [0, 0, 0, 22]), Render.GradientRect(g7wT3llvd9[0] / 2 - 5, g7wT3llvd9[1] / 2 + (w5pUccszmf - pmEzw8s9ph) * 40, (Exploit.GetCharge() + 0.1) * 10, 2, 1, [kf65Sxpnun, 255, 0, 70], [kf65Sxpnun, 255, 0, 200]);
    }
    UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', 'rlxcord antibruteforce') && getDropdownValue(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Features to display'), 0) && (pmEzw8s9ph += 1, Render.String(g7wT3llvd9[0] / 2, g7wT3llvd9[1] / 2 + (w5pUccszmf - pmEzw8s9ph) * 10 + 20, 1, 'RLX ANTIBRUTE', [255, 255, 0, 255], 3)), UI.IsHotkeyActive('Rage', 'General', 'Force safe point') && getDropdownValue(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Features to display'), 3) && (pmEzw8s9ph += 1, Render.String(g7wT3llvd9[0] / 2, g7wT3llvd9[1] / 2 + (w5pUccszmf - pmEzw8s9ph) * 10 + 20, 1, 'SAFE', [0, 255, 255, 255], 3)), UI.IsHotkeyActive('Rage', 'Exploits', 'Hide shots') && getDropdownValue(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Features to display'), 2) && (pmEzw8s9ph += 1, Render.String(g7wT3llvd9[0] / 2, g7wT3llvd9[1] / 2 + (w5pUccszmf - pmEzw8s9ph) * 10 + 20, 1, 'HIDE', [155, 255, 155, 255], 3)), UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', 'Override minimum dmg key') && getDropdownValue(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Features to display'), 4) && (pmEzw8s9ph += 1, Render.String(g7wT3llvd9[0] / 2, g7wT3llvd9[1] / 2 + (w5pUccszmf - pmEzw8s9ph) * 10 + 20, 1, 'DMG: 5', [255, 128, 0, 255], 3));
}

function DrawDangerSigns() {
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Draw danger signs')) return;
    var m4tBfzjxaj = Entity.GetEnemies();
    for (i = 0; i < m4tBfzjxaj.length; i++) {
        if (!Entity.IsValid(m4tBfzjxaj[i])) continue;
        if (!Entity.IsAlive(m4tBfzjxaj[i])) continue;
        if (Entity.IsDormant(m4tBfzjxaj[i])) continue;
        var s3dJsfb69x = Entity.GetRenderBox(m4tBfzjxaj[i]),
            ztFkpbbm5w = s3dJsfb69x[3] - s3dJsfb69x[1];
        ztFkpbbm5w /= 2, ztFkpbbm5w += s3dJsfb69x[1];
        if (IsHoldingGrenade(m4tBfzjxaj[i])) DrawDanger(ztFkpbbm5w, s3dJsfb69x[2] - 45, [255, 255, 0, 255]);
        if (Entity.GetName(Entity.GetWeapon(m4tBfzjxaj[i])) == 'zeus x27') DrawDanger(ztFkpbbm5w, s3dJsfb69x[2] - 45, [255, 0, 0, 255]);
    }
}

function DrawIndicators() {
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Draw HEAD/BAIM flags')) return;
    var veK5kwzgtz = Global.GetScreenSize();
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable head/baim conditions')) return;
    var jaPkk6ralb = Entity.GetEnemies();
    for (i = 0; i < jaPkk6ralb.length; i++) {
        if (!Entity.IsValid(jaPkk6ralb[i])) continue;
        if (!Entity.IsAlive(jaPkk6ralb[i])) continue;
        if (Entity.IsDormant(jaPkk6ralb[i])) continue;
        var zhKrw6f8bt = Entity.GetRenderBox(jaPkk6ralb[i]),
            ef39Trvdnd = zhKrw6f8bt[3] - zhKrw6f8bt[1];
        ef39Trvdnd /= 2, ef39Trvdnd += zhKrw6f8bt[1];
        switch (info[jaPkk6ralb[i]]) {
            case 'HEAD':
                Render.StringCustom(ef39Trvdnd, zhKrw6f8bt[2] - 25, 1, info[jaPkk6ralb[i]], [215, 255, 150, 255], font);
                break;
            case 'DEFAULT':
                Render.StringCustom(ef39Trvdnd, zhKrw6f8bt[2] - 25, 1, info[jaPkk6ralb[i]], [255, 255, 255, 255], font);
                break;
            case 'AIR':
                Render.StringCustom(ef39Trvdnd, zhKrw6f8bt[2] - 25, 1, info[jaPkk6ralb[i]], [0, 255, 255, 255], font);
                break;
            case 'CROUCH':
                Render.StringCustom(ef39Trvdnd, zhKrw6f8bt[2] - 25, 1, info[jaPkk6ralb[i]], [199, 145, 18, 255], font);
                break;
            case 'LETHAL':
                Render.StringCustom(ef39Trvdnd, zhKrw6f8bt[2] - 25, 1, info[jaPkk6ralb[i]], [63, 133, 252, 255], font);
                break;
            case 'SLOW':
                Render.StringCustom(ef39Trvdnd, zhKrw6f8bt[2] - 25, 1, info[jaPkk6ralb[i]], [63, 133, 252, 255], font);
                break;
            case 'X2':
                Render.StringCustom(ef39Trvdnd, zhKrw6f8bt[2] - 25, 1, info[jaPkk6ralb[i]], [0, 128, 240, 255], font);
                break;
            case 'WAITING':
                Render.StringCustom(ef39Trvdnd, zhKrw6f8bt[2] - 25, 1, info[jaPkk6ralb[i]], [255, 125, 255, 255], font);
                break;
            case 'STANDING':
                Render.StringCustom(ef39Trvdnd, zhKrw6f8bt[2] - 25, 1, info[jaPkk6ralb[i]], [155, 255, 252, 255], font);
                break;
            case 'SHOT':
                Render.StringCustom(ef39Trvdnd, zhKrw6f8bt[2] - 25, 1, info[jaPkk6ralb[i]], [255, 255, 150, 255], font);
                break;
            case 'OVERRIDE':
                Render.StringCustom(ef39Trvdnd, zhKrw6f8bt[2] - 25, 1, info[jaPkk6ralb[i]], [255, 125, 255, 255], font);
                break;
        }
        if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Draw SAFE flags') && safeTargets[jaPkk6ralb[i]]) Render.StringCustom(ef39Trvdnd, zhKrw6f8bt[2] - 35, 1, 'SAFE', [222, 171, 255, 255], font);
    }
}

function GetHitboxName(evKqwxhb4t) {
    var y3f8X63yvb = '';
    switch (evKqwxhb4t) {
        case 0:
            y3f8X63yvb = 'Head';
            break;
        case 1:
            y3f8X63yvb = 'Neck';
            break;
        case 2:
            y3f8X63yvb = 'Pelvis';
            break;
        case 3:
            y3f8X63yvb = 'Body';
            break;
        case 4:
            y3f8X63yvb = 'Thorax';
            break;
        case 5:
            y3f8X63yvb = 'Chest';
            break;
        case 6:
            y3f8X63yvb = 'Upper chest';
            break;
        case 7:
            y3f8X63yvb = 'Left thigh';
            break;
        case 8:
            y3f8X63yvb = 'Right thigh';
            break;
        case 9:
            y3f8X63yvb = 'Left calf';
            break;
        case 10:
            y3f8X63yvb = 'Right calf';
            break;
        case 11:
            y3f8X63yvb = 'Left foot';
            break;
        case 12:
            y3f8X63yvb = 'Right foot';
            break;
        case 13:
            y3f8X63yvb = 'Left hand';
            break;
        case 14:
            y3f8X63yvb = 'Right hand';
            break;
        case 15:
            y3f8X63yvb = 'Left upper arm';
            break;
        case 16:
            y3f8X63yvb = 'Left forearm';
            break;
        case 17:
            y3f8X63yvb = 'Right upper arm';
            break;
        case 18:
            y3f8X63yvb = 'Right forearm';
            break;
        default:
            y3f8X63yvb = 'Generic';
    }
    return y3f8X63yvb;
}

function RagebotLogs() {
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Ragebot fire logs')) return;
    target = Event.GetInt('target_index'), targetName = Entity.GetName(target), hitbox = Event.GetInt('hitbox'), hitchance = Event.GetInt('hitchance'), safepoint = Event.GetInt('safepoint'), exploit = Event.GetInt('exploit'), log = '[RLXcord] Fired shot at ' + targetName + ' (' + target + ')' + ' | Hitbox: ' + GetHitboxName(hitbox) + ' | Hitchance: ' + hitchance + ' | Safepoint: ' + safepoint + ' | Exploit: ' + exploit + ' | Flag: ' + info[target], log +=
    Cheat.PrintColor([0, 255, 0, 255], log);
}

function SafepointOnLimbs() {
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Safe point on limbs')) return;
    Ragebot.ForceHitboxSafety(12), Ragebot.ForceHitboxSafety(11), Ragebot.ForceHitboxSafety(10), Ragebot.ForceHitboxSafety(9);
}

function OverrideMinimumDamage() {
    if (!UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', 'Override minimum dmg key')) return;
    var cp6Ltv8wnn = Entity.GetEnemies();
    value = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum damage');
    for (i = 0; i < cp6Ltv8wnn.length; i++) {
        Ragebot.ForceTargetMinimumDamage(cp6Ltv8wnn[i], value), info[cp6Ltv8wnn[i]] = 'OVERRIDE';
    }
}

function ForceConditions() {
    AimForHeadIfShooting();
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable head/baim conditions')) return;
    if (UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', 'Wait for on shot backtrack')) return;
    if (UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', 'Override minimum dmg key')) return;
    var V8qNuq84rc = Entity.GetEnemies(),
        PkZ4ghbrnb = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Inaccurate desync delta'),
        ZtFkpbbm5w = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Force HEAD conditions'),
        WmCgbk9d4e = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Force BAIM conditions'),
        UmRt42tnhj = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Force SAFEPOINT conditions');
    for (i = 0; i < V8qNuq84rc.length; i++) {
        if (!Entity.IsValid(V8qNuq84rc[i])) continue;
        if (!Entity.IsAlive(V8qNuq84rc[i])) continue;
        if (Entity.IsDormant(V8qNuq84rc[i])) continue;
        mode = '', info[V8qNuq84rc[i]] = 'DEFAULT', safeTargets[V8qNuq84rc[i]] = ![];
        var H6tZwk68kz = Ragebot.GetTarget();
        getDropdownValue(UmRt42tnhj, 0) && IsLethal(V8qNuq84rc[i]) && (safeTargets[V8qNuq84rc[i]] = !![], Ragebot.ForceTargetSafety(V8qNuq84rc[i]));
        if (getDropdownValue(UmRt42tnhj, 1) && IsSlowWalking(V8qNuq84rc[i])) {
            if ('JteSA' !== 'edsJT') safeTargets[V8qNuq84rc[i]] = !![], Ragebot.ForceTargetSafety(V8qNuq84rc[i]);
            else {
                function Y3f8X63yvb() {
                    info[i] = '', safeTargets[i] = ![];
                }
            }
        }
        getDropdownValue(UmRt42tnhj, 3) && IsInAir(V8qNuq84rc[i]) && (safeTargets[V8qNuq84rc[i]] = !![], Ragebot.ForceTargetSafety(V8qNuq84rc[i]));
        getDropdownValue(UmRt42tnhj, 2) && IsStanding(V8qNuq84rc[i]) && !IsInAir(V8qNuq84rc[i]) && (safeTargets[V8qNuq84rc[i]] = !![], Ragebot.ForceTargetSafety(V8qNuq84rc[i]));
        getDropdownValue(UmRt42tnhj, 4) && IsCrouch(V8qNuq84rc[i]) && (safeTargets[V8qNuq84rc[i]] = !![], Ragebot.ForceTargetSafety(V8qNuq84rc[i]));
        if (AttemptTwoShotKill(V8qNuq84rc[i]) == !![] && UI.GetValue('Misc', 'JAVASCRIPT', 'Predict doubletap damage')) {
            if ('MyrKE' === 'wfdVn') {
                function XrDafysm8y() {
                    AntiAim.SetRealOffset(caa_real - caa_fake + caa_realyaw_offset), caa_fake < caa_fyaw_offset_val && (caa_fyaw_offset_val = caa_fake), caa_use_ey ? AntiAim.SetLBYOffset(caa_real - caa_fyaw_offset_val) : AntiAim.SetLBYOffset(caa_real + caa_fake - caa_fyaw_offset_val * 2);
                }
            } else {
                info[V8qNuq84rc[i]] = 'X2';
                continue;
            }
        }
        if (getDropdownValue(WmCgbk9d4e, 0) && IsLethal(V8qNuq84rc[i])) {
            if ('CBMCX' !== 'OXnBO') {
                if (H6tZwk68kz == V8qNuq84rc[i]) ForceBaim(V8qNuq84rc[i]);
                info[V8qNuq84rc[i]] = 'LETHAL';
                continue;
            } else {
                function VeK5kwzgtz() {
                    H6tZwk68kz = Ragebot.GetTarget(), value = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Hitchance'), Ragebot.ForceTargetHitchance(H6tZwk68kz, value);
                }
            }
        }
        if (getDropdownValue(ZtFkpbbm5w, 3) && firedThisTick[V8qNuq84rc[i]] == !![]) {
            ForceHead(V8qNuq84rc[i]), info[V8qNuq84rc[i]] = 'SHOT';
            continue;
        }
        if (getDropdownValue(WmCgbk9d4e, 1) && IsSlowWalking(V8qNuq84rc[i])) {
            if (H6tZwk68kz == V8qNuq84rc[i]) ForceBaim(V8qNuq84rc[i]);
            info[V8qNuq84rc[i]] = 'SLOW';
            continue;
        }
        if (getDropdownValue(WmCgbk9d4e, 3) && IsInAir(V8qNuq84rc[i])) {
            if (H6tZwk68kz == V8qNuq84rc[i]) ForceBaim(V8qNuq84rc[i]);
            info[V8qNuq84rc[i]] = 'AIR';
            continue;
        }
        if (getDropdownValue(WmCgbk9d4e, 2) && IsStanding(V8qNuq84rc[i]) && !IsInAir(V8qNuq84rc[i])) {
            if (H6tZwk68kz == V8qNuq84rc[i]) ForceBaim(V8qNuq84rc[i]);
            info[V8qNuq84rc[i]] = 'STANDING';
            continue;
        }
        if (getDropdownValue(WmCgbk9d4e, 4) && IsCrouch(V8qNuq84rc[i])) {
            if (H6tZwk68kz == V8qNuq84rc[i]) ForceBaim(V8qNuq84rc[i]);
            info[V8qNuq84rc[i]] = 'CROUCH';
            continue;
        }
        if (getDropdownValue(ZtFkpbbm5w, 1) && IsInAir(V8qNuq84rc[i])) {
            ForceHead(V8qNuq84rc[i]), info[V8qNuq84rc[i]] = 'AIR';
            continue;
        }
        if (getDropdownValue(ZtFkpbbm5w, 0) && GetMaxDesync(V8qNuq84rc[i]) < PkZ4ghbrnb && !IsInAir(V8qNuq84rc[i])) {
            ForceHead(V8qNuq84rc[i]), info[V8qNuq84rc[i]] = 'HEAD';
            continue;
        }
        if (getDropdownValue(ZtFkpbbm5w, 2) && IsCrouchTerrorist(V8qNuq84rc[i])) {
            ForceHead(V8qNuq84rc[i]), info[V8qNuq84rc[i]] = 'CROUCH';
            continue;
        }
        DisableBaim();
    }
}

function Draw() {
    font == null && (font = Render.AddFont('Tahoma', 7, 700));
    if (UI.IsMenuOpen()) {
        if (getDropdownValue(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Force HEAD conditions'), 1)) UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Force BAIM conditions', setDropdownValue(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Force BAIM conditions'), 3, ![]));
        if (getDropdownValue(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Force HEAD conditions'), 2)) UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Force BAIM conditions', setDropdownValue(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Force BAIM conditions'), 4, ![]));
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Inverter arrows', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Indicators') ? !![] : ![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Inverter arrows color', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Indicators') ? !![] : ![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Force HEAD conditions', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable head/baim conditions') ? !![] : ![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Force BAIM conditions', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable head/baim conditions') ? !![] : ![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Force SAFEPOINT conditions', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable head/baim conditions') ? !![] : ![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Save FPS', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable head/baim conditions') ? !![] : ![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Use highest possible damage', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable head/baim conditions') ? !![] : ![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Draw predicted damage', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Indicators') ? !![] : ![]), delta = ![], getDropdownValue(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Force HEAD conditions'), 0) && UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable head/baim conditions') && (delta = !![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Inaccurate desync delta', delta), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Draw HEAD/BAIM flags', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Indicators') ? !![] : ![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Draw SAFE flags', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Indicators') ? !![] : ![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Draw danger signs', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Indicators') ? !![] : ![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Features to display', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Indicators') ? !![] : ![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Predict doubletap damage', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable head/baim conditions') ? !![] : ![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'Hitchance', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Jump scout/revolver hitchance') ? !![] : ![]), UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', 'No scope hitchance', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Override no scope hitchance') ? !![] : ![]);
    }
    AimForHeadIfShooting();
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'rlxcord')) return;
    if (!Entity.IsValid(Entity.GetLocalPlayer())) return;
    if (!Entity.IsAlive(Entity.GetLocalPlayer())) return;
    DrawIndicators(), DrawToggles(), DrawDynamicDamage(), DrawDangerSigns();
}

function CreateMove() {
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'rlxcord')) return;
    if (!Entity.IsValid(Entity.GetLocalPlayer())) return;
    if (!Entity.IsAlive(Entity.GetLocalPlayer())) return;
    AimForHeadIfShooting(), ForceConditions(), SetHitchanceInAir(), ReversedFreestanding(), SafepointOnLimbs(), WaitForOnShot(), OverrideMinimumDamage(), DodgeBruteforce(), NoScopeHitchance();
}

function FrameNetUpdateStart() {
    UI.GetValue('Misc', 'JAVASCRIPT', 'Instant doubletap') && (Exploit.OverrideTolerance(0), Exploit.OverrideShift(16), shouldDisable = !![]), !UI.GetValue('Misc', 'JAVASCRIPT', 'Instant doubletap') && shouldDisable == !![] && (Exploit.OverrideTolerance(1), Exploit.OverrideShift(16), shouldDisable = ![]);
}

function ClearData() {
    firedThisTick = [], storedShotTime = [], info = [];
}

function Main() {
    for (i = 0; i < 64; i++) {
        info[i] = '', safeTargets[i] = ![];
    }
    Cheat.RegisterCallback('CreateMove', 'CreateMove'), Cheat.RegisterCallback('Draw', 'Draw'), Cheat.RegisterCallback('ragebot_fire', 'RagebotLogs'), Cheat.RegisterCallback('round_start', 'ClearData'), Cheat.RegisterCallback('FRAME_NET_UPDATE_START', 'FrameNetUpdateStart');
}
Main();