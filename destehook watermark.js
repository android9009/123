function hsv_to_rgb(h, s, v)
{
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
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
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
        var rgbcolor = {r:0,g:0,b:0};
	
     Render.FilledRect( x2 + -15, y2 + 7, width2 - -125, height2 - 18, [ 30, 30, 30, 70 ] ) ; // black
    
}

function draw_fatality_rect3(x3, y3, width3, height3)
{

}
var fps = 0;
var iterate = 0;
var averagefps = 0;
function draw_dh_watermark() // дестехууук
{
  var rgbcolor = hsv_to_rgb(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Gradient Speed"), 1, 1);
  var fps1 = 1 / Global.Frametime()
  var fps2 = Math.floor(fps1);
  averagefps = (fps1 + fps2) / 2;
  //var fps = Math.floor(fps1)
  iterate++;
  var rgb = hsv_to_rgb(Global.Tickcount() % 350 / 350,1,1);
  if(iterate%100==0){fps=Math.floor(averagefps);}
  var watermark_name = Entity.GetName(Entity.GetLocalPlayer( ));
  var today = new Date();
  var hours = today.getHours();
  var currenthours = hours % 12;
  var pmamtext = hours >= 12 ? "pm" : "am";
  var minutestext = today.getMinutes() >= 10 ? today.getMinutes(): "0" + today.getMinutes();
  var datetime = currenthours + ":" + minutestext + " " + pmamtext;
  var screensize = Global.GetScreenSize();
    x1 = screensize[0]/1.06;
    y1 = screensize[1]/150;
    draw_fatality_rect(x1, y1, 100, 35);
    draw_fatality_rect2(x1 - 150, y1, 140, 35);
    draw_fatality_rect3(x1 - 100, y1, 140, 35);
	Render.GradientRect(x1- 165,y1+5,265,2,1,[45,121,202, 255], [ 45,121,202, 255]);
	Render.String( x1 + -129, y1 + 10, 0, "hook", [ 255, 255, 255, 255], 8 );
    Render.String( x1 + -160, y1 + 10, 0, "deste", [ 255, 255, 255, 255], 8 );
    Render.String( x1 + -98, y1 + 10, 0, "[alpha]", [ 255, 255, 255, 255], 8 );
    Render.String( x1 + -55, y1 + 10, 0, "|", [ 255, 255, 255, 255], 8 );
	Render.String( x1 + -49, y1 + 10, 0, "Tlaset", [ 255, 255, 255, 255], 8 );
	Render.String( x1 + -13, y1 + 10, 0, "|", [ 255, 255, 255, 255], 8 );
	Render.String( x1 + 38, y1 + 10, 0, " " + datetime, [ 255, 255, 255, 255 ], 8 );
	Render.String( x1 + 36, y1 + 10, 0, "|", [ 255, 255, 255, 255], 8 );
	Render.String( x1 + -6, y1 + 10, 0, "fps", [ 255, 255, 255, 255], 8 );
	Render.String( x1 + 13 , y1 + 10, 0, "" + fps, [ 255, 255, 255, 255], 8 );

}
Global.RegisterCallback("Draw", "draw_dh_watermark")

