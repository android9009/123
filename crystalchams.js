Material.Create("Crystal");

function createMenuItems()
{
    UI.AddLabel("-- Crystal Chams --");
    UI.AddSliderFloat("Cut Scale", 0, 3);
    UI.AddSliderFloat("Environment Bloom", 0, 1);
    UI.AddSliderInt("Pearlescence", 0, 100);
    UI.AddLabel("-- Crystal Chams --");
}

function updateMaterials()
{
    var pearl = UI.GetValue("Script items", "Pearlescence") / 10;
    var scale = UI.GetValue("Script items", "Cut Scale");
    var bright = UI.GetValue("Script items", "Environment Bloom");
    mat_index = Material.Get("Crystal");
    if (mat_index > 0)
    {
        Material.SetKeyValue(mat_index, "$basetexture", "vgui/white");
        Material.SetKeyValue(mat_index, "$envmap", "models/effects/crystal_cube_vertigo_hdr");
        Material.SetKeyValue(mat_index, "$envmaptint", "[" + " " + bright + " " + bright + " " + bright + "]");
        Material.SetKeyValue(mat_index, "$envmapfresnel", "1");
        Material.SetKeyValue(mat_index, "$envmapfresnelminmaxexp", "[0 1 2]");
        Material.SetKeyValue(mat_index, "$phong", "1");
        Material.SetKeyValue(mat_index, "$pearlescent", pearl.toString());
        Material.SetKeyValue(mat_index, "$reflectivity", "[2 2 2]");
        Material.SetKeyValue(mat_index, "$bumpmap", "models/weapons/customization/materials/origamil_camo");
        Material.SetKeyValue(mat_index, "$bumptransform", "center .5 .5 scale" + " " + scale + " " + scale + "rotate 0 translate 0 0");
        Material.Refresh(mat_index);
    }
}

function onUnload()
{
    Material.Destroy("Crystal");
}

createMenuItems();
Cheat.RegisterCallback("Material", "updateMaterials");
Cheat.RegisterCallback("Unload", "onUnload");