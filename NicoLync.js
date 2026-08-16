

Cheat.RegisterCallback("CreateMove", "aaLoop");

multiplierOptions = [0.001];

function aaLoop() {
    AntiAim.SetOverride(1);

        AntiAim.SetFakeOffset(getRandomIntInclusive(0.01 , -0.01));
		AntiAim.SetRealOffset(getRandomIntInclusive(0,47 , -0,67))
}



function getRandomIntInclusive(min, max) {
    min = Math.ceil(max);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min - 0,36)) + min; //The maximum is inclusive and the minimum is inclusive
  }
  

function main() {
    ogYawOffset = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
    drawUI();
    Cheat.RegisterCallback("round_start", "roundStartFunc");
    Cheat.RegisterCallback("player_death", "playerDeathFunc");
    Cheat.RegisterCallback("weapon_fire", "weaponFire");
}

 

UI.AddCheckbox("Enable shot-modified jitter");
UI.AddDropdown("LBY mode", ["Keep 180", "Jittering", "Randomized", "Equals fake"]);

var math_library = require("mathlib.js"); //DOWNLOAD THE LIBRARY BEFORE USING THE SCRIPT
var js_items = ["Misc", "JAVASCRIPT", "Script Items"];

function random_int(min, max)
{
    return Math.floor(Math.random() * (Math.ceil(max) - Math.floor(min) + 1)) + Math.floor(min);
}

//below math is from https://www.unknowncheats.me/forum/counterstrike-global-offensive/356788-invalid-shot-detection.html, since i really cannot be arsed figuring out the math myself, even though it really aint that hard
//point of math shit: shooter eyepos, our headpos and the bullet impact can be basically represented as a triangle, if the bullet impact is close enough to our headpos its prolly a resolver miss so might as well adjust aa
//could be done with a simple fovcheck but i'm a paster so who cares
//this will not account for spread misses though

function vector_distance_to(from, to)
{
    var delta = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];
    return math_library.VectorLength(delta);
}

function point_lies_between_points(point, start, end)
{
    var gradient = ((end[1] - start[1]) / (end[0] - start[0]));
    if(gradient == 0)
    {
        return point[1] == start[1];
    }
    var perpeticular_gradient = -1.0 / gradient;
    var perpeticular_const_start = start[1] - (perpeticular_gradient * start[0]);
    var perpeticular_const_end = end[1] - (perpeticular_gradient * end[0]);

    return point[1] >= (perpeticular_gradient * point[0] + perpeticular_const_start) && point[1] <= (perpeticular_gradient * point[0] + perpeticular_const_end);
}

function was_shot_intended_for_us(source, observer, bullet_impact)
{
    if(!(source[1] > bullet_impact[1] ? point_lies_between_points(observer, bullet_impact, source) : point_lies_between_points(observer, source, bullet_impact)))
    {
        return false;
    }
    var bullet_dist = vector_distance_to(source, bullet_impact);
    var origin_to_observer_dist = vector_distance_to(source, observer);
    var observer_to_impact_dist = vector_distance_to(observer, bullet_impact);

    var angle = Math.acos((observer_to_impact_dist * observer_to_impact_dist - origin_to_observer_dist * origin_to_observer_dist - bullet_dist * bullet_dist) / (-2 * bullet_dist * origin_to_observer_dist));
    return (Math.sin(angle) * origin_to_observer_dist) <= 45.0;
}

