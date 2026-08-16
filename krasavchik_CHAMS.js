


function draw()
{
    var entities = Entity.GetEnemies();
    var peter = Render.AddTexture("ot/scripts/god.png");

    for (var i = 0; i < entities.length; i++) {
        if (Entity.IsAlive(entities[i])) {
            var pos = Entity.GetRenderBox(entities[i]);

            var sizeY = (pos[4] - pos[2]);
            var sizeX = (pos[3] - pos[1]);

            Render.TexturedRect(pos[1], pos[2], sizeX, sizeY, peter);
        }
    }
}
Cheat.RegisterCallback("Draw", "draw");