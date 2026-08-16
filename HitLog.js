//same tick+same attacker->same bullet

Cheat.RegisterCallback("Draw", "drawHitListFunc");
Cheat.RegisterCallback("round_start", "resetFunc");
Cheat.RegisterCallback("player_hurt", "pHurtFunc");
Cheat.RegisterCallback("ragebot_fire", "rFireFunc");
//UI.AddSliderInt("Max logs", 0, 100);

/*UI.AddCheckbox("Enable IDs");
UI.AddCheckbox("Enable Hitboxes");
UI.AddCheckbox("Enable Victims");
UI.AddCheckbox("Enable Weapons");
UI.AddCheckbox("Enable Damages");
UI.AddCheckbox("Enable Hit chance");
UI.AddCheckbox("Enable Exploits");*/

var ragebot_tick = 0;
var ragebot_hitbox_target = 0;
var ragebot_hitchance_target = 0;
var ragebot_exploit_target = 0;

var hits = [];

function resetFunc() {hits = [];}

function rFireFunc() {
    ragebot_tick = Globals.Curtime(); // to verify if I miss don't wanna be retarded;
   
    ragebot_hitbox_target = getHitboxName(Event.GetInt("hitbox"));
    ragebot_hitchance_target = Event.GetInt("hitchance");
    ragebot_exploit_target = Event.GetInt("exploit") > 0 ? "yes" : "-";
}

