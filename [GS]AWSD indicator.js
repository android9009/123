// Coded by Steffy

function GetValue(name)
{
    return UI.GetValue("Misc", "JAVASCRIPT", "Script items", name);
}
function GetColor(picker)
{
    return UI.GetColor("Misc", "JAVASCRIPT", "Script items", picker);
}

UI.AddCheckbox("Draw WASD");
    UI.AddColorPicker("WASD text color");
    UI.AddColorPicker("WASD passive color");
    UI.AddColorPicker("WASD active color");
    UI.AddSliderInt("Box spacing", 0, 5);
    UI.AddSliderInt("WASD x_pos", 0, Render.GetScreenSize()[0]);
    UI.AddSliderInt("WASD y_pos", 0, Render.GetScreenSize()[1]);

function onPaint()
{
    var x = GetValue("WASD x_pos");
    var y = GetValue("WASD y_pos");

    var spacing = GetValue("Box spacing");
    var active = GetColor("WASD active color");
    var passive = GetColor("WASD passive color");
    var text = GetColor("WASD text color");

    if (GetValue("Draw WASD"))
    {
        if (Input.IsKeyPressed(0x57))
        {
            Render.FilledRect(x, y, 50, 50, active);
        }
        else { Render.FilledRect(x, y, 50, 50, passive); }

        if (Input.IsKeyPressed(0x41))
        {
            Render.FilledRect(x - 50 - spacing, y + 50 + spacing, 50, 50, active);
        }
        else { Render.FilledRect(x - 50 - spacing, y + 50 + spacing, 50, 50, passive); }

        if (Input.IsKeyPressed(0x53))
        {
            Render.FilledRect(x, y + 50 + spacing, 50, 50, active);
        }
        else { Render.FilledRect(x, y + 50 + spacing, 50, 50, passive); }

        if (Input.IsKeyPressed(0x44))
        {
            Render.FilledRect(x + 50 + spacing, y + 50 + spacing, 50, 50, active);
        }
        else { Render.FilledRect(x + 50 + spacing, y + 50 + spacing, 50, 50, passive); }

        Render.String(x + 10, y + 7, 0, "W", text, 4);
        Render.String(x - 35 - spacing, y + 55 + spacing, 0, "A", text, 4);
        Render.String(x + 16, y + 55 + spacing, 0, "S", text, 4);
        Render.String(x + 63 + spacing, y + 55 + spacing, 0, "D", text, 4);
    }
}

Cheat.RegisterCallback("Draw", "onPaint");