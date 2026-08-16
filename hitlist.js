var logs = [];
var alphaH = 200;
var alphaB = 95;
var position = {
  x: 100,
  y: 100
}
var rgbline = 30;
var damagee = 0;
var olddamage = 0;
var itteration = 0;
var damageColors = {
  lethal: [0, 255, 0, 255],
  semi:   [150, 255, 0, 255],
  half:   [220, 255, 0, 255],
  low:    [255, 255, 0, 255],
  miss:   [255, 0, 0, 255]
}
function getExploitName(index)
{
    var exploitName = "";
    switch(index)
    {
        case 0:
            exploitName = "NO";
            break;
        case 1:
            exploitName = "HIDE SHOTS";
            break;
        case 2:
            exploitName = "DOUBLE TAP";
            break;
        default:
            exploitName = "undefined";
            break;
    }
    return exploitName;
}
function getSafePointName(index)
{
    var exploitName = "";
    switch(index)
    {
        case 0:
            exploitName = "NO";
            break;
        case 1:
            exploitName = "YES";
            break;
        default:
            exploitName = "undefined";
            break;
    }
    return exploitName;
}
function getHitboxName(index)
{
    var hitboxName = "";
    switch (index)
    {
        case 0:
            hitboxName = "Head";
            break;
        case 1:
            hitboxName = "Neck";
            break;
        case 2:
            hitboxName = "Pelvis";
            break;
        case 3:
            hitboxName = "Body";
            break;
        case 4:
            hitboxName = "Thorax";
            break;
        case 5:
            hitboxName = "Chest";
            break;
        case 6:
            hitboxName = "Upper chest";
            break;
        case 7:
            hitboxName = "Left thigh";
            break;
        case 8:
            hitboxName = "Right thigh";
            break;
        case 9:
            hitboxName = "Left calf";
            break;
        case 10:
            hitboxName = "Right calf";
            break;
        case 11:
            hitboxName = "Left foot";
            break;
        case 12:
            hitboxName = "Right foot";
            break;
        case 13:
            hitboxName = "Left hand";
            break;
        case 14:
            hitboxName = "Right hand";
            break;
        case 15:
            hitboxName = "Left upper arm";
            break;
        case 16:
            hitboxName = "Left forearm";
            break;
        case 17:
            hitboxName = "Right upper arm";
            break;
        case 18:
            hitboxName = "Right forearm";
            break;
        default:
            hitboxName = "undefined";
    }

    return hitboxName;
}

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
function getCustomValue(field) {
  var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", field);
  return value;
}
function cursorConstruct(array) {
  if (typeof array !== 'object') {
    return null;
  }
  return {
    x: array[0],
    y: array[1]
  };
}
function onObject(cursor, position, width, heigth) {
  if (!cursor || !position || !width || !heigth) {
    return;
  }
  return cursor.x <= position.x + width && cursor.x >= position.x
    && cursor.y <= position.y + heigth && cursor.y >= position.y;
}
function colorByDamage(damage) {
  if (damage > 90) {
    return damageColors.lethal
  } else if (damage < 90 && damage > 49) {
    return damageColors.semi
  } else if (damage < 49 && damage > 20) {
    return damageColors.half
  } else if (damage > 0) {
    return damageColors.miss;
  } else {
    return damageColors.miss;
  }
}
function render() {
  var visible = getCustomValue('Hit List');
  UI.SetEnabled('Script Items', 'update every round', visible);
  //UI.SetEnabled('Script Items', 'misc logs', visible);

  var customAlphaEnabled = getCustomValue('custom alpha');
  UI.SetEnabled('Script Items', 'alpha header', customAlphaEnabled);
  UI.SetEnabled('Script Items', 'alpha background', customAlphaEnabled);
  var customPositionEnabled = getCustomValue('position by pixels');
  UI.SetEnabled('Script Items', 'position x', customPositionEnabled);
  UI.SetEnabled('Script Items', 'position y', customPositionEnabled);

  if (!visible) {
    return;
  }
  rgbline = getCustomValue('Line Position');
  namesize = getCustomValue('Name Size');
  coloredsize = getCustomValue('Colored Size');
  dmgsize = getCustomValue('DMG Size');
  hitboxsize = getCustomValue('Hitbox Size');
  exploitsize = getCustomValue('Exploit Size');
  safepointssize = getCustomValue('Safepoints Size');
  hitchancesize = getCustomValue('Hitchance Size');
  linesize = getCustomValue('Line Size');
  boxsize = getCustomValue('Box Size');
  tickcount = Global.Tickcount();
  position.x = getCustomValue('position x');
  position.y = getCustomValue('position y');
  alphaH = getCustomValue('alpha header');
  alphaB = getCustomValue('alpha background');
  if (UI.IsMenuOpen()) {
    var cursor = cursorConstruct(Global.GetCursorPosition());
    if (cursor && Global.IsKeyPressed(0x01)) {
      if (onObject(cursor, position, boxsize, 160)) {
        UI.SetValue('Script Items', 'position x', cursor.x - boxsize / 2);
        UI.SetValue('Script Items', 'position y', cursor.y - 160 / 2);
      }
    }
  }
  color = HSVtoRGB(tickcount % 350 / 350, 1, 1, 1, 255);
  Render.FilledRect(position.x, position.y, boxsize, 20, [0, 0, 0, alphaH]);
  Render.FilledRect(position.x, position.y + 20, boxsize, 140, [0, 0, 0, alphaB]);
  if(namesize != 0) { Render.String(position.x + namesize, position.y + 5, 0, "NAME", [255, 255, 255, 255], 8); }
  if(dmgsize != 0) { Render.String(position.x + dmgsize, position.y + 5, 0, "DMG", [255, 255, 255, 255], 8); }
  if(hitboxsize != 0) { Render.String(position.x + hitboxsize, position.y + 5, 0, "HITBOX", [255, 255, 255, 255], 8); }
  if(exploitsize != 0) { Render.String(position.x + exploitsize, position.y + 5, 0, "EXPLOIT", [255, 255, 255, 255], 8); }
  if(safepointssize != 0) { Render.String(position.x + safepointssize, position.y + 5, 0, "SAFEPOINTS", [255, 255, 255, 255], 8); }
  if(hitchancesize != 0) { Render.String(position.x + hitchancesize, position.y + 5, 0, "HITCHANCE", [255, 255, 255, 255], 8); }
  boxsize2 = boxsize / 2
  if (boxsize != 0 && linesize != 0) { Render.Line(position.x + boxsize2 - linesize, position.y + rgbline, position.x-1 + linesize + boxsize2, position.y + rgbline, [color.r, color.g, color.b, 255]); }
  for (var i = logs.slice(-7).length, j = 0; i > 0; i-- , j++) {
    // brain issue, sry
    if (j > 6) {
      j = 0;
    }
    var log = logs.slice(-7)[i - 1];
    if (!log.type && coloredsize != 0) {
      Render.FilledRect(position.x + coloredsize-3, position.y + 20 * (j + 1.25), 2, 10.5, colorByDamage(log.damage));
    }
    if(namesize != 0) { Render.String(position.x + namesize, position.y + 20 * (j + 1.25), 0, log.name.slice(0, getCustomValue('Max Name Size')), [255, 255, 255, 255], 8); }
    if(dmgsize != 0) { Render.String(position.x + dmgsize, position.y + 20 * (j + 1.25), 0, String(log.damage), [255, 255, 255, 255], 8); }
    if(hitboxsize != 0) { Render.String(position.x + hitboxsize, position.y + 20 * (j + 1.25), 0, log.hitbox, [255, 255, 255, 255], 8); }
    if(exploitsize != 0) { Render.String(position.x + exploitsize, position.y + 20 * (j + 1.25), 0, log.exploit, [255, 255, 255, 255], 8); }
    if(safepointssize != 0) { Render.String(position.x + safepointssize, position.y + 20 * (j + 1.25), 0, String(log.safepoint), [255, 255, 255, 255], 8); }
    if(hitchancesize != 0) { Render.String(position.x + hitchancesize, position.y + 20 * (j + 1.25), 0, String(log.hitchance), [255, 255, 255, 255], 8); }
  }
  if (logs.length > 7) {
    logs.shift();
  }
}


