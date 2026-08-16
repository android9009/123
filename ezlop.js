UI.AddCheckbox("Head/Body/Safety conditions");
UI.AddMultiDropdown(" | Force head conditions", ["If in air", "If crouching"]);
UI.AddMultiDropdown(" | Force body conditions", ["If lethal", "If slow-walking", "If standing", "If in air", "If crouching"]);
UI.AddMultiDropdown(" | Force safety conditions", ["If lethal", "If slow-walking", "If standing", "If in air", "If crouching"]);
UI.AddCheckbox("Head/Body/Safety flags");

var info = [];
var safe = [];

function get_value(item)
{
    return UI.GetValue("Misc", "JAVASCRIPT", "Script items", item);
}

function get_proper_eye()
{
    var local_player = Entity.GetLocalPlayer();
    var origin = Entity.GetRenderOrigin(local_player);
    if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck"))
        return [origin[0], origin[1], origin[2] + 46 + 18];
    else
        return Entity.GetEyePosition(local_player);
}

function extrapolate_tick(entity, ticks, x, y, z)
{
    var velocity = Entity.GetProp(entity, "CBasePlayer", "m_vecVelocity[0]");

    var new_pos = [x,y,z];
    new_pos[0] = new_pos[0] + velocity[0] * Globals.TickInterval() * ticks;
    new_pos[1] = new_pos[1] + velocity[1] * Globals.TickInterval() * ticks;
    new_pos[2] = new_pos[2] + velocity[2] * Globals.TickInterval() * ticks;
        return new_pos;
}

function force_head(entity)
{
    disable_body();
    var local_player = Entity.GetLocalPlayer();
    var eye_pos = get_proper_eye();
    var head_pos = Entity.GetHitboxPosition(entity, 0);
    var head_damage = Trace.Bullet(local_player, entity, eye_pos, head_pos);
    Ragebot.ForceTargetMinimumDamage(entity, head_damage[1]);
}

