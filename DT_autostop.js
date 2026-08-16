function vectorangles(forward){
    var angles = []
    if(forward[1] == 0 && forward[0] == 0){
        angles[0] = forward[2] > 0 ? 270 : 90
        angles[1] = 0
    }
    else{
        angles[0] = Math.atan2(-forward[2], Math.sqrt(forward[0] * forward[0] + forward[1]*forward[1])) * -180 / Math.PI
        angles[1] = Math.atan2(forward[1],forward[0]) * 180 / Math.PI
        if(angles[1] > 90)
            angles[1] -= 180
        else if(angles[1] < 90)
            angles[1] += 180
        else if(angles[1] == 90)
            angles[1] = 0
    }
    return angles
}
function anglevectors(angles){
    var sy = Math.sin(angles[1] * 180 / Math.PI)
    var cy = Math.cos(angles[1] * 180 / Math.PI)
    var sp = Math.sin(angles[0] * 180 / Math.PI)
    var cp = Math.cos(angles[0] * 180 / Math.PI)
    return [cp * cy, cp * sy, -sp]
}
var currentAction = 2
var lastTickShot = 0
function reset(){
    lastTickShot = 0
}
var lasttarget = 0
function onRageShoot(){
    if(!UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap") && !UI.GetValue("Rage", "GENERAL", "Exploits", "Doubletap"))
        return
    var type = Event.GetInt("exploit")
    // 1 = 1st shot
    // 2 = 2nd shot
    if(type == 1){
        currentAction = 1
        lastTickShot = Globals.Tickcount()
    }
    if(type == 2){
        currentAction = 2
    }
    lasttarget = Event.GetInt("target_index")
}
function onCM(){
    var local = Entity.GetLocalPlayer()
    if(!local || !Entity.IsAlive(local) || currentAction == 2)
        return
    if(!UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap") && !UI.GetValue("Rage", "GENERAL", "Exploits", "Doubletap"))
        return
    if(!Entity.IsAlive(lasttarget) || lastTickShot + 12 < Globals.Tickcount()){
        lasttarget = 0
        return
    }
    var velo = Entity.GetProp(local, "DT_CSPlayer", "m_vecVelocity[0]")
    var speed = Math.sqrt((velo[0]*velo[0])+(velo[1]*velo[2])+(velo[2]*velo[2]))
    var direction = vectorangles(velo)
    direction[1] = Local.GetViewAngles()[1] - direction[1]
    var forward = anglevectors(direction)
    var negative = []
    negative[0] = forward[0] * speed
    negative[1] = forward[1] * speed
    negative[2] = forward[2] * speed
    UserCMD.SetMovement([negative[0], negative[1], 0])
}
Cheat.RegisterCallback("ragebot_fire", "onRageShoot")
Cheat.RegisterCallback("CreateMove", "onCM")
Cheat.RegisterCallback("round_start", "reset")