function roundStartListener() {
  if (!getCustomValue('update every round')) {
    return;
  }
  logs = [];
}
function roundEndListener() {
  if (getCustomValue('misc logs') != 1) {
    return;
  }
  logs.push({
    name: 'Round ended',
    hitbox: '',
    hitchance: '',
    exploit: '',
    type: 'roundEnd'
  });
}

function ragebotLogs() {
    ragebot_target = Event.GetInt("target_index");
    ragebot_target_hitbox = Event.GetInt("hitbox");
    ragebot_target_hitchance = Event.GetInt("hitchance");
    ragebot_target_safepoint = Event.GetInt("safepoint");
    ragebot_target_exploit = Event.GetInt("exploit");
    targetName = Entity.GetName(ragebot_target);
}
function hurt() {
    damagee = 0;
    damagee = Event.GetInt("dmg_health");
    var me = Entity.GetLocalPlayer();
    var victim = Event.GetInt('userid');
    var attacker = Event.GetInt('attacker');
    var victimIndex = Entity.GetEntityFromUserID(victim);
    var attackerIndex = Entity.GetEntityFromUserID(attacker);
    var name = Entity.GetName(victimIndex);
    if (me === attackerIndex && me !== victimIndex) { newlog(targetName, ragebot_target_hitbox, ragebot_target_hitchance, ragebot_target_safepoint, ragebot_target_exploit, damagee); }
}
function newlog(name1, hitbox1, hitchance1, safepoint1, exploit1, damage1)
{
        logs.push({
          name: name1,
          hitbox: getHitboxName(hitbox1),
          hitchance: hitchance1,
          safepoint: getSafePointName(safepoint1),
          exploit: getExploitName(exploit1),
          damage: damage1
        });
}


