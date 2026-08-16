UI.AddColorPicker("Crosshair Colour 1");
UI.AddColorPicker("Crosshair Colour 2");

screen_size = Render.GetScreenSize();

function draw_crosshair()
{
    local_player = Entity.GetLocalPlayer();
  
    if (!Entity.IsAlive(local_player))
        return;
  
    colour1 = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Crosshair Colour 1");
    colour2 = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Crosshair Colour 2");

    is_scoped = Entity.GetProp(local_player, "CCSPlayer", "m_bIsScoped");
    if (is_scoped)
    {
        Render.GradientRect(screen_size[0] / 2, 0, 1, screen_size[1] / 2, 0, colour2, colour1);
        Render.GradientRect(screen_size[0] / 2, screen_size[1] / 2, 1, screen_size[1] / 2, 0, colour1, colour2);

        Render.GradientRect(0, screen_size[1] / 2, screen_size[0] / 2, 1, 1, colour2, colour1);
        Render.GradientRect(screen_size[0] / 2, screen_size[1] / 2, screen_size[0] / 2, 1, 1, colour1, colour2);
    }
}

Cheat.RegisterCallback("Draw", "draw_crosshair");