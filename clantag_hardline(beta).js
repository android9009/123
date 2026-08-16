UI.AddLabel("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
UI.AddLabel("You have enabled dhdj's script")
UI.AddCheckbox("Enable dhdj's Anti-Aim");
UI.AddCheckbox("Enable dhdj's Peek");
UI.AddCheckbox("Enable dhdj's Clantag");
UI.AddCheckbox("Enable dhdj's Randomness");
UI.AddCheckbox("Enable dhdj's Reply Bot");
UI.AddCheckbox("Enable Logging");
UI.AddHotkey("Mindmg")
UI.AddHotkey("Inverter")
UI.AddLabel("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
UI.SetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions", 0)
UI.SetValue("Anti-Aim", "Fake angles", "Hide real angle", true)
UI.SetValue("Anti-Aim", "Extra", "Pitch", 1)
var angle = 0
var pos = 1
var count = 0
var dir=0
var ragebot_fired = 0
var direction = [0, 0, 0]
var hitbox_pos = [0,0,0]
var previous_target = 1
var accuracy=100
var clantag = ["**********","[********]","{H*******}","\H******E/","H*R****E","H*RD***E","HARD***E","HARD*INE","HARDLINE","HARDLIN*","*ARDLIN*","**RDLIN*","**RDL*N*","**R*L*N*","****L*N*","****L***","***L****","**L*****","*L******","L*******","Lucer***","𝓶*******","𝓶*𝓻*****","𝓶𝓪𝓻*****","𝓶𝓪𝓻*𝓫***","𝓶𝓪𝓻𝓪𝓫***","𝓶𝓪𝓻𝓪𝓫𝓸**","𝓶𝓪𝓻𝓪𝓫𝓸𝓸*","m*******","ma******","mal*****","ma*t****","malt****","malti***","maltiz**","maltiz*r","maltizer","altizer*","ltizer**","tizer***","izer****","zer*****","er******","r*******","********","***3***","**2**","*1*","****","******","********"]
var left=false
var screen_size = Global.GetScreenSize()

function onCreateMove() {
    target = Ragebot.GetTarget()
    count++
    //check if an update is needed every 20 ticks
    if (count > 20) {
        //reset the counter
        count = 0
        //set the clantag according to time. A new clantag is applied every 500 ms
        if(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable dhdj's Clantag")){
        Local.SetClanTag(clantag[Math.round(new Date()
            .getTime() / 500) % clantag.length]);
        }
    }
    //I have no idea why I named this variable "angle"
    angle++
    //basically, for 1/2 of the time the fake angle is on the right and for the other half the fake angle is on the left.
    if (ragebot_fired > 0) {
        ragebot_fired--;
        UserCMD.Choke()
        //AntiAim.SetFakeOffset(Math.ceil((Math.random() - 0.5) * 360));
        //AntiAim.SetRealOffset(Math.ceil((Math.random() - 0.5) * 360));
        AntiAim.SetLBYOffset(Math.ceil((Math.random() - 0.5) * 360));
        if(Input.IsKeyPressed(0x46) && (Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer())) == "ssg 08" || Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer())) == "awp")){
            //UserCMD.Choke()
            //UserCMD.SetMovement( [ -1*direction[0], -1*direction[1], 0 ] );
        }
    } else{
        if(Input.IsKeyPressed(0x46)){
            direction=UserCMD.GetMovement();
        }
    }
    //reset the angle to 0 every 6 ticks and apply random fakelag & jitter
    if (angle == 6) {
        if(UI.IsHotkeyActive( "Rage", "GENERAL",     "General","Resolver override")) UI.ToggleHotkey("Rage", "GENERAL",     "General","Resolver override")
        //UI.ToggleHotkey("Rage", "GENERAL", "General","Resolver override")
        //Cheat.PrintChat(UI.IsHotkeyActive( "Rage", "GENERAL", "General","Resolver override" )+"\n")
        if(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable dhdj's Randomness")){
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", Math.ceil((Math.random() - 0.5) * 20));
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", Math.ceil((Math.random() - 0.5) * 30));
        }
        if(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable dhdj's Anti-Aim")){
            AntiAim.SetOverride(1)
            UI.SetValue("Anti-Aim", "Extra", "Pitch", 1)
            //if(GetVelocity(Entity.GetLocalPlayer())>50 && ragebot_fired<1){
            //AntiAim.SetRealOffset(0)
            //AntiAim.SetFakeOffset(Math.ceil((Math.random() - 0.5) * 40))
            //AntiAim.SetLBYOffset(Math.ceil((Math.random() - 0.5) * 40))
            //}else{
            if(UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Inverter")){
            AntiAim.SetRealOffset(-30)
            AntiAim.SetFakeOffset(30)
            AntiAim.SetLBYOffset(40+Math.ceil((Math.random() - 0.5) * 80))
            }else{
            AntiAim.SetRealOffset(30)
            AntiAim.SetFakeOffset(-30)
            AntiAim.SetLBYOffset(-40-Math.ceil((Math.random() - 0.5) * 80))
            }
            //}
        }else{
            AntiAim.SetOverride(0)
        }
        angle = 0;
    }


    //check if the target is slow-walking
    if (GetVelocity(target) <= 90 && GetVelocity(target) >= 20) {
        PrintChat("[dhdj]: "+"Slow-Walking Target: " + GetVelocity(target) + "\n");
        
        if(hitbox_pos==Entity.GetHitboxPosition( target, 11 )){
            RageBot.IgnoreTarget(target)
        }else{
            UserCMD.Choke()
        hitbox_pos = Entity.GetHitboxPosition( target, 11 );
        //I dunno what this does but it works
        Ragebot.ForceHitboxSafety(0)
        Ragebot.ForceTargetSafety(target)
        //if using a scout, set the hitchance to 99 and mindmg to 80 (avoid misses)
        if (Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer())) == "ssg 08") {
            PrintChat("[dhdj]: "+"Using a scout, setting max hitchance" + "\n");
            if(!UI.IsHotkeyActive( "Rage", "GENERAL",     "General","Resolver override")) UI.ToggleHotkey("Rage", "GENERAL",     "General","Resolver override")
            Ragebot.ForceTargetHitchance(target, 99)
            if (Entity.GetProp(target, "CBasePlayer", "m_iHealth") < 99 && Entity.GetProp(target, "CBasePlayer", "m_iHealth") > 0) {
                Ragebot.ForceTargetMinimumDamage(target, Entity.GetProp(target, "CBasePlayer", "m_iHealth") + 1)
                PrintChat("[dhdj]: "+"Low-Health Slow-Walking Target: " + Entity.GetProp(target, "CBasePlayer", "m_iHealth") + "\n");
            } else {
                Ragebot.ForceTargetMinimumDamage(target, 99)
            }
        }
        }
    }
    //PrintChat("[dhdj]: "+typeof(target)+ "\n");
    if(previous_target!=target && target!=0){
        previous_target=target;
        accuracy=100;
        PrintChat("[dhdj]: "+"Aimbot Target Changed" + "\n");
    }else if(ragebot_fired==0 && target!=0){
        if(accuracy>60){
            PrintChat("[dhdj]: "+"Lowering hitchance due to not firing" + "\n");
            //accuracy-=4
        }
        Ragebot.ForceTargetHitchance(target, accuracy)
    }
    
    if((Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer())) == "ssg 08" || Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer())) == "awp")){
        UI.SetValue("Anti-Aim", "Extra", "Slow walk mode", 0)
    }else{
        UI.SetValue("Anti-Aim", "Extra", "Slow walk mode", 1)
    }
    
    
    if (Math.abs(GetJump(target)) >= 40) {
        Ragebot.ForceTargetHitchance(target, 70)
        PrintChat("[dhdj]: "+"Found Bunnyhopping Target, setting min hitchance" + "\n");
    }
    //if the enemy has low health, decrease the mindmg to hp+1
    if (Entity.GetProp(target, "CBasePlayer", "m_iHealth") < 50 && Entity.GetProp(target, "CBasePlayer", "m_iHealth") > 0) {
        Ragebot.ForceTargetMinimumDamage(target, Entity.GetProp(target, "CBasePlayer", "m_iHealth") + 1)
        UserCMD.Choke()
        PrintChat("[dhdj]: "+"Low-Health Target: " + Entity.GetProp(target, "CBasePlayer", "m_iHealth") + "\n");
    }
    if(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable dhdj's Randomness")){
        if(Math.random()<0.6){
            UserCMD.Choke()
            //Cheat.PrintChat(Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer())))
        }
    }
    if (Input.IsKeyPressed(0x46) && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable dhdj's Peek")) { //0x10
        if(GetVelocity(Entity.GetLocalPlayer())>20){
            angle=5
            dir=0
            UserCMD.Choke()
        }else{
            if(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable dhdj's Anti-Aim")){
                if(UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Inverter")){
                    if(dir==0){
                        dir=-120
                    }else if(dir>-180){
                        dir-=10
                    }
                    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", dir);
                AntiAim.SetFakeOffset(0);
                AntiAim.SetRealOffset(-50-Math.ceil((Math.random() - 0.5) * 20));
                AntiAim.SetLBYOffset(60+Math.ceil((Math.random() - 0.5) * 60));
                }else{
                    if(dir==0){
                        dir=120
                    }else if(dir<180){
                        dir+=10
                    }
                    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", dir);
                AntiAim.SetRealOffset(50+Math.ceil((Math.random() - 0.5) * 20))
                AntiAim.SetFakeOffset(0)
                AntiAim.SetLBYOffset(-60-Math.ceil((Math.random() - 0.5) * 60))
                }
                //UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
                UI.SetValue("Anti-Aim", "Extra", "Pitch", 0)
            }
            UserCMD.Send()
        }
    }else{
        dir=0
    }
    if(UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Inverter")){
        left=false
    }else{
        left=true
    }
    if(UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Mindmg")){
        if(Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer())) == "ssg 08" || Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer())) == "awp" || Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer())) == "r8"){
            Ragebot.ForceTargetMinimumDamage(target, 20)
        }else{
            Ragebot.ForceTargetMinimumDamage(target, 1)
        }
    }
    //localplayer_eyepos = Entity.GetRenderOrigin( Entity.GetLocalPlayer( ) );
    //Cheat.PrintChat("Local player eye pos X: " + localplayer_eyepos[0] + " Y: " + localplayer_eyepos[1] + " Z: " + localplayer_eyepos[2] + " \n")
    //Cheat.PrintChat(GetVelocity(Entity.GetLocalPlayer())+"\n")
}