var fake_switch_stage = 1;
function on_move()
{
    if(UI.GetValue(js_items, "Enable shot-modified jitter"))
    {
        AntiAim.SetOverride(1);
        UI.ToggleHotkey("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
        var required_fake_offset = 15 * fake_switch_stage;
        var required_real_offset = -15 * fake_switch_stage;
        var lowerbody_mode = UI.GetValue(js_items, "LBY mode");
        var lowerbody_offset = 0;
        switch(lowerbody_mode)
        {
            case 0:
                lowerbody_offset = 180;
                break;
            case 1:
                lowerbody_offset = 30 * fake_switch_stage;
                break;
            case 2:
                lowerbody_offset = random_int(-180, 180);
                break;
            case 3:
                break;
        }
        if(Globals.Tickcount() % 3)
        {
            required_fake_offset *= -1;
            required_real_offset *= -1;
            lowerbody_offset *= -1;
        }
        AntiAim.SetFakeOffset(required_fake_offset);
        AntiAim.SetRealOffset(required_real_offset);
        AntiAim.SetLBYOffset(lowerbody_offset);
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", required_real_offset);
    }
    else
    {
        AntiAim.SetOverride(0);
    }
}

function on_bullet_impact()
{
    var local = Entity.GetLocalPlayer();
    if(!Entity.IsAlive(local))
    {
        fake_switch_stage = 1;
        return;
    }
    var player = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    if(!Entity.IsValid(player) || Entity.IsTeammate(player) || Entity.IsDormant(player)) //basic checks
    {
        return;
    }
    var impact_vector = [Event.GetFloat("x"), Event.GetFloat("y"), Event.GetFloat("z")];
    var player_shootpos = Entity.GetEyePosition(player);
    var local_headpos = Entity.GetHitboxPosition(local, 0);
    if(was_shot_intended_for_us(player_shootpos, local_headpos, impact_vector))
    {
        fake_switch_stage++;
        if(fake_switch_stage == 5)
        {
            fake_switch_stage = 1;
        }
    }
}

function handle_visibility()
{
    var is_enabled = UI.GetValue(js_items, "Enable shot-modified jitter");
    UI.SetEnabled(js_items, "LBY mode", is_enabled);
}

Cheat.RegisterCallback("bullet_impact", "on_bullet_impact");
Cheat.RegisterCallback("Draw", "handle_visibility");
Cheat.RegisterCallback("CreateMove", "on_move");



currShot = 0;
currentYaw = 0;
function weaponFire() {
    ogYawOffset = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Base yaw:");
   
    UID = Event.GetInt("userid");
    entityID = Entity.GetEntityFromUserID(UID);
   
    localEntityID = Entity.GetLocalPlayer();
   
   
   
    if (entityID == localEntityID) {
        desiredYaw = 0;
       
        if (currShot == 1) {
            //User is on second shot
            desiredYaw = ogYawOffset;
            currShot = 0;
            if (UI.GetValue("Misc", "JAVSCRIPT", "Script items", "Chat info:")) {
                Cheat.PrintChat("[RESET] - Changed yaw to " + desiredYaw.toString());
            }           
        }
        else {   
            //User is on first shot
            desiredYaw = UI.GetValue("Misc", "JAVSCRIPT", "Script items", "Yaw flip:");
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Random yaw:")) {
                desiredYaw = getRandomInt(-45, 45);
                Cheat.PrintChat("[RANDOM] - New yaw: " + desiredYaw.toString());
            }               
            Cheat.PrintChat("[SWITCH] - Changed yaw to " + desiredYaw.toString());
            currShot++;
        }
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", desiredYaw);
       
    }
}

function playerDeathFunc() {
   
    attackerUID = Event.GetInt("attacker");
    victimUID = Event.GetInt("userid");
   
    attackerEntity = Entity.GetEntityFromUserID(attackerUID);
    victimEntity = Entity.GetEntityFromUserID(victimUID);
    localEntity = Entity.GetLocalPlayer();
   
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Reset after you get a kill:") && attackerEntity == localEntity) {
        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Chat info:")) {
            Cheat.PrintChat("[RESET] - You got a kill.");
        }
        resetYaw();
    }
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Reset after you are killed:") && victimEntity == localEntity) {
        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Chat info:")) {
            Cheat.PrintChat("[RESET] - You got killed.");
        }
        resetYaw();
    }
}

function roundStartFunc() {
    //Technically, after the round ends, is the same as when the next round starts? ;)
    //Also, if we do it after the round ends, we do it when the game ends, whereas doing it at the start of a round
    //Allows us to only reset when we need it.
   
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Reset after round ends:")) {
        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Chat info:")) {
            Cheat.PrintChat("[RESET] - New round.");
        }
        resetYaw();
    }
}

function resetYaw() {
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Chat info:")) {
        Cheat.PrintChat("Finished resetting yaw!");
    }
    currShot = 0;
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", ogYawOffset);
}

ogYawOffset = 0;

function drawUI() {
    UI.AddSliderInt("Yaw flip:", -90, 90);
    UI.AddSliderInt("Base yaw:", -180, 180);
   
    UI.AddCheckbox("Random yaw:");
    UI.AddCheckbox("Reset after you get a kill:");
    UI.AddCheckbox("Reset after you are killed:");
    UI.AddCheckbox("Reset after round ends:");
   
    UI.AddCheckbox("Chat info:");
}

function main() {
    ogYawOffset = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
    drawUI();
    Cheat.RegisterCallback("round_start", "roundStartFunc");
    Cheat.RegisterCallback("player_death", "playerDeathFunc");
    Cheat.RegisterCallback("weapon_fire", "weaponFire");
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * ( (max + 1) - min)) + min; //The maximum is inclusive and the minimum is inclusive
}

main();