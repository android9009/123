UI.AddCheckbox("JumpScout/R8 Hitchance");
UI.AddSliderInt("Hitchance Scout", 1, 100);
UI.AddSliderInt("Hitchance Revolver", 1, 100);
var oldHitChance = UI.GetValue("Rage", "SCOUT", "Accuracy", "Hitchance");
var oldHitChance1 = UI.GetValue("Rage", "HEAVY PISTOL", "Accuracy", "Hitchance");
var isInAir = function(){
if(Global.IsKeyPressed((0x20))){
return true;
}else{
return false;
}
}

function updateValues(){
if(isInAir()){
var Hitchance = UI.GetValue("Script items", "Hitchance Scout");
var Hitchance1 = UI.GetValue("Script items", "Hitchance Revolver");
UI.SetValue("Rage", "SCOUT", "Accuracy", "Hitchance", Hitchance);
UI.SetValue("Rage", "HEAVY PISTOL", "Accuracy", "Hitchance", Hitchance1);
}else{
UI.SetValue("Rage", "SCOUT", "Accuracy", "Hitchance", oldHitChance);
UI.SetValue("Rage", "HEAVY PISTOL", "Accuracy", "Hitchance", oldHitChance1);
}
}

Global.RegisterCallback("CreateMove", "updateValues");