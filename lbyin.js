function normalize_yaw(angle) {
    var adjusted_yaw = angle;

    if (adjusted_yaw < -180)
        adjusted_yaw += 360;

    if (adjusted_yaw > 180)
        adjusted_yaw -= 360;

    return adjusted_yaw;
}

function degreesToRadians(angle) {
    return (Math.PI / 180.0) * angle;
}

function getRotatedPosition(x, y, rotation, distance) {
    const rad = degreesToRadians(rotation);
    x += Math.cos(rad) * distance;
    y += Math.sin(rad) * distance;

    return [x, y];
};

function drawAngledLine(x, y, ang, len, col, txt, txtcol) {
    var e = getRotatedPosition(x, y, ang - 90, len);
    var ex = e[0],
        ey = e[1];
    Render.Line(ex, ey, x, y, col);
    if (txt != null) {
        Render.String(ex + 1, ey + 1, 1, txt, [0, 0, 0, 255])
        Render.String(ex, ey, 1, txt, txtcol)
    }
}

function getAngles() {
    var va = Local.GetViewAngles();
    var view = va[1];
    var yaw = Local.GetRealYaw(),
        fake = Local.GetFakeYaw();
    var delta = Math.round(normalize_yaw(yaw - fake) / 2),
        abs = Math.abs(delta);

    var lby = Entity.GetProp(Entity.GetLocalPlayer(), "DT_CSPlayer", "m_flLowerBodyYawTarget");

    if (UI.GetValue(["Rage", "GENERAL", "General", "Enabled"]))
        delta *= -1;

    return [fake,yaw,view,abs,lby];
}

function monitor() {
    var me = Entity.GetLocalPlayer();
    if (!Entity.IsValid(me) || !Entity.IsAlive(me)) return;

    var a = getAngles();
    var fake = a[0], yaw = a[1], view = a[2], abs = a[3], lby = a[4];

    var ss = Global.GetScreenSize();
    var w = ss[0],
        h = ss[1];
    
    var x = w * (UI.GetValue("Misc", "JAVASCRIPT", "Misc items", "AA Indicator X") / 100);
    var y = h * (UI.GetValue("Misc", "JAVASCRIPT", "Misc items", "AA Indicator Y") / 100);

    var c = (abs / 58) * 255;

    Render.FilledCircle(x, y, 80, [0, 0, 0, 75]);
    Render.Circle(x, y, 80, [255 - c, c, 0, 255]);

    drawAngledLine(x, y, Math.round(view - yaw), 50, [128, 244, 66, 255], "REAL", [255, 255, 255, 255]);
    drawAngledLine(x, y, view - fake, 40, [244, 100, 66, 255], "FAKE", [255, 255, 255, 255]);
    drawAngledLine(x, y, view - lby, 35, [66, 124, 244, 255], "LBY", [255, 255, 255, 255]);
}

function lines() {
    var me = Entity.GetLocalPlayer();
    if (!Entity.IsValid(me) || !Entity.IsAlive(me)) return;

    var a = getAngles();
    var fake = a[0], yaw = a[1], view = a[2], abs = a[3], lby = a[4];

    var pos = Entity.GetRenderOrigin(me);

    var origin = Render.WorldToScreen(pos);

    drawAngledLine(origin[0], origin[1], Math.round(view - yaw), 50, [128, 244, 66, 255], "REAL", [255, 255, 255, 255]);
    drawAngledLine(origin[0], origin[1], view - fake, 60, [244, 100, 66, 255], "FAKE", [255, 255, 255, 255]);
    drawAngledLine(origin[0], origin[1], view - lby, 35, [66, 124, 244, 255], "LBY", [255, 255, 255, 255]);
}

function text() {
    var me = Entity.GetLocalPlayer();
    if (!Entity.IsValid(me) || !Entity.IsAlive(me)) return;

    var inv = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter") ? 1 : 0;
    
    var col = [0, 0, 0, 200];
    if(inv) {
        col = [123, 173, 28, 255];
    } else {
        col = [192, 32, 28, 255];
    }

    Render.String(10, 400, 0, "Inverter", [10, 10, 10, 255], 4);
    Render.String(10, 399, 0, "Inverter", col, 4);
}

UI.AddSliderInt("AA Indicator X", 0, 100)
UI.AddSliderInt("AA Indicator Y", 0, 100)

Cheat.RegisterCallback("Draw", "monitor")
Cheat.RegisterCallback("Draw", "lines")
Cheat.RegisterCallback("Draw", "text")