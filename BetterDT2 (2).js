UI.AddSliderInt("                  Better DT", 0, 0);
UI.AddCheckbox("Better Doubletap");
function on_ragebot_fire() {
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Better Doubletap")){
        return;
    }
    player = Entity.GetLocalPlayer();
    weapon = Entity.GetWeapon(player);
    weaponName = Entity.GetName(weapon);
    Global.Print('Printing:');
    Global.Print(weaponName + '\n');
    if (!(weaponName.includes('g3sg1')|| weaponName.includes('scar')|| weaponName.includes('xm1014')|| weaponName.includes('desert')|| weaponName.includes('nova')|| weaponName.includes('sawed off'))) {
        Global.Print('Includes Blacklisted Gun... Setting fast recovery true' + '\n');
        UI.SetValue("Rage", "GENERAL", "Exploits", "Doubletap fast recovery", true);
        return;
    }
    ragebot_target_exploit = Event.GetInt("exploit");
    if (ragebot_target_exploit == 2) {
        UI.SetValue("Rage", "GENERAL", "Exploits", "Doubletap fast recovery", true);
    } else {
        UI.SetValue("Rage", "GENERAL", "Exploits", "Doubletap fast recovery", false);
    }   
}
Global.RegisterCallback("ragebot_fire", "on_ragebot_fire");