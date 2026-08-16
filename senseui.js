var globals = {}
globals.x = "X"
globals.y = "Y"
globals.tab = 1
globals.alpha = 255
globals.active = false
globals.wasactive = false
globals.draw_texture = false
globals.lasttab = 1
UI.AddCheckbox("Custom desync")
UI.AddCheckbox("Jitter real")
UI.AddCheckbox("Jitter fake")
UI.AddCheckbox("Jitter offset")
UI.AddSliderInt("Fake offset",-58,58)
UI.AddSliderInt("Real offset",-58,58)
UI.AddSliderInt("Real 1st yaw",-58,58)
UI.AddSliderInt("Real 2nd yaw",-58,58)
UI.AddSliderInt("Fake 1st yaw",-58,58)
UI.AddSliderInt("Fake 2nd yaw",-58,58)
UI.AddSliderInt("Offset 1st yaw",-180,180)
UI.AddSliderInt("Offset 2nd yaw",-180,180)
UI.AddSliderInt("Fake delay",0,100)
UI.AddSliderInt("Offset delay",0,100)
UI.SetEnabled("Script Items","Custom desync",false)
UI.SetEnabled("Script Items","Jitter real",false)
UI.SetEnabled("Script Items","Jitter fake",false)
UI.SetEnabled("Script Items","Jitter offset",false)
UI.SetEnabled("Script Items","Fake offset",false)
UI.SetEnabled("Script Items","Real offset",false)
UI.SetEnabled("Script Items","Real 1st yaw",false)
UI.SetEnabled("Script Items","Real 2nd yaw",false)
UI.SetEnabled("Script Items","Fake 1st yaw",false)
UI.SetEnabled("Script Items","Fake 2nd yaw",false)
UI.SetEnabled("Script Items","Offset 1st yaw",false)
UI.SetEnabled("Script Items","Offset 2nd yaw",false)
UI.SetEnabled("Script Items","Fake delay",false)
UI.SetEnabled("Script Items","Offset delay",false)
var clamp = function (val, min, max) {
    if (val > max)
        return max
    if (val < min)
        return min
    return val
}
globals.X = function () {
    return UI.GetValue("Script Items",globals.x)
}
globals.Y = function () {
    return UI.GetValue("Script Items", globals.y)
}
function initialize() {
    UI.AddSliderInt(globals.x,-630,Render.GetScreenSize()[0])
    UI.AddSliderInt(globals.y, -600, Render.GetScreenSize()[1])
    UI.SetEnabled("Script Items", globals.x, false)
    UI.SetEnabled("Script Items", globals.y, false)
}

