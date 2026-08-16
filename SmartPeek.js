UI.AddHotkey('Smart Peek');
UI.AddDropdown('Smart Peek Options', ['Peek Fake', 'Peek Real']);
UI.AddHotkey('Smart Fake');
UI.AddHotkey('Smart Freestand');
UI.AddHotkey('Low Delta AA');
UI.AddHotkey('Legit AA');

function indicators() {
    if (!World.GetServerString()) {
        return
    };
    if (CanUse3 && UI.GetValue('Script items', 'Enable Indicators') == 1 && UI.GetValue('Script items', 'Enable AntiAim & Indicators') == 1) {
        const _0xf303x3f = Math['sin'](Math['abs'](-Math['PI'] + (Globals.Curtime() * (1 / 0.75)) % (Math['PI'] * 2))) * 255;
        const _0xf303x40 = Math['sin'](Math['abs'](-Math['PI'] + (Globals.Curtime() * (1 / 0.75)) % (Math['PI'] * 2))) * 155;
        const _0xf303x41 = Math['sin'](Math['abs'](-Math['PI'] + (Globals.Curtime() * (1 / 0.75)) % (Math['PI'] * 2))) * 55;
        var _0xf303x43 = Exploit.GetCharge();
        if (UI.IsHotkeyActive('Script items', 'Smart Peek')) {
            aa_state = 'SMART PEEK'
        } else {
            if (UI.IsHotkeyActive('Script items', 'Smart Fake')) {
                aa_state = 'SMART FAKE'
            } else {
                if (UI.IsHotkeyActive('Script items', 'Smart Freestand')) {
                    aa_state = 'FREESTAND'
                } else {
                    if (UI.IsHotkeyActive('Script items', 'Low Delta AA')) {
                        aa_state = 'LOW DELTA'
                    } else {
                        if (UI.IsHotkeyActive('Script items', 'Legit AA')) {
                            aa_state = 'PEGADINHA DO LEGIT AA'
                        } else {
                            aa_state = 'ANTI-URINE'
                        }
                    }
                }
            }
        };
        if (UI.IsHotkeyActive('Rage', 'GENERAL', 'Exploits', 'Hide shots')) {
            aa_state2 = 'ANTI-CONA';
            aa_color2 = [128, 255, 0, 255]
        } else {
            aa_state2 = 'ANTI-CONA';
            aa_color2 = [150, 150, 150, 255]
        };
        switch (aa_state) {
        case 'SMART PEEK':
            aa_color = [51, 255, 255, 255];
            break;
        case 'SMART FAKE':
            aa_color = [178, 102, 255, 255];
            break;
        case 'FREESTAND':
            aa_color = [104, 203, 0, 255];
            break;
        case 'LOW DELTA':
            aa_color = [245, 200, 100, 255];
            break;
        case 'LEGIT AA':
            aa_color = [255, 102, 178, 255];
            break;
        default:
            aa_color = [255, 0, 0, 255];
            break
        };
        Render.String(screen_size[0] / 2 - _0xf303x48[0] / 2 + 2, screen_size[1] / 2 + 80 + _0xf303x48[1] / 2 + 2, 0, 'ENDLESS-YAW', [255, 236, 236, _0xf303x41], 7);
        Render.String(screen_size[0] / 2 - _0xf303x48[0] / 2 + 1, screen_size[1] / 2 + 80 + _0xf303x48[1] / 2 + 1, 0, 'ENDLESS-YAW', [255, 236, 236, _0xf303x40], 7);
        Render.String(screen_size[0] / 2 - _0xf303x48[0] / 2, screen_size[1] / 2 + 80 + _0xf303x48[1] / 2, 0, 'ENDLES-YAW', [255, 236, 236, _0xf303x3f], 7);
        Render.String(screen_size[0] / 2 - _0xf303x49[0] / 2 + 2, screen_size[1] / 2 + 100 + _0xf303x49[1] / 2 + 2, 0, aa_state, [aa_color[0], aa_color[1], aa_color[2], 55], 7);
        Render.String(screen_size[0] / 2 - _0xf303x49[0] / 2 + 1, screen_size[1] / 2 + 100 + _0xf303x49[1] / 2 + 1, 0, aa_state, [aa_color[0], aa_color[1], aa_color[2], 155], 7);
        Render.String(screen_size[0] / 2 - _0xf303x49[0] / 2, screen_size[1] / 2 + 100 + _0xf303x49[1] / 2, 0, aa_state, aa_color, 7);
        Render.String(screen_size[0] / 2 - _0xf303x4b[0] / 2 + 2, screen_size[1] / 2 + 120 + _0xf303x4b[1] / 2 + 2, 0, 'DOUBLE-PICAS', _0xf303x42 ? _0xf303x43 == 1 ? [128, 255, 0, 55] : [255, 0, 0, _0xf303x41] : [255, 0, 0, _0xf303x41], 7);
        Render.String(screen_size[0] / 2 - _0xf303x4b[0] / 2 + 1, screen_size[1] / 2 + 120 + _0xf303x4b[1] / 2 + 1, 0, 'DOUBLE-PICAS', _0xf303x42 ? _0xf303x43 == 1 ? [128, 255, 0, 155] : [255, 0, 0, _0xf303x40] : [255, 0, 0, _0xf303x40], 7);
        Render.String(screen_size[0] / 2 - _0xf303x4b[0] / 2, screen_size[1] / 2 + 120 + _0xf303x4b[1] / 2, 0, 'DOUBLE-PICAS', _0xf303x42 ? _0xf303x43 == 1 ? [128, 255, 0, 255] : [255, 0, 0, _0xf303x3f] : [255, 0, 0, _0xf303x3f], 7);
        Render.String(screen_size[0] / 2 - _0xf303x4a[0] / 2 + 2, screen_size[1] / 2 + 140 + _0xf303x4a[1] / 2 + 2, 0, aa_state2, [aa_color2[0], aa_color2[1], aa_color2[2], 55], 7);
        Render.String(screen_size[0] / 2 - _0xf303x4a[0] / 2 + 1, screen_size[1] / 2 + 140 + _0xf303x4a[1] / 2 + 1, 0, aa_state2, [aa_color2[0], aa_color2[1], aa_color2[2], 155], 7);
        Render.String(screen_size[0] / 2 - _0xf303x4a[0] / 2, screen_size[1] / 2 + 140 + _0xf303x4a[1] / 2, 0, aa_state2, aa_color2, 7);
        Render.String(screen_size[0] / 2 - _0xf303x4c[0] / 2 + 2, screen_size[1] / 2 + 160 + _0xf303x4c[1] / 2 + 2, 0, 'CORPO', _0xf303x45 ? [128, 255, 0, 55] : [150, 150, 150, 55], 7);
        Render.String(screen_size[0] / 2 - _0xf303x4c[0] / 2 + 1, screen_size[1] / 2 + 160 + _0xf303x4c[1] / 2 + 1, 0, 'CORPO', _0xf303x45 ? [128, 255, 0, 155] : [150, 150, 150, 155], 7);
        Render.String(screen_size[0] / 2 - _0xf303x4c[0] / 2, screen_size[1] / 2 + 160 + _0xf303x4c[1] / 2, 0, 'CORPO', _0xf303x45 ? [128, 255, 0, 255] : [150, 150, 150, 255], 7);
        Render.String(screen_size[0] / 2 - _0xf303x4e[0] / 2 + 2, screen_size[1] / 2 + 180 + _0xf303x4e[1] / 2 + 2, 0, 'ANTI-CONA', _0xf303x46 ? [128, 255, 0, 55] : [150, 150, 150, 55], 7);
        Render.String(screen_size[0] / 2 - _0xf303x4e[0] / 2 + 1, screen_size[1] / 2 + 180 + _0xf303x4e[1] / 2 + 1, 0, 'ANTI-CONA', _0xf303x46 ? [128, 255, 0, 155] : [150, 150, 150, 155], 7);
        Render.String(screen_size[0] / 2 - _0xf303x4e[0] / 2, screen_size[1] / 2 + 180 + _0xf303x4e[1] / 2, 0, 'ANTI-CONA', _0xf303x46 ? [128, 255, 0, 255] : [150, 150, 150, 255], 7);
        Render.String(screen_size[0] / 2 - _0xf303x4f[0] / 2 + 2, screen_size[1] / 2 + 200 + _0xf303x4f[1] / 2 + 2, 0, 'DMG', _0xf303x47 ? [128, 255, 0, 55] : [150, 150, 150, 55], 7);
        Render.String(screen_size[0] / 2 - _0xf303x4f[0] / 2 + 1, screen_size[1] / 2 + 200 + _0xf303x4f[1] / 2 + 1, 0, 'DMG', _0xf303x47 ? [128, 255, 0, 155] : [150, 150, 150, 155], 7);
        Render.String(screen_size[0] / 2 - _0xf303x4f[0] / 2, screen_size[1] / 2 + 200 + _0xf303x4f[1] / 2, 0, 'DMG', _0xf303x47 ? [128, 255, 0, 255] : [150, 150, 150, 255], 7)
    }
}

