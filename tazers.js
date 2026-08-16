UI.AddHotkey( "Tasershot" );

var state = 0;
var oldWeapon = "";
var issuedCommands = 0;

function main() {
    if(!UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Tasershot") && state == 0)
        return;
   
    var localPlayer = Entity.GetLocalPlayer();
   
    var weapon = Entity.GetWeapon(localPlayer);  
    var weaponName = Entity.GetClassName(weapon);  
   
    //Makes the weapon name compatible with use command
    weaponName = weaponName.replace("CWeapon", "weapon_").toLowerCase();
    weaponName = weaponName.replace("c", "weapon_").toLowerCase();
   
    var shotsFired = Entity.GetProp( localPlayer, "CCSPlayer", "m_iShotsFired" );
   
    //makes sure we shot and didn't issue too many commands ( to prevent getting kicked)
    if (shotsFired > 0 && state == 0 && issuedCommands >= 8) {
         
        if(weaponName != "weapon_taser")
            oldWeapon = weaponName;
       
        state++;
        issuedCommands = 0;
    }
   
    if(state == 1) {
        Cheat.ExecuteCommand( "use weapon_taser" );
        state++;
    } else if(state >= 2) {
        Cheat.ExecuteCommand( "use " + oldWeapon );
        state = 0;
        oldWeapon = "";
    }
   
    issuedCommands++;
   
}

Cheat.RegisterCallback("CreateMove", "main");