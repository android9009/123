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

    const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_x"),
            y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_y");
    const x1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_x1"),
            y1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_y1");

    if(UI.GetValue( "Rage", "GENERAL", "Exploits", "Doubletap" ))
    {
        font = Render.AddFont("Verdana", 16, 500);
           const fontpixel = Render.AddFont( "Verdana", 7, 100);
     
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
                 
                Render.FilledRect(x + 1674, y + 30, 230, 20, [15, 15, 15, 255]);
                Render.FilledRect(x + 1674, y + 30, 3, 20, [224, 61, 61, 255]);
                Render.StringCustom(x + 1790, y + 34, 1, "DT [v2.0.9 beta] | tickbase(0): 0 | state: 0", [255, 255, 255, 255], fontpixel);
                Render.StringCustom(Global.GetScreenSize()[0]/49+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-349+UI.GetValue(Yoffset), 1, "DT", [ 0, 0, 0, 255 ], font);  
                Render.StringCustom(Global.GetScreenSize()[0]/50+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-350+UI.GetValue(Yoffset), 1, "DT", [ 255, 0, 0, 255 ], font);  
            }
            else
            {
                Render.FilledRect(x + 1674, y + 30, 232, 20, [15, 15, 15, 255]);
                Render.FilledRect(x + 1674, y + 30, 3, 20, [224, 61, 61, 255]);
                Render.StringCustom(x + 1791, y + 34, 1, "DT [v2.0.9 beta] | tickbase(1): 16 | state: 2", [255, 255, 255, 255], fontpixel);
                Render.StringCustom(Global.GetScreenSize()[0]/49+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-349+UI.GetValue(Yoffset), 1, "DT", [ 0, 0, 0, 255 ], font);    
                Render.StringCustom(Global.GetScreenSize()[0]/50+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-350+UI.GetValue(Yoffset), 1, "DT", [ 255, 255, 255, 255 ], font);    
                shotsfired = 0;    //Released
            }    
        }
        else
        {
            //Disabled
            Render.StringCustom(Global.GetScreenSize()[0]/50+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-350+UI.GetValue(Yoffset), 1, "DT", [ 255, 50, 50, 0 ], font);
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