function dmg_override() {
    if (UI.IsHotkeyActive('Script items', 'Dmg override')) {
        UI.SetValue('Rage', 'GENERAL', 'Targeting', 'Minimum damage', UI.GetValue('Script items', 'Default override'));
        UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', UI.GetValue('Script items', 'Pistol override'));
        UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', UI.GetValue('Script items', 'Heavy pistol override'));
        UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', UI.GetValue('Script items', 'Scout override'));
        UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', UI.GetValue('Script items', 'AWP override'));
        UI.SetValue('Rage', 'AUTOSNIPER', 'Targeting', 'Minimum damage', UI.GetValue('Script items', 'Auto override'))
    } else {
        UI.SetValue('Rage', 'GENERAL', 'Targeting', 'Minimum damage', cache[0]);
        UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', cache[1]);
        UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', cache[2]);
        UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', cache[3]);
        UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', cache[4]);
        UI.SetValue('Rage', 'AUTOSNIPER', 'Targeting', 'Minimum damage', cache[5])
    }
}

function on_unload() {
    UI.SetValue('Rage', 'GENERAL', 'Targeting', 'Minimum damage', cache[0]);
    UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', cache[1]);
    UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', cache[2]);
    UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', cache[3]);
    UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', cache[4]);
    UI.SetValue('Rage', 'AUTOSNIPER', 'Targeting', 'Minimum damage', cache[5])
}

