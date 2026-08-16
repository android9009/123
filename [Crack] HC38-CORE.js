1
//Приветствие
UI.AddSliderInt('', 0x309, 0x309)
UI.AddLabel("      WELCOME TO HC38-CORE       ");
UI.AddLabel("                HC38-CORE            ");
UI.AddSliderInt('', 0x309, 0x309)
//

//Визуальная часть
UI.AddLabel("________________________________________");
UI.AddLabel("                    Visual            ");
UI.AddLabel("________________________________________");


//Watermark
UI.AddColorPicker("Watermark");
var color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Watermark");

if (color[3] == 0)
	UI.SetColor("Misc", "JAVASCRIPT", "Script items", "Watermark", [89, 119, 239, 255]);

function draw() {
	if(!World.GetServerString())
		return;

	var today = new Date();
    var hours1 = today.getHours();
    var minutes1 = today.getMinutes();
	var seconds1 = today.getSeconds();
	
    var hours = hours1 <= 9 ? "0"+hours1+":" : hours1+":";
    var minutes = minutes1 <= 9 ? "0" + minutes1+":" : minutes1+":";
	var seconds = seconds1 <= 9 ? "0" + seconds1 : seconds1;
	
	var server_tickrate = Globals.Tickrate().toString()
	var ebanaya_hueta = Math.round(Entity.GetProp(Entity.GetLocalPlayer(), "CPlayerResource", "m_iPing")).toString() // кто это сделал - контуженный на всю голову ебаный хуесос

	color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Watermark");

	var font = Render.AddFont("Verdana", 7, 400);
	var text = "HC38-CORE [Premium] | " + Cheat.GetUsername() + " | delay: " + ebanaya_hueta + "ms | " + server_tickrate + "tick | " + hours + minutes + seconds;
	
	var w = Render.TextSizeCustom(text, font)[0] + 8;
	var x = Global.GetScreenSize()[0];

	x = x - w - 10;

	Render.FilledRect(x, 10, w, 2, [ color[0], color[1], color[2], 255 ]);
	Render.FilledRect(x, 12, w, 18, [ 17, 17, 17, color[3] ]);
	Render.StringCustom(x+4, 10 + 4, 0, text, [ 255, 255, 255, 255 ], font);
}

Cheat.RegisterCallback("Draw", "draw");

//HC38center
var screen_size = Render.GetScreenSize();
UI.AddCheckbox("Center Indicator");
function hc38in() {
    local = Entity.GetLocalPlayer();
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Center Indicator") || !Entity.IsValid(local) || !Entity.IsAlive(local)) return;
    font5 = Render.AddFont("Verdana", 8, 600);
	font6 = Render.AddFont("Verdana", 8, 600);
    x = screen_size[0];
    y = screen_size[1];
    col = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Center Indicator color");
	Render.StringCustom(x / 2, y / 2 + 36, 1, "HC38-CORE", [0, 0, 0, 255], font5);
	Render.StringCustom(x / 2, y / 2 + 35, 1, "HC38-CORE", [154, 154, 245, 255], font6);
}
Cheat.RegisterCallback("Draw", "hc38in");

//Gradus
var screen_size = Render.GetScreenSize();
UI.AddCheckbox("Indicator");
function draw23() {
    local = Entity.GetLocalPlayer();
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Indicator") || !Entity.IsValid(local) || !Entity.IsAlive(local)) return;
    font = Render.AddFont("Verdana",8,600);
    x = screen_size[0];
    y = screen_size[1];
    col = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Indicator color");
    real_yaw = Local.GetRealYaw();
    fake_yaw = Local.GetFakeYaw();
    delta = Math.min(Math.abs(real_yaw - fake_yaw) / 2, 60).toFixed(0);
    delta_size = Render.TextSizeCustom(delta, font);
    Render.StringCustom(x / 2, y / 2 + 20, 1, delta , [255, 255, 255, 255], font);
    Render.Circle(x / 2 + delta_size[0] - 2, y / 2 + 25, 2, [255, 255, 255, 255])
}
Cheat.RegisterCallback("Draw", "draw23");
var screen_size = Global.GetScreenSize();

0

//Bloom
var props = false;
var tonemapClass = 'CEnvTonemapController';

function getValue(name) {
  var value = UI.GetValue('Script Items', name);

  return value;
}

function getColor(name) {
  var value = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', name);

  return value;
}

function onRender() {
  if (!Entity.GetLocalPlayer()) {
    return;
  }

  var worldColor = (
    getValue('enable world color modulation')
      ? getColor('world color')
      : [0, 0, 0]
  );

  Convar.SetFloat('mat_ambient_light_r', worldColor[0] / 100);
  Convar.SetFloat('mat_ambient_light_g', worldColor[1] / 100);
  Convar.SetFloat('mat_ambient_light_b', worldColor[2] / 100);

  var entities = Entity.GetEntities();

  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    var name = Entity.GetClassName(entity);

    if (name !== tonemapClass) {
      continue;
    }

    if (!props) {
      Entity.SetProp(entity, tonemapClass, 'm_bUseCustomAutoExposureMin', true);
      Entity.SetProp(entity, tonemapClass, 'm_bUseCustomAutoExposureMax', true);
      Entity.SetProp(entity, tonemapClass, 'm_bUseCustomBloomScale', true);

      props = true;
    }

    if (props) {
      var value = getValue('world exposure') / 10;
      Entity.SetProp(entity, tonemapClass, 'm_flCustomAutoExposureMin', value);
      Entity.SetProp(entity, tonemapClass, 'm_flCustomAutoExposureMax', value);

      Entity.SetProp(entity, tonemapClass, 'm_flCustomBloomScale', getValue('bloom scale') / 10);
    }

    Convar.SetFloat('r_modelAmbientMin', getValue('model ambient') / 10);
  }
}

function init() {
  UI.AddSliderFloat('world exposure', 0.0, 100.0);
  UI.AddSliderFloat('model ambient', 0.0, 100.0);
  UI.AddSliderFloat('bloom scale', 0.0, 100.0);
  UI.AddCheckbox('enable world color modulation');
  UI.AddColorPicker('world color');

  UI.SetValue('MISC', 'GENERAL', 'Hidden cvars', true);
  UI.SetValue('MISC', 'PERFORMANCE & INFORMATION', 'Disable post processing', false);

  Global.RegisterCallback("Draw", "onRender");
}

init();

0

0

