

function onshotPitchFunc() {
    if (!hotKeyActive("ONSHOT PITCH FLIP")) {
        return;
    }
    newPitch([1, 1, 4, 4]);
}

function newPitch(options) {    
    UI.SetValue("Anti-Aim", "Extra", "Pitch", options[getRandomInt(0, options.length)]);
}

timedAACurTime = Globals.Curtime();
timedAADelay = 1;
timedAADelayedTime = timedAACurTime + timedAADelay;

function loopFunc() {
 
    timedAACurTime = Globals.Curtime();
    if (hotKeyActive("TIME AA")) {
        timedAACurTime = Globals.Curtime();
        timedAADelay = getVal("TIMED AA SPEED:");
     
        if (timedAACurTime > timedAADelayedTime) {
            timedAADelayedTime = timedAACurTime + timedAADelay;
        }
     
        if (timedAACurTime < timedAADelayedTime) {
            return;
        }
        newPitch([1]);
    }
 
    real = 0;
    fake = 0;
    LBY = 0;
 
    if (hotKeyActive("JITTER V3")) {
        fake = getRandomInt(-10, 10);
        real = getRandomInt(-10, 10);
    }
 
    if (hotKeyActive("LBY JITTER")) {
        LBY += getRandomInt(-180, 180);
    }
 
    if (hotKeyActive("Left")) {
        //fake += (250);
        fake += 270;
        real += (270);
        LBY += (-180);
    }
 
    if (hotKeyActive("Right")) {
        LBY += 30;
        fake += (30);
        real += -50;
     
        /*
        AntiAim.SetLBYOffset(-30);
        AntiAim.SetFakeOffset(30);
        AntiAim.SetRealOffset(30);
        */
    }
 
    //if ((hotKeyActive("Right") || hotKeyActive("Left")) && hotKeyActive("SIDE PITCH")) {
    if (hotKeyActive("PITCH")) {
    /*
        1 - DOWN
        2 - EMOTION
        3 - ZERO
        4 - UP
        */
     
        newPitch([1,1,1,1,1,1,1,1,1,4]);
    }
    else {
        //UI.SetValue("Anti-Aim", "Extra", "Pitch", 1);
    }
    if (hotKeyActive("Back")) {
        LBY += (290);
        fake += (-10);
        real += (-30);
     
        /*
        AntiAim.SetLBYOffset(-30);
        AntiAim.SetFakeOffset(30);
        AntiAim.SetRealOffset(30);
        */
    }    
    if (activeAmount > 1) {
        LBY += getRandomInt(0, (365 / 10) * 10);
        fake += getRandomInt(-90, 90);
        real += (getRandomInt(-90, 90));
    }
 
    AntiAim.SetLBYOffset(LBY);
    AntiAim.SetFakeOffset(fake);
    AntiAim.SetRealOffset(real);
}

function hotKeyActive(val) {
    return UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", val);
}

function getVal(val) {
    return UI.GetValue("Misc", "JAVASCRIPT", "Script items", val);
}

activeAmount = 0;

