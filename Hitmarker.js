var disableTime;
var hitmarkerTime;
var didKill;

  function draw_hitmarker() {
    var localplayer = Entity.GetLocalPlayer();
    if (!Entity.IsAlive(localplayer)) return;
    var screenSize = Global.GetScreenSize();
    var screenX = screenSize[0] / 2;
    var screenY = screenSize[1] / 2;

    if (disableTime > Global.Curtime()) {
        var color = didKill
            ? [255, 50, 10, 255]
            : [200, 200, 200, 255];
        var a = 4;
        var p = (disableTime - Global.Curtime()) / hitmarkerTime;
        var b = a + (6);
        color[3] *= p;
        Render.Line(screenX - b, screenY - b, screenX - a, screenY - a, color); //Left Upper
        Render.Line(screenX - b, screenY - b, screenX - a, screenY - a, color); //Left Upper 2
        Render.Line(screenX - b, screenY + b, screenX - a, screenY + a, color); //Left Down
        Render.Line(screenX - b, screenY + b, screenX - a, screenY + a, color); //Left Down 2
        Render.Line(screenX + b, screenY + b, screenX + a, screenY + a, color); //Right Down
        Render.Line(screenX + b, screenY + b, screenX + a, screenY + a, color); //Right Down 2
        Render.Line(screenX + b, screenY - b, screenX + a, screenY - a, color); //Right Upper
        Render.Line(screenX + b, screenY - b, screenX + a, screenY - a, color); //Right Upper 2
    }
}
  function damage_function() {
    var attacker = Event.GetString("attacker");
    var health = Event.GetString("health");
    var attackerplayer = Entity.GetEntityFromUserID(attacker)
    var localplayer = Entity.GetLocalPlayer();
    var time = 0.6;
    if (attackerplayer == localplayer) {
        disableTime = Global.Curtime() + time;
        didKill = health <= 0;
        hitmarkerTime = time;
    }
}
  function setup() {
    Cheat.RegisterCallback("player_hurt", "damage_function");
    Cheat.RegisterCallback("Draw", "draw_hitmarker");
} setup();