//Molly Radius
function radians_to_degrees( radians ) {
    return radians * ( 180 / Math.PI );
  }


  function draw_circle( x, y, z, radius, accuracy ) {
    color = UI.GetColor("Script items", "Circle Color")

      first = true;
      old_screen_pos = Render.WorldToScreen( [ x, y, z ] );
      for ( t = 0.000; t <= Math.PI * 2.1; t += accuracy ) {
          if ( first ) {
              world_pos = [ ( radius * Math.cos( -t ) + x ), ( radius * Math.sin(-t) + y), z];
              old_screen_pos = Render.WorldToScreen( world_pos );
              first = false;
          }
          world_pos = [(radius * Math.cos(t) + x), (radius * Math.sin(t) + y), z];
          screen_pos = Render.WorldToScreen( world_pos );
          Render.Line(screen_pos[0], screen_pos[1], old_screen_pos[0], old_screen_pos[1], color)
          old_screen_pos = screen_pos;
      }
  }


  function on_render( ) {
      entities = Entity.GetEntities();
          for ( i = 0; i < entities.length; i++ ) {
              world_pos = Entity.GetRenderOrigin( entities[i] );
              name = Entity.GetClassName( entities[i] );
              screen_pos = Render.WorldToScreen( world_pos );
              
              if ( name != "CInferno" )
                  continue;
                
                draw_circle( world_pos[0], world_pos[1], world_pos[2], 180, 0.150);
      }
  }
  Global.RegisterCallback("Draw", "on_render");
  UI.AddColorPicker("Circle Color")

//Fps Boost

function fps_boost()
{
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Fps Boost"))
        {
            // Disable shadows ->
            Convar.SetString("r_shadows", "0");
            Convar.SetString("cl_csm_static_prop_shadows", "0");
            Convar.SetString("cl_csm_shadows", "0");
            Convar.SetString("cl_csm_world_shadows", "0");
            Convar.SetString("cl_foot_contact_shadows", "0");
            Convar.SetString("cl_csm_viewmodel_shadows", "0");
            Convar.SetString("cl_csm_rope_shadows", "0");
            Convar.SetString("cl_csm_sprite_shadows", "0");
            // Disable blood ->
            Convar.SetString("violence_hblood", "0");
        
            // Disable 3dsky ->
            Convar.SetString("r_3dsky", "0");

            // Disable decals ->
            //Convar.SetString("r_drawdecals", "0");

            // Disable rain ->
            Convar.SetString("r_drawrain", "0");
        
            // Disable ropes ->
            Convar.SetString("r_drawropes", "0");

            // Disable sprites ->
            Convar.SetString("r_drawsprites", "0");

            // Disable water fog ->
            Convar.SetString("fog_enable_water_fog", "0");
        }
        else
        {
            // Enable shadows ->
            Convar.SetString("r_shadows", "1");
            Convar.SetString("cl_csm_static_prop_shadows", "1");
            Convar.SetString("cl_csm_shadows", "1");
            Convar.SetString("cl_csm_world_shadows", "1");
            Convar.SetString("cl_foot_contact_shadows", "1");
            Convar.SetString("cl_csm_viewmodel_shadows", "1");
            Convar.SetString("cl_csm_rope_shadows", "1");
            Convar.SetString("cl_csm_sprite_shadows", "1");
        
            // Enable blood ->
            Convar.SetString("violence_hblood", "1");
        
            // Enable 3dsky ->
            Convar.SetString("r_3dsky", "1");

            // Enable decals ->
            //Convar.SetString("r_drawdecals", "1");

            // Enable rain ->
            Convar.SetString("r_drawrain", "1");
        
            // Enable ropes ->
            Convar.SetString("r_drawropes", "1");

            // Enable sprites ->
            Convar.SetString("r_drawsprites", "1");

            // Enable water fog ->
            Convar.SetString("fog_enable_water_fog", "1");
        }
}

// Callbacks
Cheat.RegisterCallback( "Draw", "fps_boost" );
Cheat.ExecuteCommand( "cl_csm_shadows 0" );
Cheat.ExecuteCommand( "cl_csm_rope_shadows 0" );
Cheat.ExecuteCommand( "cl_csm_world_shadows 0" );
Cheat.ExecuteCommand( "cl_csm_world_shadows_in_viewmodelcascade 0" );
Cheat.ExecuteCommand( "cl_csm_static_prop_shadows 0" );
Cheat.ExecuteCommand( "cl_csm_sprite_shadows 0" );
Cheat.ExecuteCommand( "cl_csm_translucent_shadows 0" );
Cheat.ExecuteCommand( "cl_csm_viewmodel_shadows 0" );
Cheat.ExecuteCommand( "cl_csm_entity_shadows 0" );
Cheat.ExecuteCommand( "r_shadows 0" );
Cheat.ExecuteCommand( "r_3dsky 0" );
Cheat.ExecuteCommand( "fog_enable 0" );
Cheat.ExecuteCommand( "fog_enable_water_fog 0" );
Cheat.ExecuteCommand( "fog_enableskybox 0" );
UI.SetValue( "Misc", "GENERAL", "Misc", "Force sv_cheats", true );
UI.SetValue( "Misc", "GENERAL", "Misc", "Hidden cvars", true );
Global.ExecuteCommand( "@panorama_disable_blur 1" );

0

//Aspect Ratio
UI.AddSliderInt( "Aspect ratio", 0, 500 );

function fsn( ) {
    ui_arat_val = UI.GetValue( "Aspect ratio" );

    switch ( Global.FrameStage( ) ) {
        case 5: {
            Global.ExecuteCommand( "r_aspectratio " + ui_arat_val.toString()/100 );

            break;
        }
        default: break;
    }
}


Global.RegisterCallback( "FrameStageNotify", "fsn" );
//


//Рейдж
UI.AddLabel("________________________________________");
UI.AddLabel("                     Rage            ");
UI.AddLabel("________________________________________");

0

