var time, delay, fillbar, shotsfired;
var Xoffset = 'X offset';
var Yoffset = 'Y offset';

//Weapon fire event
function EVENT_WEAPON_FIRE()
{
    iShotsFired = Event.GetInt("userid"); iShotsFired_index = Entity.GetEntityFromUserID(iShotsFired);
 
    if(Entity.GetLocalPlayer() == iShotsFired_index)
    {
        if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap", "Enabled"))
        {
            //Released only once
            if(shotsfired == 0)
            {
                time = Globals.Curtime();
                delay = time+0.3;
                fillbar = 0;
            }            
        }    
    }    
}

//Draw
function HUD_REDRAW()
{
    if(UI.GetValue( "Rage", "GENERAL", "Exploits", "Doubletap" ))
    {
        font = Render.AddFont("Segoe UI Semibold", 20, 700);
     
        //Enabled
        if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap", "Enabled"))
        {
            curtime = Globals.Curtime();
         
            //>_<
            if (curtime <= delay)
            {
                fillbar+=2;
                shotsfired = 1;    
             
                //Not allowing fill more
                if(fillbar >= 30) fillbar = 30;
                 
                Render.StringCustom(Global.GetScreenSize()[0]/20+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-100+UI.GetValue(Yoffset), 1, "DT", [ 255, 50, 50, 255 ], font);
                Render.FilledRect(Global.GetScreenSize()[0]/20-17+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-64+UI.GetValue(Yoffset), 32, 5, [ 0, 0, 0, 150 ]);
                Render.FilledRect(Global.GetScreenSize()[0]/20-16+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-63+UI.GetValue(Yoffset), fillbar, 3, [ 30, 150, 255, 150 ]);            
            }
            else
            {

                Render.StringCustom(Global.GetScreenSize()[0]/20+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-100+UI.GetValue(Yoffset), 1, "DT", [ 30, 150, 255, 255 ], font);    
                shotsfired = 0;    //Released
            }    
        }
        else
        {
            //Disabled
            Render.StringCustom(Global.GetScreenSize()[0]/20+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-100+UI.GetValue(Yoffset), 1, "DT", [ 255, 50, 50, 255 ], font);
        }    
    }    
}

function Main()
{
    Global.RegisterCallback("Draw", "HUD_REDRAW");
    Global.RegisterCallback("weapon_fire", "EVENT_WEAPON_FIRE");
    UI.AddSliderInt(Xoffset, -1000, 2000);
    UI.AddSliderInt(Yoffset, -1000, 1000);
}

Main();