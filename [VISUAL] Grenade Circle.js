

function heDetonateFunc() {
    //Get location
    worldLocation = [Event.GetInt("x"), Event.GetInt("y"), Event.GetInt("z")];
    grenadePositions.push(worldLocation);
    grenadeData.push([2, 255]);
}

grenadePositions = [];

//radius, alpha
grenadeData = [];

function drawFunc() {
    fadeOutSpeed = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Fade-out speed:");
    sizeSpeed = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Size speed:");
    circleColour = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Circle color:");
    for (var i = 0; i < grenadePositions.length; i++) {
      
        //Get grenade position and convert to screen location(s)
        wordLoc = grenadePositions[i];     
        screenLoc = Render.WorldToScreen(wordLoc);
      
        currentGrenadeData = grenadeData[i];
      
        currentGrenadeData[0] += sizeSpeed;
        currentGrenadeData[1] -= fadeOutSpeed;
      
        //Append that data grenade data
        grenadeData[i] = currentGrenadeData;
      
        if (currentGrenadeData[1] < 1) {
            grenadeData.shift(i, 1);
            grenadePositions.shift(i, 1);
        }
      
        //X, Y, VISIBLE
        if (screenLoc[2] == 0) {
            return;
        }
      
        //Render the location.
        Render.Circle(screenLoc[0], screenLoc[1], currentGrenadeData[0], [circleColour[0], circleColour[1], circleColour[2], currentGrenadeData[1]]);
    }
}

function main() {
    UI.AddSliderFloat("Fade-out speed:", 0, 30);
    UI.AddSliderFloat("Size speed:", 0, 3);
    UI.AddColorPicker("Circle color:");
  
    Cheat.RegisterCallback("hegrenade_detonate", "heDetonateFunc");
    Cheat.RegisterCallback("Draw", "drawFunc");
}

main();

