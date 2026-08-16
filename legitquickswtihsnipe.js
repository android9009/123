UI.AddCheckbox("Sniper Flip")
var flip = false
function on_weapon_fire()
{
    me = Entity.GetLocalPlayer();
    short = Event.GetInt("userid")
    short_index = Entity.GetEntityFromUserID(short);
    localplayer_weapon = Entity.GetWeapon(me);
    weapon_name = Entity.GetName(localplayer_weapon);
    if (UI.GetValue("Sniper Flip") == true) {
        if(short_index == me){
            if(weapon_name == "ssg 08"){
                Global.ExecuteCommand( "slot3");
                flip = true
            }
            if(weapon_name == "awp"){
                Global.ExecuteCommand( "slot3");
                flip = true
            }
        }
 
    }
}
Global.RegisterCallback("weapon_fire","on_weapon_fire");
function reset_tick()
{
    if (flip == true)
    {
        Global.ExecuteCommand( "slot1");
        flip = false
    }
}
Global.RegisterCallback("CreateMove","reset_tick");