lbySwitch = false;
movefactor = 0;
manualSide = 0;
side = 0;
lby_side = 0;
direction = 0;
swap = 0;
received_key = false;
function vector_angles(target, eyepos)
{
    const vector_substract = function(vec1, vec2)
    {
        return [
            vec1[0] - vec2[0],
            vec1[1] - vec2[1],
            vec1[2] - vec2[2],
        ];
    };
    
    const ext = vector_substract(target, eyepos);
    
    const yaw = Math.atan2(ext[1], ext[0]) * 180 / Math.PI;
    const pitch = -(Math.atan2(ext[2], Math.sqrt(ext[0] ** 2 + ext[1] ** 2)) * 180 / Math.PI);
    
    return [pitch, yaw];
}
localplayer = {   
    local() {
        return Entity.GetLocalPlayer();
    },
    health() {
        return Entity.GetHealth(localplayer.local());
    },
    moving() {
        return (entity.getVelocity(localplayer.local()) > 2);
    },
    dif() {
        fakeyaw = Local.GetFakeYaw();
        realyaw = Local.GetRealYaw();
        return Math.abs(realyaw - fakeyaw);
    },
    valid() {
        return Entity.IsValid(localplayer.local());
    }
}
entity = {
    getVelocity(e) {
        velocity = Entity.GetProp( e, "CBasePlayer", "m_vecVelocity[0]" );
        return Math.sqrt( velocity[0] * velocity[0] + velocity[1] * velocity[1] );
    },
    getVelocity3d(e) {
        return Entity.GetProp( e, "CBasePlayer", "m_vecVelocity[0]" );
    },
    getPos(e) {
        return Entity.GetRenderOrigin(e);
    },
    getClosestEnemy() {
        enms = Entity.GetEnemies();
        dist = 999999;
        enm = null;
        for (i = 0; i < 64; i++) {
            if (enms[i] == undefined) break;
            pos = entity.getPos(enms[i]);
            d = trace.distanceVector(Entity.GetRenderOrigin(localplayer.local()), pos);
            if (d < dist) {dist = d; enm = enms[i];}
        }
        return [enm, dist];
    },
    getCrosshairEnemy() {
        enms = Entity.GetEnemies();
        dist = 999999;
        enm = null;
        for (i = 0; i < 64; i++) {
            if (enms[i] == undefined) break;
            pos = entity.getPos(enms[i]);
            pos2d = Render.WorldToScreen(pos);
            screen = Render.GetScreenSize();
            sx = screen[0] / 2;
            sy = screen[1] / 2;
            d = trace.distanceVector2d(pos2d, [sx, sy]);
            if (d < dist) {
                dist = d;
                enm = enms[i];
            }
        }
        return enm;
    }
}
trace = {
    distanceVector( v1, v2 )
    {
        var dx = v1[0] - v2[0];
        var dy = v1[1] - v2[1];
        var dz = v1[2] - v2[2];
        return Math.sqrt( dx * dx + dy * dy + dz * dz );
    },
    distanceVector2d( v1, v2 )
    {
        var dx = v1[0] - v2[0];
        var dy = v1[1] - v2[1];
        return Math.sqrt( dx * dx + dy * dy );
    },
    addVector(v1, v2) {
        var dx = v1[0] + v2[0];
        var dy = v1[1] + v2[1];
        var dz = v1[2] + v2[2];
        return [dx, dy, dz];
    },
    deg2rad( degress ) {
        return degress * Math.PI / 180.0;
    },
    rad2deg( rad ) {
        return rad * (Math.PI / 180.0);
    },
    angle_to_vec( pitch, yaw ) {
        var p = trace.deg2rad( pitch );
        var y = trace.deg2rad( yaw )
        var sin_p = Math.sin( p );
        var cos_p = Math.cos( p );
        var sin_y = Math.sin( y );
        var cos_y = Math.cos( y );
        return [ cos_p * cos_y, cos_p * sin_y, -sin_p ];
    },
    getDist(entity_id, entity_angles) {
        var entity_vec = trace.angle_to_vec( entity_angles[0], entity_angles[1] );
        var entity_pos = Entity.GetRenderOrigin( entity_id );
        entity_pos[2] += 50;
        var stop = [ entity_pos[ 0 ] + entity_vec[0] * 8192, entity_pos[1] + entity_vec[1] * 8192, ( entity_pos[2] )  + entity_vec[2] * 8192 ];
        var traceResult = Trace.Line( entity_id, entity_pos, stop );
        if( traceResult[1] == 1.0 )
        return;
        stop = [ entity_pos[ 0 ] + entity_vec[0] * traceResult[1] * 8192, entity_pos[1] + entity_vec[1] * traceResult[1] * 8192, entity_pos[2] + entity_vec[2] * traceResult[1] * 8192 ];
        var distance = Math.sqrt( ( entity_pos[0] - stop[0] ) * ( entity_pos[0] - stop[0] ) + ( entity_pos[1] - stop[1] ) * ( entity_pos[1] - stop[1] ) + ( entity_pos[2] - stop[2] ) * ( entity_pos[2] - stop[2] ) );
        entity_pos = Render.WorldToScreen( entity_pos );
        stop = Render.WorldToScreen( stop );
        return distance;
    }
}
AA = {
    enableOverride() {
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", 0)
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", 0)
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0)
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0)
        return AntiAim.SetOverride(1);
    },
    disableOverride() {
        return AntiAim.SetOverride(0);
    },
    getOverride() {
        return AntiAim.getOverride();
    },
    antiaims: {
        backLeft() {
            lbySwitch ? lbySwitch = false : lbySwitch = true;
            localplayer.moving() ? (
                AntiAim.SetFakeOffset(0),
                AntiAim.SetRealOffset(-60),
                AntiAim.SetLBYOffset(lbySwitch ? 0 : 90)
            ) : (
                AntiAim.SetFakeOffset(0),
                AntiAim.SetRealOffset(-60),
                AntiAim.SetLBYOffset(localplayer.dif() > 60 ? (lbySwitch ? 160 : 60) : 60)
            );
        },
        backRight() {
            lbySwitch ? lbySwitch = false : lbySwitch = true;
            localplayer.moving() ? (
                AntiAim.SetFakeOffset(0),
                AntiAim.SetRealOffset(60),
                AntiAim.SetLBYOffset(lbySwitch ? 0 : -90)
            ) : (
                AntiAim.SetFakeOffset(0),
                AntiAim.SetRealOffset(60),
                AntiAim.SetLBYOffset(localplayer.dif() > 60 ? (lbySwitch ? -160 : -60) : -60)
            );
        },
        manualSwitch() {
            t = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Toggle");
            t ? AA.antiaims.backRight() : AA.antiaims.backLeft();
        },
        manualKeys() {
            l = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Left");
            r = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Right");
            if (l) side = 0;
            if (r) side = 1;
            side ? AA.antiaims.backRight() : AA.antiaims.backLeft();
        },
        edgeDetect(std) {
            if (std) {
                local = localplayer.local();
                angle = Local.GetViewAngles();
                base = 0;
                left = [];
                right = [];
                left[0] = trace.getDist(local, [0, angle[1]  -5]);
                left[1] = trace.getDist(local, [0, angle[1]  -15]);
                left[2] = trace.getDist(local, [0, angle[1] -25]);
                left[3] = trace.getDist(local, [0, angle[1]  -55]);
                left[4] = trace.getDist(local, [0, angle[1]  -80]);
                right[0] = trace.getDist(local, [0, angle[1]  +5]);
                right[1] = trace.getDist(local, [0, angle[1]  +15]);
                right[2] = trace.getDist(local, [0, angle[1]  +25]);
                right[3] = trace.getDist(local, [0, angle[1]  +55]);
                right[4] = trace.getDist(local, [0, angle[1]  +80]);
                dist_right = (left[0] + left[1] + left[2] + left[3]) / 4;
                dist_left = (right[0] + right[1] + right[2] + right[3]) / 4;

                if (dist_left < 50 && right[4] < left[4]) direction = 2;
                if (left[4] < right[4] && dist_right < 50) direction = 1;
                if (dist_left > 50 && dist_right > 50) direction = 0;

                dist_left < dist_right ? side = 0 : side = 1;
            }
            if (direction == 0) {
                if (swap < Global.Curtime()) {
                    lby_side ? lby_side = false : lby_side = true;
                    swap = Global.Curtime() + 2.32895925;
                }
                if (side) {
                    real = base;
                    fake = base +60;
                    lby = base -120;
                } else {
                    real = base;
                    fake = base -60;
                    lby = base +120;
                }
                if (localplayer.dif() < 30){ lby = lby_side ? base - 60 : base + 60;}
            } else if (direction == 1) {
                base += 90;
                real = base;
                fake = base - 30;
                lby = base + 160;
                if (localplayer.dif() < 30){ lby = base + 90 ;}
            }
            else if (direction == 2) {
                base -= 90;
                real = base;
                fake = base - 30;
                lby = base + 160;
                if (localplayer.dif() < 30){ lby = base + 90 ;}
            }

            localplayer.moving() ? (
                AntiAim.SetRealOffset(fake),
                AntiAim.SetFakeOffset(real),
                AntiAim.SetLBYOffset(lby)
            ) : (
                AntiAim.SetFakeOffset(real),
                AntiAim.SetRealOffset(fake),
                AntiAim.SetLBYOffset(lby)
            );
        },
        freestand() {
            t = UI.GetValue("target");
            target = t ? entity.getCrosshairEnemy() : entity.getClosestEnemy()[0];
            if (entity.getClosestEnemy()[1] < 100) {
                target = entity.getClosestEnemy()[0];
            }
            local = localplayer.local();

            if (target != null && !Entity.IsDormant(target) && Entity.IsAlive(target) && Entity.IsValid(target) && Entity.IsAlive(local)) {
                pos = Entity.GetHitboxPosition(target, 2);
                vel = entity.getVelocity3d(target);
                pos_prediction = trace.addVector(pos, vel);
                eye = Entity.GetEyePosition(local);
                res_predict = Trace.Line(target, pos_prediction, eye)
                res_bullet = Trace.Bullet(local, eye, pos);
                if ((Entity.IsValid(res_bullet[0]) && Entity.IsAlive(res_bullet[0])) || res_predict[1] > .5) {
                    angle = vector_angles(pos, eye);
                    langle = Local.GetViewAngles()[1];
                    base = Math.abs(langle - angle[1]);
                    left = [];
                    right = [];
                    left[0] = trace.getDist(local, [0, angle[1]  -5]);
                    left[1] = trace.getDist(local, [0, angle[1]  -15]);
                    left[2] = trace.getDist(local, [0, angle[1] -25]);
                    left[3] = trace.getDist(local, [0, angle[1]  -55]);
                    left[4] = trace.getDist(local, [0, angle[1]  -80]);
                    right[0] = trace.getDist(local, [0, angle[1]  +5]);
                    right[1] = trace.getDist(local, [0, angle[1]  +15]);
                    right[2] = trace.getDist(local, [0, angle[1]  +25]);
                    right[3] = trace.getDist(local, [0, angle[1]  +55]);
                    right[4] = trace.getDist(local, [0, angle[1]  +80]);
                    dist_right = (left[0] + left[1] + left[2] + left[3]) / 4;
                    dist_left = (right[0] + right[1] + right[2] + right[3]) / 4;

                    if (dist_left < 50 && right[4] < left[4]) direction = 2;
                    if (left[4] < right[4] && dist_right < 50) direction = 1;
                    if (dist_left > 50 && dist_right > 50) direction = 0;
                    
                    dist_left < dist_right ? side = 0 : side = 1;
                    if ( langle > angle[1]) base = 0 - base - 17;

                    if (direction == 0) {
                        if (side) {
                            real = base;
                            fake = base +60;
                            lby = base -120;
                        } else {
                            real = base;
                            fake = base -60;
                            lby = base +120;
                        }
                        if (localplayer.dif() < 30){ lby = side ? base - 60 : base + 60;}
                    } else if (direction == 1) {
                        base += 90;
                        real = base;
                        fake = base - 30;
                        lby = base + 160;
                        if (localplayer.dif() < 30){ lby = base + 90 ;}
                    }
                    else if (direction == 2) {
                        base -= 90;
                        real = base;
                        fake = base - 30;
                        lby = base + 160;
                        if (localplayer.dif() < 30){ lby = base + 90 ;}
                    }

                    localplayer.moving() ? (
                        AntiAim.SetRealOffset(fake),
                        AntiAim.SetFakeOffset(real),
                        AntiAim.SetLBYOffset(lby)
                    ) : (
                        AntiAim.SetFakeOffset(real),
                        AntiAim.SetRealOffset(fake),
                        AntiAim.SetLBYOffset(lby)
                    );
                }
                else {
                    UI.GetValue("Standalone edge detection") ? AA.antiaims.edgeDetect(true) : AA.antiaims.edgeDetect(false);
                }
            } else {
                UI.GetValue("Standalone edge detection") ? AA.antiaims.edgeDetect(true) : AA.antiaims.edgeDetect(false);
            }
        }
    }
}
function DRAW() {
    e = UI.GetValue("Enable")
    UI.SetEnabled("mode", e);
    e ? AA.enableOverride() : AA.disableOverride();
    if (!e) return;
    if (!localplayer.valid()) return
    aa = UI.GetValue("mode");
    UI.SetEnabled("Toggle", (aa == 2 && e));
    UI.SetEnabled("Left", (aa == 3 && e));
    UI.SetEnabled("Right", (aa == 3 && e));
    UI.SetEnabled("target", (aa == 5 && e));
    UI.SetEnabled("Standalone edge detection", (aa == 5 && e));
    if (aa == 0) AA.antiaims.backLeft();
    if (aa == 1) AA.antiaims.backRight();
    if (aa == 2) AA.antiaims.manualSwitch();
    if (aa == 3) AA.antiaims.manualKeys();
    if (aa == 4) AA.antiaims.edgeDetect(true);
    if (aa == 5) AA.antiaims.freestand();
}
Cheat.RegisterCallback("Draw", "DRAW");

UI.AddLabel("_______________Anti-Aim_______________");
UI.AddCheckbox("Enable");
UI.AddDropdown("mode", ["back left", "back right", "manual switch", "manual keys", "edge detect", "freestand"]);
UI.AddDropdown("target", ["Closest to player", "Closest to crosshair"]);
UI.AddCheckbox("Standalone edge detection");
UI.AddHotkey("Toggle");
UI.AddHotkey("Left");
UI.AddHotkey("Right");
UI.AddLabel("_______________////////_______________");

UI.SetEnabled("Toggle", 0);
UI.SetEnabled("Left", 0);
UI.SetEnabled("Right", 0);
UI.SetEnabled("target", 0);
UI.SetEnabled("Standalone edge detection", 0);