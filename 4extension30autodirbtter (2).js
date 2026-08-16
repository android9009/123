UI.AddCheckbox("Autodirection")
UI.AddDropdown("Type", ["Closest", "FOV"])
UI.AddSliderInt("Extension", 0, 10)
UI.AddSliderInt("Minimum Damage", 0, 100)
function DEGTORAD(degrees) {
    return degrees * Math.PI / 180.0;
}
function RADTODEG(rad){
    return rad * 180 / Math.PI
}
function anglevector(vec) {
    var p = DEGTORAD(vec[0]);
    var y = DEGTORAD(vec[1])
    var sin_p = Math.sin(p);
    var cos_p = Math.cos(p);
    var sin_y = Math.sin(y);
    var cos_y = Math.cos(y);
    return [cos_p * cos_y, cos_p * sin_y, -sin_p];
}
function distanceTo(start, end) {
    var final = []
    final[0] = end[0] - start[0]
    final[1] = end[1] - start[1]
    final[2] = end[2] - start[2]
    final[0] = Math.pow(final[0],2)
    final[1] = Math.pow(final[1],2)
    final[2] = Math.pow(final[2],2)
    
    return Math.pow(final[0] + final[1] + final[2],2)
}
function calcAngle(entityPos){
    var source = Entity.GetEyePosition(Entity.GetLocalPlayer())
    var delta = []
    delta[0] = source[0] - entityPos[0]
    delta[1] = source[1] - entityPos[1]
    delta[2] = source[2] - entityPos[2]
    var angles = []
    var viewangles = Local.GetViewAngles()
    angles[0] = RADTODEG(Math.atan(delta[2] / Math.hypot(delta[0], delta[1]))) - viewangles[0]
    angles[1] = RADTODEG(Math.atan(delta[1] / delta[0])) - viewangles[1]
    angles[2] = 0
    if(delta[0] >= 0)
        angles[1] += 180
    return angles
}
function getBestEnemy(){
    var type = UI.GetValue("Script Items", "Type")
    var enemies = Entity.GetEnemies()
    var eye = Entity.GetEyePosition(Entity.GetLocalPlayer())
    var best = -1
    if(type == 0){
        var maxdist = 9999999999999999 * 9999999999999
        for(i = 0; i < enemies.length; i++){
            if(Entity.IsValid(enemies[i]) && Entity.IsAlive(enemies[i]) && !Entity.GetProp(enemies[i], "DT_CSPlayer", "m_bGunGameImmunity")){
                var hitbox = Entity.GetHitboxPosition(enemies[i], 0)
                if(distanceTo(eye, hitbox) < maxdist){
                    best = enemies[i]
                    
                    maxdist = distanceTo(eye, hitbox)
                }
            }
        }
    }
    if(type == 1){
        var maxangle = 360
        for(i = 0; i < enemies.length; i++){
            if(Entity.IsValid(enemies[i]) && Entity.IsAlive(enemies[i]) && !Entity.GetProp(enemies[i], "DT_CSPlayer", "m_bGunGameImmunity")){
                var hitbox = Entity.GetHitboxPosition(enemies[i], 0)
                var angle = calcAngle(hitbox)
                var fov = Math.hypot(angle[0],angle[1])
                if(fov < 360 && fov > 0 && maxangle > fov){
                    best = enemies[i]
                    maxangle = fov
                }
            }
        }
    }
    return best
}
function onCM(){
    if(!UI.GetValue("Script Items", "Autodirection"))
        return
    var local = Entity.GetLocalPlayer()
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset",0)
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", true)
    if(!local || !Entity.IsAlive(local))
        return
    var enemy = getBestEnemy()
    if(enemy == -1)
        return
    var origin = Entity.GetEyePosition(local)
    const times = 10
    var degreeToTrace = 360 / times
    var maxdist = Infinity
    var bestYaw = -181
    var amountHit = 0
    for(i = 0; i < times; i++){
        var yaw = i * degreeToTrace
        var baseang = anglevector([0,yaw,0])
        baseang[0] *= 20 * UI.GetValue("Script Items", "Extension")
        baseang[1] *= 20 * UI.GetValue("Script Items", "Extension")
        baseang[2] *= 20 * UI.GetValue("Script Items", "Extension")
        var ang = baseang
        ang[0] += origin[0]
        ang[1] += origin[1]
        ang[2] += origin[2]
        
        
        var line = Trace.Line(local, origin, ang)
        var a = 20;
        if(line[1] < 0.6){
            baseang[0] *= 10 * UI.GetValue("Script Items", "Extension")
            baseang[1] *= 10 * UI.GetValue("Script Items", "Extension")
            baseang[2] *= 10 * UI.GetValue("Script Items", "Extension")
            var ang = baseang
            ang[0] += origin[0]
            ang[1] += origin[1]
            ang[2] += origin[2]
            line = Trace.Line(local, origin, ang)
            a -= 10
        }
        var bullet = Trace.Bullet(local, enemy, baseang, Entity.GetHitboxPosition(enemy, 5))
        var bullet2 = Trace.Bullet(local, enemy, baseang, Entity.GetHitboxPosition(enemy, 0))
        if((bullet[0] && bullet[1] > UI.GetValue("Script Items", "Minimum Damage")) || (bullet2[0] && bullet2[1] > UI.GetValue("Script Items", "Minimum Damage"))){
            amountHit++
            if(distanceTo(baseang, Entity.GetHitboxPosition(enemy, 5)) < maxdist){
                maxdist = distanceTo(origin, Entity.GetHitboxPosition(enemy, 5))
                bestYaw = yaw
            }
            else{
                continue
            }
        }
        else{
            continue
        }
    }
    
    
    if(bestYaw == -181 || amountHit > 7)
        return
    bestYaw -= Local.GetViewAngles()[1]
    bestYaw += 180
    bestYaw %= 360
    bestYaw -= 180
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset",bestYaw)
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", false)
}
Cheat.RegisterCallback("CreateMove", "onCM")


Cheat.RegisterCallback("CreateMove", "onCM")