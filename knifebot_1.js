var error = 0;
var _0x4942 = ["EnableLogs", "", "Icons", "C", "D", "E", "F", "G", "H", "Fonts", "Verdana", "Astriumtabs2", "outline", "rect", "grad", "text", "\x0A", "groups", "verdana12", "verdana12b", "verdana10", "astriumtabs", "BeginWindow", "x", "y", "w", "h", "Window ", " has been created", "opened", "alpha", "id", "is_movable", "resize", "drag", "dx", "dy", "x2", "y2", "is_sizeable", "dmx", "dmy", "hi", "AddGradient", "EndWindow", "elements", "minimal_width", "length", "multiselect", "selected", "last_id", "SetWindowMovable", "SetWindowMovable has been set to ", "SetWindowSizeable", "SetWindowSizeable has been set to ", "SetWindowDrawTexture", "draw_texture", "SetWindowDrawTexture has been set to ", "BeginGroup", "tabs", "title", "Group ", "highest_w", "highest_h", "substring", "...", "vexatiouscheff", "summer08", "keenu", "atlas321", "ultranite", "infinity1g", "quinn", "vladosky", "gaffa", "sadfacehvh", "lukeyour", "sweg", "itzguga", "excellentgoat", "elleqt", "toLowerCase", "indexOf", "EndGroup", "nextline_offset", "is_nextline", "last_y", "Checkbox", "SetGroupMoveable", "SetGroupMoveable has been set to ", "Slider", "round", "SetGroupSizeable", "SetGroupSizeable has been set to ", "Button", "Label", "BeginTab", "icon", "numID", "EndTab", "DrawTabBar", "Combo", "_child", "push", "apply", "SetEnabled", "pop", "Custom fakeduck", "Standing amount", "Better autodirection", "Fastduck", "Disable autodir slowwalk", "Kill obituary", "Instant DT", "HP / 2", "Max wall thick", "fps autodir", "static rad", "rad amount", "custom clantag", "shift amount", "tolerance", "tp on peek", "blockbot", "pred amount", "speed amount", "knifebot", "backstab only", "safe point limbs", "jitter 180", "legit knifebot", "doorspam", "indicator", "autostrafer", "autos speed", "---------------------------------------", "Fakeduck key", "TP on peek key", "Blockbot key", "Doorspam key", "SetValue", "GetValue", "custom_fd", "standing_amount", "autodirection", "fastduck", "disable_autodir_slowwalk", "killobituary", "instant_dt", "dt_hp_2", "min_wall_thickness", "fps_autodirection", "static_rad", "rad_amount", "custom_clantag", "shift_amount", "tp_on_peek", "blockbot_pred_amount", "blockbot_speed_amount", "backstab_only", "safe_point_limbs", "jitter_180", "legit_knifebot", "indicators", "Main", "Safe point on limbs", "DT Settings", "Shift", "Tolerance", "TP on peek", "I", "Maximum wall thickness", "Disable on slowwalk", "Simpler autodirection", "Static radius", "Radius", "180 jitter", "Misc", "Custom Fakeduck", "Standing", "Kill Obituary", "Indicators", "Fast duck", "Clantag", "Doorspammer", "Misc 2", "Blockbot", "Prediction amount", "Speed amount", "Knifebot", "Backstab only", "Legit mode", "splice", "Settings", "Select a player.", "bwhitelist", "Whitelist", "Vote kick", "callvote kick ", "force_safepoint", "Force Safepoint", "whitelist", "prioritize", "Prioritize", "Info", "Reset settings", "PI", "sin", "cos", "Tahoma", "toUpperCase", "tp_on_key", "teleport", "CBaseEntity", "m_vecMins", "m_vecMaxs", "sqrt", "abs", "hypot", "atan", "Anti-Aim", "Rage Anti-Aim", "Yaw offset", "CCSPlayer", "m_angEyeAngles", "knife", "includes", "DT_BaseCombatWeapon", "m_flNextPrimaryAttack", "DT_CSPlayer", "m_nTickBase", "CBasePlayer", "m_iHealth", "Rage", "GENERAL", "Exploits", "Doubletap", "random", "last_ent", "m_angRotation", "atan2", "m_hGroundEntity", "forward", "backward", "left", "right", "m_vecVelocity[0]", "asin", "min", "IsHotkeyActive", "m_flDuckAmount", "crouch", "fd", "Extra", "Slow walk", "Auto direction", "onetap               ", "floor", "substr", "last_choked", "jitter", "flip", "Fake angles", "Inverter", "m_iClip1", "was_spamming", "grace_period", "FIRST BLOOD!", "DOUBLE KILL", "TRIPLE KILL", "MULTI KILL", "ULTRA KILL", "KILLING SPREE", "attacker", "Draw", "draw", "round_start", "rroundstart", "player_death", "CreateMove", "cm"];

