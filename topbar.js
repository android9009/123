// Coded by  Steffy

var callback = Cheat.RegisterCallback
var addCheck = UI.AddCheckbox
var getValue = UI.GetValue
var addLabel = UI.AddLabel
var rainbow = Render.GradientRect

var screen_x = Global.GetScreenSize()

addLabel("-----------------------------")
    addCheck("Top Bar")

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
    if (getValue("Misc", "JAVASCRIPT", "Script items", "Top Bar"))
    {
        var colors = HSVtoRGB(Global.Realtime() * 0.07, 1, 1)

        rainbow(0, 0, screen_x[0], 3, 1, [colors.g, colors.b, colors.r, 255], [colors.r, colors.g, colors.b, 255]);
    }
}

addLabel("-----------------------------")

callback("Draw", "TopBar_paint")