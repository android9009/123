ss = Render.GetScreenSize();

UI.AddDropdown("Charge Indicator Style", ["Simple", "FlatUI", "Crosshair"])
UI.AddSliderInt("Charge Indicator | X-Pos", 1, ss[0])
UI.AddSliderInt("Charge Indicator | Y-Pos", 1, ss[1])
UI.AddCheckbox("Charge Indicator | Pulse")
UI.AddColorPicker("Charge Indicator | Color")

function DTIndicators()
{

    x = UI.GetValue("Script items", "Charge Indicator | X-Pos")
    y = UI.GetValue("Script items", "Charge Indicator | Y-Pos")

    style = UI.GetValue ("Script items", "Charge Indicator Style")
    color = UI.GetColor("Script items", "Charge Indicator | Color")
    pulseColor = UI.GetColor("Script items", "Charge Indicator | Pulse Color")
    maxPulseAlpha = UI.GetValue("Script items", "Charge Indicator | Max pulse alpha")

    const alpha = Math.sin(Math.abs(-Math.PI + (Globals.Curtime() * (1 / 0.25)) % (Math.PI * 2))) * 125;
    var charge = Exploit.GetCharge()

    if(!Entity.IsValid(Entity.GetLocalPlayer())) { return; }
    
    if(!UI.GetValue("Rage", "GENERAL", "Exploit", "Doubletap") || (!UI.IsHotkeyActive("Rage", "GENERAL", "Exploit", "Doubletap") || (!UI.GetValue("Rage", "GENERAL", "Exploit", "Doubletap instant")))) { return;}

    if(style == 0) // Simple
    {

        Render.FilledRect(x + 15, y + 55, charge * 50, 5, color)   

        if(UI.GetValue ("Script items", "Charge Indicator | Pulse"))
        {

            if(charge < 1)
            {
                Render.String(x + 20, y + 20, 0, "DT", [color[0], color[1], color[2], alpha], 4);
            } else {
                Render.String(x + 20, y + 20, 0, "DT", color, 4)
            }

        } else {
            Render.String(x + 20, y + 20, 0, "DT", color, 4)
        }
    }

    if(style == 1) // FlatUI
    {

        Render.FilledRect(x - 5, y - 5, 90, 90, [20, 20, 20, 255])
        Render.Rect(x, y, 80, 80, [40, 40, 40, 255])
        Render.GradientRect(x, y, 80, 5, 180, color, [color[0], color[1] + 10, color[2] + 25, 255]);
        Render.FilledRect(x + 15, y + 55, charge * 50, 5, color)

        if(UI.GetValue ("Script items", "Charge Indicator | Pulse"))
        {

            if(charge < 1)
            {
                Render.String(x + 20, y + 20, 0, "DT", [color[0], color[1], color[2], alpha], 4);
            } else {
                Render.String(x + 20, y + 20, 0, "DT", color, 4)
            }

        } else {
            Render.String(x + 20, y + 20, 0, "DT", color, 4)
        }
    }

    if(style == 2) // Crosshair
    {

        x = ss[0] / 2
        y = ss[1] / 2

        if(charge < 1)
        {
            Render.FilledRect(x + 20, y + 20, charge * 50, 5, color)
        } else {
            Render.String(x + 26, y + 20, 0, "DT", color, 4)
        }
    }
}

Cheat.RegisterCallback("Draw", "DTIndicators")