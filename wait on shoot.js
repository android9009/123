UI.AddCheckbox( "Wait for on shot" );
UI.AddCheckbox( "Wait for on shot" );
UI.AddCheckbox( "Wait for on shot indicator" );
UI.AddHotkey( "Wait for on shot key" );
var last_shot_time = []
function on_draw()
{
  if(!UI.GetValue("Misc", "Wait for on shot") || !UI.IsHotkeyActive("Misc","Wait for on shot key") || !UI.GetValue("Misc","Wait for on shot indicator" )) return;

  var font = Render.AddFont("Verdana Bold",18,800);
  Render.StringCustom(55,600,1,"ONSHOT",[0,255,0,255],font);
}
function on_create_move()
{
  if(!UI.GetValue("Misc", "Wait for on shot") || !UI.IsHotkeyActive("Misc","Wait for on shot key")) return;

  var local = Entity.GetLocalPlayer( );
  if(!Entity.IsAlive(local)) return;
  var enemies = Entity.GetEnemies();

  for(var i = 0; i < enemies.length;i++)
  {
    var enemy = enemies[i];
    var dif = Globals.Tickcount() - last_shot_time[enemy]
    var has_shot = dif >= 0 && dif <= 12;
    if(!has_shot)
      Ragebot.IgnoreTarget(enemy)
  }

}
function on_weapon_fire()
{
  var shooter = Entity.GetEntityFromUserID(Event.GetInt("userid"));
  last_shot_time[shooter] = Globals.Tickcount();
}

function on_player_connect()
{
  var entity = Entity.GetEntityFromUserID(Event.GetInt("userid"));
  if(entity == Entity.GetLocalPlayer())
    last_shot_time = []
}


Cheat.RegisterCallback("weapon_fire", "on_weapon_fire")
Cheat.RegisterCallback("player_connect_full", "on_player_connect")
Cheat.RegisterCallback("CreateMove","on_create_move")
Cheat.RegisterCallback("Draw","on_draw")