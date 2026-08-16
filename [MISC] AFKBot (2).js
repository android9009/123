

var local = Entity.GetLocalPlayer();
var shot_time = 0;
var stuck_time = 0;
UI.AddHotkey("Enable Auto Walk");

function draw()
{
    if (!Entity.IsAlive(local) || World.GetMapName() == "")
        return;
    if (!UI.IsHotkeyActive("Script items", "Enable Auto Walk"))
        return;
    eyeAngles = Local.GetViewAngles();
    origin = Entity.GetProp(local, "CBasePlayer", "m_vecOrigin");
    offset = Entity.GetProp(local, "CBasePlayer", "m_vecViewOffset[2]");
    head = vector_add(origin, [0, 0, offset[0]]);
    e_V = angle_to_vec(eyeAngles[0], eyeAngles[1]);
    stop_feet = [head[0] + e_V[0] * 50, head[1] + e_V[1] * 50, origin[2]];
    stop = [head[0] + e_V[0] * 50, head[1] + e_V[1] * 50, head[2] + e_V[2] * 50];
    world = Render.WorldToScreen(head);
    world_stop_feet = Render.WorldToScreen(stop_feet);
    Render.Line(world[0], world[1], world_stop_feet[0], world_stop_feet[1], [255, 255, 255, 255]);
    Render.Circle(world[0], world[1], 5, [255, 255, 255, 255]);
}

function move()
{
    scoped = Entity.GetProp(local, "CCSPlayer", "m_bIsScoped");
    if (!Entity.IsAlive(local) || World.GetMapName() == "")
        return;
    if (!UI.IsHotkeyActive("Script items", "Enable Auto Walk"))
        return;
    if (Globals.Curtime() - shot_time > 1 && !scoped)
    {
        shot_time = 0;
    }
    else
    {
        UserCMD.SetMovement([40, 0, 0]);
        return;
    }
    eyeAngles = Local.GetViewAngles();
    origin = Entity.GetProp(local, "CBasePlayer", "m_vecOrigin");
    offset = Entity.GetProp(local, "CBasePlayer", "m_vecViewOffset[2]");
    flags = Entity.GetProp(local, "CBasePlayer", "m_fFlags");
    head = vector_add(origin, [0, 0, offset[0]]);
    e_V = angle_to_vec(eyeAngles[0], eyeAngles[1]);
    e_V_right = angle_to_vec(eyeAngles[0], eyeAngles[1] + 90);
    e_V_left = angle_to_vec(eyeAngles[0], eyeAngles[1] - 90);
    stop_feet = [head[0] + e_V[0] * 80, head[1] + e_V[1] * 80, origin[2]];
    stop = [head[0] + e_V[0] * 80, head[1] + e_V[1] * 80, (head[2] + 20) + e_V[2] * 100];
    stop_left = [head[0] + e_V_left[0] * 8192, head[1] + e_V_left[1] * 8192, head[2] + e_V_left[2] * 8192];
    stop_right = [head[0] + e_V_right[0] * 8192, head[1] + e_V_right[1] * 8192, head[2] + e_V_right[2] * 8192];
    trace_feet = Trace.Line(local, head, stop_feet);
    trace_straight = Trace.Line(local, head, stop);
    trace_left = Trace.Line(local, head, stop_left);
    trace_right = Trace.Line(local, head, stop_right);
    angles = Local.GetViewAngles();
    UserCMD.SetMovement([450, 0, 0]);
    velocity = Entity.GetProp(local, "CBasePlayer", "m_vecVelocity[0]");
    speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
    if (trace_straight[1] < 1 && trace_feet[1] == 1)
    {
        UserCMD.ForceCrouch();
        return;
    }
    if (flags == 263)
        return;
    rand = Math.random() * 180;
    if (speed < 25 && Globals.Tickcount() - stuck_time > 4)
    {
        stuck_time = Globals.Tickcount();
        if (trace_left[1] < trace_right[1])
        {
            UserCMD.SetAngles([angles[0], -rand * angles[1], angles[2]]);
            UserCMD.SetMovement([-450, 450, 0]);
        }
        else
        {
            UserCMD.SetAngles([angles[0], rand * angles[1], angles[2]]);
            UserCMD.SetMovement([-450, -450, 0]);
        }
        UserCMD.ForceJump();
    }
    if (trace_straight[1] < .9)
    {
        if (trace_left[1] < trace_right[1])
        {
            UserCMD.SetMovement([0, -450, 450]);
            UserCMD.SetAngles([angles[0], angles[1] + 5, angles[2]]);
        }
        else
        {
            UserCMD.SetAngles([angles[0], angles[1] - 5, angles[2]]);
            UserCMD.SetMovement([0, 450, 450]);
        }
    }
    if (trace_feet[1] < .7)
    {
        UserCMD.ForceJump();
        UserCMD.ForceCrouch();
    }
}

function on_shot()
{
    if (Entity.IsLocalPlayer(Entity.GetEntityFromUserID(Event.GetInt("userid"))))
    {
        shot_time = Globals.Curtime();
    }
}

function degreesToRadians(degress)
{
    return degress * Math.PI / 180.0;
}

function angle_to_vec(pitch, yaw)
{
    var p = degreesToRadians(pitch);
    var y = degreesToRadians(yaw)
    var sin_p = Math.sin(p);
    var cos_p = Math.cos(p);
    var sin_y = Math.sin(y);
    var cos_y = Math.cos(y);
    return [cos_p * cos_y, cos_p * sin_y, -sin_p];
}

function vector_add(vec, vec2)
{
    newVec = [
        vec[0] + vec2[0],
        vec[1] + vec2[1],
        vec[2] + vec2[2]
    ]
    return newVec;
}
Cheat.RegisterCallback("Draw", "draw");
Cheat.RegisterCallback("weapon_fire", "on_shot");
Cheat.RegisterCallback("CreateMove", "move");

