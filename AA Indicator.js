var s = Render.GetScreenSize();
var fSettings = {};
var rSettings = {};
function menuLogic() {
    if (!UI.IsMenuOpen()) return;
    fSettings.enabled = UI.GetValue("Fake Indicator");
    fSettings.third = UI.GetValue("3rd Person Fake Indicator");
    fSettings.color = UI.GetColor("Script Items", "Fake Color");
    fSettings.distance = UI.GetValue("Fake Distance");
    fSettings.size = UI.GetValue("Fake Size");
    rSettings.enabled = UI.GetValue("Real Indicator");
    rSettings.third = UI.GetValue("3rd Person Real Indicator");
    rSettings.color = UI.GetColor("Script Items", "Real Color");
    rSettings.distance = UI.GetValue("Real Distance");
    rSettings.size = UI.GetValue("Real Size");
    UI.SetEnabled("3rd Person Fake Indicator", fSettings.enabled);
    UI.SetEnabled("Fake Color", fSettings.enabled);
    UI.SetEnabled("Fake Distance", fSettings.enabled);
    UI.SetEnabled("Fake Size", fSettings.enabled);
    UI.SetEnabled("3rd Person Real Indicator", rSettings.enabled);
    UI.SetEnabled("Real Color", rSettings.enabled);
    UI.SetEnabled("Real Distance", rSettings.enabled);
    UI.SetEnabled("Real Size", rSettings.enabled);
}
function rotate(add, flip, start, degree, distance) {
    rad = degree * (Math.PI/180);
    ind0 = (flip ? Math.cos(rad) : Math.sin(rad)) * distance;
    ind1 = (flip ? Math.sin(rad) : Math.cos(rad)) * distance;
    start[0] += add ? ind0 : -ind0
    start[1] += add ? ind1 : -ind1;
    return start;
}
function drawFake() {
    fake = Local.GetFakeYaw();
    if (UI.IsHotkeyActive("WORLD", "Thirdperson")) {
        ori = Entity.GetRenderOrigin(Entity.GetLocalPlayer());
        ext = Render.WorldToScreen(rotate(true, true, [ori[0], ori[1], ori[2]], fake, 40));
        txt = Render.WorldToScreen(rotate(true, true, [ori[0], ori[1], ori[2]], fake, 45));
        ori = Render.WorldToScreen(ori);
        Render.Line(ori[0], ori[1], ext[0], ext[1], fSettings.color);
        Render.String(txt[0], txt[1], 2, "FAKE", [255, 255, 255, 255]);
    } else {
        deg = fake-Local.GetViewAngles()[1];
        a = rotate(false, false, [s[0]/2, s[1]/2], deg, fSettings.distance+fSettings.size);
        b = rotate(false, false, [a[0], a[1]], deg+30, -fSettings.size);
        c = rotate(false, false, [a[0], a[1]], deg-30, -fSettings.size);
        Render.Polygon([a, b, c], fSettings.color);
    }
}
function drawReal() {
    real = Local.GetRealYaw();
    if (UI.IsHotkeyActive("WORLD", "Thirdperson")) {
        ori = Entity.GetRenderOrigin(Entity.GetLocalPlayer());
        ext = Render.WorldToScreen(rotate(true, true, [ori[0], ori[1], ori[2]], real, 40));
        txt = Render.WorldToScreen(rotate(true, true, [ori[0], ori[1], ori[2]], real, 45));
        ori = Render.WorldToScreen(ori);
        Render.Line(ori[0], ori[1], ext[0], ext[1], rSettings.color);
        Render.String(txt[0], txt[1], 2, "REAL", [255, 255, 255, 255]);
    } else {
        deg = real-Local.GetViewAngles()[1];
        a = rotate(false, false, [s[0]/2, s[1]/2], deg, rSettings.distance+rSettings.size);
        b = rotate(false, false, [a[0], a[1]], deg+30, -rSettings.size);
        c = rotate(false, false, [a[0], a[1]], deg-30, -rSettings.size);
        Render.Polygon([a, b, c], rSettings.color);
    }
}
function indicators() {
    if (!Entity.IsAlive(Entity.GetLocalPlayer())) return;
    fSettings.enabled && (fSettings.third || !UI.IsHotkeyActive("WORLD", "Thirdperson")) && drawFake();
    rSettings.enabled && (rSettings.third || !UI.IsHotkeyActive("WORLD", "Thirdperson")) && drawReal();
}
UI.AddLabel("======================");
UI.AddCheckbox("Fake Indicator");
UI.AddCheckbox("3rd Person Fake Indicator");
UI.AddColorPicker("Fake Color");
UI.AddSliderInt("Fake Distance", 0, 100);
UI.AddSliderInt("Fake Size", 2, 70);
UI.AddLabel("----------------------------------------");
UI.AddCheckbox("Real Indicator");
UI.AddCheckbox("3rd Person Real Indicator");
UI.AddColorPicker("Real Color");
UI.AddSliderInt("Real Distance", 0, 100);
UI.AddSliderInt("Real Size", 2, 70);
UI.AddLabel("======================");
Cheat.RegisterCallback("Draw", "menuLogic");
Cheat.RegisterCallback("Draw", "indicators");