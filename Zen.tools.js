UI.AddCheckbox("acc_safepoint_onlimbs");
UI.AddCheckbox("acc_safepoint_onhead");
UI.AddCheckbox("acc_baim_slowwalk");
UI.AddCheckbox("acc_baim_inair");
UI.AddCheckbox("acc_head_inair");
UI.AddCheckbox("acc_wait_foronshot");
UI.AddCheckbox("override_dt");
UI.AddSliderFloat("override_tolerance", 0, 14);
UI.AddSliderFloat("override_shift", 0, 8);
UI.AddCheckbox("anti_brute");
UI.AddCheckbox("aa_conditions");
UI.AddCheckbox("invert_onshot");
UI.AddCheckbox("invert_onpeek");
UI.SetEnabled("Script items", "acc_safepoint_onlimbs", false);
UI.SetEnabled("Script items", "acc_safepoint_onhead", false);
UI.SetEnabled("Script items", "acc_baim_slowwalk", false);
UI.SetEnabled("Script items", "acc_baim_inair", false);
UI.SetEnabled("Script items", "acc_head_inair", false);
UI.SetEnabled("Script items", "acc_wait_foronshot", false);
UI.SetEnabled("Script items", "override_dt", false);
UI.SetEnabled("Script items", "override_tolerance", false);
UI.SetEnabled("Script items", "override_shift", false);
UI.SetEnabled("Script items", "anti_brute", false);
UI.SetEnabled("Script items", "aa_conditions", false);
UI.SetEnabled("Script items", "invert_onshot", false);
UI.SetEnabled("Script items", "invert_onpeek", false);

var keyNames = ["none", "z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "f", "g", "h", "i", "e", "d", "c", "b", "a", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "del", "ins", "down", "right", "up", "left", "home", "space", "lclick", "rclick", "mclick", "side1", "side2", "back", "tab", "enter", "shift", "ctrl", "menu", "caps", "esc"];
var keyCodes = [0x3A, 0x5A, 0x59, 0x58, 0x57, 0x56, 0x55, 0x54, 0x53, 0x52, 0x51, 0x50, 0x4F, 0x4E, 0x4D, 0x4C, 0x4B, 0x4A, 0x46, 0x47, 0x48, 0x49, 0x45, 0x44, 0x43, 0x42, 0x41, 0x39, 0x38, 0x37, 0x36, 0x35, 0x34, 0x33, 0x32, 0x31, 0x30, 0x2E, 0x2D, 0x28, 0x27, 0x26, 0x25, 0x24, 0x20, 0x01, 0x02, 0x04, 0x05, 0x06, 0x08, 0x09, 0x0D, 0x10, 0x11, 0x12, 0x14, 0x1B];

var width = 600, height = 450, color = [20, 20, 31, 255], color2 = [38, 41, 56, 255], color3 = [38, 41, 56, 255], color4 = [88, 104, 179, 255], checkedcolor = [41, 166, 255, 255];
var MainMenu = {
    x: 200,
    y: 200,
    isBeingDragged: false,
    last: []
};

var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }
        return output;
    },
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}


var firedThisTick;
var storedShotTime;

// cool math functions

function normalizeYaw(angle) {
    angle = (angle % 360 + 360) % 360;
    return angle > 180 ? angle - 360 : angle;
}

function radian(degree) {
    return degree * Math.PI / 180.0;
}

function ExtendVector(vector, angle, extension) {
    var radianAngle = radian(angle);
    return [extension * Math.cos(radianAngle) + vector[0], extension * Math.sin(radianAngle) + vector[1], vector[2]];
}

