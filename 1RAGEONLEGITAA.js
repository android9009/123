UI.AddCheckbox("Rage with FOV")
UI.AddSliderInt("Max FOV", 0, 360)
function onCM(){
    if(!UI.GetValue("Script Items", "Rage with FOV"))
        return
    var ents = Entity.GetEntities()
    var local = Entity.GetLocalPlayer()
    var localorigin = Entity.GetEyePosition(local)
    var view = Local.GetViewAngles()
    var active = false
    for(i = 0; i < ents.length; i++){
        if(Entity.IsAlive(ents[i]) && Entity.IsValid(ents[i])){
            var origin = Entity.GetEyePosition(ents[i])
            var delta = [origin[0]-localorigin[0],origin[1]-localorigin[1],origin[2]-localorigin[2]]
            var radtodeg = function(rads){
                return rads * 180 / Math.PI
            }
            var angles = []
            angles[0] = radtodeg(Math.atan(delta[2] / Math.hypot(delta[0],delta[1]))) - view[0]
            angles[1] = radtodeg(Math.atan(delta[1] / delta[0])) - view[1]
            angles[2] = 0
            var fovFromCrosshair = Math.hypot(angles[0],angles[1])
            Cheat.Print(fovFromCrosshair + "\n")
            if(fovFromCrosshair < UI.GetValue("Script Items", "Max FOV")){
                active = true
            }
        }
    }
    UI.SetValue("Rage", "GENERAL", "General", "Enabled", active)
}
Cheat.RegisterCallback("CreateMove", "onCM")