// SenseUI unified build: adaptive per-weapon damage + safe binds + modal HSV picker
var globals = {}
globals.x = "X"
globals.y = "Y"
globals.tab = 1
globals.alpha = 255
globals.active = false
globals.wasactive = false
globals.draw_texture = false
globals.lasttab = 1
// Stability guard for OneTap v3 script teardown.
globals.unloading = false
globals.initialized = false
// PNG icons are loaded once, only from Draw, and only from exact paths.
// All files listed in getTabIcons/getWeaponIcons must exist in ot/scripts/icons/.
globals.use_texture_icons = true
globals.aa_override_active = false
globals.aa_override_known = false
globals.aa_native_ready = false
UI.AddCheckbox("Custom desync")
UI.AddCheckbox("Jitter real")
UI.AddCheckbox("Jitter fake")
UI.AddCheckbox("Jitter offset")
UI.AddSliderInt("Fake offset",-58,58)
UI.AddSliderInt("Real offset",-58,58)
UI.AddSliderInt("Real 1st yaw",-58,58)
UI.AddSliderInt("Real 2nd yaw",-58,58)
UI.AddSliderInt("Fake 1st yaw",-58,58)
UI.AddSliderInt("Fake 2nd yaw",-58,58)
UI.AddSliderInt("Offset 1st yaw",-180,180)
UI.AddSliderInt("Offset 2nd yaw",-180,180)
UI.AddSliderInt("Fake delay",0,100)
UI.AddSliderInt("Offset delay",0,100)
UI.SetEnabled("Script Items","Custom desync",false)
UI.SetEnabled("Script Items","Jitter real",false)
UI.SetEnabled("Script Items","Jitter fake",false)
UI.SetEnabled("Script Items","Jitter offset",false)
UI.SetEnabled("Script Items","Fake offset",false)
UI.SetEnabled("Script Items","Real offset",false)
UI.SetEnabled("Script Items","Real 1st yaw",false)
UI.SetEnabled("Script Items","Real 2nd yaw",false)
UI.SetEnabled("Script Items","Fake 1st yaw",false)
UI.SetEnabled("Script Items","Fake 2nd yaw",false)
UI.SetEnabled("Script Items","Offset 1st yaw",false)
UI.SetEnabled("Script Items","Offset 2nd yaw",false)
UI.SetEnabled("Script Items","Fake delay",false)
UI.SetEnabled("Script Items","Offset delay",false)
var clamp = function (val, min, max) {
    if (val > max)
        return max
    if (val < min)
        return min
    return val
}
globals.X = function () {
    return UI.GetValue("Script Items",globals.x)
}
globals.Y = function () {
    return UI.GetValue("Script Items", globals.y)
}
var fontsLoaded = false;
function initFontsAndTextures() {
    if (fontsLoaded || globals.unloading) return;

    // Render resources must be created from a Draw callback on OneTap v3.
    try {
        globals.verdana8 = Render.AddFont("Verdana", 8, 100);
        globals.verdana8b = Render.AddFont("Verdana", 8, 400);
        globals.verdana12 = Render.AddFont("Verdana", 12, 100);
        globals.verdana12b = Render.AddFont("Verdana", 12, 400);
        globals.tahoma8 = Render.AddFont("Tahoma", 8, 100);
        fontsLoaded = true;
    } catch (e) {
        fontsLoaded = false;
    }
}

function isTextureValid(texture) {
    // OneTap v3 starts texture identifiers at 0, so 0 is a VALID texture.
    // Only null/undefined/false mean that loading failed.
    return texture !== undefined && texture !== null && texture !== false;
}

function safeAddTexture(path) {
    if (globals.unloading || !globals.use_texture_icons || !path) return null;

    try {
        // Called only from Draw and only once for each exact path.
        // The very first successfully loaded PNG commonly receives ID 0.
        var texture = Render.AddTexture(path);
        if (isTextureValid(texture)) return texture;
    } catch (e) {
    }
    return null;
}

function onUnload() {
    // Stop all script callbacks from touching renderer/UI state while the
    // OneTap JS context and its native resources are being destroyed.
    globals.unloading = true;
    globals.active = false;
    globals.alpha = 0;
    globals.draw_texture = false;

    // Do not clear loadedTabIcons/loadedWepIcons/tileTex here. They are native
    // renderer identifiers owned by OneTap; touching them during Unload may
    // race the host's own resource teardown.

    // Touch AntiAim during teardown only if this script actually owned the
    // override. Calling native setters unnecessarily is risky in old v3 builds.
    if (globals.aa_override_active && globals.aa_native_ready) {
        try {
            AntiAim.SetOverride(0);
        } catch (e) {
        }
    }
    globals.aa_override_active = false;
    globals.aa_override_known = false;
    globals.aa_native_ready = false;
}

function initialize() {
    if (globals.initialized || globals.unloading) return;
    globals.initialized = true;

    // Do not call Render.GetScreenSize/Render.AddFont outside Draw.
    // 8192 safely covers normal desktop resolutions while these controls
    // stay hidden and are used only as position storage.
    UI.AddSliderInt(globals.x, -630, 8192)
    UI.AddSliderInt(globals.y, -600, 8192)
    UI.SetEnabled("Script Items", globals.x, false)
    UI.SetEnabled("Script Items", globals.y, false)
}

function drawBasic() {
    if (globals.unloading) return;
    var grey = [38, 38, 38, globals.alpha]
    var border = [10, 10, 10, globals.alpha]
    var fade_factor = ((1 / .15) * Globals.Frametime()) * 255
    if (!UI.IsMenuOpen() && globals.alpha != 0)
        globals.alpha = clamp(globals.alpha - fade_factor, 0, 255)
    if (UI.IsMenuOpen() && globals.alpha != 255)
        globals.alpha = clamp(globals.alpha + fade_factor, 0, 255)
    var g1 = [[55, 175, 220, globals.alpha], [140, 70, 210, globals.alpha]]
    var g2 = [[140, 70, 210, globals.alpha], [220, 60, 120, globals.alpha]]
    var g3 = [[220, 60, 120, globals.alpha], [235, 170, 40, globals.alpha]]
    var g4 = [[235, 170, 40, globals.alpha], [142, 181, 39, globals.alpha]]
    if (globals.alpha != 0) {
        Render.Rect(globals.X(), globals.Y(), 630, 600, border);
        
        Render.FilledRect(globals.X() + 1, globals.Y() + 1, 628, 5, grey)
        Render.FilledRect(globals.X() + 1, globals.Y() + 1, 5, 598, grey)

        Render.FilledRect(globals.X() + 624, globals.Y() + 1, 5, 598, grey)
        Render.FilledRect(globals.X() + 1, globals.Y() + 594, 628, 5, grey)

        Render.Rect(globals.X() + 6, globals.Y() + 6, 618, 588, border);
        Render.Rect(globals.X() + 1, globals.Y() + 1, 628, 598, [45, 45, 45, globals.alpha]);
        Render.FilledRect(globals.X() + 7, globals.Y() + 7, 616, 586, [21, 21, 21, globals.alpha]);

        Render.GradientRect(globals.X() + 7, globals.Y() + 7, 154, 2, 1, g1[0], g1[1])
        Render.GradientRect(globals.X() + 7 + 154, globals.Y() + 7, 154, 2, 1, g2[0], g2[1])
        Render.GradientRect(globals.X() + 7 + 308, globals.Y() + 7, 154, 2, 1, g3[0], g3[1])
        Render.GradientRect(globals.X() + 7 + 462, globals.Y() + 7, 154, 2, 1, g4[0], g4[1])
    }
}
function cursorBetween(x, y, length, height) {
    var cursor = Input.GetCursorPosition()
    if (cursor[0] > x && cursor[0] < x + length && cursor[1] > y && cursor[1] < y + height)
        return true
    return false
}
var loadedTabIcons = null;
function getTabIcons() {
    if (globals.unloading || !globals.use_texture_icons) {
        return [null, null, null, null, null, null, null];
    }

    if (!loadedTabIcons) {
        loadedTabIcons = [
            safeAddTexture("ot/scripts/icons/rage.png"),
            null, // ANTI-AIM is composed in drawTabs: rage.png + legit.png
            safeAddTexture("ot/scripts/icons/legit.png"),
            safeAddTexture("ot/scripts/icons/visuals.png"),
            safeAddTexture("ot/scripts/icons/settings.png"),
            safeAddTexture("ot/scripts/icons/skins.png"),
            safeAddTexture("ot/scripts/icons/players.png")
        ];
    }
    return loadedTabIcons;
}

var loadedWepIcons = null;
function getWeaponIcons() {
    if (globals.unloading || !globals.use_texture_icons) return {};

    if (!loadedWepIcons) {
        loadedWepIcons = {
            general: safeAddTexture("ot/scripts/icons/wep_general.png"),
            pistol: safeAddTexture("ot/scripts/icons/wep_pistol.png"),
            heavy: safeAddTexture("ot/scripts/icons/wep_heavy.png"),
            scout: safeAddTexture("ot/scripts/icons/wep_scout.png"),
            awp: safeAddTexture("ot/scripts/icons/wep_awp.png"),
            auto: safeAddTexture("ot/scripts/icons/wep_auto.png"),
            rifle: safeAddTexture("ot/scripts/icons/wep_rifle.png"),
            smg: safeAddTexture("ot/scripts/icons/wep_smg.png")
        };
    }
    return loadedWepIcons;
}

function getWeaponIconSize(key) {
    // Wider and flatter silhouettes: [width, height].
    // Keep the general/cog icon square so it is not distorted.
    if (key == "general") return [26, 26];
    if (key == "pistol") return [48, 18];
    if (key == "heavy") return [52, 18];
    if (key == "scout") return [64, 17];
    if (key == "awp") return [66, 17];
    if (key == "auto") return [64, 18];
    if (key == "rifle") return [64, 18];
    if (key == "smg") return [60, 18];
    return [56, 18];
}

function drawWeaponTypeSelector(selected, names, keys) {
    if (globals.unloading || globals.alpha == 0) return selected;

    var groupX = globals.X() + 115;
    var groupY = globals.Y() + 30;
    var groupWidth = 485;
    var sidePadding = 8;
    var innerX = groupX + sidePadding;
    var innerWidth = groupWidth - sidePadding * 2;
    var icons = getWeaponIcons();

    for (var i = 0; i < names.length; i++) {
        // Integer boundaries distribute every slot evenly across the full row,
        // including the remainder pixels. This keeps both outer margins equal.
        var slotX = innerX + Math.floor(i * innerWidth / names.length);
        var slotEnd = innerX + Math.floor((i + 1) * innerWidth / names.length);
        var slotWidth = slotEnd - slotX;
        var slotCenterX = Math.floor((slotX + slotEnd) / 2);
        var isSelected = selected == i;
        var isHovered = UI.IsMenuOpen() && !isMenuInputLocked() && cursorBetween(slotX, groupY + 8, slotWidth, 50);

        if (isSelected) {
            Render.FilledRect(slotX + 2, groupY + 9, slotWidth - 4, 47, [27, 27, 27, globals.alpha]);
        } else if (isHovered) {
            Render.FilledRect(slotX + 2, groupY + 9, slotWidth - 4, 47, [24, 24, 24, globals.alpha]);
        }

        if (isSelected) {
            Render.FilledRect(slotX + 7, groupY + 58, slotWidth - 14, 2, [142, 181, 39, globals.alpha]);
        }

        var texture = icons[keys[i]];
        if (isTextureValid(texture)) {
            var size = getWeaponIconSize(keys[i]);
            var iconX = Math.floor(slotCenterX - size[0] / 2);
            var iconY = Math.floor(groupY + 32 - size[1] / 2);
            Render.TexturedRect(iconX, iconY, size[0], size[1], texture);
        } else {
            var textSize = Render.TextSizeCustom(names[i], globals.verdana8b);
            Render.StringCustom(slotCenterX - textSize[0] / 2, groupY + 27, 0, names[i], [150, 150, 150, globals.alpha], globals.verdana8b);
        }

        if (isHovered && Input.IsKeyPressed(0x01)) selected = i;
    }

    return selected;
}

