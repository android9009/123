// Js by soldenz#2648
// Js by soldenz#2648
// Js by soldenz#2648
// Js by soldenz#2648
// Js by soldenz#2648
// Js by soldenz#2648
// Js by soldenz#2648
// Js by soldenz#2648
UI.AddSliderInt("                  ", 0, 0);
UI.AddLabel("_______soldenz#2648_______");
UI.AddCheckbox("Better Doubletap");
UI.AddLabel("-------soldenz#2648-------");
UI.AddSliderInt("                  ", 0, 0);
function on_ragebot_fire() {
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Better Doubletap")){
        return;
    }
    player = Entity.GetLocalPlayer();
    weapon = Entity.GetWeapon(player);
    weaponName = Entity.GetName(weapon);
    Global.Print('Printing:');
    Global.Print(weaponName + '\n');
function lastShot(){
    if(Entity.GetLocalPlayer() == Entity.GetEntityFromUserID(Event.GetInt("userid")) && UI.IsHotkeyActive("Rage","GENERAL","Exploits","Doubletap")){
       
        last = Globals.Tickcount()
        shot = true
    }
}
var wasActive = true
var wasfding = false
var lastfding = 0
function cm(){
    Exploit.DisableRecharge()
    if(!UI.IsHotkeyActive("Rage","GENERAL","Exploits","Doubletap"))
    wasActive = false
    if(!wasActive && UI.IsHotkeyActive("Rage","GENERAL","Exploits","Doubletap")){
        Exploit.Recharge()
        wasActive = true
    }
    if(UI.IsHotkeyActive("Anti-Aim","Extra","Fake duck")){
        wasfding = true
        lastfding = Globals.Tickcount()
    }
    if(!UI.IsHotkeyActive("Anti-Aim","Extra","Fake duck") && wasfding && Globals.Tickcount() - 2 > lastfding){
        Exploit.Recharge()
        wasfding = false
    }
   
    if(last + 4 < Globals.Tickcount() && shot){
        Exploit.Recharge()
        shot = false
    }
}
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