var leftoffset;
var backoffset;
var rightoffset;
var direction;
function addToMenu(){
    UI.AddHotkey("Left");
    UI.AddSliderInt("Left offset", -180, 180);
    UI.AddHotkey("Back");
    UI.AddSliderInt("Back offset", -180, 180);
    UI.AddHotkey("Right");
    UI.AddSliderInt("Right offset", -180, 180);
}

function onCreateMove() {
        if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Left")) {
        direction = 0;
    }
  
        if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Back")) {
        direction = 1;
    }
  
        if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Right")) {
        direction = 2;
    }
  
    switch (direction) {
        case 0:
            leftoffset = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Left offset");
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", leftoffset);
            break;
        case 1:
            backoffset = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Back offset");
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", backoffset);
            break;
        case 2:
            rightoffset = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Right offset");
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", rightoffset);
            break;
        default:
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0);
            //i have no idea how javascript deals with this.
    }
}

function doShit() {
    addToMenu();
    Global.RegisterCallback( "CreateMove", "onCreateMove" );
}

doShit(); //slatt