//Noscope
UI.AddSliderFloat("Noscope distance (m)", 0, 100);
var target = -1;
function CreateMove() {
    if(!Ragebot.GetTarget())
        target = closestTarget();
    else
        target = Ragebot.GetTarget();
    if(!Entity.IsAlive(target)) {
        UI.SetValue("Rage", "GENERAL", "General", "Auto scope", true);
        return;
    }
    if(get_metric_distance(Entity.GetRenderOrigin(Entity.GetLocalPlayer()), Entity.GetRenderOrigin(target)) < UI.GetValue("Script items", "Noscope distance (m)")) {
        UI.SetValue("Rage", "GENERAL", "General", "Auto scope", false);
    } else {
        UI.SetValue("Rage", "GENERAL", "General", "Auto scope", true);
    }
}
Cheat.RegisterCallback("CreateMove", "CreateMove");
function closestTarget() {
    var local = Entity.GetLocalPlayer();
    var enemies = Entity.GetEnemies();
    var dists = [];
    var damage = [];
    for(e in enemies) {
        if(!Entity.IsAlive(enemies[e]) || Entity.IsDormant(enemies[e]) || !Entity.IsValid(enemies[e])) continue;
        dists.push([enemies[e], calcDist(Entity.GetHitboxPosition(local, 0), Entity.GetHitboxPosition(enemies[e], 0))]);
    }
    dists.sort(function(a, b)
    {
        return a[1] - b[1];
    });
    if(dists.length == 0 || dists == []) return target = -1; 
    return dists[0][0];
}

// clean dist func, thanks rzr
function calcDist(a, b)
{
    x = a[0] - b[0];
    y = a[1] - b[1];
    z = a[2] - b[2];
    return Math.sqrt( x * x + y * y + z * z );
}

function get_metric_distance(a, b)
{
    return Math.floor(Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2)) * 0.0254 );
}

0

//MinDmg
var heavy_cache = UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage")
var scout_cache = UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
var awp_cache = UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
var auto_cache = UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")
function isActive(a)
{
    return UI.IsHotkeyActive("Script items", a)
}

function setValue(cat, value)
{
    UI.SetValue("Rage", cat.toUpperCase(), "Targeting", "Minimum damage", value)
}

function isHeavyPistol(name)
{
    if (name == "r8 revolver" || name == "desert eagle")
    {
        return true
    }
}

function isAutoSniper(name)
{
    if(name == "scar 20" || weapon_name == "g3sg1")
    {
        return true
    }
}
var restore_values = false

var restore_values = false
function override_mindmg()
{
	if(!isActive("Minimum damage override"))
	{
		if (restore_values)
		{
			restore_values = false;
	
			setValue("HEAVY PISTOL", heavy_cache)
			setValue("SCOUT", scout_cache)
			setValue("AWP", awp_cache)
			setValue("AUTOSNIPER", auto_cache)
		}
		else
		{
 			heavy_cache = UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage")
 			scout_cache = UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
 			awp_cache = UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
 			auto_cache = UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")
		}

		return;
	}

	restore_values = true;
	
	heavy_value = UI.GetValue("Script items", "Heavy Pistol Mindmg")
    scout_value = UI.GetValue("Script items", "Scout Mindmg")
    awp_value = UI.GetValue("Script items", "AWP Mindmg")
    auto_value = UI.GetValue("Script items", "Auto Mindmg")
    weapon_name = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))

    if (isHeavyPistol(weapon_name))
    {
		setValue("HEAVY PISTOL", heavy_value)
    }
    
    if (weapon_name == "ssg 08")
    {
		setValue("SCOUT", scout_value)
    }

    if (weapon_name == "awp")
    {
		setValue("AWP", awp_value)
    }
    if (isAutoSniper(weapon_name))
    {
		setValue("AUTOSNIPER", awp_value)
    }

}
Global.RegisterCallback("CreateMove", "override_mindmg")

UI.AddHotkey("Minimum damage override")
UI.AddSliderInt("Heavy Pistol Mindmg", 0, 130)
UI.AddSliderInt("Scout Mindmg", 0, 130)
UI.AddSliderInt("AWP Mindmg", 0, 130)
UI.AddSliderInt("Auto Mindmg", 0, 130)
function indicator()
{
    var font = Render.AddFont("Verdana",8,600)

    add_y = 1;
    var screen_size = Global.GetScreenSize();
    DMGgfdg = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Minimum damage override")
    if(DMGgfdg)
    {
        add_y = add_y + 50;
        Render.StringCustom(screen_size[0] /2 - 52, screen_size[1] /2 + add_y, 0, "Damage Override", [124,195,13,255 ],font );

    }
    else
    {
        add_y = add_y + 50;

        
    }
    
}
Cheat.RegisterCallback("Draw", "indicator")

//OnSHOT
UI.AddCheckbox( "Wait for on shot" );
UI.AddCheckbox( "Wait for on shot indicator" );
UI.AddHotkey( "Wait for on shot key" );
var last_shot_time = []

function on_draw()
{
  if(!UI.GetValue("Misc", "Wait for on shot") || !UI.IsHotkeyActive("Misc","Wait for on shot key") || !UI.GetValue("Misc","Wait for on shot indicator" )) return;

  var font = Render.AddFont("Verdana",8,600);
  
  Render.StringCustom(960,617,1," ONSHOT",[124,195,13,255],font);
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

0

//Safe AWP
UI.AddCheckbox('Safe AWP')

var safePBackup = false

function safeAWP() {
    SlocalPlayer = Entity.GetLocalPlayer()
	SlocalPlayerWeapon = Entity.GetWeapon(SlocalPlayer)
	SlocalPlayerWeaponName = Entity.GetName(SlocalPlayerWeapon)

	if ( UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Safe AWP') && SlocalPlayerWeaponName == 'awp' ) {
		forceSafePoint = UI.IsHotkeyActive('Rage', 'GENERAL', 'Force safe point')
		if (!forceSafePoint) {
			UI.ToggleHotkey('Rage', 'GENERAL', 'Force safe point')
			safePBackup = true
		}
	} else if (safePBackup) {
		UI.ToggleHotkey('Rage', 'GENERAL', 'Force safe point')
		safePBackup = false
	}
}

Cheat.RegisterCallback('Draw', 'safeAWP')

0

//Jump scout/revolver hitchance
UI.AddCheckbox('Jump scout/revolver hitchance'), UI.AddSliderInt('Hitchance', -0x1479 + -0x1 * 0x1f83 + 0x3 * 0x1154, 0x58e + 0x92b + -0xe55)

function SetHitchanceInAir() {
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Jump scout/revolver hitchance')) return;
    var _0x5eee42 = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
    if (_0x5eee42 != 'ssg 08' && _0x5eee42 != 'r8 revolver') return;
    var _0x51b50c = Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_fFlags');
    !(_0x51b50c & -0x667 + -0x2279 + 0xd * 0x325 << 0x1 * 0x1aab + -0x1b86 + 0xdb) && !(_0x51b50c & 0x1b53 + -0x155a * -0x1 + -0x30ac << 0x4e1 * 0x3 + -0x22 * -0x79 + -0x1ea3) && (target = Ragebot.GetTarget(), value = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Hitchance'), Ragebot.ForceTargetHitchance(target, value));
}

Cheat.RegisterCallback('CreateMove', 'SetHitchanceInAir')


//Noscope Hitchance
UI.AddCheckbox('Override no scope hitchance'), UI.AddSliderInt('No scope hitchance', 0x1 * -0x1427 + 0x1 * -0xda7 + 0x2 * 0x10e7, -0x87f * -0x1 + 0x204e + -0x2869)

function NoScopeHitchance() {
    if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Override no scope hitchance')) return;
    var _0x3a7e7c = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
    if (_0x3a7e7c != 'scar 20' && _0x3a7e7c != 'g3sg1' && _0x3a7e7c != 'ssg 08' && _0x3a7e7c != 'awp') return;
    var _0x52061c = Entity.GetProp(Entity.GetLocalPlayer(), 'CCSPlayer', 'm_bIsScoped');
    if (!_0x52061c) Ragebot.ForceTargetHitchance(Ragebot.GetTarget(), UI.GetValue('Misc', 'JAVASCRIPT', 'No scope hitchance'));
}

Cheat.RegisterCallback("CreateMove", "NoScopeHitchance")

//АА
UI.AddLabel("________________________________________");
UI.AddLabel("                  Anti-Aim            ");
UI.AddLabel("________________________________________");

0

//Safe Head
var jitter_cache = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset")
var yaw_cache = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset")
UI.AddCheckbox("Safe head");

function Safe_Head()
{
    localplayer_index = Entity.GetLocalPlayer( );


        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Safe head") && UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk"))
        {
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 10);
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(0);
            AntiAim.SetRealOffset(-30);
        }
        else
        {
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_cache);
            AntiAim.SetOverride(0);
        }
}

