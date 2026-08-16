const global = [], globals = [], sound = [], cheat = [], local = [], world = [], input = [], render = [], ui = [], convar = [], event = [], entity = [], trace = [], usercmd = [], antiaim = [], exploit = [], ragebot = [], material = [];
global.print = Global.Print, global.print_chat = Global.PrintChat, global.print_color = Global.PrintColor, global.register_callback = Global.RegisterCallback, global.execute_command = Global.ExecuteCommand, global.frame_stage = Global.FrameStage, global.tickcount = Global.Tickcount, global.tickrate = Global.Tickrate, global.tick_interval = Global.TickInterval, global.curtime = Global.Curtime, global.realtime = Global.Realtime, global.frametime = Global.Frametime, global.latency = Global.Latency, global.get_view_angles = Global.GetViewAngles, global.set_view_angles = Global.SetViewAngles, global.get_map_name = Global.GetMapName, global.is_key_pressed = Global.IsKeyPressed, global.get_screen_size = Global.GetScreenSize, global.get_cursor_position = Global.GetCursorPosition, global.play_sound = Global.PlaySound, global.play_microphone = Global.PlayMicrophone, global.stop_microphone = Global.StopMicrophone, global.get_username = Global.GetUsername, global.set_clan_tag = Global.SetClanTag, globals.tickcount = Globals.Tickcount, globals.tickrate = Globals.Tickrate, globals.tick_interval = Globals.TickInterval, globals.curtime = Globals.Curtime, globals.realtime = Globals.Realtime, globals.frametime = Globals.Frametime, sound.play = Sound.Play, sound.play_microphone = Sound.PlayMicrophone, sound.stop_microphone = Sound.StopMicrophone, cheat.get_username = Cheat.GetUsername, cheat.register_callback = function (_0xd32cx17, _0xd32cx18) {
  switch (_0xd32cx17) {
    case "create_move":
      Cheat.RegisterCallback("CreateMove", _0xd32cx18);
      break;
    case "paint":
      Cheat.RegisterCallback("Draw", _0xd32cx18);
      break;
    case "fsn":
      Cheat.RegisterCallback("FrameStageNotify", _0xd32cx18);
      break;
    case "shutdown":
      Cheat.RegisterCallback("Unload", _0xd32cx18);
      break;
    default:
      Cheat.RegisterCallback(_0xd32cx17, _0xd32cx18);
      break;
  }
}, cheat.execute_command = Cheat.ExecuteCommand, cheat.frame_stage = Cheat.FrameStage, cheat.print = Cheat.Print, cheat.print_chat = Cheat.PrintChat, cheat.print_color = Cheat.PrintColor, local.latency = Local.Latency, local.get_view_angles = Local.GetViewAngles, local.set_view_angles = Local.SetViewAngles, local.set_clan_tag = Local.SetClanTag, local.get_real_yaw = Local.GetRealYaw, local.get_fake_yaw = Local.GetFakeYaw, local.get_spread = Local.GetSpread, local.get_inaccuracy = Local.GetInaccuracy, world.get_map_name = World.GetMapName, world.get_server_string = World.GetServerString, input.get_cursor_position = Input.GetCursorPosition, input.is_key_pressed = Input.IsKeyPressed, render.string = Render.String, render.text_size = Render.TextSize, render.line = Render.Line, render.rect = Render.Rect, render.filled_rect = Render.FilledRect, render.gradient_rect = Render.GradientRect, render.circle = Render.Circle, render.filled_circle = Render.FilledCircle, render.polygon = Render.Polygon, render.world_to_screen = Render.WorldToScreen, render.add_font = Render.AddFont, render.find_font = Render.FindFont, render.string_custom = Render.StringCustom, render.textured_rect = Render.TexturedRect, render.add_texture = Render.AddTexture, render.text_size_custom = Render.TextSizeCustom, render.get_screen_size = Render.GetScreenSize, ui.get_value = UI.GetValue, ui.set_value = UI.SetValue, ui.add_checkbox = UI.AddCheckbox, ui.add_slider_int = UI.AddSliderInt, ui.add_slider_float = UI.AddSliderFloat, ui.add_hotkey = UI.AddHotkey, ui.add_label = UI.AddLabel, ui.add_dropdown = UI.AddDropdown, ui.add_multi_dropdown = UI.AddMultiDropdown, ui.add_color_picker = UI.AddColorPicker, ui.add_textbox = UI.AddTextbox, ui.set_enabled = UI.SetEnabled, ui.get_string = UI.GetString, ui.get_color = UI.GetColor, ui.set_color = UI.SetColor, ui.is_hotkey_active = UI.IsHotkeyActive, ui.toggle_hotkey = UI.ToggleHotkey, ui.is_menu_open = UI.IsMenuOpen, convar.get_int = Convar.GetInt, convar.set_int = Convar.SetInt, convar.get_float = Convar.GetFloat, convar.set_float = Convar.SetFloat, convar.get_string = Convar.GetString, convar.set_string = Convar.SetString, event.get_int = Event.GetInt, event.get_float = Event.GetFloat, event.get_string = Event.GetString, entity.get_entities = Entity.GetEntities, entity.get_entities_by_class_i_d = Entity.GetEntitiesByClassID, entity.get_players = Entity.GetPlayers, entity.get_enemies = Entity.GetEnemies, entity.get_teammates = Entity.GetTeammates, entity.get_local_player = Entity.GetLocalPlayer, entity.get_game_rules_proxy = Entity.GetGameRulesProxy, entity.get_entity_from_user_i_d = Entity.GetEntityFromUserID, entity.is_teammate = Entity.IsTeammate, entity.is_enemy = Entity.IsEnemy, entity.is_bot = Entity.IsBot, entity.is_local_player = Entity.IsLocalPlayer, entity.is_valid = Entity.IsValid, entity.is_alive = Entity.IsAlive, entity.is_dormant = Entity.IsDormant, entity.get_class_i_d = Entity.GetClassID, entity.get_class_name = Entity.GetClassName, entity.get_name = Entity.GetName, entity.get_weapon = Entity.GetWeapon, entity.get_weapons = Entity.GetWeapons, entity.get_render_origin = Entity.GetRenderOrigin, entity.get_render_box = Entity.GetRenderBox, entity.get_prop = Entity.GetProp, entity.set_prop = Entity.SetProp, entity.get_hitbox_position = Entity.GetHitboxPosition, entity.get_eye_position = Entity.GetEyePosition, trace.line = Trace.Line, trace.bullet = Trace.Bullet, usercmd.set_movement = UserCMD.SetMovement, usercmd.get_movement = UserCMD.GetMovement, usercmd.set_angles = UserCMD.SetAngles, usercmd.force_jump = UserCMD.ForceJump, usercmd.force_crouch = UserCMD.ForceCrouch, antiaim.get_override = AntiAim.GetOverride, antiaim.set_override = AntiAim.SetOverride, antiaim.set_real_offset = AntiAim.SetRealOffset, antiaim.set_fake_offset = AntiAim.SetFakeOffset, antiaim.set_l_b_y_offset = AntiAim.SetLBYOffset, exploit.get_charge = Exploit.GetCharge, exploit.recharge = Exploit.Recharge, exploit.disable_recharge = Exploit.DisableRecharge, exploit.enable_recharge = Exploit.EnableRecharge, ragebot.get_target = Ragebot.GetTarget, ragebot.ignore_target = Ragebot.IgnoreTarget, ragebot.force_target = Ragebot.ForceTarget, ragebot.force_target_safety = Ragebot.ForceTargetSafety, ragebot.force_target_hitchance = Ragebot.ForceTargetHitchance, ragebot.force_target_minimum_damage = Ragebot.ForceTargetMinimumDamage, ragebot.force_hitbox_safety = Ragebot.ForceHitboxSafety, material.create = Material.Create, material.destroy = Material.Destroy, material.get = Material.Get, material.set_key_value = Material.SetKeyValue, material.refresh = Material.Refresh;
var menu = {_class: "BetterUI"};
const menu_spacer = "                                                                                  ";
menu.concat = function (_0xd32cx1b, _0xd32cx1c) {
  var _0xd32cx1d = [];
  for (var _0xd32cx17 in _0xd32cx1b) {
    _0xd32cx1d.push(_0xd32cx1b[_0xd32cx17]);
  }
  ;
  _0xd32cx1d.push(_0xd32cx1c);
  return _0xd32cx1d;
};
menu.label = function (_0xd32cx1e) {
  UI.AddLabel(_0xd32cx1e);
};
menu.call = function (_0xd32cx1f, _0xd32cx20, _0xd32cx1e, _0xd32cx21) {
  const _0xd32cx22 = _0xd32cx20 + menu_spacer + _0xd32cx1e;
  var _0xd32cx23 = [_0xd32cx22];
  const _0xd32cx24 = {path: ["Misc", "JAVASCRIPT", "Script Items", _0xd32cx22]};
  if (_0xd32cx21 != null) {
    for (var _0xd32cx25 = 0; _0xd32cx25 < _0xd32cx21.length; _0xd32cx25++) {
      _0xd32cx23.push(_0xd32cx21[_0xd32cx25]);
    }
  }
  ;
  _0xd32cx1f.apply(null, _0xd32cx23);
  return _0xd32cx24;
};
menu.reference = function (_0xd32cx26) {
  const _0xd32cx24 = {path: _0xd32cx26};
  return _0xd32cx24;
};
menu.get = function (_0xd32cx27) {
  if (!_0xd32cx27.path) {
    throw new Error("[Menu] This element doesn't exist!");
  }
  ;
  return UI.GetValue.apply(null, _0xd32cx27.path);
};
menu.get_hotkey = function (_0xd32cx27) {
  if (!_0xd32cx27.path) {
    throw new Error("[Menu] This element doesn't exist!");
  }
  ;
  return UI.IsHotkeyActive.apply(null, _0xd32cx27.path);
};
menu.get_color = function (_0xd32cx27) {
  if (!_0xd32cx27.path) {
    throw new Error("[Menu] This element doesn't exist!");
  }
  ;
  return UI.GetColor.apply(null, _0xd32cx27.path);
};
menu.set = function (_0xd32cx27, _0xd32cx28) {
  if (!_0xd32cx27.path) {
    throw new Error("[Menu] This element doesn't exist!");
  }
  ;
  const _0xd32cx21 = _0xd32cx27;
  UI.SetValue.apply(null, this.concat(_0xd32cx21.path, _0xd32cx28));
};
menu.set_color = function (_0xd32cx27, _0xd32cx29) {
  if (!_0xd32cx27.path) {
    throw new Error("[Menu] This element doesn't exist!");
  }
  ;
  const _0xd32cx21 = _0xd32cx27;
  UI.SetColor.apply(null, this.concat(_0xd32cx21.path, _0xd32cx29));
};
menu.toggle = function (_0xd32cx27) {
  if (!_0xd32cx27.path) {
    throw new Error("[Menu] This element doesn't exist!");
  }
  ;
  UI.ToggleHotkey.apply(null, _0xd32cx27.path);
};
menu.visibility = function (_0xd32cx27, _0xd32cx2a) {
  if (!_0xd32cx27.path) {
    throw new Error("[Menu] This element doesn't exist!");
  }
  ;
  const _0xd32cx21 = _0xd32cx27;
  UI.SetEnabled.apply(null, this.concat(_0xd32cx21.path, _0xd32cx2a));
};
const distance_in_ft = function (_0xd32cx2c, _0xd32cx2d) {
  const _0xd32cx2e = [_0xd32cx2d[0] - _0xd32cx2c[0], _0xd32cx2d[1] - _0xd32cx2c[1], _0xd32cx2d[2] - _0xd32cx2c[2]];
  return Math.round(Math.sqrt(_0xd32cx2e[0] ** 2 + _0xd32cx2e[1] ** 2 + _0xd32cx2e[2] ** 2) / 12);
};
render.arc = function (_0xd32cx31, y, _0xd32cx33, _0xd32cx34, _0xd32cx35, _0xd32cx36, _0xd32cx37) {
  for (var _0xd32cx25 = _0xd32cx35; _0xd32cx25 < _0xd32cx35 + _0xd32cx36; _0xd32cx25++) {
    const _0xd32cx38 = _0xd32cx25 * Math.PI / 180;
    render.line(_0xd32cx31 + Math.cos(_0xd32cx38) * _0xd32cx33, y + Math.sin(_0xd32cx38) * _0xd32cx33, _0xd32cx31 + Math.cos(_0xd32cx38) * _0xd32cx34, y + Math.sin(_0xd32cx38) * _0xd32cx34, _0xd32cx37);
  }
};
const is_inside_screen = function (_0xd32cx3a) {
  const _0xd32cx3b = render.get_screen_size();
  return _0xd32cx3a[0] > 0 && _0xd32cx3a[1] > 0 && _0xd32cx3a[0] < _0xd32cx3b[0] && _0xd32cx3a[1] < _0xd32cx3b[1];
};
var positions = [];
function import_nades() {
  if (!menu.get(tracer)) {
    return;
  }
  ;
  grenades = entity.get_entities_by_class_i_d(9).concat(entity.get_entities_by_class_i_d(113)).concat(entity.get_entities_by_class_i_d(100));
  for (e in grenades) {
    should_pass = false;
    for (g in positions) {
      if (positions[g][0] == grenades[e]) {
        should_pass = true;
        continue;
      }
    }
    ;
    if (should_pass) {
      continue;
    }
    ;
    positions.push([grenades[e], Globals.Curtime(), [entity.get_render_origin(grenades[e])], Globals.Curtime()]);
  }
}
function render_trails() {
  const _0xd32cx3f = 256, _0xd32cx40 = .1;
  const _0xd32cx29 = menu.get_color(tracer_color);
  for (g in positions) {
    if (globals.curtime() - positions[g][3] > 3 || !entity.is_valid(positions[g][0])) {
      positions.shift();
      continue;
    }
    ;
    if (globals.curtime() - positions[g][1] > _0xd32cx40) {
      if (positions[g][2].length > _0xd32cx3f) {
        positions[g][2].shift();
        positions[g][1] = globals.curtime();
      }
      ;
      positions[g][2].push(entity.get_render_origin(positions[g][0]));
    }
    ;
    for (l in positions[g][2]) {
      pos = render.world_to_screen(positions[g][2][l]);
      if (l > 0) {
        last = render.world_to_screen(positions[g][2][l - 1]);
        render.line(pos[0] - 1, pos[1] - 1, last[0] - 1, last[1] - 1, _0xd32cx29);
        render.line(pos[0] - 1, pos[1] + 1, last[0] - 1, last[1] + 1, _0xd32cx29);
        render.line(pos[0] + 1, pos[1] - 1, last[0] + 1, last[1] - 1, _0xd32cx29);
        render.line(pos[0] + 1, pos[1] + 1, last[0] + 1, last[1] + 1, _0xd32cx29);
        render.line(pos[0], pos[1], last[0], last[1], _0xd32cx29);
      }
      ;
      last = render.world_to_screen(positions[g][2][positions[g][2].length - 1]);
    }
  }
}
function on_paint() {
  if (!menu.get(enable) && !menu.get(tracer)) {
    return;
  }
  ;
  const _0xd32cx42 = entity.get_entities_by_class_i_d(9).concat(entity.get_entities_by_class_i_d(113)).concat(entity.get_entities_by_class_i_d(100));
  const _0xd32cx43 = entity.get_local_player();
  if (!_0xd32cx43) {
    return;
  }
  ;
  if (!entity.is_alive(_0xd32cx43)) {
    const _0xd32cx44 = entity.get_prop(_0xd32cx43, "CBasePlayer", "m_hObserverTarget");
    if (!entity.is_valid(_0xd32cx44)) {
      return;
    }
    ;
    _0xd32cx43 = _0xd32cx44;
  }
  ;
  const _0xd32cx2c = entity.get_eye_position(_0xd32cx43);
  for (var _0xd32cx25 = 0; _0xd32cx25 < _0xd32cx42.length; _0xd32cx25++) {
    const _0xd32cx45 = _0xd32cx42[_0xd32cx25];
    const _0xd32cx2d = entity.get_render_origin(_0xd32cx45);
    const _0xd32cx46 = distance_in_ft(_0xd32cx2c, _0xd32cx2d);
    if (_0xd32cx46 > menu.get(max_dst)) {
      continue;
    }
    ;
    const _0xd32cx47 = render.world_to_screen(_0xd32cx2d);
    const _0xd32cx48 = entity.get_class_i_d(_0xd32cx45) === 9, _0xd32cx49 = entity.get_class_i_d(_0xd32cx45) === 100;
    const trace = Trace.Line(_0xd32cx43, _0xd32cx2c, _0xd32cx2d);
    const _0xd32cx4a = _0xd32cx46 > (_0xd32cx49 ? 15 : 20) || trace[1] < .61;
    if (_0xd32cx48 && entity.get_prop(_0xd32cx45, "CBaseCSGrenadeProjectile", "m_nExplodeEffectTickBegin")) {
      continue;
    }
    ;
    render.filled_circle(_0xd32cx47[0], _0xd32cx47[1] - 50, 30, !_0xd32cx4a ? [225, 20, 20, 175] : [20, 20, 20, 175]);
    render.string(_0xd32cx47[0], _0xd32cx47[1] - 75, 1, "!", [255, 250, 175, 200], 4);
    render.string(_0xd32cx47[0], _0xd32cx47[1] - 40, 1, _0xd32cx46 + " ft", [232, 232, 232, 200], 3);
    if (_0xd32cx49) {
      const time = entity.get_prop(_0xd32cx45, "CInferno", "m_nFireEffectTickBegin") * globals.tick_interval();
      const _0xd32cx4c = Math.min(Math.max((time + 7 - globals.curtime()) / 7, 0), 7);
      render.arc(_0xd32cx47[0], _0xd32cx47[1] - 50, 30, 32, -90, 360 * _0xd32cx4c, [232, 232, 232, 200]);
    }
  }
}
cheat.register_callback("paint", "import_nades");
cheat.register_callback("paint", "render_trails");
cheat.register_callback("paint", "on_paint");
const conr = {log_prefix: "[TRYHARD.JS] ", log_prefix_col: [255, 0, 0, 200], log: function (_0xd32cx4e) {
  Cheat.PrintColor(this.log_prefix_col, this.log_prefix);
  Cheat.Print(_0xd32cx4e + "\n");
}};
const cong = {log_prefix: "[TRYHARD.JS] ", log_prefix_col: [0, 255, 0, 200], log: function (_0xd32cx4e) {
  Cheat.PrintColor(this.log_prefix_col, this.log_prefix);
  Cheat.Print(_0xd32cx4e + "\n");
}};
const conb = {log_prefix: "[TRYHARD.JS] ", log_prefix_col: [0, 0, 255, 200], log: function (_0xd32cx4e) {
  Cheat.PrintColor(this.log_prefix_col, this.log_prefix);
  Cheat.Print(_0xd32cx4e + "\n");
}};
const con = {log_prefix: "", log_prefix_col: [0, 0, 255, 200], log: function (_0xd32cx4e) {
  Cheat.PrintColor(this.log_prefix_col, this.log_prefix);
  Cheat.Print(_0xd32cx4e + "\n");
}};
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("");
con.log("________________________________________________________________________________________________________________________________________");
con.log("");
con.log("  ██████████████  ███████      ██           ██  ███        ███            █            ███████        ██████                           ");
con.log("  ██████████████  ██    ███     ██         ██   ███        ███          ██ ██          ██    ███      ███  ███                         ");
con.log("       ████       ██      ██     ██       ██    ███        ███         ██   ██         ██      ██     ███    ███                       ");
con.log("       ████       ██      ███     ██     ██     ███        ███        ██     ██        ██      ███    ███      ███                     ");
con.log("       ████       ██      ███      ██   ██      ███        ███       ██       ██       ██      ███    ███      ███                     ");
con.log("       ████       █████████         ██ ██       ██████████████      ██         ██      █████████      ███      ███                     ");
con.log("       ████       █████              ███        ███        ███     ███████████████     █████          ███      ███                     ");
con.log("       ████       ██ ████            ███        ███        ███    ██             ██    ██ ████        ███      ███                     ");
con.log("       ████       ██    ████         ███        ███        ███   ██               ██   ██    ████     ███      ███                     ");
con.log("       ████       ██       ███       ███        ███        ███  ██                 ██  ██       ███   ███    ███                       ");
con.log("       ████       ██        ███      ███        ███        ███  ██                 ██  ██        ███  ███  ███                         ");
con.log("       ████       ██         ███     ███        ███        ███  ██                 ██  ██         ███ ██████                           ");
con.log("");
con.log("________________________________________________________________________________________________________________________________________");
con.log("");
conb.log("TRYHARD.JS Toggled");
con.log("");
conr.log("Checking Memberlist...");
con.log("");
UI.AddLabel("Creator : Infinite#1100");
UI.AddLabel("Version 17.1");
UI.AddLabel("Note: Don't Leak Or I will find you");
UI.AddLabel("._.");
UI.AddLabel("________________________________________");
UI.AddLabel("                TRYHARD.JS                ");
var username = Cheat.GetUsername();
Cheat.GetUsername = function () {
  return "";
};
  con.log("");
  conr.log("Building menu...");
  UI.AddCheckbox("Clantag");
  UI.AddLabel("________________________________________");
  UI.AddLabel("                  ANTI AIM");
  UI.AddCheckbox("Disable AA override");
  UI.AddCheckbox("AA Invert Spammer");
  UI.AddCheckbox("Leg Breaker");
  UI.AddSliderInt("Leg Breaker speed", 1, 10);
  UI.AddCheckbox("TP Exploit?");
  UI.AddCheckbox("Deathmatch Godmode");
  UI.AddDropdown("Anti Bruteforce", ["Off", "On Hit", "On Shot"]);
  UI.AddDropdown("Realsync", ["Off", "On"]);
  UI.AddDropdown("Realsync mode", ["Off", "Custom", "Low Delta", "Realsync V3"]);
  UI.AddDropdown("Breaker", ["Off", "Breaker V1", "Breaker V2"]);
  UI.AddLabel("*If toggle Breaker will turn off Realsync");
  UI.AddLabel("(same with opposite)");
  UI.AddLabel("----------------------------------------");
  UI.AddSliderFloat("SWITCH delay", 0, 5);
  UI.AddLabel("----------------------------------------");
  UI.AddLabel("Custom Realsync Builder");
  UI.AddSliderInt("Yaw Offset 1", -180, 180);
  UI.AddSliderInt("Real Offset 1", -90, 90);
  UI.AddSliderInt("LBY Offset 1", -90, 90);
  UI.AddSliderInt("Fake Lag 1", 0, 16);
  UI.AddLabel("----------------------------------------");
  UI.AddSliderInt("Yaw Offset 2", -180, 180);
  UI.AddSliderInt("Real Offset 2", -90, 90);
  UI.AddSliderInt("LBY Offset 2", -90, 90);
  UI.AddSliderInt("Fake Lag 2", 0, 16);
  UI.AddLabel("----------------------------------------");
  UI.AddSliderInt("Yaw Offset 3", -180, 180);
  UI.AddSliderInt("Real Offset 3", -90, 90);
  UI.AddSliderInt("LBY Offset 3", -90, 90);
  UI.AddSliderInt("Fake Lag 3", 0, 16);
  UI.AddLabel("________________________________________");
  UI.AddLabel("          Rage Improvements");
  UI.AddLabel("[Infinite Doubletap]");
  UI.AddLabel("DT AUTOSTOP BUILT-IN");
  UI.AddDropdown("Doubletap", ["Disable", "Normal", "DT no TP stuck", "Balanced", "Custom"]);
  UI.AddLabel("[Custom]");
  UI.AddSliderInt("Double tap tolerance", -17, 17);
  UI.AddSliderInt("Recharge delay", 0, 1e3);
  UI.AddLabel("----------------------------------------");
  UI.AddCheckbox("Safe Revolver");
  UI.AddLabel("----------------------------------------");
  UI.AddSliderInt("Safety after x misses", 1, 6);
  UI.AddLabel("________________________________________");
  UI.AddLabel("                    Visual");
  UI.AddSliderFloat("Aspect Ratio", 0, 5);
  UI.AddLabel("----------------------------------------");
  const enable = menu.call(ui.add_checkbox, "Grenade warning", "gw_enable", []);
  const max_dst = menu.call(ui.add_slider_int, "Maximum distance", "gw_dist", [0, 500]);
  UI.AddLabel("----------------------------------------");
  UI.AddLabel("Onetap V4 Indicators");
  UI.AddMultiDropdown("Onetap indicators", ["Watermark", "Custom nick", "Keybindings"]);
  UI.AddTextbox("Type username");
  UI.AddSliderInt("Keybind words left/right", 0, 100);
  UI.AddSliderInt("Keybind up/down", 0, 1080);
  UI.AddSliderInt("Icon left/right", 0, 100);
  UI.AddLabel("----------------------------------------");
  UI.AddLabel("Bar Indicator");
  UI.AddMultiDropdown("Flags", ["Choke", "Desync", "Height"]);
  UI.AddSliderInt("X", 0, 2e3);
  UI.AddSliderInt("Y", 0, 1e3);
  UI.AddLabel("----------------------------------------");
  UI.AddCheckbox("Enable Indicator");
  UI.AddCheckbox("Enable Fake Bar");
  UI.AddCheckbox("Enable Circle");
  cong.log("Menu Finished");
  con.log("");
  cong.log("Enjoy :)");
