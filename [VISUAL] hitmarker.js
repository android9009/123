/*
Quake Flying damage numbers...
Author https://onetap.su/members/tilestra.54952/
*/

//Vars
var iVictim_index, First_pos, Second_pos, Third_pos, Fourth_pos, Fifth_pos, First, Second, Third, Fourth, Five, iDamageCount = iOffsetCount = YOffsetFirst = YOffsetSecond = YOffsetThird = YOffsetFourth = YOffsetFive = loadFont = HitAttack = 0;  

//Store coordinates array
const first_screen_pos = [], second_screen_pos = [], third_screen_pos = [], fourth_screen_pos = [], fifth_screen_pos = [];

//>_<
//Damage event
function EVENT_PLAYER_HURT()
{
    //Get attacker
    iAttacker = Event.GetInt("attacker"); iAttacker_index = Entity.GetEntityFromUserID(iAttacker);
   
    //Get victim
    iVictim = Event.GetInt("userid"); iVictim_index = Entity.GetEntityFromUserID(iVictim);  
   
    if(Entity.GetLocalPlayer() == iVictim_index && Entity.GetLocalPlayer() !== iAttacker_index)    return;
   
    //BEGIN ANIM
    if(Entity.GetLocalPlayer() == iAttacker_index)
    {
        //First hit
        HitAttack = 1;
       
        //Reset every 5 hit
        if(iDamageCount == 5) iDamageCount = 0; if(iOffsetCount == 5) iOffsetCount = 0;
       
        //Collect them and set only 5 hits
        iDamageCount+=1;
       
        //This is offset for Y for each
        iOffsetCount+=1;        
       
        //This shit reads every hit with a new var...
        if(iDamageCount == 1)    {    First = Event.GetInt("dmg_health");    First_pos = Entity.GetRenderOrigin(iVictim_index);    }  
        if(iDamageCount == 2)    {    Second = Event.GetInt("dmg_health");    Second_pos = Entity.GetRenderOrigin(iVictim_index);    }              
        if(iDamageCount == 3)    {    Third = Event.GetInt("dmg_health");    Third_pos = Entity.GetRenderOrigin(iVictim_index);    }      
        if(iDamageCount == 4)    {    Fourth = Event.GetInt("dmg_health");    Fourth_pos = Entity.GetRenderOrigin(iVictim_index);    }      
        if(iDamageCount == 5)    {    Five = Event.GetInt("dmg_health");    Fifth_pos = Entity.GetRenderOrigin(iVictim_index);    }

        //Setup offsets
        if(iOffsetCount == 1)    YOffsetFirst = 255; if(iOffsetCount == 2)    YOffsetSecond = 255; if(iOffsetCount == 3)    YOffsetThird = 255; if(iOffsetCount == 4)    YOffsetFourth = 255; if(iOffsetCount == 5)    YOffsetFive = 255;              
    }      
}

function HUD_REDRAW()
{
    //Once and lock font load
    if(loadFont == 0)
    {
        //this font u can get here https://onetap.su/threads/beta-in-development-onetap-hud-engine-0-1-dev-18945-18952-dec-27-2019.13647/
        fontSM2 = Render.AddFont("Roboto Medium", 18, 100);
        loadFont = 1;
    }
   
    /*Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/2, 1, "" + iDamageCount, [ 255, 255, 255, 255 ], fontSM2);
    Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/2+50, 1, "" + iOffsetCount, [ 255, 255, 255, 255 ], fontSM2);*/

    //Stop flooding
    if(!HitAttack || !getCustomValue('Quake Damage Numbers'))    return;

    //Doing cycle through all players will affect on FPS heavily... so
    if(Entity.IsValid(iVictim_index))
    {
        //Push Y
        if(YOffsetFirst > 1)    YOffsetFirst--; if(YOffsetSecond > 1)    YOffsetSecond-=2; if(YOffsetThird > 1)    YOffsetThird-=3; if(YOffsetFourth > 1)    YOffsetFourth-=2; if(YOffsetFive > 1)    YOffsetFive--;  
   
        //Setup x,y,z
        if(iDamageCount == 1)    first_screen_pos = Render.WorldToScreen(First_pos);    if(iDamageCount == 2)    second_screen_pos = Render.WorldToScreen(Second_pos);
        if(iDamageCount == 3)    third_screen_pos = Render.WorldToScreen(Third_pos);    if(iDamageCount == 4)    fourth_screen_pos = Render.WorldToScreen(Fourth_pos);
        if(iDamageCount == 5)    fifth_screen_pos = Render.WorldToScreen(Fifth_pos);
           
        //Five pieces of damage, the hell
        Render.StringCustom(first_screen_pos[0]-15, first_screen_pos[1]-50+YOffsetFirst-255, 1, "" + First, [ 255, 255, 255, YOffsetFirst ], fontSM2);
        Render.StringCustom(second_screen_pos[0]+15, second_screen_pos [1]-50+YOffsetSecond-255, 1, "" + Second, [ 255, 255, 255, YOffsetSecond ], fontSM2);
        Render.StringCustom(third_screen_pos[0]-25, third_screen_pos[1]-50+YOffsetThird-255, 1, "" + Third, [ 255, 255, 255, YOffsetThird ], fontSM2);
        Render.StringCustom(fourth_screen_pos[0]+25, fourth_screen_pos[1]-50+YOffsetFourth-255, 1, "" + Fourth, [ 255, 255, 255, YOffsetFourth ], fontSM2);
        Render.StringCustom(fifth_screen_pos[0]-10, fifth_screen_pos[1]-50+YOffsetFive-255, 1, "" + Five, [ 255, 255, 255, YOffsetFive ], fontSM2);
    }      
}  

function getCustomValue(name)
{
    var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", name);
    return value;
}

function Main()
{
    Global.RegisterCallback("Draw", "HUD_REDRAW");
    Global.RegisterCallback("player_hurt", "EVENT_PLAYER_HURT");
    UI.AddCheckbox('Quake Damage Numbers');
}

Main();