function drawTabs() {
    if (globals.unloading) return;
    var space = 82;
    var tabNames = ["RAGE", "ANTI-AIM", "LEGIT", "VISUALS", "MISC", "SKINS", "PLAYERS"];
    if (globals.alpha != 0) {
        initFontsAndTextures();
        if (!globals.verdana8b) return;
        var icons = getTabIcons();
        // 1. One seamless solid background column for left sidebar (NO GAPS / ПРОМЕЖНОСТЕЙ)
        Render.FilledRect(globals.X() + 7, globals.Y() + 10, 80, 583, [21, 21, 21, globals.alpha]);
        Render.FilledRect(globals.X() + 7 + 80, globals.Y() + 10, 616 - 80, 583, [21, 21, 21, globals.alpha]);

        if (globals.draw_texture && globals.use_texture_icons) {
            if (!isTextureValid(globals.tileTex)) globals.tileTex = safeAddTexture("ot/scripts/tile.png");
            var tile = globals.tileTex;
            if (!isTextureValid(tile)) {
                globals.draw_texture = false;
            } else {
                for (i = 0; i < 18; i++) {
                    for (k = 0; k < 20; k++) {
                        if (i == 17) {
                            Render.TexturedRect(globals.X() + 7 + 75 + (17 * 30), globals.Y() + 9 + (k * 30), 30, 30, tile);
                        } else {
                            Render.TexturedRect(globals.X() + 7 + 80 + (i * 30), globals.Y() + 9 + (k * 30), 30, 30, tile);
                        }
                    }
                }
            }
        }
        for (var i = 1; i <= 7; i++) {
            var tx = globals.X() + 7;
            var ty = globals.Y() - 65 + i * space;
            var isSel = (globals.tab == i);
            if (isSel) {
                // Active tab highlight covers full space=82 so there is zero gap between tabs
                Render.FilledRect(tx, ty - 6, 80, space, [28, 28, 28, globals.alpha]);
                Render.FilledRect(tx, ty - 6, 3, space, [142, 181, 39, globals.alpha]); // Skeet green active indicator
            }

            var iconTex = icons[i - 1];
            var name = tabNames[i - 1];
            var tSize = Render.TextSizeCustom(name, globals.verdana8b);
            var tCol = isSel ? [239, 239, 239, globals.alpha] : [110, 110, 110, globals.alpha];

            var iconDrawn = false;
            var iconCenterX = tx + 40;
            var iconCenterY = ty + 26;
            var sidebarIconSize = 33;
            var iconX = Math.floor(iconCenterX - sidebarIconSize / 2);
            var iconY = Math.floor(iconCenterY - sidebarIconSize / 2);

            if (i == 2) {
                // ANTI-AIM composition:
                // 1) rage.png base is 25x25;
                // 2) legit.png is 40x40 and centered over rage.png.
                var aaBase = icons[0];
                var aaOverlay = icons[2];
                if (isTextureValid(aaBase)) {
                    var aaBaseSize = 25;
                    // rage.png has asymmetric transparent padding: its visible
                    // shape sits about 3 px left of the texture center.
                    var aaBaseOffsetX = 3;
                    var aaBaseX = Math.floor(iconCenterX - aaBaseSize / 2) + aaBaseOffsetX;
                    var aaBaseY = Math.floor(iconCenterY - aaBaseSize / 2);
                    Render.TexturedRect(aaBaseX, aaBaseY, aaBaseSize, aaBaseSize, aaBase);
                    iconDrawn = true;
                }
                if (isTextureValid(aaOverlay)) {
                    var aaOverlaySize = 40;
                    var aaOverlayX = Math.floor(iconCenterX - aaOverlaySize / 2);
                    var aaOverlayY = Math.floor(iconCenterY - aaOverlaySize / 2);
                    Render.TexturedRect(aaOverlayX, aaOverlayY, aaOverlaySize, aaOverlaySize, aaOverlay);
                    iconDrawn = true;
                }
            } else if (isTextureValid(iconTex)) {
                Render.TexturedRect(iconX, iconY, sidebarIconSize, sidebarIconSize, iconTex);
                iconDrawn = true;
            }

            if (iconDrawn) {
                Render.StringCustom(tx + 40 - tSize[0] / 2, ty + 48, 0, name, tCol, globals.verdana8b);
            } else {
                // Text fallback if the required PNG is absent.
                Render.StringCustom(tx + 40 - tSize[0] / 2, ty + 28, 0, name, tCol, globals.verdana8b);
            }
        }

        Render.Line(globals.X() + 7 + 80, globals.Y() + 9, globals.X() + 7 + 80, globals.Y() + 592, [38, 38, 38, globals.alpha]);
        Render.Line(globals.X() + 6 + 80, globals.Y() + 9, globals.X() + 6 + 80, globals.Y() + 592, [10, 10, 10, globals.alpha]);

        globals.lasttab = globals.tab;
        for (var idx = 1; idx <= 7; idx++) {
            if (!isMenuInputLocked() && cursorBetween(globals.X() + 7, globals.Y() - 65 + idx * space, 80, 70) && Input.IsKeyPressed(0x01)) {
                globals.tab = idx;
            }
        }
        if (globals.tab != globals.lasttab) {
            comboactive = -1;
        }
    }
}
function beginChild(column,y,height,name){
    if(!(column & 1 && column & 2)){
    if (globals.alpha != 0) {
        Render.FilledRect(globals.X() + (column == 1 ? 115 : 370),globals.Y() + y, 460 / 2, height,[23,23,23,globals.alpha])
        Render.Rect((globals.X() + (column == 1 ? 115 : 370))-1, (globals.Y() + y)-1, (460 / 2)+2, height+2, [10, 10, 10, globals.alpha])
        Render.Rect(globals.X() + (column == 1 ? 115 : 370), globals.Y() + y, 460 / 2, height, [65, 65, 65, globals.alpha])
        Render.FilledRect((globals.X()+(column == 1 ? 115 : 370) + 10),(globals.Y() + y)-1, 5+(Render.TextSizeCustom(name,globals.verdana8)[0]), 2,[19,19,19,globals.alpha])
        Render.StringCustom(globals.X() + (column == 1 ? 115 : 370) + 10 + 2, globals.Y() + (y-7), 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
        Render.StringCustom(globals.X() + (column == 1 ? 115 : 370) + 10 + 2.5, globals.Y() +0.5+ (y-7), 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
        spacingBetweenCheckboxes = 0
        return [((column == 1 ? 115 : 370) + 15) + globals.X(),(y + 20)+globals.Y()]
    }
    }
    else{
        if (globals.alpha != 0) {
            Render.FilledRect(globals.X() + 115,globals.Y() + y, 485, height,[23,23,23,globals.alpha])
            Render.Rect(globals.X() + 115, globals.Y() + y, 485, height, [65, 65, 65, globals.alpha])
            Render.Rect((globals.X() + 115)-1, (globals.Y() + y)-1, 485+2, height+2, [5, 5, 5, globals.alpha])
            Render.FilledRect((globals.X()+115 + 10),(globals.Y() + y)-1, 5+(Render.TextSizeCustom(name,globals.verdana8)[0]), 2,[19,19,19,255])
            Render.StringCustom(globals.X() + 115 + 10 + 2, globals.Y() + (y-7), 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
            Render.StringCustom(globals.X() + 115 + 10 + 2.5, globals.Y() + 0.5+(y-7), 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
        }
    }
    if(globals.alpha == 0){
        return [globals.X(),globals.Y()]
    }
}
var spacingBetweenCheckboxes = 0
var idCheckbox = 0
function resetSpacing() {
    spacingBetweenCheckboxes = 0
    idCheckbox = 0
}
var wasDown = []
var idY = []
function checkbox(x, y, name, enable) {
    var size = 8
    y += spacingBetweenCheckboxes
    if (globals.alpha != 0 && !comboOverlapping) {
        Render.Rect(x, y, size, size, [0, 0, 0, globals.alpha])
        Render.FilledRect(x + 1, y + 1, size - 2, size - 2, enable ? [142, 181, 39, globals.alpha] : [12, 12, 12, globals.alpha])
        Render.GradientRect(x + 1, y + 1, size - 2, size - 2, 0, [0, 0, 0, 0], [255, 255, 255, (globals.alpha / 255) * 20])
        var font = globals.verdana8;
        Render.StringCustom(x + 17, y-4, 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
    }
    spacingBetweenCheckboxes += 20
    idCheckbox++
    if (globals.alpha != 0 && UI.IsMenuOpen() && !comboOverlapping && !isMenuInputLocked()) {
        if ((cursorBetween(x, y, size, size) || cursorBetween(x+17,y-1,Render.TextSize(name)[0],Render.TextSize(name)[1])) && comboactive == -1) {
            if (!wasDown[idCheckbox]) {
                if (Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = true
                    return true
                }
            }
            else if (wasDown[idCheckbox]) {
                if (!Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = false
                    return false
                }
            }
            return false
        }
    }
}

var customKeybinds = {}
var activeKeybindModeMenu = null
var keybindModePendingOverlay = null
var keybindModeMenuSeen = false
var keybindModePreviousLeft = false
var keybindModePreviousRight = false
var keybindModes = ["Hold", "Toggle", "Always", "Off hotkey"]

function beginKeybindFrame() {
    keybindModePendingOverlay = null
    keybindModeMenuSeen = false
}

function closeKeybindModeMenu() {
    activeKeybindModeMenu = null
    keybindModePendingOverlay = null
}

function getVirtualKeyName(key) {
    var names = {
        1: "M1", 2: "M2", 4: "M3", 5: "M4", 6: "M5",
        8: "BS", 9: "TAB", 13: "ENT", 16: "SHIFT", 17: "CTRL",
        18: "ALT", 20: "CAPS", 27: "ESC", 32: "SPACE",
        33: "PGUP", 34: "PGDN", 35: "END", 36: "HOME",
        37: "LEFT", 38: "UP", 39: "RIGHT", 40: "DOWN",
        45: "INS", 46: "DEL"
    }

    if (names[key]) return names[key]
    if (key >= 0x30 && key <= 0x39) return String.fromCharCode(key)
    if (key >= 0x41 && key <= 0x5A) return String.fromCharCode(key)
    if (key >= 0x70 && key <= 0x7B) return "F" + (key - 0x6F)

    return "0x" + key.toString(16).toUpperCase()
}

function getCustomKeybind(id, target, defaultMode) {
    var bind = customKeybinds[id]
    if (!bind) {
        bind = {
            key: 0,
            mode: defaultMode || "Toggle",
            target: target,
            listening: false,
            waitRelease: false,
            leftLatch: false,
            wasPressed: false
        }
        customKeybinds[id] = bind
    }

    bind.target = target
    return bind
}

function getNativeHotkeyState(target) {
    if (!target) return false
    try {
        return UI.IsHotkeyActive.apply(null, target) ? true : false
    } catch (e) {
        return false
    }
}

function toggleNativeHotkey(target) {
    if (!target) return
    try {
        UI.ToggleHotkey.apply(null, target)
    } catch (e) {
    }
}

function setNativeHotkeyState(target, wanted) {
    if (getNativeHotkeyState(target) != wanted)
        toggleNativeHotkey(target)
}

function stopOtherKeybindListeners(activeId) {
    for (var id in customKeybinds) {
        if (id != activeId) {
            customKeybinds[id].listening = false
            customKeybinds[id].waitRelease = false
        }
    }
}

function getKeybindModePopup(rightX, y) {
    var width = 92
    var height = 4 + keybindModes.length * 18
    var x = rightX - width
    var popupY = y + 13
    var menuLeft = globals.X() + 8
    var menuRight = globals.X() + 622
    var menuBottom = globals.Y() + 590

    if (x < menuLeft) x = menuLeft
    if (x + width > menuRight) x = menuRight - width
    if (popupY + height > menuBottom) popupY = y - height - 4

    return {x:x, y:popupY, w:width, h:height}
}

function applyKeybindMode(bind, mode) {
    bind.mode = mode
    bind.wasPressed = bind.key ? (Input.IsKeyPressed(bind.key) ? true : false) : false

    if (mode == "Always") {
        setNativeHotkeyState(bind.target, true)
    } else if (mode == "Off hotkey") {
        setNativeHotkeyState(bind.target, bind.key ? !bind.wasPressed : true)
    } else if (mode == "Hold") {
        setNativeHotkeyState(bind.target, bind.key ? bind.wasPressed : false)
    } else if (mode == "Toggle" && !bind.key) {
        setNativeHotkeyState(bind.target, false)
    }
}

function drawKeybindAt(rightX, y, id, target, defaultMode) {
    var bind = getCustomKeybind(id, target, defaultMode)
    var leftDown = Input.IsKeyPressed(0x01)
    var rightDown = Input.IsKeyPressed(0x02)
    var leftPressed = leftDown && !keybindModePreviousLeft
    var rightPressed = rightDown && !keybindModePreviousRight

    if (!leftDown) bind.leftLatch = false

    var label = bind.listening ? "[...]" : "[" + (bind.key ? getVirtualKeyName(bind.key) : "none") + "]"
    var size = Render.TextSizeCustom(label, globals.verdana8)
    var width = Math.max(28, size[0])
    var drawX = Math.floor(rightX - width)
    var hovered = UI.IsMenuOpen() && !isMenuInputLocked() && cursorBetween(drawX - 3, y - 2, width + 6, 13)
    // Do not color the label based on the native hotkey state.
    var color = bind.listening ? [239,239,239,globals.alpha] : (hovered ? [175,175,175,globals.alpha] : [125,125,125,globals.alpha])

    Render.StringCustom(drawX, y, 0, label, color, globals.verdana8)

    // Right click opens the GameSense-style keybind mode menu.
    if (hovered && rightPressed) {
        if (activeKeybindModeMenu == id)
            closeKeybindModeMenu()
        else {
            activeKeybindModeMenu = id
            bind.listening = false
            bind.waitRelease = false
            coloridactive = -1
            comboactive = -1
        }
    }

    if (activeKeybindModeMenu == id) {
        keybindModeMenuSeen = true
        var popup = getKeybindModePopup(rightX, y)
        var cursor = Input.GetCursorPosition()
        var insidePopup = cursorBetween(popup.x - 2, popup.y - 2, popup.w + 4, popup.h + 4)
        var hoverIndex = -1

        for (var optionIndex = 0; optionIndex < keybindModes.length; optionIndex++) {
            if (cursorBetween(popup.x + 2, popup.y + 2 + optionIndex * 18, popup.w - 4, 18)) {
                hoverIndex = optionIndex
                break
            }
        }

        if (leftPressed) {
            if (hoverIndex != -1) {
                applyKeybindMode(bind, keybindModes[hoverIndex])
                closeKeybindModeMenu()
            } else if (!insidePopup && !hovered) {
                closeKeybindModeMenu()
            }
        }

        if (activeKeybindModeMenu == id) {
            keybindModePendingOverlay = {
                popup:popup,
                bind:bind,
                hoverIndex:hoverIndex
            }
        }
    }

    if (hovered && leftDown && !bind.leftLatch) {
        stopOtherKeybindListeners(id)
        closeKeybindModeMenu()
        bind.listening = true
        bind.waitRelease = true
        bind.leftLatch = true
        comboactive = -1
        coloridactive = -1
    }

    if (!bind.listening) return

    if (bind.waitRelease) {
        if (!Input.IsKeyPressed(0x01) && !Input.IsKeyPressed(0x02))
            bind.waitRelease = false
        return
    }

    for (var key = 1; key <= 0xFE; key++) {
        // M1/M2 are reserved for operating the custom menu itself.
        if (key == 0x01 || key == 0x02) continue
        if (!Input.IsKeyPressed(key)) continue

        if (key == 0x1B || key == 0x2E) {
            if (bind.mode == "Always" || bind.mode == "Off hotkey")
                setNativeHotkeyState(bind.target, true)
            else
                setNativeHotkeyState(bind.target, false)
            bind.key = 0
            bind.wasPressed = false
        } else {
            bind.key = key
            bind.wasPressed = true
        }

        bind.listening = false
        bind.waitRelease = true
        break
    }
}

function drawKeybindModeMenuOverlay(data) {
    if (!data) return

    var popup = data.popup
    Render.FilledRect(popup.x - 2, popup.y - 2, popup.w + 4, popup.h + 4, [5,5,5,globals.alpha])
    Render.Rect(popup.x - 1, popup.y - 1, popup.w + 2, popup.h + 2, [65,65,65,globals.alpha])
    Render.FilledRect(popup.x, popup.y, popup.w, popup.h, [18,18,18,globals.alpha])

    for (var i = 0; i < keybindModes.length; i++) {
        var selected = data.bind.mode == keybindModes[i]
        var hovered = data.hoverIndex == i
        var rowY = popup.y + 2 + i * 18

        if (hovered)
            Render.FilledRect(popup.x + 2, rowY, popup.w - 4, 18, [28,28,28,globals.alpha])

        Render.StringCustom(popup.x + 7, rowY + 2, 0, keybindModes[i], selected ? [142,181,39,globals.alpha] : [205,205,205,globals.alpha], globals.verdana8)
    }
}

function endKeybindFrame() {
    if (activeKeybindModeMenu !== null && !keybindModeMenuSeen)
        closeKeybindModeMenu()

    drawKeybindModeMenuOverlay(keybindModePendingOverlay)
    keybindModePreviousLeft = Input.IsKeyPressed(0x01) ? true : false
    keybindModePreviousRight = Input.IsKeyPressed(0x02) ? true : false
}
function drawKeybindForCheckbox(x, y, id, target, defaultMode) {
    drawKeybindAt(x + 200, y + spacingBetweenCheckboxes - 24, id, target, defaultMode)
}

var sliderGeometry = []
var comboGeometry = []

function drawKeybindForSlider(sliderid, id, target, defaultMode) {
    var geometry = sliderGeometry[sliderid]
    if (!geometry) return
    // The control starts 20 px inside a 230 px section. Align binds to the
    // section's right edge instead of placing them over the long title.
    drawKeybindAt(geometry.x + 180, geometry.y - 6, id, target, defaultMode)
}

function drawKeybindForCombo(comboid, id, target, defaultMode) {
    var geometry = comboGeometry[comboid]
    if (!geometry) return
    drawKeybindAt(geometry.x + 180, geometry.y - 15, id, target, defaultMode)
}

function processCustomKeybinds() {
    for (var id in customKeybinds) {
        var bind = customKeybinds[id]
        if (!bind || bind.listening) continue

        if (bind.mode == "Always") {
            setNativeHotkeyState(bind.target, true)
            continue
        }

        if (bind.mode == "Off hotkey") {
            var offPressed = bind.key ? (Input.IsKeyPressed(bind.key) ? true : false) : false
            setNativeHotkeyState(bind.target, !offPressed)
            bind.wasPressed = offPressed
            continue
        }

        if (!bind.key) {
            // An unbound Hold/Toggle entry must never leave the native OneTap
            // hotkey active from an old config or a previous script state.
            setNativeHotkeyState(bind.target, false)
            bind.wasPressed = false
            continue
        }

        var pressed = Input.IsKeyPressed(bind.key) ? true : false
        if (bind.mode == "Hold") {
            setNativeHotkeyState(bind.target, pressed)
        } else if (pressed && !bind.wasPressed) {
            toggleNativeHotkey(bind.target)
        }

        bind.wasPressed = pressed
    }
}

var val = []
var backupval = []
var holding = []
var sliderdist = []
function sliderFloat(x, y, name, min, max, negate,visualizefloat, sliderid, uival,additive) {
    var xx = x + 20
    y += spacingBetweenCheckboxes
    spacingBetweenCheckboxes += 33
    sliderGeometry[sliderid] = {x: xx, y: y}
    var cursor = Input.GetCursorPosition()
    
    if (!sliderdist[sliderid])
        sliderdist[sliderid] = 0
    
    if(!backupval[sliderid])
        backupval[sliderid] = uival
    val[sliderid] = backupval[sliderid]
    if (globals.alpha != 0) {
        if (!isMenuInputLocked() && cursorBetween(xx, y + 8, 130, 8) && Input.IsKeyPressed(0x01) && !holding[sliderid] && comboactive == -1) {
            holding[sliderid] = true
        }
        if (!Input.IsKeyPressed(0x01)) {
            holding[sliderid] = false
        }
        if(!backupval[sliderid])
            backupval[sliderid] = 0
        
        if (holding[sliderid]) {
            sliderdist[sliderid] = cursor[0] - xx 
            sliderdist[sliderid] /= 130
            sliderdist[sliderid] *= max - min
            val[sliderid] = negate ? sliderdist[sliderid] + min : sliderdist[sliderid]
            val[sliderid] = clamp(val[sliderid], min, max)
            val[sliderid].toFixed(visualizefloat)
            backupval[sliderid] = val[sliderid]
        }
        sliderdist[sliderid] = (uival + (-min)) / (max - min)
        sliderdist[sliderid] *= 128
        sliderdist[sliderid].toFixed(visualizefloat)
        sliderdist[sliderid] = clamp(sliderdist[sliderid], 0, 128)

        Render.StringCustom(xx+1,y-6,0,name,[205,205,205,globals.alpha],globals.verdana8)
        Render.Rect(xx, y + 10, 130, 8, [0, 0, 0, globals.alpha])
        Render.FilledRect(xx + 1, y + 11, 128, 6, [52, 52, 52, globals.alpha])
        Render.GradientRect(xx + 1, y + 11, 128, 6, 0, [0, 0, 0, (globals.alpha/255)*40], [0, 0, 0, 0])
        if (sliderdist[sliderid] >= 0 && sliderdist[sliderid] <= 128) {
            Render.FilledRect(xx + 1, y + 11, sliderdist[sliderid], 6, [142, 181, 39, globals.alpha])
            Render.GradientRect(xx + 1, y + 11, sliderdist[sliderid], 6, 0, [255, 255, 255, (globals.alpha/255)*30], [0, 0, 0, 0])
        }
        
        
        Render.StringCustom(xx + sliderdist[sliderid], y + 15, 1, val[sliderid].toFixed(visualizefloat) + "", [200, 200, 200, globals.alpha], globals.verdana8)

        
    }return val[sliderid]
}
var drawweird = []
var comboOverlapping = false
var comboVal = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
 [], [], [], [], [], [], [], [], [], [], [], [], [], []]
var backupcomboval =  [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
 [], [], [], [], [], [], [], [], [], [], [], [], [], []]
 var comboval2 =[]
 var backupcomboval2 = []
var waitUntilUnclick = []
var lastcombodata = [[],[],[]]
var lastvaliduival = []
var comboactive = -1

function handleComboHeaderClick(comboid, x, y) {
    var mouseDown = Input.IsKeyPressed(0x01)

    // Reset the click latch even when the dropdown is currently closed.
    if (!mouseDown)
        waitUntilUnclick[comboid] = false

    if (!UI.IsMenuOpen() || isMenuInputLocked() || !cursorBetween(x, y, 130, 20))
        return

    if (mouseDown && !waitUntilUnclick[comboid] && (comboactive == comboid || comboactive == -1)) {
        closeKeybindModeMenu()
        coloridactive = -1
        if (drawweird[comboid]) {
            // Clicking the same combobox/multibox header closes it.
            drawweird[comboid] = false
            comboactive = -1
        } else {
            drawweird[comboid] = true
            comboactive = comboid
        }
        waitUntilUnclick[comboid] = true
    }
}

function getMultiComboPreview(items, maxWidth, font) {
    if (!items || items.length == 0) return ""

    var fullText = items.join(", ")
    if (Render.TextSizeCustom(fullText, font)[0] <= maxWidth)
        return fullText

    // Preserve the beginning of the selected text and replace only the part
    // that does not fit with "...". Binary search avoids measuring every
    // character on every Draw frame.
    var suffix = "..."
    var low = 0
    var high = fullText.length
    while (low < high) {
        var middle = Math.ceil((low + high) / 2)
        var candidate = fullText.substring(0, middle) + suffix
        if (Render.TextSizeCustom(candidate, font)[0] <= maxWidth)
            low = middle
        else
            high = middle - 1
    }

    var clipped = fullText.substring(0, low)
    while (clipped.length > 0 && (clipped.charAt(clipped.length - 1) == " " || clipped.charAt(clipped.length - 1) == ","))
        clipped = clipped.substring(0, clipped.length - 1)

    return clipped + suffix
}

function beginMultiComboBox(x, y, name, contents, uival,comboid) {
    lastcombodata[0] = x
    lastcombodata[1] = y
    lastcombodata[2] = name
    lastcombodata[3] = contents
    lastcombodata[4] = uival
    lastcombodata[5] = comboid
    lastcombodata[6] = 1
    spacingBetweenCheckboxes+=40
}
function beginComboBox(x, y, name, contents, uival,comboid){
    lastcombodata[0] = x
    lastcombodata[1] = y
    lastcombodata[2] = name
    lastcombodata[3] = contents
    lastcombodata[4] = uival
    lastcombodata[5] = comboid
    lastcombodata[6] = 0
    spacingBetweenCheckboxes+=40
}
function endComboBox(id) {
    if(lastcombodata[6] == 1){
    var x = lastcombodata[0]
    var y = lastcombodata[1]
    var name = lastcombodata[2]
    var contents = lastcombodata[3]
    var uival = lastcombodata[4]
    var comboid = lastcombodata[5]
    var xx = x + 20
    y += spacingBetweenCheckboxes - 30
    comboGeometry[comboid] = {x: xx, y: y}
    spacingBetweenCheckboxes+=40
    var helper = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096]
        for(i = 0; i < contents.length;i++){
            if(uival & helper[i]){
                comboVal[comboid][i] = true
                backupcomboval[comboid][i] = true
            }
            else{
                comboVal[comboid][i] = false
                backupcomboval[comboid][i] = false
            }
        }
    spacingBetweenCheckboxes -= 40
    if (UI.IsMenuOpen() || globals.alpha != 0) {
        handleComboHeaderClick(comboid, xx, y)
        Render.Rect(xx, y, 130, 20, [0, 0, 0, globals.alpha])
        Render.FilledRect(xx + 1, y + 1, 128, 18, [31, 31, 31, globals.alpha])
        Render.GradientRect(xx + 1, y + 1, 128, 18, 0, [0, 0, 0, (globals.alpha/255)*50],[0,0,0,0] )
        Render.StringCustom(xx + 2, y - 15, 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
        if(drawweird[comboid]){
            Render.Polygon([[xx+115.0, y+7 ], [ xx+120.0, y+7 ], [ xx+117, y+12.0]],[173,173,173,globals.alpha])
        }
        else{
            Render.Polygon([[xx+115.0, y+6 ], [ xx+120.0, y+9 ], [ xx+115, y+12.0]],[173,173,173,globals.alpha])
        }
        var text = []
        for(i = 0; i < contents.length;i++){
            if(comboVal[comboid][i] || backupcomboval[comboid][i]){
                text.push(contents[i])
            }
        }
        var previewText = getMultiComboPreview(text, 102, globals.verdana8)
        if(previewText != "")
            Render.StringCustom(xx + 8, y+2, 0, previewText, [200, 200, 200, globals.alpha], globals.verdana8)
        
        if(drawweird[comboid]){
            
            if (!cursorBetween(xx, y, 130,( 22 * contents.length)+22) && Input.IsKeyPressed(0x01)) {
                drawweird[comboid] = false
                comboactive = -1
            }
            if (!Input.IsKeyPressed(0x01) && waitUntilUnclick[comboid]) {
                waitUntilUnclick[comboid] = false
            }
            
            Render.FilledRect(xx + 1, y + 21, 128, (22 * contents.length)+3, [35, 35, 35, globals.alpha])
            Render.Rect(xx, y+21, 130, (22 * contents.length)+4, [0, 0, 0, globals.alpha])
            for (i = 0; i < contents.length; i++) {
                comboVal[comboid][i] = backupcomboval[comboid][i]
                if(cursorBetween(xx, y+25+(i*22), 130, 22)){
                    Render.FilledRect(xx+1,y+2+(i*22)+22,128,22,[25,25,25,globals.alpha])
                }
                Render.StringCustom(xx + 12, y + 25 + (i * 22)+4, 0, contents[i], comboVal[comboid][i] ? [142,181,39,globals.alpha] : [200, 200, 200, globals.alpha], globals.verdana8)
                
                if (cursorBetween(xx, y + 25 + (i * 22), 130, 22) && Input.IsKeyPressed(0x01) && !waitUntilUnclick[comboid]) {
                    
                    comboVal[comboid][i] = !comboVal[comboid][i]
                    waitUntilUnclick[comboid] = true
                    backupcomboval[comboid][i] = comboVal[comboid][i]
                }
                
            }
            
            var returnval = 0
            
            for(i = 0; i < contents.length; i++) {
                if(comboVal[comboid][i]){
                    returnval |= helper[i]
                }
            }
            return returnval
        }
    }
    }
    else{
        var x = lastcombodata[0]
    var y = lastcombodata[1]
    var name = lastcombodata[2]
    var contents = lastcombodata[3]
    var uival = lastcombodata[4]
    if(uival != -2147483648)
    lastvaliduival[comboid] = uival

    uival = lastvaliduival[comboid]
    var comboid = lastcombodata[5]
    var xx = x + 20
    y += spacingBetweenCheckboxes - 30
    comboGeometry[comboid] = {x: xx, y: y}
    if(!comboval2[comboid])
    comboval2[comboid] = uival
    if (UI.IsMenuOpen() || globals.alpha != 0) {
        handleComboHeaderClick(comboid, xx, y)
        Render.Rect(xx, y, 130, 20, [0, 0, 0, globals.alpha])
        Render.FilledRect(xx + 1, y + 1, 128, 18, [31, 31, 31, globals.alpha])
        Render.GradientRect(xx + 1, y + 1, 128, 18, 0, [0, 0, 0, (globals.alpha/255)*50],[0,0,0,0] )
        Render.StringCustom(xx + 2, y - 15, 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
        if(drawweird[comboid]){
            Render.Polygon([[xx+115.0, y+7 ], [ xx+120.0, y+7 ], [ xx+117, y+12.0]],[173,173,173,globals.alpha])
        }
        else{
            Render.Polygon([[xx+115.0, y+6 ], [ xx+120.0, y+9 ], [ xx+115, y+12.0]],[173,173,173,globals.alpha])
        }
        var text = []
        for(i = 0; i < contents.length;i++){
            if(i == comboval2[comboid])
            text.push(contents[i])
        }
        comboval2[comboid] = backupcomboval2[comboid]
        
        Render.StringCustom(xx + 8, y+2, 0, contents[uival] + "", [200, 200, 200, globals.alpha], globals.verdana8)
        
        if(drawweird[comboid]){
            
            if (!cursorBetween(xx, y, 130,( 22 * contents.length)+22) && Input.IsKeyPressed(0x01)) {
                drawweird[comboid] = false
                comboactive = -1
            }
            if (!Input.IsKeyPressed(0x01) && waitUntilUnclick[comboid]) {
                waitUntilUnclick[comboid] = false
            }
            
            Render.FilledRect(xx + 1, y + 21, 128, (22 * contents.length)+3, [35, 35, 35, globals.alpha])
            Render.Rect(xx, y+21, 130, (22 * contents.length)+4, [0, 0, 0, globals.alpha])
            for (i = 0; i < contents.length; i++) {
                if(cursorBetween(xx, y+25+(i*22), 130, 22)){
                    Render.FilledRect(xx+1,y+4+(i*22)+22,128,20,[25,25,25,globals.alpha])
                }
                Render.StringCustom(xx + 12, y + 25 + (i * 22)+4, 0, contents[i], i == comboval2[comboid] ? [142,181,39,globals.alpha] : [200, 200, 200, globals.alpha], globals.verdana8)
                if (cursorBetween(xx, y + 25 + (i * 22), 130, 22) && Input.IsKeyPressed(0x01) && !waitUntilUnclick[comboid]) {
                    comboval2[comboid] = i
                    
                    backupcomboval2[comboid] = i
                    waitUntilUnclick[comboid] = true
                }
                
            }
            return comboval2[comboid]
        }
    }
    }

}



var oogabooga = 0
var ragetab = 0
var lastragetab = 0
function drawRage() {
    beginChild(1|2,30,70,"Weapon Type")
    lastragetab = ragetab;
    var tabs = ["GENERAL", "PISTOL", "HEAVY", "SCOUT", "AWP", "AUTO"];
    var wepKeys = ["general", "pistol", "heavy", "scout", "awp", "auto"];
    ragetab = drawWeaponTypeSelector(ragetab, tabs, wepKeys);
    if(ragetab != lastragetab){
        comboactive = -1
    }
    var text = ""
    switch(ragetab){
        case 0:
            text = "General Config"
            break
        case 1:
            text  = "Pistol Config"
            break
        case 2:
            text = "Heavy Pistol Config"
            break
        case 3:
            text = "Scout Config"
            break
        case 4:
            text = "AWP Config"
            break
        case 5:
            text = "Auto Config"
            break
    }
    
    var a = beginChild(1,120,450,text)
    var xx = a[0]
    var yy = a[1]
    var tab = "Rage"
    var subtab = "GENERAL"
    var child = "General"
    
    var _do = function (name) {
        if (checkbox(xx, yy, name, UI.GetValue(tab, subtab, child, name))) UI.SetValue(tab, subtab, child, name, !UI.GetValue(tab, subtab, child, name))
    }
    var _do2 = function (id, target, mode) {
        drawKeybindForCheckbox(xx, yy, id, target, mode)
    }
    var _do3 = function (name, min, max, thing,thing2,id,displayName) {
        if(!globals.active){
            val[id] = UI.GetValue(tab,subtab,child,name)
            backupval[id] = val[id]
        }
        var returnval = sliderFloat(xx, yy, displayName || name, min, max, thing,thing2,id,UI.GetValue(tab,subtab,child,name))
        if(globals.active){
            UI.SetValue(tab, subtab, child, name, returnval)
        }
    }
    
    if(ragetab ==0 ){
        child = "General"
        subtab = "GENERAL"
    _do("Enabled")
    _do("Pitch resolver")
    _do("Silent")
    _do("Team check")
    _do("Auto scope")
    child = "Exploits"
    _do("Hide shots")
    _do2("rage_hide_shots", [tab,subtab,child,"Hide shots"], "Toggle")
    _do("Doubletap")
    _do2("rage_doubletap", [tab,subtab,child,"Doubletap"], "Toggle")
    _do("Doubletap instant")
    
    
    child = "General config"
    var hitboxes = ["Head","Upper chest","Chest","Body","Stomach","Pelvis","Legs","Feet"]
            var prefers = ["Shot","In air","Crouching","Standing","Walking","Running","Backwards","Sideways","Safety"]
            var helper = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096]
            var returnval = 0
            var _do5 = function(y,name,contents,id){
                beginMultiComboBox(xx,yy-y,name,contents,UI.GetValue(tab,subtab,child,name),id)
                var returnval = endComboBox(id)
                if(globals.alpha != 0 && returnval + "" != "undefined")
                    UI.SetValue(tab,subtab,child,name,returnval)
            }
            _do5(-160,"Hitbox override", hitboxes, 49)
            drawKeybindForCombo(49, "rage_general_hitbox_override", [tab,subtab,child,"Hitbox override"], "Hold")
            
            _do5(-80,"Prefer body",prefers,50)
            _do5(0,"Prefer head",prefers,51)
            _do5(80,"Multipoint hitboxes",hitboxes,52)
            _do5(160,"Hitboxes",hitboxes,53)
            
    }
    a = beginChild(2,120,450,"Accuracy")
    if(ragetab == 0){
        xx = a[0]
        child = "Accuracy"
        _do3("Hitchance",0,100,false,0,213)
        _do3("Minimum damage (visible)",0,100,false,0,219)
        _do3("Minimum damage (behind wall)",0,100,false,0,220)
        _do3("Minimum damage (on key)",0,100,false,0,221,"Minimum damage")
        drawKeybindForSlider(221, "rage_general_min_damage", [tab,subtab,child,"Minimum damage (on key)"], "Hold")
        _do3("Health based override",0,100,false,0,222)
        yy-=5
        _do("Auto stop")
        var _do5 = function(y,name,contents,id){
            beginMultiComboBox(xx,yy-y,name,contents,UI.GetValue(tab,subtab,child,name),id)
            var returnval = endComboBox(id)
            if(globals.alpha != 0 && returnval + "" != "undefined")
                UI.SetValue(tab,subtab,child,name,returnval)
        }
        _do5(5,"Auto stop mode",["Duck","Between shots","Center only","Lethal only","Visible only","In air","Force accuracy"], 48)
        
        
    }
    if(ragetab != 0){
        switch(ragetab){
        case 1:
            subtab = "PISTOL"
            child = "Pistol config"
            break
        case 2:
            subtab = "HEAVY PISTOL"
            child = "Heavy pistol config"
            break
        case 3:
            subtab = "SCOUT"
            child = "Scout config"
            break
        case 4:
            subtab = "AWP"
            child = "AWP config"
            break
        case 5:
            subtab = "AUTOSNIPER"
            child = "Auto config"
            break
        }
        _do("Override default")
        if(UI.GetValue(tab,subtab,child,"Override default")){
            
            var hitboxes = ["Head","Upper chest","Chest","Body","Stomach","Pelvis","Legs","Feet"]
            var prefers = ["Shot","In air","Crouching","Standing","Walking","Running","Backwards","Sideways","Safety"]
            var helper = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096]
            var returnval = 0
            var _do5 = function(y,name,contents,id){
                beginMultiComboBox(xx,yy-y,name,contents,UI.GetValue(tab,subtab,child,name),id)
                var returnval = endComboBox(id)
                if(globals.active && returnval + "" != "undefined")
                    UI.SetValue(tab,subtab,child,name,returnval)
            }
            _do5(-160,"Hitbox override", hitboxes, 38+ragetab)
            drawKeybindForCombo(38+ragetab, "rage_" + subtab + "_hitbox_override", [tab,subtab,child,"Hitbox override"], "Hold")
            _do5(-80,"Prefer body",prefers,33+ragetab)
            _do5(-0,"Prefer head",prefers,28+ragetab)
            _do5(80,"Multipoint hitboxes",hitboxes,23+ragetab)
            _do5(160,"Hitboxes",hitboxes,17+ragetab)
            
            
        }
    }
    
    if(ragetab != 0 && UI.GetValue(tab,subtab,child,"Override default")){
        child = "Accuracy"
        xx = a[0]
        yy = a[1]
        spacingBetweenCheckboxes = 0
        _do3("Hitchance",0,100,false,0,57+ragetab)
        
        child = "Damage"
        _do3("Minimum damage (visible)",0,100,false,0,93+ragetab)
        _do3("Minimum damage (behind wall)",0,100,false,0,99+ragetab)
        _do3("Minimum damage (on key)",0,100,false,0,105+ragetab,"Minimum damage")
        drawKeybindForSlider(105+ragetab, "rage_" + subtab + "_min_damage", [tab,subtab,child,"Minimum damage (on key)"], "Hold")
        _do3("Health based override",0,20,false,0,111+ragetab)
        child = "Accuracy"
        _do("Auto stop")
        var _do5 = function(y,name,contents,id){
            beginMultiComboBox(xx,yy-y,name,contents,UI.GetValue(tab,subtab,child,name),id)
            var returnval = endComboBox(id)
            if(globals.alpha != 0 && returnval + "" != "undefined")
                UI.SetValue(tab,subtab,child,name,returnval)
        }
       
        _do5(0,"Auto stop mode",["Duck","Between shots","Center only","Lethal only","Visible only","In air","Force accuracy"], 43+ragetab)
    }
}
var realjitteramount = [0,0]
var fakejitteramount = [0,0]
var fakejitterdelay = 0


var offsetjitteramount = [0,0]
var invertonswitch = false
var offsetjitteramountdelay = 0

var flip = 0
var flip2 = false
var flip3 = false
var flip4 = false
var a = 0
var b = 0
var c = 0
var spinbot = false
var spinspeed = 0

var yaw = 0
var aaTransitionState = {
    local: 0,
    team: -1,
    wasReady: false,
    settleTicks: 0
}

function getReadyLocalState() {
    try {
        var local = Entity.GetLocalPlayer()
        if (!local || !Entity.IsValid(local) || !Entity.IsAlive(local))
            return null

        // Detect side/team changes when the netvar is available. Some v3
        // builds use the class name, others use the DT table name.
        var team = Entity.GetProp(local, "CBaseEntity", "m_iTeamNum")
        if (team === undefined || team === null)
            team = Entity.GetProp(local, "DT_BaseEntity", "m_iTeamNum")

        if (team !== undefined && team !== null && team != 2 && team != 3)
            return null

        if (team === undefined || team === null)
            team = -1

        return [local, team]
    } catch (e) {
        return null
    }
}

function getSafeScriptNumber(name, fallback) {
    try {
        var value = UI.GetValue("Script Items", name)
        if (typeof value == "number" && value == value)
            return value
    } catch (e) {
    }
    return fallback
}

function getSafeScriptToggle(name) {
    try {
        return UI.GetValue("Script Items", name) ? true : false
    } catch (e) {
        return false
    }
}

function getSafeUIValue(path, fallback) {
    try {
        var value = UI.GetValue.apply(null, path)
        if (value !== undefined && value !== null && value != -2147483648)
            return value
    } catch (e) {
    }
    return fallback
}

function getLocalWeaponCategory(local) {
    try {
        var weapon = Entity.GetWeapon(local)
        if (!weapon || !Entity.IsValid(weapon)) return "general"

        var definition = Entity.GetProp(weapon, "CBaseAttributableItem", "m_iItemDefinitionIndex")
        if (definition === undefined || definition === null)
            definition = Entity.GetProp(weapon, "DT_BaseAttributableItem", "m_iItemDefinitionIndex")
        if (typeof definition == "number") definition = definition & 0xFFFF

        if (definition == 1 || definition == 64) return "heavy"
        if (definition == 9) return "awp"
        if (definition == 40) return "scout"
        if (definition == 11 || definition == 38) return "auto"

        var pistols = [2,3,4,30,32,36,61,63]
        for (var i = 0; i < pistols.length; i++) {
            if (definition == pistols[i]) return "pistol"
        }

        var name = Entity.GetName(weapon)
        name = name ? (name + "").toLowerCase() : ""
        if (name.indexOf("deagle") != -1 || name.indexOf("revolver") != -1) return "heavy"
        if (name.indexOf("awp") != -1) return "awp"
        if (name.indexOf("ssg") != -1 || name.indexOf("scout") != -1) return "scout"
        if (name.indexOf("scar") != -1 || name.indexOf("g3sg1") != -1) return "auto"
        if (name.indexOf("glock") != -1 || name.indexOf("usp") != -1 || name.indexOf("p2000") != -1 ||
            name.indexOf("p250") != -1 || name.indexOf("tec") != -1 || name.indexOf("five") != -1 ||
            name.indexOf("cz75") != -1 || name.indexOf("elite") != -1)
            return "pistol"
    } catch (e) {
    }

    return "general"
}

function getMinimumDamageConfig(local) {
    var category = getLocalWeaponCategory(local)
    var weaponData = {
        pistol: ["PISTOL", "Pistol config"],
        heavy: ["HEAVY PISTOL", "Heavy pistol config"],
        scout: ["SCOUT", "Scout config"],
        awp: ["AWP", "AWP config"],
        auto: ["AUTOSNIPER", "Auto config"]
    }

    var subtab = "GENERAL"
    var damageChild = "Accuracy"
    var overrideChild = "General config"
    var specific = weaponData[category]

    if (specific) {
        var specificEnabled = getSafeUIValue(["Rage", specific[0], specific[1], "Override default"], 0) ? true : false
        if (specificEnabled) {
            subtab = specific[0]
            damageChild = "Damage"
            overrideChild = specific[1]
        }
    }

    var visible = Number(getSafeUIValue(["Rage", subtab, damageChild, "Minimum damage (visible)"], 0))
    var wall = Number(getSafeUIValue(["Rage", subtab, damageChild, "Minimum damage (behind wall)"], 0))
    var onKey = Number(getSafeUIValue(["Rage", subtab, damageChild, "Minimum damage (on key)"], 0))

    if (!(visible == visible)) visible = 0
    if (!(wall == wall)) wall = 0
    if (!(onKey == onKey)) onKey = 0

    return {
        visible: clamp(Math.round(visible), 0, 130),
        wall: clamp(Math.round(wall), 0, 130),
        onKey: clamp(Math.round(onKey), 0, 130),
        hotkey: ["Rage", subtab, damageChild, "Minimum damage (on key)"],
        category: category,
        overrideChild: overrideChild
    }
}

function isRageTargetVisible(local, target) {
    var start = null
    try {
        start = Entity.GetEyePosition(local)
    } catch (e) {
        return true
    }
    if (!start || start.length < 3) return true

    var hitboxes = [0, 3, 5]
    var traceSucceeded = false

    for (var i = 0; i < hitboxes.length; i++) {
        var end = null
        try {
            end = Entity.GetHitboxPosition(target, hitboxes[i])
        } catch (e) {
            end = null
        }
        if (!end || end.length < 3) continue

        if (typeof Trace != "undefined" && Trace.Bullet) {
            try {
                var bullet = Trace.Bullet(local, target, start, end)
                if (bullet && bullet.length >= 3) {
                    traceSucceeded = true
                    if (bullet[2] === true || bullet[2] == 1) return true
                }
            } catch (e) {
            }
        }

        if (typeof Trace != "undefined" && Trace.Line) {
            try {
                var line = Trace.Line(local, start, end)
                if (line && line.length >= 2) {
                    traceSucceeded = true
                    if (line[0] == target || line[1] >= 0.97) return true
                }
            } catch (e) {
            }
        }
    }

    // If this OneTap build does not expose working trace functions, prefer the
    // visible value instead of incorrectly forcing the behind-wall value.
    return traceSucceeded ? false : true
}

function applyWeaponMinimumDamage(local) {
    if (typeof Ragebot == "undefined" || !Ragebot.GetTarget || !Ragebot.ForceTargetMinimumDamage)
        return

    var target = 0
    try {
        target = Ragebot.GetTarget()
        if (!target || !Entity.IsValid(target) || !Entity.IsAlive(target)) return
        if (Entity.IsDormant && Entity.IsDormant(target)) return
        if (Entity.IsEnemy && !Entity.IsEnemy(target)) return
    } catch (e) {
        return
    }

    var config = getMinimumDamageConfig(local)
    var damage

    // The key override always wins over visibility/penetration selection.
    if (getNativeHotkeyState(config.hotkey))
        damage = config.onKey
    else
        damage = isRageTargetVisible(local, target) ? config.visible : config.wall

    try {
        Ragebot.ForceTargetMinimumDamage(target, damage)
    } catch (e) {
    }
}

function suspendAntiAimForTransition() {
    globals.aa_native_ready = false
    globals.aa_override_known = false
    aaTransitionState.wasReady = false
    aaTransitionState.settleTicks = 16
}

function onCreateMove(){
    if (globals.unloading) return;

    var localState = getReadyLocalState()
    if (!localState) {
        suspendAntiAimForTransition()
        return
    }

    var local = localState[0]
    var team = localState[1]
    if (!aaTransitionState.wasReady || aaTransitionState.local != local || aaTransitionState.team != team) {
        aaTransitionState.local = local
        aaTransitionState.team = team
        aaTransitionState.wasReady = true
        aaTransitionState.settleTicks = 16
        globals.aa_native_ready = false
        globals.aa_override_known = false
        return
    }

    // Give OneTap several CreateMove ticks to rebuild its local-player and
    // anti-aim state after respawn, side swap or team selection.
    if (aaTransitionState.settleTicks > 0) {
        aaTransitionState.settleTicks--
        globals.aa_native_ready = false
        return
    }
    globals.aa_native_ready = true

    // Custom keybinds control native OneTap hotkey states even while the
    // custom menu is closed.
    processCustomKeybinds()

    // Re-apply the correct per-weapon minimum damage every tick. On-key has
    // priority; otherwise visibility decides between visible/behind-wall.
    applyWeaponMinimumDamage(local)

    var customDesyncActive = getSafeScriptToggle("Custom desync")

    try {
        // State becomes unknown during a transition, forcing the correct value
        // to be applied again once the local player is stable.
        if (!globals.aa_override_known || customDesyncActive != globals.aa_override_active) {
            AntiAim.SetOverride(customDesyncActive ? 1 : 0)
            globals.aa_override_active = customDesyncActive
            globals.aa_override_known = true
        }
        if (!customDesyncActive) return

        var fakeamount = getSafeScriptNumber("Fake offset", 0)
        var realamount = getSafeScriptNumber("Real offset", 0)
        var realjitter = getSafeScriptToggle("Jitter real")
        var fakejitter = getSafeScriptToggle("Jitter fake")

        realjitteramount[0] = getSafeScriptNumber("Real 1st yaw", 0)
        realjitteramount[1] = getSafeScriptNumber("Real 2nd yaw", 0)

        fakejitteramount[0] = getSafeScriptNumber("Fake 1st yaw", 0)
        fakejitteramount[1] = getSafeScriptNumber("Fake 2nd yaw", 0)
        fakejitterdelay = getSafeScriptNumber("Fake delay", 1)

        var offsetjitter = getSafeScriptToggle("Jitter offset")
        offsetjitteramount[0] = getSafeScriptNumber("Offset 1st yaw", 0)
        offsetjitteramount[1] = getSafeScriptNumber("Offset 2nd yaw", 0)
        offsetjitteramountdelay = getSafeScriptNumber("Offset delay", 1)

        var inverted = false
        try {
            inverted = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter") ? true : false
        } catch (e) {
            inverted = false
        }

        AntiAim.SetRealOffset(inverted ? realamount : -realamount)
        AntiAim.SetLBYOffset(inverted ? fakeamount : -fakeamount)

        if(spinbot){
            yaw += spinspeed
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", (yaw % 360) - 180)
        }

        flip = (flip + 1) % 1000000
        if(realjitter){
            if(flip % 3 == 0)
                flip2 = !flip2

            a = flip2 ? realjitteramount[0] : realjitteramount[1]
            AntiAim.SetRealOffset(inverted ? a : -a)
        }

        if(fakejitter){
            var safeFakeDelay = Math.max(1, Math.floor(fakejitterdelay))
            if(flip % safeFakeDelay == 0)
                flip3 = !flip3

            b = flip3 ? fakejitteramount[0] : fakejitteramount[1]
            AntiAim.SetLBYOffset(inverted ? b : -b)
        }

        if(offsetjitter){
            var safeOffsetDelay = Math.max(1, Math.floor(offsetjitteramountdelay))
            if(flip % safeOffsetDelay == 0){
                flip4 = !flip4
                if(invertonswitch)
                    UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter")
            }

            c = flip4 ? offsetjitteramount[0] : offsetjitteramount[1]
            AntiAim.SetFakeOffset(c)
        }
    } catch (e) {
        // Do not keep calling native AA functions while OneTap is rebuilding
        // its local-player state. Retry only after another short grace period.
        globals.aa_native_ready = false
        globals.aa_override_known = false
        aaTransitionState.settleTicks = 8
    }
}
function drawAA() {
    var a = beginChild(1,30,540,"General")
    var xx = a[0]
    var yy = a[1]
    var tab = "Anti-Aim"
    var subtab = "Rage Anti-Aim"
    var _do = function (name) {
        if (checkbox(xx, yy, name, UI.GetValue(tab, subtab, name))) UI.SetValue(tab, subtab, name, !UI.GetValue(tab, subtab, name))
    }
    var _do3 = function (name,min,max, thing,thing2,id) {
        
        val[id] = UI.GetValue(tab,subtab,name)
        backupval[id] = val[id]
        
        var returnval = sliderFloat(xx, yy, name, min, max, thing,thing2,id,UI.GetValue(tab,subtab,name))
        if(globals.active)
            UI.SetValue(tab, subtab, name, returnval)
    }
    _do("Enabled")
    _do("At targets")
    _do("Auto direction")
    
    _do3("Yaw offset", -180, 180, true,0,2)
    _do3("Jitter offset", -180, 180, true,0,3)
    var combothing = [yy,spacingBetweenCheckboxes]
    spacingBetweenCheckboxes+=40
    var backup = [tab,subtab]
        tab = "Misc"
        subtab = "Script Items"
    _do("Custom desync")
    var isCustomDesync = UI.GetValue(tab, subtab, "Custom desync");
    if (isCustomDesync) {
        
        if(!UI.GetValue(tab,subtab,"Jitter fake"))
        _do3("Fake offset",-58,58,true,0,600)
        if(!UI.GetValue(tab,subtab,"Jitter real"))
        _do3("Real offset",-58,58,true,0,601)

        //if(checkbox(xx,yy,"Jitter real",realjitter)) realjitter = !realjitter
        _do("Jitter real")
        
        if(UI.GetValue(tab,subtab,"Jitter real")){
            
            UI.SetValue(tab,subtab,"Real 1st yaw",sliderFloat(xx,yy,"1st yaw",-58,58,true,0,352,UI.GetValue(tab,subtab,"Real 1st yaw")))
            realjitteramount[0] = UI.GetValue(tab,subtab,"Real 1st yaw")
            UI.SetValue(tab,subtab,"Real 2nd yaw",sliderFloat(xx,yy,"2nd yaw",-58,58,true,0,353,UI.GetValue(tab,subtab,"Real 2nd yaw")))
            realjitteramount[1] = UI.GetValue(tab,subtab,"Real 2nd yaw")
        }
        _do("Jitter fake")
        if(UI.GetValue(tab,subtab,"Jitter fake")){
            UI.SetValue(tab,subtab,"Fake 1st yaw",sliderFloat(xx,yy,"1st yaw",-58,58,true,0,354,UI.GetValue(tab,subtab,"Fake 1st yaw")))
            fakejitteramount[0] = UI.GetValue(tab,subtab,"Fake 1st yaw")
            UI.SetValue(tab,subtab,"Fake 2nd yaw",sliderFloat(xx,yy,"2nd yaw",-58,58,true,0,355,UI.GetValue(tab,subtab,"Fake 2nd yaw")))
            fakejitteramount[1] = UI.GetValue(tab,subtab,"Fake 2nd yaw")
            UI.SetValue(tab,subtab,"Fake delay",sliderFloat(xx,yy,"Delay",0,100,false,0,356,UI.GetValue(tab,subtab,"Fake delay")))
            fakejitterdelay = UI.GetValue(tab,subtab,"Fake delay")
            fakejitterdelay.toFixed(0)
        }
        _do("Jitter offset")
        if(UI.GetValue(tab,subtab,"Jitter offset")){
            UI.SetValue(tab,subtab,"Offset 1st yaw", sliderFloat(xx,yy,"1st yaw",-180,180,true,0,357,UI.GetValue(tab,subtab,"Offset 1st yaw")))
            offsetjitteramount[0] = UI.GetValue(tab,subtab,"Offset 1st yaw")
            UI.SetValue(tab,subtab,"Offset 2nd yaw", sliderFloat(xx,yy,"2nd yaw",-180,180,true,0,358,UI.GetValue(tab,subtab,"Offset 2nd yaw")))
            offsetjitteramount[1] = UI.GetValue(tab,subtab,"Offset 2nd yaw")
            UI.SetValue(tab,subtab,"Offset delay", sliderFloat(xx,yy,"Delay",0,100,false,0,360,UI.GetValue(tab,subtab,"Offset delay")))
            offsetjitteramountdelay = UI.GetValue(tab,subtab,"Offset delay")
            offsetjitteramountdelay.toFixed(0)
        }
        
    }
    tab = backup[0]
    subtab = backup[1]
    spacingBetweenCheckboxes = combothing[1]
    beginComboBox(xx,yy,"Slow walk mode",["Accurate","Slide fast","Slide slow"],UI.GetValue(tab,"Extra","Slow walk mode"),71)
    var returnval = endComboBox(71)
    if(returnval + "" != "undefined" && globals.active)
    UI.SetValue(tab,"Extra","Slow walk mode",returnval)
    a = beginChild(2,30,540/2,"Extra")
    xx = a[0]
    spacingBetweenCheckboxes = 0
    subtab = "Fake-Lag"
    
    if (checkbox(xx, yy, "Fake-lag", UI.GetValue(tab, subtab, "Enabled"))) UI.SetValue(tab, subtab, "Enabled", !UI.GetValue(tab, subtab, "Enabled"))
    _do3("Limit",0,16,false,0,4)
    _do3("Jitter",0,100,false,0,5)
    beginMultiComboBox(xx,yy-40,"Triggers",["In air","On peek","On shot","On land","While reloading","On weapon switch","On velocity change","Break Lag Comp"],UI.GetValue(tab,subtab,"Triggers"),1)
    _do3("Trigger limit",0,16,false,0,6)
    var returnval = endComboBox(1)
    if(globals.active && returnval + "" != "undefined"){
        UI.SetValue(tab,subtab,"Triggers",returnval)
    }
    beginChild(2,30+580/2,500/2,"Desync")
    spacingBetweenCheckboxes = 270+20
    subtab = "Fake angles"
    _do("Enabled")
    spacingBetweenCheckboxes+=80
    
    _do("Desync on shot")
    _do("Hide real angle")
    _do("Avoid overlap")
    _do("Fake desync")
    beginMultiComboBox(xx,yy,"Inverter flip", ["Walk","Run","In air"], UI.GetValue(tab,subtab,"Inverter flip"), 100)
    var returnval = endComboBox(100)
    if(returnval + "" != "undefined" && globals.alpha != 0)
        UI.SetValue(tab,subtab,"Inverter flip", returnval)
    
        
    beginComboBox(xx,yy-160,"LBY mode",["Normal","Opposite","Sway"],UI.GetValue(tab,subtab,"LBY mode"),62)
    returnval = endComboBox(62)
    if(returnval + "" != "undefined" && globals.active)
        UI.SetValue(tab,subtab,"LBY mode", returnval)
    beginComboBox(xx,yy-240,"Air mode",["Normal","Spin"],UI.GetValue(tab,subtab,"Air mode"),61)
    returnval = endComboBox(61)
    if(returnval + "" != "undefined" && globals.active)
        UI.SetValue(tab,subtab,"Air mode", returnval)
    
}
var namee = "a"
var legitTab = 0
var backuplegittab = 0
var lasttab = 0
function drawLegit() {
    lasttab = legitTab
    if (globals.alpha != 0) {
        beginChild(1 | 2,30,70,"Weapon Type");
        var tabs = ["GENERAL", "PISTOL", "RIFLE", "SNIPER", "SMG"];
        var wepKeys = ["general", "pistol", "rifle", "awp", "smg"];
        legitTab = drawWeaponTypeSelector(legitTab, tabs, wepKeys);
        backuplegittab = legitTab;
    }
    legitTab = backuplegittab // fixed lol
    if(legitTab != lasttab){
        comboactive = -1
    }
    if (legitTab == 0) {
        
        var a = beginChild(1,120,450,"General")
        var xx = a[0]-20
        var y = a[1]-140
        var tab = "Legit"
        var subtab = "GENERAL"
        var child = "General"
        var _do = function (name) {
            if (checkbox(xx + 20, y+140, name, UI.GetValue(tab, subtab, child, name)) && globals.active) UI.SetValue(tab, subtab, child, name, !UI.GetValue(tab, subtab, child, name))
        }
        var _do2 = function (name, min, max, thing, thing2,id) {
            if(!globals.active){
                val[id] = UI.GetValue(tab,subtab,child,name)
                backupval[id] = val[id]
            }
            var clamp = function (val, min, max) {
                if (val > max)
                    return max
                if (min > val)
                    return min
                return val
            }
            var returnval = sliderFloat(xx + 20, y + 140, name, min, max, thing, thing2,id,UI.GetValue(tab,subtab,child,name))
            if(globals.active)
                UI.SetValue(tab, subtab, child, name, clamp(returnval, min, max))
        }
        _do("Enabled")
        _do2("Reaction time", 0, 0.4, false, 2,7)
        child = "Triggerbot"
        if (checkbox(xx + 20, y + 140, "Triggerbot", UI.GetValue(tab, subtab, child, "Enabled"))) UI.SetValue(tab, subtab, child, "Enabled", !UI.GetValue(tab, subtab, child, "Enabled"))
        _do("Magnet")
        child = "Backtracking"
        if (checkbox(xx + 20, y + 140, "Backtrack", UI.GetValue(tab, subtab, child, "Enabled"))) UI.SetValue(tab, subtab, child, "Enabled", !UI.GetValue(tab, subtab, child, "Enabled"))
        _do2("Maximum time", 0, 0.2, false, 2,8)


        xx = beginChild(2,120,450,"General Config")[0] - 20
        
        spacingBetweenCheckboxes = 0
        child = "Default config"
        spacingBetweenCheckboxes += 80
        _do2("Fov", 0, 30, false, 2,9)
        _do2("Deadzone", 0, 1, false, 2,10)
        _do2("Speed (yaw)", 0, 100, false, 0,11)
        

        _do2("Speed (pitch)", 0, 100, false, 0,12)
         beginMultiComboBox(xx+20,y-30,"Hitboxes",["Head","Upper Chest","Chest","Body","Pelvis"],UI.GetValue(tab,subtab,child,"Hitboxes"),1)
        
        var returnval = endComboBox(1)
        if(globals.active && returnval + "" != "undefined"){
            UI.SetValue(tab,subtab,child,"Hitboxes",returnval)
        }
        beginComboBox(xx+20,y-110,"Hitbox priority",["Head","Body","Closest"],UI.GetValue(tab,subtab,child,"Hitbox priority"),63)
        returnval = endComboBox(63)
        if(returnval + "" != "undefined" && globals.active)
        UI.SetValue(tab,subtab,child,"Hitbox priority", returnval)
        spacingBetweenCheckboxes-=80
        _do2("Recoil control", 0, 100, false, 0,13)
        _do2("Assist", 0, 100, false, 0,14)
        _do2("Triggerbot hitchance", 0, 100, false, 0,15)
    }
    if (legitTab != 0) {


        var xx = globals.X() + 115
        var y = globals.Y() + 30
       
        var a = beginChild(1,120,450,"General")
        xx = a[0]-20
        y = a[1]-140
        var tab = "Legit"
        var subtab = ""
        if (legitTab == 1) subtab = "PISTOL"
        if (legitTab == 2) subtab = "RIFLE"
        if (legitTab == 3) subtab = "SNIPER"
        if (legitTab == 4) subtab = "SMG"
        
        var child = "General"
        var _do = function (name) {
            if (checkbox(xx + 20, y + 140, name, UI.GetValue(tab, subtab, child, name)) && globals.active) UI.SetValue(tab, subtab, child, name, !UI.GetValue(tab, subtab, child, name))
        }
        var _do2 = function (name, min, max, thing, thing2,id) {
            if(!globals.active){
                val[id] = UI.GetValue(tab,subtab,child,name)
                backupval[id] = val[id]
            }
            var clamp = function (val, min, max) {
                if (val > max)
                    return max
                if (min > val)
                    return min
                return val
            }
            var returnval = sliderFloat(xx + 20, y + 140, name, min, max, thing, thing2,id,UI.GetValue(tab,subtab,child,name))
            if(globals.active)
                UI.SetValue(tab, subtab, child, name, clamp(returnval, min, max))
        }
        _do("Override default")
        if (UI.GetValue(tab, subtab, child, "Override default")) {
            child = "Backtracking"
            if (checkbox(xx + 20, y + 140, "Backtrack", UI.GetValue(tab, subtab, child, "Enabled"))) UI.SetValue(tab, subtab, child, "Enabled", !UI.GetValue(tab, subtab, child, "Enabled"))
            _do2("Maximum time", 0, 0.2, false, 2,16+legitTab)
            var text = ""
            if (globals.alpha!=0) {
                spacingBetweenCheckboxes = 0
                switch(legitTab){
                    case 1:
                        text = "Pistol Config"
                    break
                    case 2:
                        text = "Rifle Config"
                    break
                    case 3:
                        text = "Sniper Config"
                    break
                    case 4:
                        text = "SMG Config"
                    break
                }
                var a = beginChild(2,120,450,text)
                xx = a[0]-20
                y = a[1]-140
            }
            switch(legitTab){
                case 1:
                    child = "Pistol config"
                break
                case 2:
                    child = "Rifle config"
                break
                case 3:
                    child = "Sniper config"
                break
                case 4:
                    child = "SMG config"
                break
            }
            beginMultiComboBox(xx+20,y+10,"Hitboxes",["Head","Upper Chest","Chest","Body","Pelvis"],UI.GetValue(tab,subtab,"General","Hitboxes"),4+legitTab)
            spacingBetweenCheckboxes+=40
            _do2("Fov", 0, 30, false, 2,20+legitTab)
            _do2("Deadzone", 0, 1, false, 2,24+legitTab)
            _do2("Speed (yaw)", 0, 100, false, 0,28+legitTab)
            _do2("Speed (pitch)", 0, 100, false, 0,32+legitTab)
            var returnval = endComboBox(4+legitTab)
            if(returnval + "" != "undefined" && globals.active)
                UI.SetValue(tab,subtab,"General","Hitboxes", returnval)
            beginComboBox(xx+20,y-70,"Hitbox priority",["Head","Body","Closest"],UI.GetValue(tab,subtab,"General","Hitbox priority"),65+legitTab)
            returnval = endComboBox(65+legitTab)
            if(returnval + "" != "undefined" && globals.active)
            UI.SetValue(tab,subtab,"General","Hitbox priority",returnval)
            spacingBetweenCheckboxes-=40
            _do2("Recoil control", 0, 100, false, 0,36+legitTab)
            _do2("Assist", 0, 100, false, 0,40+legitTab)
            _do2("Triggerbot hitchance", 0, 100, false, 0,44+legitTab)
        }
    }
    if(legitTab != lasttab) {
        sliderdist = []
        lasttab = legitTab
    }
}
var visualstab = 0
var coloridactive = -1
var colorPickerConsumesMouse = false
var colorPickerStates = {}

function isMenuInputLocked() {
    return coloridactive != -1 || colorPickerConsumesMouse
}

function closeAllCustomCombos() {
    for (var id in drawweird)
        drawweird[id] = false
    comboactive = -1
}

var colorPickerDragging = null
var colorPickerPreviousMouse = false
var colorPickerPendingOverlay = null
var colorPickerActiveSeen = false

function colorRgbToHsv(r, g, b) {
    r = clamp(r / 255, 0, 1)
    g = clamp(g / 255, 0, 1)
    b = clamp(b / 255, 0, 1)

    var max = Math.max(r, g, b)
    var min = Math.min(r, g, b)
    var delta = max - min
    var h = 0

    if (delta != 0) {
        if (max == r)
            h = ((g - b) / delta) % 6
        else if (max == g)
            h = ((b - r) / delta) + 2
        else
            h = ((r - g) / delta) + 4
        h /= 6
        if (h < 0) h += 1
    }

    return [h, max == 0 ? 0 : delta / max, max]
}

function colorHsvToRgb(h, s, v) {
    h = ((h % 1) + 1) % 1
    s = clamp(s, 0, 1)
    v = clamp(v, 0, 1)

    var i = Math.floor(h * 6)
    var f = h * 6 - i
    var p = v * (1 - s)
    var q = v * (1 - f * s)
    var t = v * (1 - (1 - f) * s)
    var r = 0, g = 0, b = 0

    switch (i % 6) {
        case 0: r = v; g = t; b = p; break
        case 1: r = q; g = v; b = p; break
        case 2: r = p; g = v; b = t; break
        case 3: r = p; g = q; b = v; break
        case 4: r = t; g = p; b = v; break
        case 5: r = v; g = p; b = q; break
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function getColorPickerState(id, source, alphaEnabled) {
    var r = source && typeof source[0] == "number" ? clamp(source[0], 0, 255) : 255
    var g = source && typeof source[1] == "number" ? clamp(source[1], 0, 255) : 255
    var b = source && typeof source[2] == "number" ? clamp(source[2], 0, 255) : 255
    var a = source && typeof source[3] == "number" ? clamp(source[3], 0, 255) : 255
    var state = colorPickerStates[id]

    if (!state || coloridactive != id) {
        var hsv = colorRgbToHsv(r, g, b)
        if (!state || state.r != r || state.g != g || state.b != b || state.a != a) {
            state = state || {}
            state.h = hsv[0]
            state.s = hsv[1]
            state.v = hsv[2]
            state.a = a
            state.r = r
            state.g = g
            state.b = b
            colorPickerStates[id] = state
        }
    }

    state.alphaEnabled = alphaEnabled
    return state
}

function getColorPickerPopup(swatchX, swatchY, alphaEnabled) {
    var width = 160
    var height = alphaEnabled ? 132 : 116
    var x = swatchX + 27
    var y = swatchY + 15
    var menuRight = globals.X() + 620
    var menuBottom = globals.Y() + 590

    if (x + width > menuRight) x = swatchX - width - 7
    if (y + height > menuBottom) y = swatchY - height - 5

    return {x:x, y:y, w:width, h:height}
}

function beginColorPickerFrame() {
    colorPickerPendingOverlay = null
    colorPickerActiveSeen = false
}

function gameSenseColorPicker(baseX, baseY, spacing, source, alphaEnabled, id) {
    var state = getColorPickerState(id, source, alphaEnabled)
    var swatchX = baseX + 170
    var swatchY = baseY - 22 + spacing
    var leftDown = Input.IsKeyPressed(0x01)
    var leftPressed = leftDown && !colorPickerPreviousMouse
    var cursor = Input.GetCursorPosition()
    var swatchHovered = cursorBetween(swatchX, swatchY, 20, 10)

    Render.Rect(swatchX - 2, swatchY - 2, 24, 14, [5,5,5,globals.alpha])
    Render.Rect(swatchX - 1, swatchY - 1, 22, 12, [65,65,65,globals.alpha])

    if (alphaEnabled) {
        Render.FilledRect(swatchX, swatchY, 10, 5, [95,95,95,globals.alpha])
        Render.FilledRect(swatchX + 10, swatchY, 10, 5, [225,225,225,globals.alpha])
        Render.FilledRect(swatchX, swatchY + 5, 10, 5, [225,225,225,globals.alpha])
        Render.FilledRect(swatchX + 10, swatchY + 5, 10, 5, [95,95,95,globals.alpha])
    }

    var current = colorHsvToRgb(state.h, state.s, state.v)
    Render.FilledRect(swatchX, swatchY, 20, 10, [current[0],current[1],current[2],alphaEnabled ? (globals.alpha / 255) * state.a : globals.alpha])
    Render.GradientRect(swatchX, swatchY, 20, 10, 0, [255,255,255,25], [0,0,0,100])

    if (UI.IsMenuOpen() && swatchHovered && leftPressed) {
        colorPickerConsumesMouse = true
        if (coloridactive == id) {
            coloridactive = -1
            colorPickerDragging = null
        } else {
            coloridactive = id
            colorPickerDragging = null
            closeAllCustomCombos()
            closeKeybindModeMenu()
            stopOtherKeybindListeners("")
        }
    }

    if (coloridactive != id) return

    colorPickerActiveSeen = true
    var popup = getColorPickerPopup(swatchX, swatchY, alphaEnabled)
    var sv = {x:popup.x + 6, y:popup.y + 6, w:148, h:82}
    var hue = {x:popup.x + 6, y:popup.y + 94, w:148, h:10}
    var alpha = {x:popup.x + 6, y:popup.y + 110, w:148, h:10}
    var insidePopup = cursorBetween(popup.x - 2, popup.y - 2, popup.w + 4, popup.h + 4)

    if (leftDown) colorPickerConsumesMouse = true

    if (UI.IsMenuOpen() && leftPressed && !swatchHovered && !insidePopup) {
        colorPickerConsumesMouse = true
        coloridactive = -1
        colorPickerDragging = null
        return
    }

    if (!leftDown) {
        colorPickerDragging = null
    } else if (UI.IsMenuOpen()) {
        if (!colorPickerDragging) {
            if (cursorBetween(sv.x, sv.y, sv.w, sv.h)) colorPickerDragging = {id:id, part:"sv"}
            else if (cursorBetween(hue.x, hue.y, hue.w, hue.h)) colorPickerDragging = {id:id, part:"hue"}
            else if (alphaEnabled && cursorBetween(alpha.x, alpha.y, alpha.w, alpha.h)) colorPickerDragging = {id:id, part:"alpha"}
        }

        if (colorPickerDragging && colorPickerDragging.id == id) {
            if (colorPickerDragging.part == "sv") {
                state.s = clamp((cursor[0] - sv.x) / sv.w, 0, 1)
                state.v = 1 - clamp((cursor[1] - sv.y) / sv.h, 0, 1)
            } else if (colorPickerDragging.part == "hue") {
                state.h = clamp((cursor[0] - hue.x) / hue.w, 0, 1)
            } else if (colorPickerDragging.part == "alpha") {
                state.a = Math.round(clamp((cursor[0] - alpha.x) / alpha.w, 0, 1) * 255)
            }
        }
    }

    current = colorHsvToRgb(state.h, state.s, state.v)
    state.r = current[0]
    state.g = current[1]
    state.b = current[2]

    colorPickerPendingOverlay = {
        popup:popup,
        sv:sv,
        hue:hue,
        alpha:alpha,
        state:state,
        alphaEnabled:alphaEnabled
    }

    return [state.r, state.g, state.b, alphaEnabled ? state.a : 255]
}

function drawColorPickerChecker(x, y, w, h) {
    var cell = 5
    for (var py = 0; py < h; py += cell) {
        for (var px = 0; px < w; px += cell) {
            var light = ((Math.floor(px / cell) + Math.floor(py / cell)) % 2) == 0
            Render.FilledRect(x + px, y + py, Math.min(cell, w - px), Math.min(cell, h - py), light ? [210,210,210,globals.alpha] : [85,85,85,globals.alpha])
        }
    }
}

function drawColorPickerOverlay(data) {
    if (!data) return

    var popup = data.popup
    var sv = data.sv
    var hue = data.hue
    var alpha = data.alpha
    var state = data.state

    Render.FilledRect(popup.x - 2, popup.y - 2, popup.w + 4, popup.h + 4, [5,5,5,globals.alpha])
    Render.Rect(popup.x - 1, popup.y - 1, popup.w + 2, popup.h + 2, [65,65,65,globals.alpha])
    Render.FilledRect(popup.x, popup.y, popup.w, popup.h, [18,18,18,globals.alpha])

    var pureHue = colorHsvToRgb(state.h, 1, 1)
    Render.FilledRect(sv.x, sv.y, sv.w, sv.h, [pureHue[0],pureHue[1],pureHue[2],globals.alpha])
    Render.GradientRect(sv.x, sv.y, sv.w, sv.h, 1, [255,255,255,globals.alpha], [255,255,255,0])
    Render.GradientRect(sv.x, sv.y, sv.w, sv.h, 0, [0,0,0,0], [0,0,0,globals.alpha])
    Render.Rect(sv.x - 1, sv.y - 1, sv.w + 2, sv.h + 2, [5,5,5,globals.alpha])

    var markerX = Math.floor(sv.x + state.s * sv.w)
    var markerY = Math.floor(sv.y + (1 - state.v) * sv.h)
    Render.Rect(markerX - 3, markerY - 3, 7, 7, [0,0,0,globals.alpha])
    Render.Rect(markerX - 2, markerY - 2, 5, 5, [255,255,255,globals.alpha])

    var hueColors = [
        [255,0,0,globals.alpha], [255,255,0,globals.alpha], [0,255,0,globals.alpha],
        [0,255,255,globals.alpha], [0,0,255,globals.alpha], [255,0,255,globals.alpha], [255,0,0,globals.alpha]
    ]
    for (var i = 0; i < 6; i++) {
        var segmentX = hue.x + Math.floor(i * hue.w / 6)
        var segmentEnd = hue.x + Math.floor((i + 1) * hue.w / 6)
        Render.GradientRect(segmentX, hue.y, segmentEnd - segmentX, hue.h, 1, hueColors[i], hueColors[i + 1])
    }
    Render.Rect(hue.x - 1, hue.y - 1, hue.w + 2, hue.h + 2, [5,5,5,globals.alpha])
    var hueMarker = Math.floor(hue.x + state.h * hue.w)
    Render.Rect(hueMarker - 1, hue.y - 2, 3, hue.h + 4, [255,255,255,globals.alpha])
    Render.Rect(hueMarker, hue.y - 1, 1, hue.h + 2, [0,0,0,globals.alpha])

    if (data.alphaEnabled) {
        drawColorPickerChecker(alpha.x, alpha.y, alpha.w, alpha.h)
        var rgb = colorHsvToRgb(state.h, state.s, state.v)
        Render.GradientRect(alpha.x, alpha.y, alpha.w, alpha.h, 1, [rgb[0],rgb[1],rgb[2],0], [rgb[0],rgb[1],rgb[2],globals.alpha])
        Render.Rect(alpha.x - 1, alpha.y - 1, alpha.w + 2, alpha.h + 2, [5,5,5,globals.alpha])
        var alphaMarker = Math.floor(alpha.x + (state.a / 255) * alpha.w)
        Render.Rect(alphaMarker - 1, alpha.y - 2, 3, alpha.h + 4, [255,255,255,globals.alpha])
        Render.Rect(alphaMarker, alpha.y - 1, 1, alpha.h + 2, [0,0,0,globals.alpha])
    }
}

function endColorPickerFrame() {
    if (coloridactive != -1 && !colorPickerActiveSeen) {
        coloridactive = -1
        colorPickerDragging = null
    }

    drawColorPickerOverlay(colorPickerPendingOverlay)
    var leftDown = Input.IsKeyPressed(0x01) ? true : false
    if (!leftDown) colorPickerConsumesMouse = false
    colorPickerPreviousMouse = leftDown
}

function drawVisuals() {
    var xx = globals.X() + 130
    var yy = globals.Y() + 50
    var tab = "Visual"
    var subtab = "SELF"
    var child = "ESP"
    var _do = function (name) {
        if (checkbox(xx, yy, name, UI.GetValue(tab, subtab, child, name))) UI.SetValue(tab, subtab, child, name, !UI.GetValue(tab, subtab, child, name))
    }
    var _do2 = function (name, min, max, thing, thing2,id,additive) {
        if(!globals.active){
            val[id] = UI.GetValue(tab,subtab,child,name)
            backupval[id] = val[id]
        }
        var clamp = function (val, min, max) {
            if (val > max)
                return max
            if (min > val)
                return min
            return val
        }
        var returnval = sliderFloat(xx, yy, name, min, max, thing, thing2,id,UI.GetValue(tab,subtab,child,name),additive)
        if(globals.active)
            UI.SetValue(tab, subtab, child, name, clamp(returnval, min, max))
    }
    if (globals.alpha != 0) {
        if(visualstab != 3){
        beginChild(1,30,visualstab == 0 || visualstab == 1 ? (visualstab == 1 ? 410 : 400):540,"ESP")
        var chamstab = beginChild(2,30,380,"Chams")
        var custommat = beginChild(2,430,140,"Custom material")
        
        }
        if(visualstab == 0 || visualstab == 1){
            var freecamtab = beginChild(1,430+20 + (visualstab == 0 ? 0 : 10),visualstab == 0 ? 120 : 110,visualstab == 0 ? "Freecam" : "HUD")
        }

        if(visualstab == 3){
            beginChild(1,30,240,"Map")
            var viewchild = beginChild(1,30+240+20,280,"View")
            var enttab = beginChild(2,30,540,"Entities")
        }
        var visTabs = ["Self", "Enemies", "Team", "World"];
        var visOffsets = [10, 55, 125, 180];
        var visWidths = [38, 65, 48, 48];
        for (var i = 0; i < visTabs.length; i++) {
            var isSel = (visualstab == i);
            var vx = globals.X() + 115 + 10 + visOffsets[i];
            var vy = globals.Y() + 53;
            var vCol = isSel ? [239, 239, 239, globals.alpha] : [110, 110, 110, globals.alpha];
            Render.StringCustom(vx, vy - 2, 0, visTabs[i], vCol, globals.verdana8b);
            if (isSel) {
                Render.FilledRect(vx - 2, vy + 14, visWidths[i], 2, [142, 181, 39, globals.alpha]);
            }
            if (!isMenuInputLocked() && Input.IsKeyPressed(0x01) && cursorBetween(vx - 5, vy - 5, visWidths[i] + 5, 25)) {
                visualstab = i;
            }
        }
    }
   
    var _docolor = function(uicol,alpha,name,id){
        return gameSenseColorPicker(xx, yy, spacingBetweenCheckboxes, uicol, alpha, id)
    }
    
    var backupactive = globals.active
    globals.active = globals.alpha != 0
    yy += 30
    if(visualstab == 0){
        child = "Chams"
        if(chamstab){
            var backup = xx
            xx = chamstab[0]
            yy = chamstab[1]
            spacingBetweenCheckboxes = 0
            spacingBetweenCheckboxes+=40
            var negate = 0
            var _docolor3 = function(name,name2,id){
                var color = UI.GetColor(tab,subtab,child,name)
                color[3] = ((100-UI.GetValue(tab,subtab,child,name2))/100)*255
                var col = _docolor(color,true,name,id)
                if(globals.active && col){
                    UI.SetColor(tab,subtab,child,name,[col[0],col[1],col[2],255])
                    UI.SetValue(tab,subtab,child,name2,((255-col[3])/255)*100)
                }
            }
            var _docolor4 = function(name,id){
                yy+=20
                var col = _docolor(UI.GetColor(tab,subtab,child,name),false,name,id)
                yy-=20
                if(globals.active && col)
                    UI.SetColor(tab,subtab,child,name, col)
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 0){
                _do("Visible override")
                _docolor3("Visible Color","Visible transparency",272)
                if(UI.GetValue(tab,subtab,child,"Visible type") == 5){
                    _docolor4("Visible Color (secondary)",344)
                }
                _do2("Scope blend",0,100,false,0,271)
                negate = 133
                beginComboBox(xx,yy,"Visible type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Visible type"),61)
                var returnval = endComboBox(61)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Visible type",returnval)
                }
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 1){
                _do("Attachment override")
                _docolor3("Attachment Color","Attachment transparency",276)
                if(UI.GetValue(tab,subtab,child,"Attachment type") == 5){
                    _docolor4("Attachment Color (secondary)",340)
                }
                beginComboBox(xx,yy,"Attachment type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Attachment type"),62)
                var returnval = endComboBox(62)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Attachment type",returnval)
                }
                negate = 100
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 2){
                _do("Desync override")
                _docolor3("Desync Color","Desync transparency",280)
                if(UI.GetValue(tab,subtab,child,"Desync type") == 5){
                    _docolor4("Desync Color (secondary)",336)
                }
                spacingBetweenCheckboxes+=40
                _do("Layered")
                beginComboBox(xx,yy-60,"Desync type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Desync type"),63)
                var returnval = endComboBox(63)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child, "Desync type",returnval)
                }
                
                negate = 160
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 3){
                _do("Fakelag override")
                _docolor3("Fakelag Color","Fakelag transparency",284)
                if(UI.GetValue(tab,subtab,child,"Fakelag type") == 5){
                    _docolor4("Fakelag Color (secondary)",332)
                }
                beginComboBox(xx,yy,"Fakelag type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Fakelag type"),64)
                var returnval = endComboBox(64)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child, "Fakelag type",returnval)
                }
                negate = 100
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 4){
                _do("Arms override")
                _docolor3("Arms Color", "Arms transparency",288)
                if(UI.GetValue(tab,subtab,child,"Arms type") == 5){
                    _docolor4("Arms Color (secondary)",328)
                }
                spacingBetweenCheckboxes+=40
                _do("Health based color")
                _do("No sleeve")
                beginComboBox(xx,yy-80,"Arms type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Arms type"),65)
                var returnval = endComboBox(65)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child, "Arms type",returnval)
                }
                negate = 180
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 5){
                _do("Weapon override")
                _docolor3("Weapon Color","Weapon transparency",292)
                if(UI.GetValue(tab,subtab,child,"Weapon type") == 5){
                    _docolor4("Weapon Color (secondary)",324)
                }
                beginComboBox(xx,yy,"Weapon type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Weapon type"),66)
                var returnval = endComboBox(66)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child, "Weapon type",returnval)
                }
                negate = 100
            }
            beginComboBox(xx,yy-negate,"Type",["Visible","Attachments","Desync","Fakelag","Arms","Weapon"],UI.GetValue(tab,subtab,child,"Configure"),60)
            var returnval = endComboBox(60)
            if(globals.active && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,child,"Configure",returnval)
            xx = backup
            spacingBetweenCheckboxes = 0
            yy+=30
        }
        subtab = "SELF"
        child = "ESP"
        _do("Box")
        var col = _docolor(UI.GetColor(tab,subtab,child,"Box"),false,"Box",117)
        if(globals.alpha != 0 && col)
            UI.SetColor(tab,subtab,child,"Box",col)
        _do("Glow")
        col = _docolor(UI.GetColor(tab,subtab,child,"Glow"),true,"Glow",121)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Glow",col)
        _do("Name")
        col = _docolor(UI.GetColor(tab,subtab,child,"Name"),false,"Name",125)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Name",col)
        _do("Health")
        _do("Health color override")
        col = _docolor(UI.GetColor(tab,subtab,child,"Health color override"),false,"Health color override",129)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Health color override",col)
        spacingBetweenCheckboxes+=40
        _do("Ammo")
        col = _docolor(UI.GetColor(tab,subtab,child,"Ammo"),false,"Ammo",133)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Ammo",col)
        spacingBetweenCheckboxes+=40
        _do("Shot timer")
        col = _docolor(UI.GetColor(tab,subtab,child,"Shot timer"),false,"Shot timer",137)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Shot timer",col)
        
        _do("Taser range")
        col = _docolor(UI.GetColor(tab,subtab,child,"Taser range"),true,"Taser range",141)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Taser range",col)
        _do("Knife range")
        col = _docolor(UI.GetColor(tab,subtab,child,"Knife range"),true,"Knife range",145)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Knife range",col)
        _do("Weapon spread")
        col = _docolor(UI.GetColor(tab,subtab,child,"Weapon spread"),true,"Weapon spread",149)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Weapon spread",col)
        _do("Weapon recoil")
        _do("Force crosshair")
        _do("Hold firing animation")
        spacingBetweenCheckboxes += 88
        
        beginMultiComboBox(xx,yy-270,"Flags",["Lag compensation","Money","Armor","Flash","Reloading","Scoping","Defusing","Location","Bomb carrier"],UI.GetValue(tab,subtab,child,"Flags"),11)
        var returnval = endComboBox(11)
        if(globals.active && returnval+ "" != "undefined"){
            UI.SetValue(tab,subtab,child,"Flags",returnval)
        }
        beginMultiComboBox(xx,yy-370,"Weapon",["Icon","Name","Inventory"],UI.GetValue(tab,subtab,child,"Weapon"),10)
        returnval = endComboBox(10)
        if(globals.active&& returnval+ "" != "undefined"){
            UI.SetValue(tab,subtab,child,"Weapon",returnval)
        }
        child = "Freecam"
        if(freecamtab){
        yy = freecamtab[1]
        spacingBetweenCheckboxes =0
        _do("Enable")
        _do("Collision")
        _do2("Speed",100,1000,true,2,237)
        }
        
    }
    if(visualstab == 1){
        child = "Chams"
        subtab = "ENEMIES"
        if(chamstab){
            var backup = xx
            xx = chamstab[0]
            yy = chamstab[1]
            spacingBetweenCheckboxes = 0
            spacingBetweenCheckboxes+=40
            var negate = 0
            var _docolor3 = function(name,name2,id){
                var color = UI.GetColor(tab,subtab,child,name)
                color[3] = ((100-UI.GetValue(tab,subtab,child,name2))/100)*255
                var col = _docolor(color,true,name,id)
                if(globals.active && col){
                    UI.SetColor(tab,subtab,child,name,[col[0],col[1],col[2],255])
                    UI.SetValue(tab,subtab,child,name2,((255-col[3])/255)*100)
                }
            }
            var _docolor4 = function(name,id){
                yy+=20
                var col = _docolor(UI.GetColor(tab,subtab,child,name),false,name,id)
                yy-=20
                if(globals.active && col)
                    UI.SetColor(tab,subtab,child,name, col)
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 0){
                _do("Visible override")
                _docolor3("Visible Color","Visible transparency",324)
                if(UI.GetValue(tab,subtab,child,"Visible type") == 5){
                    _docolor4("Visible Color (secondary)",328)
                }
                negate += 100
                beginComboBox(xx,yy,"Visible type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Visible type"),67)
                var returnval = endComboBox(67)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Visible type",returnval)
                }
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 1){
                _do("Hidden override")
                _docolor3("Hidden Color","Hidden transparency",332)
                if(UI.GetValue(tab,subtab,child,"Hidden type") == 5){
                    _docolor4("Hidden Color (secondary)",336)
                }
                negate += 100
                beginComboBox(xx,yy,"Hidden type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Visible type"),68)
                var returnval = endComboBox(68)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Hidden type",returnval)
                }
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 2){
                _do("Attachment override")
                _docolor3("Attachment Color","Attachment transparency",340)
                if(UI.GetValue(tab,subtab,child,"Attachment type") == 5){
                    _docolor4("Attachment Color (secondary)",344)
                }
                beginComboBox(xx,yy,"Attachment type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Attachment type"),69)
                var returnval = endComboBox(69)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Attachment type",returnval)
                }
                negate += 100
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 3){
                _do("History override")
                _docolor3("History Color","History transparency",348)
                if(UI.GetValue(tab,subtab,child,"History type") == 5){
                    _docolor4("History Color (secondary)",352)
                }
                beginComboBox(xx,yy,"History type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"History type"),70)
                var returnval = endComboBox(70)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child, "History type",returnval)
                }
                negate += 100
            }
            
            beginComboBox(xx,yy-negate,"Type",["Visible","XQZ","Attachments","History"],UI.GetValue(tab,subtab,child,"Configure"),73)
            var returnval = endComboBox(73)
            if(globals.active && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,child,"Configure",returnval)
            xx = backup
            spacingBetweenCheckboxes = 0
            yy+=30
        }
        child = "ESP"
        _do("Box")
        var col = _docolor(UI.GetColor(tab,subtab,child,"Box"),false,"Box",153)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Box",col)
        _do("Glow")
        col = _docolor(UI.GetColor(tab,subtab,child,"Glow"),true,"Glow",157)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Glow",col)
        _do("Name")
        col = _docolor(UI.GetColor(tab,subtab,child,"Name"),false,"Name",161)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Name",col)
        _do("Health")
        _do("Health color override")
        col = _docolor(UI.GetColor(tab,subtab,child,"Health color override"),false,"Health color override",165)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Health color override",col)
        _do("Dormant")

        spacingBetweenCheckboxes += 40
        _do("Ammo")
        col = _docolor(UI.GetColor(tab,subtab,child,"Ammo"),false,"Ammo",169)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Ammo",col)
        spacingBetweenCheckboxes += 40
        _do("Skeleton")
        col = _docolor(UI.GetColor(tab,subtab,child,"Skeleton"),false,"Skeleton",173)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Skeleton",col)
        
        _do("Hitmarker")
        spacingBetweenCheckboxes+=80
        _do("F12 sound (microphone)")
        
        
        //spacingBetweenCheckboxes+=40
        beginMultiComboBox(xx,yy-240,"Weapon",["Icon","Name","Inventory"],UI.GetValue(tab,subtab,child,"Weapon"),2)
        returnval = endComboBox(2)
        if(globals.active && returnval + "" != "undefined"){
            UI.SetValue(tab,subtab,child,"Weapon",returnval)
        }spacingBetweenCheckboxes -= 40
        if(freecamtab){
            yy = freecamtab[1]
            spacingBetweenCheckboxes = 0
            child = "HUD"
            _do("Radar reveal")
            _do("Out of fov")
            var col = _docolor(UI.GetColor(tab,subtab,child,"Out of fov"),true,"Out of fov",238)
            if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Out of fov",col)
            if(UI.GetValue(tab,subtab,child,"Out of fov"))
            _do("Flat arrows")
            _do("Footsteps")
            col = _docolor(UI.GetColor(tab,subtab,child,"Footsteps"),false,"Footsteps",242)
            if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Footsteps",col)
            child = "ESP"
            beginMultiComboBox(xx,yy-300,"Flags",["Lag comp","Money","Armor","Flash","Reloading","Scoping","Defusing","Location","Bomb carrier","Fake duck", "Body damage","Shot","LBY Timer"],UI.GetValue(tab,subtab,child,"Flags"),3)
            returnval = endComboBox(3)
            if(globals.active && returnval + "" != "undefined"){
                UI.SetValue(tab,subtab,child,"Flags",returnval)
            }
            beginComboBox(xx,yy-220,"Killsound",["None","Arena switch","Headshot","Hit","Custom"],UI.GetValue(tab,subtab,"ESP","Killsound"),700)
            returnval = endComboBox(699)
            if(globals.active && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,"ESP","Killsound",returnval)
            beginComboBox(xx,yy-300,"Hitsound",["None","Arena switch","Headshot","Hit","Custom"],UI.GetValue(tab,subtab,"ESP","Hitsound"),699)
            returnval = endComboBox(699)
            if(globals.active && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,"ESP","Hitsound",returnval)
        }
    }
    if(visualstab == 2){
        subtab = "FRIENDLIES"
        child = "Chams"
        if(chamstab){
            var backup = xx
            xx = chamstab[0]
            yy = chamstab[1]
            spacingBetweenCheckboxes = 0
            spacingBetweenCheckboxes+=40
            var negate = 0
            var _docolor3 = function(name,name2,id){
                var color = UI.GetColor(tab,subtab,child,name)
                color[3] = ((100-UI.GetValue(tab,subtab,child,name2))/100)*255
                var col = _docolor(color,true,name,id)
                if(globals.active && col){
                    UI.SetColor(tab,subtab,child,name,[col[0],col[1],col[2],255])
                    UI.SetValue(tab,subtab,child,name2,((255-col[3])/255)*100)
                }
            }
            var _docolor4 = function(name,id){
                yy+=20
                var col = _docolor(UI.GetColor(tab,subtab,child,name),false,name,id)
                yy-=20
                if(globals.active && col)
                    UI.SetColor(tab,subtab,child,name, col)
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 0){
                _do("Visible override")
                _docolor3("Visible Color","Visible transparency",356)
                if(UI.GetValue(tab,subtab,child,"Visible type") == 5){
                    _docolor4("Visible Color (secondary)",360)
                }
                negate += 100
                beginComboBox(xx,yy,"Visible type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Visible type"),74)
                var returnval = endComboBox(74)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Visible type",returnval)
                }
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 1){
                _do("Hidden override")
                _docolor3("Hidden Color","Hidden transparency",364)
                if(UI.GetValue(tab,subtab,child,"Hidden type") == 5){
                    _docolor4("Hidden Color (secondary)",368)
                }
                negate += 100
                beginComboBox(xx,yy,"Hidden type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Visible type"),75)
                var returnval = endComboBox(75)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Hidden type",returnval)
                }
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 2){
                _do("Attachment override")
                _docolor3("Attachment Color","Attachment transparency",376)
                if(UI.GetValue(tab,subtab,child,"Attachment type") == 5){
                    _docolor4("Attachment Color (secondary)",372)
                }
                beginComboBox(xx,yy,"Attachment type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Attachment type"),76)
                var returnval = endComboBox(76)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Attachment type",returnval)
                }
                negate += 100
            }
            
            beginComboBox(xx,yy-negate,"Type",["Visible","XQZ","Attachments"],UI.GetValue(tab,subtab,child,"Configure"),77)
            var returnval = endComboBox(77)
            if(globals.active && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,child,"Configure",returnval)
            xx = backup
            spacingBetweenCheckboxes = 0
            yy+=30
        }
        
        child = "ESP"
        _do("Box")
        var col = _docolor(UI.GetColor(tab,subtab,child,"Box"),false,"Box",177)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Box",col)
        _do("Glow")
        col = _docolor(UI.GetColor(tab,subtab,child,"Glow"),true,"Glow",181)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Glow",col)
        _do("Name")
        col = _docolor(UI.GetColor(tab,subtab,child,"Name"),false,"Name",185)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Name",col)
        _do("Health")
        _do("Health color override")
        col = _docolor(UI.GetColor(tab,subtab,child,"Health color override"),false,"Health color override",189)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Health color override",col)
            spacingBetweenCheckboxes+=40
        _do("Ammo")
        col = _docolor(UI.GetColor(tab,subtab,child,"Ammo"),false,"Ammo",193)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Ammo",col)
            spacingBetweenCheckboxes+=40
        _do("Skeleton")
        col = _docolor(UI.GetColor(tab,subtab,child,"Skeleton"),false,"Skeleton",197)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Skeleton",col)
            beginMultiComboBox(xx,yy-62,"Flags",["Lag compensation","Money","Armor","Flash","Reloading","Scoping","Defusing","Location","Bomb carrier"],UI.GetValue(tab,subtab,child,"Flags"),11)
        var returnval = endComboBox(11)
        if(globals.active && returnval+ "" != "undefined"){
            UI.SetValue(tab,subtab,child,"Flags",returnval)
        }
        beginMultiComboBox(xx,yy-162,"Weapon",["Icon","Name","Inventory"],UI.GetValue(tab,subtab,child,"Weapon"),10)
        returnval = endComboBox(10)
        if(globals.active&& returnval+ "" != "undefined"){
            UI.SetValue(tab,subtab,child,"Weapon",returnval)
        }
    }
    if(visualstab != 3){
        child = "Custom material"
        xx = globals.X() + 130 + 130 + 125
        spacingBetweenCheckboxes = 0
        if(custommat){
        yy = custommat[1]
        _do2("Reflectivity",0,100,false,0,51)
        _do2("Pearlescent",0,100,false,0,52)
        _do2("Phong",0,100,false,0,53)
        }
    }
    if(visualstab == 3){
        subtab = "WORLD"
        child = "Map"
        _do("Fullbright")
        _do2("Nightmode",0,1,false,2,48)
        _do2("Wall transparency",0,1,false,2,49)
        _do2("Prop transparency",0,1,false,2,50)
        if(viewchild){
            child = "View"
            yy = viewchild[1]-120
            _do2("Field of view",50,150,true,0,201)
            _do("FOV while scoped")
            _do2("Zoom",0,1,false,2,202)
            _do2("Thirdperson",100,300,true,0,203)
            _do("Spectator third person")
            _do("First person with grenade")
            beginComboBox(xx,yy-260,"Skybox",["Off","Daylight","Sunny","Overcast","Clear blue","Dawn","Cloudy","Night cloudy", "Night purple","Night dark","Mountains","Jungle","Custom"],UI.GetValue(tab,subtab,"Map","Skybox"),701)
            var returnval = endComboBox(701)
            if(globals.active && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,"Map","Skybox",returnval)
        }
        if(enttab){
            child = "Entities"
            spacingBetweenCheckboxes = 280
            //204
            xx = enttab[0]
            yy = enttab[1]-280
            spacingBetweenCheckboxes+=200
            _do("Bullet impacts (client)")
            var col = _docolor(UI.GetColor(tab,subtab,child,"Bullet impacts (client)"),true,"Bullet impacts (client)",204)
            if(globals.active && col)
                UI.SetColor(tab,subtab,child,"Bullet impacts (client)",col)
            _do("Bullet impacts (server)")
            col = _docolor(UI.GetColor(tab,subtab,child,"Bullet impacts (server)"),true,"Bullet impacts (server)",208)
            if(globals.active && col)
                UI.SetColor(tab,subtab,child,"Bullet impacts (server)",col)
            _do("Bullet tracers")
            col = _docolor(UI.GetColor(tab,subtab,child,"Bullet tracers"),true,"Bullet tracers",212)
            if(globals.active && col)
                UI.SetColor(tab,subtab,child,"Bullet tracers",col)
            _do("Grenade prediction")
            col = _docolor(UI.GetColor(tab,subtab,child,"Grenade prediction"),true,"Grenade prediction",370)
            if(globals.active && col)
                UI.SetColor(tab,subtab,child,"Grenade prediction", col)
            _do("Penetration dot")
            _do("Penetration crosshair")
            var _do6 = function(alpha,name,id,yyy){
                var uicol = UI.GetColor(tab,subtab,child,name)
                var backup = yy
                yy -= yyy
                var returnval = _docolor(uicol,alpha,name,id)
                yy = backup
                if(globals.alpha!=0&&returnval){
                    UI.SetColor(name,subtab,child,name,returnval)
                }
            }
            var _do5 = function(y,name,contents,id){
                beginMultiComboBox(xx,yy-y,name,contents,UI.GetValue(tab,subtab,child,name),id)
                var returnval = endComboBox(id)
                if(globals.active && returnval+ "" != "undefined")
                    UI.SetValue(tab,subtab,child,name,returnval)
            }
            _do5(160,"Removals",["Smoke","Flash","Scope","Visual kick","Visual punch","Scope time","Landing bob"],16)
            _do5(240,"Weapons",["Text","Glow","Icon","Ammo","Distance"],15)
            _do6(false,"Weapons", 224,242)
            _do5(320,"Grenades",["Text","Glow","Icon","Timer"],14)
            _do6(false,"Grenades",228,322)
            _do5(400,"Hostage",["Text","Circle"],13)
            _do6(false,"Hostage",232,402)
            _do5(480,"Bomb",["Text","Glow","Icon","Timer"],12)
            _do6(false,"Bomb",236,482)
            
            
            
        }
    }
    globals.active = backupactive
}
function drawMisc() {
    var a = beginChild(1,30,330,"General")
    var xx = a[0]
    var yy = a[1]
    var tab = "Misc"
    var subtab = "GENERAL"
    var child = "Matchmaking"
    var _do = function (name) {
        if (checkbox(xx, yy, name, UI.GetValue(tab, subtab, child, name))) UI.SetValue(tab, subtab, child, name, !UI.GetValue(tab, subtab, child, name))
    }
    var _do2 = function (name, min, max, thing, thing2,id) {
        if(!globals.active){
            val[id] = UI.GetValue(tab,subtab,child,name)
            backupval[id] = val[id]
        }
        var clamp = function (val, min, max) {
            if (val > max)
                return max
            if (min > val)
                return min
            return val
        }
        var returnval = sliderFloat(xx, yy, name, min, max, thing, thing2,id,UI.GetValue(tab,subtab,child,name))
        if(globals.active)
            UI.SetValue(tab, subtab, child, name, clamp(returnval, min, max))
    }
    var _docolor = function(uicol,alpha,name,id){
        return gameSenseColorPicker(xx, yy, spacingBetweenCheckboxes, uicol, alpha, id)
    }
    
    _do("Auto accept")
    _do("Rank revealer")
    _do("Unlock inventory access")
    _do("Bypass sv_pure")
    child = "Miscellaneous"
    _do("Force sv_cheats")
    _do("Hidden cvars")
    _do("Auto defuse")
    _do("Ragdoll gravity")
    _do("Ragdoll force")
    _do("Preserve killfeed")
    _do("Extended backtracking")
    _do("Auto fire")
    _do2("Delay",0,0.3,false,2,9999)
    a = beginChild(2,30,240,"Movement")
    xx = a[0]
    yy = a[1]
    child = "Movement"
    _do("Auto bunnyhop")
    _do("Slide walk")
    _do("Accurate walk")
    _do("Fast stop")
    _do("Fast crouch")
    _do("Crouch in air")
    _do("Strafe assistance")
    _do("Edge jump")
    _do("Auto peek")
    var backup = [yy,spacingBetweenCheckboxes]
    subtab = "PERFORMANCE & INFORMATION"
    child = "Performance"
    a = beginChild(2,290,130,"Performance")
    yy = a[1]
    _do("Disable post processing")
    _do("Disable fog")
    _do("Disable shadows")
    _do("Disable blood")
    _do("Disable teammate rendering")
    beginComboBox(xx,backup[0]+backup[1]-100,"Auto strafe",["None","Legit","Normal","Directional","Rage"],UI.GetValue(tab,"GENERAL","Movement","Auto strafe"),702)
    var returnval = endComboBox(702)
    if(globals.active && returnval + "" != "undefined")
    UI.SetValue(tab,"GENERAL","Movement","Auto strafe",returnval)
    a = beginChild(1,380,190,"Information")
    xx = a[0]
    yy = a[1]
    child = "Information"
    _do("Watermark")
    _do("Spectator list")
    _do("Team damage list")
    _do("Show keybind states")
    beginComboBox(xx,yy-160,"Clantag",["None","onetap","Custom","Backwards"],UI.GetValue(tab,"GENERAL","Miscellaneous","Clantag"),698)
    var returnval = endComboBox(698)
    if(globals.alpha && returnval + "" != "undefined"){
        UI.SetValue(tab,"GENERAL","Miscellaneous","Clantag",returnval)
    }
    spacingBetweenCheckboxes-=40
    beginMultiComboBox(xx,yy+40,"Log events",["Damage dealt","Damage received","Damage rejected","Spread misses","Occlusion misses","Hostage taken","Bomb plants","Weapon purchases","Grenade purchases"],UI.GetValue(tab,subtab,child,"Log events"),9)
    returnval = endComboBox(9)
    if(globals.alpha && returnval + "" != "undefined"){
        UI.SetValue(tab,subtab,child,"Log events",returnval)
    }
    beginMultiComboBox(xx,yy-40,"Log output",["Event log","Console"],UI.GetValue(tab,subtab,child,"Log output"),8)
    returnval = endComboBox(8)
    if(globals.alpha != 0 && returnval + "" != "undefined")
        UI.SetValue(tab,subtab,child,"Log output",returnval)
    a = beginChild(2,440,130,"Sound")
    yy+=117
    var col = _docolor(UI.GetColor(tab,subtab,child,"Log output"),false,"Log output",360)

    if(globals.alpha != 0 && col)
    UI.SetColor(tab,subtab,child,"Log output",col)
    yy = a[1]
    xx = a[0]
    
    child = "Sound"
    _do2("Weapon volume",0,100,false,0,54)
    _do2("Footstep volume",0,100,false,0,55)
    _do2("Other sound volume",0,100,false,0,56)
}
function drawSkins() {
    
    var a = beginChild(1,30,540,"Viewmodel")
    var xx = a[0]
    var yy = a[1]
    var child = "Viewmodel"
    var tab = "Misc"
    var subtab = "SKINS"
    var _do = function (name) {
        if (checkbox(xx, yy, name, UI.GetValue(tab, subtab, child, name))) UI.SetValue(tab, subtab, child, name, !UI.GetValue(tab, subtab, child, name))
    }
    var _do3 = function (name, min, max, thing,thing2,id) {
        if(!globals.active){
            val[id] = UI.GetValue(tab,subtab,child,name)
            backupval[id] = val[id]
        }
        var returnval = sliderFloat(xx, yy, name, min, max, thing,thing2,id,UI.GetValue(tab,subtab,child,name))
        if(globals.active){
            UI.SetValue(tab, subtab, child, name, returnval)
        }
    }
    var _do5 = function(y,name,contents,id){
        beginMultiComboBox(xx,yy-y,name,contents,UI.GetValue(tab,subtab,child,name),id)
        var returnval = endComboBox(id)
        if(globals.alpha != 0 && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,child,name,returnval)
    }
    _do("Flip knife hand")
    _do("Visualize silent angles")
    _do3("FOV",-40,40,true,2,400)
    _do3("X offset",-40,40,true,2,401)
    _do3("Y offset",-40,40,true,2,402)
    _do3("Z offset",-40,40,true,2,403)
    _do3("Roll",-40,40,true,2,404)
    _do5(0,"Force rare animations",["Desert Eagle flip","Falchion knife","Revolver flip"], 100)
    a = beginChild(2,30,540,"Extra")
    xx = a[0]
    yy = a[1]
    tab = "Misc"
    subtab = "GENERAL"
    child = "Buybot"
    _do("Enable")
    beginMultiComboBox(xx,yy+80,"Utility",["Helmet","Kevlar","HE Grenade","Molotov","Smoke grenade","Flashbang","Decoy grenade","Taser","Defuse kit"],UI.GetValue(tab,subtab,child,"Utility"),120)
    var returnval = endComboBox(695)
    if(globals.active && returnval + "" != "undefined")
    UI.SetValue(tab,subtab,child,"Utility",returnval)
    beginComboBox(xx,yy,"Secondary",["None","Tec-9/Five Seven","Dual Berettas","DEagle/Revolver","Glock/USP","P250"],UI.GetValue(tab,subtab,child,"Secondary"),696)
    returnval = endComboBox(696)
    if(globals.active && returnval + "" != "undefined")
    UI.SetValue(tab,subtab,child,"Secondary",returnval)
    beginComboBox(xx,yy-80,"Primary",["None","AK47/M4A4","AWP","GALIL/FAMAS","G3SG1/SCAR20","Scout","SG553/AUG","Max10/MP9","MP5/MP7","P90","PP-Bizon","UMP","M249","Nova","Negev","Sawed off/MAG7","XM1014"],UI.GetValue(tab,subtab,child,"Primary"),697)
    returnval = endComboBox(697)
    if(globals.active && returnval + "" != "undefined")
    UI.SetValue(tab,subtab,child,"Primary",returnval)
}
var target = []
var playerListMouseLatch = false
var voteButtonMouseLatch = false

