UI.AddCheckbox("JumpScout/AWP");
UI.AddSliderInt("Hitchance Scout", 1, 100);
UI.AddSliderInt("Hitchance AWP", 1, 100);
var oldHitChance = UI.GetValue("Rage", "SCOUT", "Accuracy", "Hitchance");
var oldHitChance1 = UI.GetValue("Rage", "AWP", "Accuracy", "Hitchance");
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
var Hitchance1 = UI.GetValue("Sripts items", "Hitchance AWP")
UI.SetValue("Rage", "SCOUT", "Accuracy", "Hitchance", Hitchance);
UI.SetValue("Rage", "AWP", "Accuracy", "Hitchance", Hitchance1);
}else{
UI.SetValue("Rage", "SCOUT", "Accuracy", "Hitchance", oldHitChance);
UI.SetValue("Rage", "AWP", "Accuracy", "Hitchance", oldHitChance1);
}
}

Global.RegisterCallback("CreateMove", "updateValues");