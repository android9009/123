// CHRISTMAS.JS!
// CHRISTMAS.JS!
var local = Entity.GetLocalPlayer();

function draw()
{
    enemies = Entity.GetEnemies();
    hat = Render.AddTexture("ot/scripts/christmas.png");
    scoped = Entity.GetProp(local, "CCSPlayer", "m_bIsScoped");

    for (i = 0; i < enemies.length; i++)
    {
        if (!Entity.IsAlive(enemies[i]) || Entity.IsDormant(enemies[i]) || !Entity.IsValid(enemies[i]))
            continue;

        pos = Entity.GetHitboxPosition(enemies[i], 0);
        world = Render.WorldToScreen(pos);
        width = 15;
        height = 10;
        x = 8.6;
        y = 9;

        if (scoped)
        {
            width = width * 1.4;
            height = height * 1.4;
            x = x * 1.4;
            y = y * 1.4;
        }

        Render.TexturedRect(world[0] - x, world[1] - y, width, height, hat);
    }
    if(World.GetMapName() == "" || !Entity.IsAlive(local))
      return;
     
    if (!UI.IsHotkeyActive("Visual", "WORLD", "View", "Thirdperson"))
        return;
    pos = Entity.GetHitboxPosition(local, 0);
    world = Render.WorldToScreen(pos);
    Render.TexturedRect(world[0] - 20.6, world[1] - 16, 35, 30, hat);
}

}

Cheat.RegisterCallback("Draw", "draw");
