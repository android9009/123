UI.AddCheckbox("Buy logs");
function BuyLogs(){
    Global.Print('k')
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Buy logs")) {
        var ent = Entity.GetEntityFromUserID(Event.GetInt('userid'))
        var team = Event.GetInt('team')
        if (team != Entity.GetProp(Entity.GetLocalPlayer(), "CBaseEntity", "m_iTeamNum")) {
            var item = Event.GetString('weapon')
            item = item.replace("weapon_", "")
            item = item.replace("item_", "")
            item = item.replace("assaultsuit", "kevlar + helmet")
            item = item.replace("incgrenade", "molotov")
            if (item != "unknown") {
                var name = Entity.GetName(ent)
                Global.PrintChat(" \x01[\x06onetap.su\x01] \x04" + name + " \x01bought \x04" + item + " \n");
            }
        }
    }
}
Global.RegisterCallback("item_purchase", "BuyLogs");
var username = Cheat.GetUsername();
UI.AddColorPicker("Watermark");
UI.AddCheckbox("RainbowWatBar");
var color1 = UI.GetColor("Misc", "Javascript", "Script items", "Watermark");

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function waterdraw() 
{
	
  var color = UI.GetColor("Misc", "Javascript", "Script items", "Watermark");
	
   const ping = Math.floor(Global.Latency() * 1000 / 1.5 );
	
	var today = new Date();
    var hours1 = today.getHours();
    var minutes1 = today.getMinutes();
    var seconds1 = today.getSeconds();
	
	
    var tickrate = Global.Tickrate();
    var hours = hours1 <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":";
    var minutes = minutes1 <= 9 ? "0" + today.getMinutes() + ":" : today.getMinutes() + ":";
    var seconds = seconds1 <= 9 ? "0" + today.getSeconds() : today.getSeconds()    ;
			
    var font = Render.AddFont( "Verdana", 7, 400);
	var text = "onetap [alpha] | " +username+ " | delay: " +ping+ "ms | " +tickrate+ "tick | " + hours + minutes + seconds;
	var h = 18;
	var w = Render.TextSizeCustom(text, font)[0] + 8;
	var x = Global.GetScreenSize()[0];
	var y = 10;
	x = x - w - 10;

if(UI.GetValue("Misc", "Javascript", "Script items", "RainbowWatBar")){
        var color = HSVtoRGB(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "speed booster") ,1 ,1);
        var color1 = HSVtoRGB((Global.Realtime() + 1) * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "speed booster") ,1 ,1);
        Render.GradientRect(x, y, w, 2, 1, [ color.r, color.g, color.b, 255 ], [ color1.r, color1.g, color1.b, 255 ] )
        Render.FilledRect(x, y+2, w, h, [17, 17, 17, 100]);
        Render.StringCustom(x+4, y + 4, 0, text, [255,255,255,255], font);
    } else {
        Render.FilledRect(x, y, w, 2, [color[0], color[1], color[2], color[3]]);
        Render.FilledRect(x, y+2, w, h, [17, 17, 17, 100]);
        Render.StringCustom(x+4, y + 4, 0, text, [255,255,255,255], font);
    }
}
Global.RegisterCallback("Draw", "waterdraw");
UI.AddSliderFloat("speed booster", 0.01, 1.0);
UI.SetValue("MISC", "JAVASCRIPT", "Script Items", "speed booster", 0.1);

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
function radian(degree)

{

    return degree * Math.PI / 180.0;

}



function ExtendVector(vector, angle, extension)

{

    var radianAngle = radian(angle);

    return [extension * Math.cos(radianAngle) + vector[0], extension * Math.sin(radianAngle) + vector[1], vector[2]];

}



function VectorAdd(a, b)

{

    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

}



function VectorSubtract(a, b)

{

    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];

}



function VectorMultiply(a, b)

{

    return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];

}



function VectorLength(x, y, z)

{

    return Math.sqrt(x * x + y * y + z * z);

}



function VectorNormalize(vec)

{

    var length = VectorLength(vec[0], vec[1], vec[2]);

    return [vec[0] / length, vec[1] / length, vec[2] / length];

}



function VectorDot(a, b)

{

    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

}



function VectorDistance(a, b)

