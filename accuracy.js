var gun_fired = false;
var other_weapons =
[
    "knife",
    "knife_t",
    "hegrenade",
    "smokegrenade",
    "molotov",
    "incgrenade",
    "flashbang",
    "decoy",
    "taser"
];

var shots =
{
    fired: 0,
    hit: 0,
    missed: 0,
    hit_chance: 0,
    miss_chance: 0
};

function is_gun(weapon_name) {
    for(var i = 0; i < other_weapons.length; i++) {
        if(weapon_name == "weapon_" + other_weapons[i]) {
            return false;
        }
    }
    return true;
}

function weapon_fire() {
    var player_id = Event.GetInt("userid");
    var player_weapon = Event.GetString("weapon");
    if(Entity.IsLocalPlayer(Entity.GetEntityFromUserID(player_id)) && is_gun(player_weapon)) {
        shots.fired = shots.fired + 1;
        gun_fired = true;
    }
}

function player_hurt() {
    var attacker_id = Event.GetInt("attacker");
    var attacker_weapon = Event.GetString("weapon");
    if(Entity.IsLocalPlayer(Entity.GetEntityFromUserID(attacker_id)) && is_gun(attacker_weapon) && gun_fired) {
        shots.hit = shots.hit + 1;
        gun_fired = false;
    }
}

var position = {
  x2: 100,
  y2: 100
}
var alpha = 0;

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
  if (!getCustomValue('Hit Accuracy')) {
    return;
  }
  tickcount = Global.Tickcount();
  position.x2 = getCustomValue('Hit Accuracy X-Axis');
  position.y2 = getCustomValue('Hit Accuracy Y-Axis');
  alpha = getCustomValue('Hit Accuracy Alpha');
  color = HSVtoRGB(tickcount % 350 / 350, 1, 1, 1, 255);
  shots.missed = shots.fired - shots.hit;
  shots.hit_chance = ( (shots.hit / shots.fired) * 100 );
  shots.miss_chance = ( (shots.missed / shots.fired) * 100 );
  Render.FilledRect(position.x2, position.y2, 101, 101, [0, 0, 0, alpha]);
  Render.String(position.x2 + 15, position.y2 + 5, 0, "ACCURACY", [255, 255, 255, 255], 8);
  Render.Line(position.x2, position.y2 + 20, position.x2 + 100, position.y2 + 20, [color.r, color.g, color.b, 255]);
  Render.String(position.x2 + 5, position.y2 + 25, 0, "Shots: " + shots.fired, [255, 255, 255, 255], 8);
  Render.String(position.x2 + 5, position.y2 + 45, 0, "Hits: " + shots.hit, [255, 255, 255, 255], 8);
  Render.String(position.x2 + 5, position.y2 + 65, 0, "Misses: " + shots.missed, [255, 255, 255, 255], 8);
  if(shots.fired > 0)
  {
    Render.String(position.x2 + 5, position.y2 + 85, 0, "Accuracy: " + Math.round(shots.hit_chance), [255, 255, 255, 255], 8);
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
  logs = [];
}
function hitlog() {
  var sizes = Global.GetScreenSize();
  Global.RegisterCallback('Draw', 'render');
  Global.RegisterCallback('player_hurt', 'hitloger');
  Global.RegisterCallback('round_start', 'roundStartListener');
  Global.RegisterCallback("weapon_fire", "weapon_fire");
  Global.RegisterCallback("player_hurt", "player_hurt");
  Global.RegisterCallback("round_prestart", "round_prestart");
}
hitlog();