function handle_visibility() {
    if (CanUse1) {
        if (UI.GetValue('Script items', 'Enable AntiAim & Indicators') == 1 && CanUse3) {
            UI.SetEnabled('Script items', 'Smart Peek', true);
            UI.SetEnabled('Script items', 'Smart Peek Options', true);
            UI.SetEnabled('Script items', 'Smart Fake', true);
            UI.SetEnabled('Script items', 'Smart Freestand', true);
            UI.SetEnabled('Script items', 'Low Delta AA', true);
            UI.SetEnabled('Script items', 'Legit AA', true);
        };
        if (CanUse3) {
            UI.SetEnabled('Script items', 'Enable AntiAim & Indicators', true)
        };
        if (!CanUse2) {}
    };
    if (!CanUse1) {
        UI.SetEnabled('Script items', 'Smart Peek', false);
        UI.SetEnabled('Script items', 'Smart Peek Options', false);
        UI.SetEnabled('Script items', 'Smart Fake', false);
        UI.SetEnabled('Script items', 'Smart Freestand', false);
        UI.SetEnabled('Script items', 'Low Delta AA', false);
        UI.SetEnabled('Script items', 'Legit AA', false);
    }
}
var huesos = Globals.Realtime();

function AA() {
    if (CanUse3) {
        if (UI.IsHotkeyActive('Script items', 'Low Delta AA')) {
            AntiAim.SetOverride(1);
            var _0xf303x71 = -10;
            var _0xf303x72 = 0;
            var _0xf303x73 = 1;
            var _0xf303x74 = 32;
            var _0xf303x75 = 15;
            var _0xf303x76 = _0xf303x73 ? _0xf303x74 : (_0xf303x74 * 2);
            AntiAim.SetFakeOffset(_0xf303x72);
            if (_0xf303x71 > 0) {
                AntiAim.SetRealOffset(_0xf303x72 - _0xf303x71 + _0xf303x76);
                if (_0xf303x71 < _0xf303x75) {
                    _0xf303x75 = _0xf303x71
                };
                _0xf303x73 ? AntiAim.SetLBYOffset(_0xf303x72 - _0xf303x75) : AntiAim.SetLBYOffset(_0xf303x72 + _0xf303x71 - _0xf303x75 * 2)
            } else {
                if (_0xf303x71 > _0xf303x75) {
                    _0xf303x75 = _0xf303x71
                };
                AntiAim.SetRealOffset(_0xf303x72 - _0xf303x71 - _0xf303x76);
                _0xf303x73 ? AntiAim.SetLBYOffset(_0xf303x72 + _0xf303x75) : AntiAim.SetLBYOffset(_0xf303x72 + _0xf303x71 + _0xf303x75 * 2)
            }
        } else {
            AntiAim.SetOverride(0)
        };
        if (UI.IsHotkeyActive('Script items', 'Legit AA')) {
            UI.SetValue('Misc', 'PERFORMANCE & INFORMATION', 'Information', 'Restrictions', 0);
            UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset', 180);
            UI.SetValue('Anti-Aim', 'Extra', 'Pitch', 0);
            yaw_cache = 0
        } else {
            UI.SetValue('Misc', 'PERFORMANCE & INFORMATION', 'Information', 'Restrictions', 1);
            UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset', yaw_cache);
            UI.SetValue('Anti-Aim', 'Extra', 'Pitch', 1)
        };
        if (UI.IsHotkeyActive('Script items', 'Smart Fake')) {
            UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'At targets', 1)
        } else {
            UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'At targets', 0)
        };
        if (UI.IsHotkeyActive('Script items', 'Smart Freestand')) {
            UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Auto direction', 1)
        } else {
            UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Auto direction', 0)
        }
    }
}

