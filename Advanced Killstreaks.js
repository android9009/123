//ADVANCED KILLSTREAKS, RESPECTING ONETAP.SU V3

//Store here our Screen size info before INIT for each Screen Message
var x = Global.GetScreenSize()[0]/2, y = Global.GetScreenSize()[1]/2; var x2 = Global.GetScreenSize()[0]/2, y2 = Global.GetScreenSize()[1]/2;
var x3 = Global.GetScreenSize()[0]/2, y3 = Global.GetScreenSize()[1]/2; var x4 = Global.GetScreenSize()[0]/2, y4 = Global.GetScreenSize()[1]/2;
var x5 = Global.GetScreenSize()[0]/2, y5 = Global.GetScreenSize()[1]/2; var x6 = Global.GetScreenSize()[0]/2, y6 = Global.GetScreenSize()[1]/2;
var x7 = Global.GetScreenSize()[0]/2, y7 = Global.GetScreenSize()[1]/2; var x8 = Global.GetScreenSize()[0]/2, y8 = Global.GetScreenSize()[1]/2;

// Our killstreak count
var iKills = 0;    //count of our kills

// Only now we can operate with text location

// HUD_REDRAW
function hud()
{
    if (!Entity.IsAlive(Entity.GetLocalPlayer())) return;
   
    if(iKills == 1)  
        Render.String(x+=1, y+=1, 1, "EXCELLENT", [ 255,50,50,255 ], 30);
    else if(iKills == 2)
        Render.String(x2-=1, y2+=1, 1, "DOUBLE KILL", [ 255,180,30,255 ], 30);
    else if(iKills == 3)      
        Render.String(x3+=1, y3-=1, 1, "TRIPLE KILL", [ 100,200,200,255 ], 30);  
    else if(iKills == 4)
        Render.String(x4-=1, y4-=1, 1, "ULTRA KILL", [ 255,180,30,255 ], 30);
    else if(iKills == 5)
        Render.String(x5-=1, y5+=1, 1, "MULTI KILL", [ 240,180,255, 255 ], 30);
    else if(iKills == 6)
        Render.String(x6+=1, y6-=1, 1, "RAMPAGE", [ 100,220,200,255 ], 30);
    else if(iKills == 7)
        Render.String(x7-=1, y7-=1, 1, "MONSTER KILL", [ 255,220,200,255 ], 30);
    else if(iKills == 8)  
        Render.String(x8+=1, y8-=1, 1, "KILLING SPREE", [ 100,220,200,255 ], 30);

    // Comment this crap if you don't want too see it
    var x10 = Global.GetScreenSize()[0]/2, y10 = Global.GetScreenSize()[1]/2;
    Render.String(x10, y10-200, 1, "Killstreak count: %s"+iKills, [ 255,50,50,255 ], 30);
   
}

// EVENT DEATH
function event_player_death()
{  
    //reset here HUD posistion if we got over 9 kills
    if(iKills >=9)
    {
        x = Global.GetScreenSize()[0]/2, y = Global.GetScreenSize()[1]/2; x2 = Global.GetScreenSize()[0]/2, y2 = Global.GetScreenSize()[1]/2; x3 = Global.GetScreenSize()[0]/2, y3 = Global.GetScreenSize()[1]/2;
        x4 = Global.GetScreenSize()[0]/2, y4 = Global.GetScreenSize()[1]/2; x5 = Global.GetScreenSize()[0]/2, y5 = Global.GetScreenSize()[1]/2; x6 = Global.GetScreenSize()[0]/2, y6 = Global.GetScreenSize()[1]/2;
        x7 = Global.GetScreenSize()[0]/2, y7 = Global.GetScreenSize()[1]/2; x8 = Global.GetScreenSize()[0]/2, y8 = Global.GetScreenSize()[1]/2;  
        iKills=0;          
    }

    iVictim = Event.GetInt("userid"); iVictim_index = Entity.GetEntityFromUserID(iVictim);
    iAttacker = Event.GetInt("attacker"); iAttacker_index = Entity.GetEntityFromUserID(iAttacker);
    if(Entity.GetLocalPlayer()==iVictim_index && Entity.GetLocalPlayer( )!==iAttacker_index)    return;  
   
    // a kill count
    if(Entity.GetLocalPlayer( )==iAttacker_index)    iKills++;  
}

function Main()
{
   Global.RegisterCallback("Draw","hud");
   Global.RegisterCallback("player_death","event_player_death");
}  

Main();