function drawBasic() {
    var grey = [38, 38, 38, globals.alpha]
    var border = [0, 0, 0, globals.alpha]
    var fade_factor = ((1 / .15) * Globals.Frametime()) * 255
    if (!UI.IsMenuOpen() && globals.alpha != 0)
        globals.alpha = clamp(globals.alpha - fade_factor, 0, 255)
    if (UI.IsMenuOpen() && globals.alpha != 255)
        globals.alpha = clamp(globals.alpha + fade_factor, 0, 255)
    var gradient = [[59, 175, 222, globals.alpha], [202, 70, 205, globals.alpha]]
    var gradient2 = [[202, 70, 205, globals.alpha], [201, 227, 58, globals.alpha]]
    if (globals.alpha != 0) {
        Render.Rect(globals.X(), globals.Y(), 630, 600, border);
        
        Render.FilledRect(globals.X() + 1, globals.Y() + 1, 628, 5, grey)
        Render.FilledRect(globals.X() + 1, globals.Y() + 1, 5, 598, grey)

        Render.FilledRect(globals.X() + 624, globals.Y() + 1, 5, 598, grey)
        Render.FilledRect(globals.X() + 1, globals.Y() + 594, 628, 5, grey)

        Render.Rect(globals.X() + 6, globals.Y() + 6, 618, 588, border);
        Render.Rect(globals.X() + 1, globals.Y() + 1, 628, 598, [60,60,60,globals.alpha]);
        Render.FilledRect(globals.X() + 7, globals.Y() + 7, 616, 586, [12, 12, 12, globals.alpha])

        Render.GradientRect(globals.X() + 7, globals.Y() + 7, 616 / 2, 2, 1, gradient[0], gradient[1])
        Render.GradientRect(globals.X() + 7 + (616 / 2), globals.Y() + 7, 616 / 2, 2, 1, gradient2[0], gradient2[1])
    }
}
function cursorBetween(x, y, length, height) {
    var cursor = Input.GetCursorPosition()
    if (cursor[0] > x && cursor[0] < x + length && cursor[1] > y && cursor[1] < y + height)
        return true
    return false
}
function drawTabs() {
    var font = Render.AddFont("Astriumtabs2", 37, 100)
    var space = 82
    if (globals.alpha != 0) {
        Render.FilledRect(globals.X() + 7, globals.Y() - 65 + globals.tab * space, 80, 70, [20, 20, 20, globals.alpha])
        Render.FilledRect(globals.X() + 7 + 80, globals.Y() + 10, 616 - 80, 583, [20, 20, 20, globals.alpha])
        if(globals.draw_texture){
        var tile = Render.AddTexture("ot/scripts/tile.png")
        for(i = 0; i < 18;i++){
            for(k = 0; k < 20;k++){
                if(i == 17){
                    Render.TexturedRect(globals.X() + 7+75+(17*30),globals.Y()+9+(k*30),30,30,tile)
                }
                else
                    Render.TexturedRect(globals.X() + 7+80+(i*30),globals.Y()+9+(k*30),30,30,tile)
            }
        }
        }
        globals.lasttab = globals.tab
        if(cursorBetween(globals.X() + 7, globals.Y() - 65 + space,80,80) && Input.IsKeyPressed(0x01)){
            globals.tab = 1
        }
        if (cursorBetween(globals.X() + 7, globals.Y() - 65 + space*2, 80, 80) && Input.IsKeyPressed(0x01)) {
            globals.tab = 2
        }
        if (cursorBetween(globals.X() + 7, globals.Y() - 65 + space * 3, 80, 80) && Input.IsKeyPressed(0x01)) {
            globals.tab = 3
        }
        if (cursorBetween(globals.X() + 7, globals.Y() - 65 + space * 4, 80, 80) && Input.IsKeyPressed(0x01)) {
            globals.tab = 4
        }
        if (cursorBetween(globals.X() + 7, globals.Y() - 65 + space * 5, 80, 80) && Input.IsKeyPressed(0x01)) {
            globals.tab = 5
        }
        if (cursorBetween(globals.X() + 7, globals.Y() - 65 + space * 6, 80, 80) && Input.IsKeyPressed(0x01)) {
            globals.tab = 6
        }
        if (cursorBetween(globals.X() + 7, globals.Y() - 65 + space * 7, 80, 80) && Input.IsKeyPressed(0x01)) {
            globals.tab = 7
        }
        if(globals.tab != globals.lasttab){
            comboactive = -1
        }
        Render.Line(globals.X() + 7, globals.Y() - 65 + globals.tab * space, globals.X() + 7 + 80, globals.Y() - 65 + globals.tab * space, [48, 48, 48, globals.alpha])
        Render.Line(globals.X() + 7, globals.Y() - 66 + globals.tab * space, globals.X() + 7 + 80, globals.Y() - 66 + globals.tab * space, [5, 5, 5, globals.alpha])

        Render.Line(globals.X() + 7, globals.Y() + 5 + globals.tab * space, globals.X() + 7 + 80, globals.Y() + 5 + globals.tab * space, [48, 48, 48, globals.alpha])
        Render.Line(globals.X() + 7, globals.Y() + 6 + globals.tab * space, globals.X() + 7 + 80, globals.Y() + 6 + globals.tab * space, [5, 5, 5, globals.alpha])

        Render.Line(globals.X() + 7 + 80, globals.Y() - 65 + globals.tab * space, globals.X() + 7 + 80, globals.Y() + 9, [48, 48, 48, globals.alpha])
        Render.Line(globals.X() + 6 + 80, globals.Y() - 66 + globals.tab * space, globals.X() + 6 + 80, globals.Y() + 9, [5,5, 5, globals.alpha])

        Render.Line(globals.X() + 7 + 80, globals.Y() - 65 + globals.tab * space + 70, globals.X() + 7 + 80, globals.Y() + 592, [48, 48, 48, globals.alpha])
        Render.Line(globals.X() + 6 + 80, globals.Y() - 64 + globals.tab * space + 70, globals.X() + 6 + 80, globals.Y() + 592, [5, 5, 5, globals.alpha])

        Render.StringCustom(globals.X() + 25, globals.Y() + 20, 0, "C", globals.tab == 1 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], font)

        Render.StringCustom(globals.X() + 20, globals.Y() + 20 + space, 0, "I", globals.tab == 2 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], font)
        var font2 = Render.AddFont("Astriumtabs2", 41, 100)

        Render.StringCustom(globals.X() + 20, globals.Y() + 20 + space * 2, 0, "D", globals.tab == 3 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], font2)

        Render.StringCustom(globals.X() + 20, globals.Y() + 20 + space * 3, 0, "E", globals.tab == 4 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], font2)

        Render.StringCustom(globals.X() + 22, globals.Y() + 22 + space * 4, 0, "F", globals.tab == 5 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], font)

        Render.StringCustom(globals.X() + 22, globals.Y() + 23 + space * 5, 0, "G", globals.tab == 6 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], font)

        Render.StringCustom(globals.X() + 22, globals.Y() + 25 + space * 6, 0, "H", globals.tab == 7 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], font)
    }
}
function beginChild(column,y,height,name){
    if(!(column & 1 && column & 2)){
    if (globals.alpha != 0) {
        Render.FilledRect(globals.X() + (column == 1 ? 115 : 370),globals.Y() + y, 460 / 2, height,[19,19,19,globals.alpha])
        Render.Rect((globals.X() + (column == 1 ? 115 : 370))-1, (globals.Y() + y)-1, (460 / 2)+2, height+2, [5, 5, 5, globals.alpha])
        Render.Rect(globals.X() + (column == 1 ? 115 : 370), globals.Y() + y, 460 / 2, height, [65, 65, 65, globals.alpha])
        Render.FilledRect((globals.X()+(column == 1 ? 115 : 370) + 10),(globals.Y() + y)-1, 5+(Render.TextSizeCustom(name,globals.verdana8)[0]), 2,[19,19,19,globals.alpha])
        Render.StringCustom(globals.X() + (column == 1 ? 115 : 370) + 10 + 2, globals.Y() + (y-7), 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
        Render.StringCustom(globals.X() + (column == 1 ? 115 : 370) + 10 + 2.5, globals.Y() +0.5+ (y-7), 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
        spacingBetweenCheckboxes = 0
        return [((column == 1 ? 115 : 370) + 15) + globals.X(),(y + 20)+globals.Y()]
    }
    }
    else{
        if (globals.alpha != 0) {
            Render.FilledRect(globals.X() + 115,globals.Y() + y, 485, height,[19,19,19,globals.alpha])
            Render.Rect(globals.X() + 115, globals.Y() + y, 485, height, [65, 65, 65, globals.alpha])
            Render.Rect((globals.X() + 115)-1, (globals.Y() + y)-1, 485+2, height+2, [5, 5, 5, globals.alpha])
            Render.FilledRect((globals.X()+115 + 10),(globals.Y() + y)-1, 5+(Render.TextSizeCustom(name,globals.verdana8)[0]), 2,[19,19,19,255])
            Render.StringCustom(globals.X() + 115 + 10 + 2, globals.Y() + (y-7), 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
            Render.StringCustom(globals.X() + 115 + 10 + 2.5, globals.Y() + 0.5+(y-7), 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
        }
    }
    if(globals.alpha == 0){
        return [globals.X(),globals.Y()]
    }
}
var spacingBetweenCheckboxes = 0
var idCheckbox = 0
var hotkeyid = 0
var colorpickerid = 0
function resetSpacing() {
    spacingBetweenCheckboxes = 0
    idCheckbox = 0
    hotkeyid = 0
    colorpickerid = 0
}
var wasDown = []
var idY = []
function checkbox(x, y, name, enable) {
    var size = 8
    y += spacingBetweenCheckboxes
    if (globals.alpha != 0 && !comboOverlapping) {
        Render.Rect(x, y, size, size, [0, 0, 0, globals.alpha])
        Render.FilledRect(x + 1, y + 1, size - 2, size - 2, enable ? [0, 255, 0, globals.alpha] : [100, 100, 100, globals.alpha])
        Render.GradientRect(x + 1, y + 1, size - 2, size - 2, 0, [0, 0, 0, 0], [10, 10, 10, (globals.alpha / 255) * 100])
        var font = Render.AddFont("Tahoma",8,100)
        Render.StringCustom(x + 17, y-4, 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
    }
    spacingBetweenCheckboxes += 20
    idCheckbox++
    if (globals.alpha != 0 && UI.IsMenuOpen() && !comboOverlapping) {
        if ((cursorBetween(x, y, size, size) || cursorBetween(x+17,y-1,Render.TextSize(name)[0],Render.TextSize(name)[1])) && comboactive == -1) {
            if (!wasDown[idCheckbox]) {
                if (Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = true
                    return true
                }
            }
            else if (wasDown[idCheckbox]) {
                if (!Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = false
                    return false
                }
            }
            return false
        }
    }
}

var keylist = []
var listening = []
var checkKey = []
var keydown = []
function hotkey(x,y) {
    /*var drawWeird = false
    var xx = x + 170
    y += spacingBetweenCheckboxes - 20
    if (!keylist[hotkeyid])
        keylist[hotkeyid] = 0

    
    if (cursorBetween(xx - 8, y - 4, Render.TextSize("[" + keylist[hotkeyid] + "]")[0], Render.TextSize("[" + keylist[hotkeyid] + "]")[1]) && !comboOverlapping) {
        if (Input.IsKeyPressed(0x01)) {
            keylist[hotkeyid] = ""
            checkKey[hotkeyid] = true
        }
    }
    if (checkKey[hotkeyid] && !Input.IsKeyPressed(0x01) && !comboOverlapping) {
        checkKey[hotkeyid] = false
        listening[hotkeyid] = true
    }
    if (listening[hotkeyid]) {
        var getKey = function () {
            for (i = 1; i < 0x87; i++) {
                if(Input.IsKeyPressed(i))
                    return i
            }
        }
        var key = getKey()
        if (key == 0x1B || key == 0x2D) {
            keylist[hotkeyid] = 0
            listening[hotkeyid] = false
        }
        if (listening[hotkeyid] && key >= 0x01) {
            keylist[hotkeyid] = key
            listening[hotkeyid] = false
        }
    }
    if (!UI.IsMenuOpen()) {
        listening[hotkeyid] = false
        checkKey[hotkeyid] = false
    }
    if (listening[hotkeyid] || checkKey[hotkeyid]) {
        keylist[hotkeyid] = 0
        drawWeird = true
    }
    if (globals.alpha != 0 && !comboOverlapping) {
        if (drawWeird) {
            Render.String(xx, y - 4, 1, "[ ]", [70, 70, 70, globals.alpha], 7)
        }
        else {
            Render.String(xx, y - 4, 1, "[" + keylist[hotkeyid] + "]", [70, 70, 70, globals.alpha], 7)
        }
    }
    if (Input.IsKeyPressed(keylist[hotkeyid]) && !checkKey[hotkeyid] && !listening[hotkeyid] && !keydown[hotkeyid] && !comboOverlapping) {
        keydown[hotkeyid] = true
        hotkeyid++
        return true
    }
    if (!Input.IsKeyPressed(keylist[hotkeyid]) && !checkKey[hotkeyid] && !listening[hotkeyid] && keydown[hotkeyid] && !comboOverlapping) {
        keydown[hotkeyid] = false
        hotkeyid++
        return true
    }
    hotkeyid++
    return false*/
}
var val = []
var backupval = []
var holding = []
var sliderdist = []
function sliderFloat(x, y, name, min, max, negate,visualizefloat, sliderid, uival,additive) {
    var xx = x + 20
    y += spacingBetweenCheckboxes
    spacingBetweenCheckboxes += 33
    var cursor = Input.GetCursorPosition()
    
    if (!sliderdist[sliderid])
        sliderdist[sliderid] = 0
    
    if(!backupval[sliderid])
        backupval[sliderid] = uival
    val[sliderid] = backupval[sliderid]
    if (globals.alpha != 0) {
        if (cursorBetween(xx, y + 8, 130, 8) && Input.IsKeyPressed(0x01) && !holding[sliderid] && comboactive == -1) {
            holding[sliderid] = true
        }
        if (!Input.IsKeyPressed(0x01)) {
            holding[sliderid] = false
        }
        if(!backupval[sliderid])
            backupval[sliderid] = 0
        
        if (holding[sliderid]) {
            sliderdist[sliderid] = cursor[0] - xx 
            sliderdist[sliderid] /= 130
            sliderdist[sliderid] *= max - min
            val[sliderid] = negate ? sliderdist[sliderid] + min : sliderdist[sliderid]
            val[sliderid] = clamp(val[sliderid], min, max)
            val[sliderid].toFixed(visualizefloat)
            backupval[sliderid] = val[sliderid]
        }
        sliderdist[sliderid] = (uival + (-min)) / (max - min)
        sliderdist[sliderid] *= 128
        sliderdist[sliderid].toFixed(visualizefloat)
        sliderdist[sliderid] = clamp(sliderdist[sliderid], 0, 128)

        Render.StringCustom(xx+1,y-6,0,name,[200,200,200,globals.alpha],globals.verdana8)
        Render.Rect(xx, y + 10, 130, 8, [0, 0, 0, globals.alpha])
        Render.FilledRect(xx + 1, y + 11, 128, 6, [70, 70, 70, globals.alpha])
        Render.GradientRect(xx + 1, y + 11, 128, 6, 0, [0, 0, 0, 100], [0, 0, 0, 0])
        if (sliderdist[sliderid] >= 0 && sliderdist[sliderid] <= 128) {
            Render.FilledRect(xx + 1, y + 11, sliderdist[sliderid], 6, [0, 255, 0, globals.alpha])
            Render.GradientRect(xx + 1, y + 11, sliderdist[sliderid], 6, 0, [0, 0, 0, 0], [10, 10, 10, (globals.alpha/255)*100])
        }
        
        
        Render.StringCustom(xx + sliderdist[sliderid], y + 15, 1, val[sliderid].toFixed(visualizefloat) + "", [200, 200, 200, globals.alpha], globals.verdana8)

        
    }return val[sliderid]
}
var drawweird = []
var comboOverlapping = false
var comboVal = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
 [], [], [], [], [], [], [], [], [], [], [], [], [], []]
var backupcomboval =  [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
, [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
 [], [], [], [], [], [], [], [], [], [], [], [], [], []]
 var comboval2 =[]
 var backupcomboval2 = []
var waitUntilUnclick = []
var lastcombodata = [[],[],[]]
var lastvaliduival = []
var comboactive = -1
function beginMultiComboBox(x, y, name, contents, uival,comboid) {
    lastcombodata[0] = x
    lastcombodata[1] = y
    lastcombodata[2] = name
    lastcombodata[3] = contents
    lastcombodata[4] = uival
    lastcombodata[5] = comboid
    lastcombodata[6] = 1
    spacingBetweenCheckboxes+=40
}
function beginComboBox(x, y, name, contents, uival,comboid){
    lastcombodata[0] = x
    lastcombodata[1] = y
    lastcombodata[2] = name
    lastcombodata[3] = contents
    lastcombodata[4] = uival
    lastcombodata[5] = comboid
    lastcombodata[6] = 0
    spacingBetweenCheckboxes+=40
}
function endComboBox(id) {
    if(lastcombodata[6] == 1){
    var x = lastcombodata[0]
    var y = lastcombodata[1]
    var name = lastcombodata[2]
    var contents = lastcombodata[3]
    var uival = lastcombodata[4]
    var comboid = lastcombodata[5]
    var xx = x + 20
    y += spacingBetweenCheckboxes - 30
    spacingBetweenCheckboxes+=40
    var helper = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096]
        for(i = 0; i < contents.length;i++){
            if(uival & helper[i]){
                comboVal[comboid][i] = true
                backupcomboval[comboid][i] = true
            }
            else{
                comboVal[comboid][i] = false
                backupcomboval[comboid][i] = false
            }
        }
    spacingBetweenCheckboxes -= 40
    if (UI.IsMenuOpen() || globals.alpha != 0) {
        if (cursorBetween(xx, y, 130, 20) && Input.IsKeyPressed(0x01) && !drawweird[comboid] && (comboactive == comboid || comboactive == -1)) {
            drawweird[comboid] = true
            waitUntilUnclick[comboid] = true
            comboactive = comboid
        }
        Render.Rect(xx, y, 130, 20, [0, 0, 0, globals.alpha])
        Render.FilledRect(xx + 1, y + 1, 128, 18, [47, 47, 47, globals.alpha])
        Render.GradientRect(xx + 1, y + 1, 128, 18, 0, [0, 0, 0, (globals.alpha/255)*50],[0,0,0,0] )
        Render.StringCustom(xx + 2, y - 15, 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
        if(drawweird[comboid]){
            Render.Polygon([[xx+115.0, y+7 ], [ xx+120.0, y+7 ], [ xx+117, y+12.0]],[173,173,173,globals.alpha])
        }
        else{
            Render.Polygon([[xx+115.0, y+6 ], [ xx+120.0, y+9 ], [ xx+115, y+12.0]],[173,173,173,globals.alpha])
        }
        var text = []
        for(i = 0; i < contents.length;i++){
            if(comboVal[comboid][i] || backupcomboval[comboid][i]){
                text.push(contents[i])
            }
        }
        if(Render.TextSizeCustom(text.join(", "),globals.verdana8)[0] > 110){
            text = []
            text[0] = "..."
        }
        if(text)
            Render.StringCustom(xx + 8, y+2, 0, text.join(", "), [200, 200, 200, globals.alpha], globals.verdana8)
        
        if(drawweird[comboid]){
            
            if (!cursorBetween(xx, y, 130,( 22 * contents.length)+22) && Input.IsKeyPressed(0x01)) {
                drawweird[comboid] = false
                comboactive = -1
            }
            if (!Input.IsKeyPressed(0x01) && waitUntilUnclick[comboid]) {
                waitUntilUnclick[comboid] = false
            }
            
            Render.FilledRect(xx + 1, y + 21, 128, (22 * contents.length)+3, [35, 35, 35, globals.alpha])
            Render.Rect(xx, y+21, 130, (22 * contents.length)+4, [0, 0, 0, globals.alpha])
            for (i = 0; i < contents.length; i++) {
                comboVal[comboid][i] = backupcomboval[comboid][i]
                if(cursorBetween(xx, y+25+(i*22), 130, 22)){
                    Render.FilledRect(xx+1,y+2+(i*22)+22,128,22,[25,25,25,globals.alpha])
                }
                Render.StringCustom(xx + 12, y + 25 + (i * 22)+4, 0, contents[i], comboVal[comboid][i] ? [174,205,58,globals.alpha] : [200, 200, 200, globals.alpha], globals.verdana8)
                
                if (cursorBetween(xx, y+25, 130, (i * 22)+22) && Input.IsKeyPressed(0x01) && !waitUntilUnclick[comboid]) {
                    
                    comboVal[comboid][i] = !comboVal[comboid][i]
                    waitUntilUnclick[comboid] = true
                    backupcomboval[comboid][i] = comboVal[comboid][i]
                }
                
            }
            
            var returnval = 0
            
            for(i = 0; i < contents.length; i++) {
                if(comboVal[comboid][i]){
                    returnval |= helper[i]
                }
            }
            return returnval
        }
    }
    }
    else{
        var x = lastcombodata[0]
    var y = lastcombodata[1]
    var name = lastcombodata[2]
    var contents = lastcombodata[3]
    var uival = lastcombodata[4]
    if(uival != -2147483648)
    lastvaliduival[comboid] = uival

    uival = lastvaliduival[comboid]
    var comboid = lastcombodata[5]
    var xx = x + 20
    y += spacingBetweenCheckboxes - 30
    if(!comboval2[comboid])
    comboval2[comboid] = uival
    if (UI.IsMenuOpen() || globals.alpha != 0) {
        if (cursorBetween(xx, y, 130, 20) && Input.IsKeyPressed(0x01) && !drawweird[comboid] && (comboactive == comboid || comboactive == -1)) {
            drawweird[comboid] = true
            waitUntilUnclick[comboid] = true
            comboactive = comboid
        }
        Render.Rect(xx, y, 130, 20, [0, 0, 0, globals.alpha])
        Render.FilledRect(xx + 1, y + 1, 128, 18, [47, 47, 47, globals.alpha])
        Render.GradientRect(xx + 1, y + 1, 128, 18, 0, [0, 0, 0, (globals.alpha/255)*50],[0,0,0,0] )
        Render.StringCustom(xx + 2, y - 15, 0, name, [200, 200, 200, globals.alpha], globals.verdana8)
        if(drawweird[comboid]){
            Render.Polygon([[xx+115.0, y+7 ], [ xx+120.0, y+7 ], [ xx+117, y+12.0]],[173,173,173,globals.alpha])
        }
        else{
            Render.Polygon([[xx+115.0, y+6 ], [ xx+120.0, y+9 ], [ xx+115, y+12.0]],[173,173,173,globals.alpha])
        }
        var text = []
        for(i = 0; i < contents.length;i++){
            if(i == comboval2[comboid])
            text.push(contents[i])
        }
        comboval2[comboid] = backupcomboval2[comboid]
        
        Render.StringCustom(xx + 8, y+2, 0, contents[uival] + "", [200, 200, 200, globals.alpha], globals.verdana8)
        
        if(drawweird[comboid]){
            
            if (!cursorBetween(xx, y, 130,( 22 * contents.length)+22) && Input.IsKeyPressed(0x01)) {
                drawweird[comboid] = false
                comboactive = -1
            }
            if (!Input.IsKeyPressed(0x01) && waitUntilUnclick[comboid]) {
                waitUntilUnclick[comboid] = false
            }
            
            Render.FilledRect(xx + 1, y + 21, 128, (22 * contents.length)+3, [35, 35, 35, globals.alpha])
            Render.Rect(xx, y+21, 130, (22 * contents.length)+4, [0, 0, 0, globals.alpha])
            for (i = 0; i < contents.length; i++) {
                if(cursorBetween(xx, y+25+(i*22), 130, 22)){
                    Render.FilledRect(xx+1,y+4+(i*22)+22,128,20,[25,25,25,globals.alpha])
                }
                Render.StringCustom(xx + 12, y + 25 + (i * 22)+4, 0, contents[i], i == comboval2[comboid] ? [174,205,58,globals.alpha] : [200, 200, 200, globals.alpha], globals.verdana8)
                if (cursorBetween(xx, y+25, 130, (i * 22)+22) && Input.IsKeyPressed(0x01) && !waitUntilUnclick[comboid]) {
                    comboval2[comboid] = i
                    
                    backupcomboval2[comboid] = i
                    waitUntilUnclick[comboid] = true
                }
                
            }
            return comboval2[comboid]
        }
    }
    }

}



var oogabooga = 0
var ragetab = 0
var lastragetab = 0
function drawRage() {
    beginChild(1|2,30,70,"Weapon Type")
    var wepFont = Render.AddFont("AstriumWep",20,100)
    var xx = globals.X() + 100
    var y = globals.Y() + 25
    lastragetab = ragetab
    var tabs = ["v","G","A","a","Z","Y"]
    {
        Render.StringCustom(xx + (68)-30, y + 30, 0, tabs[0],  ragetab == 0 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], wepFont)
        Render.StringCustom(xx + (2*68)-50, y + 30, 0, tabs[1],  ragetab == 1 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], wepFont)
        Render.StringCustom(xx + (3*68)-50, y + 30, 0, tabs[2],  ragetab == 2 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], wepFont)
        Render.StringCustom(xx + (4*68)-60, y + 30, 0, tabs[3],  ragetab == 3 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], wepFont)
        Render.StringCustom(xx + (5*68)-30, y + 30, 0, tabs[4],  ragetab == 4 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], wepFont)
        Render.StringCustom(xx + (6*68), y + 30, 0, tabs[5],  ragetab == 5 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], wepFont)
        var tabs2 = [[]]
        for(i = 0; i < tabs.length;i++){
            tabs2[i] = Render.TextSizeCustom(tabs[i],wepFont)
        }
        if(Input.IsKeyPressed(0x01)){
        if(cursorBetween(xx + (68)-30,y+30,tabs2[0][0],tabs2[0][1])){
            ragetab = 0
        }
        if(cursorBetween(xx + (2*68)-50,y+30,tabs2[1][0],tabs2[1][1])){
            ragetab = 1
        }
        if(cursorBetween(xx + (3*68)-50,y+30,tabs2[2][0],tabs2[2][1])){
            ragetab = 2
        }
        if(cursorBetween(xx + (4*68)-60,y+30,tabs2[3][0],tabs2[3][1])){
            ragetab = 3
        }
        if(cursorBetween(xx+(5*68)-30,y+30,tabs2[4][0],tabs2[4][1])){
            ragetab = 4
        }
        if(cursorBetween(xx+(6*68)-30,y+30,tabs2[5][0],tabs2[5][1])){
            ragetab = 5
        }
    }
    }
    if(ragetab != lastragetab){
        comboactive = -1
    }
    var text = ""
    switch(ragetab){
        case 0:
            text = "General Config"
            break
        case 1:
            text  = "Pistol Config"
            break
        case 2:
            text = "Heavy Pistol Config"
            break
        case 3:
            text = "Scout Config"
            break
        case 4:
            text = "AWP Config"
            break
        case 5:
            text = "Auto Config"
            break
    }
    
    var a = beginChild(1,120,450,text)
    var xx = a[0]
    var yy = a[1]
    var tab = "Rage"
    var subtab = "GENERAL"
    var child = "General"
    
    var _do = function (name) {
        if (checkbox(xx, yy, name, UI.GetValue(tab, subtab, child, name))) UI.SetValue(tab, subtab, child, name, !UI.GetValue(tab, subtab, child, name))
    }
    var _do2 = function (name) {
        if (hotkey(xx, yy, name)) {
            
        }
    }
    var _do3 = function (name, min, max, thing,thing2,id) {
        if(!globals.active){
            val[id] = UI.GetValue(tab,subtab,child,name)
            backupval[id] = val[id]
        }
        var returnval = sliderFloat(xx, yy, name, min, max, thing,thing2,id,UI.GetValue(tab,subtab,child,name))
        if(globals.active){
            UI.SetValue(tab, subtab, child, name, returnval)
        }
    }
    
    if(ragetab ==0 ){
        child = "General"
        subtab = "GENERAL"
    _do("Enabled")
    _do2("Enabled")
    _do("Pitch resolver")
    _do("Silent")
    _do("Team check")
    _do("Auto scope")
    _do("Strict safety")
    child = "Exploits"
    _do("Hide shots")
    _do2("Hide shots")
    _do("Doubletap")
    _do2("Doubletap")
    _do("Doubletap instant")
    _do3("Doubletap hitchance",0,100,false,0,1)
    
    
    child = "General config"
    var hitboxes = ["Head","Upper chest","Chest","Body","Stomach","Pelvis","Legs","Feet"]
            var prefers = ["Shot","In air","Crouching","Standing","Walking","Running","Backwards","Sideways","Safety"]
            var helper = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096]
            var returnval = 0
            var _do5 = function(y,name,contents,id){
                beginMultiComboBox(xx,yy-y,name,contents,UI.GetValue(tab,subtab,child,name),id)
                var returnval = endComboBox(id)
                if(globals.alpha != 0 && returnval + "" != "undefined")
                    UI.SetValue(tab,subtab,child,name,returnval)
            }
            _do5(-160,"Hitbox override", hitboxes, 49)
            
            _do5(-80,"Prefer body",prefers,50)
            _do5(0,"Prefer head",prefers,51)
            _do5(80,"Multipoint hitboxes",hitboxes,52)
            _do5(160,"Hitboxes",hitboxes,53)
            
    }
    a = beginChild(2,120,450,"Accuracy")
    if(ragetab == 0){
        xx = a[0]
        child = "Accuracy"
        _do3("Hitchance",0,100,false,0,213)
        _do3("Accuracy boost",0,100,false,0,214)
        _do3("Shot delay",0,100,false,0,215)
        _do("Static point scale")
        if(UI.GetValue(tab,subtab,child,"Static point scale")){
            _do3("Head point scale",0,100,false,0,216)
            _do3("Body point scale",0,100,false,0,217)
        }
        _do3("Maximum misses",0,6,false,0,218)
        _do3("Minimum damage (visible)",0,100,false,0,219)
        _do3("Minimum damage (behind wall)",0,100,false,0,220)
        _do3("Minimum damage (on key)",0,100,false,0,221)
        _do3("Health based override",0,100,false,0,222)
        yy-=5
        _do("Auto stop")
        var _do5 = function(y,name,contents,id){
            beginMultiComboBox(xx,yy-y,name,contents,UI.GetValue(tab,subtab,child,name),id)
            var returnval = endComboBox(id)
            if(globals.alpha != 0 && returnval + "" != "undefined")
                UI.SetValue(tab,subtab,child,name,returnval)
        }
        yy+=40
        beginComboBox(xx,yy-10,"Priority",["Damage","Accuracy","Safety"],UI.GetValue("Rage","GENERAL","General config","Priority"),54)
        var returnval = endComboBox(54)
        if(returnval + "" != "undefined" && globals.active)
        UI.SetValue("Rage","GENERAL","General config","Priority", returnval)
        yy-=80
        
        _do5(5,"Auto stop mode",["Duck","Between shots","Center only","Lethal only","Visible only","In air","Force accuracy"], 48)
        
        
    }
    if(ragetab != 0){
        switch(ragetab){
        case 1:
            subtab = "PISTOL"
            child = "Pistol config"
            break
        case 2:
            subtab = "HEAVY PISTOL"
            child = "Heavy pistol config"
            break
        case 3:
            subtab = "SCOUT"
            child = "Scout config"
            break
        case 4:
            subtab = "AWP"
            child = "AWP config"
            break
        case 5:
            subtab = "AUTOSNIPER"
            child = "Auto config"
            break
        }
        _do("Override default")
        if(UI.GetValue(tab,subtab,child,"Override default")){
            
            var hitboxes = ["Head","Upper chest","Chest","Body","Stomach","Pelvis","Legs","Feet"]
            var prefers = ["Shot","In air","Crouching","Standing","Walking","Running","Backwards","Sideways","Safety"]
            var helper = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096]
            var returnval = 0
            var _do5 = function(y,name,contents,id){
                beginMultiComboBox(xx,yy-y,name,contents,UI.GetValue(tab,subtab,child,name),id)
                var returnval = endComboBox(id)
                if(globals.active && returnval + "" != "undefined")
                    UI.SetValue(tab,subtab,child,name,returnval)
            }
            spacingBetweenCheckboxes+=40
            _do5(-160,"Hitbox override", hitboxes, 38+ragetab)
            _do5(-80,"Prefer body",prefers,33+ragetab)
            _do5(-0,"Prefer head",prefers,28+ragetab)
            _do5(80,"Multipoint hitboxes",hitboxes,23+ragetab)
            _do5(160,"Hitboxes",hitboxes,17+ragetab)
            beginComboBox(xx,yy-240,"Priority",["Damage","Accuracy","Safety"],UI.GetValue(tab,subtab,child,"Priority"),55+ragetab)
            var returnval = endComboBox(55+ragetab)
            if(returnval + "" != "undefined" && globals.active)
            UI.SetValue(tab,subtab,child,"Priority", returnval)
            spacingBetweenCheckboxes-=40
            if(ragetab == 4){
                _do("Safe AWP")
            }
            
            
        }
    }
    
    if(UI.GetValue(tab,subtab,child,"Override default")){
        child = "Accuracy"
        xx = a[0]
        yy = a[1]
        spacingBetweenCheckboxes = 0
        _do3("Hitchance",0,100,false,0,57+ragetab)
        _do3("Accuracy boost",0,100,false,0,63+ragetab)
        _do3("Shot delay",0,100,false,0,69+ragetab)
        _do("Static point scale")
        if(UI.GetValue(tab,subtab,child,"Static point scale")){
            _do3("Head point scale",0,100,false,0,75+ragetab)
            _do3("Body point scale",0,100,false,0,81+ragetab)
        }
        _do3("Maximum misses",0,6,false,0,87+ragetab)
        
        child = "Damage"
        _do3("Minimum damage (visible)",0,100,false,0,93+ragetab)
        _do3("Minimum damage (behind wall)",0,100,false,0,99+ragetab)
        _do3("Minimum damage (on key)",0,100,false,0,105+ragetab)
        _do3("Health based override",0,20,false,0,111+ragetab)
        child = "Accuracy"
        _do("Auto stop")
        var _do5 = function(y,name,contents,id){
            beginMultiComboBox(xx,yy-y,name,contents,UI.GetValue(tab,subtab,child,name),id)
            var returnval = endComboBox(id)
            if(globals.alpha != 0 && returnval + "" != "undefined")
                UI.SetValue(tab,subtab,child,name,returnval)
        }
       
        _do5(0,"Auto stop mode",["Duck","Between shots","Center only","Lethal only","Visible only","In air","Force accuracy"], 43+ragetab)
    }
}
var realjitteramount = [0,0]
var fakejitteramount = [0,0]
var fakejitterdelay = 0