function shadow(_0xf303x5f, y, _0xf303xd8, _0xf303x5d, _0xf303xd9, _0xf303x5c, _0xf303x6b, _0xf303xda) {
    if (_0xf303xd9) {
        Render.StringCustom(_0xf303x5f + ((_0xf303xda / 7.17)), y + ((_0xf303xda / 7.17)), _0xf303xd8, _0xf303x5d, [0, 0, 0, 255], _0xf303x5c);
        Render.StringCustom(_0xf303x5f, y, _0xf303xd8, _0xf303x5d, _0xf303x6b, _0xf303x5c)
    } else {
        Render.String(_0xf303x5f + ((_0xf303xda / 7.17)), y + ((_0xf303xda / 7.17)), _0xf303xd8, _0xf303x5d, [0, 0, 0, 255], _0xf303xda);
        Render.String(_0xf303x5f, y, _0xf303xd8, _0xf303x5d, _0xf303x6b, _0xf303xda)
    }
}
const global_print = Global['Print'],
    global_print_chat = Global['PrintChat'],
    global_print_color = Global['PrintColor'],
    global_register_callback = Global['RegisterCallback'],
    global_execute_command = Global['ExecuteCommand'],
    global_frame_stage = Global['FrameStage'],
    global_tickcount = Global['Tickcount'],
    global_tickrate = Global['Tickrate'],
    global_tick_interval = Global['TickInterval'],
    global_curtime = Global['Curtime'],
    global_realtime = Global['Realtime'],
    global_frametime = Global['Frametime'],
    global_latency = Global['Latency'],
    global_get_view_angles = Global['GetViewAngles'],
    global_set_view_angles = Global['SetViewAngles'],
    global_get_map_name = Global['GetMapName'],
    global_is_key_pressed = Global['IsKeyPressed'],
    global_get_screen_size = Global['GetScreenSize'],
    global_get_cursor_position = Global['GetCursorPosition'],
    global_play_sound = Global['PlaySound'],
    global_play_microphone = Global['PlayMicrophone'],
    global_stop_microphone = Global['StopMicrophone'],
    global_get_username = Global['GetUsername'],
    global_set_clan_tag = Global['SetClanTag'],
    globals_tickcount = Globals['Tickcount'],
    globals_tickrate = Globals['Tickrate'],
    globals_tick_interval = Globals['TickInterval'],
    globals_curtime = Globals['Curtime'],
    globals_realtime = Globals['Realtime'],
    globals_frametime = Globals['Frametime'],
    sound_play = Sound['Play'],
    sound_play_microphone = Sound['PlayMicrophone'],
    sound_stop_microphone = Sound['StopMicrophone'],
    cheat_get_username = Cheat['GetUsername'],
    cheat_register_callback = cheat_register_callback = new Proxy(Cheat.RegisterCallback, {
        apply: function (_0xf303x169, _0xf303x169, _0xf303x16a) {
            switch (_0xf303x16a[0]) {
            case 'paint':
                Cheat.RegisterCallback('Draw', _0xf303x16a[1]);
                break;
            case 'create_move':
                Cheat.RegisterCallback('CreateMove', _0xf303x16a[1]);
                break;
            case 'fsn':
                Cheat.RegisterCallback('FrameStageNotify', _0xf303x16a[1]);
                break;
            default:
                Cheat.RegisterCallback(_0xf303x16a[0], _0xf303x16a[1]);
                break
            }
        }
    }),
    cheat_execute_command = Cheat['ExecuteCommand'],
    cheat_frame_stage = Cheat['FrameStage'],
    cheat_print = Cheat['Print'],
    cheat_print_chat = Cheat['PrintChat'],
    cheat_print_color = Cheat['PrintColor'],
    local_latency = Local['Latency'],
    local_get_view_angles = Local['GetViewAngles'],
    local_set_view_angles = Local['SetViewAngles'],
    local_set_clan_tag = Local['SetClanTag'],
    local_get_real_yaw = Local['GetRealYaw'],
    local_get_fake_yaw = Local['GetFakeYaw'],
    local_get_spread = Local['GetSpread'],
    local_get_inaccuracy = Local['GetInaccuracy'],
    world_get_map_name = World['GetMapName'],
    world_get_server_string = World['GetServerString'],
    input_get_cursor_position = Input['GetCursorPosition'],
    input_is_key_pressed = Input['IsKeyPressed'],
    render_string = Render['String'],
    render_text_size = Render['TextSize'],
    render_line = Render['Line'],
    render_rect = Render['Rect'],
    render_filled_rect = Render['FilledRect'],
    render_gradient_rect = Render['GradientRect'],
    render_circle = Render['Circle'],
    render_filled_circle = Render['FilledCircle'],
    render_polygon = Render['Polygon'],
    render_world_to_screen = Render['WorldToScreen'],
    render_add_font = Render['AddFont'],
    render_find_font = Render['FindFont'],
    render_string_custom = Render['StringCustom'],
    render_textured_rect = Render['TexturedRect'],
    render_add_texture = Render['AddTexture'],
    render_text_size_custom = Render['TextSizeCustom'],
    render_get_screen_size = Render['GetScreenSize'],
    ui_get_value = UI['GetValue'],
    ui_set_value = UI['SetValue'],
    ui_add_checkbox = UI['AddCheckbox'],
    ui_add_slider_int = UI['AddSliderInt'],
    ui_add_slider_float = UI['AddSliderFloat'],
    ui_add_hotkey = UI['AddHotkey'],
    ui_add_label = UI['AddLabel'],
    ui_add_dropdown = UI['AddDropdown'],
    ui_add_multi_dropdown = UI['AddMultiDropdown'],
    ui_add_color_picker = UI['AddColorPicker'],
    ui_add_textbox = UI['AddTextbox'],
    ui_set_enabled = UI['SetEnabled'],
    ui_get_string = UI['GetString'],
    ui_get_color = UI['GetColor'],
    ui_set_color = UI['SetColor'],
    ui_is_hotkey_active = UI['IsHotkeyActive'],
    ui_toggle_hotkey = UI['ToggleHotkey'],
    ui_is_menu_open = UI['IsMenuOpen'],
    convar_get_int = Convar['GetInt'],
    convar_set_int = Convar['SetInt'],
    convar_get_float = Convar['GetFloat'],
    convar_set_float = Convar['SetFloat'],
    convar_get_string = Convar['GetString'],
    convar_set_string = Convar['SetString'],
    event_get_int = Event['GetInt'],
    event_get_float = Event['GetFloat'],
    event_get_string = Event['GetString'],
    entity_get_entities = Entity['GetEntities'],
    entity_get_entities_by_class_i_d = Entity['GetEntitiesByClassID'],
    entity_get_players = Entity['GetPlayers'],
    entity_get_enemies = Entity['GetEnemies'],
    entity_get_teammates = Entity['GetTeammates'],
    entity_get_local_player = Entity['GetLocalPlayer'],
    entity_get_game_rules_proxy = Entity['GetGameRulesProxy'],
    entity_get_entity_from_user_i_d = Entity['GetEntityFromUserID'],
    entity_is_teammate = Entity['IsTeammate'],
    entity_is_enemy = Entity['IsEnemy'],
    entity_is_bot = Entity['IsBot'],
    entity_is_local_player = Entity['IsLocalPlayer'],
    entity_is_valid = Entity['IsValid'],
    entity_is_alive = Entity['IsAlive'],
    entity_is_dormant = Entity['IsDormant'],
    entity_get_class_i_d = Entity['GetClassID'],
    entity_get_class_name = Entity['GetClassName'],
    entity_get_name = Entity['GetName'],
    entity_get_weapon = Entity['GetWeapon'],
    entity_get_weapons = Entity['GetWeapons'],
    entity_get_render_origin = Entity['GetRenderOrigin'],
    entity_get_prop = Entity['GetProp'],
    entity_set_prop = Entity['SetProp'],
    entity_get_hitbox_position = Entity['GetHitboxPosition'],
    entity_get_eye_position = Entity['GetEyePosition'],
    trace_line = Trace['Line'],
    trace_bullet = Trace['Bullet'],
    usercmd_set_movement = UserCMD['SetMovement'],
    usercmd_get_movement = UserCMD['GetMovement'],
    usercmd_set_angles = UserCMD['SetAngles'],
    usercmd_force_jump = UserCMD['ForceJump'],
    usercmd_force_crouch = UserCMD['ForceCrouch'],
    antiaim_get_override = AntiAim['GetOverride'],
    antiaim_set_override = AntiAim['SetOverride'],
    antiaim_set_real_offset = AntiAim['SetRealOffset'],
    antiaim_set_fake_offset = AntiAim['SetFakeOffset'],
    antiaim_set_l_b_y_offset = AntiAim['SetLBYOffset'],
    exploit_get_charge = Exploit['GetCharge'],
    exploit_recharge = Exploit['Recharge'],
    exploit_disable_recharge = Exploit['DisableRecharge'],
    exploit_enable_recharge = Exploit['EnableRecharge'],
    ragebot_override_minimum_damage = Ragebot['OverrideMinimumDamage'],
    ragebot_override_hitchance = Ragebot['OverrideHitchance'],
    ragebot_override_accuracy_boost = Ragebot['OverrideAccuracyBoost'],
    ragebot_override_multipoint_scale = Ragebot['OverrideMultipointScale'],
    ragebot_force_safety = Ragebot['ForceSafety'];
