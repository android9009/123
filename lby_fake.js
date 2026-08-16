UI.AddSliderInt("watermark_x", -1000, 2000);
UI.AddSliderInt("watermark_y", -1000, 1000);
const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_x"),
y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_y");
function fakeamount(){
    delta = 0;
if(Entity.IsAlive(Entity.GetLocalPlayer()) == true){
    fontpixel = Render.AddFont( "Verdana", 7, 100);
    fake = Math.abs(Local.GetFakeYaw());
    real = Math.abs(Local.GetRealYaw());
        if(fake > real)
        delta = (fake - real) / 2;
        else
        delta = (real - fake) / 2;
    if (UI.IsHotkeyActive( "Anti-Aim", "Fake angles", "Inverter" ))
        side = "<"
    else
        side = ">"
        if(UI.GetValue( "Anti-Aim", "Fake angles", "LBY mode") == 1){
        textd = "FAKE (" + delta.toFixed(0).toString() + ") | safety: " + (delta.toFixed(0).toString() / 60 * 100).toFixed(0).toString() + "% | side: " + side
        if (delta <= 29)
        {
            r = 255
            g = 0
            b = 0
        }
        else if (delta >= 45)
        {
            r = 132
            g = 195
            b = 16
        }
        else 
        {
            r = 255 - (delta * 3)
            g = delta * 3
            b = 0
        }
        }
        if(UI.GetValue( "Anti-Aim", "Fake angles", "LBY mode") == 0){
        textd = "FAKE (" + delta.toFixed(0).toString() + ") | safety: " + (delta.toFixed(0).toString() / 30 * 100).toFixed(0).toString() + "% | side: " + side
        if (delta <= 10)
        {
            r = 255
            g = 0
            b = 0
        }
        else if (delta >= 15)
        {
            r = 132
            g = 195
            b = 16
        }
        else 
        {
            r = 255 - (delta * 3)
            g = delta * 3
            b = 0
        }
        }
        if(UI.GetValue( "Anti-Aim", "Fake angles", "Fake desync") == 1){
            textd = "FAKE (" + delta.toFixed(0).toString() + ") | safety: " + (delta.toFixed(0).toString() / 31 * 100).toFixed(0).toString() + "% | side: " + side
            if (delta <= 10)
            {
                r = 255
                g = 0
                b = 0
            }
            else if (delta >= 15)
            {
                r = 132
                g = 195
                b = 16
            }
            else 
            {
                r = 255 - (delta * 3)
                g = delta * 3
                b = 0
            }
            }
        Render.FilledRect(x + 1720, y + 30, 185, 20, [15, 15, 15, 255]);
        Render.FilledRect(x + 1720, y + 30, 3, 20, [r, g, b, 255]);
        Render.StringCustom(x + 1815, y + 34, 1, textd, [255, 255, 255, 255], fontpixel);
}
}
Cheat.RegisterCallback( "Draw", "fakeamount" )