var props = 0;
function getCustomValue(name) {
  var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", name);
  return value;
}
function getColor(name) {
  var colors = UI.GetColor("MISC", "JAVASCRIPT", "Script items", name);
  return colors;
}
function onRender() {
  if (!Entity.GetLocalPlayer()) {
    return;
  }
  var colors = getColor('world color');
  if (getCustomValue('enable world color')) {
    Convar.SetFloat('mat_ambient_light_r', colors[0] / 100);
    Convar.SetFloat('mat_ambient_light_g', colors[1] / 100);
    Convar.SetFloat('mat_ambient_light_b', colors[2] / 100);
  } else {
    Convar.SetFloat('mat_ambient_light_r', 0);
    Convar.SetFloat('mat_ambient_light_g', 0);
    Convar.SetFloat('mat_ambient_light_b', 0);
  }
  var entities = Entity.GetEntities();
  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    var name = Entity.GetClassName(entity);
    if (name === 'CEnvTonemapController') {
      if (props == 0) {
        Entity.SetProp(entity, 'CEnvTonemapController', 'm_bUseCustomAutoExposureMin', true);
        Entity.SetProp(entity, 'CEnvTonemapController', 'm_bUseCustomAutoExposureMax', true);
        Entity.SetProp(entity, 'CEnvTonemapController', 'm_bUseCustomBloomScale', true);
        props = 1;
      }
      if (props == 1) {
        var value = getCustomValue('world exposure') / 10;
        Entity.SetProp(entity, 'CEnvTonemapController', 'm_flCustomAutoExposureMin', value);
        Entity.SetProp(entity, 'CEnvTonemapController', 'm_flCustomAutoExposureMax', value);
      }
      if (props == 1) {
        Entity.SetProp(entity, 'CEnvTonemapController', 'm_flCustomBloomScale', getCustomValue('bloom scale') / 10);
      }
      Convar.SetFloat("r_modelAmbientMin", getCustomValue('model ambient') / 10);
    }
  }
}
function Main() {
  UI.AddCheckbox('enable world color');
  UI.AddColorPicker('world color');
  UI.AddLabel('bloom effect');
  UI.AddSliderFloat("world exposure", 0.0, 100.0);
  UI.AddSliderFloat("model ambient", 0.0, 100.0);
  UI.AddSliderFloat("bloom scale", 0.0, 100.0);
  Global.RegisterCallback("Draw", "onRender");
}
Main();