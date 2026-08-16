function getWeaponTab(wep) {
    if (wep == "awp") {
        return "awp";
    }
    else if (wep == "ssg 08") {
        return "scout";
    }
    else if (wep == "scar 20" || wep == "g3sg1") {
        return "auto";
    }
    else if (wep == "r8 revolver" || wep == "desert eagle") {
        return "heavy pistol";
    }
    else if (wep == "p2000" || wep == "dual berettas" || wep == "p250" || wep == "five seven" || wep == "usp s" || wep == "glock 18" || wep == "tec 9") {
        return 'pistol';
    }
    else {
        return 'general';
    }
}
const ui = {
    weapons: ["General", "Pistol", "Heavy Pistol", "Auto", "Scout", "AWP"],
    hitboxes: ['Head','Neck','Pelvis','Body','Thorax','Chest','Upper Chest', 'Left Thigh','Right Thigh', 'Left Calf', 'Right Calf', 'Left Foot', 'Right Foot'],
    suffixes: ['damage', 'hitchance', 'accuracy boost', 'multipoint']
}
UI.AddDropdown('Weapon Selection', ui.weapons);
UI.AddDropdown('HB Selection', ui.hitboxes);
ui.weapons.forEach(function(wep) {
    ui.hitboxes.forEach(function(hb) {
        ui.suffixes.forEach(function(sfx) {
            const str = wep.toUpperCase() + ' ' + hb.toLowerCase() + ' ' + sfx;
            UI.AddSliderInt(str, 0, 100);
            UI.SetEnabled('Script Items', str, false);
        })
    })
})
const previous = '', frame = 0;
function ui_handle() {
    if (!UI.IsMenuOpen() || ++frame % 60 != 0) return;
    const selected = ui.weapons[UI.GetValue('Script Items', 'Weapon Selection')].toUpperCase() + ' ' + ui.hitboxes[UI.GetValue('Script Items', 'HB Selection')].toLowerCase();
    ui.suffixes.forEach(function(sfx) {
        previous != selected && previous != '' && UI.SetEnabled('Script Items', previous + ' ' + sfx, false);
        UI.SetEnabled('Script Items', selected + ' ' + sfx, true);
    });
    previous = selected;
}
function override_handle() {
    var tab = getWeaponTab(Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer())));
    for (h in ui.hitboxes) {
        var dmg = UI.GetValue(tab.toUpperCase() + " " + ui.hitboxes[h].toLowerCase() + " damage");
        if (dmg != 0) { Ragebot.OverrideMinimumDamage(parseInt(h), dmg); }
        var hc = UI.GetValue(tab.toUpperCase() + " " + ui.hitboxes[h].toLowerCase() + " hitchance");
        if (hc != 0) { Ragebot.OverrideHitchance(parseInt(h), hc); }
        var ab = UI.GetValue(tab.toUpperCase() + " " + ui.hitboxes[h].toLowerCase() + " accuracy boost");
        if (ab != 0) { Ragebot.OverrideAccuracyBoost(parseInt(h), ab); }
        var mp = UI.GetValue(tab.toUpperCase() + " " + ui.hitboxes[h].toLowerCase() + " multipoint");
        if (mp != 0) { Ragebot.OverrideMultipointScale(parseInt(h), mp); }
    }
   
}
Cheat.RegisterCallback('CreateMove', 'override_handle');
Cheat.RegisterCallback('Draw', 'ui_handle');