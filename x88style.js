var screensize = Global.GetScreenSize();
UI.AddCheckbox("Enable Watermark");
UI.AddSliderInt("Watermark x", 0, screensize[0]);
UI.AddSliderInt("Watermark y", 0, screensize[1]);

function main()
{
    //time
    var today = new Date();
    var hours1 = today.getHours();
    var minutes1 = today.getMinutes();
    var seconds1 = today.getSeconds();
    var hours = hours1 <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":";
    var minutes = minutes1 <= 9 ? "0" + today.getMinutes() + ":" : today.getMinutes() + ":";
    var seconds = seconds1 <= 9 ? "0" + today.getSeconds() : today.getSeconds()    ;
    
    var lp = Entity.GetLocalPlayer();
    var x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Watermark x");
    var y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Watermark y");
    var get_server = World.GetServerString()
    var get_map = World.GetMapName()
    var get_forum_name = Cheat.GetUsername()
    var get_tick = Globals.Tickrate()
    const get_ping = Entity.GetProp(lp, "CPlayerResource", "m_iPing")
    var ent_name = Entity.GetName(lp)
    var get_kills = Entity.GetProp(lp, "CPlayerResource", "m_iKills" )
    var get_deaths = Entity.GetProp(lp, "CPlayerResource", "m_iDeaths" )
    var get_kd = get_kills/get_deaths
    if (Entity.GetProp(lp, "CPlayerResource", "m_iDeaths") != 0) {
        var unfixed = Entity.GetProp(lp, "CPlayerResource", "m_iKills") / Entity.GetProp(lp, "CPlayerResource", "m_iDeaths");
        var get_kd = unfixed.toFixed(2)
    }
    else {
        get_kd = get_kills
    }
    
    if(UI.GetValue("Enable Watermark") == true) {
            font = Render.AddFont("Tahoma", 10, 700)
            UI.SetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Watermark", false);
            
            if(Entity.IsValid(lp) == true || Entity.IsAlive(lp))    {

            Render.StringCustom(x+1, y+1, 0, "Hello "+ get_forum_name +" :)   ["+ hours + minutes + seconds +"]   "+ get_server +"   "+ get_tick +"tick",[0, 0, 0, 255] , font );
            Render.StringCustom(x+1, y-1, 0, "Hello "+ get_forum_name +" :)   ["+ hours + minutes + seconds +"]   "+ get_server +"   "+ get_tick +"tick",[0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y+1, 0, "Hello "+ get_forum_name +" :)   ["+ hours + minutes + seconds +"]   "+ get_server +"   "+ get_tick +"tick",[0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y-1, 0, "Hello "+ get_forum_name +" :)   ["+ hours + minutes + seconds +"]   "+ get_server +"   "+ get_tick +"tick",[0, 0, 0, 255] , font );
            Render.StringCustom(x, y, 0, "Hello "+ get_forum_name +" :)   ["+ hours + minutes + seconds +"]   "+ get_server +"   "+ get_tick +"tick",[255, 255, 0, 255] , font );

            Render.StringCustom(x+1, y+13+1, 0, "Localplayer  "+ ent_name +"   "+ get_map,[0, 0, 0, 255] , font );
            Render.StringCustom(x+1, y+13-1, 0, "Localplayer  "+ ent_name +"   "+ get_map,[0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y+13+1, 0, "Localplayer  "+ ent_name +"   "+ get_map,[0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y+13-1, 0, "Localplayer  "+ ent_name +"   "+ get_map,[0, 0, 0, 255] , font );
            Render.StringCustom(x, y+13, 0, "Localplayer  "+ ent_name +"   "+ get_map,[255, 255, 0, 255] , font );

            Render.StringCustom(x+1, y+39+1, 0, "Kills:",[0, 0, 0, 255] , font );   Render.StringCustom(x+70+1, y+39+1, 0, ""+get_kills, [0, 0, 0, 255] , font );
            Render.StringCustom(x+1, y+39-1, 0, "Kills:",[0, 0, 0, 255] , font );   Render.StringCustom(x+70+1, y+39-1, 0, ""+get_kills, [0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y+39+1, 0, "Kills:",[0, 0, 0, 255] , font );   Render.StringCustom(x+70-1, y+39+1, 0, ""+get_kills, [0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y+39-1, 0, "Kills:",[0, 0, 0, 255] , font );   Render.StringCustom(x+70-1, y+39-1, 0, ""+get_kills, [0, 0, 0, 255] , font );
            Render.StringCustom(x, y+39, 0, "Kills:",[255, 255, 255, 255] , font ); Render.StringCustom(x+70, y+39, 0, ""+get_kills, [255, 255, 255, 255] , font );

            Render.StringCustom(x+1, y+52+1, 0, "Deaths:",[0, 0, 0, 255] , font );  Render.StringCustom(x+70+1, y+52+1, 0, ""+get_deaths, [0, 0, 0, 255] , font );
            Render.StringCustom(x+1, y+52-1, 0, "Deaths:",[0, 0, 0, 255] , font );  Render.StringCustom(x+70+1, y+52-1, 0, ""+get_deaths, [0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y+52+1, 0, "Deaths:",[0, 0, 0, 255] , font );  Render.StringCustom(x+70-1, y+52+1, 0, ""+get_deaths, [0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y+52-1, 0, "Deaths:",[0, 0, 0, 255] , font );  Render.StringCustom(x+70-1, y+52-1, 0, ""+get_deaths, [0, 0, 0, 255] , font );
            Render.StringCustom(x, y+52, 0, "Deaths:",[255, 255, 255, 255] , font );    Render.StringCustom(x+70, y+52, 0, ""+get_deaths, [255, 255, 255, 255] , font );
                
            Render.StringCustom(x+1, y+65+1, 0, "KD:",[0, 0, 0, 255] , font );  Render.StringCustom(x+70+1, y+65+1, 0, ""+get_kd, [0, 0, 0, 255] , font );
            Render.StringCustom(x+1, y+65-1, 0, "KD:",[0, 0, 0, 255] , font );  Render.StringCustom(x+70+1, y+65-1, 0, ""+get_kd, [0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y+65+1, 0, "KD:",[0, 0, 0, 255] , font );  Render.StringCustom(x+70-1, y+65+1, 0, ""+get_kd, [0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y+65-1, 0, "KD:",[0, 0, 0, 255] , font );  Render.StringCustom(x+70-1, y+65-1, 0, ""+get_kd, [0, 0, 0, 255] , font );
            Render.StringCustom(x, y+65, 0, "KD:",[255, 255, 255, 255] , font );    Render.StringCustom(x+70, y+65, 0, ""+get_kd, [255, 255, 255, 255] , font );

            Render.StringCustom(x+1, y+78+1, 0, "Ping:",[0, 0, 0, 255] , font );    Render.StringCustom(x+70+1, y+78+1, 0, ""+get_ping, [0, 0, 0, 255] , font );
            Render.StringCustom(x+1, y+78-1, 0, "Ping:",[0, 0, 0, 255] , font );    Render.StringCustom(x+70+1, y+78-1, 0, ""+get_ping, [0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y+78+1, 0, "Ping:",[0, 0, 0, 255] , font );    Render.StringCustom(x+70-1, y+78+1, 0, ""+get_ping, [0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y+78-1, 0, "Ping:",[0, 0, 0, 255] , font );    Render.StringCustom(x+70-1, y+78-1, 0, ""+get_ping, [0, 0, 0, 255] , font );
            Render.StringCustom(x, y+78, 0, "Ping:",[255, 255, 255, 255] , font );  Render.StringCustom(x+70, y+78, 0, ""+get_ping, [255, 255, 255, 255] , font );

            Render.StringCustom(x+1, y+91+1, 0, "Fps:",[0, 0, 0, 255] , font );
            Render.StringCustom(x+1, y+91-1, 0, "Fps:",[0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y+91+1, 0, "Fps:",[0, 0, 0, 255] , font );
            Render.StringCustom(x-1, y+91-1, 0, "Fps:",[0, 0, 0, 255] , font );
            Render.StringCustom(x, y+91, 0, "Fps:",[255, 255, 255, 255] , font );
            }
        }
    }


function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
var oldTick = Global.Tickcount()
var ticksToDelay = 1 //1 second you can do the math from this point :D

var alpha = 255
var up = true

function rainbowfps()
{
    var lp = Entity.GetLocalPlayer();
    var x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Watermark x");
    var y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Watermark y");

    if(UI.GetValue("Enable Watermark") == true){
        if(Entity.IsValid(lp) == true || Entity.IsAlive(lp)){
        const fps = Math.floor( 1 / Global.Frametime() );
        tickcount = Global.Tickcount();
        color = HSVtoRGB(tickcount % 350 / 350, 1, 1, 1, 255);
        font = Render.AddFont("Tahoma", 10, 700)

        Render.StringCustom(x+70+1, y+91+1, 0, ""+ fps, [0, 0, 0, 255] , font );
        Render.StringCustom(x+70+1, y+91-1, 0, ""+ fps, [0, 0, 0, 255] , font );
        Render.StringCustom(x+70-1, y+91+1, 0, ""+ fps, [0, 0, 0, 255] , font );
        Render.StringCustom(x+70-1, y+91-1, 0, ""+ fps, [0, 0, 0, 255] , font );
        Render.StringCustom(x+70, y+91, 0, ""+ fps, [color.r, color.g, color.b, alpha] , font );
        }
    }
}
Global.RegisterCallback("Draw", "rainbowfps")
Global.RegisterCallback("Draw", "main")