function Main()
{
    Cheat.RegisterCallback("CreateMove", "Safe_Head");
}
Main();


//Smart Peek
UI.AddHotkey('Smart Peek')
UI.AddDropdown('Smart Peek Options',['Peek Fake','Peek Real']);

/**
 *
 * Title: Advanced body freestanding
 * Author: april#0001
 * Description: Gives more anti-aim customization for advanced users.
 *
 */

//region api

// Localizing all of the functions in snake_case because why not.

const global_print = Global.Print, global_print_chat = Global.PrintChat, global_print_color = Global.PrintColor, global_register_callback = Global.RegisterCallback, global_execute_command = Global.ExecuteCommand, global_frame_stage = Global.FrameStage, global_tickcount = Global.Tickcount, global_tickrate = Global.Tickrate, global_tick_interval = Global.TickInterval, global_curtime = Global.Curtime, global_realtime = Global.Realtime, global_frametime = Global.Frametime, global_latency = Global.Latency, global_get_view_angles = Global.GetViewAngles, global_set_view_angles = Global.SetViewAngles, global_get_map_name = Global.GetMapName, global_is_key_pressed = Global.IsKeyPressed, global_get_screen_size = Global.GetScreenSize, global_get_cursor_position = Global.GetCursorPosition, global_play_sound = Global.PlaySound, global_play_microphone = Global.PlayMicrophone, global_stop_microphone = Global.StopMicrophone, global_get_username = Global.GetUsername, global_set_clan_tag = Global.SetClanTag, globals_tickcount = Globals.Tickcount, globals_tickrate = Globals.Tickrate, globals_tick_interval = Globals.TickInterval, globals_curtime = Globals.Curtime, globals_realtime = Globals.Realtime, globals_frametime = Globals.Frametime, sound_play = Sound.Play, sound_play_microphone = Sound.PlayMicrophone, sound_stop_microphone = Sound.StopMicrophone, cheat_get_username = Cheat.GetUsername, cheat_register_callback = cheat_register_callback = new Proxy(Cheat.RegisterCallback, { apply: function(_, _, args) { switch(args[0]) { case 'paint': Cheat.RegisterCallback('Draw', args[1]); break; case 'create_move': Cheat.RegisterCallback('CreateMove', args[1]); break; case 'fsn': Cheat.RegisterCallback('FrameStageNotify', args[1]); break; default: Cheat.RegisterCallback(args[0], args[1]); break; } } }), cheat_execute_command = Cheat.ExecuteCommand, cheat_frame_stage = Cheat.FrameStage, cheat_print = Cheat.Print, cheat_print_chat = Cheat.PrintChat, cheat_print_color = Cheat.PrintColor, local_latency = Local.Latency, local_get_view_angles = Local.GetViewAngles, local_set_view_angles = Local.SetViewAngles, local_set_clan_tag = Local.SetClanTag, local_get_real_yaw = Local.GetRealYaw, local_get_fake_yaw = Local.GetFakeYaw, local_get_spread = Local.GetSpread, local_get_inaccuracy = Local.GetInaccuracy, world_get_map_name = World.GetMapName, world_get_server_string = World.GetServerString, input_get_cursor_position = Input.GetCursorPosition, input_is_key_pressed = Input.IsKeyPressed, render_string = Render.String, render_text_size = Render.TextSize, render_line = Render.Line, render_rect = Render.Rect, render_filled_rect = Render.FilledRect, render_gradient_rect = Render.GradientRect, render_circle = Render.Circle, render_filled_circle = Render.FilledCircle, render_polygon = Render.Polygon, render_world_to_screen = Render.WorldToScreen, render_add_font = Render.AddFont, render_find_font = Render.FindFont, render_string_custom = Render.StringCustom, render_textured_rect = Render.TexturedRect, render_add_texture = Render.AddTexture, render_text_size_custom = Render.TextSizeCustom, render_get_screen_size = Render.GetScreenSize, ui_get_value = UI.GetValue, ui_set_value = UI.SetValue, ui_add_checkbox = UI.AddCheckbox, ui_add_slider_int = UI.AddSliderInt, ui_add_slider_float = UI.AddSliderFloat, ui_add_hotkey = UI.AddHotkey, ui_add_label = UI.AddLabel, ui_add_dropdown = UI.AddDropdown, ui_add_multi_dropdown = UI.AddMultiDropdown, ui_add_color_picker = UI.AddColorPicker, ui_add_textbox = UI.AddTextbox, ui_set_enabled = UI.SetEnabled, ui_get_string = UI.GetString, ui_get_color = UI.GetColor, ui_set_color = UI.SetColor, ui_is_hotkey_active = UI.IsHotkeyActive, ui_toggle_hotkey = UI.ToggleHotkey, ui_is_menu_open = UI.IsMenuOpen, convar_get_int = Convar.GetInt, convar_set_int = Convar.SetInt, convar_get_float = Convar.GetFloat, convar_set_float = Convar.SetFloat, convar_get_string = Convar.GetString, convar_set_string = Convar.SetString, event_get_int = Event.GetInt, event_get_float = Event.GetFloat, event_get_string = Event.GetString, entity_get_entities = Entity.GetEntities, entity_get_entities_by_class_i_d = Entity.GetEntitiesByClassID, entity_get_players = Entity.GetPlayers, entity_get_enemies = Entity.GetEnemies, entity_get_teammates = Entity.GetTeammates, entity_get_local_player = Entity.GetLocalPlayer, entity_get_game_rules_proxy = Entity.GetGameRulesProxy, entity_get_entity_from_user_i_d = Entity.GetEntityFromUserID, entity_is_teammate = Entity.IsTeammate, entity_is_enemy = Entity.IsEnemy, entity_is_bot = Entity.IsBot, entity_is_local_player = Entity.IsLocalPlayer, entity_is_valid = Entity.IsValid, entity_is_alive = Entity.IsAlive, entity_is_dormant = Entity.IsDormant, entity_get_class_i_d = Entity.GetClassID, entity_get_class_name = Entity.GetClassName, entity_get_name = Entity.GetName, entity_get_weapon = Entity.GetWeapon, entity_get_weapons = Entity.GetWeapons, entity_get_render_origin = Entity.GetRenderOrigin, entity_get_prop = Entity.GetProp, entity_set_prop = Entity.SetProp, entity_get_hitbox_position = Entity.GetHitboxPosition, entity_get_eye_position = Entity.GetEyePosition, trace_line = Trace.Line, trace_bullet = Trace.Bullet, usercmd_set_movement = UserCMD.SetMovement, usercmd_get_movement = UserCMD.GetMovement, usercmd_set_angles = UserCMD.SetAngles, usercmd_force_jump = UserCMD.ForceJump, usercmd_force_crouch = UserCMD.ForceCrouch, antiaim_get_override = AntiAim.GetOverride, antiaim_set_override = AntiAim.SetOverride, antiaim_set_real_offset = AntiAim.SetRealOffset, antiaim_set_fake_offset = AntiAim.SetFakeOffset, antiaim_set_l_b_y_offset = AntiAim.SetLBYOffset, exploit_get_charge = Exploit.GetCharge, exploit_recharge = Exploit.Recharge, exploit_disable_recharge = Exploit.DisableRecharge, exploit_enable_recharge = Exploit.EnableRecharge, ragebot_override_minimum_damage = Ragebot.OverrideMinimumDamage, ragebot_override_hitchance = Ragebot.OverrideHitchance, ragebot_override_accuracy_boost = Ragebot.OverrideAccuracyBoost, ragebot_override_multipoint_scale = Ragebot.OverrideMultipointScale, ragebot_force_safety = Ragebot.ForceSafety;
//endregion

