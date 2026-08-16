Cheat.RegisterCallback("CreateMove", "cMove");
UI.AddHotkey("Back and forth:");
UI.AddSliderInt("Back and forth speed:", 0, 135);

function getVal(valName) {return UI.GetValue("Misc", "JAVASCRIPT", "Script items", valName);}

function cMove() {
    if (!UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Back and forth:")) return;

    toMove = getVal("Back and forth speed:") * (getRandomInt(-1, 1));


    UserCMD.SetMovement([0, toMove, 0]);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}