function drawIndicator(){
    if(left){
        Render.String(screen_size[0] /2 -50, screen_size[1] /2 -20, 1,  "<", [ 255, 0, 0, 255 ], 4 );
    }else{
        Render.String(screen_size[0] /2 +50, screen_size[1] /2 -20, 1,  ">", [ 255, 0, 0, 255 ], 4 );
    }
    //Render.String(screen_size[0] /2 , screen_size[1] /2 -560 , 1,  Local.GetSpread()+"%", [ 255, 0, 0, 255 ], 4 );
    Render.String(screen_size[0] /2 , screen_size[1] /2 -640 , 1,  ((1-Local.GetInaccuracy())*100).toFixed(2)+"%", [ 255, 0, 0, 255 ], 4 );
    if(UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Mindmg")){
        Render.String(screen_size[0] /2 , screen_size[1] /2 -80 , 1,  "Min", [ 255, 0, 0, 255 ], 4 );
    }
}

function GetVelocity(index) {
    var velocity = Entity.GetProp(index, "CBasePlayer", "m_vecVelocity[0]");
    return Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
}

function GetJump(index) {
    return Entity.GetProp(index, "CBasePlayer", "m_vecVelocity[0]")[2];
}


function getHitboxName(index) {
    var hitboxName = "";
    switch (index) {
        case 0:
            hitboxName = "Head";
            break;
        case 1:
            hitboxName = "Neck";
            break;
        case 2:
            hitboxName = "Pelvis";
            break;
        case 3:
            hitboxName = "Body";
            break;
        case 4:
            hitboxName = "Thorax";
            break;
        case 5:
            hitboxName = "Chest";
            break;
        case 6:
            hitboxName = "Upper chest";
            break;
        case 7:
            hitboxName = "Left thigh";
            break;
        case 8:
            hitboxName = "Right thigh";
            break;
        case 9:
            hitboxName = "Left calf";
            break;
        case 10:
            hitboxName = "Right calf";
            break;
        case 11:
            hitboxName = "Left foot";
            break;
        case 12:
            hitboxName = "Right foot";
            break;
        case 13:
            hitboxName = "Left hand";
            break;
        case 14:
            hitboxName = "Right hand";
            break;
        case 15:
            hitboxName = "Left upper arm";
            break;
        case 16:
            hitboxName = "Left forearm";
            break;
        case 17:
            hitboxName = "Right upper arm";
            break;
        case 18:
            hitboxName = "Right forearm";
            break;
        default:
            hitboxName = "Generic";
    }

    return hitboxName;
}