{
    if(a[0] == b[0] && a[1] == b[1] && a[2] == b[2] )
      return 0
    return VectorLength(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

}


function ClosestPointOnRay(target, rayStart, rayEnd)

{

    var to = VectorSubtract(target, rayStart);

    var dir = VectorSubtract(rayEnd, rayStart);

    var length = VectorLength(dir[0], dir[1], dir[2]);

    dir = VectorNormalize(dir);



    var rangeAlong = VectorDot(dir, to);

    if (rangeAlong < 0.0)

    {

        return rayStart;

    }

    if (rangeAlong > length)

    {

        return rayEnd;

    }

    return VectorAdd(rayStart, VectorMultiply(dir, [rangeAlong, rangeAlong, rangeAlong]));

}
var spots = []
var last_impact = [];
var enemies_list = [];
function OnBulletImpact()

{
    if(!Entity.IsValid(Entity.GetLocalPlayer()) || !Entity.IsAlive(Entity.GetLocalPlayer()))
      return;
    var curtime = Global.Curtime();

    //if (Math.abs(lastHitTime - curtime) < 0.2) return;



    var entity = Entity.GetEntityFromUserID(Event.GetInt("userid"));

    var impact = [Event.GetFloat("x"), Event.GetFloat("y"), Event.GetFloat("z"), curtime];

    var source;
    if(last_impact[entity] == null)
      last_impact[entity] = 0;
    if (Entity.IsValid(entity) && Entity.IsEnemy(entity) && Global.Tickcount() - last_impact[entity] > 2)
    {

      source = Entity.GetEyePosition(entity);
      closest = ClosestPointOnRay(Entity.GetEyePosition(Entity.GetLocalPlayer()) , source , impact)
      //screen_closest = Render.WorldToScreen(closest);

      dis = VectorDistance(closest,Entity.GetEyePosition(Entity.GetLocalPlayer()))
      if (dis < 128)
      {
        if(UI.GetValue( "Misc", "JAVASCRIPT", "Script items", "AA Priority Indicator"))
          spots.push(closest)
        last_impact[entity] = Global.Tickcount()
        enemies_list[entity] = UI.IsHotkeyActive( "Anti-Aim", "Fake angles", "Inverter" ) ? 1 : 2; // 1 NOT TOGGLED ---- 2 TOGGLED
        //Cheat.Print("FLIP \n")
      }
    }

}

function OnHurt()

{

    if (Entity.GetEntityFromUserID(Event.GetInt("userid")) != Entity.GetLocalPlayer()) return;

    var hitbox = Event.GetInt('hitgroup');

    entity = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
//    Cheat.Print('Hello? \n')
    if ((hitbox != 1 && hitbox != 6 && hitbox != 7 && hitbox != 0))  //head, both toe
    {
        //UI.ToggleHotkey( "Anti-Aim", "Fake angles", "Inverter" );
        enemies_list[entity] = enemies_list == 1 ? 2 : 1;
        //Cheat.Print("REVERT \n")
    }

}
function dist(v1 , v2){

  deltaX = v1[0] - v2[0];
  deltaY = v1[1] - v2[1];
  deltaZ = v1[2] - v2[2];

  distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

  return distance;
}
function vector_sub(vec1, vec2) {
  return [
    vec1[0]-vec2[0],
    vec1[1]-vec2[1],
    vec1[2]-vec2[2]
  ];
}
function getAngles(localPos, pos) {
  newPos = vector_sub(pos, localPos);
  xyDist = Math.sqrt((newPos[0]*newPos[0] + newPos[1]*newPos[1]));
  yaw = Math.atan2(newPos[1], newPos[0]) * 180 / Math.PI;
  pitch = Math.atan2(-newPos[2], xyDist) * 180 / Math.PI;
  roll = 0;
  angles = [pitch, yaw, roll];
  return angles;
}
function get_angle_amount(x,y,z)
{
  return Math.abs(x) + Math.abs(y) + Math.abs(z);
}
var screen_size = Render.GetScreenSize();
function get_dist_aa(v1)
{
  v2 = [screen_size[0] / 2, screen_size[1] / 2 , 0]
  v1[2] = 0
  deltaX = v1[0] - v2[0];
  deltaY = v1[1] - v2[1];
  deltaZ = v1[2] - v2[2];

  distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

  return distance;
}
function do_draw()
{
     if(!Entity.IsValid(Entity.GetLocalPlayer()))
    {
      enemies_list = [];
      return;
    }
    if(!Entity.IsAlive(Entity.GetLocalPlayer()))
      return;
    enemy = Entity.GetEnemies();
    for(i = 0; i < enemy.length; i++)
    {
      if(enemies_list[enemy[i]] == null)
        enemies_list[enemy[i]] = 1;
    }
    best = 0;
    best_index = 0;
    closest_angle = 999999999;
    for(i = 0; i < enemies_list.length; i++)
    {

      if(!Entity.IsValid(i) || !Entity.IsAlive(i) || Entity.IsDormant(i) || !Entity.IsEnemy(i))
        continue;

      angle = get_dist_aa(Render.WorldToScreen(Entity.GetEyePosition(i)))
      if(angle < closest_angle)
      {
        closest_angle = angle
        best = enemies_list[i]
        best_index = i
      }
    }
    //Cheat.Print(closest_angle.toString())
  //Cheat.Print("\n")
    for(i = 0; i < enemies_list.length;i++)
    {
		if(!Entity.IsValid(i) || !Entity.IsAlive(i) || Entity.IsDormant(i) || !Entity.IsEnemy(i))
        continue;
      vecOrigin = Entity.GetRenderOrigin(i);

      vecScreenOrigin = Render.WorldToScreen(vecOrigin);
      if(vecScreenOrigin == false)
        continue;
      vecBottom = vecOrigin;
      duckamount = Entity.GetProp( i, "DT_BasePlayer", "m_flDuckAmount" );
      vecBottom = [vecBottom[0] , vecBottom[1] , vecBottom[2] + 72 - 18 * duckamount];

      vecScreenBottom = Render.WorldToScreen(vecBottom);
      if (vecScreenBottom == false)
          continue;

      sx = Math.round(vecScreenOrigin[0])
      sy = Math.round(vecScreenOrigin[1])
      h  = Math.round(vecScreenBottom[1] - vecScreenOrigin[1])
      w  = Math.round(h * 0.25)
      origin = Entity.GetRenderOrigin(i)
      sorigin = Render.WorldToScreen(origin)
      distance = dist(origin , Entity.GetRenderOrigin(Entity.GetLocalPlayer()))
      if(UI.GetValue( "Misc", "JAVASCRIPT", "Script items", "AA Priority Indicator"))
        Render.String(sorigin[0] , sy + h * 1.35 / Math.min(1 , Math.max(0.9 , 800 /  distance )), 1, enemies_list[i].toString(), best_index == i ? [165,255,20,255] : [255,0,0,255], 15 );
    }
    if(best == 1 && !UI.IsHotkeyActive( "Anti-Aim", "Fake angles", "Inverter" ))
    {
      UI.ToggleHotkey( "Anti-Aim", "Fake angles", "Inverter" );
    }
    if(best == 2 && UI.IsHotkeyActive("Anti-Aim" , "Fake angles" , "Inverter"))
    {
      UI.ToggleHotkey( "Anti-Aim", "Fake angles", "Inverter" );
	  } 
 }

function Main2()
{
  UI.AddCheckbox( "AA" );
  UI.AddCheckbox( "AA Priority Indicator" );
//  UI.AddCheckbox( "AA Desync Amount Indicator" );
//  Cheat.RegisterCallback("weapon_fire", "OnWeaponFire");
  Cheat.RegisterCallback("bullet_impact", "OnBulletImpact");
  Global.RegisterCallback("Draw", "do_draw")
  Cheat.RegisterCallback("player_hurt" , "OnHurt")
//  Global.RegisterCallback("player_disconnect", "on_player_disconnect");
  //Global.RegisterCallback("CreateMove", "do_aa");
//	Global.RegisterCallback("player_connect_full", "player_connect")
}

Main2();

var screen_size = Global.GetScreenSize();
var isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
//UI.AddColorPicker("Selected arrow color");
//UI.AddSliderFloat("flashing indicator", .1, 2.0);
//UI.SetValue("MISC", "JAVASCRIPT", "Script Items", "flashing indicator", .75);
var isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
var isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
var isHideRealActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "HideReal Hotkey" );
var isInverted;
var drawLeft = 1; drawHideReal = 1;
var drawRight = 0, drawBack = 0;

var isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
var isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
var isHideRealActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "HideReal Hotkey" );
var isInverted;
var drawLeft = 1; drawHideReal = 1;
var drawRight = 0, drawBack = 0;


function HSVtoRGB(h, s, v)
{
var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 4)
    {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}
 // indicatoare aa      
function drawString()
{
	var screen = Render.GetScreenSize();
    screen[0] /= 2
    screen[1] /= 2
	const y = render_get_screen_size( )[1];
	isDoubletap = UI.IsHotkeyActive("Rage", "Exploits", "Doubletap"	);
	isInverted = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
	isFDuking = UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck");
	isHideReal = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Hide real angle");

    const font = Render.AddFont("Verdana", 7, 400); 
	//Render.String( 26, 995 - 5, 0, "nervosaa", [107, 52, 235, 255], 4);
	if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck"))
	{
        isDoubletap = false;
		render_string(10, y - 340, 0, "DUCK", [10, 10, 10, 125], 4);
		Render.String( 9 , y - 341, 0, "DUCK", [255, 255, 255, 200], 4);
    }
	if(drawLeft)
	{
	    Render.String(screen_size[0] /2 -50, screen_size[1] /2 -14, 1, "*", [170, 150, 255, 255] , 4 );
	 	Render.String(screen_size[0] /2 +50, screen_size[1] /2 -14, 1,  "*", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +34, 1,  "%", [ 255, 255, 255, 255 ], 5 );
		Render.String(screen_size[0] /2 -23, screen_size[1] /2 +50, 0, "MANUAL", [ 255, 170, 0, 255 ], 11.5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +420, 1, isInverted ? "L" : "R", [ 210, 139, 230, 255 ], 4 );
		Render.String( 10 , y - 127.3, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [10, 10, 10, 125] :[10, 10, 10, 125], 4);
        Render.String( 9 , y - 129, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [75, 134, 31, 255] :[ 190, 0, 0, 255 ], 4);
	}
	else if(drawRight)
	{	
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -14 , 1,  "*", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -14 , 1,  "*", [ 170, 150, 255, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +34, 1,  "%", [ 255, 255, 255, 255 ], 5 );
		Render.String(screen_size[0] /2 -23, screen_size[1] /2 +50, 0, "MANUAL", [ 255, 170, 0, 255 ], 11.5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +420, 1, isInverted ? "L" : "R", [ 210, 139, 230, 255 ], 4 );
		Render.String( 10 , y - 127.3, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [10, 10, 10, 125] :[10, 10, 10, 125], 4);
        Render.String( 9 , y - 129, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [75, 134, 31, 255] :[ 190, 0, 0, 255 ], 4);
	}
	else if(drawBack)
	{
		
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -14, 1,  "*", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -14, 1,  "*", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +34, 1,  "%", [ 170, 150, 255, 255 ], 5 );
		Render.String(screen_size[0] /2 -23, screen_size[1] /2 +50, 0, "MANUAL", [ 255, 170, 0, 255 ], 11.5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +420, 1, isInverted ? "L" : "R", [ 210, 139, 230, 255 ], 4 );
		Render.String( 10 , y - 127.3, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [10, 10, 10, 125] :[10, 10, 10, 125], 4);
        Render.String( 9 , y - 129, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [75, 134, 31, 255] :[ 190, 0, 0, 255 ], 4);
	}
	else if(drawHideReal)
	{
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -6, 1,  "*", [ 255, 255, 255, 255 ], 6 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -6, 1,  "*", [ 255, 255, 255, 255 ], 6 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +34, 1,  "&", [ 255, 255, 255, 255 ], 5 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +53, 0, isHideReal ? "DYNAMIC" : "DYNAMIC", [ 210, 140, 220, 255 ], 11.5 );
		Render.String( 10 , y - 127.3, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [10, 10, 10, 125] :[10, 10, 10, 125], 4);
        Render.String( 9 , y - 129, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [75, 134, 31, 255] :[ 190, 0, 0, 255 ], 4);
	}
}


