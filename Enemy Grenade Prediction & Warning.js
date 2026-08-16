var grenades = [];
var types = ["CSmokeGrenadeProjectile", "CDecoyProjectile",
    "CMolotovProjectile", "CBaseCSGrenadeProjectile"
];
var local = Entity.GetLocalPlayer();
var binlib = {};
 
function test() {
    var enabled = UI.GetValue("Script items",
        "[EGPred] Enable Indicators");
    if (!enabled)
        return;
    var entities = Entity.GetEntities();
    for (var i = 0; i < entities.length; i++) {
        var ent = entities[i];
        var t = Entity.GetClassName(ent);
        if (inArray(t, types)) {
            var damage = Entity.GetProp(ent, "CBaseGrenade",
                "m_flDamage");
            var opts = fetchDropdown("[EGPred] Show grenades");
            if (opts == undefined)
                opts = [];
            if (t == "CBaseCSGrenadeProjectile" && inArray(
                    "Flash + Frag", opts))
                grenade(ent, 500, "he", damage);
            else
            if (t == "CMolotovProjectile" && inArray("Molotov", opts))
                grenade(ent, 500, "mol", damage);
            else
            if (t == "CDecoyProjectile" && inArray("Decoy", opts))
                grenade(ent, 500, "decoy", damage);
            else
            if (t == "CSmokeGrenadeProjectile" && inArray("Smoke",
                    opts))
                grenade(ent, 500, "smoke", damage);
        }
    }
}
 
function grenade(ent, distanceMax, type, damage) {
    var eloc;
    var lLoc = Entity.GetHitboxPosition(local, 12);
    var name;
    var iColor = UI.GetColor("Script items",
        "[EGPred] Interior indicator");
    var xColor = UI.GetColor("Script items",
        "[EGPred] Exterior indicator");
    var exColor = UI.GetColor("Script items",
        "[EGPred] Exclamation indicator");
    var nameColor = UI.GetColor("Script items",
        "[EGPred] Name indicator");
    var distColor = UI.GetColor("Script items",
        "[EGPred] Distance indicator");
    var killColor = UI.GetColor("Script items",
        "[EGPred] Death indicator");
    var dmgColor = UI.GetColor("Script items",
         "[EGPred] Damage indication");
    var size = UI.GetValue("Script items",
         "[EGPred] Size of warning",
        "Integer");
    var sizeName = UI.GetValue("Script items",
        "[EGPred] Size of name", "Integer");
    var dispName = UI.GetValue("Script items",
        "[EGPred] Display Nade Name");
    var showDist = UI.GetValue("Script items",
        "[EGPred] Display Distance");
    var dispDmg = UI.GetValue("Script items",
        "[EGPred] Display Damage");
 
    if (type == "mol") {
        name = "Molotov";
        var eLoc = Entity.GetProp(ent, "CMolotovProjectile",
            "m_vecOrigin");
    } else if (type == "he") {
        name = "Flash/Frag";
        var eLoc = Entity.GetProp(ent, "CBaseCSGrenadeProjectile",
            "m_vecOrigin");
    } else if (type == "decoy") {
        name = "Decoy";
        var eLoc = Entity.GetProp(ent, "CDecoyProjectile",
            "m_vecOrigin");
    } else if (type == "smoke") {
        name = "Smoke";
        var eLoc = Entity.GetProp(ent, "CSmokeGrenadeProjectile",
            "m_vecOrigin");
    }
    if (!Entity.IsValid(ent) || Entity.IsDormant(ent))
        return;
    var distance = calcDist(eLoc, lLoc);
    if (distance <= distanceMax) {
        var world = Entity.GetRenderOrigin(ent);
        var cPos = Render.WorldToScreen(world);
        var willKill = false;
        var dmg;
 
       if(type == "he") {
 
        var damage = Entity.GetProp(ent, "CBaseGrenade", "m_flDamage");
        var armor = Entity.GetProp(local, "CCSPlayerResource", "m_iArmor");
        var health = Entity.GetProp(local, "CBasePlayer", "m_iHealth");
        const a = 105.0;
        const b = 25.0;
        const c = 140.0;
 
        const d = (distance - b) / (c+1);
 
        var damage = (a-18) * Math.exp(-d * d);
 
        if(armor > 0) {
            var newDmg = damage * 0.5;
            var armorDmg = (damage - newDmg) * 0.5;
 
            if(armorDmg > armor) {
                armor = armor*(1/.5);
                newDmg = damage-armorDmg;
            }
            damage = newDmg;
        }
        dmg = Math.ceil(damage);
 
        if(dmg+5 > health)
            willKill = true;
        else
            willKill = false;
       }
 
 
        size = Math.floor((size - distance/20));
        sizeName = Math.floor((sizeName - distance/20));
 
        size = adjTextSize(size);
        sizeName = adjTextSize(sizeName);
 
        for (var j = 0; j < size; j++) {
            if(willKill)
                Render.Circle(cPos[0], cPos[1], j, killColor);
            else
            if (j < (size / 1.5))
                Render.Circle(cPos[0], cPos[1], j, iColor);
            else
                Render.Circle(cPos[0], cPos[1], j, xColor);
        }
        var dmgX = (cPos[0] - (8*(sizeName/1.2)));
        var distX = (cPos[0] - (-2*(sizeName/1.2)));
 
        if(dispDmg && type == "he")
            Render.String(dmgX, cPos[1] - 60, 0, "Dmg:" + dmg, dmgColor,
                sizeName);
        if (dispName)
            Render.String(cPos[0] - 25, cPos[1] + 20, 0, name, nameColor,
                sizeName);
        if (showDist)
            Render.String(distX, cPos[1] - 60, 0, "D: " + Math.round(
                distance), distColor, sizeName);
        Render.String(cPos[0] - (size / 3.6), cPos[1] - (size / 1.3),
            0, "!", exColor, size);
    }
}
 
