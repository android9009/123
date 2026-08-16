UI.AddCheckbox("Positional hitmarker");
UI.AddCheckbox("Pulse effect");
UI.AddDropdown("Hitmarker type", [ "X", "Cross", "Triangle", "Bolt"] );
UI.AddSliderInt("Hitmarker width", 1, 10);
UI.AddColorPicker("Hitmarker color");
UI.SetValue("Hitmarker width", 3);

var damageVector = [ ];
function Damage(headshot, vec3, time) {
    this.headshot = headshot;
    this.vec3 = vec3;
    this.time = time;
    damageVector.push(this);
}
function playerHurt() {
    var victim = Entity.GetEntityFromUserID( Event.GetInt("userid" ) );
    var attacker = Entity.GetEntityFromUserID( Event.GetInt("attacker") );
    if ( !Entity.IsLocalPlayer(attacker) )
        return;
    var attackBone = Event.GetInt("hitgroup");
    var pos = Entity.GetHitboxPosition( victim, attackBone );
    new Damage( Event.GetInt("hitgroup"), pos, Globals.Realtime() )
}
function drawMarker() {
    for ( var i in damageVector ) {
        if (Globals.Realtime() - damageVector[i].time > 1) {
            damageVector.splice(i, 1);
            i--;
            continue;
        }
        var animTime = Globals.Realtime() - damageVector[i].time;
        var finalTime = (animTime * 255) * -1;
        var hWidth = UI.GetValue("Hitmarker width");
        var crossSize = hWidth
        if (UI.GetValue("Pulse effect")) {
            var crossSize = animTime * hWidth;
        }
        colVal = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Hitmarker color");
        r = colVal[0];
        g = colVal[1];
        b = colVal[2];
        var worldToScreen = Render.WorldToScreen(damageVector[i].vec3);
        if ( worldToScreen[0] != undefined || worldToScreen[1] != undefined ) {
            if ( damageVector[i].headshot ) {
                if (UI.GetValue("Hitmarker type") == 0){
                    Render.Line(worldToScreen[0] - crossSize, worldToScreen[1] - crossSize, worldToScreen[0] + crossSize, worldToScreen[1] + crossSize, [ r, g, b, finalTime ] );
                    Render.Line(worldToScreen[0] - crossSize, worldToScreen[1] + crossSize, worldToScreen[0] + crossSize, worldToScreen[1] - crossSize, [ r, g, b, finalTime ] );  
                }
                if (UI.GetValue("Hitmarker type") == 1){
                    Render.Line(worldToScreen[0] - crossSize, worldToScreen[1], worldToScreen[0] + crossSize, worldToScreen[1], [ r, g, b, finalTime ] );
                    Render.Line(worldToScreen[0], worldToScreen[1] - crossSize, worldToScreen[0], worldToScreen[1] + crossSize, [ r, g, b, finalTime ] );
                }
                if (UI.GetValue("Hitmarker type") == 2){
                    Render.Line(worldToScreen[0], worldToScreen[1] - crossSize, worldToScreen[0] + crossSize, worldToScreen[1], [ r, g, b, finalTime ] );
                    Render.Line(worldToScreen[0] + crossSize, worldToScreen[1], worldToScreen[0] - crossSize, worldToScreen[1], [ r, g, b, finalTime ] );
                    Render.Line(worldToScreen[0] - crossSize, worldToScreen[1], worldToScreen[0], worldToScreen[1] - crossSize, [ r, g, b, finalTime ] );
                }
                if (UI.GetValue("Hitmarker type") == 3){
                    Render.Line(worldToScreen[0], worldToScreen[1] - crossSize, worldToScreen[0] + crossSize, worldToScreen[1], [ r, g, b, finalTime ] );
                    Render.Line(worldToScreen[0] + crossSize, worldToScreen[1], worldToScreen[0] - crossSize, worldToScreen[1], [ r, g, b, finalTime ] );
                    Render.Line(worldToScreen[0] - crossSize, worldToScreen[1], worldToScreen[0], worldToScreen[1] + crossSize, [ r, g, b, finalTime ] );
                }
            }
        }
    }
}
Cheat.RegisterCallback("player_hurt", "playerHurt");
Cheat.RegisterCallback("Draw", "drawMarker");