var menu = {
    _class: 'BetterUI'
};
const menu_spacer = '                                                                                  ';
menu['concat'] = function (_0xf303x16d, _0xf303x16e) {
    var _0xf303x16f = [];
    for (var _0xf303x170 in _0xf303x16d) {
        _0xf303x16f['push'](_0xf303x16d[_0xf303x170])
    };
    _0xf303x16f['push'](_0xf303x16e);
    return _0xf303x16f
};
menu['label'] = function (_0xf303x171) {
    UI.AddLabel(_0xf303x171)
};
menu['call'] = function (_0xf303x172, _0xf303xa1, _0xf303x171, _0xf303x173) {
    const _0xf303x174 = _0xf303xa1 + menu_spacer + _0xf303x171;
    var _0xf303x175 = [_0xf303x174];
    const _0xf303x176 = {
        path: ['Misc', 'JAVASCRIPT', 'Script items', _0xf303x174]
    };
    if (_0xf303x173 != null) {
        for (var _0xf303xc8 = 0; _0xf303xc8 < _0xf303x173['length']; _0xf303xc8++) {
            _0xf303x175['push'](_0xf303x173[_0xf303xc8])
        }
    };
    _0xf303x172['apply'](null, _0xf303x175);
    return _0xf303x176
};
menu['reference'] = function (_0xf303x177) {
    const _0xf303x176 = {
        path: _0xf303x177
    };
    return _0xf303x176
};
menu['get'] = function (_0xf303x178) {
    if (!(_0xf303x178['path'])) {
        throw new Error('[Menu] This element doesn\'t exist!')
    };
    return UI['GetValue']['apply'](null, _0xf303x178['path'])
};
menu['get_hotkey'] = function (_0xf303x178) {
    if (!(_0xf303x178['path'])) {
        throw new Error('[Menu] This element doesn\'t exist!')
    };
    return UI['IsHotkeyActive']['apply'](_0xf303x178['path'])
};
menu['get_color'] = function (_0xf303x178) {
    if (!(_0xf303x178['path'])) {
        throw new Error('[Menu] This element doesn\'t exist!')
    };
    return UI['GetColor']['apply'](null, _0xf303x178['path'])
};
menu['set'] = function (_0xf303x178, _0xf303xa2) {
    if (!(_0xf303x178['path'])) {
        throw new Error('[Menu] This element doesn\'t exist!')
    };
    const _0xf303x173 = _0xf303x178;
    UI['SetValue']['apply'](null, this['concat'](_0xf303x173['path'], _0xf303xa2))
};
menu['set_color'] = function (_0xf303x178, _0xf303x6b) {
    if (!(_0xf303x178['path'])) {
        throw new Error('[Menu] This element doesn\'t exist!')
    };
    const _0xf303x173 = _0xf303x178;
    UI['SetColor']['apply'](null, this['concat'](_0xf303x173['path'], _0xf303x6b))
};
menu['toggle'] = function (_0xf303x178) {
    if (!(_0xf303x178['path'])) {
        throw new Error('[Menu] This element doesn\'t exist!')
    };
    UI['ToggleHotkey']['apply'](null, _0xf303x178['path'])
};
menu['visibility'] = function (_0xf303x178, _0xf303x179) {
    if (!(_0xf303x178['path'])) {
        throw new Error('[Menu] This element doesn\'t exist!')
    };
    const _0xf303x173 = _0xf303x178;
    UI['SetEnabled']['apply'](null, this['concat'](_0xf303x173['path'], _0xf303x179))
};
var vector = {
    _class: 'vector'
};
vector['new'] = function (_0xf303x17b) {
    return {
        x: _0xf303x17b[0],
        y: _0xf303x17b[1],
        z: _0xf303x17b[2]
    }
};
vector['operate'] = function (_0xf303x17c, _0xf303x17d, _0xf303x17e) {
    switch (_0xf303x17e) {
    case '+':
        return {
            x: _0xf303x17c['x'] + _0xf303x17d['x'], y: _0xf303x17c['y'] + _0xf303x17d['y'], z: _0xf303x17c['z'] + _0xf303x17d['z']
        };
    case '-':
        return {
            x: _0xf303x17c['x'] - _0xf303x17d['x'], y: _0xf303x17c['y'] - _0xf303x17d['y'], z: _0xf303x17c['z'] - _0xf303x17d['z']
        };
    case '*':
        return {
            x: _0xf303x17c['x'] * _0xf303x17d['x'], y: _0xf303x17c['y'] * _0xf303x17d['y'], z: _0xf303x17c['z'] * _0xf303x17d['z']
        };
    case '/':
        return {
            x: _0xf303x17c['x'] / _0xf303x17d['x'], y: _0xf303x17c['y'] / _0xf303x17d['y'], z: _0xf303x17c['z'] / _0xf303x17d['z']
        };
    default:
        throw new Error('[Vector] Invalid operation type.')
    }
};
vector['length2d'] = function (_0xf303x17c) {
    return Math['sqrt'](_0xf303x17c['x'] * _0xf303x17c['x'] + _0xf303x17c['y'] * _0xf303x17c['y'])
};
vector['angles'] = function (_0xf303x17c) {
    return {
        x: -Math['atan2'](_0xf303x17c['z'], this['length2d'](_0xf303x17c)) * 180 / Math['PI'],
        y: Math['atan2'](_0xf303x17c['y'], _0xf303x17c['x']) * 180 / Math['PI'],
        z: 0
    }
};
vector['fov_to'] = function (_0xf303x17f, _0xf303x180, _0xf303x181) {
    const _0xf303x182 = this['angles'](this['operate'](_0xf303x180, _0xf303x17f, '-'));
    const _0xf303x183 = this['new']([Math['abs'](_0xf303x181['x'] - _0xf303x182['x']), Math['abs'](_0xf303x181['y'] % 360 - _0xf303x182['y'] % 360) % 360, 0]);
    if (_0xf303x183['y'] > 180) {
        _0xf303x183['y'] = 360 - _0xf303x183['y']
    };
    return this['length2d'](_0xf303x183)
};
vector['to_array'] = function (_0xf303x17c) {
    return [_0xf303x17c['x'], _0xf303x17c['y'], _0xf303x17c['z']]
};