//region dependencies

/**
 * @title BetterUI
 * @version 2.0.1
 * @description A better UI system for Onetap
 */

var menu = {
    _class: 'BetterUI'
};
const menu_spacer = "                                                                                  ";

/**
 * Concats two elements into an array without increasing the array length.
 * Prevents the memory leak in 2.0.0 from happening
 * 
 * @param a {array}
 * @param b {any}
 */
menu.concat = function(a, b)
{
    // Creates a new array.
    var arr = [];

    // Push all items from the array 'a' into our array.
    for (var c in a)
    {
        arr.push(a[c]);
    }

    // Push the value 'b' into our array.
    arr.push(b);

    // Return the new array.
    return arr;
}

/**
 * Creates a new menu label
 *
 * @param label {string}
 */
menu.label = function(label)
{
    // Creates the label
    UI.AddLabel(label);
};

/**
 * Creates a new menu element
 *
 * @param func {function}
 * @param name {string}
 * @param label {string},
 * @param properties {array}
 */
menu.call = function(func, name, label, properties)
{
    // Get properties
    const final_name = name + menu_spacer + label;
    var final_props = [final_name];
    const element_info_t = {
        path: ["Misc", "JAVASCRIPT", "Script items", final_name]
    };

    // If our properties aren't null, then pack them together.
    if (properties != null)
    {
        for (var i = 0; i < properties.length; i++)
        {
            final_props.push(properties[i]);
        }
    }

    // Create our menu element and return properties
    func.apply(null, final_props);
    return element_info_t;
};

/**
 * Creates a new menu reference
 *
 * @param path {array}
 */
menu.reference = function(path)
{
    const element_info_t = {
        path: path
    };

    return element_info_t;
};

/**
 * Gets the value of a menu element
 *
 * @param elem {array}
 * @return {*}
 */
menu.get = function(elem)
{
    // If the element doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Returns the element's value
    return UI.GetValue.apply(null, elem.path);
};

/**
 * Gets the value of a menu element
 *
 * @param elem {array}
 * @return {*}
 */
menu.get_hotkey = function(elem)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Returns the element's value
    return UI.IsHotkeyActive.apply(elem.path);
};

/**
 * Gets the value of a menu element
 *
 * @param elem {array}
 * @return {*}
 */
menu.get_color = function(elem)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Returns the element's value
    return UI.GetColor.apply(null, elem.path);
};

/**
 * Sets the value of a menu element
 *
 * @param elem {array}
 * @param value {*}
 */
menu.set = function(elem, value)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Get properties
    const properties = elem;

    // Set the element's value
    UI.SetValue.apply(null, this.concat(properties.path, value));
};

/**
 * Sets the value of a color picker
 *
 * @param elem {array}
 * @param color {array|Color}
 */
menu.set_color = function(elem, color)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Get properties
    const properties = elem;

    // Set the element's value
    UI.SetColor.apply(null, this.concat(properties.path, color));
};

/**
 * Toggles a hotkey
 *
 * @param elem {array}
 */
menu.toggle = function(elem)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Set the element's value
    UI.ToggleHotkey.apply(null, elem.path);
};

/**
 * Changes the visibility of a menu elements
 *
 * @param elem {array}
 * @param visible {boolean}
 */
menu.visibility = function(elem, visible)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Get properties
    const properties = elem;

    // Change the element's visibility
    UI.SetEnabled.apply(null, this.concat(properties.path, visible));
};
/**
 * @title Vector
 * @description Simple 3d vector system
 *
 * @typedef Vector {x: number, y: number, z: number}
 */
var vector = {
    _class: 'vector'
};

/**
 * @brief Creates a new 3d vector instance.
 * @param data {array}
 * @returns {Vector}
 */
