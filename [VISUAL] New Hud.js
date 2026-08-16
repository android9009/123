

function newRoundFunc() {
    killList = [];
}

function deathFunc() {
    attackerEnt = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    localEnt = Entity.GetLocalPlayer();
      
    victimEnt = Entity.GetEntityFromUserID(Event.GetInt("userid"));
  
    victimName = Entity.GetName(victimEnt);
  
    if (attackerEnt == localEnt) {
        if (killList.length > 9) {
            killList.shift();
        }
        killList.push("Killed - " + victimName);
    }
}

killList = [];

//IF USER IS HOLDING T GET RID OF SHOWHUD

function drawUI() {
    lEntity = Entity.GetLocalPlayer();
    screenSize = Render.GetScreenSize();
    cols = HSVtoRGB(Global.Realtime() * 1, 1, 1);
    rainbowColor = [cols.r, cols.g, cols.b, 255];

    /* HEALTH */
    //Get Health:
    hp = Entity.GetProp(lEntity, "DT_BasePlayer", "m_iHealth");
    hpColor = [255, 255, 255, 255];
  
    if (hp <= 0) {
        Render.String(0, 0, 0, "DEAD", rainbowColor);
    }
    else {
            Render.String(-2, screenSize[1] / 2 - 2, 0,"HP: " + hp.toString(), [19, 19, 19, 255], 4); // Shadow
            Render.String(0, screenSize[1] / 2, 0, "HP: " + hp.toString(), hpColor, 4);
    }
  
    /* KILL LIST */
    //Render kills
    /*
    killIncreaser = 40;
    currKillY = screenSize[1] / 2 + killIncreaser;

    for (var i = 0; i < killList.length; i++) {
        killText = killList[i];
        Render.String(0, currKillY + (killIncreaser * i), 0, killText, rainbowColor, 4);
    }
    */
  
    if (killList.length < 1) {
        return;
    }
    Render.String(0, screenSize[1] / 2 + 30, 0, killList.length + "K", rainbowColor, 4);
  
    killSize = 15;
    Render.FilledRect(screenSize[0] - (killSize * killList.length), 0, screenSize[0] - (killSize * killList.length), screenSize[1], rainbowColor);
  
}

function main() {
    Cheat.PrintChat(getRandomInt(0, 1).toString());
    Cheat.RegisterCallback("Draw", "drawUI");
    Cheat.RegisterCallback("player_death", "deathFunc");
    Cheat.RegisterCallback("round_start", "newRoundFunc");
}

main();

function getRandomInt(min, max) {
    return Math.floor((Math.random() * (max + 1)) + min);
}

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

