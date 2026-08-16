function extrapolate(ent , ticks,x,y,z)
{
  var velocity = Entity.GetProp( ent, "CBasePlayer", "m_vecVelocity[0]" );

  var new_pos = [x,y,z];
  new_pos[0] = new_pos[0] + velocity[0] * ticks * Globals.TickInterval();
  new_pos[1] = new_pos[1] + velocity[1] * ticks * Globals.TickInterval();
  new_pos[2] = new_pos[2] + velocity[2] * ticks * Globals.TickInterval();
    return new_pos;
}

function get_proper_eye()
{
  var local = Entity.GetLocalPlayer()
  var duck_amount = Entity.GetProp( local, "CBasePlayer", "m_flDuckAmount" )
  var origin = Entity.GetRenderOrigin(local)
  if(UI.IsHotkeyActive("Anti-Aim","Extra","Fake duck"))
     return [origin[0],origin[1],origin[2] + 46 + 18];
  else
   return Entity.GetEyePosition(local)
}
var delay = 0
function auto_scope()
{
  if(!UI.GetValue("Misc","Predictive autoscope")) return;
  var enemies = Entity.GetEnemies();
  var local = Entity.GetLocalPlayer( );
  if(!Entity.IsAlive(local)) return;
  var eye_pos = get_proper_eye();
  var local_pos = extrapolate(local,15,eye_pos[0],eye_pos[1],eye_pos[2])
  var auto_scope = false;
  for(var i = 0; i < enemies.length;i++)
  {
    var enemy = enemies[i];
    if (!Entity.IsAlive(enemy) || Entity.IsDormant(enemy) || !Entity.IsValid(enemy)) continue;
    var pos = Entity.GetHitboxPosition( enemy, 2 )

    var result = Trace.Bullet(local, enemy , local_pos , pos);
    if(result[1] > 1) // aka damage
    {
      auto_scope = true;
      break;
    }
  }
  var buttons = UserCMD.GetButtons();
  var is_scoped = Entity.GetProp(Entity.GetLocalPlayer(), "CCSPlayer", "m_bIsScoped");
  if(!is_scoped && auto_scope)
        UserCMD.SetButtons(buttons | (1 << 19));

}
UI.AddCheckbox( "Predictive autoscope" );
Cheat.RegisterCallback("CreateMove", "auto_scope");