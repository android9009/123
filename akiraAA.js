UI.AddCheckbox("Enable akira AA");
UI.AddLabel("#                Anti-Aimbot                 #")
UI.AddCheckbox("Adjust Anti-Aimbot");
UI.AddHotkey("Anti-Aimbot Side Switch");
UI.AddLabel("#                Lag Amount                  #");
UI.AddCheckbox("Adjust Lag Amount");
UI.AddCheckbox("log");
function get_velocity() {
    velocity = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_vecVelocity[0]");
    speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
    return speed;
}
function rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var death_angles = [];
var wish = { 
    real: 0,
    fake: 0,
    lby: 0,
    side: 0,
    limit: 0
};
var local = {
    real: 0,
    fake: 0,
    duck_amount: 0,
    shifting: false,
    in_air: false
};
var globals = {
    tick_count: 0,
    cur_time: 0,
    debug: true
}
function update() {
    globals.tick_count = Globals.Tickcount();
    globals.cur_time = Globals.Curtime();
    local.real = Math.floor(Local.GetRealYaw());
    local.fake = Math.floor(Local.GetFakeYaw());
    local.duck_amount = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_flDuckAmount");
}
function set_wish_angles() {
    AntiAim.SetOverride(1);
    AntiAim.SetRealOffset(wish.real);
    AntiAim.SetFakeOffset(wish.fake);
    AntiAim.SetLBYOffset(wish.lby);
}
function handle_hotkeys() {
    wish.side = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Anti-Aimbot Side Switch") ? 1 : 0;
    local.shifting = Input.IsKeyPressed(0x10) ? true : false;// ensure you use misc->accurate walk
    local.in_air = Input.IsKeyPressed(0x20) ? true : false; // ?\_(?)_/?
}
function adjust_antiaim() {
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Adjust Anti-Aimbot"))
        return;
    
    if (local.shifting && get_velocity() > 1.11) {
        wish.lby = -140;
        wish.real = globals.tick_count % 2 ? rand_int(-55, -22) : rand_int(22, 55);
    }
    else {
        if (wish.side == 0) {
            wish.lby = 120;
            wish.real = globals.tick_count % 12 ? wish.real : wish.real - 11;
            if (wish.real <= -55)
                wish.real = 32;
            if (wish.real == 21)
                wish.real = -33;
        }
        else if (wish.side == 1) {
            wish.lby = -120;
            wish.real = globals.tick_count % 12 ? wish.real : wish.real + 11;           
            if (wish.real >= 55)
                wish.real = -32;
            if (wish.real == -21)
                wish.real = 33;
        }
    }
    set_wish_angles();
}
function adjust_lag() {
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Adjust Lag Amount"))
        return;
    if (local.in_air) {
        distance_per_tick = get_velocity() * Globals.TickInterval();
        choked_ticks = Math.ceil(64.0 / distance_per_tick);
        wish.limit = Math.min(choked_ticks, 16);
    } else {
        wish.limit = rand_int(1, 9);
    }
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", wish.limit);
}
function player_death() {
    death_angles.push(wish.real);
}
function create_move() {
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Enable riN"))
        return;
    update();
    handle_hotkeys();
    adjust_antiaim();
    adjust_lag();
    if (UI.GetValue("log"))
        Cheat.Print("#"+death_angles.toString() + "#\n");
}
function draw() {
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Enable riN") || !globals.debug)
        return;
}
Cheat.RegisterCallback("CreateMove", "create_move");
Cheat.RegisterCallback("Draw", "draw");
Cheat.RegisterCallback("player_death", "player_death");

var iLocalPlayer, iWeapon, iWeapon_name, loadFont = 0, fakelag, hitchance, mindamage, colors, lag_value = 0, switch_value = 0, framerate, fps, current_map, text_width;

function HSVtoRGB(h, s, v)
{
    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6)
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

function getCustomValue(name)
{
    var value = UI.GetValue( "JAVASCRIPT", "Script items", name);
    return value;
}