vector.new = function(data)
{
    return {
        x: data[0],
        y: data[1],
        z: data[2]
    };
};

/**
 * @brief Realizes a mathematical operation between two vectors.
 * @param vec {Vector}
 * @param vec2 {Vector}
 * @param operation {string}
 * @returns {Vector}
 */
vector.operate = function(vec, vec2, operation)
{
  switch (operation)
  {
      case '+':
          return {
              x: vec.x + vec2.x,
              y: vec.y + vec2.y,
              z: vec.z + vec2.z
          };

      case '-':
          return {
              x: vec.x - vec2.x,
              y: vec.y - vec2.y,
              z: vec.z - vec2.z
          };

      case '*':
          return {
              x: vec.x * vec2.x,
              y: vec.y * vec2.y,
              z: vec.z * vec2.z
          };

      case '/':
          return {
              x: vec.x / vec2.x,
              y: vec.y / vec2.y,
              z: vec.z / vec2.z
          };

      default:
          throw new Error("[Vector] Invalid operation type.");
  }
};

/**
 * @brief Returns the 2d length of a vector.
 * @param vec {Vector}
 * @returns {number}
 */
vector.length2d = function(vec)
{
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
};

/**
 * @brief Converts a vector to angles.
 * @param vec
 * @returns {Vector}
 */
vector.angles = function(vec)
{
    return {
        x: -Math.atan2(vec.z, this.length2d(vec)) * 180 / Math.PI,
        y: Math.atan2(vec.y, vec.x) * 180 / Math.PI,
        z: 0
    };
};

/**
 * @brief Calculates the fov delta between two points based on a specific view angles.
 * @param origin {Vector}
 * @param destination {Vector}
 * @param view {Vector}
 * @returns {number}
 */
vector.fov_to = function(origin, destination, view)
{
    const angles = this.angles(this.operate(destination, origin, '-'));

    const delta = this.new(
        [
            Math.abs(view.x - angles.x),
            Math.abs(view.y % 360 - angles.y % 360) % 360,
            0
        ]
    );

    if (delta.y > 180)
        delta.y = 360 - delta.y;

    return this.length2d(delta);
};

/**
 * @brief Unpacks a vector object into an array.
 * @param vec {Vector}
 * @returns {[number, number, number]}
 */
vector.to_array = function(vec)
{
    return [
        vec.x,
        vec.y,
        vec.z
    ];
};

/**
 * @brief Normalizes an yaw angle.
 * @param angle {number}
 * @returns {number}
 */
function normalize_yaw(angle)
{
    var adjusted_yaw = angle;

    if (adjusted_yaw < -180)
        adjusted_yaw += 360;

    if (adjusted_yaw > 180)
        adjusted_yaw -= 360;

    return adjusted_yaw;
}

//endregion

//region main

// Create our main instance
var plugin = {
    _info: {

    },

    last_hit_lby: [],
    last_target_visibility: false,
    
    last_override_time: globals_curtime( )
};

//endregion

//region menu

// Create our menu elements






// Declare our references
const ref_inverter = menu.reference(["Anti-Aim", "Fake angles", "Inverter"]);
const ref_bodyflip = menu.reference(["Anti-Aim", "Fake angles", "Inverter flip"]);
const ref_inverter_legit = menu.reference(["Anti-Aim", "Legit Anti-Aim", "Direction key"]);
const ref_ragebot = menu.reference(["Rage", "GENERAL", "General", "Enabled"]);

//endregion

//region functions

/**
 * @brief Inverts the lower body yaw to the specified value.
 * @param state {number} Whether or not to invert the lower body yaw.
 */
function update_anti_aim_state(state)
{
    
    // rage anti-aim.
    if (UI.GetValue('Rage','GENERAL','General','Enabled'))
    {
        // Check if our inverter's state is the same as our desired one.
        // If not, then toggle the hotkey to invert it.
        if (UI.IsHotkeyActive('Anti-Aim','Fake angles','Inverter') !== state)     
            UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");

        // Return because we don't wanna do the same to the legit anti-aim's state.
        return;
    }

    // Invert the state because the legit anti-aim's inverter is different
    // from the rage one.
    state = (state + 1) % 2;

    // Check if our inverter's state is the same as our desired one.
    // If not, then toggle the hotkey to invert it.
    if (menu.get_hotkey(ref_inverter_legit) !== state)
        menu.toggle(ref_inverter_legit);
}

/**
 * @brief Gets the closest (FOV-based) enemy and returns its entity id.
 * @returns {number}
 */
function get_closest_target( ) {
    // Get our entities.
    const players = entity_get_enemies();
    const me = entity_get_local_player();

    // Initialize our data array.
    const data = {id: null, fov: 180};

    // Loop for each player in the server.
    for (var i = 0; i < players.length; i++) {
        // Get the current player.
        const e = players[i];

        // Get our eye's position, the player's head position and our view angles.
        const destination = vector.new(entity_get_hitbox_position(e, 0)),
            origin = vector.new(entity_get_eye_position(me));
        const angles = vector.new(local_get_view_angles());

        // Calculate the FOV distance.
        const fov = vector.fov_to(origin, destination, angles);

        // If our FOV distance is lower than the cached one, then it means that
        // there's another player which is even closer to our crosshair.
        if (fov < data.fov) {
            // Cache this entity and our current FOV distance for further
            // calculations.
            data.id = e;
            data.fov = fov;
        }
    }

    // Return the closest entity to our crosshair.
    return data.id;
}

/**
 * @brief Gets whether or not our target is visible.
 * @returns {boolean}
 */
function get_target_visibility( )
{
    // Get our target.
    const target = get_closest_target( );

    // If the target is not valid, then it is not visible.
    if (!target || !entity_is_valid(target))
        return false;

    // If it is dormant, than it isn't visible either.
    if (entity_is_dormant(target))
        return false;

    // Get our tracing properties.
    const me = entity_get_local_player( );
    var origin = vector.new(entity_get_eye_position(me)), velocity = vector.new(entity_get_prop(me, "CBasePlayer", "m_vecVelocity[0]")), destination = entity_get_hitbox_position(target, 0);

    // Adds our velocity vector to our origin vector as to make the trace
    // more accurate when moving.
    velocity = vector.operate(velocity, vector.new([0.25, 0.25, 0.25]), '*');
    origin = vector.operate(origin, velocity, '+');

    // Trace a line from our eye position to the target's head and see if we hit anything.
    const result = trace_line(me, vector.to_array(origin), destination)[0];

    // Return results.
    return result === target;
}

