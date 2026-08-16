var grenades = [];

UI.AddSliderInt("Trail Length", 16, 512);
UI.AddSliderFloat("Position Refresh Rate", 0, 1);
UI.AddCheckbox("Nade Circle");
UI.AddColorPicker("Trail Color");
UI.AddColorPicker("Circle Color");

function importGrenades() {
    base_nades = Entity.GetEntitiesByClassID(9).concat(Entity.GetEntitiesByClassID(156)).concat(Entity.GetEntitiesByClassID(48));
    for (e in base_nades) {
        pass = false;
        for (g in grenades) {
            if (grenades[g][0] == base_nades[e]) {
                pass = true;
                continue;
            }
        }
        if (pass)
            continue;

        grenades.push([base_nades[e], Globals.Curtime(), [Entity.GetRenderOrigin(base_nades[e])], Globals.Curtime()]);
    }
}

function renderTrails() {
    length = UI.GetValue("Script items", "Trail Length");
    rate = UI.GetValue("Script items", "Position Refresh Rate");
    t_color = UI.GetColor("Script items", "Trail Color");
    c_color = UI.GetColor("Script items", "Circle Color");

    for (g in grenades) {
        if (Globals.Curtime() - grenades[g][3] > 3 || !Entity.IsValid(grenades[g][0])) {
            grenades.shift();
            continue;
        }

        if (Globals.Curtime() - grenades[g][1] > rate) {
            if (grenades[g][2].length > length) {
                grenades[g][2].shift();
                grenades[g][1] = Globals.Curtime();
            }

            grenades[g][2].push(Entity.GetRenderOrigin(grenades[g][0]));
        }

        for (l in grenades[g][2]) {
            world = Render.WorldToScreen(grenades[g][2][l]);
            if (l > 0) {
                world_last = Render.WorldToScreen(grenades[g][2][l - 1]);
                Render.Line(world[0], world[1], world_last[0], world_last[1], t_color);
            }

            world_last = Render.WorldToScreen(grenades[g][2][grenades[g][2].length - 1]);

            if (UI.GetValue("Script items", "Nade Circle"))
                Render.FilledCircle(world_last[0], world_last[1], 5, c_color);

        }
    }
}

Cheat.RegisterCallback("Draw", "renderTrails");
Cheat.RegisterCallback("Draw", "importGrenades");