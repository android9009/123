

function playerDied() {
    attackerEnt = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    attackerName = Entity.GetName(attackerEnt);
   
    victimEnt = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    victimName = Entity.GetName(victimEnt);
   
    killFeed.push(attackerName + " killed " + victimName + "!");
    feedOpacity.push(255);
}

killFeed = [];
feedOpacity = [];

feedYOffset = 15;

screenSize = Render.GetScreenSize();
feedStartingPos = [screenSize[0] / 2, 0];

function wipeShit() {
    killFeed = [];
    feedOpacity = [];
}

function drawFunc() {
   
    cols = HSVtoRGB(Global.Realtime() * 1, 1, 1);
   
    localUsername = Entity.GetName(Entity.GetLocalPlayer());
    Render.FilledRect((screenSize[0] / 2) - (Render.TextSize("1234 248624 4268972468 2 2486972468924789")[0] / 2), 0, Render.TextSize("1234 248624 4268972468 2 2486972468924789")[0] + 6, Render.TextSize("1234 248624 4268972468 2 2486972468924789")[1] * killFeed.length, [19,19,19,165]);
   
    UI.SetColor();

    for (var i = 0; i < killFeed.length; i++) {
        if (feedOpacity[i] <= 0) {
            killFeed.shift(i, 1);
            feedOpacity.shift(i, 1);
        }
        rainbowColor = [cols.r, cols.g, cols.b, feedOpacity[i]];
       
        normalColor = [255, 255, 255, feedOpacity[i]];
       
        color = normalColor;
       
        if (killFeed[i].includes(localUsername)) {
            color = rainbowColor;
        }
       
        Render.String(feedStartingPos[0], feedStartingPos[1] + (feedYOffset * i), 1, killFeed[i], color);
        if (!killFeed[i].includes(localUsername)) {
            feedOpacity[i]-= 0.4;
        }
    }
}

function main() {
    Cheat.RegisterCallback("player_death", "playerDied");
    Cheat.RegisterCallback("round_start", "wipeShit");
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

