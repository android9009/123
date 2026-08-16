function pHurt() {
    attackerEntity = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    localEntity = Entity.GetLocalPlayer();
    
    if (attackerEntity == localEntity) {
        victimName = Entity.GetName(Entity.GetEntityFromUserID(Event.GetInt("userid")));
        
        //Get hitgroup as a string
        
        hitboxName = hitgroupToHitbox(Event.GetInt("hitgroup"));
        
        damageDone = Event.GetInt("dmg_health");
        healthRemaining = Event.GetInt("health");
        
        hurtLogs.push([victimName, hitboxName, damageDone, healthRemaining, 0, 255, (Math.random() * (0.2 - 1.200) + 1.200).toFixed(4), Globals.Curtime()]);
    }
}

// [ victimName, hitboxName, damageDone, healthRemaining, curLength, opacity ];
hurtLogs = [ ];

function main() {
    Cheat.RegisterCallback("player_hurt", "pHurt");
    Cheat.RegisterCallback("Draw", "drawLogs");
    Cheat.RegisterCallback("Draw", "showOrHide");
}

typeSpeed = 0.05;
fadeOutSpeed = 2;
showDelayTime = typeSpeed + Globals.Curtime();
function showOrHide() {
    
    
    for (var i = 0; i < hurtLogs.length; i++) {
        hurtLogs[i][4]++;
        toSay = "Hit " + victimName + " in the " + hitboxName + " for " + damageDone + " damage (" + healthRemaining + " health remaining)";
        if(Globals.Curtime() - hurtLogs[i][7] < 2)
        {
            continue
        }
        hurtLogs[i][5] -= Globals.Frametime() * 500;
        
        if (hurtLogs[i][5] < 0) {
            hurtLogs.shift(i, 1);
        }
    }
}

function drawLogs() {
    
    textX = 10;
    textY = 10;
    textYIncrement = 15;
    
    textCol = [255, 255, 255];
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items")) {
        ( Global.Realtime(), 1, 1 );
    }
    
    for (var i = 0; i < hurtLogs.length; i++) {
        currentLog = hurtLogs[i];
        
        victimName = currentLog[0];
        hitboxName = currentLog[1];
        damageDone = currentLog[2];
        healthRemaining = currentLog[3];

        consolasFont = Render.AddFont("Consolas", 10, 90);
        
        currentTextPos = textY + (textYIncrement * i);
        
        toSay = "Hit " + victimName + " in the " + hitboxName + " for " + damageDone + " damage (" + healthRemaining + " health remaining)";

        textCol = [255,255,255];
        
        Render.StringCustom(textX + 1, currentTextPos + 1, 0, toSay, [0, 0, 0, hurtLogs[i][5]], consolasFont);
        Render.StringCustom(textX, currentTextPos, 0, toSay, [textCol[0], textCol[1], textCol[2], hurtLogs[i][5]], consolasFont);
    }
}

main();


function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}



function hitgroupToHitbox(hitgroup) {
    hitbox = "UNKNOWN";
    
    switch (hitgroup) {
        case 0:
        hitbox =  "head";
        break;
        case 1:
        hitbox =  "neck";
        break;
        case 2:
        hitbox =  "pelvis";
        break;
        case 3:
        hitbox =  "body";
        break;
        case 4:
        hitbox =  "chest";
        break;
        case 5:
        hitbox =  "chest";
        break;
        case 6:
        hitbox =  "upper chest";
        break;
        case 7:
        hitbox =  "left thigh";
        break;
        case 8:
        hitbox =  "right thigh";
        break;
        case 9:
        hitbox =  "left calf";
        break;
        case 10:
        hitbox =  "right calf";
        break;
        case 11:
        hitbox =  "left foot";
        break;
        case 12:
        hitbox =  "right foot";
        break;
        case 13:
        hitbox =  "left hand";
        break;
        case 14:
        hitbox =  "right hand";
        break;
        case 15:
        hitbox =  "left arm";
        break;
        case 16:
        hitbox =  "left forearm";
        break;
        case 17:
        hitbox =  "right arm";
        break;
        case 18:
        hitbox =  "right forearm";
    }
    return hitbox;
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