function normalize_yaw(_0xf303xb0) {
    var _0xf303x185 = _0xf303xb0;
    if (_0xf303x185 < -180) {
        _0xf303x185 += 360
    };
    if (_0xf303x185 > 180) {
        _0xf303x185 -= 360
    };
    return _0xf303x185
}
var plugin = {
    _info: {},
    last_hit_lby: [],
    last_target_visibility: false,
    last_override_time: globals_curtime()
};
const ref_inverter = menu['reference'](['Anti-Aim', 'Fake angles', 'Inverter']);
const ref_bodyflip = menu['reference'](['Anti-Aim', 'Fake angles', 'Inverter flip']);
const ref_inverter_legit = menu['reference'](['Anti-Aim', 'Legit Anti-Aim', 'Direction key']);
const ref_ragebot = menu['reference'](['Rage', 'GENERAL', 'General', 'Enabled']);

function update_anti_aim_state(state) {
    if (UI.GetValue('Rage', 'GENERAL', 'General', 'Enabled')) {
        if (UI.IsHotkeyActive('Anti-Aim', 'Fake angles', 'Inverter') !== state) {
            UI.ToggleHotkey('Anti-Aim', 'Fake angles', 'Inverter')
        };
        return
    };
    state = (state + 1) % 2;
    if (menu['get_hotkey'](ref_inverter_legit) !== state) {
        menu['toggle'](ref_inverter_legit)
    }
}