function force_body()
{
    if (!UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim"))
        UI.ToggleHotkey("Rage", "GENERAL", "General", "Force body aim");
}

function disable_body()
{
    if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim"))
        UI.ToggleHotkey("Rage", "GENERAL", "General", "Force body aim");
}

function force_safe()
{
    if (!UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point"))
        UI.ToggleHotkey("Rage", "GENERAL", "General", "Force safe point");
}

function disable_safe()
{
    if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point"))
        UI.ToggleHotkey("Rage", "GENERAL", "General", "Force safe point");
}

function is_standing(entity)
{
    var entity_velocity = Entity.GetProp(entity, "CBasePlayer", "m_vecVelocity[0]");
    var entity_speed = Math.sqrt(entity_velocity[0] * entity_velocity[0] + entity_velocity[1] * entity_velocity[1]);
    if (entity_speed >= 0 && entity_speed < 10) return true;
    else return false;
}

function is_crouching(entity)
{
    var flags = Entity.GetProp(entity, "CBasePlayer", "m_fFlags");
    if (flags & 1 << 1) return true;
    else return false;
}

function is_slowwalking(entity)
{
    var entity_velocity = Entity.GetProp(entity, "CBasePlayer", "m_vecVelocity[0]");
    var entity_speed = Math.sqrt(entity_velocity[0] * entity_velocity[0] + entity_velocity[1] * entity_velocity[1]);
    if (entity_speed >= 10 && entity_speed <= 85) return true;
    else return false;
}

function is_inair(entity)
{
    var flags = Entity.GetProp(entity, "CBasePlayer", "m_fFlags");
    if (!(flags & 1 << 0) && !(flags & 1 << 0x12)) return true;
    else return false;
}

function is_lethal(entity)
{
    var local_player = Entity.GetLocalPlayer();
    var eye_pos = get_proper_eye();
    var local_pos = extrapolate_tick(local_player, 25, eye_pos[0], eye_pos[1], eye_pos[2]);
    var entity_hp = Entity.GetProp(entity, "CBasePlayer", "m_iHealth");
    var pelvis_pos = Entity.GetHitboxPosition(entity, 2);
    var body_pos = Entity.GetHitboxPosition(entity, 3);
    var thorax_pos = Entity.GetHitboxPosition(entity, 4);
    var pelvis_trace = Trace.Bullet(local_player, entity, local_pos, pelvis_pos);
    var body_trace = Trace.Bullet(local_player, entity, local_pos, body_pos);
    var thorax_trace = Trace.Bullet(local_player, entity, local_pos, thorax_pos);
    var pelvis_dmg = pelvis_trace[1];
    var body_dmg = body_trace[1];
    var thorax_dmg = thorax_trace[1];
    var lethal_damage = Math.max(pelvis_dmg, body_dmg, thorax_dmg);
    if (entity_hp <= lethal_damage) return true;
    else return false;
}

//region flags
function draw_flags()
{
    enemies = Entity.GetEnemies();
    
    for (i = 0; i < enemies.length; i++)
    {
        if (!Entity.IsValid(enemies[i])) continue;
        if (!Entity.IsAlive(enemies[i])) continue;
        if (Entity.IsDormant(enemies[i])) continue;
        
        var pos = Entity.GetRenderBox(enemies[i]);
        var font = Render.AddFont("Verdana", 7, 700);
        var a = pos[3] - pos[1];
        a /= 2;
        a += pos[1];

        switch (info[enemies[i]])
        {
            case 'HEAD':
                Render.StringCustom(a, pos[2] - 25, 1, "HEAD", [10, 10, 10, 125], font);
                Render.StringCustom(a - 1, pos[2] - 25, 1, "HEAD", [255, 95, 95, 255], font);
                break;
            case 'BODY':
                Render.StringCustom(a, pos[2] - 25, 1, "BODY", [10, 10, 10, 125], font);
                Render.StringCustom(a - 1, pos[2] - 25, 1, "BODY", [237, 144, 255, 255], font);
                break;
            case 'PREFER':
                Render.StringCustom(a, pos[2] - 25, 1, "PREFER", [10, 10, 10, 125], font);
                Render.StringCustom(a - 1, pos[2] - 25, 1, "PREFER", [95, 186, 255, 255], font);
                break;
        }

        switch (safe[enemies[i]])
        {
            case 'SAFE':
                Render.StringCustom(a, pos[2] - 35, 1, "SAFE", [10, 10, 10, 125], font);
                Render.StringCustom(a - 1, pos[2] - 35, 1, "SAFE", [211, 255, 144, 255], font);
                break;
        }
    }
}
//end region

//region conditions
function conditions()
{
    if (get_value("Head/Body/Safety conditions"))
    {
        enemies = Entity.GetEnemies();
        local_player = Entity.GetLocalPlayer();
        
        for (i = 0; i < enemies.length; i++)
        {
            if (!Entity.IsValid(enemies[i])) continue;
            if (!Entity.IsAlive(enemies[i])) continue;
            if (Entity.IsDormant(enemies[i])) continue;

            if (get_value("Head/Body/Safety conditions"))
            {
                head_condtions = get_value(" | Force head conditions");
                body_condtions = get_value(" | Force body conditions");
                safe_condtions = get_value(" | Force safety conditions");

                if (safe_condtions & (1 << 0) && is_lethal(enemies[i]) || safe_condtions & (1 << 1) && is_slowwalking(enemies[i]) || safe_condtions & (1 << 2) && is_standing(enemies[i]) || safe_condtions & (1 << 3) && is_inair(enemies[i]) || safe_condtions & (1 << 4) && is_crouching(enemies[i]))
                {
                    if (get_value("Head/Body/Safety flags"))
                    {
                        force_safe();
                        safe[enemies[i]] = 'SAFE';
                    }
                    else
                    {
                        force_safe();
                    }
                }
                else
                {
                    disable_safe();
                    safe[enemies[i]] = 'NONE';
                }
                if (head_condtions & (1 << 0) && is_inair(enemies[i]) || head_condtions & (1 << 1) && is_crouching(enemies[i]))
                {
                    if (get_value("Head/Body/Safety flags"))
                    {
                        force_head(enemies[i]);
                        info[enemies[i]] = 'HEAD';
                    }
                    else
                    {
                        force_head(enemies[i]);
                    }
                }
                else if (body_condtions & (1 << 0) && is_lethal(enemies[i]) || body_condtions & (1 << 1) && is_slowwalking(enemies[i]) || body_condtions & (1 << 2) && is_standing(enemies[i]) || body_condtions & (1 << 3) && is_inair(enemies[i]) || body_condtions & (1 << 4) && is_crouching(enemies[i]))
                {
                    if (get_value("Head/Body/Safety flags"))
                    {
                        force_body();
                        info[enemies[i]] = 'BODY';
                    }
                    else
                    {
                        force_body();
                    }
                }
                else
                {
                    if (get_value("Head/Body/Safety flags"))
                    {
                        disable_body();
                        info[enemies[i]] = 'PREFER';
                    }
                    else
                    {
                        disable_body();
                    }
                }
            }
        }
    }
}

Cheat.RegisterCallback("Draw", "draw_flags");
Cheat.RegisterCallback("CreateMove", "conditions");