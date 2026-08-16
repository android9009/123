var position = {
  x3: 100,
  y3: 100
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
  if (!getCustomValue('Show Keybind States')) {
    return;
  }
  tickcount = Global.Tickcount();
  position.x3 = getCustomValue('Keybinds X-Axis');
  position.y3 = getCustomValue('Keybinds Y-Axis');
  alpha = getCustomValue('keybindWindowAlpha');
  color = HSVtoRGB(tickcount % 350 / 350, 1, 1, 1, 255);
  Render.FilledRect(position.x3, position.y3, 90, 181, [0, 0, 0, alpha]);
  Render.String(position.x3 + 15, position.y3 + 5, 0, "KEYBINDS", [255, 255, 255, 255], 8);
  Render.Line(position.x3, position.y3 + 20, position.x3 + 89, position.y3 + 20, [color.r, color.g, color.b, 255]);

  var dt = Render.String(position.x3 + 20, position.y3 + 25 , 0, "Inverted", [255, 255, 255, 255], 8);
  if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter"))
  {
  dt = Render.String(position.x3 + 20, position.y3 + 25 , 0, "Inverted", [color.r, color.g, color.b, 255], 8);
  }

  var dt = Render.String(position.x3 + 15, position.y3 + 45 , 0, "Doubletap", [255, 255, 255, 255], 8);
  if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap"))
  {
  dt = Render.String(position.x3 + 15, position.y3 + 45 , 0, "Doubletap", [color.r, color.g, color.b, 255], 8);
  }

  var flip = Render.String(position.x3 + 14, position.y3 + 65 , 0, "Hide Shots", [255, 255, 255, 255], 8);
  if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots"))
  {
  flip = Render.String(position.x3 + 14, position.y3 + 65 , 0, "Hide Shots", [color.r, color.g, color.b, 255], 8);
  }

  var sw = Render.String(position.x3 + 15, position.y3 + 85 , 0, "Slow walk", [255, 255, 255, 255], 8);
  if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk"))
  {
  sw = Render.String(position.x3 + 15, position.y3 + 85 , 0, "Slow walk", [color.r, color.g, color.b, 255], 8);
  }

  var fd = Render.String(position.x3 + 17, position.y3 + 105 , 0, "Fakeduck", [255, 255, 255, 255], 8);
  if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck"))
  {
  fd = Render.String(position.x3 + 17, position.y3 + 105 , 0, "Fakeduck", [color.r, color.g, color.b, 255], 8);
  }

  var fd = Render.String(position.x3 + 26, position.y3 + 125 , 0, "Hitbox", [255, 255, 255, 255], 8);
  if (UI.IsHotkeyActive("Rage", "General config", "Hitbox override"))
  {
  fd = Render.String(position.x3 + 26, position.y3 + 125 , 0, "Hitbox", [color.r, color.g, color.b, 255], 8);
  }

  var fd = Render.String(position.x3 + 10, position.y3 + 145 , 0, "Min damage", [255, 255, 255, 255], 8);
  if (UI.IsHotkeyActive("Rage", "Minimum damage"))
  {
  fd = Render.String(position.x3 + 10, position.y3 + 145 , 0, "Min damage", [color.r, color.g, color.b, 255], 8);
  }

  var fd = Render.String(position.x3 + 15, position.y3 + 165 , 0, "Safe point", [255, 255, 255, 255], 8);
  if (UI.IsHotkeyActive("Rage", "General", "Safe point override"))
  {
  fd = Render.String(position.x3 + 15, position.y3 + 165 , 0, "Safe point", [color.r, color.g, color.b, 255], 8);
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

function main() {
  var sizes = Global.GetScreenSize();
  UI.AddCheckbox('Show Keybind States');
  UI.AddSliderInt('Keybinds X-Axis', 0, sizes[0]);
  UI.AddSliderInt('Keybinds Y-Axis', 0, sizes[1]);
  UI.AddSliderInt('keybindWindowAlpha', 0, 255);
  Global.RegisterCallback('Draw', 'render');
  Global.RegisterCallback('player_hurt', 'hitloger');
  Global.RegisterCallback('round_start', 'roundStartListener');
}
main();
