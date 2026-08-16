// yuca

function hsv_to_rgb(h, s, v)
{
    var r, g, b, i, f, p, q, t;
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}
function getCustomValue(xy) {
var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", xy);
return value;}
var position = {
  x1: 0,
  y1: 0
}

function draw_fatality_rect(x, y, width, height)
{
        var rgbcolor = hsv_to_rgb(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Gradient Speed"), 1, 1);

}

function draw_fatality_rect2(x2, y2, width2, height2)
{
        var rgbcolor = hsv_to_rgb(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Gradient Speed"), 1, 1);

      Render.Rect( x2 + 45, y2 + 2, width2 + 60, height2 + -9, [ rgbcolor.g, rgbcolor.b, rgbcolor.r, 200 ] );
     Render.FilledRect( x2 + 46, y2 + 3, width2 + 58, height2 + -11, [ 55, 55, 55, 200 ] );
     Render.FilledRect( x2 + 50, y2 + 7, width2 - -50, height2 - 19, [ 30, 30, 30, 200 ] ); // black
      Render.Rect( x2 + 50, y2 + 6, width2 - -50, height2 + -17, [ rgbcolor.g, rgbcolor.b, rgbcolor.r, 200 ] );
}

function draw_fatality_rect3(x3, y3, width3, height3)
{

}

function draw_gs_watermark()
{
  var rgbcolor = hsv_to_rgb(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Gradient Speed"), 1, 1);
  var fps1 = 1 / Global.Frametime()
  var fps = Math.floor(fps1)
  var watermark_name = Entity.GetName(Entity.GetLocalPlayer( ));
  var today = new Date();
  var datetime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    x1 = getCustomValue("X");
    y1 = getCustomValue("Y");





    draw_fatality_rect(x1, y1, 40, 35);
    draw_fatality_rect2(x1 - 150, y1, 140, 35);
    draw_fatality_rect3(x1 - 300, y1, 140, 35);
    Render.String( x1 + -70, y1 + 10, 0, "tap.su", [ 218, 155, 80, 255], 8 );
    Render.String( x1 + -91, y1 + 10, 0, "one", [ 255, 255, 255, 255], 8 );
    Render.String( x1 + -28, y1 + 10, 0, "|", [ 255, 255, 255, 255], 8 );
    Render.String( x1 - 20, y1 + 10, 0, "" + fps, [ 218, 155, 80, 255], 8 );
    Render.String( x1 - -3, y1 + 10, 0, "fps |", [ 255, 255, 255, 255], 8 );
    Render.String( x1 + 28, y1 + 10, 0, " " + datetime, [ 255, 255, 255, 255 ], 8 );

}

function main()
{
        var screensize = Global.GetScreenSize();
        UI.AddSliderInt("X", 0, screensize[0]);
        UI.AddSliderInt("Y", 0, screensize[0]);
}
main()

Global.RegisterCallback("Draw", "draw_gs_watermark")