function main() {
  var sizes = Global.GetScreenSize();
  UI.AddLabel("---- HIT LIST ----")
  UI.AddSliderInt('Max Name Size', 10, 20);
  UI.AddSliderInt('Line Position', 19, 159);
  UI.AddSliderInt('Colored Size', 5, 1000);
  UI.AddSliderInt('Name Size', 5, 1000);
  UI.AddSliderInt('DMG Size', 75, 1000);
  UI.AddSliderInt('Hitbox Size', 111, 1000);
  UI.AddSliderInt('Exploit Size', 246, 1000);
  UI.AddSliderInt('Safepoints Size', 0, 1000);
  UI.AddSliderInt('Hitchance Size', 166, 1000);
  UI.AddSliderInt('Line Size', 151, 1000);
  UI.AddSliderInt('Box Size', 302, 1000);
  UI.AddCheckbox('Hit List');
  UI.AddCheckbox('update every round');
  // Misc logs
  /*UI.AddMultiDropdown('misc logs', [
    'round end'
  ]);*/
  UI.AddCheckbox('custom alpha');
  UI.AddSliderInt('alpha header', 254, 255);
  UI.AddSliderInt('alpha background', 76, 255);
  // Position
  UI.AddCheckbox('position by pixels');
  UI.AddSliderInt('position x', 135, sizes[0]);
  UI.AddSliderInt('position y', 354, sizes[1]);
  UI.AddLabel("---- HIT LIST END ----")
  Global.RegisterCallback('Draw', 'render');
  Global.RegisterCallback("player_hurt", "hurt");
  //Global.RegisterCallback("weapon_fire", "tracebullet");
  Global.RegisterCallback("ragebot_fire", "ragebotLogs");
  Global.RegisterCallback('round_start', 'roundStartListener');
  Global.RegisterCallback('round_end', 'roundEndListener');
}
main();