function onCreateMove()
{
    isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
    isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
    isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
    isHideRealActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "HideReal Hotkey" );
   
    if(isLeftActive)
    {  
        drawLeft = 1;
        drawBack = 0;
        drawRight = 0;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", -90 );
        UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "At targets", false);
    }
    else if(isRightActive)
    {  
        drawLeft = 0;
        drawBack = 0;
        drawRight = 1;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 90 );
        UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
       UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "At targets", false);
    }
    else if(isBackwardsActive)
    {  
        drawLeft = 0;
        drawBack = 1;
        drawRight = 0;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
        UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "At targets", false);
    }
    else if(isHideRealActive)
    {
        drawLeft = 0;
        drawBack = 0;
        drawRight = 0;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
        UI.SetValue("Anti-Aim", "Fake Angles", "Hide real angle", true);
    }
}

function Main()
{
    UI.AddHotkey( "Left Hotkey" );
    UI.AddHotkey( "Right Hotkey" );
    UI.AddHotkey( "Backwards Hotkey" );
    UI.AddHotkey( "HideReal Hotkey" );
   
    //  callbacks
    Global.RegisterCallback("Draw", "drawString")
    Global.RegisterCallback("CreateMove", "onCreateMove")
}
Main();


function RADTODEG(radians){
    return radians * 180 / Math.PI
}
function calcAngle(source,entityPos){
    var delta = []
    delta[0] = source[0] - entityPos[0]
    delta[1] = source[1] - entityPos[1]
    delta[2] = source[2] - entityPos[2]
    var angles = []
    var viewangles = Local.GetViewAngles()
    angles[0] = RADTODEG(Math.atan(delta[2] / Math.hypot(delta[0], delta[1]))) - viewangles[0]
    angles[1] = RADTODEG(Math.atan(delta[1] / delta[0])) - viewangles[1]
    angles[2] = 0
    if(delta[0] >= 0)
        angles[1] += 180

    return angles
}
UI.AddSliderInt("Max Brute FOV", 0, 25)
UI.AddCheckbox("Anti-Onetap ;)")
var shots = 0
function onBulletImpact(){
    var ent = Entity.GetEntityFromUserID(Event.GetInt("userid"))
    if(ent == Entity.GetLocalPlayer() || !Entity.IsTeammate(ent))
        return
    var pos = [Event.GetFloat("x"), Event.GetFloat("y"), Event.GetFloat("z")]
    var ang = calcAngle(Entity.GetEyePosition(ent), pos)
    var angToLocal = calcAngle(Entity.GetEyePosition(ent), Entity.GetHitboxPosition(Entity.GetLocalPlayer(), 0))
    var delta = [angToLocal[0]-ang[0],angToLocal[1]-ang[1],0]
    var FOV = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1])
    if(FOV < UI.GetValue("Max Brute FOV"))
        UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter")
    if(UI.GetValue("Anti-Onetap ;)")){
        shots++
        if(!(shots % 2)) UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter")
    }
}
function playerhurt(){
    if(Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer())
        UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter")
}
Cheat.RegisterCallback("player_hurt", "playerhurt")
Cheat.RegisterCallback("bullet_impact", "onBulletImpact")