function drawHitListFunc() {
       if (!Entity.GetLocalPlayer() || !Entity.IsValid(Entity.GetLocalPlayer()))
        return;
Render.FilledRect( pos[0], pos[1], 420, 15, [ 0, 0, 0, 180 ] );
Render.FilledRect( pos[0], pos[1], 420, 23 + (hits.length * 12), [ 0, 0, 0, 120 ] );
    const IDs = true;
    const hitboxes = true;
    const victims = true;
    const weapons = false;
    const damages = true;
    const healths = false;
    const hitchances = true;
    const exploits = true;
   
    var requiredX = 0;
    var ID_x = 45;
    var hitbox_x = 100;
    var victim_x = 100;
    var weapon_x = 80;
    var damage_x = 50;
    var health_x = 50;
    var hitchance_x = 90;
    var exploit_x = 70;
   
    requiredX += IDs ? ID_x : 0;
    requiredX += hitboxes ? hitbox_x : 0;
    requiredX += victims ? victim_x : 0;
    requiredX += weapons ? weapon_x : 0;
    requiredX += damages ? damage_x : 0;
    requiredX += healths ? health_x : 0;
    requiredX += hitchances ? hitchance_x : 0;
    requiredX += exploits ? exploit_x : 0;
   
    const foregroundBounds = drawMenu(100, 100, 50 + (requiredX), 65 + (hits.length * 12), [11,223,234,255], [6,80,80,255], "Hitlist", true);

    //Render.Line(foregroundBounds[0], foregroundBounds[1] + 15, foregroundBounds[2] +106, foregroundBounds[1] + 15, [255, 255, 255, 200]);
   font = Render.AddFont("Small Fonts", 5, 100);
   font1 = Render.AddFont("Verdana", 7, 500)
    var cY = 20;
    oY = 12;
    pX = 10;
    if (IDs) {
        draw_outline_text(pos[0]+10, pos[1]+3.75, 0, "ID", [255, 255, 255, 255], font);
        pX += ID_x;
    }
	if (victims) {
        draw_outline_text(foregroundBounds[0] + pX, pos[1]+3.75, 0, "PLAYER", [255, 255, 255, 255], font);
        pX += victim_x;
    }
    if (hitboxes) {
        draw_outline_text(foregroundBounds[0]-20 + pX, pos[1]+3.75, 0, "HITBOX", [255, 255, 255, 255], font);
        pX += hitbox_x;
    }
    if (damages) {
        draw_outline_text(foregroundBounds[0]-45 + pX, pos[1]+3.75, 0, "DAMAGE", [255, 255, 255, 255], font);
        pX += damage_x;
    }
    if (hitchances) {
        draw_outline_text(foregroundBounds[0]-20 + pX, pos[1]+3.75, 0, "HIT CHANCE", [255, 255, 255, 255], font);
        pX += hitchance_x;
    }
    if (exploits) {
        draw_outline_text(foregroundBounds[0]-40 + pX, pos[1]+3.75, 0, "EXPLOIT", [255, 255, 255, 255], font);
        pX += exploit_x;
    }
    if (weapons) {
        Render.String(foregroundBounds[0] + pX, foregroundBounds[1] + 2, 0, "WEAPON", [255, 255, 255, 200], 8);
        pX += weapon_x;
    }
    if (healths) {
        Render.String(foregroundBounds[0] + pX, foregroundBounds[1] + 2, 0, "HP", [255, 255, 255, 200], 8);
        pX += health_x;
    }  
   
    for (var  i = 0; i < hits.length; i++) {
        currentHit = hits[i];
        //sY = 15 or 16 ???
        pX = 10;
        if (IDs) {
			if (currentHit[5] <= 0){
			Render.FilledRect( pos[0], pos[1] + cY, 2, 10, [ 255, 50, 50, 255 ] );
			Render.FilledRect( pos[0]+1, pos[1] + cY, 1, 10, [ 0, 0, 0, 125 ] );
			}else{
			Render.FilledRect( pos[0], pos[1] + cY, 2, 10, [ 65, 105, 225, 255 ] );
			Render.FilledRect( pos[0]+1, pos[1] + cY, 1, 10, [ 0, 0, 0, 125 ] );
			}
			Render.StringCustom(pos[0]+11, pos[1]-2+1 + cY, 0, currentHit[0], [0, 0, 0, 150], font1); //ID
            Render.StringCustom(pos[0]+10, pos[1]-2 + cY, 0, currentHit[0], [255, 255, 255, 255], font1); //ID
            pX += ID_x;
        }
        if (victims) {
			if (currentHit[5] <= 0){
			Render.StringCustom(foregroundBounds[0] + pX+1, pos[1]-2 + cY+1, 0, currentHit[2].length > 10 ? currentHit[2].substring(0, 10) + "..." : currentHit[2], [0, 0, 0, 150], font1); //VICTIMl  og.name.slice(0, getCustomValue('Max Name Size'))
            Render.StringCustom(foregroundBounds[0] + pX, pos[1]-2 + cY, 0, currentHit[2].length > 10 ? currentHit[2].substring(0, 10) + "..." : currentHit[2], [255, 150, 150, 255], font1); //VICTIM
			}else{
			Render.StringCustom(foregroundBounds[0] + pX+1, pos[1]-2 + cY+1, 0, currentHit[2].length > 10 ? currentHit[2].substring(0, 10) + "..." : currentHit[2], [0, 0, 0, 150], font1); //VICTIMl  og.name.slice(0, getCustomValue('Max Name Size'))
            Render.StringCustom(foregroundBounds[0] + pX, pos[1]-2 + cY, 0, currentHit[2].length > 10 ? currentHit[2].substring(0, 10) + "..." : currentHit[2], [255, 255, 255, 255], font1); //VICTIM
			}
            pX += victim_x;
        }
        if (hitboxes) {
			Render.StringCustom(foregroundBounds[0]-20 + pX+1, pos[1]-2 + cY+1, 0, currentHit[1], [0, 0, 0, 150], font1); //HITBOX
            Render.StringCustom(foregroundBounds[0]-20 + pX, pos[1]-2 + cY, 0, currentHit[1], [255, 255, 255, 255], font1); //HITBOX
            pX += hitbox_x;
        }
        if (damages) {
			if (currentHit[5] <= 0){
			Render.StringCustom(foregroundBounds[0]-45 + pX+1, pos[1]-2 + cY+1, 0, currentHit[4], [0, 0, 0, 150], font1); //DAMAGE
            Render.StringCustom(foregroundBounds[0]-45 + pX, pos[1]-2 + cY, 0, currentHit[4], [255, 150, 150, 255], font1); //DAMAGE
			}else{
			Render.StringCustom(foregroundBounds[0]-45 + pX+1, pos[1]-2 + cY+1, 0, currentHit[4]+" ("+currentHit[5]+")", [0, 0, 0, 150], font1); //DAMAGE
            Render.StringCustom(foregroundBounds[0]-45 + pX, pos[1]-2 + cY, 0, currentHit[4]+" ("+currentHit[5]+")", [255, 255, 255, 255], font1); //DAMAGE
			}
            pX += damage_x;
        }
        if (healths) {
			Render.String(foregroundBounds[0]-20 + pX, foregroundBounds[1] + cY, 0, currentHit[5], [255, 255, 255, 200], 8); //HITCHANCE
            pX += health_x;
        }
        if (hitchances) {
			Render.StringCustom(foregroundBounds[0]-20 + pX+1, pos[1]-2 + cY+1, 0, currentHit[6], [0, 0, 0, 150], font1); //REMAINING HEALTH
            Render.StringCustom(foregroundBounds[0]-20 + pX, pos[1]-2 + cY, 0, currentHit[6], [255, 255, 255, 255], font1); //REMAINING HEALTH
            pX += hitchance_x;
        }
        if (exploits) {

			Render.StringCustom(foregroundBounds[0]-40 + pX, pos[1]-2 + cY, 0, currentHit[7], [0, 0, 0, 150], font1); //HITCHANCE
            Render.StringCustom(foregroundBounds[0]-40 + pX, pos[1]-2 + cY, 0, currentHit[7], [255, 255, 255, 255], font1); //HITCHANCE
            pX += exploit_x;
        }
        if (weapons) {
            Render.String(foregroundBounds[0] + pX, foregroundBounds[1] + cY, 0, currentHit[3], [255, 255, 255, 200], 8); //WEAPON
            pX += weapon_x;
        }
        cY += oY;
		
    }
   

    if (hits.length > 5) hits.shift();
}


