/*
Made by Kikron#0129
All of the Materials were taken from https://www.unknowncheats.me/forum/counterstrike-global-offensive/223578-decent-material-list-chams-2.html
I took something from my previous chams js, and something from better glow js by Vexatious Cheff
*/

Material.Create("Better Custom Material");
UI.AddDropdown('Base Material', ['Default','Adidas','Glowy thing','Fishing Net','Tree thingy' , 'Cool glow', 'Cool glow 2' , 'Dogtags','Asimov'])
UI.AddCheckbox('Wireframe')
UI.AddCheckbox('Enable Overlay')
UI.AddDropdown('Overlay Type', ['Glow','Metallic'])
UI.AddColorPicker("Overlay")
UI.AddSliderInt("Vibrancy", 0,109);
UI.AddSliderInt('Saturation',0,100)
UI.AddCheckbox('Rainbow')
UI.AddSliderFloat('Rainbow Speed',0,10)
UI.AddCheckbox('Additive')
var basemat = 'vgui/white'

var overlay = 'models/effects/crystal_cube_vertigo_hdr'
function visibility(){
    if (UI.GetValue('Script items','Rainbow')==1){
        UI.SetEnabled('Script items','Rainbow Speed',true)
    }
    else{
        UI.SetEnabled('Script items','Rainbow Speed',false)
    }
    if (UI.GetValue('Script items','Enable Overlay')==1){
        UI.SetEnabled('Script items','Overlay Type',true)
        UI.SetEnabled('Script items','Overlay',true)
        UI.SetEnabled('Script items','Vibrancy',true)
        UI.SetEnabled('Script items','Saturation',true)
    }
    else{
        UI.SetEnabled('Script items','Overlay Type',false)
        UI.SetEnabled('Script items','Overlay',false)
        UI.SetEnabled('Script items','Vibrancy',false)
        UI.SetEnabled('Script items','Saturation',false)
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

function updateMaterials()
{   
    var choosemat = UI.GetValue('Script items','Base Material')
    var overlay_type = UI.GetValue('Script items','Overlay Type')
    
    var uicol = UI.GetColor('Script items','Overlay')
    var aaa = UI.GetValue("Script items", "Vibrancy") / 10;
    var speed = UI.GetValue('Script items','Rainbow Speed')/10
    var rainbow = UI.GetValue("Script items", 'Rainbow')
    var colors = HSVtoRGB(Global.Realtime()*speed , 1, 1);
    var additive = UI.GetValue('Script items', 'Additive')
    var saturation = UI.GetValue('Script items','Saturation')/100
    switch (choosemat){
        case 0:
        basemat = 'vgui/white'
        break;
        case 1:
        basemat = 'models/inventory_items/music_kit/darude_01/mp3_detail'
        break;
        case 2:
        basemat = 'vgui/achievements/glow'
        break;
        case 3:
        basemat = 'models/props_shacks/fishing_net01'
        break;
        case 4:
        basemat = 'models/props_foliage/urban_tree03_branches'
        break;
        case 5:
        basemat = 'models/inventory_items/dreamhack_trophies/dreamhack_star_blur'
        break;
        case 6:
        basemat = 'models/inventory_items/dogtags/dogtags_lightray'
        break;
        case 7:
        basemat = 'models/inventory_items/dogtags/dogtags'
        break;
        case 8:
        basemat = 'models/extras/speech_info'
        break;
        default:
        basemat = 'vgui/white'
        break;

    }
    switch(overlay_type){
        case 0:
            overlay = 'models/effects/cube_white';
        break;
        case 1 :
            overlay = 'models/effects/crystal_cube_vertigo_hdr';
        break;
        default:
            overlay = 'models/effects/cube_white';
        break;

    }
    if (rainbow){
        uicol = colors
    }

    mat_index = Material.Get("Better Custom Material");
    if (mat_index > 0)
    {
        Material.SetKeyValue(mat_index, "$baseTexture", basemat);
        if (UI.GetValue('Script items','Enable Overlay')==1){
            Material.SetKeyValue(mat_index, "$envmap", overlay);
            Material.SetKeyValue(mat_index, "$envmapfresnel", "1")
            Material.SetKeyValue(mat_index, "$envmapfresnelminmaxexp", "[0 " + (11 - aaa) + " " + ((11 - aaa) * 2) + "]")
            Material.SetKeyValue(mat_index, "$envmaptint", "[" + uicol[0] / 255 + " " + uicol[1] / 255 + " " + uicol[2] / 255 + "]")
            Material.SetKeyValue(mat_index, "$alpha", uicol[3] / 255 + "")
        }
        else{
            Material.SetKeyValue(mat_index, "$envmapfresnelminmaxexp", "[0]")
        }
        var wireframe = UI.GetValue("Script items", 'Wireframe');
        Material.SetKeyValue(mat_index, "$reflectivity", "[1 1 1]");
        Material.SetKeyValue(mat_index, "$wireframe", wireframe ? "1" : "0")
        Material.SetKeyValue(mat_index, "$envmapsaturation", saturation.toString( ));
        Material.SetKeyValue(mat_index, "$additive",additive ?  '1' : '0');
        Material.Refresh(mat_index);
    }
}
function onUnload() {
    Material.Destroy("Better Custom Material")
}
Cheat.RegisterCallback("Material", "updateMaterials")
Cheat.RegisterCallback("Draw", "visibility")
Cheat.RegisterCallback("Unload", "onUnload");