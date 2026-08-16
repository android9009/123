

//improved script by athena#0162
//onetap.com/members/cardboardpizzza.5658/

UI.AddLabel("<---------------------------------------->"); //just for menu sorting

hitboxes = [
  'generic',
  'head',
  'chest',
  'stomach',
  'left arm',
  'right arm',
  'left leg',
  'right leg',
  'body'
];
function getHitboxName(index) {
  return hitboxes[index] || 'Generic';
}
function chatlogs()
{
   //define
    me = Entity.GetLocalPlayer();
    hitbox = Event.GetInt('hitgroup');
    target_damage = Event.GetInt("dmg_health");
    victim = Event.GetInt('userid');
    attacker = Event.GetInt('attacker');
    victimIndex = Entity.GetEntityFromUserID(victim);
    attackerIndex = Entity.GetEntityFromUserID(attacker);
    name = Entity.GetName(victimIndex);
    spread = Local.GetSpread();
    realtime = Globals.Realtime();
    frametime = Globals.Frametime();
    inaccuracy = Local.GetInaccuracy();
    localplayer_index = Entity.GetLocalPlayer( );
    localplayer_weapon = Entity.GetWeapon(localplayer_index);
    weapon_name = Entity.GetName(localplayer_weapon);

    //prefix box
    prefixa = UI.GetString ( "Misc", "JAVASCRIPT", "Script Items", "Prefix" );

if( UI.GetValue ( "Misc", "JAVASCRIPT", "Script Items", "Power switch" ) ){
if (me == attackerIndex && me != victimIndex) {
if( UI.GetValue ( "Misc", "JAVASCRIPT", "Script Items", "Broadcast" ) ) {
Global.ExecuteCommand("say \x01[\x06" + prefixa + "\x01] \x04" + "\x01hurt \x04" + name + " \x01for \x04" + target_damage + " \x01in \x04" + getHitboxName(hitbox) + "\x01" + " with a " + "\x04" + weapon_name)// + ", " + "Inaccuracy: " + inaccuracy + ", " + "Time: " + realtime + ", FrameTime: " + frametime + " Spread: " + spread)
    }else
      {
    Global.PrintChat("\x01[\x06" + prefixa + "\x01] \x04" + "\x01hurt \x04" + name + " \x01for \x04" + target_damage + " \x01in \x04" + getHitboxName(hitbox) + "\x01" + " with a " + "\x04" + weapon_name)
      }
    }
  }
}

function main()
{
UI.AddTextbox("Prefix"); //prefix textbox
UI.AddCheckbox("Power switch"); // power switch
UI.AddCheckbox("Broadcast");
UI.AddLabel("<---------------------------------------->"); // just for menu sorting
Global.RegisterCallback("player_hurt", "chatlogs");
}

main();