var last = 0
var shot = false
UI.AddCheckbox("Fast DT Recharge")
function lastShot(){
    if(Entity.GetLocalPlayer() == Entity.GetEntityFromUserID(Event.GetInt("userid")) && UI.IsHotkeyActive("Rage","GENERAL","Exploits","Doubletap")){
       
        last = Globals.Tickcount()
        shot = true
    }
}
var wasActive = true
var wasfding = false
var lastfding = 0
function cm(){
    if(!UI.GetValue("Script Items", "Fast DT Recharge") || (UI.IsHotkeyActive("Rage","GENERAL","Exploits","Hide shots") && !UI.IsHotkeyActive("Rage","GENERAL","Exploits","Doubletap"))){
        Exploit.EnableRecharge()
        return;
    }
    Exploit.DisableRecharge()
    if(!UI.IsHotkeyActive("Rage","GENERAL","Exploits","Doubletap"))
    wasActive = false
    if(!wasActive && UI.IsHotkeyActive("Rage","GENERAL","Exploits","Doubletap")){
        Exploit.Recharge()
        wasActive = true
    }
    if(UI.IsHotkeyActive("Anti-Aim","Extra","Fake duck")){
        wasfding = true
        lastfding = Globals.Tickcount()
    }
    if(!UI.IsHotkeyActive("Anti-Aim","Extra","Fake duck") && wasfding && Globals.Tickcount() - 19 > lastfding){
        Exploit.Recharge()
        wasfding = false
    }
   // matamare
    if(last + 8 < Globals.Tickcount() && shot){
        Exploit.Recharge()
        shot = false
    }
}
function roundStart(){
    if(!UI.GetValue("Script Items", "Fast DT Recharge") || (UI.IsHotkeyActive("Rage","GENERAL","Exploits","Hide shots") && !UI.IsHotkeyActive("Rage","GENERAL","Exploits","Doubletap"))) return
    if(Exploit.GetCharge() != 2 ){
        Exploit.Recharge()
        last = Globals.Tickcount()
    }
}
Cheat.RegisterCallback("weapon_fire","lastShot")
Cheat.RegisterCallback("CreateMove","cm")
Cheat.RegisterCallback("round_start","roundStart")
Cheat.RegisterCallback("round_prestart","roundStart")
Cheat.RegisterCallback("round_end","roundStart")