function vec_sub(_0xb7a4x62, _0xb7a4x34) {
    return [_0xb7a4x62[0] - _0xb7a4x34[0], _0xb7a4x62[1] - _0xb7a4x34[1], _0xb7a4x62[2] - _0xb7a4x34[2]]
}
function vec_len(_0xb7a4x62) {
    return Math[_0x4942[216]](_0xb7a4x62[0] * _0xb7a4x62[0] + _0xb7a4x62[1] * _0xb7a4x62[1] + _0xb7a4x62[2] * _0xb7a4x62[2])
}

function vec_add(_0xb7a4x62, _0xb7a4x34) {
    return [_0xb7a4x62[0] + _0xb7a4x34[0], _0xb7a4x62[1] + _0xb7a4x34[1], _0xb7a4x62[2] + _0xb7a4x34[2]]
}

function vecmulfl(_0xb7a4x62, _0xb7a4x34) {
    return [_0xb7a4x62[0] * _0xb7a4x34, _0xb7a4x62[1] * _0xb7a4x34, _0xb7a4x62[2] * _0xb7a4x34]
}

function calcang(_0xb7a4x84, _0xb7a4x85) {
    var delta = [];
    delta[0] = _0xb7a4x84[0] - _0xb7a4x85[0];
    delta[1] = _0xb7a4x84[1] - _0xb7a4x85[1];
    delta[2] = _0xb7a4x84[2] - _0xb7a4x85[2];
    var _0xb7a4x86 = [];
    var _0xb7a4x87 = Local.GetViewAngles();
    _0xb7a4x86[0] = RadToDeg(Math[_0x4942[219]](delta[2] / Math[_0x4942[218]](delta[0], delta[1])));
    _0xb7a4x86[1] = RadToDeg(Math[_0x4942[219]](delta[1] / delta[0]));
    _0xb7a4x86[2] = 0;
    if (delta[0] >= 0) {
        _0xb7a4x86[1] += 180
    };
    while (_0xb7a4x86[1] > 180) {
        _0xb7a4x86[1] -= 360
    };
    while (_0xb7a4x86[1] < -180) {
        _0xb7a4x86[1] += 360
    };
    return _0xb7a4x86
}

function normalize(_0xb7a4xb3) {
    while (_0xb7a4xb3 > 180) {
        _0xb7a4xb3 -= 360
    };
    while (_0xb7a4xb3 < -180) {
        _0xb7a4xb3 += 360
    };
    return _0xb7a4xb3
}


function anglevec(_0xb7a4x62) {
    var _0xb7a4xb6 = Math[_0x4942[207]](_0xb7a4x62[1]);
    var _0xb7a4xb7 = Math[_0x4942[208]](_0xb7a4x62[1]);
    var _0xb7a4xb8 = Math[_0x4942[207]](_0xb7a4x62[0]);
    var _0xb7a4xb9 = Math[_0x4942[208]](_0xb7a4x62[0]);
    return [_0xb7a4xb9 * _0xb7a4xb7, _0xb7a4xb9 * _0xb7a4xb6, -_0xb7a4xb8]
}

function isbehind(_0xb7a4xaa) {
    var delta = vec_sub(Entity.GetRenderOrigin(_0xb7a4xaa), Entity.GetEyePosition(Entity.GetLocalPlayer()));
    delta[2] = 0;
    var _0xb7a4x95 = Entity.GetProp(_0xb7a4xaa, _0x4942[223], _0x4942[224]);
    _0xb7a4x95[0] = _0xb7a4x95[0] / 180 * Math[_0x4942[206]];
    _0xb7a4x95[1] = _0xb7a4x95[1] / 180 * Math[_0x4942[206]];
    var _0xb7a4xa0 = anglevec(_0xb7a4x95);
    _0xb7a4xa0[2] = 0;
    return (delta[0] * _0xb7a4xa0[0] + delta[1] * _0xb7a4xa0[1]) > 18
}