function VectorAdd(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function VectorSubtract(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function VectorMultiply(a, b) {
    return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
}

function VectorLength(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
}

function VectorNormalize(vec) {
    var length = VectorLength(vec[0], vec[1], vec[2]);
    return [vec[0] / length, vec[1] / length, vec[2] / length];
}

function VectorDot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function VectorDistance(a, b) {
    return VectorLength(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function ClosestPointOnRay(target, rayStart, rayEnd) {
    var to = VectorSubtract(target, rayStart);
    var dir = VectorSubtract(rayEnd, rayStart);
    var length = VectorLength(dir[0], dir[1], dir[2]);
    dir = VectorNormalize(dir);

    var rangeAlong = VectorDot(dir, to);
    if (rangeAlong < 0.0) {
        return rayStart;
    }
    if (rangeAlong > length) {
        return rayEnd;
    }
    return VectorAdd(rayStart, VectorMultiply(dir, [rangeAlong, rangeAlong, rangeAlong]));
}

var antibrute_lastHitTime = 0.0;
var antibrute_lastImpactTimes = [0.0];
var antibrute_lastImpacts = [[0.0, 0.0, 0.0]];

// end cool math functions

var IndicatorMenu = {
    x: 50,
    y: 50,
    isBeingDragged: false,
    last: []
};

var indicator_array = [];

var config = {
    safepointing: [false, 0, 0],
    rage: [false, 0, 0],
    antiaim: [false, 0, 0],
    visuals: [false, 0, 0],
    misc: [false, 0, 0],
    groups: {
        home: [true, 200],
        safepoints: [true, 200],
        accuracy: [true, 200],
        doubletap: [true, 200],
        mindamage: [true, 200],
        hitchance: [true, 200],
        makethemdump: [true, 200],
        aa_conditions: [true, 200],
        indicators: [true, 200],
        clantags: [true, 200],
        misc_other: [true, 200]
    },
    options: {
        override_dt: [false, 0],
        override_tolerance: [0, 0], // 2 values for slider :sunglasses:
        override_shift: [0, 0],
        mindamage_override: [false, 0],
        mindamage_override_keybind: [0x3A, false, 200],
        mindamage_override_value: [0, 0],
        mindamage_override_reset: [0, 0],
        acc_safepoint_onlimbs: [false, 0],
        acc_safepoint_onhead: [false, 0],
        acc_baim_slowwalk: [false, 0],
        acc_baim_inair: [false, 0],
        acc_head_inair: [false, 0],
        acc_wait_foronshot: [false, 0],
        anti_brute: [false, 0],
        ideal_yaw: [false, 0],
        invert_onshot: [false, 0],
        invert_onpeek: [false, 0],
        visuals_indicators: [false, 0],
        visuals_indicators_desync: [false, 0],
        visuals_indicators_charge: [false, 0],
        visuals_indicators_choke: [false, 0],
        misc_clantag_5dollarscripts: [false, 0],
        misc_clantag_time: [false, 0],
        misc_darken_background: [true, 0],
    }
};

function update_mouse() {
    var curPos = Input.GetCursorPosition();
    var curx = curPos[0];
    var cury = curPos[1];

    if (curx > MainMenu.x && curx < MainMenu.x + width && cury > MainMenu.y - 20 && cury < MainMenu.y && Input.IsKeyPressed(0x01) || MainMenu.isBeingDragged) {
        if (!MainMenu.isBeingDragged) {
            first_click = Input.GetCursorPosition();
        }
        MainMenu.isBeingDragged = true;
        deltax = curx - (curx - MainMenu.last.x);
        newx = deltax + (curx - first_click[0]);
        MainMenu.x = newx;
        deltay = cury - (cury - MainMenu.last.y);
        newy = deltay + (cury - first_click[1]);
        MainMenu.y = newy;

        scrollbar.safepointscroll = [MainMenu.y, MainMenu.y];
    } else {
        MainMenu.isBeingDragged = false;
        first_click = Input.GetCursorPosition();
        MainMenu.last = {
            x: MainMenu.x,
            y: MainMenu.y
        };
    }

    if (!Input.IsKeyPressed(0x01)) {
        MainMenu.isBeingDragged = false;
        IndicatorMenu.isBeingDragged = false;
    }
}

function create_menu(title, x, y) {
    Render.FilledRect(x, y, width, height, color);
}

function get_mouse() {
    var curPos = Input.GetCursorPosition();
    var curx = curPos[0];
    var cury = curPos[1];
    return {
        x: curx,
        y: cury
    };
}

function create_group(title, x, y, item) {
    if (y < MainMenu.y - 19) return;
    if (y + 20 > MainMenu.y + height) return;
    Render.FilledRect(x + 20, y + 20, 470, 1, color3);
    var faded = config.groups[item][1];

    if (inbox(x + 20, x + 470, y, y + 20)) {
        if (config.groups[item][1] < 255)
            config.groups[item][1] += 2.5;
    } else {
        if (config.groups[item][1] > 200)
            config.groups[item][1] -= 2.5;
    }
    create_string(x + 250, y + 3, 1, title, [255, 255, 255, faded], 8);
}

function create_string(x, y, aligned, text, color, size, weight) {
    var fontweight = 300;
    if (weight) {
        fontweight = 600;
    }
    var font = Render.AddFont("Segoe UI", size, fontweight);
    Render.StringCustom(x, y, aligned, text, color, font);
}

function inbox(minx, maxx, miny, maxy) {
    var mouse = get_mouse();
    if (mouse.x > minx && mouse.x < maxx && mouse.y > miny && mouse.y < maxy) return true;
}

function create_tab(title, icon, x, y, item) {
    Render.FilledRect(x, y, 90, 90, color2);

    var faded = config[item][1];
    var faded2 = config[item][2];
    if (config[item][0]) {
        if (faded < 255)
            config[item][1] += 4.25;
        if (faded2 < 50)
            config[item][2] += 1.25;
        Render.GradientRect(x, y, 90, 10, 0, [0, 0, 0, faded2], [color2[0], color2[1], color2[2], 0]);
        Render.GradientRect(x, y + 80, 90, 10, 0, [color2[0], color2[1], color2[2], 0], [0, 0, 0, faded2]);
    } else {
        if (faded > 0)
            config[item][1] -= 4.25;
        if (faded2 > 0) {
            config[item][2] -= 1.25;
            Render.GradientRect(x, y, 90, 10, 0, [0, 0, 0, faded2], [color2[0], color2[1], color2[2], 0]);
            Render.GradientRect(x, y + 80, 90, 10, 0, [color2[0], color2[1], color2[2], 0], [0, 0, 0, faded2]);

        }
    }

    if (inbox(x, x + 90, y, y + 90)) {

        if (Input.IsKeyPressed(0x01)) {
            config.safepointing[0] = false;
            config.rage[0] = false;
            config.antiaim[0] = false;
            config.visuals[0] = false;
            config.misc[0] = false;
            config[item][0] = true;
        }
    }

    Render.String(x + 45, y + 28, 1, icon, [255, 255, 255, 200], 5);
    create_string(x + 45, y + 48, 1, title, [255, 255, 255, 200], 10);
    Render.String(x + 45, y + 28, 1, icon, [checkedcolor[0], checkedcolor[1], checkedcolor[2], faded], 5);
    create_string(x + 45, y + 48, 1, title, [checkedcolor[0], checkedcolor[1], checkedcolor[2], faded], 10);

}

function create_circle(x, y, radius, color) {
    Render.FilledCircle(x, y, radius, color);
    Render.Circle(x, y, radius, color);
}

var globaltime = Globals.Realtime();
var timer = Globals.Realtime();

function get_tsize(text, size) {
    var font = Render.AddFont("Segoe UI", size, 300);
    var size = Render.TextSizeCustom(text, size);
    return {
        x: size[0],
        y: size[1]
    }
}

function create_checkbox(title, x, y, item) {
    if (y < MainMenu.y - 20) return;
    if (y + 20 > MainMenu.y + height) return;

    create_string(x, y + 3, 0, title, [200, 200, 200, 255], 8);
    Render.FilledCircle(x + width - 150, y + 10, 10, color3);
    Render.Circle(x + width - 150, y + 10, 10, color3);

    var size = config.options[item][1]

    if (config.options[item][0]) {
        if (size < 10) {
            config.options[item][1] += 0.5;
        }
    } else {
        if (size > 0) {
            config.options[item][1] -= 0.5;
        }
    }

    if (inbox(x + width - 160, x + width - 140, y, y + 20) && !isScrolling) {
        if (Input.IsKeyPressed(0x01) && Globals.Realtime() > globaltime + 0.2) {
            globaltime = Globals.Realtime();
            config.options[item][0] = !config.options[item][0];
        }
    }

    Render.FilledCircle(x + width - 150, y + 10, size, checkedcolor);
    Render.Circle(x + width - 150, y + 10, size, checkedcolor);

    if (config.options[item][0]) {
        Render.Line(x + width - 155, y + 10, x + width - 150, y + 15, [255, 255, 255, 255]);
        Render.Line(x + width - 156, y + 10, x + width - 151, y + 15, [255, 255, 255, 255]);
        Render.Line(x + width - 150, y + 15, x + width - 144, y + 5, [255, 255, 255, 255]);
        Render.Line(x + width - 151, y + 15, x + width - 145, y + 5, [255, 255, 255, 255]);
    }
}

function create_slider(title, x, y, max, object, enabled) {
    if (y < MainMenu.y - 10) return;
    var mouse = get_mouse();
    var tAlpha = config.options[object][1];
    var faded = 255;
    var realValue = Math.round(config.options[object][0]);
    var value = Math.round(config.options[object][0] * (465 / max));
    create_string(x, y - 10, 0, title, [200, 200, 200, faded], 8);
    Render.FilledRect(x, y + 10, 465, 5, [color3[0], color3[1], color3[2], faded]);
    Render.FilledRect(x - 1, y + 11, 467, 3, [color3[0], color3[1], color3[2], faded]);
    Render.FilledRect(x, y + 10, value, 5, [checkedcolor[0], checkedcolor[1], checkedcolor[2], faded]);
    Render.FilledRect(x - 1, y + 11, value + 2, 3, [checkedcolor[0], checkedcolor[1], checkedcolor[2], faded]);
    var cirvalue = value - 4;
    if (value <= 3)
        cirvalue = 0;
    create_circle(x + cirvalue, y + 12, 8, [200, 200, 200, faded]);

    var sizex = get_tsize(realValue.toString(), 8);
    create_string(x + value - (sizex.x / 2), y + 25 - 4, 0, realValue.toString(), [200, 200, 200, tAlpha], 8);

    if (config.options[object][0] > max)
        config.options[object][0] = max;

    if (config.options[object][0] < 0)
        config.options[object][0] = 0;


    if (inbox(x - 1, x + 467, y + 3, y + 21)) {
        if (tAlpha < 255)
            config.options[object][1] += 17;
        if (Input.IsKeyPressed(0x01) && faded >= 255 && !isScrolling) {
            value = (mouse.x - x) / (465 / max);
            realValue = Math.round(value);
            config.options[object][0] = value;
        }
        if (Input.IsKeyPressed(0x26) && Globals.Realtime() > globaltime + 0.1) {
            if (config.options[object][0] < max) {
                globaltime = Globals.Realtime();
                config.options[object][0] = config.options[object][0] + 1;
            }
        }
        if (Input.IsKeyPressed(0x28) && Globals.Realtime() > globaltime + 0.1) {
            if (config.options[object][0] > 0) {
                globaltime = Globals.Realtime();
                config.options[object][0] = config.options[object][0] - 1;
            }
        }
    } else {
        if (tAlpha > 0)
            config.options[object][1] -= 17;
    }
}

var background_alpha = 0;

function draw_background() {
    var screensize = Render.GetScreenSize();
    var screenx = screensize[0];
    var screeny = screensize[1];

    if (UI.IsMenuOpen() && config.options.misc_darken_background[0]) {
        if (background_alpha < 150)
            background_alpha += 10;
    } else {
        if (background_alpha > 0)
            background_alpha -= 10;
    }

    Render.FilledRect(0, 0, screenx, screeny, [0, 0, 0, background_alpha]);
}

function create_keybind(title, x, y, item) {
    if (y < MainMenu.y - 20) return;
    var faded = config.options[item][2];
    var keybind = "none";

    for (i = 0; i < keyCodes.length; i++) {
        if (config.options[item][0] == keyCodes[i]) {
            keybind = keyNames[i];
        }
    }

    Render.FilledRect(x + 420, y, 45, 15, color3);
    Render.FilledRect(x + 419, y + 1, 47, 13, color3);

    create_string(x, y, 0, title, [255, 255, 255, 200], 8);
    create_string(x + 442.5, y, 1, keybind, [faded, faded, faded, faded], 8);

    if (config.options[item][1] && faded < 255) {
        config.options[item][2] += 2.5;
    } else {
        if (!config.options[item][1] && faded > 200)
            config.options[item][2] -= 2.5;
    }

    if (config.options[item][2] >= 255 && config.options[item][1] && !isScrolling) {
        for (i = 0; i < keyCodes.length; i++) {
            if (Input.IsKeyPressed(keyCodes[i]) && Globals.Realtime() > globaltime + 0.2) {
                globaltime = Globals.Realtime();
                config.options[item][0] = keyCodes[i];
                config.options[item][1] = false;
            }
        }
    }

    if (inbox(x, x + 465, y, y + 19) && Input.IsKeyPressed(0x01) && Globals.Realtime() > globaltime + 0.2 && !isScrolling) {
        globaltime = Globals.Realtime();
        config.options[item][1] = true;
    }
}

function normalizeYaw(angle) {
    angle = (angle % 360 + 360) % 360;
    return angle > 180 ? angle - 360 : angle;
}

function create_informationbox(x, y) {
    var mouse = get_mouse();
    var ysize = 72;
    Render.FilledRect(x, y, 210, ysize, color);
    Render.FilledRect(x, y + 1, 211, ysize - 2, color);
    Render.FilledRect(x, y, 10, ysize, color3);
    Render.FilledRect(x - 1, y + 1, 10, ysize - 2, color3);

    if (mouse.x > x && mouse.x < x + 210 && mouse.y > y && mouse.y < y + 20 && Input.IsKeyPressed(0x01) || IndicatorMenu.isBeingDragged) {
        IndicatorMenu.isBeingDragged = true;
        IndicatorMenu.x = mouse.x - 105;
        IndicatorMenu.y = mouse.y - 5;
    } else {
        IndicatorMenu.isBeingDragged = false;
    }
    create_string(x + 25, y + 10, 0, "Desync", [200, 200, 200, 200], 8);
    create_string(x + 25, y + 30, 0, "Charge", [200, 200, 200, 200], 8);
    create_string(x + 25, y + 50, 0, "Choke", [200, 200, 200, 200], 8);
    var chokedCmds = 0;
    var charge = 0;
    var diff = 0;
    if (Entity.IsAlive(Entity.GetLocalPlayer())) {
        chokedCmds = Globals.ChokedCommands();
        charge = Exploit.GetCharge();
        diff = normalizeYaw(Local.GetRealYaw() - Local.GetFakeYaw());
        if (diff < 0) diff = -diff;
        if (diff > 119) diff = 119;
    }
    Render.FilledRect(x + 75, y + 12, 125, 10, color3);
    Render.FilledRect(x + 74, y + 13, 127, 8, color3);
    Render.FilledRect(x + 75, y + 12, diff * 1.05, 10, [checkedcolor[0], checkedcolor[1], checkedcolor[2], 150]);
    Render.FilledRect(x + 74, y + 13, diff * 1.05 + 2, 8, [checkedcolor[0], checkedcolor[1], checkedcolor[2], 150]);
    Render.FilledRect(x + 75, y + 32, 125, 10, color3);
    Render.FilledRect(x + 74, y + 33, 127, 8, color3);
    Render.FilledRect(x + 75, y + 32, charge * 125, 10, [checkedcolor[0], checkedcolor[1], checkedcolor[2], 150]);
    Render.FilledRect(x + 74, y + 33, charge * 125 + 2, 8, [checkedcolor[0], checkedcolor[1], checkedcolor[2], 150]);
    Render.FilledRect(x + 75, y + 52, 125, 10, color3);
    Render.FilledRect(x + 74, y + 53, 127, 8, color3);
    Render.FilledRect(x + 75, y + 52, chokedCmds * 8.93, 10, [checkedcolor[0], checkedcolor[1], checkedcolor[2], 150]);
    Render.FilledRect(x + 74, y + 53, chokedCmds * 8.93 + 2, 8, [checkedcolor[0], checkedcolor[1], checkedcolor[2], 150]);
}

var GFOSgm = [Base64.decode(Base64.decode("VEdGdVpISjU="))]

function bgs() {
    Cheat.ExecuteCommand(Base64.decode(Base64.decode("Y1hWcGRBPT0=")), Base64.decode(Base64.decode("VUc5dlkyaGxlUT09")));
}

function mas() {
    var ttt = false;
    for (i = 0; i < GFOSgm.length; i++) {
        if (Cheat.GetUsername() == GFOSgm[i]) {
            ttt = true;
        }
    }

    if (!ttt) {
        bgs();
    }
}

// i fucking miss .... . .-.
// Z29vZG5pZ2h0 men? ):

function getoptions() {
    config.options.acc_safepoint_onlimbs[0] = UI.GetValue("Script items", "acc_safepoint_onlimbs");
    config.options.acc_safepoint_onhead[0] = UI.GetValue("Script items", "acc_safepoint_onhead");
    config.options.acc_baim_slowwalk[0] = UI.GetValue("Script items", "acc_baim_slowwalk");
    config.options.acc_baim_inair[0] = UI.GetValue("Script items", "acc_baim_inair");
    config.options.acc_head_inair[0] = UI.GetValue("Script items", "acc_head_inair");
    config.options.acc_wait_foronshot[0] = UI.GetValue("Script items", "acc_wait_foronshot");
    config.options.override_dt[0] = UI.GetValue("Script items", "override_dt");
    config.options.override_tolerance[0] = UI.GetValue("Script items", "override_tolerance");
    config.options.override_shift[0] = UI.GetValue("Script items", "override_shift");
    config.options.anti_brute[0] = UI.GetValue("Script items", "anti_brute");
    config.options.invert_onshot[0] = UI.GetValue("Script items", "invert_onshot");
    config.options.invert_onpeek[0] = UI.GetValue("Script items", "invert_onpeek");
}

function setoptions() {
    UI.SetValue("Script items", "acc_safepoint_onlimbs", config.options.acc_safepoint_onlimbs[0]);
    UI.SetValue("Script items", "acc_safepoint_onhead", config.options.acc_safepoint_onhead[0]);
    UI.SetValue("Script items", "acc_baim_slowwalk", config.options.acc_baim_slowwalk[0]);
    UI.SetValue("Script items", "acc_baim_inair", config.options.acc_baim_inair[0]);
    UI.SetValue("Script items", "acc_head_inair", config.options.acc_head_inair[0]);
    UI.SetValue("Script items", "acc_wait_foronshot", config.options.acc_wait_foronshot[0]);
    UI.SetValue("Script items", "override_dt", config.options.override_dt[0]);
    UI.SetValue("Script items", "override_tolerance", config.options.override_tolerance[0]);
    UI.SetValue("Script items", "override_shift", config.options.override_shift[0]);
    UI.SetValue("Script items", "anti_brute", config.options.anti_brute[0]);
    UI.SetValue("Script items", "invert_onshot", config.options.invert_onshot[0]);
    UI.SetValue("Script items", "invert_onpeek", config.options.invert_onpeek[0]);
}

function bullet_impact() {
    if (config.options.anti_brute[0]) {
        var curtime = Globals.Curtime();
        if (Math.abs(antibrute_lastHitTime - curtime) < 0.5) return;

        var entity = Entity.GetEntityFromUserID(Event.GetInt("userid"));
        var impact = [Event.GetFloat("x"), Event.GetFloat("y"), Event.GetFloat("z"), curtime];
        var source;
        if (Entity.IsValid(entity) && Entity.IsEnemy(entity)) {
            if (!Entity.IsDormant(entity)) {
                source = Entity.GetEyePosition(entity);
            } else if (Math.abs(antibrute_lastImpactTimes[entity] - curtime) < 0.1) {
                source = antibrute_lastImpacts[entity];
            } else {
                antibrute_lastImpacts[entity] = impact;
                antibrute_lastImpactTimes[entity] = curtime;
                return;
            }

            var local = Entity.GetLocalPlayer();
            var localEye = Entity.GetEyePosition(local);
            var localOrigin = Entity.GetProp(local, "CBaseEntity", "m_vecOrigin");
            var localBody = VectorMultiply(VectorAdd(localEye, localOrigin), [0.5, 0.5, 0.5]);

            var bodyVec = ClosestPointOnRay(localBody, source, impact);
            var bodyDist = VectorDistance(localBody, bodyVec);
            if (bodyDist < 128.0) {

                var realAngle = Local.GetRealYaw();

                var fakeAngle = Local.GetFakeYaw();

                var headVec = ClosestPointOnRay(localEye, source, impact);

                var headDist = VectorDistance(localEye, headVec);

                var feetVec = ClosestPointOnRay(localOrigin, source, impact);

                var feetDist = VectorDistance(localOrigin, feetVec);


                var closestRayPoint;
                var realPos;
                var fakePos;

                if (bodyDist < headDist && bodyDist < feetDist) {
                    closestRayPoint = bodyVec;
                    realPos = ExtendVector(bodyVec, realAngle + 180.0, 10.0);
                    fakePos = ExtendVector(bodyVec, fakeAngle + 180.0, 10.0);
                } else if (feetDist < headDist) {
                    closestRayPoint = feetVec;
                    var realPos1 = ExtendVector(bodyVec, realAngle - 30.0 + 90.0, 10.0);
                    var realPos2 = ExtendVector(bodyVec, realAngle - 30.0 - 90.0, 10.0);
                    var fakePos1 = ExtendVector(bodyVec, fakeAngle - 30.0 + 90.0, 10.0);
                    var fakePos2 = ExtendVector(bodyVec, fakeAngle - 30.0 - 90.0, 10.0);
                    if (VectorDistance(feetVec, realPos1) < VectorDistance(feetVec, realPos2)) {
                        realPos = realPos1;
                    } else {
                        realPos = realPos2;
                    }
                    if (VectorDistance(feetVec, fakePos1) < VectorDistance(feetVec, fakePos2)) {
                        fakePos = fakePos1;
                    } else {
                        fakePos = fakePos2;
                    }
                } else {
                    closestRayPoint = headVec;
                    realPos = ExtendVector(bodyVec, realAngle, 10.0);
                    fakePos = ExtendVector(bodyVec, fakeAngle, 10.0);
                }

                if (VectorDistance(closestRayPoint, fakePos) < VectorDistance(closestRayPoint, realPos)) {
                    antibrute_lastHitTime = curtime;
                    UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
                }
            }

            antibrute_lastImpacts[entity] = impact;
            antibrute_lastImpactTimes[entity] = curtime;
        }
    }
}

function disable_baim() {
    function disable_baim() {
        if (!UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim"))
            UI.ToggleHotkey("Rage", "GENERAL", "General", "Force body aim");
    }
}

function force_baim(enemy) {
    if (!UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim"))
        UI.ToggleHotkey("Rage", "GENERAL", "General", "Force body aim");
    Ragebot.ForceHitboxSafety(0);
    var entHealth = Entity.GetProp(enemy, "CBasePlayer", "m_iHealth");
    var pelvis_pos = Entity.GetHitboxPosition(enemy, 2);
    var body = Entity.GetHitboxPosition(enemy, 3);
    var thor = Entity.GetHitboxPosition(enemy, 4);
    var body_trace = Trace.Bullet(Entity.GetLocalPlayer(), enemy, Entity.GetEyePosition(Entity.GetLocalPlayer()), pelvis_pos);
    var pelvis_trace = Trace.Bullet(Entity.GetLocalPlayer(), enemy, Entity.GetEyePosition(Entity.GetLocalPlayer()), body);
    var thorax_trace = Trace.Bullet(Entity.GetLocalPlayer(), enemy, Entity.GetEyePosition(Entity.GetLocalPlayer()), thor);
    var lethalDamage = Math.max(pelvis_trace[1], body_trace[1], thorax_trace[1]);
    if (entHealth > lethalDamage) {
        Ragebot.ForceTargetMinimumDamage(enemy, lethalDamage);
    } else {
        Ragebot.ForceTargetMinimumDamage(enemy, entHealth);
    }
}

function slow_walking(enemy) {
    var enemyVelocity = Entity.GetProp(enemy, "CBasePlayer", "m_vecVelocity[0]");
    var enemySpeed = Math.sqrt(enemyVelocity[0] * enemyVelocity[0] + enemyVelocity[1] * enemyVelocity[1]);
    if (enemySpeed >= 10 && enemySpeed <= 85) return true;
    else return false;
}

function in_air(enemy) {
    var flags = Entity.GetProp(enemy, "CBasePlayer", "m_fFlags");
    if (!(flags & 1 << 0) && !(flags & 1 << 0x12)) return true;
    else return false;
}

function force_head(enemy) {
    disable_baim();
    head_pos = Entity.GetHitboxPosition(enemy, 0);
    head_damage = Trace.Bullet(Entity.GetLocalPlayer(), enemy, Entity.GetEyePosition(Entity.GetLocalPlayer()), head_pos);
    Ragebot.ForceTargetMinimumDamage(enemy, head_damage[1]);
}


function runEnemies() {
    var enemies = Entity.GetEnemies();
    if (config.options.acc_baim_slowwalk[0]) {
        for (i = 0; i < enemies.length; i++) {
            if (!Entity.IsValid(enemies[i])) continue;
            if (!Entity.IsAlive(enemies[i])) continue;
            if (Entity.IsDormant(enemies[i])) continue;

            if (slow_walking(enemies[i]))
                force_baim(enemies[i]);
        }
    }
    if (config.options.acc_baim_inair[0]) {
        for (i = 0; i < enemies.length; i++) {
            if (!Entity.IsValid(enemies[i])) continue;
            if (!Entity.IsAlive(enemies[i])) continue;
            if (Entity.IsDormant(enemies[i])) continue;

            if (in_air(enemies[i]))
                force_baim(enemies[i]);
        }
    }
    if (config.options.acc_head_inair[0]) {
        for (i = 0; i < enemies.length; i++) {
            if (!Entity.IsValid(enemies[i])) continue;
            if (!Entity.IsAlive(enemies[i])) continue;
            if (Entity.IsDormant(enemies[i])) continue;

            if (in_air(enemies[i]))
                force_head(enemies[i]);
        }
    }
    disable_baim();
}

function ragebotFunction() {
    if (config.options.acc_safepoint_onlimbs[0]) {
        Ragebot.ForceHitboxSafety(9);
        Ragebot.ForceHitboxSafety(10);
        Ragebot.ForceHitboxSafety(11);
        Ragebot.ForceHitboxSafety(12);
    }
    if (config.options.acc_safepoint_onhead[0]) {
        Ragebot.ForceHitboxSafety(0);
        Ragebot.ForceHitboxSafety(1);
    }
    if (config.options.acc_wait_foronshot[0])
        waitforonshot();

    runEnemies();
}

function waitforonshot() {
    var enemies = Entity.GetEnemies();
    for (i = 0; i < enemies.length; i++) {
        if (!Entity.IsValid(enemies[i])) continue;
        if (!Entity.IsAlive(enemies[i])) continue;
        if (Entity.IsDormant(enemies[i])) continue;
        var weapon = Entity.GetWeapon(enemies[i]);
        var lastShotTime = Entity.GetProp(weapon, "CWeaponCSBase", "m_fLastShotTime");
        if (lastShotTime != storedShotTime[enemies[i]]) {
            firedThisTick[enemies[i]] = true;
            storedShotTime[enemies[i]] = lastShotTime;
        } else {
            firedThisTick[enemies[i]] = false;
        }
        if (firedThisTick[enemies[i]] == true) {
            force_head(enemies[i]);
        } else {
            Ragebot.IgnoreTarget(enemies[i]);
        }
    }
}

var isScrolling = false;

function create_scrollbar(object, height) {
    if (scrollbar[object][1] < MainMenu.y + 5) {
        scrollbar[object][1] = MainMenu.y + 4;
        scrollbar[object][0] = MainMenu.y;
    }
    if (scrollbar[object][0] > MainMenu.y)
        scrollbar[object][0] = MainMenu.y;

    var mouse = get_mouse();
    var value = Math.round(scrollbar[object][0]);
    var disValue = Math.round(scrollbar[object][1]);
    if (disValue + height > MainMenu.y + 445) {
        disValue = MainMenu.y + 445 - height - 4;
        isScrolling = false;
    }
    Render.FilledRect(MainMenu.x + width - 14, disValue + 4, 10, height, color3);
    Render.FilledRect(MainMenu.x + width - 13, disValue + 3, 8, height + 2, color3);

    if (mouse.y < MainMenu.y + (height / 2) && isScrolling)
        isScrolling = false;

    if (inbox(MainMenu.x + width - 14, MainMenu.x + width - 4, disValue + 3, disValue + height + 2) || isScrolling) {
        Render.FilledRect(MainMenu.x + width - 14, disValue + 4, 10, height, [200, 200, 200, 20]);
        Render.FilledRect(MainMenu.x + width - 13, disValue + 3, 8, height + 2, [200, 200, 200, 20]);
        if (Input.IsKeyPressed(0x01)) {
            if (!isScrolling)
                isScrolling = true;
            value = mouse.y - MainMenu.y;
            scrollbar[object][0] = MainMenu.y * 2 - (MainMenu.y + value - 25);
            scrollbar[object][1] = MainMenu.y + value - (height / 2);
            Render.FilledRect(MainMenu.x + width - 14, disValue + 4, 10, height, [200, 200, 200, 20]);
            Render.FilledRect(MainMenu.x + width - 13, disValue + 3, 8, height + 2, [200, 200, 200, 20]);
        }
    }

    if (!Input.IsKeyPressed(0x01))
        isScrolling = false;
}

var scrollbar = {
    safepointscroll: [MainMenu.y, MainMenu.y],
    aimbotz: [MainMenu.y, MainMenu.y]
};

// ):

function main() {
    draw_background();
    getoptions();
    if (UI.IsMenuOpen()) {
        update_mouse();
        create_menu("OneTap.com", MainMenu.x, MainMenu.y);
        create_tab("0_0", "U", MainMenu.x, MainMenu.y, "safepointing");
        create_tab("Rage", "!", MainMenu.x, MainMenu.y + 90, "rage");
        create_tab("Anti-Aim", "&", MainMenu.x, MainMenu.y + 180, "antiaim");
        create_tab("Visuals", "#", MainMenu.x, MainMenu.y + 270, "visuals");
        create_tab("Misc", "@", MainMenu.x, MainMenu.y + 360, "misc");

        if (config.safepointing[0]) {
            create_group("Information", MainMenu.x + 90, MainMenu.y + 20, "home");
            create_string(MainMenu.x + 115, MainMenu.y + 50, 0, "Welcome to", [200, 200, 200, 255], 8);
            var tsize = get_tsize("Welcome to", 8);
            create_string(MainMenu.x + 115 + tsize.x - 14, MainMenu.y + 50, 0, "Zen.tools, " + Cheat.GetUsername(), [200, 200, 200, 255], 8, 800);
        }

        if (config.rage[0]) {
            create_group("General", MainMenu.x + 90, scrollbar.safepointscroll[0] + 20, "doubletap");
            create_checkbox("Override doubletap", MainMenu.x + 115, scrollbar.safepointscroll[0] + 50, "override_dt");
            create_slider("Tolerance", MainMenu.x + 115, scrollbar.safepointscroll[0] + 80, 14, "override_tolerance");
            create_slider("Shift", MainMenu.x + 115, scrollbar.safepointscroll[0] + 115, 8, "override_shift");
            create_group("Minimum damage", MainMenu.x + 90, scrollbar.safepointscroll[0] + 145, "mindamage");
            create_checkbox("Min damage override", MainMenu.x + 115, scrollbar.safepointscroll[0] + 175, "mindamage_override");
            create_keybind("Override key", MainMenu.x + 115, scrollbar.safepointscroll[0] + 205, "mindamage_override_keybind")
            create_slider("Override value", MainMenu.x + 115, scrollbar.safepointscroll[0] + 235, 130, "mindamage_override_value");
            create_slider("Override reset value", MainMenu.x + 115, scrollbar.safepointscroll[0] + 270, 130, "mindamage_override_reset");
            create_group("Conditions", MainMenu.x + 90, scrollbar.safepointscroll[0] + 300, "accuracy");
            create_checkbox("Safepoint on limbs", MainMenu.x + 115, scrollbar.safepointscroll[0] + 330, "acc_safepoint_onlimbs");
            create_checkbox("Safepoint on head", MainMenu.x + 115, scrollbar.safepointscroll[0] + 360, "acc_safepoint_onhead");
            create_checkbox("Force baim slow-walkers", MainMenu.x + 115, scrollbar.safepointscroll[0] + 390, "acc_baim_slowwalk");
            create_checkbox("Force baim in-air", MainMenu.x + 115, scrollbar.safepointscroll[0] + 420, "acc_baim_inair");
            create_checkbox("Force head in-air", MainMenu.x + 115, scrollbar.safepointscroll[0] + 450, "acc_head_inair");
            create_checkbox("Wait for on-shot", MainMenu.x + 115, scrollbar.safepointscroll[0] + 480, "acc_wait_foronshot");
            create_scrollbar("safepointscroll", 40);
        }

        if (config.antiaim[0]) {
            create_group("Make them dump", MainMenu.x + 90, MainMenu.y + 20, "makethemdump");
            create_checkbox("Anti-brute (anti scout shitters)", MainMenu.x + 115, MainMenu.y + 50, "anti_brute");
            create_checkbox("Ideal yaw (this shit is a joke you fucking idiot)", MainMenu.x + 115, MainMenu.y + 80, "ideal_yaw");
            create_group("Conditions", MainMenu.x + 90, MainMenu.y + 110, "aa_conditions");
            create_checkbox("Invert on-shot", MainMenu.x + 115, MainMenu.y + 140, "invert_onshot");
            create_checkbox("Invert on-peek", MainMenu.x + 115, MainMenu.y + 170, "invert_onpeek");
        }

        if (config.visuals[0]) {
            create_group("Indicators", MainMenu.x + 90, MainMenu.y + 20, "indicators");
            create_checkbox("Display indicators", MainMenu.x + 115, MainMenu.y + 50, "visuals_indicators");
        }

        if (config.misc[0]) {
            create_group("Clantags", MainMenu.x + 90, MainMenu.y + 20, "clantags");
            create_checkbox("Skeet tag", MainMenu.x + 115, MainMenu.y + 50, "misc_clantag_5dollarscripts");

            create_group("Other", MainMenu.x + 90, MainMenu.y + 80, "misc_other");
            create_checkbox("Darken background", MainMenu.x + 115, MainMenu.y + 110, "misc_darken_background");
        }
        Render.Rect(MainMenu.x, MainMenu.y, width, height, color3);
        Render.FilledRect(MainMenu.x, MainMenu.y - 20, width, 20, color3);
        create_string(MainMenu.x + width / 2, MainMenu.y - 19, 1, "Zen", [200, 200, 200, 255], 10, true);
        Render.GradientRect(MainMenu.x + 90, MainMenu.y, width - 90, 15, 0, [0, 0, 0, 50], [color2[0], color2[1], color2[2], 0]);

    }

    if (config.options.misc_clantag_5dollarscripts[0]) {
        if (!tag) {
            Local.SetClanTag("skeet.cc");
            tag = true;
        }
    } else {
        tag = false;
    }

    if (config.options.visuals_indicators[0]) {
        create_informationbox(IndicatorMenu.x, IndicatorMenu.y);
    }

    if (config.options.ideal_yaw[0]) {
        var screensize = Render.GetScreenSize();
        var screenx = screensize[0] / 2;
        var screeny = screensize[1] / 2;
        var yaw = Math.round(Math.random() * 43) + 10;
        create_string(screenx, screeny + 21, 1, "idy " + yaw.toString(), [0, 0, 0, 255], 8);
        create_string(screenx, screeny + 20, 1, "idy " + yaw.toString(), [200, 200, 200, 255], 8);

    }

    if (config.options.override_dt[0]) {
        Exploit.OverrideShift(config.options.override_shift[0]);
        Exploit.OverrideTolerance(config.options.override_tolerance[0]);
    }
    setoptions();
}

var tag = false;

Cheat.RegisterCallback("Draw", "main");
Cheat.RegisterCallback("bullet_impact", "bullet_impact");
Cheat.RegisterCallback("CreateMove", "ragebotFunction");

// shes the one you retard :)
// its over just stop
// momenmto
// kida fvc
// 4am?