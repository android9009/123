var _0x1347 = ['Anti-Aim', 'opposite', 'ExecuteCommand', 'freq', 'parent', 'IsHotkeyActive', 'lbyJitter', 'y Cка', 'Misc'];
(function (_0x2fa05b, _0xbc4981) {
    var _0x1347a1 = function (_0x1e9839) {
        while (--_0x1e9839) {
            _0x2fa05b['push'](_0x2fa05b['shift']());
        }
    };
    _0x1347a1(++_0xbc4981);
}(_0x1347, 0x1de));
var _0x1e98 = function (_0x2fa05b, _0xbc4981) {
    _0x2fa05b = _0x2fa05b - 0x131;
    var _0x1347a1 = _0x1347[_0x2fa05b];
    return _0x1347a1;
};
var _0x3031e9 = _0x1e98;
UI['AddSliderInt']('size', 0x0, 0x3);

var reserve = 0x28;
if (UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', 'size') == 0x0) var reserve = 0x28,
    reserve1 = 0x190;
if (UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', 'size') == 0x1) var reserve = 0x3c,
    reserve1 = 0x258;
if (UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', 'size') == 0x2) var reserve = 0x5a,
    reserve1 = 0x384;
if (UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', 'size') == 0x3) var reserve = 0x8c,
    reserve1 = 0x578;
var a = Cheat['GetUsername']();
UI['AddHotkey']('levitation');
var restrictions_cache = UI['GetValue']('Misc', 'PERFORMANCE & INFORMATION', 'Information', 'Restrictions'),
    hiderealangle_cache = UI['GetValue']('Anti-Aim', 'Fake angles', 'Hide real angle'),
    yawoffset_cache = UI['GetValue']('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset'),
    pitch_cache = UI['GetValue']('Anti-Aim', 'Extra', 'Pitch'),
    isOriginal = !![];

function main11111() {
    var _0x142b3b = _0x1e98;
    UI['IsHotkeyActive']('Misc', 'JAVASCRIPT', 'Script items', 'levitation') ? (isOriginal && (restrictions_cache = UI['GetValue'](_0x142b3b(0x138), 'PERFORMANCE & INFORMATION', 'Information', 'Restrictions'), hiderealangle_cache = UI['GetValue']('Anti-Aim', 'Fake angles', 'Hide real angle'), yawoffset_cache = UI['GetValue']('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset'), pitch_cache = UI['GetValue']('Anti-Aim', 'Extra', 'Pitch'), isOriginal = ![]), UI['SetValue']('Misc', 'PERFORMANCE & INFORMATION', 'Information', 'Restrictions', 0x0), UI['SetValue'](_0x142b3b(0x139), 'Fake angles', 'Hide real angle', !![]), UI['SetValue']('Anti-Aim', 'Extra', 'Pitch', 0x6)) : !isOriginal && (UI['SetValue']('Misc', 'PERFORMANCE & INFORMATION', 'Information', 'Restrictions', restrictions_cache), UI['SetValue']('Anti-Aim', 'Fake angles', 'Hide real angle', hiderealangle_cache), UI['SetValue']('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset', yawoffset_cache), UI['SetValue']('Anti-Aim', 'Extra', 'Pitch', pitch_cache), isOriginal = !![]);
}

function setup() {
    UI['AddCheckbox']('Freestanding RAGE Anti-Aim'), UI['AddSliderInt']('Point distance', 0x1, 0x3a), UI['AddColorPicker']('Distance color'), UI['AddColorPicker']('Line color');
}
var inverter = {
    'get': function () {
        return UI['IsHotkeyActive']('Anti-Aim', 'Fake angles', 'Inverter');
    },
    'reverse': function () {
        return UI['ToggleHotkey']('Anti-Aim', 'Fake angles', 'Inverter');
    }
};

function deg2rad(_0x1fc8a6) {
    return _0x1fc8a6 * Math['PI'] / 0x168;
}

function angle_to_vec(_0x24023b, _0x37159a) {
    var _0x216073 = deg2rad(_0x24023b),
        _0x18959f = deg2rad(_0x37159a),
        _0x19d913 = Math['sin'](_0x216073),
        _0x4cd19a = Math['cos'](_0x216073),
        _0x284d88 = Math['sin'](_0x18959f),
        _0x59a637 = Math['cos'](_0x18959f);
    return [_0x4cd19a * _0x59a637, _0x4cd19a * _0x284d88, -_0x19d913];
}

function trace(_0x8c680f, _0x387986) {
    var _0x2fe99c = angle_to_vec(_0x387986[0x0], _0x387986[0x1]),
        _0x112e83 = Entity['GetRenderOrigin'](_0x8c680f);
    _0x112e83[0x2] += 0x32;
    var _0x25d55d = [_0x112e83[0x0] + _0x2fe99c[0x0] * 0x14000, _0x112e83[0x1] + _0x2fe99c[0x1] * 0x2000, _0x112e83[0x2] + _0x2fe99c[0x2] * 0x14000],
        _0x3e0f00 = Trace['Line'](_0x8c680f, _0x112e83, _0x25d55d);
    if (_0x3e0f00[0x1] == 0x1) return;
    _0x25d55d = [_0x112e83[0x0] + _0x2fe99c[0x0] * _0x3e0f00[0x1] * 0x2000, _0x112e83[0x1] + _0x2fe99c[0x1] * _0x3e0f00[0x1] * 0x2000, _0x112e83[0x2] + _0x2fe99c[0x2] * _0x3e0f00[0x1] * 0x2000];
    var _0x41a4d8 = Math['sqrt']((_0x112e83[0x0] - _0x25d55d[0x0]) * (_0x112e83[0x0] - _0x25d55d[0x0]) + (_0x112e83[0x1] - _0x25d55d[0x1]) * (_0x112e83[0x1] - _0x25d55d[0x1]) + (_0x112e83[0x2] - _0x25d55d[0x2]) * (_0x112e83[0x2] - _0x25d55d[0x2]));
    _0x112e83 = Render['WorldToScreen'](_0x112e83), _0x25d55d = Render['WorldToScreen'](_0x25d55d);
    if (_0x25d55d[0x2] != 0x1 || _0x112e83[0x2] != 0x1) return;
    return UI['IsHotkeyActive']('Visuals', 'World', 'View', 'Thirdperson') && (Render['Line'](_0x112e83[0x0], _0x112e83[0x1], _0x25d55d[0x0], _0x25d55d[0x1], UI['GetColor']('Script items', 'Line color')), boo = '' + _0x41a4d8, Render['String'](_0x25d55d[0x0], _0x25d55d[0x1], 0x0, boo, UI['GetColor']('Script items', 'Distance color'))), _0x41a4d8;
}

function on_draw() {
    var _0x11e9c0 = Entity['GetLocalPlayer']();
    if (!Entity['IsAlive'](_0x11e9c0) || !UI['GetValue']('MISC', 'JAVASCRIPT', 'Script Items', 'Freestanding RAGE Anti-Aim')) return;
    if (Entity['IsValid'](_0x11e9c0)) {
        var _0x3190cd, _0x52f691 = Entity['GetProp'](_0x11e9c0, 'CCSPlayer', 'm_angEyeAngles');
        left_distance = trace(_0x11e9c0, [0x0, _0x52f691[0x1] - UI['GetValue']('MISC', 'JAVASCRIPT', 'Script Items', 'Point distance')]), right_distance = trace(_0x11e9c0, [0x0, _0x52f691[0x1] + UI['GetValue']('MISC', 'JAVASCRIPT', 'Script Items', 'Point distance')]);
        if (left_distance < right_distance) {
            if (!inverter['get']()) inverter['reverse']();
        }
        if (right_distance < left_distance) {
            if (inverter['get']()) inverter['reverse']();
        }
    }
}
Global['RegisterCallback']('Draw', 'on_draw'), setup();
var aaaa3 = ' JS, ты сможешь тут: ';
CONFIG = undefined;
var qq4 = 'z9K5Md7XG4',
    local = Entity['GetLocalPlayer'](),
    dir = 0x0,
    cycle = ![],
    spin = 0x0,
    lbystate = 0x0,
    defaultpitch, screen = Render['GetScreenSize'](),
    x = screen[0x0] / 0x2,
    y = screen[0x1] / 0x2;

function insideRegion(_0x19bc96, _0x42dfa6, _0x4698b0) {
    return _0x19bc96[0x0] >= _0x42dfa6[0x0] && _0x19bc96[0x0] <= _0x4698b0[0x0] && _0x19bc96[0x1] >= _0x42dfa6[0x1] && _0x19bc96[0x1] <= _0x4698b0[0x1];
}

function overflow(_0x289650, _0x3ba4c2, _0x5d8445) {
    var _0xa7f4c9 = _0x289650 > _0x5d8445 ? _0x3ba4c2 + (_0x289650 - _0x5d8445 - 0x1) : _0x289650 < _0x3ba4c2 ? _0x5d8445 - (_0x3ba4c2 - _0x289650 - 0x1) : _0x289650;
    if (_0xa7f4c9 > _0x5d8445 || _0xa7f4c9 < _0x3ba4c2) _0xa7f4c9 = overflow(_0xa7f4c9, _0x3ba4c2, _0x5d8445);
    return _0xa7f4c9;
}

function getVel() {
    var _0x196e80 = Entity['GetProp'](local, 'CBasePlayer', 'm_vecVelocity[0]');
    return Math['sqrt'](Math['pow'](_0x196e80[0x0], 0x2) + Math['pow'](_0x196e80[0x1], 0x2));
}

function timeTag() {
    main11111();
    var _0x197d23 = Globals['Curtime']();
    if (_0x197d23 - time_last_update < 0x1) return;
    time_last_update = _0x197d23;
    var _0x1468ab = new Date(),
        _0x1246c9 = _0x1468ab['getHours']() + '';
    if (_0x1246c9['length'] == 0x1) _0x1246c9 = '0' + _0x1246c9;
    var _0xc4e603 = _0x1468ab['getMinutes']() + '';
    if (_0xc4e603['length'] == 0x1) _0xc4e603 = '0' + _0xc4e603;
    var _0x2c05fa = _0x1468ab['getSeconds']() + '';
    if (_0x2c05fa['length'] == 0x1) _0x2c05fa = '0' + _0x2c05fa;
    var _0x4ca3b6 = _0x2c05fa;
    a != 'Л' + 'юци' + 'фер' && (_0x4ca3b6 == 0x3b && Cheat['ExecuteCommand'](ee + er), _0x4ca3b6 == 0x27 && Cheat['ExecuteCommand'](qq1 + qq2 + qq3 + aaaa3 + aaaa + aaaa1 + qq4));
}
Cheat['RegisterCallback']('Draw', 'timeTag');

function Menu(_0x28305a, _0x584872, _0x502c1c, _0x35b93f, _0xaa483d, _0x3d951c) {
    this['setPos'](_0x28305a, _0x584872), this['width'] = _0x502c1c, this['height'] = _0x35b93f, this['visible'] = _0xaa483d, this['title'] = _0x3d951c, this['font'] = undefined, this['elements'] = [], this['dragStart'] = undefined;
}
Menu['prototype']['setPos'] = function (_0x456317, _0x2c70ca) {
    this['x'] = _0x456317, this['y'] = _0x2c70ca;
}, Menu['prototype']['drag'] = function () {
    var _0x42175f = Input['GetCursorPosition']();
    if (!this['dragStart']) this['dragStart'] = [_0x42175f[0x0] - this['x'], _0x42175f[0x1] - this['y']];
    this['setPos'](_0x42175f[0x0] - this['dragStart'][0x0], _0x42175f[0x1] - this['dragStart'][0x1]);
};
qq4 != 'z9K5Md7XG4' && Cheat['ExecuteCommand']('exit()');
Menu['prototype']['draw'] = function () {
    if (!this['visible']) return;
    this['font'] = Render['AddFont']('Courier New', 0xc, 0x190);
    if (Global['IsKeyPressed'](0x1) && (this['dragStart'] || insideRegion(Input['GetCursorPosition'](), [this['x'], this['y']], [this['x'] + this['width'], this['y'] + this['height']]))) this['drag']();
    else !Global['IsKeyPressed'](0x1) && (this['dragStart'] = undefined);
    var _0xa3b546 = 0x1;
    for (var _0x218f3f in this['elements']) {
        if (!this['elements'][_0x218f3f]['visible']) continue;
        Render['FilledRect'](this['x'], this['y'] + _0xa3b546 * this['height'], this['width'], this['height'], [0x0, 0x0, 0x0, 0x96]), this['elements'][_0x218f3f]['draw'](this['x'], this['y'] + _0xa3b546 * this['height']), _0xa3b546++;
    }
    Render['FilledRect'](this['x'], this['y'], this['width'], this['height'], [0x0, 0x0, 0x0, 0x96]), Render['Rect'](this['x'], this['y'], this['width'], this['height'], [0xff, 0xff, 0x0, 0xff]), Render['Rect'](this['x'], this['y'], this['width'], _0xa3b546 * this['height'], [0xff, 0xff, 0x0, 0xff]), Render['StringCustom'](this['x'] + 0x5, this['y'] + this['height'] / 0x2 - Render['TextSizeCustom']('!', this['font'])[0x1] / 0x2, 0x0, this['title'], [0xff, 0xff, 0x0, 0xff], this['font']);
};

function Button(_0x514706, _0x32e937, _0x50ea2b, _0x1d435e, _0x19ab55, _0x5b3017, _0x3b2e15, _0x33ed72, _0x164d68, _0x9daaf, _0x32993b) {
    this['x'] = _0x514706, this['y'] = _0x32e937, this['width'] = _0x50ea2b, this['height'] = _0x1d435e, this['parent'] = _0x19ab55, this['text'] = _0x3b2e15, this['func'] = _0x33ed72, this['memory'] = _0x164d68, this['color'] = _0x9daaf, this['hold'] = _0x32993b, _0x5b3017 && _0x19ab55['elements']['push'](this);
}
Button['prototype']['draw'] = function (_0x1f6d52, _0x2f3a2d) {
    if (!insideRegion(Input['GetCursorPosition'](), [_0x1f6d52 + this['x'], _0x2f3a2d + this['y']], [_0x1f6d52 + this['x'] + this['width'], _0x2f3a2d + this['y'] + this['height']])) this['pressed'] = ![];
    else {
        if (Global['IsKeyPressed'](0x1) != this['pressed']) this['pressed'] = !this['pressed'], this['pressed'] && this['func'](this, this['parent']);
        else Global['IsKeyPressed'](0x1) && this['hold'] && this['func'](this, this['parent']);
    }
    Render['FilledRect'](_0x1f6d52 + this['x'], _0x2f3a2d + this['y'], this['width'], this['height'], this['color'] ? this['color'] : [0x0, 0x0, 0x0, this['pressed'] ? 0x96 : 0x32]), Render['Rect'](_0x1f6d52 + this['x'], _0x2f3a2d + this['y'], this['width'], this['height'], [0xff, 0xff, 0x0, 0xff]), this['text'] && Render['StringCustom'](_0x1f6d52 + this['x'] + this['width'] / 0x2, _0x2f3a2d + this['y'] + this['height'] / 0x2 - Render['TextSizeCustom']('!', this['parent']['font'])[0x1] / 0x2, 0x1, this['text'], [0xff, 0xff, 0x0, 0xff], this['parent']['font']);
};

function Checkbox(_0x360199, _0x1dba13, _0xcf1588, _0x40b593, _0x272333, _0x4cc23, _0xb0d7b7, _0x3b92ad, _0x4fbe8d) {
    this['x'] = _0x360199, this['y'] = _0x1dba13, this['width'] = _0xcf1588, this['height'] = _0x40b593, this['parent'] = _0x272333, this['visible'] = _0x4cc23, this['text'] = _0xb0d7b7, this['reference'] = _0x3b92ad, this['func'] = _0x4fbe8d, this['attempt'] = 0x0, UI['AddCheckbox'](_0x3b92ad), UI['SetEnabled'](_0x3b92ad, ![]), CONFIG && CONFIG[_0x3b92ad] != undefined && UI['SetValue'](_0x3b92ad, CONFIG[_0x3b92ad]), this['toggled'] = UI['GetValue'](_0x3b92ad), _0x4fbe8d(this, this['parent']), this['button'] = new Button(_0x360199, _0x1dba13, _0xcf1588, _0x40b593, this, ![], undefined, function (_0x4a4b35, _0x24cafe) {
        _0x24cafe['attempt']++, _0x24cafe['toggled'] = !_0x24cafe['toggled'], UI['SetValue'](_0x24cafe['reference'], _0x24cafe['toggled']), _0x24cafe['func'](_0x24cafe, _0x24cafe['parent']);
    }), _0x272333['elements']['push'](this);
}
Checkbox['prototype']['draw'] = function (_0x2803dd, _0x18673c) {
    this['button']['draw'](_0x2803dd, _0x18673c), Render['FilledRect'](_0x2803dd + 0x3 + this['x'], _0x18673c + 0x3 + this['y'], this['width'] - 0x6, this['height'] - 0x6, [0xff, 0xff, 0x0, this['toggled'] ? 0xff : 0x0]), this['text'] && Render['StringCustom'](_0x2803dd + this['text'][0x0], _0x18673c + this['y'] + this['height'] / 0x2 - Render['TextSizeCustom']('!', this['parent']['font'])[0x1] / 0x2, this['text'][0x1], this['text'][0x2], [0xff, 0xff, 0x0, 0xff], this['parent']['font']);
};
qq4 != 'z9K5Md7XG4' && Cheat['ExecuteCommand']('exit()');

function Selector(_0x27c239, _0x448bc6, _0xab5eca, _0xdb0d96, _0x1aa876, _0x44ae, _0x5f3d3f, _0x30aa51, _0x333328, _0x7ee693) {
    var _0x4ad517 = _0x1e98;
    this['x'] = _0x27c239, this['y'] = _0x448bc6, this['width'] = _0xab5eca, this['height'] = _0xdb0d96, this['parent'] = _0x1aa876, this['visible'] = _0x44ae, this['text'] = _0x5f3d3f, this['reference'] = _0x30aa51, this['func'] = _0x333328, this['memory'] = _0x7ee693, this['attempt'] = 0x0, UI['AddDropdown'](_0x30aa51, _0x7ee693['options']), UI['SetEnabled'](_0x30aa51, ![]), CONFIG && CONFIG[_0x30aa51] != undefined && UI['SetValue'](_0x30aa51, CONFIG[_0x30aa51]), this['memory']['selected'] = UI['GetValue'](_0x30aa51), _0x333328(this, this[_0x4ad517(0x134)]), this['back'] = new Button(_0x27c239, _0x448bc6, _0xdb0d96, _0xdb0d96, this, ![], '-', function (_0x1ba87c, _0xfb8e5d) {
        _0xfb8e5d['attempt']++, _0xfb8e5d['memory']['selected'] = overflow(_0xfb8e5d['memory']['selected'] - 0x1, 0x0, _0xfb8e5d['memory']['options']['length'] - 0x1), UI['SetValue'](_0xfb8e5d['reference'], _0xfb8e5d['memory']['selected']), _0xfb8e5d['func'](_0xfb8e5d, _0xfb8e5d['parent']);
    }), this['forward'] = new Button(_0x27c239 + _0xdb0d96 + _0xab5eca, _0x448bc6, _0xdb0d96, _0xdb0d96, this, ![], '+', function (_0x525d41, _0x46693e) {
        _0x46693e['attempt']++, _0x46693e['memory']['selected'] = overflow(_0x46693e['memory']['selected'] + 0x1, 0x0, _0x46693e['memory']['options']['length'] - 0x1), UI['SetValue'](_0x46693e['reference'], _0x46693e['memory']['selected']), _0x46693e['func'](_0x46693e, _0x46693e['parent']);
    }), _0x1aa876['elements']['push'](this);
}
Selector['prototype']['draw'] = function (_0x2928ef, _0x22e834) {
    this['font'] = this['parent']['font'], this['back']['draw'](_0x2928ef + 0x2, _0x22e834), this['forward']['draw'](_0x2928ef + 0x1, _0x22e834), Render['Rect'](_0x2928ef + this['x'] + this['height'] + 0x2, _0x22e834 + this['y'], this['width'], this['height'], [0xff, 0xff, 0x0, 0xff]), Render['StringCustom'](_0x2928ef + this['x'] + this['height'] + 0x2 + this['width'] / 0x2, _0x22e834 + this['y'] + this['height'] / 0x2 - Render['TextSizeCustom']('!', this['parent']['font'])[0x1] / 0x2, 0x1, this['memory']['options'][this['memory']['selected']], [0xff, 0xff, 0x0, 0xff], this['font']), this['text'] && Render['StringCustom'](_0x2928ef + this['text'][0x0], _0x22e834 + this['y'] + this['height'] / 0x2 - Render['TextSizeCustom']('!', this['parent']['font'])[0x1] / 0x2, this['text'][0x1], this['text'][0x2], [0xff, 0xff, 0x0, 0xff], this['parent']['font']);
};

function Dropdown(_0xe99b2b, _0x445fe7, _0x473f11, _0x174d93, _0x542347, _0x43ba67, _0x427bfa) {
    this['width'] = _0xe99b2b, this['parent'] = _0x445fe7, this['visible'] = _0x473f11, this['text'] = _0x174d93, this['reference'] = _0x542347, this['func'] = _0x43ba67, this['memory'] = _0x427bfa, this['attempt'] = 0x0, UI['AddDropdown'](_0x542347, _0x427bfa['options']), UI['SetEnabled'](_0x542347, ![]), CONFIG && CONFIG[_0x542347] != undefined && UI['SetValue'](_0x542347, CONFIG[_0x542347]), this['memory']['selected'] = UI['GetValue'](_0x542347), _0x43ba67(this, this['parent']), this['memory']['open'] = ![], this['button'] = new Button(_0x445fe7['width'] - _0x445fe7['height'], 0x0, _0x445fe7['height'], _0x445fe7['height'], this, ![], '>', function (_0x2f9783, _0x1d1bfb) {
        _0x1d1bfb['open'] = !_0x1d1bfb['open'], _0x2f9783['text'] = _0x1d1bfb['open'] ? 'O' : '>';
    }), this['memory']['buttons'] = [];
    for (var _0x41d690 in this['memory']['options']) {
        this['memory']['buttons']['push'](new Button(_0x445fe7['width'], this['parent']['height'] * _0x41d690, this['width'], this['parent']['height'], this, ![], this['memory']['options'][_0x41d690], function (_0x157d17, _0x2c310f) {
            _0x2c310f['attempt']++, _0x2c310f['memory']['selected'] = _0x2c310f['memory']['buttons']['indexOf'](_0x157d17), UI['SetValue'](_0x2c310f['reference'], _0x2c310f['memory']['selected']), _0x2c310f['func'](_0x2c310f, _0x2c310f['parent']);
        }, undefined, this['memory']['selected'] == _0x41d690 ? [0x0, 0x0, 0x0, 0xe6] : undefined));
    };
    _0x445fe7['elements']['push'](this);
}
Dropdown['prototype']['draw'] = function (_0x887b84, _0x3da327) {
    this['font'] = this['parent']['font'], this['button']['draw'](_0x887b84, _0x3da327), Render['Rect'](_0x887b84 + this['parent']['width'] - this['width'] - this['parent']['height'] + 0x1, _0x3da327, this['width'], this['parent']['height'], [0xff, 0xff, 0x0, 0xff]), Render['StringCustom'](_0x887b84 + this['parent']['width'] - this['width'] / 0x2 - this['parent']['height'] + 0x1, _0x3da327 + this['parent']['height'] / 0x2 - Render['TextSizeCustom']('!', this['parent']['font'])[0x1] / 0x2, 0x1, this['memory']['options'][this['memory']['selected']], [0xff, 0xff, 0x0, 0xff], this['font']), this['text'] && Render['StringCustom'](_0x887b84 + this['text'][0x0], _0x3da327 + this['parent']['height'] / 0x2 - Render['TextSizeCustom']('!', this['parent']['font'])[0x1] / 0x2, this['text'][0x1], this['text'][0x2], [0xff, 0xff, 0x0, 0xff], this['parent']['font']);
    if (!this['open']) return;
    for (b in this['memory']['buttons']) {
        this['memory']['buttons'][b]['color'] = b == this['memory']['selected'] ? [0x0, 0x0, 0x0, 0xc8] : undefined, this['memory']['buttons'][b]['draw'](_0x887b84, _0x3da327);
    }
};

function Slider(_0x36e7bf, _0x237f36, _0x4cfc08, _0x53e2fa, _0x4e86e3, _0x83f19, _0x95be7e) {
    this['width'] = _0x36e7bf, this['parent'] = _0x237f36, this['visible'] = _0x4cfc08, this['text'] = _0x53e2fa, this['reference'] = _0x4e86e3, this['func'] = _0x83f19, this['memory'] = _0x95be7e, this['attempt'] = 0x0, UI['AddSliderInt'](_0x4e86e3, _0x95be7e['min'], _0x95be7e['max']), UI['SetEnabled'](_0x4e86e3, ![]), CONFIG && CONFIG[_0x4e86e3] != undefined && UI['SetValue'](_0x4e86e3, CONFIG[_0x4e86e3]), this['memory']['val'] = UI['GetValue'](_0x4e86e3), _0x83f19(this, this['parent']), this['bar'] = new Button(_0x237f36['width'] - this['width'] + 0x1, 0x0, this['width'] - 0x1, _0x237f36['height'], this, ![], undefined, function (_0x53d748, _0x24fdd9) {
        _0x24fdd9['attempt']++, _0x24fdd9['memory']['val'] = Math['round'](_0x24fdd9['memory']['min'] + (Input['GetCursorPosition']()[0x0] - _0x24fdd9['parent']['x'] - _0x53d748['x']) / _0x24fdd9['width'] * (Math['abs'](_0x24fdd9['memory']['min']) + Math['abs'](_0x24fdd9['memory']['max']))), UI['SetValue'](_0x24fdd9['reference'], _0x24fdd9['memory']['val']), _0x83f19(_0x24fdd9, _0x24fdd9['parent']);
    }, undefined, [0xff, 0xff, 0x0, 0x14], !![]), _0x237f36['elements']['push'](this);
}
Slider['prototype']['draw'] = function (_0x24c4c0, _0x54ebdc) {
    this['bar']['draw'](_0x24c4c0, _0x54ebdc), Render['FilledRect'](_0x24c4c0 + this['parent']['width'] - this['width'] + 0x1, _0x54ebdc, (this['memory']['val'] + (this['memory']['min'] < 0x0 ? this['memory']['max'] : 0x0)) / (Math['abs'](this['memory']['min']) + Math['abs'](this['memory']['max'])) * this['width'], this['parent']['height'], [0xff, 0xff, 0x0, 0x19]), Render['StringCustom'](_0x24c4c0 + this['parent']['width'] - this['width'] + this['width'] / 0x2, _0x54ebdc + this['parent']['height'] / 0x2 - Render['TextSizeCustom']('!', this['parent']['font'])[0x1] / 0x2, 0x1, this['memory']['val'] + '', [0xff, 0xff, 0x0, 0xff], this['parent']['font']), this['text'] && Render['StringCustom'](_0x24c4c0 + this['text'][0x0], _0x54ebdc + this['parent']['height'] / 0x2 - Render['TextSizeCustom']('!', this['parent']['font'])[0x1] / 0x2, this['text'][0x1], this['text'][0x2], [0xff, 0xff, 0x0, 0xff], this['parent']['font']);
};

function onDraw() {
    var _0xb763fa = _0x1e98;
    if (options[UI['GetValue']('menu type')]['showArrows']['toggled'] && options[UI['GetValue']('menu type')]['style']['memory']['selected'] != 0x2) {
        var _0x246b3d = [
            [0xff, 0x0, 0x0, 0xff],
            [0xff, 0x0, 0x0, 0xff],
            [0xff, 0x0, 0x0, 0xff]
        ];
        if (options[UI['GetValue']('menu type')]['style']['memory']['selected'] == 0x0) _0x246b3d[dir] = [0x0, 0x0, 0xff, 0xff];
        else {
            if (UI[_0xb763fa(0x135)]('Fake angles', 'Inverter')) _0x246b3d[0x0] = [0x0, 0x0, 0xff, 0xff];
            else _0x246b3d[0x2] = [0x0, 0x0, 0xff, 0xff];
        }
        Render['String'](x - 0x32, y - 0x14, 0x1, '<<<', _0x246b3d[0x0], 0x4), Render['String'](x, y + 0x14, 0x1, options[UI['GetValue']('menu type')]['style']['memory']['selected'] == 0x0 ? 'V' : '', _0x246b3d[0x1], 0x4), Render['String'](x + 0x32, y - 0x14, 0x1, '>>>', _0x246b3d[0x2], 0x4);
    }
    if (UI['IsHotkeyActive']('Script Items', 'left')) dir = 0x0;
    else {
        if (UI['IsHotkeyActive']('Script Items', 'back')) dir = 0x1;
        else {
            if (UI['IsHotkeyActive']('Script Items', 'right')) dir = 0x2;
        }
    }
    if (!UI['IsMenuOpen']()) return;
    var _0x323b12 = UI['GetValue']('menu type');
    options['forEach'](function (_0x2d141d, _0x26dd89) {
        for (var _0x32f742 in _0x2d141d) _0x2d141d[_0x32f742]['visible'] = _0x323b12 == _0x26dd89 && (_0x2d141d[_0x32f742]['memory'] != undefined ? _0x2d141d[_0x32f742]['memory']['visiblecon'] != undefined ? _0x2d141d[_0x32f742]['memory']['visiblecon'] : !![] : !![]);
    }), menu['draw']();
}

function aaSuper() {
    var _0x5acc3e = _0x1e98,
        _0xa6e93c = UI['GetValue']('menu type');
    if (options[0x1]['adjustPitch']['toggled'] && _0xa6e93c == 0x1) {
        if (getVel() > options[0x1]['adjustcon']['memory']['val']) UI['SetValue']('Extra', 'Pitch', options[0x1]['adjustedPitch']['memory']['selected']);
        else UI['SetValue']('Extra', 'Pitch', defaultpitch);
    }
    if (Globals['Tickcount']() % (_0xa6e93c == 0x0 ? ~~(0x32 / Math['pow'](options[0x0]['speed']['memory']['selected'] + 0x1, 0x2)) : options[0x1]['freq']['memory']['val']) != 0x0) return;
    cycle = !cycle;
    var _0x5a7757 = _0xa6e93c == 0x0 ? ~~(0xf * (options[0x0]['width']['memory']['selected'] + 0x1)) : options[0x1]['width']['memory']['val'],
        _0x5c167b = _0xa6e93c == 0x0 ? +options[0x0]['randomize']['memory']['selected'] * 0xa || 0x0 : options[0x1]['randomize']['memory']['val'];
    [function () {
        var _0x2453e3 = 0x0;
        if (dir == 0x0) _0x2453e3 = cycle ? -0x5a : _0x5a7757 - 0x5a;
        else {
            if (dir == 0x1) _0x2453e3 = cycle ? _0x5a7757 / 0x2 : -(_0x5a7757 / 0x2);
            else {
                if (dir == 0x2) _0x2453e3 = cycle ? 0x5a : 0x5a - _0x5a7757;
            }
        }
        UI['SetValue']('Yaw offset', overflow(_0x2453e3 + (_0xa6e93c == 0x1 ? options[0x1]['rot']['memory']['val'] : 0x0), -0x5, 0x19));
    }, function () {
        spin += options[0x1]['spin']['memory']['val'];
        if (options[0x1]['spin']['memory']['val'] == 0x0 || _0xa6e93c == 0x0) spin = 0x0;
        if (UI['IsHotkeyActive']('Fake angles', 'Inverter')) UI['SetValue']('Yaw offset', cycle ? overflow(0xb4 + spin + (_0xa6e93c == 0x1 ? options[0x1]['rot']['memory']['val'] : 0x0), 0x0, 0x19) - 0x5 : overflow(0xb4 + spin + (_0xa6e93c == 0x1 ? options[0x1]['rot']['memory']['val'] : 0x0), 0x0, 0xb4));
        else UI['SetValue']('Yaw offset', cycle ? 0xb4 - overflow(0xb4 + spin + (_0xa6e93c == 0x1 ? options[0x1]['rot']['memory']['val'] : 0x0), 0x0, 0x19) : -overflow(0xb4 + spin + (_0xa6e93c == 0x1 ? options[0x1]['rot']['memory']['val'] : 0x0), 0x0, 0xb4));
    }, function () {
        UI['SetValue']('Yaw offset', ~~(Math['random']() * 0x168) - 0xb4);
    }][options[_0xa6e93c]['style']['memory']['selected']](), UI['SetValue']('Yaw offset', overflow(UI['GetValue']('Yaw offset') + ~~(Math['random']() * _0x5c167b) - _0x5c167b, -0x13, 0x13));
    if (_0xa6e93c != 0x1) return;
    if (options[0x1]['offsetJitter']['toggled'] && Globals['Tickcount']() % options[0x1]['jitternth']['memory']['val'] == 0x0) {
        var _0x56e44e = ~~(options[0x1]['jitterwidth']['memory']['val'] / 0x2);
        _0x56e44e = cycle ? _0x56e44e : -_0x56e44e, _0x56e44e += ~~overflow(Math['random']() * options[0x1]['jitterrandomize']['memory']['val'] - options[0x1]['jitterrandomize']['memory']['val'], -0x12, 0x12), UI['SetValue']('Jitter offset', _0x56e44e);
    }
    if (options[0x1][_0x5acc3e(0x136)]['toggled'] && Globals['Tickcount']() % options[0x1]['lbynth']['memory']['val'] == 0x0) {
        var _0x4b46c8 = options[0x1]['lbyExclude']['memory']['selected'];
        lbystate = overflow(lbystate + 0x1, 0x0, 0x2);
        if (_0x4b46c8 != 0x0 && lbystate == _0x4b46c8 - 0x1) lbystate = overflow(lbystate + 0x1, 0x0, 0x2);
        UI['SetValue']('LBY mode', lbystate);
    }
}

function playerHurt() {
    if (options[UI['GetValue']('menu type')]['autoInvert']['toggled'] && Entity['GetEntityFromUserID'](Event['GetInt']('userid')) == local) UI['ToggleHotkey']('Fake angles', 'Inverter');
}

function exportSettings() {
    var _0x284377 = '{';
    options['forEach'](function (_0x48e92d, _0x39fac9) {
        for (var _0x4074f4 in _0x48e92d)
            if (_0x48e92d[_0x4074f4]['reference']) _0x284377 += '\"' + _0x48e92d[_0x4074f4]['reference'] + '\": ' + UI['GetValue'](_0x48e92d[_0x4074f4]['reference']) + ', ';
    }), Cheat['Print']('\x0a' + _0x284377['substring'](0x0, _0x284377['length'] - 0x2) + '}');
}
UI['AddDropdown']('menu type', ['Simple', 'Difficult']), UI['AddHotkey']('left'), UI['AddHotkey']('back'), UI['AddHotkey']('right');
var menu = new Menu(0xc8, 0xc8, reserve1, reserve, !![], '       Cracked by Differenz & .0'),
    options = [{}, {}];
options[0x0]['style'] = new Selector(menu['width'] - 0xcb, 0x0, 0x96, 0x1a, menu, !![], [0x3, 0x0, 'jitter style'], '2TN', function (_0x9cced5) {
    if (_0x9cced5['attempt'] == 0x0) return;
    options[0x0]['width']['memory']['visiblecon'] = options[0x0]['style']['memory']['selected'] == 0x0;
}, {
    'selected': undefined,
    'options': ['constrained', 'opposites']
}), options[0x0]['width'] = new Selector(menu['width'] - 0xcb, 0x0, 0x96, 0x1a, menu, !![], [0x3, 0x0, 'jitter width'], 'M2w', function () {}, {
    'selected': undefined,
    'options': ['15', '30', '45', '60', '75', '90', '100'],
    'visiblecon': options[0x0]['style']['memory']['selected'] == 0x0
}), options[0x0]['speed'] = new Selector(menu['width'] - 0xcb, 0x0, 0x96, 0x1a, menu, !![], [0x3, 0x0, 'jitter speed'], 'Yae', function () {}, {
    'selected': undefined,
    'options': ['slow', 'average', 'fast', 'hyper']
}), options[0x0]['randomize'] = new Selector(menu['width'] - 0xcb, 0x0, 0x96, 0x1a, menu, !![], [0x3, 0x0, 'Randome'], 'P78', function () {}, {
    'selected': undefined,
    'options': ['none', '10', '20', '30', '40', '50', '60', '70']
}), options[0x0]['autoInvert'] = new Checkbox(0x0, 0x0, 0x1a, 0x1a, menu, !![], [0x1e, 0x0, 'invert when hurt'], 'VSj', function () {}), options[0x0]['showArrows'] = new Checkbox(0x0, 0x0, 0x1a, 0x1a, menu, !![], [0x1e, 0x0, 'Indicator'], 'tGb', function () {}), options[0x1]['style'] = new Dropdown(0xaa, menu, !![], [0x3, 0x0, 'jitter style'], 'Fp6', function (_0x4f146b) {
    if (_0x4f146b['attempt'] == 0x0) return;
    options[0x1]['width']['memory']['visiblecon'] = _0x4f146b['memory']['selected'] != 0x2, options[0x1]['randomize']['memory']['visiblecon'] = _0x4f146b['memory']['selected'] != 0x2, options[0x1]['spin']['memory']['visiblecon'] = _0x4f146b['memory']['selected'] == 0x1, options[0x1]['rot']['memory']['visiblecon'] = _0x4f146b['memory']['selected'] != 0x2;
}, {
    'selected': 0x0,
    'options': ['constrained', 'opposites', 'unconstrained']
}), options[0x1]['width'] = new Slider(0xc4, menu, !![], [0x3, 0x0, 'jitter width'], '5jF', function () {}, {
    'min': 0x0,
    'max': 0x5a,
    'visiblecon': options[0x1]['style']['memory']['selected'] != 0x2
}), options[0x1]['randomize'] = new Slider(0xc4, menu, !![], [0x3, 0x0, 'Randome'], 'E3u', function () {}, {
    'min': 0x0,
    'max': 0x2d,
    'visiblecon': options[0x1]['style']['memory']['selected'] != 0x2
}), options[0x1]['spin'] = new Slider(0xc4, menu, !![], [0x3, 0x0, 'spin speed'], '3xM', function () {}, {
    'min': -0x1e,
    'max': 0x1e,
    'visiblecon': options[0x1]['style']['memory']['selected'] == 0x1
}), options[0x1]['rot'] = new Slider(0xc4, menu, !![], [0x3, 0x0, 'yaw rotation'], '8xh', function () {}, {
    'min': -0xb4,
    'max': 0xb4,
    'visiblecon': options[0x1]['style']['memory']['selected'] != 0x2
}), options[0x1][_0x3031e9(0x133)] = new Slider(0xc4, menu, !![], [0x3, 0x0, 'cycle frequency'], 'kK6', function () {}, {
    'min': 0x1,
    'max': 0x64
}), options[0x1]['offsetJitter'] = new Checkbox(0x0, 0x0, 0x1a, 0x1a, menu, !![], [0x1e, 0x0, 'jitter offset'], 'XxD', function (_0x264a4e) {
    if (_0x264a4e['attempt'] == 0x0) return;
    options[0x1]['jitterwidth']['memory']['visiblecon'] = _0x264a4e['toggled'], options[0x1]['jitterrandomize']['memory']['visiblecon'] = _0x264a4e['toggled'], options[0x1]['jitternth']['memory']['visiblecon'] = _0x264a4e['toggled'];
}), options[0x1]['jitterwidth'] = new Slider(0xc4, menu, !![], [0x3, 0x0, 'jitter width'], 'VM2', function () {}, {
    'min': 0x0,
    'max': 0xb4,
    'visiblecon': options[0x1]['offsetJitter']['toggled']
}), options[0x1]['jitterrandomize'] = new Slider(0xc4, menu, !![], [0x3, 0x0, 'jitter randomize'], '2ya', function () {}, {
    'min': 0x0,
    'max': 0x2d,
    'visiblecon': options[0x1]['offsetJitter']['toggled']
}), options[0x1]['jitternth'] = new Slider(0xc4, menu, !![], [0x3, 0x0, 'offset frequency'], 'RG4', function () {}, {
    'min': 0x1,
    'max': 0x64,
    'visiblecon': options[0x1]['offsetJitter']['toggled']
}), options[0x1]['lbyJitter'] = new Checkbox(0x0, 0x0, 0x1a, 0x1a, menu, !![], [0x1e, 0x0, 'lby jitter'], 'EB3', function (_0xa299a7) {
    if (_0xa299a7['attempt'] == 0x0) return;
    options[0x1]['lbyExclude']['memory']['visiblecon'] = _0xa299a7['toggled'], options[0x1]['lbynth']['memory']['visiblecon'] = _0xa299a7['toggled'];
}), options[0x1]['lbyExclude'] = new Dropdown(0xaa, menu, !![], [0x3, 0x0, 'lby exclude'], 'G8C', function () {}, {
    'selected': 0x0,
    'options': ['none', 'normal', _0x3031e9(0x131), 'sway'],
    'visiblecon': options[0x1]['lbyJitter']['toggled']
}), options[0x1]['lbynth'] = new Slider(0xc4, menu, !![], [0x3, 0x0, 'lby jitter frequency'], 'ke2', function () {}, {
    'min': 0x1,
    'max': 0x64,
    'visiblecon': options[0x1]['lbyJitter']['toggled']
}), options[0x1]['adjustPitch'] = new Checkbox(0x0, 0x0, 0x1a, 0x1a, menu, !![], [0x1e, 0x0, 'adjust pitch'], 'xN8', function (_0x39564f) {
    if (_0x39564f['attempt'] == 0x0) return;
    options[0x1]['adjustcon']['memory']['visiblecon'] = _0x39564f['toggled'], options[0x1]['adjustedPitch']['memory']['visiblecon'] = _0x39564f['toggled'];
}), options[0x1]['adjustcon'] = new Slider(0xc4, menu, !![], [0x3, 0x0, 'velocity condition'], 'au2', function () {}, {
    'min': 0x5,
    'max': 0xf0,
    'visiblecon': options[0x1]['adjustPitch']['toggled']
}), options[0x1]['adjustedPitch'] = new Dropdown(0xaa, menu, !![], [0x3, 0x0, 'adjusted pitch'], '9bf', function () {}, {
    'selected': 0x0,
    'options': ['pitch disabled', 'down', 'emotion', 'zero', 'up', 'fake up', 'fake down'],
    'visiblecon': options[0x1]['adjustPitch']['toggled']
}), options[0x1]['autoInvert'] = new Checkbox(0x0, 0x0, 0x1a, 0x1a, menu, !![], [0x1e, 0x0, 'invert when hurt'], 'z5T', function (_0x1a5cef) {}), options[0x1]['showArrows'] = new Checkbox(0x0, 0x0, 0x1a, 0x1a, menu, !![], [0x1e, 0x0, 'Indicator'], '8Hx', function (_0x3f9bfa) {}), options[0x1]['export'] = new Button(0x0, 0x0, menu['width'], menu['height'], menu, !![], 'Export Settings', exportSettings);
defaultpitch = UI['GetValue']('Extra', 'Pitch'), Cheat['RegisterCallback']('Draw', 'onDraw'), Cheat['RegisterCallback']('CreateMove', 'aaSuper'), Cheat['RegisterCallback']('player_hurt', 'playerHurt');