//region menu

const enable = UI.AddCheckbox("Double tap modifier");
const velocity = UI.AddDropdown("Double tap mode", ["Quick", "Accurate"]);

//endregion

//region functions

//region dependencies

function clamp(v, min, max)
{
    return Math.min(Math.max(v, min), max);
}

/**
 * @class vec3_t
 * @description Vector3D
*/
const vec3_t = {
    new: function(x, y, z) { return {x: x, y: y, z: z} },

    add: function(vec1, vec2) { return { x: vec1.x + vec2.x, y: vec1.y + vec2.y, z: vec1.z + vec2.z } },

    sub: function(vec1, vec2) { return { x: vec1.x - vec2.x, y: vec1.y - vec2.y, z: vec1.z - vec2.z } },

    multiply: function(vec1, vec2) { return { x: vec1.x * vec2.x, y: vec1.y * vec2.y, z: vec1.z * vec2.z } },

    divide: function(vec1, vec2) { return { x: vec1.x / vec2.x, y: vec1.y / vec2.y, z: vec1.z / vec2.z } }
};

/**
 * @class col_t
 * @description RBGA Colors
 */
const col_t = {
    new: function(r, g, b, a) { return {r: r, g: g, b: b, a: a}},
    unpack: function(col) { return [col.r, col.g, col.b, col.a]},
    shift: function(color, dst, dur) {
        if (!color.r || !dst.r)
            return;

        const inc = ((1 / dur) * Global.Frametime()) * 255;
        const is_color_equal = function(col1, col2) {
            return (col1.r === col2.r) && (col1.g === col2.g) && (col1.b === col2.b) && (col1.a === col2.a);
        };

        if (is_color_equal(color, dst))
            return color;

        // Best code I've ever made.
        if (color.r > dst.r)
        {
            color.r = clamp(color.r - inc, dst.r, 255);
        }

        if (color.r < dst.r)
        {
            color.r = clamp(color.r + inc, 0, dst.r);
        }

        if (color.g > dst.g)
        {
            color.g = clamp(color.g - inc, dst.g, 255);
        }

        if (color.g < dst.g)
        {
            color.g = clamp(color.g + inc, 0, dst.g);
        }

        if (color.b > dst.b)
        {
            color.b = clamp(color.b - inc, dst.b, 255);
        }

        if (color.b < dst.b)
        {
            color.b = clamp(color.b + inc, 0, dst.b);
        }

        if (color.a > dst.a)
        {
            color.a = clamp(color.a - inc, dst.a, 255);
        }

        if (color.a < dst.a)
        {
            color.a = clamp(color.a + inc, 0, dst.a);
        }

        return color;
    }
};

const rad2deg = function(rad) {
    return (rad * 180) / Math.PI;
};

const deg2rad = function(deg) {
    return (deg * Math.PI) / 180;
};

//endregion

const calculate_distance = function(src, dst)
{
    if (!src.x || !dst.x)
        return 0;

   return (Math.sqrt(Math.pow(src.x - dst.x, 2) + Math.pow(src.y - dst.y, 2) + Math.pow(src.z + dst.z, 2)));
};

