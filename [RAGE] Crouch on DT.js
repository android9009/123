var canCrouch = false;
var crouchTime = 0;

function onShot() {
    exploit = Event.GetInt("exploit");

        if(exploit == 2) {
            canCrouch = true;
            crouchTime = Globals.Curtime();
        } else {
            canCrouch = false;
            crouchTime = 0;
        }
}

function userCMD() {
    if(canCrouch) {
        if(Globals.Curtime() - crouchTime > .3) {
            crouchTime = 0;
            canCrouch = false;
        } else {
            UserCMD.ForceCrouch();
        }
    
    }
}

Cheat.RegisterCallback("ragebot_fire", "onShot");
Cheat.RegisterCallback("CreateMove", "userCMD");