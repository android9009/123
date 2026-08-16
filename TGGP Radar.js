var screenSize = Global.GetScreenSize();
var gameBoxSize = 300;
var radarpos = [0, 0];
var width = 200;
var height = 200;
function deg2Rad (angle) {
    return angle * 0.017453292519943295
}
function onDrawEvent()
{
    if(!UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Radar"))
        return;

    Render.FilledRect(radarpos[0], radarpos[1], width, height, [9, 9, 9, 255]);
    Render.FilledRect(radarpos[0], radarpos[1] + 20, width, height - 20, [9, 9, 9, 255]);
    Render.FilledRect(radarpos[0], radarpos[1] + 20, width, 1, [74, 123, 239, 255]);
    Render.Line(radarpos[0] + (width / 2), radarpos[1] + (height - 2), radarpos[0] + (width / 2), radarpos[1] + 20, [125, 125, 125, 255]);
    Render.Line(radarpos[0], radarpos[1] + (height / 2) + 5, radarpos[0] + width, radarpos[1] + (height / 2) + 5, [125, 125, 125, 255]);
    Render.String(radarpos[0] + 64, radarpos[1] + 2, 0, "tggp radar", [180, 180, 180, 255]);
    
    var local = Entity.GetLocalPlayer();
    if (!Entity.IsAlive(local)){
        return
    }
    var localangles = Global.GetViewAngles();
    var entities = Entity.GetEntities();
    for (var i = 1; i <= entities.length; i++) {
        var entity = entities[i];
        if (!entity || !Entity.IsValid(entity) || !Entity.IsAlive(entity))
        {continue;}
        if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Radar Enemies Only") && Entity.IsTeammate(entity))
        {continue;}
        var entity_position = Entity.GetRenderOrigin(entity);
        var local_position = Entity.GetRenderOrigin(local);
        var angle = deg2Rad(localangles[1]);
        var radar_x = local_position[0] - entity_position[0];
        var radar_y = local_position[1] - entity_position[1];
        var rotate_x = radar_y * Math.cos(angle) - radar_x * Math.sin(angle);
        var rotate_y = radar_x * Math.cos(angle) + radar_y * Math.sin(angle);
        var final_x = (radarpos[0] + (width / 2)) + rotate_x / 10;
        var final_y = (radarpos[1] + 5 + (height / 2)) + rotate_y / 10;

        if (final_x < radarpos[0]) {
            final_x = radarpos[0];
        }
        if (final_x > (radarpos[0] + width)) {
            final_x = radarpos[0] + width - 3;
        }
        if (final_y < (radarpos[1] + 20)) {
            final_y = radarpos[1] + 22;
        }
        if (final_y > (radarpos[1] + height)) {
            final_y = radarpos[1] + height - 2;
        }
        
        Render.FilledRect(final_x, final_y, 3, 3, [200, 200, 200, 255]);
        
    }
}
Global.RegisterCallback("Draw", "onDrawEvent");
UI.AddCheckbox("Radar");
UI.AddCheckbox("Radar Enemies Only");