var curID = 0;
function pHurtFunc() {
    if (Entity.GetEntityFromUserID(Event.GetInt("attacker")) != Entity.GetLocalPlayer()) return;
    curID++;
   
   // var hitbox = "Generic";
    if (ragebot_tick == Globals.Curtime()) hitbox = ragebot_hitbox_target;

    var id = curID.toString();  
    var victimName = Entity.GetName(Entity.GetEntityFromUserID(Event.GetInt("userid")));
    var weaponName = Event.GetString("weapon");
    var damageDealt = Event.GetInt("dmg_health").toString();
    var healthRemaining = Event.GetInt("health").toString();
    var hitchance = ragebot_hitchance_target.toString() + "%";
    var exploit = ragebot_exploit_target.toString();
   
    hits.push(
    [
    id,
    hitbox,
    victimName,
    weaponName,
    damageDealt,
    healthRemaining,
    hitchance,
    exploit
    ]
   
    );
}
function draw_outline_text (x, y, align, string, color, fontname) { //this is really messy but it does the job
	Render.StringCustom(x - 1, y - 1, align, string, [0, 0, 0, 255], fontname);
	Render.StringCustom(x - 1, y, align, string, [0, 0, 0, 255], fontname);
	Render.StringCustom(x - 1, y + 1, align, string, [0, 0, 0, 255], fontname);
	
	Render.StringCustom(x, y + 1, align, string, [0, 0, 0, 255], fontname);
	Render.StringCustom(x, y - 1, align, string, [0, 0, 0, 255], fontname);
	
	Render.StringCustom(x + 1, y - 1, align, string, [0, 0, 0, 255], fontname);
	Render.StringCustom(x + 1, y, align, string, [0, 0, 0, 255], fontname);
	Render.StringCustom(x + 1, y + 1, align, string, [0, 0, 0, 255], fontname);
	
	Render.StringCustom(x, y, align, string, color, fontname);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var firstRun = true;
var pos = [0, 0];
function drawMenu(x, y, sX, sY, foreColor, darkForeColor, title, draggable) {

    if (firstRun) {
        pos = [x, y];
        firstRun = false;
    }

    //We return the position of the foreground

    baseBackground = [pos[0] + 4, pos[1] + 4, sX - 8, sY - 8];

    foregroundPos = [baseBackground[0] + 4, baseBackground[1] + 28, baseBackground[2] - 8, baseBackground[3] - 32];

    //Outline
   // outlineBox(pos[0], pos[1], sX, sY, [20, 20, 20, 255])

    //Far background
   // Render.FilledRect(pos[0], pos[1], sX, sY, [20, 20, 20, 130]);

    //Base background outline
    //outlineBox(baseBackground[0]-1, baseBackground[1]-1, baseBackground[2]+1, baseBackground[3]+1, [70, 70, 70, 255]);

    //Base background
    //Render.FilledRect(baseBackground[0], baseBackground[1], baseBackground[2], baseBackground[3], [40, 40, 40, 200]);

    //Title
   // Render.String( pos[0] + (sX / 2), baseBackground[1] + 5, 1, title, [230, 230, 230, 255], 8 );

    //Title 'Underline'
    stringSize = Render.TextSize(title, 8);

   // Render.GradientRect(foregroundPos[0], baseBackground[1] + stringSize[1] + 5, foregroundPos[2], 5, 0, foreColor, darkForeColor);

    //Foreground outline
    //outlineBox(foregroundPos[0]-1, foregroundPos[1]-1, foregroundPos[2]+1, foregroundPos[3]+1, [70, 70, 70, 255]);

    //Foreground
    //Render.FilledRect(foregroundPos[0], foregroundPos[1], foregroundPos[2], foregroundPos[3], [20, 20, 20, 130]);
    if (draggable) operateDrag(baseBackground[0] , baseBackground[1], sX - 5, stringSize[1] + 5); //ideally this should be called from createMove but for now I'll put that in TODO.

    return foregroundPos;
}
var dragOffset = [];
function operateDrag(x, y, sX, sY) {
    if (!beingClicked(x,x+sX,y,y+sY) && dragOffset.length == 0 || !Input.IsKeyPressed(0x01)) {dragOffset = [];return;}
   

    cursorPosition = Input.GetCursorPosition();
   
    cX = cursorPosition[0];
    cY = cursorPosition[1];

    if (dragOffset.length == 0) {dragOffset = [cX - x, cY - y];}
   
    pos = [cX - dragOffset[0], cY - dragOffset[1]];
}
function outlineBox(x, y, sX, sY, color) {
    //top left -> top right
    Render.Line(x, y, x + sX, y, color);

    //top right -> bottom right
    Render.Line( x + sX, y, x + sX, y + sY, color);

    //bottom right -> bottom left
    Render.Line( x + sX, y + sY, x, y + sY, color);

    //bottom left -> top left
    Render.Line( x, y + sY, x, y, color);

}
function beingClicked(maxLeft, maxRight, maxTop, maxBottom) {
    cursorPosition = Input.GetCursorPosition();
   
    return ( Input.IsKeyPressed(0x01) && cursorPosition[0] > maxLeft && cursorPosition[0] < maxRight
    &&    cursorPosition[1] < maxBottom && cursorPosition[1] > maxTop);
}
function drawButton(x, y, sX, sY, text, foreColor, backColor, borderColor, fontSize, centerText, textOffset) {
    Render.FilledRect(x, y, sX, sY, backColor);
    outlineBox(x, y, sX, sY, borderColor);
    Render.String(x + (centerText ? sX / 2 : textOffset), y + (sY / 3), centerText ? 1 : 0, text, foreColor, fontSize);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//useful shit, not required.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //both bounds are inclusive.
}
function getVal(valName) { return UI.GetValue("Script items", valName);}
function setVal(valName, val) { UI.SetValue("Misc", "JAVASCRIPT", "Script items", valName, val);}
function padStr(source, desiredLen) {
    const sourceLen = source.length;
    var newStr = source;
    const requiredAddition = desiredLen - sourceLen;
    if (requiredAddition == 0) newStr = newStr.substring(0, desiredLen);
   
    while (newStr.length != desiredLen) newStr += " ";
   
    return newStr;
}

function getHitboxName(hitgroup) {
    hitbox = "-";
   
    switch (hitgroup) {
        case 0:
        hitbox =  "head";
        break;
        case 1:
        hitbox =  "neck";
        break;
        case 2:
        hitbox =  "stomach";
        break;
        case 3:
        hitbox =  "stomach";
        break;
        case 4:
        hitbox =  "chest";
        break;
        case 5:
        hitbox =  "chest";
        break;
        case 6:
        hitbox =  "chest";
        break;
        case 7:
        hitbox =  "leg";
        break;
        case 8:
        hitbox =  "leg";
        break;
        case 9:
        hitbox =  "leg";
        break;
        case 10:
        hitbox =  "leg";
        break;
        case 11:
        hitbox =  "leg";
        break;
        case 12:
        hitbox =  "leg";
        break;
        case 13:
        hitbox =  "hand";
        break;
        case 14:
        hitbox =  "hand";
        break;
        case 15:
        hitbox =  "hand";
        break;
        case 16:
        hitbox =  "hand";
        break;
        case 17:
        hitbox =  "hand";
        break;
        case 18:
        hitbox =  "hand";
    }
	
    return hitbox; // I didn't use yours in the end as the shit was more or less the same and I love my code
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////