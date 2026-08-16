var position = {
  x: 100,
  y: 100
}
var alpha = 0;
var hitboxes = [
  'Generic',
  'Head',
  'Chest',
  'Stomach',
  'Left arm',
  'Right arm',
  'Left leg',
  'Right leg',
  'Body'
];
function getHitboxName(index) {
  return hitboxes[index] || 'Generic';
}
var logs = [];
function HSVtoRGB(h, s, v) {
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
function getCustomValue(name) {
  var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", name);
  return value;
}
function render() {
  if (!getCustomValue('hitlist')) {
    return;
  }
  tickcount = Global.Tickcount();
  position.x = getCustomValue('position x');
  position.y = getCustomValue('position y');
  alpha = getCustomValue('alpha');
  color = HSVtoRGB(tickcount % 350 / 350, 1, 1, 1, 255);
  Render.FilledRect(position.x, position.y, 260, 160, [0, 0, 0, alpha]);
  Render.String(position.x + 5, position.y + 5, 0, "NAME", [255, 255, 255, 255], 8);
  Render.String(position.x + 110, position.y + 5, 0, "DMG", [255, 255, 255, 255], 8);
  Render.String(position.x + 150, position.y + 5, 0, "HITBOX", [255, 255, 255, 255], 8);
  Render.Line(position.x, position.y + 20, position.x + 259, position.y + 20, [color.r, color.g, color.b, 255]);
  for (var i = logs.slice(-7).length, j = 0; i > 0; i-- , j++) {
    // brain issue, sry
    if (j > 6) {
      j = 0;
    }
    var log = logs.slice(-7)[i - 1];
    Render.String(position.x + 5, position.y + 20 * (j + 1.25), 0, log.name.slice(0, 15), [255, 255, 255, 255], 8);
    Render.String(position.x + 110, position.y + 20 * (j + 1.25), 0, String(log.damage), [255, 255, 255, 255], 8);
    Render.String(position.x + 150, position.y + 20 * (j + 1.25), 0, log.hitbox, [255, 255, 255, 255], 8);
  }
}
function hitloger() {
  var me = Entity.GetLocalPlayer();
  var victim = Event.GetInt('userid');
  var attacker = Event.GetInt('attacker');
  var damage = Event.GetInt('dmg_health');
  var hitbox = Event.GetInt('hitgroup');
  var victimIndex = Entity.GetEntityFromUserID(victim);
  var attackerIndex = Entity.GetEntityFromUserID(attacker);
  var name = Entity.GetName(victimIndex);
  if (me == attackerIndex && me != victimIndex) {
    logs.push({
      name: name,
      hitbox: getHitboxName(hitbox),
      damage: damage
    });
  }
}
function roundStartListener() {
  if (!getCustomValue('update every round')) {
    return;
  }
  logs = [];
}
function main() {
  var sizes = Global.GetScreenSize();
  UI.AddCheckbox('hitlist');
  UI.AddCheckbox('update every round');
  UI.AddSliderInt('position x', 0, sizes[0]);
  UI.AddSliderInt('position y', 0, sizes[1]);
  UI.AddSliderInt('alpha', 0, 255);
  Global.RegisterCallback('Draw', 'render');
  Global.RegisterCallback('player_hurt', 'hitloger');
  Global.RegisterCallback('round_start', 'roundStartListener');
}
main();