var offsetjitteramount = [0,0]
var invertonswitch = false
var offsetjitteramountdelay = 0

var flip = 0
var flip2 = false
var flip3 = false
var flip4 = false
var a = 0
var b = 0
var c = 0
var spinbot = false
var spinspeed = 0

var yaw = 0
function onCreateMove(){
    if(!AntiAim.GetOverride())
    return
    var fakeamount = UI.GetValue("Script Items","Fake offset")
    var realamount = UI.GetValue("Script Items","Real offset")
    var realjitter = UI.GetValue("Script Items","Jitter real")
    var fakejitter = UI.GetValue("Script Items","Jitter fake")

    realjitteramount[0] = UI.GetValue("Script Items","Real 1st yaw")
    realjitteramount[1] = UI.GetValue("Script Items","Real 2nd yaw")

    fakejitteramount[0] = UI.GetValue("Script Items","Fake 1st yaw")
    fakejitteramount[1] = UI.GetValue("Script Items","Fake 2nd yaw")
    fakejitterdelay = UI.GetValue("Script Items","Fake delay")

    var offsetjitter = UI.GetValue("Script Items","Jitter offset")
    offsetjitteramount[0] = UI.GetValue("Script Items","Offset 1st yaw")
    offsetjitteramount[1] = UI.GetValue("Script Items","Offset 2nd yaw")
    offsetjitteramountdelay = UI.GetValue("Script Items","Offset delay")
    var inverted = UI.IsHotkeyActive("Anti-Aim","Fake angles","Inverter")
    AntiAim.SetRealOffset(inverted? realamount : -realamount)
    AntiAim.SetLBYOffset(inverted ? fakeamount : -fakeamount)
   
    if(spinbot){
        yaw += spinspeed
        UI.SetValue("Anti-Aim","Rage Anti-Aim","Yaw offset",(yaw%360)-180)
    }
    flip++
    if(realjitter){
        if(flip % 3 == 0)
            flip2 = !flip2

        a = flip2?realjitteramount[0]:realjitteramount[1]

        AntiAim.SetRealOffset(inverted ? a : -a)
    }
    if(fakejitter){
        if(flip % fakejitterdelay.toFixed(0) == 0){
            flip3 = !flip3
        }
        
        b = flip3 ? fakejitteramount[0] : fakejitteramount[1]
        
        AntiAim.SetLBYOffset(inverted?b:-b)
    }
    if(offsetjitter){
        if(flip % offsetjitteramountdelay.toFixed(0) == 0){
            flip4 = !flip4
            if(invertonswitch){
                UI.ToggleHotkey("Anti-Aim","Fake angles","Inverter")
            }
        }
       
        c = flip4 ? offsetjitteramount[0] : offsetjitteramount[1]
        AntiAim.SetFakeOffset(c)
    }
}
function drawAA() {
    var a = beginChild(1,30,540,"General")
    var xx = a[0]
    var yy = a[1]
    var tab = "Anti-Aim"
    var subtab = "Rage Anti-Aim"
    var _do = function (name) {
        if (checkbox(xx, yy, name, UI.GetValue(tab, subtab, name))) UI.SetValue(tab, subtab, name, !UI.GetValue(tab, subtab, name))
    }
    var _do2 = function (name) {
        if (hotkey(xx, yy, name)) {

        }
    }
    var _do3 = function (name,min,max, thing,thing2,id) {
        
        val[id] = UI.GetValue(tab,subtab,name)
        backupval[id] = val[id]
        
        var returnval = sliderFloat(xx, yy, name, min, max, thing,thing2,id,UI.GetValue(tab,subtab,name))
        if(globals.active)
            UI.SetValue(tab, subtab, name, returnval)
    }
    _do("Enabled")
    _do("At targets")
    _do("Auto direction")
    
    _do3("Yaw offset", -180, 180, true,0,2)
    _do3("Jitter offset", -180, 180, true,0,3)
    var combothing = [yy,spacingBetweenCheckboxes]
    spacingBetweenCheckboxes+=40
    var backup = [tab,subtab]
        tab = "Misc"
        subtab = "Script Items"
    _do("Custom desync")
    AntiAim.SetOverride(UI.GetValue(tab,subtab,"Custom desync") ? 1 : 0)
    if(AntiAim.GetOverride()){
        
        if(!UI.GetValue(tab,subtab,"Jitter fake"))
        _do3("Fake offset",-58,58,true,0,600)
        if(!UI.GetValue(tab,subtab,"Jitter real"))
        _do3("Real offset",-58,58,true,0,601)

        //if(checkbox(xx,yy,"Jitter real",realjitter)) realjitter = !realjitter
        _do("Jitter real")
        
        if(UI.GetValue(tab,subtab,"Jitter real")){
            
            UI.SetValue(tab,subtab,"Real 1st yaw",sliderFloat(xx,yy,"1st yaw",-58,58,true,0,352,UI.GetValue(tab,subtab,"Real 1st yaw")))
            realjitteramount[0] = UI.GetValue(tab,subtab,"Real 1st yaw")
            UI.SetValue(tab,subtab,"Real 2nd yaw",sliderFloat(xx,yy,"2nd yaw",-58,58,true,0,353,UI.GetValue(tab,subtab,"Real 2nd yaw")))
            realjitteramount[1] = UI.GetValue(tab,subtab,"Real 2nd yaw")
        }
        _do("Jitter fake")
        if(UI.GetValue(tab,subtab,"Jitter fake")){
            UI.SetValue(tab,subtab,"Fake 1st yaw",sliderFloat(xx,yy,"1st yaw",-58,58,true,0,354,UI.GetValue(tab,subtab,"Fake 1st yaw")))
            fakejitteramount[0] = UI.GetValue(tab,subtab,"Fake 1st yaw")
            UI.SetValue(tab,subtab,"Fake 2nd yaw",sliderFloat(xx,yy,"2nd yaw",-58,58,true,0,355,UI.GetValue(tab,subtab,"Fake 2nd yaw")))
            fakejitteramount[1] = UI.GetValue(tab,subtab,"Fake 2nd yaw")
            UI.SetValue(tab,subtab,"Fake delay",sliderFloat(xx,yy,"Delay",0,100,false,0,356,UI.GetValue(tab,subtab,"Fake delay")))
            fakejitterdelay = UI.GetValue(tab,subtab,"Fake delay")
            fakejitterdelay.toFixed(0)
        }
        _do("Jitter offset")
        if(UI.GetValue(tab,subtab,"Jitter offset")){
            UI.SetValue(tab,subtab,"Offset 1st yaw", sliderFloat(xx,yy,"1st yaw",-180,180,true,0,357,UI.GetValue(tab,subtab,"Offset 1st yaw")))
            offsetjitteramount[0] = UI.GetValue(tab,subtab,"Offset 1st yaw")
            UI.SetValue(tab,subtab,"Offset 2nd yaw", sliderFloat(xx,yy,"2nd yaw",-180,180,true,0,358,UI.GetValue(tab,subtab,"Offset 2nd yaw")))
            offsetjitteramount[1] = UI.GetValue(tab,subtab,"Offset 2nd yaw")
            UI.SetValue(tab,subtab,"Offset delay", sliderFloat(xx,yy,"Delay",0,100,false,0,360,UI.GetValue(tab,subtab,"Offset delay")))
            offsetjitteramountdelay = UI.GetValue(tab,subtab,"Offset delay")
            offsetjitteramountdelay.toFixed(0)
        }
        
    }
    tab = backup[0]
    subtab = backup[1]
    spacingBetweenCheckboxes = combothing[1]
    beginComboBox(xx,yy,"Slow walk mode",["Accurate","Slide fast","Slide slow"],UI.GetValue(tab,"Extra","Slow walk mode"),71)
    var returnval = endComboBox(71)
    if(returnval + "" != "undefined" && globals.active)
    UI.SetValue(tab,"Extra","Slow walk mode",returnval)
    a = beginChild(2,30,540/2,"Extra")
    xx = a[0]
    spacingBetweenCheckboxes = 0
    subtab = "Fake-Lag"
    
    if (checkbox(xx, yy, "Fake-lag", UI.GetValue(tab, subtab, "Enabled"))) UI.SetValue(tab, subtab, "Enabled", !UI.GetValue(tab, subtab, "Enabled"))
    _do3("Limit",0,16,false,0,4)
    _do3("Jitter",0,100,false,0,5)
    beginMultiComboBox(xx,yy-40,"Triggers",["In air","On peek","On shot","On land","While reloading","On weapon switch","On velocity change","Break Lag Comp"],UI.GetValue(tab,subtab,"Triggers"),1)
    _do3("Trigger limit",0,16,false,0,6)
    var returnval = endComboBox(1)
    if(globals.active && returnval + "" != "undefined"){
        UI.SetValue(tab,subtab,"Triggers",returnval)
    }
    beginChild(2,30+580/2,500/2,"Desync")
    spacingBetweenCheckboxes = 270+20
    subtab = "Fake angles"
    _do("Enabled")
    spacingBetweenCheckboxes+=80
    
    _do("Desync on shot")
    _do("Hide real angle")
    _do("Avoid overlap")
    _do("Fake desync")
    beginMultiComboBox(xx,yy,"Inverter flip", ["Walk","Run","In air"], UI.GetValue(tab,subtab,"Inverter flip"), 100)
    var returnval = endComboBox(100)
    if(returnval + "" != "undefined" && globals.alpha != 0)
        UI.SetValue(tab,subtab,"Inverter flip", returnval)
    
        
    beginComboBox(xx,yy-160,"LBY mode",["Normal","Opposite","Sway"],UI.GetValue(tab,subtab,"LBY mode"),62)
    returnval = endComboBox(62)
    if(returnval + "" != "undefined" && globals.active)
        UI.SetValue(tab,subtab,"LBY mode", returnval)
    beginComboBox(xx,yy-240,"Air mode",["Normal","Spin"],UI.GetValue(tab,subtab,"Air mode"),61)
    returnval = endComboBox(61)
    if(returnval + "" != "undefined" && globals.active)
        UI.SetValue(tab,subtab,"Air mode", returnval)
    
}
var namee = "a"
var legitTab = 0
var backuplegittab = 0
var lasttab = 0
function drawLegit() {
    var wepFont = Render.AddFont("AstriumWep", 25, 100)
    lasttab = legitTab
    if (globals.alpha != 0) {
        var xx = globals.X() + 105
        var y = globals.Y() + 20
        beginChild(1 | 2,30,70,"Weapon Type")
        Render.StringCustom(xx + 90, y + 30, 0, "G", legitTab == 1 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], wepFont)
        if (cursorBetween(xx + 90, y + 30, 100, 100) && Input.IsKeyPressed(0x01)) {
            legitTab = 1
            backuplegittab = legitTab
        }
        Render.StringCustom(xx + 30, y + 30, 0, "v", legitTab == 0 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], wepFont)
        if (cursorBetween(xx + 30, y + 30, 70, 70) && Input.IsKeyPressed(0x01)) {
            legitTab = 0
            backuplegittab = legitTab
        }
        Render.StringCustom(xx + 180, y + 30, 0, "W", legitTab == 2 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], wepFont)
        if (cursorBetween(xx + 180, y + 30, 70, 70) && Input.IsKeyPressed(0x01)) {
            legitTab = 2
            backuplegittab = legitTab
        }
        Render.StringCustom(xx + 280, y + 30, 0, "Z", legitTab == 3 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], wepFont)
        if (cursorBetween(xx + 280, y + 30, 100, 70) && Input.IsKeyPressed(0x01)) {
            legitTab = 3
            backuplegittab = legitTab
        }
        Render.StringCustom(xx + 400, y + 30, 0, "L", legitTab == 4 ? [200, 200, 200, globals.alpha] : [150, 150, 150, globals.alpha], wepFont)
        if (cursorBetween(xx + 400, y + 30, 70, 70) && Input.IsKeyPressed(0x01)) {
            legitTab = 4
            backuplegittab = legitTab
        }
    }
    legitTab = backuplegittab // fixed lol
    if(legitTab != lasttab){
        comboactive = -1
    }
    if (legitTab == 0) {
        
        var a = beginChild(1,120,450,"General")
        var xx = a[0]-20
        var y = a[1]-140
        var tab = "Legit"
        var subtab = "GENERAL"
        var child = "General"
        var _do = function (name) {
            if (checkbox(xx + 20, y+140, name, UI.GetValue(tab, subtab, child, name)) && globals.active) UI.SetValue(tab, subtab, child, name, !UI.GetValue(tab, subtab, child, name))
        }
        var _do2 = function (name, min, max, thing, thing2,id) {
            if(!globals.active){
                val[id] = UI.GetValue(tab,subtab,child,name)
                backupval[id] = val[id]
            }
            var clamp = function (val, min, max) {
                if (val > max)
                    return max
                if (min > val)
                    return min
                return val
            }
            var returnval = sliderFloat(xx + 20, y + 140, name, min, max, thing, thing2,id,UI.GetValue(tab,subtab,child,name))
            if(globals.active)
                UI.SetValue(tab, subtab, child, name, clamp(returnval, min, max))
        }
        _do("Enabled")
        _do2("Reaction time", 0, 0.4, false, 2,7)
        child = "Triggerbot"
        if (checkbox(xx + 20, y + 140, "Triggerbot", UI.GetValue(tab, subtab, child, "Enabled"))) UI.SetValue(tab, subtab, child, "Enabled", !UI.GetValue(tab, subtab, child, "Enabled"))
        _do("Magnet")
        child = "Backtracking"
        if (checkbox(xx + 20, y + 140, "Backtrack", UI.GetValue(tab, subtab, child, "Enabled"))) UI.SetValue(tab, subtab, child, "Enabled", !UI.GetValue(tab, subtab, child, "Enabled"))
        _do2("Maximum time", 0, 0.2, false, 2,8)


        xx = beginChild(2,120,450,"General Config")[0] - 20
        
        spacingBetweenCheckboxes = 0
        child = "Default config"
        spacingBetweenCheckboxes += 80
        _do2("Fov", 0, 30, false, 2,9)
        _do2("Deadzone", 0, 1, false, 2,10)
        _do2("Speed (yaw)", 0, 100, false, 0,11)
        

        _do2("Speed (pitch)", 0, 100, false, 0,12)
         beginMultiComboBox(xx+20,y-30,"Hitboxes",["Head","Upper Chest","Chest","Body","Pelvis"],UI.GetValue(tab,subtab,child,"Hitboxes"),1)
        
        var returnval = endComboBox(1)
        if(globals.active && returnval + "" != "undefined"){
            UI.SetValue(tab,subtab,child,"Hitboxes",returnval)
        }
        beginComboBox(xx+20,y-110,"Hitbox priority",["Head","Body","Closest"],UI.GetValue(tab,subtab,child,"Hitbox priority"),63)
        returnval = endComboBox(63)
        if(returnval + "" != "undefined" && globals.active)
        UI.SetValue(tab,subtab,child,"Hitbox priority", returnval)
        spacingBetweenCheckboxes-=80
        _do2("Recoil control", 0, 100, false, 0,13)
        _do2("Assist", 0, 100, false, 0,14)
        _do2("Triggerbot hitchance", 0, 100, false, 0,15)
    }
    if (legitTab != 0) {


        var xx = globals.X() + 115
        var y = globals.Y() + 30
       
        var a = beginChild(1,120,450,"General")
        xx = a[0]-20
        y = a[1]-140
        var tab = "Legit"
        var subtab = ""
        if (legitTab == 1) subtab = "PISTOL"
        if (legitTab == 2) subtab = "RIFLE"
        if (legitTab == 3) subtab = "SNIPER"
        if (legitTab == 4) subtab = "SMG"
        
        var child = "General"
        var _do = function (name) {
            if (checkbox(xx + 20, y + 140, name, UI.GetValue(tab, subtab, child, name)) && globals.active) UI.SetValue(tab, subtab, child, name, !UI.GetValue(tab, subtab, child, name))
        }
        var _do2 = function (name, min, max, thing, thing2,id) {
            if(!globals.active){
                val[id] = UI.GetValue(tab,subtab,child,name)
                backupval[id] = val[id]
            }
            var clamp = function (val, min, max) {
                if (val > max)
                    return max
                if (min > val)
                    return min
                return val
            }
            var returnval = sliderFloat(xx + 20, y + 140, name, min, max, thing, thing2,id,UI.GetValue(tab,subtab,child,name))
            if(globals.active)
                UI.SetValue(tab, subtab, child, name, clamp(returnval, min, max))
        }
        _do("Override default")
        if (UI.GetValue(tab, subtab, child, "Override default")) {
            child = "Backtracking"
            if (checkbox(xx + 20, y + 140, "Backtrack", UI.GetValue(tab, subtab, child, "Enabled"))) UI.SetValue(tab, subtab, child, "Enabled", !UI.GetValue(tab, subtab, child, "Enabled"))
            _do2("Maximum time", 0, 0.2, false, 2,16+legitTab)
            var text = ""
            if (globals.alpha!=0) {
                spacingBetweenCheckboxes = 0
                switch(legitTab){
                    case 1:
                        text = "Pistol Config"
                    break
                    case 2:
                        text = "Rifle Config"
                    break
                    case 3:
                        text = "Sniper Config"
                    break
                    case 4:
                        text = "SMG Config"
                    break
                }
                var a = beginChild(2,120,450,text)
                xx = a[0]-20
                y = a[1]-140
            }
            switch(legitTab){
                case 1:
                    child = "Pistol config"
                break
                case 2:
                    child = "Rifle config"
                break
                case 3:
                    child = "Sniper config"
                break
                case 4:
                    child = "SMG config"
                break
            }
            beginMultiComboBox(xx+20,y+10,"Hitboxes",["Head","Upper Chest","Chest","Body","Pelvis"],UI.GetValue(tab,subtab,"General","Hitboxes"),4+legitTab)
            spacingBetweenCheckboxes+=40
            _do2("Fov", 0, 30, false, 2,20+legitTab)
            _do2("Deadzone", 0, 1, false, 2,24+legitTab)
            _do2("Speed (yaw)", 0, 100, false, 0,28+legitTab)
            _do2("Speed (pitch)", 0, 100, false, 0,32+legitTab)
            var returnval = endComboBox(4+legitTab)
            if(returnval + "" != "undefined" && globals.active)
                UI.SetValue(tab,subtab,"General","Hitboxes", returnval)
            beginComboBox(xx+20,y-70,"Hitbox priority",["Head","Body","Closest"],UI.GetValue(tab,subtab,"General","Hitbox priority"),65+legitTab)
            returnval = endComboBox(65+legitTab)
            if(returnval + "" != "undefined" && globals.active)
            UI.SetValue(tab,subtab,"General","Hitbox priority",returnval)
            spacingBetweenCheckboxes-=40
            _do2("Recoil control", 0, 100, false, 0,36+legitTab)
            _do2("Assist", 0, 100, false, 0,40+legitTab)
            _do2("Triggerbot hitchance", 0, 100, false, 0,44+legitTab)
        }
    }
    if(legitTab != lasttab) {
        sliderdist = []
        lasttab = legitTab
    }
}
var visualstab = 0
var colvalue = []
var colkeydown = []
var coloridactive = -1
function drawVisuals() {
    var xx = globals.X() + 130
    var yy = globals.Y() + 50
    var tab = "Visual"
    var subtab = "SELF"
    var child = "ESP"
    var _do = function (name) {
        if (checkbox(xx, yy, name, UI.GetValue(tab, subtab, child, name))) UI.SetValue(tab, subtab, child, name, !UI.GetValue(tab, subtab, child, name))
    }
    var _do2 = function (name, min, max, thing, thing2,id,additive) {
        if(!globals.active){
            val[id] = UI.GetValue(tab,subtab,child,name)
            backupval[id] = val[id]
        }
        var clamp = function (val, min, max) {
            if (val > max)
                return max
            if (min > val)
                return min
            return val
        }
        var returnval = sliderFloat(xx, yy, name, min, max, thing, thing2,id,UI.GetValue(tab,subtab,child,name),additive)
        if(globals.active)
            UI.SetValue(tab, subtab, child, name, clamp(returnval, min, max))
    }
    if (globals.alpha != 0) {
        if(visualstab != 3){
        beginChild(1,30,visualstab == 0 || visualstab == 1 ? (visualstab == 1 ? 410 : 400):540,"ESP")
        var chamstab = beginChild(2,30,380,"Chams")
        var custommat = beginChild(2,430,140,"Custom material")
        
        }
        if(visualstab == 0 || visualstab == 1){
            var freecamtab = beginChild(1,430+20 + (visualstab == 0 ? 0 : 10),visualstab == 0 ? 120 : 110,visualstab == 0 ? "Freecam" : "HUD")
        }

        if(visualstab == 3){
            beginChild(1,30,240,"Map")
            var viewchild = beginChild(1,30+240+20,280,"View")
            var enttab = beginChild(2,30,540,"Entities")
        }
        if(Input.IsKeyPressed(0x01) && cursorBetween(globals.X() + 115 + 10 + 10, globals.Y() + 53, 40,20)){
            visualstab = 0
        }
        if(Input.IsKeyPressed(0x01) && cursorBetween(globals.X() + 115 + 10 + 40, globals.Y() + 53, 80,20)){
            visualstab = 1
        }
        if(Input.IsKeyPressed(0x01) && cursorBetween(globals.X() + 115 + 10 + 100, globals.Y() + 53, 40,20)){
            visualstab = 2
        }
        if(Input.IsKeyPressed(0x01) && cursorBetween(globals.X() + 115 + 10 + 145, globals.Y() + 53, 50,20)){
            visualstab = 3
        }
        Render.String(globals.X() + 115 + 10 + 10, globals.Y() + 53, 0, "Self", visualstab == 0 ? [200, 200, 200, globals.alpha] : [100, 100, 100, globals.alpha], 7)
        Render.String(globals.X() + 115 + 10 + 40, globals.Y() + 53, 0, "Enemies", visualstab == 1 ? [200, 200, 200, globals.alpha] : [100, 100, 100, globals.alpha], 7)
        Render.String(globals.X() + 115 + 10 + 100, globals.Y() + 53, 0, "Team", visualstab == 2 ? [200, 200, 200, globals.alpha] : [100, 100, 100, globals.alpha], 7)
        Render.String(globals.X() + 115 + 10 + 145, globals.Y() + 53, 0, "World", visualstab == 3 ? [200, 200, 200, globals.alpha] : [100, 100, 100, globals.alpha], 7)
    }
   
    var _docolor = function(uicol,alpha,name,id){
        var col = uicol
        if(!globals.active || !colvalue[id]||coloridactive!=id){
            colvalue[id] = uicol
        }
        var r = col[0]
        var g = col[1]
        var b = col[2]
        var a = col[3]
        Render.Rect(xx+169,yy-23+(spacingBetweenCheckboxes),22,12,[65, 65, 65,globals.alpha])
        Render.Rect(xx+168,yy-24+(spacingBetweenCheckboxes),24,14,[5, 5, 5,globals.alpha])
        if(alpha){
            Render.FilledRect(xx+170,yy-22+(spacingBetweenCheckboxes),10,5,[100,100,100,globals.alpha])
            Render.FilledRect(xx+170,yy-22+(spacingBetweenCheckboxes)+5,10,5,[255,255,255,globals.alpha])
            Render.FilledRect(xx+170+10,yy-22+(spacingBetweenCheckboxes),10,5,[255,255,255,globals.alpha])
            Render.FilledRect(xx+170+10,yy-22+(spacingBetweenCheckboxes)+5,10,5,[100,100,100,globals.alpha])
        }
        Render.FilledRect(xx+170,yy-22+(spacingBetweenCheckboxes),20,10,[col[0],col[1],col[2],alpha ? (globals.alpha/255)*a : globals.alpha])
        Render.GradientRect(xx+170,yy-22+(spacingBetweenCheckboxes),20,10,0,[0,0,0,0],[0,0,0,(globals.alpha/255)*100])
        if(cursorBetween(xx+170,yy-22+(spacingBetweenCheckboxes),20,10) && Input.IsKeyPressed(0x01) && coloridactive == -1 && !colkeydown[id]){
            colkeydown[id] = true
            coloridactive = id
        }
        if(!Input.IsKeyPressed(0x01) && coloridactive == id){
            colkeydown[id] = false
        }
        if(coloridactive!=id){
            holding[id+1] = false
            holding[id+2] = false
            holding[id+3] = false
            if(alpha)
                holding[id+4] = false
        }
        if(coloridactive == id){
            var backup2 = yy
            yy-=(alpha?70:60)
            var backup = spacingBetweenCheckboxes
            xx += 20
            yy+=spacingBetweenCheckboxes
            Render.FilledRect(xx+180,yy+9,150,110+(alpha?35:0),[19,19,19,globals.alpha])
            Render.Rect(xx+179,yy+8,152,112+(alpha?35:0),[65, 65, 65,globals.alpha])
            Render.Rect(xx+178,yy+7,154,114+(alpha?35:0),[5, 5, 5,globals.alpha])
            yy-=spacingBetweenCheckboxes
            yy+=20
            var newr = sliderFloat(xx+170,yy,"R:",0,255,false,0,id+1,col[0])
            var newg = sliderFloat(xx+170,yy,"G:",0,255,false,0,id+2,col[1])
            var newb = sliderFloat(xx+170,yy,"B:",0,255,false,0,id+3,col[2])
            if(alpha)
                var newa = sliderFloat(xx+170,yy,"A:",0,255,false,0,id+4,col[3])
            if(!cursorBetween(xx+178,backup2+spacingBetweenCheckboxes-(alpha?193:150),154,114+(alpha?35:0)) && Input.IsKeyPressed(0x01) && !colkeydown[id]){
                coloridactive = -1 
            }
            spacingBetweenCheckboxes = backup
            yy = backup2
            xx-=20
            return [newr,newg,newb,alpha?newa:255]
        }
    }
    
    var backupactive = globals.active
    globals.active = globals.alpha != 0
    yy += 30
    if(visualstab == 0){
        child = "Chams"
        if(chamstab){
            var backup = xx
            xx = chamstab[0]
            yy = chamstab[1]
            spacingBetweenCheckboxes = 0
            spacingBetweenCheckboxes+=40
            var negate = 0
            var _docolor3 = function(name,name2,id){
                var color = UI.GetColor(tab,subtab,child,name)
                color[3] = ((100-UI.GetValue(tab,subtab,child,name2))/100)*255
                var col = _docolor(color,true,name,id)
                if(globals.active && col){
                    UI.SetColor(tab,subtab,child,name,[col[0],col[1],col[2],255])
                    UI.SetValue(tab,subtab,child,name2,((255-col[3])/255)*100)
                }
            }
            var _docolor4 = function(name,id){
                yy+=20
                var col = _docolor(UI.GetColor(tab,subtab,child,name),false,name,id)
                yy-=20
                if(globals.active && col)
                    UI.SetColor(tab,subtab,child,name, col)
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 0){
                _do("Visible override")
                _docolor3("Visible Color","Visible transparency",272)
                if(UI.GetValue(tab,subtab,child,"Visible type") == 5){
                    _docolor4("Visible Color (secondary)",344)
                }
                _do2("Scope blend",0,100,false,0,271)
                negate = 133
                beginComboBox(xx,yy,"Visible type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Visible type"),61)
                var returnval = endComboBox(61)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Visible type",returnval)
                }
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 1){
                _do("Attachment override")
                _docolor3("Attachment Color","Attachment transparency",276)
                if(UI.GetValue(tab,subtab,child,"Attachment type") == 5){
                    _docolor4("Attachment Color (secondary)",340)
                }
                beginComboBox(xx,yy,"Attachment type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Attachment type"),62)
                var returnval = endComboBox(62)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Attachment type",returnval)
                }
                negate = 100
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 2){
                _do("Desync override")
                _docolor3("Desync Color","Desync transparency",280)
                if(UI.GetValue(tab,subtab,child,"Desync type") == 5){
                    _docolor4("Desync Color (secondary)",336)
                }
                spacingBetweenCheckboxes+=40
                _do("Layered")
                beginComboBox(xx,yy-60,"Desync type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Desync type"),63)
                var returnval = endComboBox(63)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child, "Desync type",returnval)
                }
                
                negate = 160
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 3){
                _do("Fakelag override")
                _docolor3("Fakelag Color","Fakelag transparency",284)
                if(UI.GetValue(tab,subtab,child,"Fakelag type") == 5){
                    _docolor4("Fakelag Color (secondary)",332)
                }
                beginComboBox(xx,yy,"Fakelag type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Fakelag type"),64)
                var returnval = endComboBox(64)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child, "Fakelag type",returnval)
                }
                negate = 100
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 4){
                _do("Arms override")
                _docolor3("Arms Color", "Arms transparency",288)
                if(UI.GetValue(tab,subtab,child,"Arms type") == 5){
                    _docolor4("Arms Color (secondary)",328)
                }
                spacingBetweenCheckboxes+=40
                _do("Health based color")
                _do("No sleeve")
                beginComboBox(xx,yy-80,"Arms type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Arms type"),65)
                var returnval = endComboBox(65)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child, "Arms type",returnval)
                }
                negate = 180
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 5){
                _do("Weapon override")
                _docolor3("Weapon Color","Weapon transparency",292)
                if(UI.GetValue(tab,subtab,child,"Weapon type") == 5){
                    _docolor4("Weapon Color (secondary)",324)
                }
                beginComboBox(xx,yy,"Weapon type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Weapon type"),66)
                var returnval = endComboBox(66)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child, "Weapon type",returnval)
                }
                negate = 100
            }
            beginComboBox(xx,yy-negate,"Type",["Visible","Attachments","Desync","Fakelag","Arms","Weapon"],UI.GetValue(tab,subtab,child,"Configure"),60)
            var returnval = endComboBox(60)
            if(globals.active && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,child,"Configure",returnval)
            xx = backup
            spacingBetweenCheckboxes = 0
            yy+=30
        }
        subtab = "SELF"
        child = "ESP"
        _do("Box")
        var col = _docolor(UI.GetColor(tab,subtab,child,"Box"),false,"Box",117)
        if(globals.alpha != 0 && col)
            UI.SetColor(tab,subtab,child,"Box",col)
        _do("Glow")
        col = _docolor(UI.GetColor(tab,subtab,child,"Glow"),true,"Glow",121)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Glow",col)
        _do("Name")
        col = _docolor(UI.GetColor(tab,subtab,child,"Name"),false,"Name",125)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Name",col)
        _do("Health")
        _do("Health color override")
        col = _docolor(UI.GetColor(tab,subtab,child,"Health color override"),false,"Health color override",129)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Health color override",col)
        spacingBetweenCheckboxes+=40
        _do("Ammo")
        col = _docolor(UI.GetColor(tab,subtab,child,"Ammo"),false,"Ammo",133)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Ammo",col)
        spacingBetweenCheckboxes+=40
        _do("Shot timer")
        col = _docolor(UI.GetColor(tab,subtab,child,"Shot timer"),false,"Shot timer",137)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Shot timer",col)
        
        _do("Taser range")
        col = _docolor(UI.GetColor(tab,subtab,child,"Taser range"),true,"Taser range",141)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Taser range",col)
        _do("Knife range")
        col = _docolor(UI.GetColor(tab,subtab,child,"Knife range"),true,"Knife range",145)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Knife range",col)
        _do("Weapon spread")
        col = _docolor(UI.GetColor(tab,subtab,child,"Weapon spread"),true,"Weapon spread",149)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Weapon spread",col)
        _do("Weapon recoil")
        _do("Force crosshair")
        _do("Hold firing animation")
        spacingBetweenCheckboxes += 88
        
        beginMultiComboBox(xx,yy-270,"Flags",["Lag compensation","Money","Armor","Flash","Reloading","Scoping","Defusing","Location","Bomb carrier"],UI.GetValue(tab,subtab,child,"Flags"),11)
        var returnval = endComboBox(11)
        if(globals.active && returnval+ "" != "undefined"){
            UI.SetValue(tab,subtab,child,"Flags",returnval)
        }
        beginMultiComboBox(xx,yy-370,"Weapon",["Icon","Name","Inventory"],UI.GetValue(tab,subtab,child,"Weapon"),10)
        returnval = endComboBox(10)
        if(globals.active&& returnval+ "" != "undefined"){
            UI.SetValue(tab,subtab,child,"Weapon",returnval)
        }
        child = "Freecam"
        if(freecamtab){
        yy = freecamtab[1]
        spacingBetweenCheckboxes =0
        _do("Enable")
        _do("Collision")
        _do2("Speed",100,1000,true,2,237)
        }
        
    }
    if(visualstab == 1){
        child = "Chams"
        subtab = "ENEMIES"
        if(chamstab){
            var backup = xx
            xx = chamstab[0]
            yy = chamstab[1]
            spacingBetweenCheckboxes = 0
            spacingBetweenCheckboxes+=40
            var negate = 0
            var _docolor3 = function(name,name2,id){
                var color = UI.GetColor(tab,subtab,child,name)
                color[3] = ((100-UI.GetValue(tab,subtab,child,name2))/100)*255
                var col = _docolor(color,true,name,id)
                if(globals.active && col){
                    UI.SetColor(tab,subtab,child,name,[col[0],col[1],col[2],255])
                    UI.SetValue(tab,subtab,child,name2,((255-col[3])/255)*100)
                }
            }
            var _docolor4 = function(name,id){
                yy+=20
                var col = _docolor(UI.GetColor(tab,subtab,child,name),false,name,id)
                yy-=20
                if(globals.active && col)
                    UI.SetColor(tab,subtab,child,name, col)
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 0){
                _do("Visible override")
                _docolor3("Visible Color","Visible transparency",324)
                if(UI.GetValue(tab,subtab,child,"Visible type") == 5){
                    _docolor4("Visible Color (secondary)",328)
                }
                negate += 100
                beginComboBox(xx,yy,"Visible type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Visible type"),67)
                var returnval = endComboBox(67)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Visible type",returnval)
                }
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 1){
                _do("Hidden override")
                _docolor3("Hidden Color","Hidden transparency",332)
                if(UI.GetValue(tab,subtab,child,"Hidden type") == 5){
                    _docolor4("Hidden Color (secondary)",336)
                }
                negate += 100
                beginComboBox(xx,yy,"Hidden type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Visible type"),68)
                var returnval = endComboBox(68)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Hidden type",returnval)
                }
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 2){
                _do("Attachment override")
                _docolor3("Attachment Color","Attachment transparency",340)
                if(UI.GetValue(tab,subtab,child,"Attachment type") == 5){
                    _docolor4("Attachment Color (secondary)",344)
                }
                beginComboBox(xx,yy,"Attachment type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Attachment type"),69)
                var returnval = endComboBox(69)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Attachment type",returnval)
                }
                negate += 100
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 3){
                _do("History override")
                _docolor3("History Color","History transparency",348)
                if(UI.GetValue(tab,subtab,child,"History type") == 5){
                    _docolor4("History Color (secondary)",352)
                }
                beginComboBox(xx,yy,"History type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"History type"),70)
                var returnval = endComboBox(70)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child, "History type",returnval)
                }
                negate += 100
            }
            
            beginComboBox(xx,yy-negate,"Type",["Visible","XQZ","Attachments","History"],UI.GetValue(tab,subtab,child,"Configure"),73)
            var returnval = endComboBox(73)
            if(globals.active && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,child,"Configure",returnval)
            xx = backup
            spacingBetweenCheckboxes = 0
            yy+=30
        }
        child = "ESP"
        _do("Box")
        var col = _docolor(UI.GetColor(tab,subtab,child,"Box"),false,"Box",153)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Box",col)
        _do("Glow")
        col = _docolor(UI.GetColor(tab,subtab,child,"Glow"),true,"Glow",157)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Glow",col)
        _do("Name")
        col = _docolor(UI.GetColor(tab,subtab,child,"Name"),false,"Name",161)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Name",col)
        _do("Health")
        _do("Health color override")
        col = _docolor(UI.GetColor(tab,subtab,child,"Health color override"),false,"Health color override",165)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Health color override",col)
        _do("Dormant")

        spacingBetweenCheckboxes += 40
        _do("Ammo")
        col = _docolor(UI.GetColor(tab,subtab,child,"Ammo"),false,"Ammo",169)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Ammo",col)
        spacingBetweenCheckboxes += 40
        _do("Skeleton")
        col = _docolor(UI.GetColor(tab,subtab,child,"Skeleton"),false,"Skeleton",173)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Skeleton",col)
        
        _do("Hitmarker")
        spacingBetweenCheckboxes+=80
        _do("F12 sound (microphone)")
        
        
        //spacingBetweenCheckboxes+=40
        beginMultiComboBox(xx,yy-240,"Weapon",["Icon","Name","Inventory"],UI.GetValue(tab,subtab,child,"Weapon"),2)
        returnval = endComboBox(2)
        if(globals.active && returnval + "" != "undefined"){
            UI.SetValue(tab,subtab,child,"Weapon",returnval)
        }spacingBetweenCheckboxes -= 40
        if(freecamtab){
            yy = freecamtab[1]
            spacingBetweenCheckboxes = 0
            child = "HUD"
            _do("Radar reveal")
            _do("Out of fov")
            var col = _docolor(UI.GetColor(tab,subtab,child,"Out of fov"),true,"Out of fov",238)
            if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Out of fov",col)
            if(UI.GetValue(tab,subtab,child,"Out of fov"))
            _do("Flat arrows")
            _do("Footsteps")
            col = _docolor(UI.GetColor(tab,subtab,child,"Footsteps"),false,"Footsteps",242)
            if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Footsteps",col)
            child = "ESP"
            beginMultiComboBox(xx,yy-300,"Flags",["Lag comp","Money","Armor","Flash","Reloading","Scoping","Defusing","Location","Bomb carrier","Fake duck", "Body damage","Shot","LBY Timer"],UI.GetValue(tab,subtab,child,"Flags"),3)
            returnval = endComboBox(3)
            if(globals.active && returnval + "" != "undefined"){
                UI.SetValue(tab,subtab,child,"Flags",returnval)
            }
            beginComboBox(xx,yy-220,"Killsound",["None","Arena switch","Headshot","Hit","Custom"],UI.GetValue(tab,subtab,"ESP","Killsound"),700)
            returnval = endComboBox(699)
            if(globals.active && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,"ESP","Killsound",returnval)
            beginComboBox(xx,yy-300,"Hitsound",["None","Arena switch","Headshot","Hit","Custom"],UI.GetValue(tab,subtab,"ESP","Hitsound"),699)
            returnval = endComboBox(699)
            if(globals.active && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,"ESP","Hitsound",returnval)
        }
    }
    if(visualstab == 2){
        subtab = "FRIENDLIES"
        child = "Chams"
        if(chamstab){
            var backup = xx
            xx = chamstab[0]
            yy = chamstab[1]
            spacingBetweenCheckboxes = 0
            spacingBetweenCheckboxes+=40
            var negate = 0
            var _docolor3 = function(name,name2,id){
                var color = UI.GetColor(tab,subtab,child,name)
                color[3] = ((100-UI.GetValue(tab,subtab,child,name2))/100)*255
                var col = _docolor(color,true,name,id)
                if(globals.active && col){
                    UI.SetColor(tab,subtab,child,name,[col[0],col[1],col[2],255])
                    UI.SetValue(tab,subtab,child,name2,((255-col[3])/255)*100)
                }
            }
            var _docolor4 = function(name,id){
                yy+=20
                var col = _docolor(UI.GetColor(tab,subtab,child,name),false,name,id)
                yy-=20
                if(globals.active && col)
                    UI.SetColor(tab,subtab,child,name, col)
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 0){
                _do("Visible override")
                _docolor3("Visible Color","Visible transparency",356)
                if(UI.GetValue(tab,subtab,child,"Visible type") == 5){
                    _docolor4("Visible Color (secondary)",360)
                }
                negate += 100
                beginComboBox(xx,yy,"Visible type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Visible type"),74)
                var returnval = endComboBox(74)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Visible type",returnval)
                }
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 1){
                _do("Hidden override")
                _docolor3("Hidden Color","Hidden transparency",364)
                if(UI.GetValue(tab,subtab,child,"Hidden type") == 5){
                    _docolor4("Hidden Color (secondary)",368)
                }
                negate += 100
                beginComboBox(xx,yy,"Hidden type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Visible type"),75)
                var returnval = endComboBox(75)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Hidden type",returnval)
                }
            }
            if(UI.GetValue(tab,subtab,child,"Configure") == 2){
                _do("Attachment override")
                _docolor3("Attachment Color","Attachment transparency",376)
                if(UI.GetValue(tab,subtab,child,"Attachment type") == 5){
                    _docolor4("Attachment Color (secondary)",372)
                }
                beginComboBox(xx,yy,"Attachment type",["Custom","Flat","Pulse","Wireframe","Glow","Glow (two-color)"],UI.GetValue(tab,subtab,child,"Attachment type"),76)
                var returnval = endComboBox(76)
                if(globals.active && returnval + ""!="undefined"){
                    UI.SetValue(tab,subtab,child,"Attachment type",returnval)
                }
                negate += 100
            }
            
            beginComboBox(xx,yy-negate,"Type",["Visible","XQZ","Attachments"],UI.GetValue(tab,subtab,child,"Configure"),77)
            var returnval = endComboBox(77)
            if(globals.active && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,child,"Configure",returnval)
            xx = backup
            spacingBetweenCheckboxes = 0
            yy+=30
        }
        
        child = "ESP"
        _do("Box")
        var col = _docolor(UI.GetColor(tab,subtab,child,"Box"),false,"Box",177)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Box",col)
        _do("Glow")
        col = _docolor(UI.GetColor(tab,subtab,child,"Glow"),true,"Glow",181)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Glow",col)
        _do("Name")
        col = _docolor(UI.GetColor(tab,subtab,child,"Name"),false,"Name",185)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Name",col)
        _do("Health")
        _do("Health color override")
        col = _docolor(UI.GetColor(tab,subtab,child,"Health color override"),false,"Health color override",189)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Health color override",col)
            spacingBetweenCheckboxes+=40
        _do("Ammo")
        col = _docolor(UI.GetColor(tab,subtab,child,"Ammo"),false,"Ammo",193)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Ammo",col)
            spacingBetweenCheckboxes+=40
        _do("Skeleton")
        col = _docolor(UI.GetColor(tab,subtab,child,"Skeleton"),false,"Skeleton",197)
        if(globals.active && col)
            UI.SetColor(tab,subtab,child,"Skeleton",col)
            beginMultiComboBox(xx,yy-62,"Flags",["Lag compensation","Money","Armor","Flash","Reloading","Scoping","Defusing","Location","Bomb carrier"],UI.GetValue(tab,subtab,child,"Flags"),11)
        var returnval = endComboBox(11)
        if(globals.active && returnval+ "" != "undefined"){
            UI.SetValue(tab,subtab,child,"Flags",returnval)
        }
        beginMultiComboBox(xx,yy-162,"Weapon",["Icon","Name","Inventory"],UI.GetValue(tab,subtab,child,"Weapon"),10)
        returnval = endComboBox(10)
        if(globals.active&& returnval+ "" != "undefined"){
            UI.SetValue(tab,subtab,child,"Weapon",returnval)
        }
    }
    if(visualstab != 3){
        child = "Custom material"
        xx = globals.X() + 130 + 130 + 125
        spacingBetweenCheckboxes = 0
        if(custommat){
        yy = custommat[1]
        _do2("Reflectivity",0,100,false,0,51)
        _do2("Pearlescent",0,100,false,0,52)
        _do2("Phong",0,100,false,0,53)
        }
    }
    if(visualstab == 3){
        subtab = "WORLD"
        child = "Map"
        _do("Fullbright")
        _do2("Nightmode",0,1,false,2,48)
        _do2("Wall transparency",0,1,false,2,49)
        _do2("Prop transparency",0,1,false,2,50)
        if(viewchild){
            child = "View"
            yy = viewchild[1]-120
            _do2("Field of view",50,150,true,0,201)
            _do("FOV while scoped")
            _do2("Zoom",0,1,false,2,202)
            _do2("Thirdperson",100,300,true,0,203)
            _do("Spectator third person")
            _do("First person with grenade")
            beginComboBox(xx,yy-260,"Skybox",["Off","Daylight","Sunny","Overcast","Clear blue","Dawn","Cloudy","Night cloudy", "Night purple","Night dark","Mountains","Jungle","Custom"],UI.GetValue(tab,subtab,"Map","Skybox"),701)
            var returnval = endComboBox(701)
            if(globals.active && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,"Map","Skybox",returnval)
        }
        if(enttab){
            child = "Entities"
            spacingBetweenCheckboxes = 280
            //204
            xx = enttab[0]
            yy = enttab[1]-280
            spacingBetweenCheckboxes+=200
            _do("Bullet impacts (client)")
            var col = _docolor(UI.GetColor(tab,subtab,child,"Bullet impacts (client)"),true,"Bullet impacts (client)",204)
            if(globals.active && col)
                UI.SetColor(tab,subtab,child,"Bullet impacts (client)",col)
            _do("Bullet impacts (server)")
            col = _docolor(UI.GetColor(tab,subtab,child,"Bullet impacts (server)"),true,"Bullet impacts (server)",208)
            if(globals.active && col)
                UI.SetColor(tab,subtab,child,"Bullet impacts (server)",col)
            _do("Bullet tracers")
            col = _docolor(UI.GetColor(tab,subtab,child,"Bullet tracers"),true,"Bullet tracers",212)
            if(globals.active && col)
                UI.SetColor(tab,subtab,child,"Bullet tracers",col)
            _do("Grenade prediction")
            col = _docolor(UI.GetColor(tab,subtab,child,"Grenade prediction"),true,"Grenade prediction",370)
            if(globals.active && col)
                UI.SetColor(tab,subtab,child,"Grenade prediction", col)
            _do("Penetration dot")
            _do("Penetration crosshair")
            var _do6 = function(alpha,name,id,yyy){
                var uicol = UI.GetColor(tab,subtab,child,name)
                var backup = yy
                yy -= yyy
                var returnval = _docolor(uicol,alpha,name,id)
                yy = backup
                if(globals.alpha!=0&&returnval){
                    UI.SetColor(name,subtab,child,name,returnval)
                }
            }
            var _do5 = function(y,name,contents,id){
                beginMultiComboBox(xx,yy-y,name,contents,UI.GetValue(tab,subtab,child,name),id)
                var returnval = endComboBox(id)
                if(globals.active && returnval+ "" != "undefined")
                    UI.SetValue(tab,subtab,child,name,returnval)
            }
            _do5(160,"Removals",["Smoke","Flash","Scope","Visual kick","Visual punch","Scope time","Landing bob"],16)
            _do5(240,"Weapons",["Text","Glow","Icon","Ammo","Distance"],15)
            _do6(false,"Weapons", 224,242)
            _do5(320,"Grenades",["Text","Glow","Icon","Timer"],14)
            _do6(false,"Grenades",228,322)
            _do5(400,"Hostage",["Text","Circle"],13)
            _do6(false,"Hostage",232,402)
            _do5(480,"Bomb",["Text","Glow","Icon","Timer"],12)
            _do6(false,"Bomb",236,482)
            
            
            
        }
    }
    globals.active = backupactive
}
function drawMisc() {
    var a = beginChild(1,30,330,"General")
    var xx = a[0]
    var yy = a[1]
    var tab = "Misc"
    var subtab = "GENERAL"
    var child = "Matchmaking"
    var _do = function (name) {
        if (checkbox(xx, yy, name, UI.GetValue(tab, subtab, child, name))) UI.SetValue(tab, subtab, child, name, !UI.GetValue(tab, subtab, child, name))
    }
    var _do2 = function (name, min, max, thing, thing2,id) {
        if(!globals.active){
            val[id] = UI.GetValue(tab,subtab,child,name)
            backupval[id] = val[id]
        }
        var clamp = function (val, min, max) {
            if (val > max)
                return max
            if (min > val)
                return min
            return val
        }
        var returnval = sliderFloat(xx, yy, name, min, max, thing, thing2,id,UI.GetValue(tab,subtab,child,name))
        if(globals.active)
            UI.SetValue(tab, subtab, child, name, clamp(returnval, min, max))
    }
    var _docolor = function(uicol,alpha,name,id){
        var col = uicol
        if(!globals.active || !colvalue[id]||coloridactive!=id){
            colvalue[id] = uicol
        }
        var r = col[0]
        var g = col[1]
        var b = col[2]
        var a = col[3]
        Render.Rect(xx+169,yy-23+(spacingBetweenCheckboxes),22,12,[65, 65, 65,globals.alpha])
        Render.Rect(xx+168,yy-24+(spacingBetweenCheckboxes),24,14,[5, 5, 5,globals.alpha])
        if(alpha){
            Render.FilledRect(xx+170,yy-22+(spacingBetweenCheckboxes),10,5,[100,100,100,globals.alpha])
            Render.FilledRect(xx+170,yy-22+(spacingBetweenCheckboxes)+5,10,5,[255,255,255,globals.alpha])
            Render.FilledRect(xx+170+10,yy-22+(spacingBetweenCheckboxes),10,5,[255,255,255,globals.alpha])
            Render.FilledRect(xx+170+10,yy-22+(spacingBetweenCheckboxes)+5,10,5,[100,100,100,globals.alpha])
        }
        Render.FilledRect(xx+170,yy-22+(spacingBetweenCheckboxes),20,10,[col[0],col[1],col[2],alpha ? (globals.alpha/255)*a : globals.alpha])
        Render.GradientRect(xx+170,yy-22+(spacingBetweenCheckboxes),20,10,0,[0,0,0,0],[0,0,0,(globals.alpha/255)*100])
        if(cursorBetween(xx+170,yy-22+(spacingBetweenCheckboxes),20,10) && Input.IsKeyPressed(0x01) && coloridactive == -1 && !colkeydown[id]){
            colkeydown[id] = true
            coloridactive = id
        }
        if(!Input.IsKeyPressed(0x01) && coloridactive == id){
            colkeydown[id] = false
        }
        if(coloridactive!=id){
            holding[id+1] = false
            holding[id+2] = false
            holding[id+3] = false
            if(alpha)
                holding[id+4] = false
        }
        if(coloridactive == id){
            var backup2 = yy
            yy-=(alpha?70:60)
            var backup = spacingBetweenCheckboxes
            
            //yy+=spacingBetweenCheckboxes
            xx += 20
            yy+=spacingBetweenCheckboxes
            Render.FilledRect(xx+180,yy+9,150,110+(alpha?35:0),[19,19,19,globals.alpha])
            Render.Rect(xx+179,yy+8,152,112+(alpha?35:0),[65, 65, 65,globals.alpha])
            Render.Rect(xx+178,yy+7,154,114+(alpha?35:0),[5, 5, 5,globals.alpha])
            yy-=spacingBetweenCheckboxes
            yy+=20
            var newr = sliderFloat(xx+170,yy,"R:",0,255,false,0,id+1,col[0])
            var newg = sliderFloat(xx+170,yy,"G:",0,255,false,0,id+2,col[1])
            var newb = sliderFloat(xx+170,yy,"B:",0,255,false,0,id+3,col[2])
            if(alpha)
                var newa = sliderFloat(xx+170,yy,"A:",0,255,false,0,id+4,col[3])
            if(!cursorBetween(xx+178,backup2+spacingBetweenCheckboxes-(alpha?193:150),154,114+(alpha?35:0)) && Input.IsKeyPressed(0x01) && !colkeydown[id]){
                coloridactive = -1 
            }
            spacingBetweenCheckboxes = backup
            //yy+=alpha?20:0
            yy = backup2
            xx-=20
            return [newr,newg,newb,alpha?newa:255]
        }
    }
    _do("Auto accept")
    _do("Rank revealer")
    _do("Unlock inventory access")
    _do("Bypass sv_pure")
    child = "Miscellaneous"
    _do("Force sv_cheats")
    _do("Hidden cvars")
    _do("Auto defuse")
    _do("Ragdoll gravity")
    _do("Ragdoll force")
    _do("Preserve killfeed")
    _do("Extended backtracking")
    _do("Auto fire")
    _do2("Delay",0,0.3,false,2,9999)
    a = beginChild(2,30,240,"Movement")
    xx = a[0]
    yy = a[1]
    child = "Movement"
    _do("Auto bunnyhop")
    _do("Slide walk")
    _do("Accurate walk")
    _do("Fast stop")
    _do("Fast crouch")
    _do("Crouch in air")
    _do("Strafe assistance")
    _do("Edge jump")
    _do("Auto peek")
    var backup = [yy,spacingBetweenCheckboxes]
    subtab = "PERFORMANCE & INFORMATION"
    child = "Performance"
    a = beginChild(2,290,130,"Performance")
    yy = a[1]
    _do("Disable post processing")
    _do("Disable fog")
    _do("Disable shadows")
    _do("Disable blood")
    _do("Disable teammate rendering")
    beginComboBox(xx,backup[0]+backup[1]-100,"Auto strafe",["None","Legit","Normal","Directional","Rage"],UI.GetValue(tab,"GENERAL","Movement","Auto strafe"),702)
    var returnval = endComboBox(702)
    if(globals.active && returnval + "" != "undefined")
    UI.SetValue(tab,"GENERAL","Movement","Auto strafe",returnval)
    a = beginChild(1,380,190,"Information")
    xx = a[0]
    yy = a[1]
    child = "Information"
    _do("Watermark")
    _do("Spectator list")
    _do("Team damage list")
    _do("Show keybind states")
    beginComboBox(xx,yy-160,"Clantag",["None","onetap","Custom","Backwards"],UI.GetValue(tab,"GENERAL","Miscellaneous","Clantag"),698)
    var returnval = endComboBox(698)
    if(globals.alpha && returnval + "" != "undefined"){
        UI.SetValue(tab,"GENERAL","Miscellaneous","Clantag",returnval)
    }
    spacingBetweenCheckboxes-=40
    beginMultiComboBox(xx,yy+40,"Log events",["Damage dealt","Damage received","Damage rejected","Spread misses","Occlusion misses","Hostage taken","Bomb plants","Weapon purchases","Grenade purchases"],UI.GetValue(tab,subtab,child,"Log events"),9)
    returnval = endComboBox(9)
    if(globals.alpha && returnval + "" != "undefined"){
        UI.SetValue(tab,subtab,child,"Log events",returnval)
    }
    beginMultiComboBox(xx,yy-40,"Log output",["Event log","Console"],UI.GetValue(tab,subtab,child,"Log output"),8)
    returnval = endComboBox(8)
    if(globals.alpha != 0 && returnval + "" != "undefined")
        UI.SetValue(tab,subtab,child,"Log output",returnval)
    a = beginChild(2,440,130,"Sound")
    yy+=117
    var col = _docolor(UI.GetColor(tab,subtab,child,"Log output"),false,"Log output",360)

    if(globals.alpha != 0 && col)
    UI.SetColor(tab,subtab,child,"Log output",col)
    yy = a[1]
    xx = a[0]
    
    child = "Sound"
    _do2("Weapon volume",0,100,false,0,54)
    _do2("Footstep volume",0,100,false,0,55)
    _do2("Other sound volume",0,100,false,0,56)
}
function drawSkins() {
    
    var a = beginChild(1,30,540,"Viewmodel")
    var xx = a[0]
    var yy = a[1]
    var child = "Viewmodel"
    var tab = "Misc"
    var subtab = "SKINS"
    var _do = function (name) {
        if (checkbox(xx, yy, name, UI.GetValue(tab, subtab, child, name))) UI.SetValue(tab, subtab, child, name, !UI.GetValue(tab, subtab, child, name))
    }
    var _do3 = function (name, min, max, thing,thing2,id) {
        if(!globals.active){
            val[id] = UI.GetValue(tab,subtab,child,name)
            backupval[id] = val[id]
        }
        var returnval = sliderFloat(xx, yy, name, min, max, thing,thing2,id,UI.GetValue(tab,subtab,child,name))
        if(globals.active){
            UI.SetValue(tab, subtab, child, name, returnval)
        }
    }
    var _do5 = function(y,name,contents,id){
        beginMultiComboBox(xx,yy-y,name,contents,UI.GetValue(tab,subtab,child,name),id)
        var returnval = endComboBox(id)
        if(globals.alpha != 0 && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,child,name,returnval)
    }
    _do("Flip knife hand")
    _do("Visualize silent angles")
    _do3("FOV",-40,40,true,2,400)
    _do3("X offset",-40,40,true,2,401)
    _do3("Y offset",-40,40,true,2,402)
    _do3("Z offset",-40,40,true,2,403)
    _do3("Roll",-40,40,true,2,404)
    _do5(0,"Force rare animations",["Desert Eagle flip","Falchion knife","Revolver flip"], 100)
    a = beginChild(2,30,540,"Extra")
    xx = a[0]
    yy = a[1]
    tab = "Misc"
    subtab = "GENERAL"
    child = "Buybot"
    _do("Enable")
    beginMultiComboBox(xx,yy+80,"Utility",["Helmet","Kevlar","HE Grenade","Molotov","Smoke grenade","Flashbang","Decoy grenade","Taser","Defuse kit"],UI.GetValue(tab,subtab,child,"Utility"),120)
    var returnval = endComboBox(695)
    if(globals.active && returnval + "" != "undefined")
    UI.SetValue(tab,subtab,child,"Utility",returnval)
    beginComboBox(xx,yy,"Secondary",["None","Tec-9/Five Seven","Dual Berettas","DEagle/Revolver","Glock/USP","P250"],UI.GetValue(tab,subtab,child,"Secondary"),696)
    returnval = endComboBox(696)
    if(globals.active && returnval + "" != "undefined")
    UI.SetValue(tab,subtab,child,"Secondary",returnval)
    beginComboBox(xx,yy-80,"Primary",["None","AK47/M4A4","AWP","GALIL/FAMAS","G3SG1/SCAR20","Scout","SG553/AUG","Max10/MP9","MP5/MP7","P90","PP-Bizon","UMP","M249","Nova","Negev","Sawed off/MAG7","XM1014"],UI.GetValue(tab,subtab,child,"Primary"),697)
    returnval = endComboBox(697)
    if(globals.active && returnval + "" != "undefined")
    UI.SetValue(tab,subtab,child,"Primary",returnval)
}
var target = []
function drawPlayerlist() {
    var a = beginChild(1,30,540,"Players")
    var xx = a[0]
    var yy = a[1]
    var _do = function (name) {
        if (checkbox(xx, yy, name, UI.GetValue(tab, subtab, child, name))) UI.SetValue(tab, subtab, child, name, !UI.GetValue(tab, subtab, child, name))
    }
    var _do3 = function (name, min, max, thing,thing2,id) {
        if(!globals.active){
            val[id] = UI.GetValue(tab,subtab,child,name)
            backupval[id] = val[id]
        }
        var returnval = sliderFloat(xx, yy, name, min, max, thing,thing2,id,UI.GetValue(tab,subtab,child,name))
        if(globals.active){
            UI.SetValue(tab, subtab, child, name, returnval)
        }
    }
    var _do5 = function(y,name,contents,id){
        beginMultiComboBox(xx,yy-y,name,contents,UI.GetValue(tab,subtab,child,name),id)
        var returnval = endComboBox(id)
        if(globals.alpha != 0 && returnval + "" != "undefined")
            UI.SetValue(tab,subtab,child,name,returnval)
    }
    Render.Rect(xx-1,yy-1,202,502,[5,5,5,globals.alpha])
    Render.Rect(xx,yy,200,500,[65,65,65,globals.alpha])
    Render.FilledRect(xx + 1, yy+1, 198, 498, [35, 35, 35, globals.alpha])
    //if(!Entity.GetLocalPlayer()) return
    
    var ents = Entity.GetPlayers()
    var filteredents = []
    var ents2 = []
    for(i = 0; ents2.length != ents.length; i++){
        var ent = Entity.GetEntityFromUserID(i)
        if(ent == 0) continue
        if(Entity.IsBot(ent)){
            ents2.push([ent, i])
            continue
        }
        ents2.push(ent)
        filteredents.push([ent, i])
    }
    for(i = 0; i < filteredents.length;i++){
        var name = Entity.GetName(filteredents[i][0])
        
        var shorten = false
        while(Render.TextSizeCustom(name, globals.verdana8)[0] > 125){
            name = name.substring(0,name.length-1)
            shorten = true
        }
        
        if(shorten)name += "..."
        if(Entity.IsLocalPlayer(filteredents[i][0]))name += " (YOU)"
        else if(Entity.IsTeammate(filteredents[i][0]))name += " (ALLY)"
        else if(Entity.IsEnemy(filteredents[i][0]))name += " (ENEMY)"
        filteredents[i][2] = name
        if(cursorBetween(xx+1,yy+1+(i*22), 198,22)){
            Render.FilledRect(xx+1,yy+1+(i*22), 198,22,[25,25,25,globals.alpha])
        }
        
        Render.StringCustom(xx+7,yy+5+(i*22),0,name + "", [200,200,200,globals.alpha],globals.verdana8)
        if(cursorBetween(xx+1,yy+1+(i*22), 198,22) && Input.IsKeyPressed(0x01)){
            target = filteredents[i]
        }
    }
    a = beginChild(2,30,410/2,"Info")
    xx = a[0]
    yy = a[1]
    if(target[0]){
    var _text = function(text){
        Render.StringCustom(xx,yy+spacingBetweenCheckboxes,0,text,[200,200,200,globals.alpha],globals.verdana8)
        spacingBetweenCheckboxes+=20
    }
    _text("Name: " + Entity.GetName(target[0]))
    _text("UserID: " + target[1])
    _text("Index: " + target[0])
    var origin = Entity.GetProp(target[0],"DT_BasePlayer","m_vecOrigin")
    _text("Origin: " + Math.floor(origin[0]) + ", " + Math.floor(origin[1]) + ", " + Math.floor(origin[2]))
    var angles = Entity.GetProp(target[0],"DT_CSPlayer","m_angEyeAngles")
    _text("Angles: " + Math.floor(angles[0]) + ", " + Math.floor(angles[1]) + ", " + Math.floor(angles[2]))
    var velocity = Entity.GetProp(target[0],"DT_BasePlayer","m_vecVelocity[0]")
    _text("Velocity: " + Math.floor(velocity[0]) + ", " + Math.floor(velocity[1]) + ", " + Math.floor(velocity[2]))
    var clampedvelo = Math.floor(Math.sqrt(Math.pow(velocity[0], 2) + Math.pow(velocity[1],2) + Math.pow(velocity[2],2)))
    _text("Velocity length: " + clampedvelo)
    var health = Entity.GetProp(target[0], "DT_BasePlayer", "m_iHealth")
    _text("Health: " + health)
    var location = Entity.GetProp(target[0],"DT_BasePlayer","m_szLastPlaceName")
    _text("Location: " + location)
    }
    a = beginChild(2,50+(410/2),315,"Features")
    xx = a[0]
    yy = a[1]
    if(target[0]){
    var _button = function(name,x,length){
        yy+=spacingBetweenCheckboxes
        Render.Rect(x-2,yy-2,length+4,24,[5,5,5,globals.alpha])
        Render.Rect(x-1,yy-1,length+2,22,[65,65,65,globals.alpha])
        Render.FilledRect(x,yy,length,20,[30,30,30,globals.alpha])
        Render.StringCustom(x+7,yy+2,0,name,[200,200,200,globals.alpha],globals.verdana8)
        yy-=spacingBetweenCheckboxes
        if(cursorBetween(x,yy,length,20) && Input.IsKeyPressed(0x01)){
            return true
        }
        return false
    }
    if(_button("Vote kick",xx,70)){
        Cheat.ExecuteCommand("callvote kick " + target[1])
    }
    }
    
}
function getEntityUserID(index){
    var ents = Entity.GetEntities()
    var ents2 = []
    for(i = 0; ents2.length != ents.length; i++){
        var ent = Entity.GetEntityFromUserID(i)
        if(i == 0 || !Entity.IsValid(ent))continue
        ents2.push(ent)
        if(ent == index) return i
    }
}
function drawContent() {
    resetSpacing()
    globals.verdana8 = Render.AddFont("Verdana",8,100)
    globals.verdana8b = Render.AddFont("Verdana",8,400)
    globals.verdana12 = Render.AddFont("Verdana",12,100)
    globals.verdana12b = Render.AddFont("Verdana",12,400)
    if(globals.alpha == 0) return
    if (globals.tab == 1) drawRage()
    if (globals.tab == 2) drawAA()
    if (globals.tab == 3) drawLegit()
    if (globals.tab == 4) drawVisuals()
    if (globals.tab == 5) drawMisc()
    if (globals.tab == 6) drawSkins()
    if (globals.tab == 7) drawPlayerlist()
    
    
}
var _movemenu = false
var waitforup = false
var offsetx = 0
var offsety = 0
function checkMovement() {
   
    var cursor = Input.GetCursorPosition()
    var onmenu = cursorBetween(globals.X(), globals.Y(), 630, 32) || cursorBetween(globals.X(), globals.Y() + 570, 630, 30) || cursorBetween(globals.X() + 87, globals.Y(), 30, 600) || cursorBetween(globals.X()+600, globals.Y(), 30, 600)
    if (UI.IsMenuOpen()) {
        if (Input.IsKeyPressed(0x01) && !waitforup && onmenu && globals.active) {
            _movemenu = true
            offsetx = cursor[0] - globals.X()
            offsety = cursor[1] - globals.Y()
            waitforup = true
        }
        if (!Input.IsKeyPressed(0x01)) {
            _movemenu = false
            waitforup = false
        }
        if (_movemenu) {
            UI.SetValue("Script Items","X",cursor[0]-offsetx)
            UI.SetValue("Script Items","Y",cursor[1]-offsety)
        }
    }
    globals.active = cursorBetween(globals.X(),globals.Y(),630,600)
    globals.active = coloridactive == -1 ? globals.active : false
    
}
function main() {
    initialize()
    Cheat.RegisterCallback("Draw","drawBasic")
    Cheat.RegisterCallback("Draw","drawTabs")
    Cheat.RegisterCallback("CreateMove","onCreateMove")
    Cheat.RegisterCallback("Draw", "drawContent")
    Cheat.RegisterCallback("Draw","checkMovement")
}main()
// 2/1/2020 or for amerifats 1/2/2020
// published by VexatiousCheff on onetap forum