function HUD_REDRAW()
{
    iLocalPlayer = Entity.GetLocalPlayer();
 
    if(!Entity.IsValid(iLocalPlayer))    return;

    //Weapons
    iWeapon = Entity.GetWeapon(iLocalPlayer);
    iWeapon_name = Entity.GetName(iWeapon);
 
    framerate = 1 / Global.Frametime();
    fps = Math.floor(framerate);
 
    current_map = World.GetMapName();
 
    //sucks
    if(fps > 300)    fps = 300;
 
    //Good for peeking, optional
    if(getCustomValue('Randomize Fakelag by akira'))
    {
        if(switch_value == 0)
        {
            if(lag_value >= 0)    lag_value+=1*0.25;
            if(lag_value == 16)    switch_value = 1;
        }
        if(switch_value == 1)
        {
            lag_value--;
            if(lag_value == 0)    switch_value = 0;    
        }
 
        UI.SetValue( "Anti-Aim", "Fake-Lag", "Limit", lag_value);
    }    
 
    if(loadFont == 0)
    {
        font = Render.AddFont("Verdana", 8, 100)
        fontSmall = Render.AddFont("Verdana", 6, 100)
        fontNormal = Render.AddFont("Verdana", 7, 100)
        loadFont = 1;
    }
     
 
 
    x = getCustomValue("X bar");
    y = getCustomValue("Y bar");
    var height = 47
    if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))
        height += 14
    if(UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck"))
        height += 14
    if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots"))
        height += 14
    if(UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point"))
        height += 14
    var width = 197
    //grey all
    Render.FilledRect( x + 45, y , width, height, [ 40, 40, 40, 255 ] );
   
    //main
    Render.FilledRect( x + 50, y + 7, width-11, height-12 , [ 19, 19, 19, 255 ] ); // black
 
    //white
    Render.Rect( x + 50, y + 5, width-10, height-9, [ 50, 50, 50, 255 ] ); // white
    width = 93
    Render.GradientRect(x + 50, y + 5, width, 1, 1, [ 59, 175, 222, 255], [202, 70, 205, 255]);
    Render.GradientRect(x + 50 + width, y + 5, width, 1, 1, [202, 70, 205, 255], [201, 227, 58, 255]);
 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var time_to_ticks = function(a)
    {
        return Math.floor(0.5 + a / Globals.TickInterval())
    }

    fakelag = time_to_ticks(Globals.Curtime() - Entity.GetProp(Entity.GetLocalPlayer(), "DT_CSPlayer", "m_flSimulationTime")) + 1
    if(fakelag < 0)
        fakelag = 0
    if(fakelag > 16)
        fakelag = 16
    //Fakelag
    Render.StringCustom(x + 81, y + 10, 1, "Fake lag", [ 255, 255, 255,255 ], font);
 
    //grey inactive
    Render.FilledRect(x + 130, y + 16, 100, 5, [ 50, 50, 50, 255 ]);
 
    //CALCULATOR: 100/16
    Render.GradientRect( x + 130, y + 16, fakelag*6.25, 5, 0, [ 255, 255, 255, 255 ], [ 0, 0, 0, 50 ]);
 
    //Little font
    Render.StringCustom(x + 130 + fakelag*6.25, y + 16, 1, "" + fakelag, [ 255, 255, 255,255 ], fontSmall);
 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Yaw
    Render.StringCustom(x + 85, y + 24, 1, "Body yaw", [ 255, 255, 255,255 ], font);

    //grey inactive
    Render.FilledRect(x + 130, y + 30, 100, 5, [ 50, 50, 50, 255 ]);

    yawOffset = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");

    /*CALCULATOR: 100/180, so the -value should become + hehe
    if you want to numbers indicator just uncomment them*/
    if(yawOffset > 0)
    {
        Render.GradientRect( x + 130, y + 30, yawOffset*0.55, 5, 0, [ 255, 255, 255, 255 ], [ 0, 0, 0, 50 ]);
     
        //Little font
        Render.StringCustom(x + 130 + yawOffset*0.55, y + 30, 1, "" + yawOffset, [ 255, 255, 255,255 ], fontSmall);    
    }
    else if(yawOffset < 1)
    {
        Render.GradientRect( x + 130, y + 30, -yawOffset*0.55, 5, 0, [ 255, 255, 255, 255 ], [ 0, 0, 0, 50 ]);
     
        //Little font
        Render.StringCustom(x + 130 + -yawOffset*0.55, y + 30, 1, "" + yawOffset, [ 255, 255, 255,255 ], fontSmall);        
    }
 
 
    y -= 27
 
    //DT
    if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))
        Render.StringCustom(x + 87, y + 66, 1, "Double tap", [ 255, 255, 255,255 ], font);

    //ON/OFF
    if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))
        Render.StringCustom(x + 198, y + 66, 1, "[Offensive]", [ 199, 234, 70,255 ], font);
 
    if(!UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap"))
        y -= 14

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    y -= 14
    //Fakeduck
    if(UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck"))
    Render.StringCustom(x + 86, y + 94, 1, "Fake duck", [ 255, 255, 255,255 ], font);
 
    //Fakeducking state
    if(UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck"))
        Render.StringCustom(x + 218, y + 94, 1, "[On]", [ 199, 234, 70,255 ], font);
    if(!UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck"))
        y -= 14
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Hideshots
    if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots"))
        Render.StringCustom(x + 87, y + 108, 1, "Hide shots", [ 255, 255, 255,255 ], font);
 
    //Hideshots state
    if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots"))
        Render.StringCustom(x + 218, y + 108, 1, "[On]", [ 199, 234, 70,255 ], font);
    if(!UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots"))
        y -= 14
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Safe point
    if(UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point"))
        Render.StringCustom(x + 86, y + 122, 1, "Safe point", [ 255, 255, 255,255 ], font);
 
    //Safepoint state
    if(UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point"))
        Render.StringCustom(x + 218, y + 122, 1, "[On]", [ 199, 234, 70,255 ], font);
    if(!UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point"))
        y -= 14
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

function Main()
{
    //Full HD >_<
    var screensize = Global.GetScreenSize();
    UI.AddSliderInt("X bar", -45, screensize[0]);
    UI.AddSliderInt("Y bar", 0, screensize[1]);
    //123
    UI.AddCheckbox('Randomize Fakelag by akira');
    UI.AddSliderFloat('Bar color speed', 0.0, 5.0);
}

Main()

Global.RegisterCallback("Draw", "HUD_REDRAW")

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
function hitlog()
{
    me = Entity.GetLocalPlayer();
    hitbox = Event.GetInt('hitgroup');
    target_damage = Event.GetInt("dmg_health");
    victim = Event.GetInt('userid');
    attacker = Event.GetInt('attacker');
    victimIndex = Entity.GetEntityFromUserID(victim);
    attackerIndex = Entity.GetEntityFromUserID(attacker);
    name = Entity.GetName(victimIndex);
    var namee = "Octane"
 
if( UI.GetValue ( "Misc", "JAVASCRIPT", "Script Items", "Hit logs in chat" ) ){
if (me == attackerIndex && me != victimIndex) {
if( UI.GetValue ( "Misc", "JAVASCRIPT", "Script Items", "Say to all" ) ) {
Global.ExecuteCommand("say \x01[\x06" + namee + "\x01] \x04" + "\x01hurt \x04" + name + " \x01for \x04" + target_damage + " \x01in \x04" + getHitboxName(hitbox))
Global.PrintChat("\x01[\x06" + namee + "\x01] \x04" + "\x01hurt \x04" + name + " \x01for \x04" + target_damage + " \x01in \x04" + getHitboxName(hitbox))
}else{
    Global.PrintChat("\x01[\x06" + namee + "\x01] \x04" + "\x01hurt \x04" + name + " \x01for \x04" + target_damage + " \x01in \x04" + getHitboxName(hitbox))
}
}
}
}
function main()
{
UI.AddCheckbox("Hit logs in chat");
UI.AddCheckbox("Say to all");
Global.RegisterCallback("player_hurt", "hitlog");
}
main();