function onRagebotFire() {
    ragebot_fired = 40;
    ragebot_target = Event.GetInt("target_index");
    ragebot_target_hitbox = Event.GetInt("hitbox");
    ragebot_target_hitchance = Event.GetInt("hitchance");
    ragebot_target_safepoint = Event.GetInt("safepoint");
    ragebot_target_exploit = Event.GetInt("exploit");
    targetName = Entity.GetName(ragebot_target);
    PrintChat("[dhdj] TARGET: " + targetName + " HITBOX: " + getHitboxName(ragebot_target_hitbox) + " HC: " + ragebot_target_hitchance + " SAFEPOINT: " + ragebot_target_safepoint + " EXPLOIT: " + ragebot_target_exploit + " \n");

}

function PrintChat(message){
    if(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable Logging")){
        Cheat.PrintChat(message)
    }
}

function onPlayerSay()
{
    if(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable dhdj's Reply Bot")){
        Cheat.ExecuteCommand("say " + Event.GetString("text"))
    }
}
Cheat.RegisterCallback("player_say", "onPlayerSay")
Cheat.RegisterCallback("ragebot_fire", "onRagebotFire");
Cheat.RegisterCallback("CreateMove", "onCreateMove")
Cheat.RegisterCallback("Draw", "drawIndicator")