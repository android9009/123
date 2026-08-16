var enabled = UI.AddCheckbox("Auto choose team");
var dropdown = UI.AddDropdown("Team", ["Counter-Terrorists","Terrorists","Spectators"]);
var teams = [
    ["jointeam 3 1"],
    ["jointeam 2 1"],
    ["jointeam 1 1"],
]
function jointeam() {
    if (!UI.GetValue.apply(this, enabled)) return;
    var selected = UI.GetValue.apply(this, dropdown);
    Cheat.ExecuteCommand(teams[selected].toString());
}
function on_player_connect_full(){
    var localplayer = Entity.GetLocalPlayer();
    var userid = Event.GetInt("userid");
    if (Entity.GetEntityFromUserID(userid) == localplayer) jointeam();       
}
Cheat.RegisterCallback("player_connect_full", "on_player_connect_full");
Cheat.RegisterCallback("cs_match_end_restart", "jointeam");