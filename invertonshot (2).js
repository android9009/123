var time, delay, shotsfired;

//Weapon fire event
function EVENT_WEAPON_FIRE()
{
    iShotsFired = Event.GetInt("userid"); iShotsFired_index = Entity.GetEntityFromUserID(iShotsFired);
    
    if(Entity.GetLocalPlayer() == iShotsFired_index)
    {
        //Released only once
        if(shotsfired == 0)
        {   
            time = Globals.Curtime();
            delay = time+0.9;           
        }       
    }       
}

function HUD_REDRAW()
{
    curtime = Globals.Curtime();
    
    if (curtime <= delay)
    {   
        shotsfired = 1;
        UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
        //Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/2, 0, "works", [255,255,255,255], 4);   
    }
    else
    {
        UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
        shotsfired = 0;
        //Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/2, 0, "not works", [255,255,255,255], 4);
    }   
}

function getValue(name)
{
    var value = UI.GetValue('Script Items', name);

    return value;
}

function Main()
{
    Global.RegisterCallback("weapon_fire", "EVENT_WEAPON_FIRE");
    Global.RegisterCallback("Draw", "HUD_REDRAW");
}

Main();