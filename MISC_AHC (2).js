/* Global Variables */
var local = Entity.GetLocalPlayer();
var targetIndex = -1;
var target = -1;
var distance;
var rageTarget = 0;
var rbotShots = 0;
var target = -1;
var lastShot;
var waiting;
var wepList = {
    0: "Auto",
    1: "AWP",
    2: "Scout",
    3: "Rifle",
    4: "SMG",
    5: "Heavy Pistol",
    6: "Pistol"
};
var binlib = {};
/* ---------------- */
setup();
/* Functions */
function calcDist(local, target) {
    lx = local[0];
    ly = local[1];
    lz = local[2];
    tx = target[0];
    ty = target[1];
    tz = target[2];
    dx = lx - tx;
    dy = ly - ty;
    dz = lz - tz;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function pickTarget() {
    if (!UI.GetValue("Script Items", "[AHC] Enable Adaptive Hitchance") || !Entity.IsAlive(local))
        return;
    if (target == undefined || target == -1 || !Entity.IsValid(target) || !Entity.IsAlive(target)) {
        if (rageTarget == 1) {
            waiting = 1;
        }
    }
    if (secondsElapsed >= 5) {
        rageTarget = 0;
        secondsElapsed = 0;
        waiting = 0;
    }
    var enemies = Entity.GetEnemies();
    var tempGuess = -1;
    var localPos = Entity.GetHitboxPosition(local, 5);
    for (var i = 0; i < enemies.length; i++) {
        if (!Entity.IsValid(enemies[i]) || !Entity.IsAlive(enemies[i])) {
            continue;
        }
        if (tempGuess == undefined || !Entity.IsValid(tempGuess) || !Entity.IsAlive(tempGuess) || Entity.IsDormant(
                tempGuess)) {
            tempGuess = enemies[i];
            continue;
        }
        targetPos = Entity.GetHitboxPosition(tempGuess, 5);
        enemyPos = Entity.GetHitboxPosition(enemies[i], 5);
        if (calcDist(localPos, enemyPos) < calcDist(localPos, targetPos)) {
            tempGuess = enemies[i];
            continue;
        }
    }
    targetIndex = tempGuess;
    targetPos = Entity.GetHitboxPosition(targetIndex, 5);
    if (rageTarget == 0)
        adjustHitchance(calcDist(localPos, targetPos));
}

function onShot() {
    if (!UI.GetValue("Script Items", "[AHC] Enable Adaptive Hitchance"))
        return;
    target = Event.GetInt("target_index");
    if (!Entity.IsValid(targetIndex) || !Entity.IsAlive(targetIndex) || !Entity.IsDormant(targetIndex)) {
        waiting = 1;
        target = -1;
        return;
    }
    targetIndex = target;
    rageTarget = 1;
    secondsElapsed = 0;
    targetPos = Entity.GetHitboxPosition(targetIndex, 5);
    localPos = Entity.GetHitboxPosition(local, 5);
    adjustHitchance(calcDist(localPos, targetPos));
}

function drawIndicator() {
    if (!UI.GetValue("Script items", "[AHC] Show Indicators"))
        return;
    if (!Entity.IsAlive(local))
        return;
    if (targetIndex == -1 || targetIndex == undefined) {
        return;
    }
    if (!Entity.IsValid(targetIndex) || !Entity.IsAlive(targetIndex)) {
        return;
    }
    targetPos = Entity.GetHitboxPosition(targetIndex, 5);
    localPos = Entity.GetHitboxPosition(local, 5);
    if (calcDist(localPos, targetPos) >= 2000)
        return;
    var worldPos = Entity.GetRenderOrigin(targetIndex);
    var loc = Render.WorldToScreen(worldPos);
    var color = UI.GetColor("Script items", "[AHC] Target Indicator");
    Render.Circle(loc[0], loc[1] - 142, 20, color);
    Render.String(loc[0] - 7, loc[1] - 160, 0, "!", color, 24);
}

function drawInMenu() {
    var opts = UI.GetString("[AHC] Weapon Config");
    var dt = UI.GetValue("[AHC] Adaptive Doubletap");
    var inAir = UI.GetValue("[AHC] In-Air HC");
    for (var weapon in wepList) {
        UI.SetEnabled("Script items", wepList[weapon] + " Max HC", opts == wepList[weapon]);
        UI.SetEnabled("Script items", wepList[weapon] + " Min HC", opts == wepList[weapon]);
        UI.SetEnabled("Script items", wepList[weapon] + " Playstyle", opts == wepList[weapon]);
    }
    UI.SetEnabled("Script items", "SMG In-Air HC", opts == "SMG" && inAir);
    UI.SetEnabled("Script items", "Scout In-Air HC", opts == "Scout" && inAir);
    UI.SetEnabled("Script items", "Heavy Pistol In-Air HC", opts == "Heavy Pistol" && inAir);
    UI.SetEnabled("Script items", "Doubletap Max HC", dt);
    UI.SetEnabled("Script items", "Doubletap Min HC", dt);
}

function weaponType() {
    var weapon = Entity.GetName(Entity.GetWeapon(local));
    var weapons = {
        "usp s": "Pistol",
        "glock 18": "Pistol",
        "p2000": "Pistol",
        "dual berettas": "Pistol",
        "r8 revolver": "Heavy Pistol",
        "desert eagle": "Heavy Pistol",
        "p250": "Pistol",
        "tec9": "Pistol",
        "mp9": "SMG",
        "mac 10": "SMG",
        "ump 45": "SMG",
        "ak 47": "Rifle",
        "sg 553": "Rifle",
        "aug": "Rifle",
        "m4a1 s": "Rifle",
        "m4a4": "Rifle",
        "ssg 08": "Scout",
        "awp": "AWP",
        "g3sg1": "Auto",
        "scar 20": "Auto"
    };
    return weapons[weapon];
}

function adjustHitchance(distance) {

    if (weaponType() == undefined)
        return;
    var enabledWeps = fetchDropdown("[AHC] Enabled Weapons");
    if (enabledWeps.indexOf(weaponType()) == -1)
        return;

    maxHC = UI.GetValue("Script items", weaponType() + " Max HC", "Integer");
    minHC = UI.GetValue("Script items", weaponType() + " Min HC", "Integer");
    dtMaxHC = UI.GetValue("Script items", "Doubletap Max HC");
    dtMinHC = UI.GetValue("Script items", "Doubletap Min HC");
    fv = Entity.GetProp(local, "CBasePlayer", "m_flFallVelocity");
    inAir = false;
    playstyle = UI.GetString("Script items", weaponType() + " Playstyle");
    mode = UI.GetString("Script items", "[AHC] Mode");
    inacc = Local.GetInaccuracy();

    if (fv < -1 || fv > 1)
        inAir = true;
    else
        inAir = false;

    if (UI.GetValue("[AHC] Adaptive Doubletap")) {
        dtVal = playstyle == "Agressive" ? dtEquation(dtMinHC, dtMaxHC) - 30 : dtEquation(dtMinHC, dtMaxHC);
        if (isNaN(dtVal))
            dtVal = dtMinHC;
        UI.SetValue("Rage", "GENERAL", "Exploits", "Doubletap hitchance", dtVal);
    }
    if (weaponType() == "Heavy Pistol" || weaponType() == "Scout" || weaponType() == "SMG")
        inAirVal = UI.GetValue("Script items", weaponType() + " In-Air HC", "Integer");
    else
        inAirVal = minHC;

    hcVal = playstyle == "Agressive" ? hcEquation(minHC, maxHC) - 15 : hcEquation(minHC, maxHC);
    if (hcVal == undefined || hcVal < 0 || isNaN(hcVal)) {
        hcVal = minHC;
    }

    if(inacc > .04 && UI.GetValue("Script items", "[AHC] Account for inaccuracy")) {
      hcVal-=inacc*55;
      inAirVal-=inacc*15;
    }

    if (weaponType() == "SMG" || weaponType() == "Rifle")
        UI.SetValue("Rage", "GENERAL", "Accuracy", "Hitchance", inAir ? inAirVal : hcVal);
    else
        UI.SetValue("Rage", weaponType().toUpperCase(), "Accuracy", "Hitchance", inAir ? inAirVal : hcVal);

    function hcEquation(min, max) {
        if (mode == "Decreasing")
            return Math.round(Math.min(Math.max((1 / 250) * (100 * (distance / 20)) + min, min), max));
        else
        if (mode == "Increasing")
            return Math.round(Math.min(Math.max((-1 / 250) * (100 * (distance / 20)) + max, min), max));
    }

    function dtEquation(min, max) {
        if (mode == "Decreasing")
            return Math.round(Math.min(Math.max((1 / 125) * (100 * (distance / 20)) + min, min), max));
        else
        if (mode == "Increasing")
            return Math.round(Math.min(Math.max((-1 / 125) * (100 * (distance / 20)) + max, min), max));
    }
}

function setup() {
    UI.AddCheckbox("[AHC] Enable Adaptive Hitchance");
    UI.AddCheckbox("[AHC] Show Indicators");
    UI.AddColorPicker("[AHC] Target Indicator");
    UI.SetColor("Script items", "[AHC] Target Indicator", [255, 0, 255, 255]);
    UI.AddCheckbox("[AHC] Use Config Settings");
    UI.AddDropdown("[AHC] Mode", ["Increasing", "Decreasing"]);
    UI.AddCheckbox("[AHC] In-Air HC");
    UI.AddCheckbox("[AHC] Account for inaccuracy")
    createDropdown("[AHC] Enabled Weapons", ["Auto", "Scout", "AWP", "Rifle", "SMG", "Pistol", "Heavy Pistol"], true);
    UI.AddCheckbox("[AHC] Adaptive Doubletap");
    UI.AddSliderInt("Doubletap Max HC", 0, 100);
    UI.AddSliderInt("Doubletap Min HC", 0, 100);
    UI.AddDropdown("[AHC] Weapon Config", ["Auto", "Scout", "AWP", "Rifle", "SMG", "Pistol", "Heavy Pistol"]);
    for (weapon in wepList) {
        UI.AddDropdown(wepList[weapon] + " Playstyle", ["Agressive", "Passive"]);
        UI.AddSliderInt(wepList[weapon] + " Max HC", 0, 100);
        UI.AddSliderInt(wepList[weapon] + " Min HC", 0, 100);
    }
    UI.AddSliderInt("Scout In-Air HC", 0, 100);
    UI.AddSliderInt("SMG In-Air HC", 0, 100);
    UI.AddSliderInt("Heavy Pistol In-Air HC", 0, 100);
    Cheat.PrintColor([255, 75, 100, 25],
        "\n------------------------\n[AHC] v1.3 by Ultranite\n------------------------\n");
    /*
     *            HOW TO CONFIG SETTINGS
     *  Enable the config button and reload the script, all settings will be set
     *  to the values below.
     *
     *  You can set a default value by doing the following:
     *  UI.SetValue("Script items", "name of option/slider", value);
     *
     *  In order to pick a mode or playstyle, simply set 0 for increasing/agressive (accordingly)
     *  and 1 for decreasing/passive.
     *
     *  In order to config the enabled weapons, you need to think of it as binary value.
     *  For example: If you want to enabled Auto, Scout, and AWP, the total you'd need to
     *  set the dropdown to would be 7.
     *
     *  Bits go in this order:
     *  1, 2, 4, 8, 16, 32, 64, 128
     *
     *  All you have to do is find the position of the gun(s) you want enabled and
     *  add the values of the list above that are in the same position.
     *
     *  Checkboxes are set as true/false.
     *
     *  Colors can be set in the format of [r,g,b,alpha]
     *
     *  If you ever wonder how to use something, check the forums:
     *  https://onetap.su/resources/
     *
     *  Add me on discord @Ultranite#9259 for help.
     *
     */
    if (!UI.GetValue("[AHC] Use Config Settings"))
        return;
    UI.SetValue("Script items", "[AHC] Enable Adaptive Hitchance", true);
    UI.SetValue("Script items", "[AHC] Show Indicators", true);
    UI.SetValue("Script items", "[AHC] Mode", 1);
    UI.SetValue("Script items", "[AHC] In-Air HC", true);
    UI.SetValue("Script items", "[AHC] Account for inaccuracy", true);
    UI.SetValue("Script items", "[AHC] Adaptive Doubletap", true);
    UI.SetValue("Script items", "Doubletap Max HC", 45);
    UI.SetValue("Script items", "Doubletap Min HC", 0);
    UI.SetValue("Script items", "[AHC] Enabled Weapons", 127);
    // PER WEAPON
    UI.SetValue("Script items", "Auto Playstyle", 0);
    UI.SetValue("Script items", "Auto Max HC", 86);
    UI.SetValue("Script items", "Auto Min HC", 63);
    UI.SetValue("Script items", "AWP Playstyle", 0);
    UI.SetValue("Script items", "AWP Max HC", 87);
    UI.SetValue("Script items", "AWP Min HC", 60);
    UI.SetValue("Script items", "Scout Playstyle", 0);
    UI.SetValue("Script items", "Scout Max HC", 91);
    UI.SetValue("Script items", "Scout Min HC", 63);
    UI.SetValue("Script items", "Scout In-Air HC", 55);
    UI.SetValue("Script items", "Rifle Playstyle", 0);
    UI.SetValue("Script items", "Rifle Max HC", 65);
    UI.SetValue("Script items", "Rifle Min HC", 35);
    UI.SetValue("Script items", "SMG Playstyle", 0);
    UI.SetValue("Script items", "SMG Max HC", 29);
    UI.SetValue("Script items", "SMG Min HC", 12);
    UI.SetValue("Script items", "SMG In-Air HC", 12);
    UI.SetValue("Script items", "Pistol Playstyle", 0);
    UI.SetValue("Script items", "Pistol Max HC", 40);
    UI.SetValue("Script items", "Pistol Min HC", 15);
    UI.SetValue("Script items", "Heavy Pistol Playstyle", 0);
    UI.SetValue("Script items", "Heavy Pistol Max HC", 89);
    UI.SetValue("Script items", "Heavy Pistol Min HC", 62);
    UI.SetValue("Script items", "Heavy Pistol In-Air HC", 0);
}
runTime = Global.Curtime();
var secondsElapsed = 0;

function check() {
    if (waiting == 1) {
        if (Global.Curtime() - runTime > .1) {
            runTime = Global.Curtime();
            secondsElapsed+=1;
            waiting = 0;
        }
    }
}

function dictLength(dict) {
    var count = 0;
    for (_ in dict) {
        count++;
    }
    return count;
}

function createDropdown(name, values, multi) {
    UI[multi ? "AddMultiDropdown" : "AddDropdown"](name, values);
    binlib[name] = {
        "multi": multi,
        "values": {}
    };
    multi && values.reverse();
    var i = 0;
    for (value in values) {
        var index = multi ? (1 << (values.length - (i + 1))) : i;
        binlib[name].values[index] = values[value];
        i++;
    }
}

function fetchDropdown(name) {
    var selection = (name ? [] : {})
    var bin = UI.GetValue("Misc", name);
    !name && function() {
        for (dropdown in binlib) selection[dropdown] =
            fetchDropdown(dropdown)
    }();
    if (name) {
        !binlib[name].multi && bin == 0 && selection.push(binlib[name]
            .values[0]) && function() {
            return selection;
        }();
        for (var i = dictLength(binlib[name].values) - 1; i >=
            0; i--) {
            if (!binlib[name].multi && i == 0) continue;
            var index = binlib[name].multi ? (1 << i) : i;
            if (bin - index >= 0) {
                bin -= (index);
                selection.push(binlib[name].values[index]);
            }
        }
    }
    return selection;
}
/* --------- */
/* Callbacks */
Cheat.RegisterCallback("Draw", "pickTarget");
Cheat.RegisterCallback('Draw', 'check');
Cheat.RegisterCallback("Draw", "drawIndicator");
Cheat.RegisterCallback("Draw", "drawInMenu");
Global.RegisterCallback("ragebot_fire", "onShot");
/* --------- */