UI.AddHotkey( "Head override key" )
var cache1 = UI.GetValue( "Rage", "GENERAL", "Targeting", "Hitboxes" )
var cache2 = UI.GetValue( "Rage", "PISTOL", "Targeting", "Hitboxes" )
var cache3 = UI.GetValue( "Rage", "HEAVY PISTOL", "Targeting", "Hitboxes" )
var cache4 = UI.GetValue( "Rage", "SCOUT", "Targeting", "Hitboxes" )
var cache5 = UI.GetValue( "Rage", "AWP", "Targeting", "Hitboxes" )
var cache6 = UI.GetValue( "Rage", "AUTOSNIPER", "Targeting", "Hitboxes" )
function on_cm(){
    if(UI.IsHotkeyActive( "Script items", "Head override key" )){
        UI.SetValue("Rage", "GENERAL", "Targeting", "Hitboxes", 1)
        UI.SetValue("Rage", "PISTOL", "Targeting", "Hitboxes", 1)
        UI.SetValue("Rage", "HEAVY PISTOL", "Targeting", "Hitboxes", 1)
        UI.SetValue("Rage", "SCOUT", "Targeting", "Hitboxes", 1)
        UI.SetValue("Rage", "AWP", "Targeting", "Hitboxes", 1)
        UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Hitboxes", 1)
    }
    else{
        UI.SetValue("Rage", "GENERAL", "Targeting", "Hitboxes", cache1)
        UI.SetValue("Rage", "PISTOL", "Targeting", "Hitboxes", cache2)
        UI.SetValue("Rage", "HEAVY PISTOL", "Targeting", "Hitboxes", cache3)
        UI.SetValue("Rage", "SCOUT", "Targeting", "Hitboxes", cache4)
        UI.SetValue("Rage", "AWP", "Targeting", "Hitboxes", cache5)
        UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Hitboxes", cache6)
    }
}
Cheat.RegisterCallback("CreateMove", "on_cm")