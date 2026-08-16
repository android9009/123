function main() {
    Cheat.RegisterCallback("Draw", "peekSuiteLoopFunc");
    Cheat.RegisterCallback("Draw", "peekSuiteDrawFunc");
    Cheat.RegisterCallback("CreateMove", "crouchPeekFunc");

    UI.AddSliderInt("Min-DMG for peek", 0, 200);
    UI.AddCheckbox("Jitter pitch on peek");
    UI.AddCheckbox("Indicator on peek");
    UI.AddCheckbox("Yaw on peek");
    UI.AddCheckbox("Crouch on peek");
    UI.AddCheckbox("PitchSuite");
}
main();
function crouchPeekFunc() {
    if (peeking && getVal("Crouch on peek")) {
        UserCMD.ForceCrouch();
    }
}
function peekSuiteDrawFunc() {
    try {
        
        for (var i = 0; i < circlesToDraw.length; i++) {
            currentCircle = circlesToDraw[i];
            
            Render.Circle(currentCircle[0], currentCircle[1], 7, [255, 255, 255, 255]);
        }
        
        if (peeking) {
            
        }
        
    }
    catch (err) {}
}
circlesToDraw = [];
peeking = false;
function peekSuiteLoopFunc() {
    
    if (!getVal("PitchSuite")) {
        AntiAim.SetOverride(0);
        return;
    }
    
    peeking = false;
    
    localEnt = Entity.GetLocalPlayer();
    localHeadPos = Entity.GetHitboxPosition(localEnt, 0);
    localuChestPos = Entity.GetHitboxPosition(localEnt, 6);
    
    mDmg = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Min-DMG for peek");
    
    locsToDraw = [];
    
    enemies = Entity.GetEnemies();
    for ( i = 0; i < enemies.length; i++)
    {
        try {
    
        if (Entity.IsValid(enemies[i])&& !Entity.IsDormant(enemies[i]))
        {
            headHitbox = Entity.GetHitboxPosition(enemies[i], 0);
            headBulletTrace = Trace.Bullet(localEnt, localHeadPos, headHitbox);
            
            headBulletPotentialDMG = headBulletTrace[1];            
            
            uChestHitbox = Entity.GetHitboxPosition(enemies[i], 6);
            uChestBulletTrace = Trace.Bullet(localEnt, localuChestPos, uChestHitbox);
            
            uChestPotentialDMG = uChestBulletTrace[1];
            
            
            
            if (uChestPotentialDMG >= mDmg || headBulletPotentialDMG >= mDmg) {
                
                localHeadScreenPos = Render.WorldToScreen(localHeadPos);
                enemyHeadScreenPos = Render.WorldToScreen(headHitbox);
                
                if (localHeadScreenPos[2] && enemyHeadScreenPos[2]) {
                    locsToDraw.push([enemyHeadScreenPos[0], enemyHeadScreenPos[1]]);
                }
                
                peeking = true;
            }
        }
        } catch (excp) {
            
        }
       
    }
    circlesToDraw = locsToDraw;
    
    screenSize = Render.GetScreenSize();
    
    
    if (peeking) {
        if (getVal("Jitter pitch on peek")) {
            setPitch([1, 4, 2][getRandomInt(0, 2)]);
        }
        if (getVal("Yaw on peek")) {
            AntiAim.SetOverride(1);
            
            AntiAim.SetRealOffset(getRandomInt(-180, 180));
            AntiAim.SetFakeOffset(getRandomInt(-180, 180));
        }
        
        if (getVal("Indicator on peek")) {
            Render.String(  -1, -1, 0, "PEEKING", [19, 19, 19, 255]);
            Render.String(  0, 0, 0, "PEEKING", [111, 242, 109, 255]);
        }
        
    }
        
    else if (!peeking && getVal("Indicator on peek")) {
        Render.String(  -1, -1, 0, "NOT PEEKING", [19, 19, 19, 255]);
        Render.String(  0, 0, 0, "NOT PEEKING", [209, 32, 32, 255]);
    }
}
function setPitch(pitchIndex) {
    UI.SetValue("Misc", "PERFORMACE & INFORMATION", "Information", "Restrictions", 0);
    UI.SetValue("Anti-Aim", "Extra", "Pitch", pitchIndex);  
}
function getVal(valueName) {
    return UI.GetValue("Misc", "JAVASCRIPT", "Script items", valueName);
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}