function get_closest_target() {
    const _0xf303x18d = entity_get_enemies();
    const _0xf303x18e = entity_get_local_player();
    const _0xf303x17b = {
        id: null,
        fov: 180
    };
    for (var _0xf303xc8 = 0; _0xf303xc8 < _0xf303x18d['length']; _0xf303xc8++) {
        const _0xf303x18f = _0xf303x18d[_0xf303xc8];
        const _0xf303x180 = vector['new'](entity_get_hitbox_position(_0xf303x18f, 0)),
            _0xf303x17f = vector['new'](entity_get_eye_position(_0xf303x18e));
        const _0xf303x182 = vector['new'](local_get_view_angles());
        const _0xf303x190 = vector['fov_to'](_0xf303x17f, _0xf303x180, _0xf303x182);
        if (_0xf303x190 < _0xf303x17b['fov']) {
            _0xf303x17b['id'] = _0xf303x18f;
            _0xf303x17b['fov'] = _0xf303x190
        }
    };
    return _0xf303x17b['id']
}

function get_target_visibility() {
    const target = get_closest_target();
    if (!target || !entity_is_valid(target)) {
        return false
    };
    if (entity_is_dormant(target)) {
        return false
    };
    const _0xf303x18e = entity_get_local_player();
    var _0xf303x17f = vector['new'](entity_get_eye_position(_0xf303x18e)),
        _0xf303x192 = vector['new'](entity_get_prop(_0xf303x18e, 'CBasePlayer', 'm_vecVelocity[0]')),
        _0xf303x180 = entity_get_hitbox_position(target, 0);
    _0xf303x192 = vector['operate'](_0xf303x192, vector['new']([0.25, 0.25, 0.25]), '*');
    _0xf303x17f = vector['operate'](_0xf303x17f, _0xf303x192, '+');
    const _0xf303x193 = trace_line(_0xf303x18e, vector['to_array'](_0xf303x17f), _0xf303x180)[0];
    return _0xf303x193 === target
}