/**
 * @brief Gets which anti-aim side matches your settings the best. Or, in other words, does freestanding.
 */
function get_optimal_angle( )
{
    // Get current lower body yaw mode
    const _mode = UI.GetValue('Script items','Smart Peek Options')

    // Get some properties.
    const me = entity_get_local_player( );

    // And more properties..
    const origin = vector.new(entity_get_render_origin(me));
    var yaw = local_get_view_angles( )[1];
    var data = {left: 0, right: 0};

    // Loops for every angle from the left of your yaw to the right of your yaw
    // in steps of 30, resulting in 3 steps per side.
    for (var r = yaw - 90; r <= yaw + 90; r += 30)
    {
        // If our current angle is the center one then there's no need
        // to do anything with it.
        if (r === yaw)
            continue;

        // Convert our angle to radians
        const rad = r * Math.PI / 180;

        // Create our destination point based on current angle.
        const point = vector.operate(
            origin,
            vector.new([
                256 * Math.cos(rad),
                256 * Math.sin(rad),
                0
            ]),
            "+"
        );

        // Trace a line from our player's origin to the current point.
        // Using this to check the trace's fraction (m_flFraction) until
        // it hits something and then add it to our data array.
        //
        // This is how my 'environmental freestanding' logic is made.
        // The side with lower fractions is the side which is logically
        // closer to the player's head.
        const line = trace_line(me, vector.to_array(origin), vector.to_array(point));

        // Get which side we're iterating on.
        const side = r < yaw ? "left" : "right";

        // Update our data array.
        data[side] += line[1];
    }

    // Calculates an average for both sides.
    data.left /= 3;
    data.right /= 3;

    // If our left avg. fractions are greater than the right ones, then return
    // the number 0 which corresponds to the right side, or, in the Hide fake angle mode,
    // return 1 which corresponds to the left side.
    if (data.left > data.right)
        return _mode === 0 ? 0 : 1;

    // Does the same thing as above, except the right avg. fractions are greater than
    // the left ones.
    return _mode === 0 ? 1 : 0;
}

/**
 * @brief Handles the inverter flip feature.
 */


/**
 * @brief Updates our anti-aim based on the current freestanding mode and input.
 */
function update_anti_aim( )
{
    // Get our local player.
    const me = entity_get_local_player( );

    // Check if our player is valid and alive.
    if (!entity_is_valid(me) || !entity_is_alive(me))
        return;

    // Get if our anti-aim is on smart mode.
    



    // If our anti-aim is set to 'Smart', then the entire logic is different.
    // The smart mode does not use freestanding as input, it uses data from
    // other users as input.
 
        // Get our FOV-based target.
        const target = get_closest_target( );

        // Check if our target is valid.
        // Otherwise, just return our current freestanding angle.
        if (target == null)
        {
            update_anti_aim_state(get_optimal_angle( ));
            return;
        }

        // Check if our target has already hit us.
        // If not, then just return current freestanding angle.
        if (plugin.last_hit_lby[target] == null)
        {
            update_anti_aim_state(get_optimal_angle( ));
            return;
        }

        // Return the opposite angle to the last hit angle.
        // In this case if the inverter was off, now return on.
        if (plugin.last_hit_lby[target] === 0)
        {
            update_anti_aim_state(1);
            return;
        }

        // Or, if the inverter was on, return off.
        update_anti_aim_state(0);
        return;
    

    // If our anti-aim is not on smart mode, then we're just using regular
    // freestanding. So, do freestanding.
    update_anti_aim_state(get_optimal_angle( ));
}

/**
 * @brief Renders our plugin's indicator.
 */
function do_indicators( )
{
    // Get our local player.
    const me = entity_get_local_player( );

    // Check if our player is valid and alive.
    if (!entity_is_valid(me) || !entity_is_alive(me))
        return;

    // Get our drawing properties.
    const y = render_get_screen_size( )[1];

    // Get our anti-aim info.
    const yaw = local_get_real_yaw( ), fake = local_get_fake_yaw( );
    var delta = Math.round(normalize_yaw(yaw - fake) / 2), abs = Math.abs(delta);

    // If we're using legit anti-aim, invert the delta.
    // Doing this to fix the indicators because legit
    // anti-aim inverter is different.
    if (menu.get(ref_ragebot))
        delta *= -1;

    // Render the 'FAKE' indicator
    // Totally did not copy it from gamesense.
    

    // Render the bar's background
  

    // If our delta is positive, than our desync is headed to the right.
   

    // If our delta is not positive, than our desync is headed to the left.
    // So, fill the bar from the center to the left.
    
}

/**
 * @callback create_move
 * @brief Handles our plugin's logic.
 */
function on_tick( )
{
 
    if (!UI.IsHotkeyActive('Script items','Smart Peek'))
        return;

    // Does the freestanding.
    update_anti_aim( );
}

function on_frame( )
{

    if (!UI.IsHotkeyActive('Script items','Smart Peek'))
        return;

    // Draws our indicators
    do_indicators( );
}

/**
 * @callback player_hurt
 * @brief Handles the last hit LBY logic.
 */
function on_player_hurt1( )
{
    // Get the event's entities.
    const me = entity_get_local_player( );
    const attacker = entity_get_entity_from_user_i_d(event_get_int("attacker"));
    const userid = entity_get_entity_from_user_i_d(event_get_int("userid"));

    // Checks if our local player was the one getting hurt and not the one attacking.
    // Or, in other words, check if we got hurt.
    if (me !== attacker && me === userid)
    {
        // Update the last hit lower body global.
        plugin.last_hit_lby[attacker] = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
    }
}

/**
 * @callback round_start, player_connect_full
 * @brief Resets the last hit LBY list whenever the round ends or you switch servers.
 */
function reset( )
{
    // Reset the last lower body state.
    plugin.last_hit_lby = [];
}


//endregion

//region callbacks

// Register our 'create_move' callback.
cheat_register_callback(
    'create_move', 'on_tick'
);

// Register our 'paint' callback.
cheat_register_callback(
    'paint', 'on_frame'
);

// Register our 'player_hurt' callback.
cheat_register_callback(
    'player_hurt', 'on_player_hurt1'
);

// Register our 'player_connect_full' callback.
cheat_register_callback(
    'player_connect_full', 'reset'
);

//endregion


//LowDelta
UI.AddCheckbox("Low delta");
UI.AddDropdown( "Low delta type", [ "Custom", "On key" ] );
const lowdelta_modes = UI.AddMultiDropdown("Low delta modes", [ "Slow walk", "Low HP", "Standing" ]);
UI.AddHotkey("Low delta on key");

