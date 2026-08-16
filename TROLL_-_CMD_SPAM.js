

var curtime = Global.Curtime();

function randomInt(x, y) {
  return y ?
    Math.round(Math.random() * (y - x)) + x :
    Math.round(Math.random() * x);
}

function randomElement(array) {
  return array[randomInt(array.length - 1)];
}

function getCustomValue(name) {
  var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", name);

  return value;
}

function getString(name) {
  var value = UI.GetString("MISC", "JAVASCRIPT", "Script items", name);

  return value;
}

var onetapText = [
  'onetap.su - best premium cheat'
];

function handler() {
  if (Global.FrameStage() != 2) {
    return;
  }

  var local = Entity.GetLocalPlayer();

  if (!Entity.IsAlive(local)) {
    return;
  }

  var type = getCustomValue('spam type');

  if (type == 0) {
    return;
  }

  if (Global.Curtime() < curtime + .7) {
    return;
  }

  if (type == 1) {
    Global.ExecuteCommand('getout');
  }

  if (type == 2) {
    Global.ExecuteCommand('say ' + randomElement(onetapText));
  }

  if (type == 3 && getString('custom text').trim() != '') {
    var strings = getString('custom text').split(';');

    Global.ExecuteCommand('say ' + randomElement(strings));
  }

  curtime = Global.Curtime();
}

function main() {
  UI.AddDropdown('spam type', [
    'none',
    'commands',
    'onetap',
    'custom'
  ]);

  UI.AddTextbox('custom text');

  Global.RegisterCallback('FrameStageNotify', 'handler');
}

main();