function drawFunc() {
 
    arrowColoRGB = HSVtoRGB(Global.Realtime() * 1, 1, 1);
    arrowColor = [arrowColoRGB.r, arrowColoRGB.g, arrowColoRGB.b, 255];
 
    screenSize = Render.GetScreenSize();
 
    middleLocation = [screenSize[0] / 2, screenSize[1] / 2];
 
    rightLoc = [middleLocation[0] + middleLocation[0] / 5, middleLocation[1]];
    leftLoc = [middleLocation[0] - middleLocation[0] / 5, middleLocation[1]];
    backLoc = [middleLocation[0], middleLocation[1] + middleLocation[1] / 5];
 
    indicatorThickness = getVal("Indicator thickness:");
 
    //Back, Right, Left
    activeKeys = [0, 0, 0];
    activeAmount = 0;
    if (hotKeyActive("Back")) {
        activeKeys[0] = 1;
        activeAmount++;
    }
    if (hotKeyActive("Right")) {
        activeKeys[1] = 1;
        activeAmount++;
    }
    if (hotKeyActive("Left")) {
        activeKeys[2] = 1;
        activeAmount++;
    }
 
    UI.SetColor("Visual", "SELF", "ESP", "Name", arrowColor);
    UI.SetColor("Visual", "SELF", "ESP", "Health color override", arrowColor);
    UI.SetValue("Visual", "SELF", "Chams", "Configure", 2);
    UI.SetColor("Visual", "SELF", "Chams", "Desync Color", arrowColor);
    if (hotKeyActive("Weapon color")) {
        UI.SetValue("Visual", "SELF", "Chams", "Configure", 5);
        UI.SetColor("Visual", "SELF", "Chams", "Weapon Color", arrowColor);
    }
    /*
    if (activeAmount > 1) {
        Render.String((screenSize[0] / 2) - 6, screenSize[1] / 2, 0, "*", [arrowColoRGB.r, 20, 20, 255], 4);
        textLoc = screenSize[0] / 2 + 6;
        textAdd = 60;
        if (activeKeys[0]) {
            //BACK
            textLoc += textAdd;
            Render.String(textLoc, screenSize[1] / 2 + 5, 0, "BACK", [arrowColoRGB.r, 20, 20, 255], 1);
        }
        if (activeKeys[1]) {
            //RIGHT
            textLoc += textAdd;
            Render.String(textLoc, screenSize[1] / 2 + 5, 0, "RIGHT", [arrowColoRGB.g, 20, 20, 255], 1);
        }
        if (activeKeys[2]) {
            //LEFT
            textLoc += textAdd;
            Render.String(textLoc, screenSize[1] / 2 + 5, 0, "LEFT", [arrowColoRGB.b, 20, 20, 255], 1);
        }
        return;
    }
    */
 
 
    if (activeKeys[1]) {
        arrowStart = rightLoc;
        arrowEnd = [(arrowStart[0] +  arrowStart[0] / 20)*1.05, arrowStart[1]];
     
        arrowLength = arrowEnd - arrowStart;

        // LINE
            Render.Line(arrowStart[0], arrowStart[1], (arrowEnd[0] - arrowEnd[0] / 40), arrowEnd[1], arrowColor);
 
 
        // LINE
            Render.Line(arrowEnd[0], arrowEnd[1], (arrowEnd[0] - arrowEnd[0] / 40), (arrowEnd[1] + arrowEnd[1] / 20), arrowColor);
            Render.Line(arrowEnd[0], arrowEnd[1], (arrowEnd[0] - arrowEnd[0] / 40), (arrowEnd[1] - arrowEnd[1] / 20), arrowColor);
            Render.Line((arrowEnd[0] - arrowEnd[0] / 40), (arrowEnd[1] - arrowEnd[1] / 20), (arrowEnd[0] - arrowEnd[0] / 40), (arrowEnd[1] + arrowEnd[1] / 20), arrowColor);
    }
    if (activeKeys[2]) {
        arrowStart = leftLoc;
        arrowEnd = [(arrowStart[0] - arrowStart[0] / 20)*0.9, arrowStart[1]];
     
        arrowLength = arrowEnd - arrowStart;
     

        // LINE
            Render.Line(arrowStart[0], arrowStart[1], arrowEnd[0] + arrowEnd[0] / 23, arrowEnd[1], arrowColor);
 
 
        // LINE
            Render.Line(arrowEnd[0], arrowEnd[1], arrowEnd[0] + arrowEnd[0] / 23, arrowEnd[1] + arrowEnd[1] / 20, arrowColor);
            Render.Line(arrowEnd[0], arrowEnd[1], arrowEnd[0] + arrowEnd[0] / 23, arrowEnd[1] - arrowEnd[1] / 20, arrowColor);
            Render.Line(arrowEnd[0] + arrowEnd[0] / 23, arrowEnd[1] - arrowEnd[1] / 20, arrowEnd[0] + arrowEnd[0] / 23, arrowEnd[1] + arrowEnd[1] / 20, arrowColor);
    }
 
    if (activeKeys[0]) {
        arrowStart = backLoc;
        arrowEnd = [arrowStart[0], (arrowStart[1] - arrowStart[1] / 20)*0.9];
     
        arrowLength = arrowEnd - arrowStart;
     
        // LINE
        Render.Line(arrowStart[0], screenSize[1] / 2, arrowEnd[0], arrowEnd[1] * 1.10, arrowColor);
 
 
        // LINE
        + arrowEnd[0] / 23
        arrowEnd[1] + arrowEnd[1] / 20
        Render.Line(arrowStart[0], arrowStart[1], arrowEnd[0] + arrowEnd[0] * 0.04, arrowEnd[1] * 1.10, arrowColor);
     
        Render.Line(arrowStart[0], arrowStart[1], arrowEnd[0] - arrowEnd[0] * 0.04, arrowEnd[1] * 1.10, arrowColor);
        Render.Line(arrowEnd[0] - arrowEnd[0] * 0.04, arrowEnd[1] * 1.10, arrowEnd[0] + arrowEnd[0] * 0.04, arrowEnd[1] * 1.10, arrowColor);
    }
}

function main() {
    AntiAim.SetOverride(1);
 
    UI.AddHotkey("Left");
    UI.AddHotkey("Right");
    UI.AddHotkey("Back");
    UI.AddHotkey("JITTER V3");
    UI.AddHotkey("TIME AA");
    UI.AddHotkey("PITCH");
    UI.AddHotkey("ONSHOT PITCH FLIP");
    UI.AddHotkey("LBY JITTER");
    UI.AddHotkey("eapon color");

    UI.AddSliderInt("TIMED AA SPEED:", 0, 3);
 
    Cheat.RegisterCallback("CreateMove", "loopFunc");
    Cheat.RegisterCallback("weapon_fire", "onshotPitchFunc");
    Cheat.RegisterCallback("Draw", "drawFunc");
}

main();





function HSVtoRGB(h, s, v)
{
    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6)
    {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}



function getRandomInt(min, max) {
    return Math.floor((Math.random() * (max + 1)) + min);
}

