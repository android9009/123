/**
*
* Title: Watermark
* Author: reflection
* Credits:  April (april#0001) for teh V1 spectator list, which I used to make this. Check their post out, it's really good <3, and Raidhvh for fixing the bug where it'd remove all other js options and cleaning up the code
* Description: Recreates the V1's spectators list
*
*/

/**
* Where the magic happens
*/
function main()
{
  var watermark_name = Entity.GetName(Entity.GetLocalPlayer( ));
  var today = new Date();
  var hours1 = today.getHours();
  var minutes1 = today.getMinutes();
  var seconds1 = today.getSeconds();
  var hours = hours1 <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":";
  var minutes = minutes1 <= 9 ? "0" + today.getMinutes() + ":" : today.getMinutes() + ":";
  var seconds = seconds1 <= 9 ? "0" + today.getSeconds() : today.getSeconds()    ;
  const tickrate = Globals.Tickrate();
  var colors = HSVtoRGB(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "WATERMARK RGB Speed"), 1, 1);
   const ping = Math.floor(Global.Latency() * 1000 / 1.5);
   const fps = Math.floor( 1 / Global.Frametime() );
   const fontpixel = Render.AddFont( "Smallest Pixel-7", 8, 100);


    // Get our drawing properties
    const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_x"),
            y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_y");
    const x1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_x1"),
            y1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_y1");

    // Rainbow color for our bar
    const rainbow = [
        Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 4) * 127 + 128),
        255
    ];


function HSVtoRGB(h, s, v)
{
    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6)
    {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}


    // Draw the spectators list
    Render.Rect(x + 1684, y + 9, 162, 45, [2, 2, 2, 100]);
    Render.FilledRect(x + 1685, y + 10, 160, 45, [55, 55, 55, 200]);
    Render.Rect(x + 1690, y + 15, 150, 35, [2, 2, 2, 100]);
    Render.FilledRect(x + 1690, y + 15, 150, 35, [25, 25, 25, 200]);
    Render.GradientRect(1690, 15, 150, 3, 1, [colors.g, colors.b, colors.r, 255], [colors.r, colors.g, colors.b, 255]);
    Render.StringCustom(x + 1700, y + 28, 0, "fps:", [255, 255, 255, 255], fontpixel);
	Render.StringCustom(x + 1748, y + 28, 0, "ping:", [255, 255, 255, 255], fontpixel);
    Render.StringCustom(x + 1795, y + 28, 0, "tick:", [255, 255, 255, 255], fontpixel);
	Render.StringCustom(x + 1719, y + 28, 0, " " + fps, [colors.g, colors.b, colors.r, 255], fontpixel);
    Render.StringCustom(x + 1769, y + 28, 0, " " + ping, [colors.g, colors.b, colors.r, 255], fontpixel);
	Render.StringCustom(x + 1814, y + 28, 0, " " + tickrate, [colors.g, colors.b, colors.r, 255], fontpixel);

	Render.Rect(x + 1589, y + 9, 92, 45, [2, 2, 2, 100]);
    Render.FilledRect(x + 1590, y + 10, 90, 45, [55, 55, 55, 200]);
    Render.Rect(x + 1595, y + 15, 80, 35, [2, 2, 2, 100]);
    Render.FilledRect(x + 1595, y + 15, 80, 35, [25, 25, 25, 200]);
    Render.GradientRect(1595, 15, 80, 3, 1, [colors.g, colors.b, colors.r, 255], [colors.r, colors.g, colors.b, 255]);
	Render.StringCustom(x + 1603, y + 28, 0, "TIME:", [255, 255, 255, 255], fontpixel);
    Render.StringCustom(x + 1623, y + 28, 0, " " + hours + minutes + seconds, [colors.g, colors.b, colors.r, 255], fontpixel);

    Render.Rect(x1 + 1849, y1 + 9, 47, 45, [2, 2, 2, 100]);
    Render.FilledRect(x1 + 1850, y1 + 10, 45, 45, [55, 55, 55, 200]);
    Render.Rect(x1 + 1855, y1+ 15, 35, 35, [2, 2, 2, 100]);
    Render.FilledRect(x1 + 1855, y1 + 15, 35, 35, [25, 25, 25, 200]);
    Render.GradientRect(1855, 15, 35, 3, 1, [colors.g, colors.b, colors.r, 255], [colors.r, colors.g, colors.b, 255]);
    Render.String(x1 + 1872, y1 + 16, 1, "F", [colors.g, colors.b, colors.r, 255], 4);

}
//endregion

//region callbacks

// Callback our main function
UI.AddSliderFloat("WATERMARK RGB Speed", 0.01, 1.0);
Global.RegisterCallback("Draw", "main")