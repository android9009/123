Material.Create("Metallic overlay?");
UI.AddColorPicker("Overlay")
UI.AddSliderInt("Saturation", 0, 100);
UI.AddCheckbox('Wireframe')
UI.AddCheckbox('Rainbow')
UI.AddSliderFloat('Rainbow Speed',0,10)

function visibility(){
    if (UI.GetValue('Script items','Rainbow')==1){
        UI.SetEnabled('Script items','Rainbow Speed',true)
    }
    else{
        UI.SetEnabled('Script items','Rainbow Speed',false)
    }
}
function HSVtoRGB(h,s,v){
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
var col = UI.GetColor("Script items","Overlay")
function updateMaterials()
{
    var saturation = UI.GetValue("Script items", "Saturation") / 100;
    var speed = UI.GetValue('Script items','Rainbow Speed')/10
    var rainbow = UI.GetValue("Script items", 'Rainbow')
    var colors = HSVtoRGB(Global.Realtime()*speed , 1, 1);
    if (rainbow){
        col = colors
    }
    else{
        var col = UI.GetColor("Script items","Overlay")
    }
    mat_index = Material.Get("Metallic overlay?");
    if (mat_index > 0)
    {
        Material.SetKeyValue(mat_index, "$baseTexture", "vgui/white");
        Material.SetKeyValue(mat_index, "$envmap", "models/effects/crystal_cube_vertigo_hdr");
        Material.SetKeyValue(mat_index, "$color", "[0 0 0]");
        var wireframe = UI.GetValue("Script items", 'Wireframe');
        Material.SetKeyValue(mat_index, "$wireframe", wireframe ? "1" : "0")
        Material.SetKeyValue(mat_index, "$envmapsaturation", saturation.toString());
        Material.SetKeyValue(mat_index, "$envmaptint", "[" + col[0] / 255 + " " + col[1] / 255 + " " + col[2] / 255 + "]")
        Material.Refresh(mat_index);
    }
}
function onUnload() {
    Material.Destroy("Metallic overlay?")
}
Cheat.RegisterCallback("Material", "updateMaterials")
Cheat.RegisterCallback("Draw", "visibility")
Cheat.RegisterCallback("Unload", "onUnload");