function isSafeEntity(index) {
    if (!index) return false
    try {
        return Entity.IsValid(index) ? true : false
    } catch (e) {
        return false
    }
}

function getSafeEntityName(index) {
    if (!isSafeEntity(index)) return "Unknown"
    try {
        var name = Entity.GetName(index)
        if (name !== undefined && name !== null) return name + ""
    } catch (e) {
    }
    return "Unknown"
}

function getSafeEntityProp(index, table, prop, fallback) {
    if (!isSafeEntity(index)) return fallback
    try {
        var value = Entity.GetProp(index, table, prop)
        if (value !== undefined && value !== null) return value
    } catch (e) {
    }
    return fallback
}

function getSafeVectorProp(index, table, prop) {
    var value = getSafeEntityProp(index, table, prop, null)
    if (value && value.length >= 2) {
        return [
            typeof value[0] == "number" ? value[0] : 0,
            typeof value[1] == "number" ? value[1] : 0,
            typeof value[2] == "number" ? value[2] : 0
        ]
    }
    return [0, 0, 0]
}

function getEntityUserID(index) {
    if (!isSafeEntity(index)) return 0

    // The original code used an unbounded loop whose exit condition became
    // impossible during a side swap. Keep the lookup finite and run it only
    // when the user explicitly selects a player.
    for (var userid = 1; userid <= 4096; userid++) {
        try {
            if (Entity.GetEntityFromUserID(userid) == index)
                return userid
        } catch (e) {
            return 0
        }
    }
    return 0
}

