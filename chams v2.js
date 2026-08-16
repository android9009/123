var materials = []

function createMat(name) {
    UI.AddColorPicker(name + " chams")
    var a = ["Hollow", "Pulse", "Rainbow", "Flat"]
    UI.AddMultiDropdown(name + " options", a)
    UI.AddSliderFloat("Vibrancy " + name.toLowerCase(), 0, 10)
    UI.AddSliderFloat("Pulse " + name.toLowerCase() + " speed", 0, 10)
    Material.Create(name + " chams")
    materials.push([name,
        name + " chams",
        name + " options",
        "Vibrancy " + name.toLowerCase(),
        "Pulse " + name.toLowerCase() + " speed"
    ]);
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
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        255
    ]
}
var done = false
var start_tick = Globals.Tickcount()
function onDraw() {
    if (!start_tick) {
        start_tick = Globals.Tickcount()
        return
    }
    var local = Entity.GetLocalPlayer()
    if (local && Globals.Tickcount() - start_tick > 5)
        done = true
}
Cheat.RegisterCallback("Draw", "onDraw")
function materialUpdate() {
    for (i in materials) {
        var mat = materials[i]
        var mat_index = Material.Get(mat[0] + " chams")
        if (mat_index > 0) {
            if (UI.IsMenuOpen()) {
                Material.SetKeyValue(mat_index, "$baseTexture", "vgui/white")
                var additive = UI.GetValue("Script items", mat[2]) & 1
                if (i == 1) {
                    Cheat.Print(UI.GetValue("Script items", mat[2]) + "\n")
                }
                Material.SetKeyValue(mat_index, "$additive", additive ? "1" : "0")
                Material.SetKeyValue(mat_index, "$envmap", "models/effects/cube_white")
                Material.SetKeyValue(mat_index, "$envmapfresnel", "1")
            }
            var uicol = UI.GetColor("Script items", mat[0] + " chams")
            var pulse = UI.GetValue("Script items", mat[2]) & 2
            var rainbow = UI.GetValue("Script items", mat[2]) & 4
            if (rainbow) {
                uicol = HSVtoRGB(Globals.Realtime() / 5 % 1, 1, 1)
                uicol[0] /= 10
                uicol[1] /= 10
                uicol[2] /= 10
            }
            var aaa = UI.GetValue("Script items", mat[3])
            if (pulse) {
                var speed = UI.GetValue("Script items", mat[4])
                var sine = (Math.sin(Globals.Realtime() * speed) + 1) / 2
                aaa += sine
            }

          

            Material.SetKeyValue(mat_index, "$envmapfresnelminmaxexp", "[0 " + (11 - aaa) + " " + ((11 - aaa) * 2) + "]")
            if(UI.IsMenuOpen()){
            Material.SetKeyValue(mat_index, "$envmaptint", "[" + uicol[0] / 255 + " " + uicol[1] / 255 + " " + uicol[2] / 255 + "]")
            Material.SetKeyValue(mat_index, "$alpha", uicol[3] / 255 + "")
            var flat = (UI.GetValue("Script items", mat[2]) & 8) ? "1" : "0"
            Material.SetKeyValue(mat_index, "$halflambert", flat)
            Material.SetKeyValue(mat_index, "$selfillum", flat)
            Material.SetKeyValue(mat_index, "$model", "1")
            Material.SetKeyValue(mat_index, "$flat", flat)
            }
            Material.Refresh(mat_index)
        }
    }
}
createMat("Self")
createMat("Self Attatchments")
createMat("Self Fakelag")
createMat("Self Arms")
createMat("Self Weapon")
createMat("Desync")
createMat("Enemies")
createMat("Enemies XQZ")
createMat("Enemy BT")
createMat("Enemy Attatchments")
Cheat.RegisterCallback("Material", "materialUpdate")
function onUnload() {
    for (i in materials) {
        Material.Destroy(materials[i][1])
    }
}
Cheat.RegisterCallback("Unload", "onUnload")