function RadToDeg(_0xb7a4x62) {
    return _0xb7a4x62 * 180 / Math[_0x4942[206]]
}

function auth_ok() {
    if(!UI.GetValue("Script items", "Knife bot")) return;
	const localplayerindex = Entity.GetLocalPlayer();
    const playersarray = Entity.GetEnemies();
    if (!(Entity.GetName(Entity.GetWeapon(localplayerindex)).includes('knife'))) {
        return
    };
    var playerlist = -1;
    var angless = 65;
    for (i in playersarray) {
        if (Entity.IsAlive(playersarray[i])) {
            var eyeposlocal = Entity.GetEyePosition(localplayerindex);
            var hitboxposition = Entity.GetHitboxPosition(playersarray[i], 3);
            var delta = vec_sub(eyeposlocal, hitboxposition);
            delta = vec_len(delta);
            if (delta < angless) {
                angless = delta;
                playerlist = playersarray[i]
            };
            var hitboxposition = Entity.GetHitboxPosition(playersarray[i], 5);
            var delta = vec_sub(eyeposlocal, hitboxposition);
            delta = vec_len(delta);
            if (delta < angless) {
                angless = delta;
                playerlist = playersarray[i]
            };
            var hitboxposition = Entity.GetHitboxPosition(playersarray[i], 4);
            var delta = vec_sub(eyeposlocal, hitboxposition);
            delta = vec_len(delta);
            if (delta < angless) {
                angless = delta;
                playerlist = playersarray[i]
            };
            var hitboxposition = Entity.GetRenderOrigin(playersarray[i]);
            hitboxposition[2] += 30;
            var delta = vec_sub(eyeposlocal, hitboxposition);
            delta = vec_len(delta);
            if (delta < angless) {
                angless = delta;
                playerlist = playersarray[i]
            }
        }
    };
    if (playerlist == -1) {
        return
    };
    var getbuttons = UserCMD.GetButtons();
    var isSilent = UI.GetValue("Script items", "Knife bot silent aim") ? true : false;
    var eyeposlocal = Entity.GetEyePosition(localplayerindex);
    var hitboxposition = Entity.GetHitboxPosition(playerlist, 3);
    var m_angEyeAngles = calcang(eyeposlocal, hitboxposition);
    var must_calc = false;
    if (isbehind(playersarray[i]) && angless < 70) {
        attacked = true;
        getbuttons |= 2048;
        must_calc = true
    } else {
        var isLethal = false;
        var m_iHealth = Entity.GetProp(playerlist, 'CBasePlayer', 'm_iHealth');
        if (m_iHealth <= 55) {
            isLethal = true
        };
        if (true == false) { // backstab only
            getbuttons |= 2048;
            var Active_Exploits = Exploit.GetCharge() == 1 && UI.IsHotkeyActive('Rage', 'GENERAL', 'Exploits', 'Doubletap');
            must_calc = true
        } else {
           
                getbuttons |= isLethal ? 2048 : 1;
                var Active_Exploits = Exploit.GetCharge() == 1 && UI.IsHotkeyActive('Rage', 'GENERAL', 'Exploits', 'Doubletap');
                if (getbuttons & 1 && Active_Exploits && (UI['GetValue']['apply'](null, settings) & 4)) {
                    UI.ToggleHotkey('Rage', 'GENERAL', 'Exploits', 'Doubletap')
                };
                must_calc = true
        }
    };
    if (must_calc) {
            var localviewangles = Local.GetViewAngles();
            var delta = vec_sub(m_angEyeAngles, localviewangles);
            delta[1] = normalize(delta[1]);
            delta = vecmulfl(delta, 1);
            delta = vec_add(delta, localviewangles);
            m_angEyeAngles = delta
        UserCMD.SetViewAngles(m_angEyeAngles, isSilent)
        UserCMD.SetButtons(getbuttons)
    }
}

UI.AddCheckbox("Knife bot")
UI.AddCheckbox("Knife bot silent aim")
Cheat.RegisterCallback("CreateMove", "auth_ok")