function SetEnabled()
{
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta"))
    {
       UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta type", 1)
    }
    else
    {
       UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta type", 0)
    }

    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta type") == 0 && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta"))
    {
       UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta modes", 1)
       UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta on key", 0)
    }
    else if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta type") == 1 && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta"))
    {
       UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta modes", 0)
       UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta on key", 1)
    }
    else
    {
       UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta modes", 0)
       UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Low delta on key", 0)
    }
}

function get_velocity(index)
{
    var velocity = Entity.GetProp(index, "CBasePlayer", "m_vecVelocity[0]");
    return Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
}

function get_health(index)
{
    health_override = Entity.GetProp(index, "CBasePlayer", "m_iHealth");
    return health_override;
}

function Low_delta()
{
	localplayer_index = Entity.GetLocalPlayer( );
	const lowdelta_dropdown_value = UI.GetValue.apply(null, lowdelta_modes);
	
	var velocity = get_velocity(localplayer_index)
    var health = get_health(localplayer_index)
	var LowHP = false
    var SlowWalk = false
	var Standing = false
	var Onkey = false

	if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta") && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta type") == 0)
	{
	   if (lowdelta_dropdown_value & (1 << 0) && UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk"))
       SlowWalk = true
       else
       SlowWalk = false

       if (lowdelta_dropdown_value & (1 << 1) && health < 50)
       LowHP = true
       else
       LowHP = false

       if (lowdelta_dropdown_value & (1 << 2) && velocity < 3)
       Standing = true
       else
       Standing = false
	}
    else if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta") && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta type") == 1)
	{
	   if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Low delta on key"))
       Onkey = true
       else
       Onkey = false
	}
   
        if (Standing == true || LowHP == true || SlowWalk == true || Onkey == true && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta"))
        {
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 10);
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(0);
            AntiAim.SetRealOffset(-20);
		}
        else
		{
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 10);
            AntiAim.SetOverride(0);
		}
}

function drawString()
{
    const fontpixel = Render.AddFont("Verdana",8,600);
    const lowdelta_dropdown_value = UI.GetValue.apply(null, lowdelta_modes);
    var SFOnkey = false
    var screen_size = Global.GetScreenSize();

    localplayer_index = Entity.GetLocalPlayer( );
    localplayer_alive = Entity.IsAlive( localplayer_index );

    var velocity = get_velocity(localplayer_index)
    var health = get_health(localplayer_index)

    SlowWalk = false
    LowHP = false
    Standing = false
    Onkey = false

    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta") && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta type") == 0)
	{
	   if (lowdelta_dropdown_value & (1 << 0) && UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk"))
       SlowWalk = true
       else
       SlowWalk = false

       if (lowdelta_dropdown_value & (1 << 1) && health < 50)
       LowHP = true
       else
       LowHP = false

       if (lowdelta_dropdown_value & (1 << 2) && velocity < 3)
       Standing = true
       else
       Standing = false
	}
    else if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta") && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta type") == 1)
	{
	   if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Low delta on key"))
       Onkey = true
       else
       Onkey = false
    }
    
    if (Standing == true || LowHP == true || SlowWalk == true || Onkey == true)
    {
        drawIND = true
    }
    else
    {
        drawIND = false
    }
    
    if (drawIND == true && localplayer_alive == true && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Low delta") == true)
	{
	   Render.StringCustom(screen_size[0] /2 , screen_size[1] /2 +64, 1, " LOW DELTA", [ 124,195,13,255 ], fontpixel );
    }
}

Global.RegisterCallback("Draw", "drawString");
Global.RegisterCallback("Draw", "SetEnabled");
Cheat.RegisterCallback("CreateMove", "Low_delta");


//Legit AA
var original_aa = true;

UI.AddHotkey("Legit AA Key");

function legit_aa()
{
    if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Legit AA Key"))
    {
        if (original_aa)
        {
            restrictions_cache = UI.GetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions");
            hiderealangle_cache = UI.GetValue ("Anti-Aim", "Fake angles", "Hide real angle");
            yaw_offset_cache = UI.GetValue ("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
            jitter_offset_cache = UI.GetValue ("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
            pitch_cache = UI.GetValue ("Anti-Aim", "Extra", "Pitch");
            original_aa = false;
        }
        UI.SetValue ("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions", 0);
        UI.SetValue ("Anti-Aim", "Fake angles", "Hide real angle", true);
        UI.SetValue ("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 180);
        UI.SetValue ("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
        UI.SetValue ("Anti-Aim", "Extra", "Pitch", 0);
    }
    else
    {
        if (!original_aa)
        {
            UI.SetValue ("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions", restrictions_cache);
            UI.SetValue ("Anti-Aim", "Fake angles", "Hide real angle", hiderealangle_cache);
            UI.SetValue ("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yaw_offset_cache);
            UI.SetValue ("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_offset_cache);
            UI.SetValue ("Anti-Aim", "Extra", "Pitch", pitch_cache);
            original_aa = true;
        }
    }
}

function drawString7()
{
    localplayer_index = Entity.GetLocalPlayer( );
    localplayer_alive = Entity.IsAlive( localplayer_index );
    const fontpixel = Render.AddFont( "Verdana",8,600);
    var screen_size = Global.GetScreenSize();

    if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Legit AA Key"))
    {
       Render.StringCustom(screen_size[0] /2 , screen_size[1] /2 + 90, 1, "Legit AA", [ 124,195,13,255 ], fontpixel );
    }
}

Global.RegisterCallback("Draw", "drawString7");
Cheat.RegisterCallback("CreateMove", "legit_aa");

//Остальное
UI.AddLabel("________________________________________");
UI.AddLabel("                     Misc            ");
UI.AddLabel("________________________________________");

0

//Strafe Fix
var a = UI.AddSliderInt("Turn speed",0, 500)
function d()
{
    UI.SetValue("Misc", "GENERAL", "Movement", "Turn speed", UI.GetValue.apply(null,a))
}
Cheat.RegisterCallback("Draw", "d")

//Leg Fucker
var clock = 0
function createmove()
{
    clock = clock + 0.5
    if (clock > 1)
    {
        if (UI.GetValue("Misc", "GENERAL", "Movement", "Slide walk"))
        {
            UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 0);
            clock = 0
        }
        else
        {
            UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 1);
            clock = 0
        }
    }
}
Cheat.RegisterCallback("CreateMove", "createmove")