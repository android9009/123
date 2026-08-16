// This java skript create Lucer <3

UI.AddLabel("--------------------------")

UI.AddLabel("Keylist settings")
    /*UI.AddCheckbox("keylist line")
        UI.AddColorPicker("keylist line color")
    UI.AddCheckbox("main outline")
        UI.AddColorPicker("main outline color")
    UI.AddCheckbox("list outline")
        UI.AddColorPicker("list outline color")*/
    UI.AddSliderInt("x offset[keylist]", 0, Render.GetScreenSize()[0])
    UI.AddSliderInt("y offset[keylist]", 0, Render.GetScreenSize()[1])
UI.AddLabel("Watermark settings")
    UI.AddSliderInt("x offset[watermark]", 0, Render.GetScreenSize()[0])
    UI.AddSliderInt("y offset[watermark]", 0, Render.GetScreenSize()[1])
    UI.AddColorPicker("watermark line color")

function neverlose_keys()
{
//
//
//
    var str = [];

    if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))
    {
        str.push("Doubletap")
    }
    if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots"))
    {
        str.push("Hide shots")
    }
    if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim"))
    {
        str.push("Baim")
    }
    if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point"))
    {
        str.push("Safe points")
    }
    if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Resolver override"))
    {
        str.push("Resolver override")
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
        str.push("Inverted AA")
    }
//
//
//

    const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "x offset[keylist]")
    const y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "y offset[keylist]")

    Render.FilledRect(x, y, 185, 23, [0,0,50,250])
    Render.FilledRect(x, y + 23, 185, 19.5 + 15 * (str.length - 1.15), [0,0,20,250])

/*    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "main outline"))
    {
        var mo_color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "main outline color")
        Render.Rect(x, y, 185, 23, mo_color)
    }

    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "list outline"))
    {
        var lo_color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "list outline color")
        Render.Rect(x, y + 23, 185, 19.5 + 15 * (str.length - 1.15), lo_color)
    }

    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "keylist line"))
    {
        var kl_color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "keylist line color")
        Render.FilledRect(x, y + 20, 185, 3, kb_color)
    }*/

    Render.String(x + 65, y + 5, 0, "KeyBinds", [255,255,255,255], 1)

    for (i = 0; i < str.length; i++)
    {
        Render.String(x + 1, y + 24 + 15 * i, 0, str[i], [255,255,255,255], 1)
        Render.String(x + 145, y + 24 + 15 * i, 0, "active", [255,255,255,255], 1)
    }
}

function neverlose_watermark()
{
    const x1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "x offset[watermark]")
    const y1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "y offset[watermark]")

    var ping = 1 / Local.Latency()
    var ping1 = Math.floor(ping)
    var rate = 1 / Globals.Tickrate()
    var tickrate = Math.floor(rate)
    var framerate = 1 / Globals.Frametime()
    var fps = Math.floor(framerate)

    Render.FilledRect(x1, y1 + 3, 240, 20, [0,0,20,255])

    var wm_color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "watermark line color")
    Render.FilledRect(x1, y1, 240, 3, wm_color)

    Render.String(x1 + 2, y1 + 7, 0, "HARDLINE", [255,255,255,255], 8)
    Render.String(x1 + 71, y1 + 7, 0, "|", [255,255,255,255], 8)
    Render.String(x1 + 78, y1 + 7, 0, "delay:", [255,255,255,255], 8)

    if (ping1 = Infinity)
    {
        Render.String(x1 + 115, y1 + 7, 0, " 0", [255,255,255,255], 8)
    }
    else if (ping != Infinity)
    {
        Render.String(x1 + 115, y1 + 7, 0, " " + ping1, [255,255,255,255], 8)
    }

    Render.String(x1 + 131, y1 + 7, 0, "|", [255,255,255,255], 8)

    Render.String(x1 + 139, y1 + 7, 0,  tickrate + "tick", [255,255,255,255], 8)

    Render.String(x1 + 182, y1 + 7, 0, "|", [255,255,255,255], 8)
    Render.String(x1 + 190, y1 + 7, 0, "fps:", [255,255,255,255], 8)
    Render.String(x1 + 215, y1 + 7, 0, "" + fps, [255,255,255,255], 8)
}

UI.AddLabel("--------------------------")

function main()
{
    Cheat.RegisterCallback("Draw", "neverlose_keys")
    Cheat.RegisterCallback("Draw", "neverlose_watermark")
}
main();