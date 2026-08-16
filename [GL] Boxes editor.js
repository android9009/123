var binlib = {};
function dictLength(dict) {
    var count = 0;
    for (_ in dict) {
        count++;
    }
    return count;
}
function createDropdown(name, values, multi) {
    UI[multi ? "AddMultiDropdown" : "AddDropdown"](name, values);
 
    binlib[name] = {"multi": multi, "values": {}};

    multi && values.reverse();

    var i = 0; for (value in values) {
        var index = multi ? (1 << (values.length-(i+1))) : i;
        binlib[name].values[index] = values[value];
        i++;
    }
}
function fetchDropdown(name) {
    var selection = (name ? [] : {})
    var bin = UI.GetValue("Misc", name);

    !name && function() {for (dropdown in binlib) selection[dropdown] = fetchDropdown(dropdown) }();

    if (name) {
        !binlib[name].multi && bin == 0 && selection.push(binlib[name].values[0]) && function() { return selection; }();
        for (var i = dictLength(binlib[name].values)-1; i >= 0; i--) {
            if (!binlib[name].multi && i == 0) continue;

            var index = binlib[name].multi ? (1 << i) : i;
            if (bin-index >= 0) {
                bin -= (index);
                selection.push(binlib[name].values[index]);
            }
        }
    }

    return selection;
}
function CustomBox(bBox, color , x, y, width, height)
{
    var r = color[0]
    var g = color[1]
    var b = color[2]
    var a = color[3]
   
    playerHeight = bBox[4] - bBox[2]
    playerWidth = bBox[3] - bBox[1]
   

    Render.Rect(bBox[1], bBox[2], bBox[3] - bBox[1], bBox[4] - bBox[2], [r,g,b,a] );
}
function CorneredBox(bBox, color , xOffset, yOffset, width, height)
{
    var r = color[0]
    var g = color[1]
    var b = color[2]
    var a = color[3]
   
    heightLineLength = UI.GetValue( "Script Items", "Corner height line length");
    widthLineLength = UI.GetValue( "Script Items", "Corner width line length");

    playerHeight = bBox[4] - bBox[2]
    playerWidth = bBox[3] - bBox[1]

    widthLineLength = playerWidth * widthLineLength / 100
    heightLineLength = playerHeight * heightLineLength / 100

    Render.Line(bBox[1], bBox[2], bBox[1] + widthLineLength, bBox[2], [r,g,b,a]) //top left x
    Render.Line(bBox[1], bBox[2], bBox[1], bBox[2] + heightLineLength, [r,g,b,a]) //top left y
   
    Render.Line(bBox[3], bBox[4], bBox[3] - widthLineLength, bBox[4], [r,g,b,a]) //bottom right x
    Render.Line(bBox[3], bBox[4], bBox[3], bBox[4] - heightLineLength, [r,g,b,a]) //bottom right y
   
    Render.Line(bBox[3], bBox[2], bBox[3] - widthLineLength, bBox[2], [r,g,b,a]) //top right x
    Render.Line(bBox[3], bBox[2], bBox[3], bBox[2] + heightLineLength, [r,g,b,a]) //top right y
   
    Render.Line(bBox[1], bBox[4], bBox[1] + widthLineLength, bBox[4], [r,g,b,a]) //bottom left x
    Render.Line(bBox[1], bBox[4], bBox[1], bBox[4] - heightLineLength, [r,g,b,a]) //bottom left y
}
function betterESP()
{
    var boxColor = UI.GetColor("Script Items", "Box Color")
    var esp = fetchDropdown("Box type");
    if (UI.GetValue("Script Items", "BetterESP"))
    {
        plr = Entity.GetPlayers()
        for (i = 0; i < plr.length; i++)
        {
            if (Entity.IsEnemy(plr[i]) && Entity.IsAlive(plr[i]) && !Entity.IsDormant(plr[i]))
            {
                bounds = Entity.GetRenderBox(plr[i])
                if (bounds[0] == 1)
                {
                    if(esp[0] == "Normal box")
                    {  
                        CustomBox(bounds, boxColor)
                    }
                    if(esp[0] == "Cornered box")
                    {
                       CorneredBox(bounds, boxColor)
                    }
                }
            }
        }
    }  
}
UI.AddCheckbox("BetterESP")
UI.AddColorPicker("Box Color")
UI.AddSliderInt( "Corner height line length", 0, 50);
UI.AddSliderInt( "Corner width line length", 0, 50);
createDropdown("Box type", ["Normal box", "Cornered box"], false);
Cheat.RegisterCallback("Draw", "betterESP")