const update_hitchance = function() {
    const hitchances = {0: 3, 1: 33};

    UI.SetValue("Rage", "GENERAL", "Exploits", "Doubletap hitchance", hitchances[UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Double tap mode")]);
};

function main777()
{
    // Check whether the script is on or not
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Double tap modifier"))return;
    update_hitchance();

    // Get entity properties
    const player = Entity.GetLocalPlayer();
    const viewangles = vec3_t.new(Global.GetViewAngles()[0], Global.GetViewAngles()[1], Global.GetViewAngles()[2]);
    const eyepos = vec3_t.new(Entity.GetEyePosition(player)[0], Entity.GetEyePosition(player)[1], Entity.GetEyePosition(player)[2]);
    const enemies = Entity.GetEnemies();

    // Initiate our values
    var target_dist = 133337;
    var target_index = -1;

    // Loop through our enemies and find best target
    for (var i = 0; i < enemies.length; i++)
    {
        // Our current enemy
        const ent = enemies[i];

        // Checks whether the entity is dormant or not
        if (!Entity.IsDormant(ent))
            break;

        // Checks whether the entity is alive or not
        if (!Entity.IsAlive(ent))
            break;

        // Calculates the distance between you and the enemy
        const dst = Entity.GetProp(ent, "CBaseEntity", "m_vecOrigin");

        var distance = calculate_distance(eyepos, vec3_t.new(dst[0], dst[1], dst[2]));

        // If the distance is lower than our current target distance, then change target (Distance based)
        if (distance < target_dist) {
            target_dist = distance;
            target_index = ent;
        }

    }

    // If we didn't find any targets, return
    if (target_index === -1) return 0;

    // Creates a variable to check if we're aiming at our target
    var is_targeting = false;

    // Checks if we're aiming at our target
    for (var h = 0; h < 19; h++)
    {
        // Trace a bullet to our target and check if we hit it
        var hitbox = Entity.GetHitboxPosition(target_index, h);
        var bullet_data = Trace.Bullet(player, [eyepos.x, eyepos.y, eyepos.z], hitbox);

        // If the entity the bullet trace hit is the same as our target, then we're aiming at him.
        if (bullet_data[0] === target_index)
            is_targeting = true;
		break;
    }

    // If we're aiming at our target and we're using doubletap, then disable desync
    if (is_targeting && UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap")) 
	{
        UI.SetValue("Anti-Aim", "Fake angles", "Enabled", 0);
		return ;
	}
}

// Create our color value
var draw_color = col_t.new(145, 160, 251, 200);

function indicator()
{
    // Check whether the script is on or not
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Double tap modifier"))
        return;

    // Initiate dormant and active colors
    const colors = {
        blue: col_t.new(124,252,0, 225),
        red: col_t.new(124,352,0, 255),
    };

    // Get drawing properties
    const x = Global.GetScreenSize()[2], y = Global.GetScreenSize()[1];

    // Render indicator
   // Render.String(50, y - 124, 0, "mystic", [122, 122, 2, 22], 4);
   // Render.String(50, y - 125, 0, "mystic", col_t.unpack(draw_color), 4);
    //Render.FilledRect( 50, y - 90, 36, 3, [2, 2, 2, 22]);
    //Render.FilledRect( 50, y - 90, (draw_color.r - 145) * 96 / 235, 3, col_t.unpack(colors.red));

    // Check whether the script is on or not
    if (!UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))
    {
        // Shifts to the dormant color
        draw_color = col_t.shift(draw_color, colors.blue, 1);
        return;
    }

    // Shifts to the active color
    draw_color = col_t.shift(draw_color, colors.red, 1);

}

//endregion

//region callbacks

Global.RegisterCallback("CreateMove", "main777");
Global.RegisterCallback("Draw", "indicator");

//endregion


//frametick switch
var frame = 0;

//endregion



var props = 0;
var screen_size = Global.GetScreenSize();
var old_percentage = 0;

function getPercentage(number, percentage) {
    return (percentage / 100) * number;
}


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
 * @version 2.0.0
 * @description A better UI system for Onetap
 */

var menu = [];
const menu_spacer = "                                                                                  ";

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
        path: ["Misc", "JAVASCRIPT", "Script Items", final_name]
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
    return UI.IsHotkeyActive.apply(null, elem.path);
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
 * @param value {any}
 */
menu.set = function(elem, value)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Get properties
    const properties = elem;
    properties.path.push(value);

    // Set the element's value
    UI.SetValue.apply(null, properties.path);
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
    properties.path.push(color);

    // Set the element's value
    UI.SetColor.apply(null, properties.path);
};

/**
 * Sets the value of a color picker
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
    properties.path.push(visible);

    // Change the element's visibility
    UI.SetEnabled.apply(null, properties.path);
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
        _title: "Advanced body freestanding",
        _version: "1.1.0",
        _author: "april#0001"
    },

    last_hit_lby: [],
    last_target_visibility: false,
    override_flip: false,
    last_override_time: globals_curtime( )
};

//endregion

//region menu

// Create our menu elements
const enable = menu.call(ui_add_checkbox, "Advanced body freestanding", "lby_enable", []);
const body = menu.call(ui_add_dropdown, "Body freestanding", "lby_body_mode", [["Hide real angle", "Hide fake angle"]]);
const smart = menu.call(ui_add_checkbox, "Smart switch", "lby_smart", []);
const flip = menu.call(ui_add_multi_dropdown, "Body inverter flip", "lby_body", [["Walk", "Run", "In air"]]);


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
    // If our rage aimbot is enabled, than we should invert the
    // rage anti-aim.
    if (menu.get(ref_ragebot))
    {
        // Check if our inverter's state is the same as our desired one.
        // If not, then toggle the hotkey to invert it.
        if (menu.get_hotkey(ref_inverter) !== state)
            menu.toggle(ref_inverter);

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
    const players1 = entity_get_enemies();
    const me = entity_get_local_player();

    // Initialize our data array.
    const data = {id: null, fov: 180};

    // Loop for each player in the server.
    for (var i = 0; i < players1.length; i++) {
        // Get the current player.
        const e = players1[i];

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
    const _mode = menu.get(body);

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
function update_inverter_flip( )
{
    // Check if the inverter flip options are enabled.
    if (!menu.get(flip))
        return;

    // Get some properties.
    const visible = get_target_visibility( );
    const now = globals_curtime( );

    // If it has been 300ms since the last override then
    // reset the override state.
    if (plugin.last_override_time + 0.3 < now)
        plugin.override_flip = false;

    // If our current target visibility isn't the same as
    // our cached one, then the target became visible/invisible.
    if (visible !== plugin.last_target_visibility)
    {
        // In this case, we should override, so, set override to
        // true and cache our current time.
        plugin.override_flip = true;
        plugin.last_override_time = now;
    }

    // Cache the target's visibility.
    plugin.last_target_visibility = visible;

    // Check if we're overriding
    if (plugin.override_flip)
    {
        // Set the inverter flip to nothing.
        menu.set(ref_bodyflip, 0);
        return;
    }

    // If we're not overriding, then set the inverter flip options to
    // the selected options.
    menu.set(ref_bodyflip, menu.get(flip));
}

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
    const _smart = menu.get(smart);

    // Handle the inverter flip.
    update_inverter_flip( );

    // If our anti-aim is set to 'Smart', then the entire logic is different.
    // The smart mode does not use freestanding as input, it uses data from
    // other users as input.
    if (_smart)
    {
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
    }

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
    render_string(10, y - 99, 0, "FAKE", [10, 10, 10, 125], 4);
    render_string(10, y - 100, 0, "FAKE", [192 - (abs * 71 / 60), 32 + (abs * 146 / 60), 28, 200], 4);

    // Render the bar's background
    render_filled_rect(12, y - 68, 64, 4, [10, 10, 10, 125]);

    // Draw this small tile to fix a small issue that was driving me crazy.
    render_filled_rect(43, y - 67, 1, 2, [232, 232, 232, 200]);

    // Render the desync's length under the bar.
    render_string(41, y - 63, 1, abs.toString( ), [232, 232, 232, 200], 3);
    render_circle(48, y - 61, 1, [232, 232, 232, 200]);

    // If our delta is positive, than our desync is headed to the right.
    if (delta > 0)
    {
        // So, fill the bar from the center to the right, accounting for the desync's length.
        render_filled_rect(44, y - 67, abs * 31 / 60, 2, [232, 232, 232, 200]);
        return;
    }

    // If our delta is not positive, than our desync is headed to the left.
    // So, fill the bar from the center to the left.
    render_filled_rect(44 - abs * 31 / 60, y - 67, abs * 31 / 60, 2, [232, 232, 232, 200]);
}

/**
 * @callback create_move
 * @brief Handles our plugin's logic.
 */
function on_tick( )
{
    // Checks whether or not our script is enabled.
    if (!(menu.get(enable)))
        return;

    // Does the freestanding.
    update_anti_aim( );
}

function on_frame( )
{
    // Checks whether or not our script is enabled.
    if (!(menu.get(enable)))
        return;

    // Draws our indicators
    do_indicators( );
}

/**
 * @callback player_hurt
 * @brief Handles the last hit LBY logic.
 */
function on_player_hurt( )
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
        plugin.last_hit_lby[attacker] = menu.get_hotkey(ref_inverter);
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
    'player_hurt', 'on_player_hurt'
);

// Register our 'player_connect_full' callback.
cheat_register_callback(
    'player_connect_full', 'reset'
);