function drawPlayerlist() {
    var a = beginChild(1,30,540,"Players")
    var xx = a[0]
    var yy = a[1]

    Render.Rect(xx-1,yy-1,202,502,[5,5,5,globals.alpha])
    Render.Rect(xx,yy,200,500,[65,65,65,globals.alpha])
    Render.FilledRect(xx + 1, yy+1, 198, 498, [35,35,35,globals.alpha])

    var ents = []
    try {
        var currentPlayers = Entity.GetPlayers()
        if (currentPlayers && typeof currentPlayers.length == "number")
            ents = currentPlayers
    } catch (e) {
        ents = []
    }

    var filteredents = []
    for (var i = 0; i < ents.length; i++) {
        var ent = ents[i]
        if (!isSafeEntity(ent)) continue

        var isBot = false
        try {
            isBot = Entity.IsBot(ent) ? true : false
        } catch (e) {
            isBot = false
        }
        if (!isBot) filteredents.push(ent)
    }

    // Entity indexes can be recycled during team changes. Never retain a
    // target that is no longer in the current player array.
    var targetPresent = false
    if (target[0] && isSafeEntity(target[0])) {
        for (var t = 0; t < filteredents.length; t++) {
            if (filteredents[t] == target[0]) {
                targetPresent = true
                break
            }
        }
    }
    if (!targetPresent) target = []

    var mouseDown = Input.IsKeyPressed(0x01)
    if (!mouseDown) playerListMouseLatch = false

    var visiblePlayers = Math.min(filteredents.length, 22)
    for (var row = 0; row < visiblePlayers; row++) {
        var player = filteredents[row]
        var name = getSafeEntityName(player)

        try {
            if (Entity.IsLocalPlayer(player)) name += " (YOU)"
            else if (Entity.IsTeammate(player)) name += " (ALLY)"
            else if (Entity.IsEnemy(player)) name += " (ENEMY)"
        } catch (e) {
        }

        var shortened = false
        while(name.length > 0 && Render.TextSizeCustom(name, globals.verdana8)[0] > 180){
            name = name.substring(0, name.length - 1)
            shortened = true
        }
        if(shortened) name += "..."

        var rowY = yy + 1 + row * 22
        var hovered = cursorBetween(xx + 1, rowY, 198, 22)
        if(hovered)
            Render.FilledRect(xx + 1, rowY, 198, 22, [25,25,25,globals.alpha])

        Render.StringCustom(xx + 7, yy + 5 + row * 22, 0, name, [200,200,200,globals.alpha], globals.verdana8)

        if(UI.IsMenuOpen() && !isMenuInputLocked() && hovered && mouseDown && !playerListMouseLatch){
            target = [player, getEntityUserID(player)]
            playerListMouseLatch = true
        }
    }

    a = beginChild(2,30,410/2,"Info")
    xx = a[0]
    yy = a[1]

    if(target[0] && isSafeEntity(target[0])){
        var _text = function(text){
            Render.StringCustom(xx, yy + spacingBetweenCheckboxes, 0, text, [200,200,200,globals.alpha], globals.verdana8)
            spacingBetweenCheckboxes += 20
        }

        _text("Name: " + getSafeEntityName(target[0]))
        _text("UserID: " + (target[1] > 0 ? target[1] : "Unknown"))
        _text("Index: " + target[0])

        var origin = getSafeVectorProp(target[0], "DT_BasePlayer", "m_vecOrigin")
        _text("Origin: " + Math.floor(origin[0]) + ", " + Math.floor(origin[1]) + ", " + Math.floor(origin[2]))

        var angles = getSafeVectorProp(target[0], "DT_CSPlayer", "m_angEyeAngles")
        _text("Angles: " + Math.floor(angles[0]) + ", " + Math.floor(angles[1]) + ", " + Math.floor(angles[2]))

        var velocity = getSafeVectorProp(target[0], "DT_BasePlayer", "m_vecVelocity[0]")
        _text("Velocity: " + Math.floor(velocity[0]) + ", " + Math.floor(velocity[1]) + ", " + Math.floor(velocity[2]))
        var velocityLength = Math.floor(Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1] + velocity[2] * velocity[2]))
        _text("Velocity length: " + velocityLength)

        var health = getSafeEntityProp(target[0], "DT_BasePlayer", "m_iHealth", 0)
        _text("Health: " + health)
        var location = getSafeEntityProp(target[0], "DT_BasePlayer", "m_szLastPlaceName", "Unknown")
        _text("Location: " + location)
    }

    a = beginChild(2,50+(410/2),315,"Features")
    xx = a[0]
    yy = a[1]

    if (!Input.IsKeyPressed(0x01)) voteButtonMouseLatch = false
    if(target[0] && isSafeEntity(target[0])){
        var buttonHovered = cursorBetween(xx, yy, 70, 20)
        Render.Rect(xx-2, yy-2, 74, 24, [5,5,5,globals.alpha])
        Render.Rect(xx-1, yy-1, 72, 22, [65,65,65,globals.alpha])
        Render.FilledRect(xx, yy, 70, 20, buttonHovered ? [35,35,35,globals.alpha] : [30,30,30,globals.alpha])
        Render.StringCustom(xx+7, yy+2, 0, "Vote kick", [200,200,200,globals.alpha], globals.verdana8)

        if(UI.IsMenuOpen() && !isMenuInputLocked() && buttonHovered && Input.IsKeyPressed(0x01) && !voteButtonMouseLatch){
            voteButtonMouseLatch = true
            if(target[1] > 0)
                Cheat.ExecuteCommand("callvote kick " + target[1])
        }
    }
}
function drawContent() {
    if (globals.unloading) return;
    resetSpacing()
    initFontsAndTextures()
    beginColorPickerFrame()
    beginKeybindFrame()
    if(globals.alpha == 0) {
        endColorPickerFrame()
        endKeybindFrame()
        return
    }
    if (globals.tab == 1) drawRage()
    if (globals.tab == 2) drawAA()
    if (globals.tab == 3) drawLegit()
    if (globals.tab == 4) drawVisuals()
    if (globals.tab == 5) drawMisc()
    if (globals.tab == 6) drawSkins()
    if (globals.tab == 7) drawPlayerlist()
    endColorPickerFrame()
    endKeybindFrame()
}
var _movemenu = false
var waitforup = false
var offsetx = 0
var offsety = 0
function checkMovement() {
    if (globals.unloading) return;
   
    var cursor = Input.GetCursorPosition()
    var onmenu = cursorBetween(globals.X(), globals.Y(), 630, 32) || cursorBetween(globals.X(), globals.Y() + 570, 630, 30) || cursorBetween(globals.X() + 87, globals.Y(), 30, 600) || cursorBetween(globals.X()+600, globals.Y(), 30, 600)
    if (UI.IsMenuOpen()) {
        if (!isMenuInputLocked() && Input.IsKeyPressed(0x01) && !waitforup && onmenu && globals.active) {
            _movemenu = true
            offsetx = cursor[0] - globals.X()
            offsety = cursor[1] - globals.Y()
            waitforup = true
        }
        if (!Input.IsKeyPressed(0x01)) {
            _movemenu = false
            waitforup = false
        }
        if (_movemenu) {
            UI.SetValue("Script Items","X",cursor[0]-offsetx)
            UI.SetValue("Script Items","Y",cursor[1]-offsety)
        }
    }
    globals.active = cursorBetween(globals.X(),globals.Y(),630,600)
    globals.active = coloridactive == -1 ? globals.active : false
    
}
function main() {
    initialize()
    Cheat.RegisterCallback("Unload", "onUnload")
    Cheat.RegisterCallback("Draw","drawBasic")
    Cheat.RegisterCallback("Draw","drawTabs")
    Cheat.RegisterCallback("CreateMove","onCreateMove")
    Cheat.RegisterCallback("Draw", "drawContent")
    Cheat.RegisterCallback("Draw","checkMovement")
}main()
// 2/1/2020 or for amerifats 1/2/2020
// published by VexatiousCheff on onetap forum
