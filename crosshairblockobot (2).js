UI.AddHotkey("Crosshair key")
UI.AddSliderFloat("Distance from target", 0, 100)
function veclength(vec){
    var a = Math.pow(vec[0], 2)
    var b = Math.pow(vec[1], 2)
    var c = Math.pow(vec[2], 2)
    return Math.sqrt(a + b + c)
}
function distTo(start,end){
    var x = end[0] - start[0]
    var y = end[1] - start[1]
    var z = end[2] - start[2]
    return veclength([x,y,z])
}
function getOrigin(ent){
    return Entity.GetProp(ent,"DT_BasePlayer", "m_vecOrigin")
}
function getVelocity(ent){
    return Entity.GetProp(ent,"DT_BasePlayer","m_vecVelocity[0]")
}
function getEyeAngles(ent){
    return Entity.GetProp(ent,"DT_CSPlayer","m_angEyeAngles")
}
function angleVectors(angles, multiplier){
    var sp = Math.sin(angles[0] / 180 * Math.PI)
    var cp = Math.cos(angles[0] / 180 * Math.PI)
    var sy = Math.sin(angles[1] / 180 * Math.PI)
    var cy = Math.cos(angles[1] / 180 * Math.PI)
    var forward = []
    forward[0] = cp*cy
    forward[1] = cp*sy
    forward[2] = -sp
    forward[0]*=multiplier
    forward[1]*=multiplier
    forward[2]*=multiplier
    return forward
}
function cm(){
    if(!UI.IsHotkeyActive("Script Items", "Crosshair key")) return


    var ents = Entity.GetTeammates()
    var local = Entity.GetLocalPlayer()
    var dist = 9999999999999
    var closest = 0
    for(i = 0; i < ents.length; i++){
        if(ents[i] != local && dist > distTo(getOrigin(local), getOrigin(ents[i])) && Entity.IsAlive(ents[i])){
            dist = distTo(getOrigin(local), getOrigin(ents[i]))
            closest = ents[i]
        }
    }
    var forward = angleVectors(getEyeAngles(closest), UI.GetValue("Script Items", "Distance from target"))
        var eyepos = Entity.GetEyePosition(closest)
        var localeye = Entity.GetEyePosition(local)
        forward[0] += eyepos[0]
        forward[1] += eyepos[1]
        forward[2] += eyepos[2]
        forward[0]-=localeye[0]
        forward[1]-=localeye[1]
        forward[2]-=localeye[2]
        var yaw = Local.GetViewAngles()[1]
        
var cmdMove = [
            (((Math.sin(yaw / 180 * Math.PI)) * forward[1]) + (Math.cos(yaw / 180 * Math.PI) * forward[0])) * 20,
            (((Math.sin(yaw / 180 * Math.PI)) * forward[0]) + (Math.cos(yaw / 180 * Math.PI) * -forward[1])) * 20
        ]

        UserCMD.SetMovement([cmdMove[0],cmdMove[1],0])
}
Cheat.RegisterCallback("CreateMove","cm")