function adjTextSize(size) {
    if (size < 8)
        size = 8;
    if (size > 48)
        size = 48;
    if (size % 2 != 0)
        size += 1;
    return size;
}
 
function inArray(string, array) {
    if (array == [] || array == undefined)
        return false;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == string)
            return true;
        else if (i + 1 >= array.length)
            return false;
    }
}
 
function calcDist(local, target) {
    var lx = local[0];
    var ly = local[1];
    var lz = local[2];
    var tx = target[0];
    var ty = target[1];
    var tz = target[2];
    var dx = lx - tx;
    var dy = ly - ty;
    var dz = lz - tz;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
 
function setup() {
    UI.AddSliderInt("[EGPred] Size of warning", 0, 30);
    UI.AddSliderInt("[EGPred] Size of name", 0, 30);
    UI.AddColorPicker("[EGPred] Interior indicator");
    UI.AddColorPicker("[EGPred] Exterior indicator");
    UI.AddColorPicker("[EGPred] Exclamation indicator");
    UI.AddColorPicker("[EGPred] Name indicator");
    UI.AddColorPicker("[EGPred] Death indicator");
    UI.AddColorPicker("[EGPred] Damage indicator");
    UI.AddColorPicker("[EGPred] Distance indicator");
    UI.AddCheckbox("[EGPred] Enable Indicators");
    UI.AddCheckbox("[EGPred] Display Damage");
    UI.AddCheckbox("[EGPred] Display Distance");
    UI.AddCheckbox("[EGPred] Display Nade Name");
    createDropdown("[EGPred] Show grenades", ["Smoke", "Flash + Frag",
        "Molotov", "Decoy"
    ], true);
    Global.PrintColor([0, 255, 255, 255], "\n------------------------\n[EGPred] v1.0 by Ultranite\n------------------------\n");
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
 
/*function armorReduction(damage, armorVal) {
    var armorRatio = .5;
    var armorBonus = .5;
    if (armor > 0) {
        var newDmg = (damage * armorRatio);
        var armor = (damage - newDmg) * armorBonus;
        if (armor > armorVal) {
            armor = armorVal * (1 / armorBonus);
            newDmg = damage - armor;
        }
        damage = newDmg;
    }
    return newDmg;
}*/
 
setup();
 
Global.RegisterCallback("Draw", "test");