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

function valueEe(name)
{
    var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", name);
    return value;
}
var kills = 0;
var deaths = 0;

function infobar()
{   
      
    colors = HSVtoRGB(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Infobar color speed"), 1, 1);
    x = valueEe("Infobar X");
    y = valueEe("Infobar Y"); 
    Render.FilledRect( x + 46, y , 324, 41, [ 10, 10, 10, 255 ] );
    Render.FilledRect( x + 50, y + 7, 315, 32 , [ 0, 0, 25, 255 ] );
    Render.Rect( x + 50, y + 5, 315, 32, [ 50, 50, 50, 255 ] );
    Render.GradientRect(x + 50, y + 5, 315, 1, 1, [colors.g, colors.b, colors.r, 255], [colors.r, colors.g, colors.b, 255]);
    var font = Render.AddFont("Comic Sans MS", 8, 800)



    const map = World.GetMapName();
    const tickrate = Global.Tickrate()
    const fps = Math.floor( 1 / Global.Frametime() );
    const ping = Math.floor(Global.Latency() * 1000 / 1.5 );
    // FPS
    Render.StringCustom( x + 78, y + 13, 1, "FPS: ", [ 255, 255, 255, 255 ], font );
    Render.StringCustom( x + 101, y + 13, 1, "" + fps, [ 255, 255, 255, 255 ], font );

    // PING
    Render.StringCustom( x + 155, y + 13, 1, "PING: ", [ 255, 255, 255, 255 ], font );
    Render.StringCustom( x + 184, y + 13, 1, "" + ping, [ 255, 255, 255, 255 ], font );

    // KILLS
    Render.StringCustom( x + 233, y + 13, 1, "KILLS: ", [ 255, 255, 255, 255 ], font );
    Render.StringCustom( x + 258, y + 13, 1, "" + kills, [ 255, 255, 255, 255 ], font );

    // DEATHS
    Render.StringCustom( x + 311, y + 13, 1, "DEATHS: ", [ 255, 255, 255, 255 ], font );
    Render.StringCustom( x + 342, y + 13, 1, "" + deaths, [ 255, 255, 255, 255 ], font );




  
}

function deathsrecord() {
    if(Entity.IsLocalPlayer(Entity.GetEntityFromUserID(Event.GetInt("userid")))) {
        deaths += 1;
    }
}
function killsrecord() {
    if(Entity.IsLocalPlayer(Entity.GetEntityFromUserID(Event.GetInt("attacker")))) {
        kills += 1;
    }
}

function Main()
{
    var screensize = Global.GetScreenSize();
    UI.AddSliderInt("Infobar X", -45, screensize[0]);
    UI.AddSliderInt("Infobar Y", 0, screensize[1]);
    UI.AddSliderFloat('Infobar color speed', 0.0, 5.0);
}

Main()

Global.RegisterCallback("Draw", "infobar")
Global.RegisterCallback("player_death", "killsrecord");
Global.RegisterCallback("player_death", "deathsrecord");