function get_optimal_angle() {
    const _0xf303x195 = UI.GetValue('Script items', 'Smart Peek Options');
    const _0xf303x18e = entity_get_local_player();
    const _0xf303x17f = vector['new'](entity_get_render_origin(_0xf303x18e));
    var _0xf303x196 = local_get_view_angles()[1];
    var _0xf303x17b = {
        left: 0,
        right: 0
    };
    for (var _0xf303x197 = _0xf303x196 - 90; _0xf303x197 <= _0xf303x196 + 90; _0xf303x197 += 30) {
        if (_0xf303x197 === _0xf303x196) {
            continue
        };
        const _0xf303xc9 = _0xf303x197 * Math['PI'] / 180;
        const _0xf303x198 = vector['operate'](_0xf303x17f, vector['new']([256 * Math['cos'](_0xf303xc9), 256 * Math['sin'](_0xf303xc9), 0]), '+');
        const _0xf303x199 = trace_line(_0xf303x18e, vector['to_array'](_0xf303x17f), vector['to_array'](_0xf303x198));
        const _0xf303x19a = _0xf303x197 < _0xf303x196 ? 'left' : 'right';
        _0xf303x17b[_0xf303x19a] += _0xf303x199[1]
    };
    _0xf303x17b['left'] /= 3;
    _0xf303x17b['right'] /= 3;
    if (_0xf303x17b['left'] > _0xf303x17b['right']) {
        return _0xf303x195 === 0 ? 0 : 1
    };
    return _0xf303x195 === 0 ? 1 : 0
}

function update_anti_aim() {
    const _0xf303x18e = entity_get_local_player();
    if (!entity_is_valid(_0xf303x18e) || !entity_is_alive(_0xf303x18e)) {
        return
    };
    const target = get_closest_target();
    if (target == null) {
        update_anti_aim_state(get_optimal_angle());
        return
    };
    if (plugin['last_hit_lby'][target] == null) {
        update_anti_aim_state(get_optimal_angle());
        return
    };
    if (plugin['last_hit_lby'][target] === 0) {
        update_anti_aim_state(1);
        return
    };
    update_anti_aim_state(0);
    return;
    update_anti_aim_state(get_optimal_angle())
}

function do_indicators() {
    const _0xf303x18e = entity_get_local_player();
    if (!entity_is_valid(_0xf303x18e) || !entity_is_alive(_0xf303x18e)) {
        return
    };
    const y = render_get_screen_size()[1];
    const _0xf303x196 = local_get_real_yaw(),
        _0xf303xba = local_get_fake_yaw();
    var _0xf303x183 = Math['round'](normalize_yaw(_0xf303x196 - _0xf303xba) / 2),
        _0xf303x19d = Math['abs'](_0xf303x183);
    if (menu['get'](ref_ragebot)) {
        _0xf303x183 *= -1
    }
}

function on_tick() {
    if (!UI.IsHotkeyActive('Script items', 'Smart Peek')) {
        return
    };
    update_anti_aim()
}

function on_frame() {
    if (!UI.IsHotkeyActive('Script items', 'Smart Peek')) {
        return
    };
    do_indicators()
}

function on_player_hurt1() {
    const _0xf303x18e = entity_get_local_player();
    const _0xf303x8d = entity_get_entity_from_user_i_d(event_get_int('attacker'));
    const _0xf303x1a1 = entity_get_entity_from_user_i_d(event_get_int('userid'));
    if (_0xf303x18e !== _0xf303x8d && _0xf303x18e === _0xf303x1a1) {
        plugin['last_hit_lby'][_0xf303x8d] = UI.IsHotkeyActive('Anti-Aim', 'Fake angles', 'Inverter')
    }
}

function reset() {
    plugin['last_hit_lby'] = []
}
cheat_register_callback('create_move', 'on_tick');
cheat_register_callback('paint', 'on_frame');
cheat_register_callback('player_hurt', 'on_player_hurt1');
cheat_register_callback('player_connect_full', 'reset');
Cheat.RegisterCallback('CreateMove', 'AA');
Cheat.RegisterCallback('CreateMove', 'dmg_override');
Cheat.RegisterCallback('Unload', 'on_unload');
Cheat.RegisterCallback('Draw', 'indicators');