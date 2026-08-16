/*
Draw Lagcomp Skeleton
script for onetap by Eugen1763 -> https://onetap.su/members/eugen1763.8474/
*/


var hitlist = [[], [], []]; // array to store hits
function drawSkel(hitboxPos, color) { // function to draw skeleton, hitboxPos = array with hitbox positions, color = color of skeleton
    var skelMesh = [
        [0, 1],
        [1, 6],
        [6, 5],
        [5, 4],
        [4, 3],
        [3, 2],
        [2, 7],
        [2, 8],
        [8, 10],
        [10, 12],
        [7, 9],
        [9, 11],
        [6, 15],
        [15, 16],
        [16, 13],
        [6, 17],
        [17, 18],
        [18, 14]
    ]; // mesh for the skeleton, basically what hitbox positions should be connected with a line
    for (var i = 0; i < skelMesh.length; i++) { // loop through the mesh
        var p1 = Render.WorldToScreen(hitboxPos[skelMesh[i][0]]); // w2s p1
        var p2 = Render.WorldToScreen(hitboxPos[skelMesh[i][1]]); // w2s p2
        Render.Line(p1[0], p1[1], p2[0], p2[1], color); // render line
    }
} function h() { // gets called when a player gets hurt
    var attackerplayer = Entity.GetEntityFromUserID(Event.GetString("attacker")) // getting the attacker from the event
    var localplayer = Entity.GetLocalPlayer(); // getting the local player
    if (attackerplayer == localplayer) { // checking if we are the attacker
        var victimplayer = Entity.GetEntityFromUserID(Event.GetString("userid")) // getting the victim we hit
        var color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Color Hit"); // getting the color fot hit
        if (Event.GetInt("health") < 1) { // check if the player we hit is dead
            color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Color Kill"); // if yes we change color to color for kill
        }
        var hitboxPos = []; // initializing empty array to fetch hitbox positions
        for (var i = 0; i < 19; i++) { // loop for all hitbox positions
            var p = Entity.GetHitboxPosition(victimplayer, i);
            hitboxPos.push(p); // push the received array into the hitbox position array
        }
        hitlist[0].push(Global.Curtime() + UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Draw Time"));
        hitlist[1].push(hitboxPos);
        hitlist[2].push(color);
        // then we push everything into the hitlist
    }
} function d() { // gets called on draw
    if (hitlist[0].length == 0 || !UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Draw Lagcomp")) return; // check if checkbox is enabled and that the hitlist has entries
    for (var i = 0; i < hitlist[0].length; i++) { // loop through the hitlist
        if (Global.Curtime() < hitlist[0][i]) { // check if item should be rendered
            drawSkel(hitlist[1][i], hitlist[2][i]); // if yes render
        } else { // else remove item from the list
            hitlist[0].splice(i, 1);
            hitlist[1].splice(i, 1);
            hitlist[2].splice(i, 1);
        }
    }
} function s() { // setup function
    // add ui elements
    UI.AddCheckbox("Draw Lagcomp");
    UI.AddSliderFloat("Draw Time", .1, 10);
    UI.AddColorPicker("Color Hit");
    UI.AddColorPicker("Color Kill");
    // register callbacks
    Cheat.RegisterCallback("Draw", "d");
    Cheat.RegisterCallback("player_hurt", "h");
} s(); // call setup function