;
var lasttime_clantag = 0;
function clantag() {
  var _0xd32cx59 = UI.GetValue("Script Items", "Clantag");
  var _0xd32cx5a = parseInt(Globals.Curtime() * 3);
  if (_0xd32cx5a != lasttime_clantag) {
    if (_0xd32cx59 == 0) {
      Local.SetClanTag("");
    }
    ;
    if (_0xd32cx59 == 1) {
      switch (_0xd32cx5a % 20) {
        case 1:
          {
            Local.SetClanTag(" _________ ");
            break;
          }
          ;
        case 2:
          {
            Local.SetClanTag(" h_____/n ");
            break;
          }
          ;
        case 3:
          {
            Local.SetClanTag(" ha/___an ");
            break;
          }
          ;
        case 4:
          {
            Local.SetClanTag(" hac_/man ");
            break;
          }
          ;
        case 5:
          {
            Local.SetClanTag(" hack_rman");
            break;
          }
          ;
        case 6:
          {
            Local.SetClanTag(" hackurman ");
            break;
          }
          ;
        case 7:
          {
            Local.SetClanTag(" hackurman ");
            break;
          }
          ;
        case 8:
          {
            Local.SetClanTag(" hackurman ");
            break;
          }
          ;
        case 9:
          {
            Local.SetClanTag(" hackurman ");
            break;
          }
          ;
        case 10:
          {
            Local.SetClanTag(" hack_rman ");
            break;
          }
          ;
        case 11:
          {
            Local.SetClanTag(" hac_/man ");
            break;
          }
          ;
        case 12:
          {
            Local.SetClanTag(" ha/___an ");
            break;
          }
          ;
        case 13:
          {
            Local.SetClanTag(" h_____/n ");
            break;
          }
          ;
        case 14:
          {
            Local.SetClanTag(" _________ ");
            break;
          }
      }
    }
  }
  ;
  lasttime_clantag = _0xd32cx5a;
}
Cheat.RegisterCallback("Draw", "clantag");
currentTick = 0;
lastTick = 0;
function godmode() {
  if (!UI.GetValue("Script Items", "Deathmatch Godmode")) {
    return;
  }
  ;
  currentTick = parseInt(Globals.Curtime() * 1e3);
  if (currentTick < 5e3) {
    lastTick = 0;
  }
  ;
  if (World.GetServerString() == "") {
    return;
  }
  ;
  if (!Entity.IsAlive(Entity.GetLocalPlayer())) {
    return;
  }
  ;
  if (currentTick - 100 >= lastTick) {
    Cheat.ExecuteCommand("open_buymenu");
    Cheat.ExecuteCommand("open_buymenu");
    lastTick = currentTick;
  }
}
Cheat.RegisterCallback("Draw", "godmode");
function aa_inverter() {
  if (!UI.GetValue("Script Items", "AA Invert Spammer")) {
    return;
  }
  ;
  currentTick = parseInt(Globals.Curtime() * 6e3);
  if (currentTick < 5e3) {
    lastTick = 0;
  }
  ;
  if (World.GetServerString() == "") {
    return;
  }
  ;
  if (!Entity.IsAlive(Entity.GetLocalPlayer())) {
    return;
  }
  ;
  if (currentTick - 100 >= lastTick) {
    UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
    lastTick = currentTick;
  }
}
Cheat.RegisterCallback("Draw", "aa_inverter");
var old_tick_count = 0;
function draw() {
  if (UI.GetValue("Script items", "Leg Breaker") && Globals.Tickcount() - old_tick_count > UI.GetValue("Script items", "Leg Breaker speed")) {
    if (UI.GetValue("Misc", "GENERAL", "Movement", "Slide walk")) {
      UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 0);
    } else {
      UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 1);
    }
    ;
    old_tick_count = Globals.Tickcount();
  }
}
Cheat.RegisterCallback("Draw", "draw");
function anti_onshot() {
  if (UI.GetValue("Script items", "TP Exploit?")) {
    UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Doubletap");
    UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Hide shots");
    UI.ToggleHotkey("Anti-Aim", "Extra", "Slow walk", 0);
  }
}
Cheat.RegisterCallback("Draw", "anti_onshot");
function disable_override() {
  if (UI.GetValue("Script items", "Disable AA override")) {
    UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Breaker", 0);
    UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync mode", 0);
    UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync", 0);
    AntiAim.SetOverride(0);
  }
}
Cheat.RegisterCallback("Draw", "disable_override");
function GetScriptOption(_0xd32cx20) {
  var _0xd32cx62 = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", _0xd32cx20);
  return _0xd32cx62;
}
function ExtendVector(_0xd32cx66, _0xd32cx67, _0xd32cx68) {
  var _0xd32cx69 = _0xd32cx67 * Math.PI / 180;
  return [_0xd32cx68 * Math.cos(_0xd32cx69) + _0xd32cx66[0], _0xd32cx68 * Math.sin(_0xd32cx69) + _0xd32cx66[1], _0xd32cx66[2]];
}
function VectorAdd(_0xd32cx1b, _0xd32cx1c) {
  return [_0xd32cx1b[0] + _0xd32cx1c[0], _0xd32cx1b[1] + _0xd32cx1c[1], _0xd32cx1b[2] + _0xd32cx1c[2]];
}
function VectorSubtract(_0xd32cx1b, _0xd32cx1c) {
  return [_0xd32cx1b[0] - _0xd32cx1c[0], _0xd32cx1b[1] - _0xd32cx1c[1], _0xd32cx1b[2] - _0xd32cx1c[2]];
}
function VectorMultiply(_0xd32cx1b, _0xd32cx1c) {
  return [_0xd32cx1b[0] * _0xd32cx1c[0], _0xd32cx1b[1] * _0xd32cx1c[1], _0xd32cx1b[2] * _0xd32cx1c[2]];
}
function VectorNormalize(_0xd32cx3a) {
  var _0xd32cx3f = Math.sqrt(_0xd32cx3a[0] * _0xd32cx3a[0] + _0xd32cx3a[1] * _0xd32cx3a[1] + _0xd32cx3a[2] * _0xd32cx3a[2]);
  return [_0xd32cx3a[0] / _0xd32cx3f, _0xd32cx3a[1] / _0xd32cx3f, _0xd32cx3a[2] / _0xd32cx3f];
}
function ClosestPointOnRay(_0xd32cx73, _0xd32cx74, _0xd32cx75) {
  var _0xd32cx76 = VectorSubtract(_0xd32cx73, _0xd32cx74);
  var _0xd32cx77 = VectorSubtract(_0xd32cx75, _0xd32cx74);
  var _0xd32cx3f = Math.sqrt(_0xd32cx77[0] * _0xd32cx77[0] + _0xd32cx77[1] * _0xd32cx77[1] + _0xd32cx77[2] * _0xd32cx77[2]);
  _0xd32cx77 = VectorNormalize(_0xd32cx77);
  var _0xd32cx78 = _0xd32cx77[0] * _0xd32cx76[0] + _0xd32cx77[1] * _0xd32cx76[1] + _0xd32cx77[2] * _0xd32cx76[2];
  if (_0xd32cx78 < 0) {
    return _0xd32cx74;
  }
  ;
  if (_0xd32cx78 > _0xd32cx3f) {
    return _0xd32cx75;
  }
  ;
  return VectorAdd(_0xd32cx74, VectorMultiply(_0xd32cx77, [_0xd32cx78, _0xd32cx78, _0xd32cx78]));
}
function Flip() {
  UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
}
var lastHitTime = 0;
var lastImpactTimes = [0];
var lastImpacts = [[0, 0, 0]];
function OnHurt() {
  if (GetScriptOption("Anti Bruteforce") == 0) {
    return;
  }
  ;
  if (Entity.GetEntityFromUserID(Event.GetInt("userid")) !== Entity.GetLocalPlayer()) {
    return;
  }
  ;
  var _0xd32cx7e = Event.GetInt("hitgroup");
  if (_0xd32cx7e == 1 || _0xd32cx7e == 6 || _0xd32cx7e == 7) {
    var _0xd32cx7f = Global.Curtime();
    if (Math.abs(lastHitTime - _0xd32cx7f) > .5) {
      lastHitTime = _0xd32cx7f;
      Flip();
    }
  }
}
function OnBulletImpact() {
  if (GetScriptOption("Anti Bruteforce") !== 2) {
    return;
  }
  ;
  var _0xd32cx7f = Global.Curtime();
  if (Math.abs(lastHitTime - _0xd32cx7f) < .5) {
    return;
  }
  ;
  var entity = Entity.GetEntityFromUserID(Event.GetInt("userid"));
  var _0xd32cx81 = [Event.GetFloat("x"), Event.GetFloat("y"), Event.GetFloat("z"), _0xd32cx7f];
  var _0xd32cx82;
  if (Entity.IsValid(entity) && Entity.IsEnemy(entity)) {
    if (!Entity.IsDormant(entity)) {
      _0xd32cx82 = Entity.GetEyePosition(entity);
    } else {
      if (Math.abs(lastImpactTimes[entity] - _0xd32cx7f) < .1) {
        _0xd32cx82 = lastImpacts[entity];
      } else {
        lastImpacts[entity] = _0xd32cx81;
        lastImpactTimes[entity] = _0xd32cx7f;
        return;
      }
    }
    ;
    var local = Entity.GetLocalPlayer();
    var _0xd32cx83 = Entity.GetEyePosition(local);
    var _0xd32cx84 = Entity.GetProp(local, "CBaseEntity", "m_vecOrigin");
    var _0xd32cx85 = VectorMultiply(VectorAdd(_0xd32cx83, _0xd32cx84), [.5, .5, .5]);
    var _0xd32cx86 = ClosestPointOnRay(_0xd32cx85, _0xd32cx82, _0xd32cx81);
    var _0xd32cx87 = Math.sqrt((_0xd32cx85[0] - _0xd32cx86[0]) * (_0xd32cx85[0] - _0xd32cx86[0]) + (_0xd32cx85[1] - _0xd32cx86[1]) * (_0xd32cx85[1] - _0xd32cx86[1]) + (_0xd32cx85[2] - _0xd32cx86[2]) * (_0xd32cx85[2] - _0xd32cx86[2]));
    if (_0xd32cx87 < 128) {
      var _0xd32cx88 = Local.GetRealYaw();
      var _0xd32cx89 = Local.GetFakeYaw();
      var _0xd32cx8a = ClosestPointOnRay(_0xd32cx83, _0xd32cx82, _0xd32cx81);
      var _0xd32cx8b = Math.sqrt((_0xd32cx83[0] - _0xd32cx8a[0]) * (_0xd32cx83[0] - _0xd32cx8a[0]) + (_0xd32cx83[1] - _0xd32cx8a[1]) * (_0xd32cx83[1] - _0xd32cx8a[1]) + (_0xd32cx83[2] - _0xd32cx8a[2]) * (_0xd32cx83[2] - _0xd32cx8a[2]));
      var _0xd32cx8c = ClosestPointOnRay(_0xd32cx84, _0xd32cx82, _0xd32cx81);
      var _0xd32cx8d = Math.sqrt((_0xd32cx84[0] - _0xd32cx8c[0]) * (_0xd32cx84[0] - _0xd32cx8c[0]) + (_0xd32cx84[1] - _0xd32cx8c[1]) * (_0xd32cx84[1] - _0xd32cx8c[1]) + (_0xd32cx84[2] - _0xd32cx8c[2]) * (_0xd32cx84[2] - _0xd32cx8c[2]));
      var _0xd32cx8e;
      var _0xd32cx8f;
      var _0xd32cx90;
      if (_0xd32cx87 < _0xd32cx8b && _0xd32cx87 < _0xd32cx8d) {
        _0xd32cx8e = _0xd32cx86;
        _0xd32cx8f = ExtendVector(_0xd32cx86, _0xd32cx88 + 180, 10);
        _0xd32cx90 = ExtendVector(_0xd32cx86, _0xd32cx89 + 180, 10);
      } else {
        if (_0xd32cx8d < _0xd32cx8b) {
          _0xd32cx8e = _0xd32cx8c;
          var _0xd32cx91 = ExtendVector(_0xd32cx86, _0xd32cx88 - 30 + 90, 10);
          var _0xd32cx92 = ExtendVector(_0xd32cx86, _0xd32cx88 - 30 - 90, 10);
          var _0xd32cx93 = ExtendVector(_0xd32cx86, _0xd32cx89 - 30 + 90, 10);
          var _0xd32cx94 = ExtendVector(_0xd32cx86, _0xd32cx89 - 30 - 90, 10);
          if (Math.sqrt((_0xd32cx8c[0] - _0xd32cx91[0]) * (_0xd32cx8c[0] - _0xd32cx91[0]) + (_0xd32cx8c[1] - _0xd32cx91[1]) * (_0xd32cx8c[1] - _0xd32cx91[1]) + (_0xd32cx8c[2] - _0xd32cx91[2]) * (_0xd32cx8c[2] - _0xd32cx91[2])) < Math.sqrt((_0xd32cx8c[0] - _0xd32cx92[0]) * (_0xd32cx8c[0] - _0xd32cx92[0]) + (_0xd32cx8c[1] - _0xd32cx92[1]) * (_0xd32cx8c[1] - _0xd32cx92[1]) + (_0xd32cx8c[2] - _0xd32cx92[2]) * (_0xd32cx8c[2] - _0xd32cx92[2]))) {
            _0xd32cx8f = _0xd32cx91;
          } else {
            _0xd32cx8f = _0xd32cx92;
          }
          ;
          if (Math.sqrt((_0xd32cx8c[0] - _0xd32cx93[0]) * (_0xd32cx8c[0] - _0xd32cx93[0]) + (_0xd32cx8c[1] - _0xd32cx93[1]) * (_0xd32cx8c[1] - _0xd32cx93[1]) + (_0xd32cx8c[2] - _0xd32cx93[2]) * (_0xd32cx8c[2] - _0xd32cx93[2])) < Math.sqrt((_0xd32cx8c[0] - _0xd32cx94[0]) * (_0xd32cx8c[0] - _0xd32cx94[0]) + (_0xd32cx8c[1] - _0xd32cx94[1]) * (_0xd32cx8c[1] - _0xd32cx94[1]) + (_0xd32cx8c[2] - _0xd32cx94[2]) * (_0xd32cx8c[2] - _0xd32cx94[2]))) {
            _0xd32cx90 = _0xd32cx93;
          } else {
            _0xd32cx90 = _0xd32cx94;
          }
        } else {
          _0xd32cx8e = _0xd32cx8a;
          _0xd32cx8f = ExtendVector(_0xd32cx86, _0xd32cx88, 10);
          _0xd32cx90 = ExtendVector(_0xd32cx86, _0xd32cx89, 10);
        }
      }
      ;
      if (Math.sqrt((_0xd32cx8e[0] - _0xd32cx90[0]) * (_0xd32cx8e[0] - _0xd32cx90[0]) + (_0xd32cx8e[1] - _0xd32cx90[1]) * (_0xd32cx8e[1] - _0xd32cx90[1]) + (_0xd32cx8e[2] - _0xd32cx90[2]) * (_0xd32cx8e[2] - _0xd32cx90[2])) < Math.sqrt((_0xd32cx8e[0] - _0xd32cx8f[0]) * (_0xd32cx8e[0] - _0xd32cx8f[0]) + (_0xd32cx8e[1] - _0xd32cx8f[1]) * (_0xd32cx8e[1] - _0xd32cx8f[1]) + (_0xd32cx8e[2] - _0xd32cx8f[2]) * (_0xd32cx8e[2] - _0xd32cx8f[2]))) {
        lastHitTime = _0xd32cx7f;
        Flip();
      }
    }
    ;
    lastImpacts[entity] = _0xd32cx81;
    lastImpactTimes[entity] = _0xd32cx7f;
  }
}
Cheat.RegisterCallback("player_hurt", "OnHurt");
Cheat.RegisterCallback("bullet_impact", "OnBulletImpact");
var aa = 1;
var aad = 1;
var lasttime = Global.Realtime();
var realtime = Global.Realtime();
var yawoffset = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
var jitteroffset = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
var de = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "SWITCH delay");
var yawnewoffset;
function V1() {
  UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Breaker", 0);
  AntiAim.SetOverride(1);
  AntiAim.SetFakeOffset(UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Yaw Offset 1"));
  AntiAim.SetRealOffset(UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Real Offset 1"));
  AntiAim.SetLBYOffset(UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "LBY Offset 1"));
  UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Fake Lag 1"));
}
function V2() {
  AntiAim.SetFakeOffset(UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Yaw Offset 2"));
  AntiAim.SetRealOffset(UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Real Offset 2"));
  AntiAim.SetLBYOffset(UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "LBY Offset 2"));
  UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Fake Lag 2"));
}
function V3() {
  AntiAim.SetFakeOffset(UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Yaw Offset 3"));
  AntiAim.SetRealOffset(UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Real Offset 3"));
  AntiAim.SetLBYOffset(UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "LBY Offset 3"));
  UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Fake Lag 3"));
}
function S1() {
  AntiAim.SetOverride(1);
  AntiAim.SetFakeOffset(0);
  AntiAim.SetRealOffset(-15);
  AntiAim.SetLBYOffset(15);
  Render.StringCustom(x / 2 + 1, y / 2 + 51 + barvalue, 5, "LOW DELTA", [0, 0, 0, 180], font);
  Render.StringCustom(x / 2, y / 2 + 50 + barvalue, 5, "LOW DELTA", [120, 255, 200, 255], font);
}
function S2() {
  AntiAim.SetOverride(1);
  AntiAim.SetFakeOffset(0);
  AntiAim.SetRealOffset(-20);
  AntiAim.SetLBYOffset(20);
}
function A1() {
  UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Breaker", 0);
  AntiAim.SetOverride(1);
  AntiAim.SetFakeOffset(-5);
  AntiAim.SetRealOffset(-30);
  AntiAim.SetLBYOffset(40);
  UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 14);
}
function A2() {
  UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Breaker", 0);
  AntiAim.SetFakeOffset(-5);
  AntiAim.SetRealOffset(-30);
  AntiAim.SetLBYOffset(40);
  UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 15);
}
function A3() {
  UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Breaker", 0);
  AntiAim.SetFakeOffset(5);
  AntiAim.SetRealOffset(-30);
  AntiAim.SetLBYOffset(60);
  UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 16);
}
function BR1() {
  UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync mode", 0);
  yawnewoffset = Math.floor(Math.random() * -9 + -10);
  UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
  UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
  UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 0);
  UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", true);
  UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
  UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 15);
}
function BR2() {
  UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync mode", 0);
  yawnewoffset = Math.floor(Math.random() * -9 + -15);
  UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
  UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
  UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 1);
  UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", false);
  UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 5);
}
function BR3() {
  UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync mode", 0);
  yawnewoffset = Math.floor(Math.random() * 1 + -10);
  UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
  UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);
  UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
  UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
  UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 9);
}
function BRR1() {
  UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync mode", 0);
  yawnewoffset = Math.floor(Math.random() * -23 + -10);
  UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
  UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
  UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);
  UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", true);
  UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
  UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 15);
}
function BRR2() {
  UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync mode", 0);
  yawnewoffset = Math.floor(Math.random() * 10 + -16);
  UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
  UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", false);
  UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);
  UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
  UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 5);
}
function BRR3() {
  UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync mode", 0);
  yawnewoffset = Math.floor(Math.random() * -5 + 2);
  UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
  UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);
  UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
  UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
  UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 9);
}
function lagsyncmain() {
  mode = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync mode");
  breakermenu = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Breaker");
  if (mode == 0) {
    lagsyncdisable();
  }
  ;
  if (mode == 1) {
    lagsyncv2();
  }
  ;
  if (mode == 2) {
    lagsyncv1();
  }
  ;
  if (mode == 3) {
    lagsyncv3();
  }
  ;
  if (breakermenu == 0) {
    breakerdisable();
  }
  ;
  if (breakermenu == 1) {
    breakerv1();
  }
  ;
  if (breakermenu == 2) {
    breakerv2();
  }
}
function breakerv1() {
  status = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync");
  de = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "SWITCH delay");
  realtime = Global.Realtime();
  if (realtime - lasttime >= de) {
    if (status == 1) {
      aad = aa + 1;
      if (aad > 3) {
        aad = 1;
      }
      ;
      aa = aad;
    }
    ;
    if (aa == 1) {
      BR1();
    }
    ;
    if (aa == 2) {
      BR2();
    }
    ;
    if (aa == 3) {
      BR3();
    }
    ;
    lasttime = realtime;
  }
  ;
  if (realtime < lasttime) {
    lasttime = Global.Realtime();
    realtime = Global.Realtime();
  }
}
function lagsyncdisable() {}
function breakerv2() {
  status = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync");
  de = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "SWITCH delay");
  realtime = Global.Realtime();
  if (realtime - lasttime >= de) {
    if (status == 1) {
      aad = 1 + Math.floor(Math.random() * 3);
      aa = aad;
    }
    ;
    if (status == 2) {
      aad = aa + 1;
      if (aad > 3) {
        aad = 1;
      }
      ;
      aa = aad;
    }
    ;
    if (aa == 1) {
      BRR1();
    }
    ;
    if (aa == 2) {
      BRR2();
    }
    ;
    if (aa == 3) {
      BRR3();
    }
    ;
    lasttime = realtime;
  }
  ;
  if (realtime < lasttime) {
    lasttime = Global.Realtime();
    realtime = Global.Realtime();
  }
}
function breakerdisable() {}
function lagsyncv1() {
  status = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync");
  de = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "SWITCH delay");
  realtime = Global.Realtime();
  if (realtime - lasttime >= de) {
    if (status == 1) {
      aad = aa + 1;
      if (aad > 2) {
        aad = 1;
      }
      ;
      aa = aad;
    }
    ;
    if (aa == 1) {
      S1();
    }
    ;
    if (aa == 2) {
      S2();
    }
    ;
    lasttime = realtime;
  }
  ;
  if (realtime < lasttime) {
    lasttime = Global.Realtime();
    realtime = Global.Realtime();
  }
}
function lagsyncv2() {
  status = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync");
  de = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "SWITCH delay");
  realtime = Global.Realtime();
  if (realtime - lasttime >= de) {
    if (status == 1) {
      aad = aa + 1;
      if (aad > 3) {
        aad = 1;
      }
      ;
      aa = aad;
    }
    ;
    if (aa == 1) {
      V1();
    }
    ;
    if (aa == 2) {
      V2();
    }
    ;
    if (aa == 3) {
      V3();
    }
    ;
    lasttime = realtime;
  }
  ;
  if (realtime < lasttime) {
    lasttime = Global.Realtime();
    realtime = Global.Realtime();
  }
}
function lagsyncv3() {
  status = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync");
  de = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "SWITCH delay");
  realtime = Global.Realtime();
  if (realtime - lasttime >= de) {
    if (status == 1) {
      aad = 1 + Math.floor(Math.random() * 3);
      aa = aad;
    }
    ;
    if (status == 2) {
      aad = aa + 1;
      if (aad > 3) {
        aad = 1;
      }
      ;
      aa = aad;
    }
    ;
    if (aa == 1) {
      A1();
    }
    ;
    if (aa == 2) {
      A2();
    }
    ;
    if (aa == 3) {
      A3();
    }
    ;
    lasttime = realtime;
  }
  ;
  if (realtime < lasttime) {
    lasttime = Global.Realtime();
    realtime = Global.Realtime();
  }
}
function main() {
  status = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Realsync");
  de = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "SWITCH delay");
  realtime = Global.Realtime();
  if (realtime - lasttime >= de) {
    if (status == 1) {
      aad = 1 + Math.floor(Math.random() * 3);
      aa = aad;
    }
    ;
    if (status == 2) {
      aad = aa + 1;
      if (aad > 3) {
        aad = 1;
      }
      ;
      aa = aad;
    }
    ;
    if (aa == 1) {
      S1();
    }
    ;
    if (aa == 2) {
      S2();
    }
    ;
    if (aa == 3) {
      S3();
    }
    ;
    lasttime = realtime;
  }
  ;
  if (realtime < lasttime) {
    lasttime = Global.Realtime();
    realtime = Global.Realtime();
  }
}
UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "YAW Offset #1", yawoffset);
UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "JITTER Offset #1", jitteroffset);
UI.SetValue("Misc", "JAVASCRIPT", "Script Items", "SWITCH delay", de);
Global.RegisterCallback("Draw", "lagsyncmain");
var time, delay, fillbar, shotsfired;
function EVENT_WEAPON_FIRE() {
  iShotsFired = Event.GetInt("userid");
  iShotsFired_index = Entity.GetEntityFromUserID(iShotsFired);
  if (Entity.GetLocalPlayer() == iShotsFired_index) {
    if (shotsfired == 0) {
      time = Globals.Curtime();
      delay = time + .3;
      fillbar = 0;
    }
  }
}
function HUD_REDRAW() {
  if (UI.GetValue("Rage", "GENERAL", "Exploits", "Doubletap")) {
    font = Render.AddFont("Verdana Bold", 16, 500);
    const _0xd32cxbc = Render.AddFont("Verdana Bold", 7, 100);
    if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap")) {
      curtime = Globals.Curtime();
      if (curtime < delay) {
        fillbar += 1;
        shotsfired = 1;
        if (fillbar > 60) {
          ;
        }
        ;
        Render.StringCustom(Global.GetScreenSize()[0] / 49 + 50, Global.GetScreenSize()[1] - 349 + 0, 1, "Recharging...", [0, 0, 0, 255], font);
        Render.StringCustom(Global.GetScreenSize()[0] / 50 + 50, Global.GetScreenSize()[1] - 350 + 0, 1, "Recharging...", [255, 0, 0, 255], font);
        UI.ToggleHotkey("Rage", "Exploits", "Hide shots");
      } else {
        Render.StringCustom(Global.GetScreenSize()[0] / 49 + 50, Global.GetScreenSize()[1] - 349 + 0, 1, "Charged", [0, 0, 0, 255], font);
        Render.StringCustom(Global.GetScreenSize()[0] / 50 + 50, Global.GetScreenSize()[1] - 350 + 0, 1, "Charged", [0, 255, 0, 255], font);
        shotsfired = 0;
      }
    } else {
      Render.StringCustom(Global.GetScreenSize()[0] / 50 + 50, Global.GetScreenSize()[1] - 350 + 0, 1, "Disabled", [255, 50, 50, 0], font);
    }
  }
}
function can_shift_shot(_0xd32cxbe) {
  var _0xd32cx43 = Entity.GetLocalPlayer();
  var _0xd32cxbf = Entity.GetWeapon(_0xd32cx43);
  var _0xd32cxc0 = UI.IsHotkeyActive("Script items", "Recharge on key");
  if (_0xd32cx43 == null || _0xd32cxbf == null) {
    return false;
  }
  ;
  var _0xd32cxc1 = Entity.GetProp(_0xd32cx43, "CCSPlayer", "m_nTickBase");
  var _0xd32cx7f = Globals.TickInterval() * (_0xd32cxc1 - _0xd32cxbe);
  if (_0xd32cx7f < Entity.GetProp(_0xd32cx43, "CCSPlayer", "m_flNextAttack")) {
    return false;
  }
  ;
  if (_0xd32cx7f < Entity.GetProp(_0xd32cxbf, "CBaseCombatWeapon", "m_flNextPrimaryAttack")) {
    return false;
  }
  ;
  return true;
}
function _TBC_CREATE_MOVE() {
  mode = UI.GetValue("Script items", "Doubletap");
  if (mode == 0) {
    disabled_dt();
  }
  ;
  if (mode == 1) {
    normal_dt();
  }
  ;
  if (mode == 2) {
    no_teleport();
  }
  ;
  if (mode == 3) {
    balanced();
  }
  ;
  if (mode == 4) {
    custom_dt();
  }
}
function disabled_dt() {
  UI.SetValue("Rage", "Exploits", "Doubletap", 0);
}
function normal_dt() {
  UI.SetValue("Rage", "Exploits", "Doubletap", 1);
  UI.SetValue("Rage", "Exploits", "Doubletap instant", 1);
}
function no_teleport() {
  UI.SetValue("Rage", "Exploits", "Doubletap", 1);
  UI.SetValue("Rage", "Exploits", "Doubletap instant", 0);
}
function balanced() {
  var _0xd32cxc7 = Exploit.GetCharge();
  Exploit[(_0xd32cxc7 != 1 ? "Enable" : "Disable") + "Recharge"]();
  Exploit.OverrideTolerance(0);
  Exploit.OverrideShift(14);
  UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", 0);
}
function manual_dt() {
  if (manual_dt_enabled == 1) {
    ;
  }
  ;
  {
    Exploit.Recharge();
  }
  if (manual_dt_enabled == 0) {
    ;
  }
  ;
  {
    Exploit.DisableRecharge()();
  }
}
function custom_dt() {
  var _0xd32cxc7 = Exploit.GetCharge();
  var _0xd32cxca = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Recharge delay");
  Exploit[(_0xd32cxc7 != 1 ? "Enable" : "Disable") + "Recharge"]();
  if (can_shift_shot(_0xd32cxca * .1) && _0xd32cxc7 != 1) {
    Exploit.DisableRecharge();
    Exploit.Recharge();
  }
  ;
  var _0xd32cxcb = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Double tap tolerance");
  Exploit.OverrideTolerance(_0xd32cxcb);
  Exploit.OverrideShift(17 - _0xd32cxcb);
}
function _TBC_UNLOAD() {
  Exploit.EnableRecharge();
}
function Main() {
  Global.RegisterCallback("CreateMove", "_TBC_CREATE_MOVE");
  Global.RegisterCallback("Unload", "_TBC_UNLOAD");
  Global.RegisterCallback("Draw", "HUD_REDRAW");
  Global.RegisterCallback("weapon_fire", "EVENT_WEAPON_FIRE");
}
Main();
var waiting_for_hit = false;
var target_idx = 0;
var tick_count = -1;
var misses = [64];
var safety_ents = [64];
reset_miss_logs();
function on_ragebot_fire() {
  waiting_for_hit = true;
  target_idx = Event.GetInt("target_index");
  tick_count = Globals.Tickcount();
}
function on_player_hurt() {
  var entity = Entity.GetEntityFromUserID(Event.GetInt("userid"));
  if (entity == Entity.GetLocalPlayer()) {
    return;
  }
  ;
  var _0xd32cxd5 = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
  if (_0xd32cxd5 != Entity.GetLocalPlayer()) {
    return;
  }
  ;
  if (entity != target_idx) {
    return;
  }
  ;
  waiting_for_hit = false;
  target_idx = 0;
  tick_count = -1;
}
function on_create_move() {
  var _0xd32cxd7 = 1e3 / Globals.Tickrate();
  var _0xd32cxd8 = 1 + Math.ceil(Local.Latency() * 2 / _0xd32cxd7);
  if (Globals.Tickcount() - tick_count >= _0xd32cxd8 && waiting_for_hit) {
    misses[target_idx]++;
    if (misses[target_idx] >= UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Safety after x misses")) {
      safety_ents[target_idx] = 1;
    }
    ;
    waiting_for_hit = false;
    target_idx = 0;
    tick_count = -1;
  }
  ;
  var _0xd32cxd9 = Ragebot.GetTarget();
  if (_0xd32cxd9 == 0) {
    return;
  }
  ;
  if (safety_ents[_0xd32cxd9] == 1) {
    Ragebot.ForceTargetSafety(_0xd32cxd9);
  }
}
function on_player_death() {
  var _0xd32cxdb = Entity.GetEntityFromUserID(Event.GetInt("userid"));
  reset_specific_miss_logs(_0xd32cxdb);
}
function reset_miss_logs() {
  for (var _0xd32cx25 = 0; _0xd32cx25 < 64; _0xd32cx25++) {
    reset_specific_miss_logs(_0xd32cx25);
  }
}
function reset_specific_miss_logs(_0xd32cxdb) {
  misses[_0xd32cxdb] = 0;
  safety_ents[_0xd32cxdb] = 0;
}
Cheat.RegisterCallback("ragebot_fire", "on_ragebot_fire");
Cheat.RegisterCallback("player_hurt", "on_player_hurt");
Cheat.RegisterCallback("CreateMove", "on_create_move");
Cheat.RegisterCallback("player_death", "on_player_death");
Cheat.RegisterCallback("round_start", "reset_miss_logs");
function aspectratio() {
  menu_val = UI.GetValue("Aspect Ratio");
  string_menu_val = menu_val.toString();
  Convar.SetString("r_aspectratio", string_menu_val);
}
Cheat.RegisterCallback("FrameStageNotify", "aspectratio");
const getmultidrop = function (_0xd32cx28, _0xd32cxe0) {
  const _0xd32cxe1 = 1 << _0xd32cxe0;
  return _0xd32cx28 & _0xd32cxe1 ? true : false;
};
const visible_value = function (_0xd32cxf4, _0xd32cxf5, _0xd32cx20) {
  if (UI.GetValue("Script items", _0xd32cxf4) == _0xd32cxf5) {
    UI.SetEnabled("Script items", _0xd32cx20, 1);
  } else {
    UI.SetEnabled("Script items", _0xd32cx20, 0);
  }
};
const unvisible_value = function (_0xd32cxf4, _0xd32cxf5, _0xd32cx20) {
  if (UI.GetValue("Script items", _0xd32cxf4) == _0xd32cxf5) {
    UI.SetEnabled("Script items", _0xd32cx20, 0);
  } else {
    UI.SetEnabled("Script items", _0xd32cx20, 1);
  }
};
const visible_string = function (_0xd32cxf4, _0xd32cxf8, _0xd32cx20) {
  if (UI.GetString("Script items", _0xd32cxf4) == _0xd32cxf8) {
    UI.SetEnabled("Script items", _0xd32cx20, 1);
  } else {
    UI.SetEnabled("Script items", _0xd32cx20, 0);
  }
};
const unvisible_string = function (_0xd32cxf4, _0xd32cxf8, _0xd32cx20) {
  if (UI.GetString("Script items", _0xd32cxf4) == _0xd32cxf8) {
    UI.SetEnabled("Script items", _0xd32cx20, 0);
  } else {
    UI.SetEnabled("Script items", _0xd32cx20, 1);
  }
};
function otwatermark() {
  var _0xd32cxfb = new Date;
  var _0xd32cxfc = _0xd32cxfb.getHours();
  var _0xd32cxfd = _0xd32cxfb.getMinutes();
  var _0xd32cxfe = _0xd32cxfb.getSeconds();
  var _0xd32cxff = _0xd32cxfc <= 9 ? "0" + _0xd32cxfc + ":" : _0xd32cxfc + ":";
  var _0xd32cx100 = _0xd32cxfd <= 9 ? "0" + _0xd32cxfd + ":" : _0xd32cxfd + ":";
  var _0xd32cx101 = _0xd32cxfe <= 9 ? "0" + _0xd32cxfe : _0xd32cxfe;
  var _0xd32cx102 = UI.GetString("Script items", "Type username");
  var _0xd32cx103 = Math.round(Entity.GetProp(Entity.GetLocalPlayer(), "CPlayerResource", "m_iPing")).toString();
  var _0xd32cx104 = Render.AddFont("Verdana", 8, 400);
  var _0xd32cx105 = World.GetServerString();
  var _0xd32cx106 = "onetap | ";
  if (getmultidrop(UI.GetValue("Script items", "Onetap indicators"), 1)) {
    _0xd32cx106 += _0xd32cx102;
  } else {
    _0xd32cx106 += username;
  }
  ;
  if (_0xd32cx105 != "") {
    _0xd32cx106 += " | " + _0xd32cx105 + " | ping " + _0xd32cx103;
  }
  ;
  var _0xd32cx107 = Render.TextSizeCustom(_0xd32cx106, _0xd32cx104)[0] + 20;
  var _0xd32cx31 = Global.GetScreenSize()[0];
  _0xd32cx31 = _0xd32cx31 - _0xd32cx107 - 10;
  if (getmultidrop(UI.GetValue("Script items", "Onetap indicators"), 0)) {
    Render.GradientRect(_0xd32cx31, 5, 400, 20, 500, [0, 0, 0, 0], [0, 0, 0, 255]);
    Render.StringCustom(_0xd32cx31 + 20, 8, 0, _0xd32cx106, [255, 255, 255, 255], _0xd32cx104);
  }
}
var holded = "a";
var toogled = "f";
var slowwalk = holded;
var fakeduck = holded;
var autopeek = holded;
var inverter = holded;
var safepoint = holded;
var bodyaim = holded;
var doubletap = holded;
var hideshots = holded;
var damageoverride = holded;
function multidropdown() {
  if (getmultidrop(UI.GetValue("Script items", "Onetap indicators"), 1)) {
    UI.SetEnabled("Script items", "Type username", true);
  } else {
    UI.SetEnabled("Script items", "Type username", false);
  }
}
var y = Global.GetScreenSize()[1] / 2;
function otkeybindings() {
  if (getmultidrop(UI.GetValue("Script items", "Onetap indicators"), 2)) {
    if (!World.GetServerString()) {
      return;
    }
    ;
    var _0xd32cx104 = Render.AddFont("MuseoSansCyrl-500", 10, 100);
    const _0xd32cx118 = Render.AddFont("untitled-font-1", 14, 10);
    Render.GradientRect(0, UI.GetValue("Script items", "Keybind up/down"), 200, 17, 500, [0, 0, 0, 200], [0, 0, 0, 0]);
    var _0xd32cx119 = [];
    if (UI.GetValue("Misc", "JAVASCRIPT", "Scripts", "tryhardV17.js")) {
      ;
    }
    ;
    {
      _0xd32cx119.push("TRYHARD.JS");
    }
    if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
      _0xd32cx119.push("Toosie Slide");
    }
    ;
    if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
      _0xd32cx119.push("Fake real duck");
    }
    ;
    if (UI.IsHotkeyActive("Misc", "GENERAL", "Movement", "Auto peek")) {
      _0xd32cx119.push("Auto peek");
    }
    ;
    if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
      _0xd32cx119.push("AA inverter");
    }
    ;
    if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point")) {
      _0xd32cx119.push("Safe point");
    }
    ;
    if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim")) {
      _0xd32cx119.push("Body aim");
    }
    ;
    if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap")) {
      _0xd32cx119.push("Doubletap");
    }
    ;
    if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {
      _0xd32cx119.push("Hide shots");
    }
    ;
    if (Input.IsKeyPressed(69)) {
      _0xd32cx119.push("Legit AA");
    }
    ;
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script item", "Deathmatch Godmode")) {
      _0xd32cx119.push("Godmode");
    }
    ;
    if (_0xd32cx119.length > 0) {
      for (i = 0; i < _0xd32cx119.length; i++) {
        switch (_0xd32cx119[i]) {
          case "TRYHARD.JS":
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [0, 0, 0, 180], _0xd32cx104);
            Render.StringCustom(UI.GetValue("Script items", "Icon left/right"), UI.GetValue("Script items", "Keybind up/down") + 22 + i * 20, 0, "f", [245, 245, 245, 255], _0xd32cx118);
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [255, 255, 255, 255], _0xd32cx104);
            break;
          case "Toosie Slide":
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [0, 0, 0, 180], _0xd32cx104);
            Render.StringCustom(UI.GetValue("Script items", "Icon left/right"), UI.GetValue("Script items", "Keybind up/down") + 22 + i * 20, 0, slowwalk, [245, 245, 245, 255], _0xd32cx118);
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [255, 255, 255, 255], _0xd32cx104);
            break;
          case "Fake real duck":
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [0, 0, 0, 180], _0xd32cx104);
            Render.StringCustom(UI.GetValue("Script items", "Icon left/right"), UI.GetValue("Script items", "Keybind up/down") + 22 + i * 20, 0, fakeduck, [245, 245, 245, 255], _0xd32cx118);
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [255, 255, 255, 255], _0xd32cx104);
            break;
          case "Auto peek":
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [0, 0, 0, 180], _0xd32cx104);
            Render.StringCustom(UI.GetValue("Script items", "Icon left/right"), UI.GetValue("Script items", "Keybind up/down") + 22 + i * 20, 0, "f", [245, 245, 245, 255], _0xd32cx118);
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [255, 255, 255, 255], _0xd32cx104);
            break;
          case "AA inverter":
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [0, 0, 0, 180], _0xd32cx104);
            Render.StringCustom(UI.GetValue("Script items", "Icon left/right"), UI.GetValue("Script items", "Keybind up/down") + 22 + i * 20, 0, "f", [245, 245, 245, 255], _0xd32cx118);
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [255, 255, 255, 255], _0xd32cx104);
            break;
          case "Safe point":
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [0, 0, 0, 180], _0xd32cx104);
            Render.StringCustom(UI.GetValue("Script items", "Icon left/right"), UI.GetValue("Script items", "Keybind up/down") + 22 + i * 20, 0, safepoint, [245, 245, 245, 255], _0xd32cx118);
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [255, 255, 255, 255], _0xd32cx104);
            break;
          case "Body aim":
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [0, 0, 0, 180], _0xd32cx104);
            Render.StringCustom(UI.GetValue("Script items", "Icon left/right"), UI.GetValue("Script items", "Keybind up/down") + 22 + i * 20, 0, bodyaim, [245, 245, 245, 255], _0xd32cx118);
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [255, 255, 255, 255], _0xd32cx104);
            break;
          case "Doubletap":
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [0, 0, 0, 180], _0xd32cx104);
            Render.StringCustom(UI.GetValue("Script items", "Icon left/right"), UI.GetValue("Script items", "Keybind up/down") + 22 + i * 20, 0, "f", [245, 245, 245, 255], _0xd32cx118);
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [255, 255, 255, 255], _0xd32cx104);
            break;
          case "Hide shots":
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [0, 0, 0, 180], _0xd32cx104);
            Render.StringCustom(UI.GetValue("Script items", "Icon left/right"), UI.GetValue("Script items", "Keybind up/down") + 22 + i * 20, 0, "f", [245, 245, 245, 255], _0xd32cx118);
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [255, 255, 255, 255], _0xd32cx104);
            break;
          case "Godmode":
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [0, 0, 0, 180], _0xd32cx104);
            Render.StringCustom(UI.GetValue("Script items", "Icon left/right"), UI.GetValue("Script items", "Keybind up/down") + 22 + i * 20, 0, "f", [245, 245, 245, 255], _0xd32cx118);
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [255, 255, 255, 255], _0xd32cx104);
            break;
          case "Legit AA":
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [0, 0, 0, 180], _0xd32cx104);
            Render.StringCustom(UI.GetValue("Script items", "Icon left/right"), UI.GetValue("Script items", "Keybind up/down") + 22 + i * 20, 0, "f", [245, 245, 245, 255], _0xd32cx118);
            Render.StringCustom(UI.GetValue("Script items", "Keybind words left/right"), UI.GetValue("Script items", "Keybind up/down") + 24 + i * 20, 0, _0xd32cx119[i], [255, 255, 255, 255], _0xd32cx104);
            break;
        }
      }
    }
  }
}
var spectators = [];
function getspectators() {
  var _0xd32cx11c = Entity.GetPlayers();
  var local = Entity.GetLocalPlayer();
  var _0xd32cx11d = Entity.GetProp(local, "DT_BasePlayer", "m_hObserverTarget");
  if (!local) {
    return;
  }
  ;
  spectators = [];
  for (i = 0; i < _0xd32cx11c.length; i++) {
    if (Entity.IsAlive(local)) {
      if (!_0xd32cx11c[i] || Entity.IsAlive(_0xd32cx11c[i])) {
        continue;
      }
      ;
      var _0xd32cx11e = Entity.GetProp(_0xd32cx11c[i], "DT_BasePlayer", "m_hObserverTarget");
      if (!_0xd32cx11e || _0xd32cx11e == "m_hObserverTarget") {
        continue;
      }
      ;
      if (_0xd32cx11e == local) {
        spectators.push(Entity.GetName(_0xd32cx11c[i]));
      }
    } else {
      if (!_0xd32cx11c[i] || Entity.IsAlive(_0xd32cx11c[i])) {
        continue;
      }
      ;
      var _0xd32cx11e = Entity.GetProp(_0xd32cx11c[i], "DT_BasePlayer", "m_hObserverTarget");
      if (!_0xd32cx11e || _0xd32cx11e == "m_hObserverTarget") {
        continue;
      }
      ;
      if (_0xd32cx11e == _0xd32cx11d) {
        spectators.push(Entity.GetName(_0xd32cx11c[i]));
      }
    }
  }
}
function drawspectators() {
  if (getmultidrop(UI.GetValue("Script items", "Onetap indicators"), 2)) {
    var _0xd32cx104 = Render.AddFont("MuseoSansCyrl-500", 10, 100);
    var _0xd32cx118 = Render.AddFont("untitled-font-1", 14, 10);
    for (i = 0; i < spectators.length; i++) {
      var _0xd32cx20 = spectators[i];
      Render.StringCustom(5, UI.GetValue("Script items", "Keybind up/down") - 27 + i * -20, 0, "h", [245, 245, 245, 255], _0xd32cx118);
      Render.StringCustom(35, UI.GetValue("Script items", "Keybind up/down") - 25 + i * -20, 0, _0xd32cx20, [255, 255, 255, 255], _0xd32cx104);
    }
  }
}
function onRoundStart() {
  spectators = [];
}
Global.RegisterCallback("Draw", "multidropdown");
Global.RegisterCallback("Draw", "otkeybindings");
Global.RegisterCallback("Draw", "getspectators");
Global.RegisterCallback("Draw", "drawspectators");
Global.RegisterCallback("round_start", "onRoundStart");
Global.RegisterCallback("Draw", "otwatermark");
var values = [];
function addFlag(_0xd32cx123, _0xd32cx106) {
  values.push([_0xd32cx123, _0xd32cx106]);
}
function finishRender() {
  var _0xd32cx125 = UI.GetValue("Script items", "X");
  var _0xd32cx126 = UI.GetValue("Script items", "Y");
  var _0xd32cx127 = function (_0xd32cx128) {
    Render.FilledRect(_0xd32cx125 + _0xd32cx128 - 120, _0xd32cx126 + 2, 18, 100, [50, 50, 50, 100]);
    var _0xd32cx129 = _0xd32cx123 * 96;
    Render.FilledRect(_0xd32cx125 + _0xd32cx128 + 2 - 120, _0xd32cx126 + 2, 14, _0xd32cx129, [255, 215, 0, 255]);
    var _0xd32cx104 = Render.AddFont("Verdana", 8, 400);
    Render.StringCustom(_0xd32cx125 - 14 + _0xd32cx128 + 3 - 100, _0xd32cx126 - 14 + 115, 1, _0xd32cx106, [0, 0, 0, 255], _0xd32cx104);
    Render.StringCustom(_0xd32cx125 - 14 + _0xd32cx128 + 3 - 100, _0xd32cx126 - 15 + 115, 1, _0xd32cx106, [255, 255, 255, 255], _0xd32cx104);
  };
  for (i in values) {
    var _0xd32cx106 = values[i][1];
    var _0xd32cx123 = values[i][0];
    _0xd32cx127(i * 40);
  }
}
function reeeeeeeeeeeeeee(_0xd32cx123, _0xd32cx9e, _0xd32cx9f) {
  if (_0xd32cx123 > _0xd32cx9f) {
    return _0xd32cx9f;
  }
  ;
  if (_0xd32cx123 < _0xd32cx9e) {
    return _0xd32cx9e;
  }
  ;
  return _0xd32cx123;
}
var fl_amount = 0;
function onDraw() {
  values = [];
  var _0xd32cx12d = UI.GetValue("Script Items", "Flags");
  var local = Entity.GetLocalPlayer();
  if (!local || !Entity.IsAlive(local)) {
    return;
  }
  ;
  if (_0xd32cx12d & 1) {
    var _0xd32cx12e = Entity.GetProp(local, "DT_BaseEntity", "m_flSimulationTime");
    var _0xd32cx12f = Globals.Curtime() - _0xd32cx12e;
    fl_amount = _0xd32cx12f / Globals.TickInterval();
    addFlag(reeeeeeeeeeeeeee(Math.floor(fl_amount) / 16, 0, 1), "choke");
  }
  ;
  if (_0xd32cx12d & 2) {
    var _0xd32cx130 = Local.GetRealYaw();
    var _0xd32cx131 = Local.GetFakeYaw();
    var _0xd32cx132 = _0xd32cx130 - _0xd32cx131;
    if (_0xd32cx132 > 180) {
      _0xd32cx132 -= 360;
    }
    ;
    if (_0xd32cx132 < -180) {
      _0xd32cx132 += 360;
    }
    ;
    _0xd32cx132 = Math.abs(_0xd32cx132) / 120;
    addFlag(_0xd32cx132, "desync");
  }
  ;
  if (_0xd32cx12d & 4) {
    var _0xd32cx133 = 1 - Entity.GetProp(local, "DT_CSPlayer", "m_flDuckAmount");
    addFlag(_0xd32cx133, "height");
  }
  ;
  finishRender();
}
Cheat.RegisterCallback("Draw", "onDraw");
function safe_revolver() {
  local_weapon_id = Entity.GetProp(Entity.GetWeapon(Entity.GetLocalPlayer()), "CBaseAttributableItem", "m_iItemDefinitionIndex");
  local_origin = Entity.GetProp(Entity.GetLocalPlayer(), "CBaseEntity", "m_vecOrigin");
  local_viewangles = Local.GetViewAngles();
  local_yaw_real = Local.GetRealYaw();
  local_yaw_fake = Local.GetFakeYaw();
  if (UI.GetValue("Safe Revolver")) {
    if (local_weapon_id === 262208) {
      in_act_sr = Math.round(1 / Globals.Frametime()) < 65 ? true : false;
      UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", Math.round(1 / Globals.Frametime()) < 65 ? false : true);
    } else {
      in_act_sr = false;
      UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", true);
    }
  }
}
Cheat.RegisterCallback("CreateMove", "safe_revolver");
function vectorangles(_0xd32cx136) {
  var _0xd32cx137 = [];
  if (_0xd32cx136[1] == 0 && _0xd32cx136[0] == 0) {
    _0xd32cx137[0] = _0xd32cx136[2] > 0 ? 270 : 90;
    _0xd32cx137[1] = 0;
  } else {
    _0xd32cx137[0] = Math.atan2(-_0xd32cx136[2], Math.sqrt(_0xd32cx136[0] * _0xd32cx136[0] + _0xd32cx136[1] * _0xd32cx136[1])) * -180 / Math.PI;
    _0xd32cx137[1] = Math.atan2(_0xd32cx136[1], _0xd32cx136[0]) * 180 / Math.PI;
    if (_0xd32cx137[1] > 90) {
      _0xd32cx137[1] -= 180;
    } else {
      if (_0xd32cx137[1] < 90) {
        _0xd32cx137[1] += 180;
      } else {
        if (_0xd32cx137[1] == 90) {
          _0xd32cx137[1] = 0;
        }
      }
    }
  }
  ;
  return _0xd32cx137;
}
function anglevectors(_0xd32cx137) {
  var _0xd32cx139 = Math.sin(_0xd32cx137[1] * 180 / Math.PI);
  var _0xd32cx13a = Math.cos(_0xd32cx137[1] * 180 / Math.PI);
  var _0xd32cx13b = Math.sin(_0xd32cx137[0] * 180 / Math.PI);
  var _0xd32cx13c = Math.cos(_0xd32cx137[0] * 180 / Math.PI);
  return [_0xd32cx13c * _0xd32cx13a, _0xd32cx13c * _0xd32cx139, -_0xd32cx13b];
}
var currentAction = 2;
var lastTickShot = 0;
function reset() {
  lastTickShot = 0;
}
var lasttarget = 0;
function onRageShoot() {
  if (!UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap") && !UI.GetValue("Rage", "GENERAL", "Exploits", "Doubletap")) {
    return;
  }
  ;
  var _0xd32cx142 = Event.GetInt("exploit");
  if (_0xd32cx142 == 1) {
    currentAction = 1;
    lastTickShot = Globals.Tickcount();
  }
  ;
  if (_0xd32cx142 == 2) {
    currentAction = 2;
  }
  ;
  lasttarget = Event.GetInt("target_index");
}
function onCM() {
  var local = Entity.GetLocalPlayer();
  if (!local || !Entity.IsAlive(local) || currentAction == 2) {
    return;
  }
  ;
  if (!UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap") && !UI.GetValue("Rage", "GENERAL", "Exploits", "Doubletap")) {
    return;
  }
  ;
  if (!Entity.IsAlive(lasttarget) || lastTickShot + 12 < Globals.Tickcount()) {
    lasttarget = 0;
    return;
  }
  ;
  var _0xd32cx144 = Entity.GetProp(local, "DT_CSPlayer", "m_vecVelocity[0]");
  var _0xd32cx145 = Math.sqrt(_0xd32cx144[0] * _0xd32cx144[0] + _0xd32cx144[1] * _0xd32cx144[2] + _0xd32cx144[2] * _0xd32cx144[2]);
  var _0xd32cx146 = vectorangles(_0xd32cx144);
  _0xd32cx146[1] = Local.GetViewAngles()[1] - _0xd32cx146[1];
  var _0xd32cx136 = anglevectors(_0xd32cx146);
  var _0xd32cx147 = [];
  _0xd32cx147[0] = _0xd32cx136[0] * _0xd32cx145;
  _0xd32cx147[1] = _0xd32cx136[1] * _0xd32cx145;
  _0xd32cx147[2] = _0xd32cx136[2] * _0xd32cx145;
  UserCMD.SetMovement([_0xd32cx147[0], _0xd32cx147[1], 0]);
}
Cheat.RegisterCallback("ragebot_fire", "onRageShoot");
Cheat.RegisterCallback("CreateMove", "onCM");
Cheat.RegisterCallback("round_start", "reset");
function drawInd() {
  var _0xd32cx104 = Render.AddFont("Verdana", 6, 0);
  var _0xd32cx149 = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
  var _0xd32cx14a = [0, 255, 0, 255];
  var _0xd32cx14b = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots");
  var _0xd32cx14c = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap");
  var slowwalk = UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk");
  var _0xd32cx131 = UI.GetValue("Script items", "Fake AA");
  var _0xd32cx14d = UI.GetValue("Script items", "Low Delta");
  var _0xd32cx14e = UI.GetValue("Script items", "Dynamic AA");
  var _0xd32cx14f = UI.IsHotkeyActive("Script items", "Legit AA");
  var _0xd32cx29 = [255, 215, 0, 255];
  var _0xd32cx150 = [255, 255, 255, 255];
  var _0xd32cx151 = 0;
  var _0xd32cx152 = 0;
  local = Entity.GetLocalPlayer();
  enemy = Entity.GetEnemies();
  if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable Indicator") || !Entity.IsValid(local) || !Entity.IsAlive(local)) {
    return;
  }
  ;
  _0xd32cx104 = Render.AddFont("Verdana", 8, 400);
  x = Render.GetScreenSize()[0];
  y = Render.GetScreenSize()[1];
  real_yaw = Local.GetRealYaw();
  fake_yaw = Local.GetFakeYaw();
  delta = Math.min(Math.abs(real_yaw - fake_yaw) / 2, 60).toFixed(1);
  if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable Fake Bar")) {
    Render.GradientRect(x / 2, y / 2 + 50, 1.1363636363636365 * delta, 3, 1, _0xd32cx29, [150, 150, 150, 0]);
    Render.GradientRect(x / 2 - 1.1363636363636365 * delta + 1, y / 2 + 50, 1.1363636363636365 * delta, 3, 1, [150, 150, 150, 0], _0xd32cx29);
    Render.StringCustom(x / 2 + 1, y / 2.07 + 51 + _0xd32cx151, 5, delta + "*", [255, 255, 255, 255], _0xd32cx104);
    _0xd32cx151 = 5;
  }
  ;
  {
    if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
      Render.StringCustom(x / 2 + 50, y / 2 - 13, 5, ">", [0, 0, 0, 255], 11);
      Render.StringCustom(x / 2 - 50, y / 2 - 13, 5, "<", [0, 0, 0, 255], 11);
      Render.StringCustom(x / 2 + 50, y / 2 - 12, 5, ">", _0xd32cx29, 10);
      Render.StringCustom(x / 2 - 50, y / 2 - 12, 5, "<", [255, 255, 255, 255], 10);
    } else {
      if (!UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
        Render.StringCustom(x / 2 + 50, y / 2 - 13, 5, ">", [0, 0, 0, 255], 11);
        Render.StringCustom(x / 2 - 50, y / 2 - 13, 5, "<", [0, 0, 0, 255], 11);
        Render.StringCustom(x / 2 + 50, y / 2 - 12, 5, ">", [255, 255, 255, 255], 10);
        Render.StringCustom(x / 2 - 50, y / 2 - 12, 5, "<", _0xd32cx29, 10);
      }
    }
    ;
    if (_0xd32cx149) {
      Render.StringCustom(x / 2 - 15, y / 2.33 + 36, 5, "TRY", [0, 0, 0, 180], _0xd32cx104);
      Render.StringCustom(x / 2 - 14, y / 2.33 + 35, 5, "TRY", _0xd32cx29, _0xd32cx104);
      Render.StringCustom(x / 2 + 16, y / 2.33 + 36, 5, "HARD", [0, 0, 0, 180], _0xd32cx104);
      Render.StringCustom(x / 2 + 16, y / 2.33 + 35, 5, "HARD", [255, 255, 255, 255], _0xd32cx104);
    } else {
      if (!_0xd32cx149) {
        Render.StringCustom(x / 2 - 15, y / 2.33 + 36, 5, "TRY", [0, 0, 0, 180], _0xd32cx104);
        Render.StringCustom(x / 2 - 14, y / 2.33 + 35, 5, "TRY", _0xd32cx29, _0xd32cx104);
        Render.StringCustom(x / 2 + 16, y / 2.33 + 36, 5, "HARD", [0, 0, 0, 180], _0xd32cx104);
        Render.StringCustom(x / 2 + 16, y / 2.33 + 35, 5, "HARD", [255, 255, 255, 255], _0xd32cx104);
      }
    }
    ;
    {
      if (slowwalk) {
        Render.StringCustom(x / 2 + 1, y / 2 + 51 + _0xd32cx151, 5, "SLOWWALK", [0, 0, 0, 180], _0xd32cx104);
        Render.StringCustom(x / 2, y / 2 + 50 + _0xd32cx151, 5, "SLOWWALK", [255, 255, 120, 255], _0xd32cx104);
      } else {
        if (_0xd32cx14f) {
          Render.StringCustom(x / 2 + 1, y / 2 + 51 + _0xd32cx151, 5, "LEGIT AA", [0, 0, 0, 180], _0xd32cx104);
          Render.StringCustom(x / 2, y / 2 + 50 + _0xd32cx151, 5, "LEGIT AA", [255, 255, 255, 255], _0xd32cx104);
        } else {
          if (_0xd32cx131) {
            Render.StringCustom(x / 2 + 1, y / 2 + 51 + _0xd32cx151, 5, "FAKE", [0, 0, 0, 180], _0xd32cx104);
            Render.StringCustom(x / 2, y / 2 + 50 + _0xd32cx151, 5, "FAKE", [180, 120, 255, 255], _0xd32cx104);
          } else {
            if (_0xd32cx14e) {
              Render.StringCustom(x / 2 + 1, y / 2 + 51 + _0xd32cx151, 5, "DYNAMIC", [0, 0, 0, 180], _0xd32cx104);
              Render.StringCustom(x / 2, y / 2 + 50 + _0xd32cx151, 5, "DYNAMIC", [255, 120, 120, 255], _0xd32cx104);
            } else {
              if (_0xd32cx14d) {
                Render.StringCustom(x / 2 + 1, y / 2 + 51 + _0xd32cx151, 5, "LOW DELTA", [0, 0, 0, 180], _0xd32cx104);
                Render.StringCustom(x / 2, y / 2 + 50 + _0xd32cx151, 5, "LOW DELTA", [120, 255, 200, 255], _0xd32cx104);
              } else {
                Render.StringCustom(x / 2 + 1, y / 2 + 51 + _0xd32cx151, 5, "DEFAULT", [0, 0, 0, 180], _0xd32cx104);
                Render.StringCustom(x / 2, y / 2 + 50 + _0xd32cx151, 5, "DEFAULT", [200, 255, 255, 255], _0xd32cx104);
              }
            }
          }
        }
      }
    }
    if (_0xd32cx14c) {
      Render.StringCustom(x / 2 + 1, y / 2 + 66 + _0xd32cx151, 5, "DT", [0, 0, 0, 180], _0xd32cx104);
      Render.StringCustom(x / 2, y / 2 + 65 + _0xd32cx151, 5, "DT", _0xd32cx14a, _0xd32cx104);
      _0xd32cx152 = 15;
      _0xd32cx150 = [255, 0, 0, 255];
    }
    ;
    if (_0xd32cx14b) {
      Render.StringCustom(x / 2 + 1, y / 2 + 66 + _0xd32cx151 + _0xd32cx152, 5, "HS", [0, 0, 0, 180], _0xd32cx104);
      Render.StringCustom(x / 2, y / 2 + 65 + _0xd32cx151 + _0xd32cx152, 5, "HS", _0xd32cx150, _0xd32cx104);
    }
  }
}
Cheat.RegisterCallback("Draw", "drawInd");
UI.SetColor("Script items", "Accent Color", [150, 150, 255, 255]);
var circle_radius = 12;
var arc_length = 100;
var arc_thickness = 4;
var arc_precision = 180;
var circle_color = [0, 0, 0, 60];
var real_color = [255, 0, 0, 255];
function update_settings() {
  circle_radius = 12;
  arc_length = 100;
  arc_thickness = 4;
  arc_precision = 180;
  circle_color = [0, 0, 0, 60];
  real_color = [255, 0, 0, 255];
  if (arc_thickness > circle_radius) {
    UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Arc Thickness", circle_radius);
  }
}
function draw_circle(_0xd32cx31, y, _0xd32cx15b, _0xd32cx15c, _0xd32cx29) {
  var _0xd32cx15d = _0xd32cx15b - _0xd32cx15c;
  for (; _0xd32cx15b > _0xd32cx15d; --_0xd32cx15b) {
    Render.Circle(_0xd32cx31, y, _0xd32cx15b, _0xd32cx29);
  }
}
function draw_arc(_0xd32cx31, y, _0xd32cx15b, _0xd32cx15f, _0xd32cx160, _0xd32cx15c, _0xd32cx29) {
  var _0xd32cx161 = 2 * Math.PI / arc_precision;
  var _0xd32cx162 = Math.PI / 180;
  var _0xd32cx15d = _0xd32cx15b - _0xd32cx15c;
  var _0xd32cx163 = (_0xd32cx15f + _0xd32cx160) * _0xd32cx162;
  var _0xd32cx15f = _0xd32cx15f * Math.PI / 180;
  for (; _0xd32cx15b > _0xd32cx15d; --_0xd32cx15b) {
    for (var _0xd32cx67 = _0xd32cx15f; _0xd32cx67 < _0xd32cx163; _0xd32cx67 += _0xd32cx161) {
      var _0xd32cx164 = Math.round(_0xd32cx31 + _0xd32cx15b * Math.cos(_0xd32cx67));
      var _0xd32cx13a = Math.round(y + _0xd32cx15b * Math.sin(_0xd32cx67));
      var _0xd32cx165 = Math.round(_0xd32cx31 + _0xd32cx15b * Math.cos(_0xd32cx67 + _0xd32cx161));
      var _0xd32cx166 = Math.round(y + _0xd32cx15b * Math.sin(_0xd32cx67 + _0xd32cx161));
      Render.Line(_0xd32cx164, _0xd32cx13a, _0xd32cx165, _0xd32cx166, _0xd32cx29);
    }
  }
}
function adjust_angle(_0xd32cx67) {
  if (_0xd32cx67 < 0) {
    _0xd32cx67 = 90 + _0xd32cx67 * -1;
  } else {
    if (_0xd32cx67 > 0) {
      _0xd32cx67 = 90 - _0xd32cx67;
    }
  }
  ;
  return _0xd32cx67;
}
function main() {
  var _0xd32cx168 = Entity.GetLocalPlayer();
  if (!Entity.IsAlive(_0xd32cx168)) {
    return;
  }
  ;
  update_settings();
  var _0xd32cx3b = Render.GetScreenSize();
  var _0xd32cx169 = _0xd32cx3b[0] * .5;
  var _0xd32cx16a = _0xd32cx3b[1] * .5;
  var _0xd32cx16b = Local.GetViewAngles();
  var _0xd32cx16c = Local.GetRealYaw();
  var _0xd32cx16d = Local.GetFakeYaw();
  var _0xd32cx16e = _0xd32cx16b[1] - 180;
  var _0xd32cx130 = adjust_angle(_0xd32cx16c - _0xd32cx16e);
  var _0xd32cx131 = adjust_angle(_0xd32cx16d - _0xd32cx16e);
  localplayer = Entity.GetLocalPlayer();
  if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable Circle") || !UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable Indicator") || !Entity.IsValid(localplayer) || !Entity.IsAlive(localplayer)) {
    return;
  }
  ;
  draw_circle(_0xd32cx169, _0xd32cx16a, circle_radius, arc_thickness, circle_color);
  draw_arc(_0xd32cx169, _0xd32cx16a, circle_radius, _0xd32cx130 - arc_length * .5, arc_length, arc_thickness, real_color);
}
Cheat.RegisterCallback("Draw", "main");
UI.AddLabel("________________________________________");
UI.AddLabel("Created by: Infinite#1100");
