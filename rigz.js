    UI.AddSliderInt("x offset[keylist]", 0, Render.GetScreenSize()[0])
    UI.AddSliderInt("y offset[keylist]", 0, Render.GetScreenSize()[1])
    UI.AddSliderInt("x offset[watermark]", 0, Render.GetScreenSize()[0])
    UI.AddSliderInt("y offset[watermark]", 0, Render.GetScreenSize()[1])
    UI.AddColorPicker("Color")
function skeet_keys()
{
//
//
//
    var str = [];

    if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))
    {
        str.push("Double tap")
    }
    if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots"))
    {
        str.push("On-shot")
    }
    if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim"))
    {
        str.push("Body aim")
    }
    if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point"))
    {
        str.push("Safe points")
    }
    if (UI.IsHotkeyActive("Misc", "GENERAL", "Movement", "Auto peek"))
    {
        str.push("Auto peek")
    }
    if (UI.IsHotkeyActive("Visual", "WORLD", "View", "Thirdperson"))
    {
        str.push("Third person")
    }
    if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck"))
    {
        str.push("Fake duck")
    }
    if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk"))
    {
        str.push("Slow walk")
    }
    if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter"))
    {
        str.push("AA Invented")
    }
//
//

    const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "x offset[keylist]")
    const y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "y offset[keylist]")
    Render.FilledRect(x, y, 190, 25, [0,0,0,150])
    Render.FilledRect(x, y, 190, 2, UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Color"))
    Render.FilledRect(x, y + 24, 190, 20 + 18 * (str.length - 1), [0,0,10,28]) //cikl + hotkeys
    Render.String(x + 90, y + 7, 3, "hotkey list", [255,255,255,255], 10)
       


    for (i = 0; i < str.length; i++)
    {
        Render.String(x + 8, y + 31 + 15 * i, 0, str[i], [255,255,255,255], 10)
        Render.String(x + 145, y + 31 + 15 * i, 3, "[toggled]", [255,255,255,255], 10)
    }
}

var screen_x = Global.GetScreenSize() //


UI.AddCheckbox("Top Bar")

function HSVtoRGB(h, s, v)
{
    var r, g, b, i, f, p, q, t

    i = Math.floor(h * 6)
    f = h * 6 - i
    p = v * (1 - s)
    q = v * (1 - f * s)
    t = v * (1 - (1 - f) * s)

    switch (i % 6)
    {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
}

function TopBar_paint()
{
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Top Bar"))
    {
        var colors = HSVtoRGB(Global.Realtime() * 0.07, 1, 1)
        Render.GradientRect(0, 0, screen_x[0], 3, 1, [colors.g, colors.b, colors.r, 255], [colors.r, colors.g, colors.b, 255]);
    }
}

  function skeet_watermark()
{
    const x1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "x offset[watermark]")
    const y1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "y offset[watermark]")
    Render.FilledRect(x1, y1, 310, 20, [0,0,0,150])
    Render.FilledRect(x1, y1, 310, 2, UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Color"))
   
    var ping = 1 / Local.Latency()
    var ply_ping = Math.floor(ping)
    var rate = 1 / Globals.Tickrate()
    var tickrate = Math.floor(rate)
    var framerate = 1 / Globals.Frametime()
    var fps = Math.floor(framerate)
 
   Render.String(x1, y1 + 6, 0, "DT [rigzscord] |  tickbase(v): 14  |  speed: Instant 2x" , [255,255,255,255], 8)
 
    //Render.String(x1 + 250, y1 + 5, 4, "tick:" + tickrate, [255,255,255,255], 14)
    if (ping == 0)
    {
       // Render.String(x1 + 150, y1 + 5, 4, "ping: 0", [255,255,255,255], 14)
    }
    else
    {
        //Render.String(x1 + 150, y1 + 5, 4, "ping:" + ply_ping, [255,255,255,255], 14)
    }

}


Cheat.RegisterCallback("Draw", "skeet_watermark")
Cheat.RegisterCallback("Draw", "skeet_keys")
Cheat.RegisterCallback("Draw", "TopBar_paint")