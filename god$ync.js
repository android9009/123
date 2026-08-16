UI.AddLabel("--------------GOD$YNC---------------");

UI.AddLabel(" ");


var logs = [];

const log = function(text, time){
    this.text = text
    this.time = time
}

const hitboxes = [ "generic", "head", "chest", "stomach", "left arm", "right arm", "left leg", "right leg", "body" ];

const get_hitbox = function(i){ return hitboxes[i] || "Generic" };

const hitlogs = function(){
    const uid = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    const attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    const text = "[GOD$YNC] yebal " + Entity.GetName(uid) + " na " + Event.GetInt("dmg_health") + " v " + get_hitbox(Event.GetInt("hitgroup"));

    if(Entity.IsLocalPlayer(attacker) && attacker != uid) logs.push(new log(text, Globals.Tickcount()));
}

const draw = function(){
    const font = Render.AddFont("Calibri", 10, 100);

    for (var i in logs){
        Render.StringCustom(6, 6 - (i * -15), 0, logs[i].text, [255, 255, 255, 255], font);
        if (logs[i].time + 300 < Globals.Tickcount()) logs.shift();
    }
}

Cheat.RegisterCallback("Draw", "draw");
Cheat.RegisterCallback("player_hurt", "hitlogs");



//indicators----------------------------------------
UI.AddLabel("--------------INDICATORS--------------");
UI.AddCheckbox("INDICATORS");
UI.AddCheckbox("FD");
UI.AddCheckbox("DT");
UI.AddCheckbox("HS");
UI.AddCheckbox("Baim");
UI.AddCheckbox("SP");

UI.AddLabel(" ");

var hitboxes_caches = [UI.GetValue("Rage", "GENERAL", "Targeting", "Hitboxes"), UI.GetValue("Rage", "PISTOL", "Targeting", "Hitboxes"), UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Hitboxes"), UI.GetValue("Rage", "SCOUT", "Targeting", "Hitboxes"), UI.GetValue("Rage", "AWP", "Targeting", "Hitboxes"), UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Hitboxes")];
var multi_hitboxes_caches = [UI.GetValue("Rage", "GENERAL", "Targeting", "Multipoint hitboxes"), UI.GetValue("Rage", "PISTOL", "Targeting", "Multipoint hitboxes"), UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Multipoint hitboxes"), UI.GetValue("Rage", "SCOUT", "Targeting", "Multipoint hitboxes"), UI.GetValue("Rage", "AWP", "Targeting", "Multipoint hitboxes"), UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Multipoint hitboxes")];

var dmg_caches = [UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage"), UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage"), UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage"), UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")];

UI.AddLabel("---------------Anti Aim--------------");

//legit aa per <key>----------------------------------------
UI.AddHotkey("Legit AA");

//hitbox override----------------------------------------
UI.AddHotkey("Head override");

//dmg render-------------------------------------------
UI.AddCheckbox("Min Dmg");
UI.AddHotkey("Dmg Key");
UI.AddSliderInt("HEAVY PISTOL", 0, 130);
UI.AddSliderInt("SCOUT", 0, 130);
UI.AddSliderInt("AWP", 0, 130);
UI.AddSliderInt("AUTOSNIPER", 0, 130);

//lowdelta-----------------------------------------------



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

       if (lowdelta_dropdown_value & (1 << 1) && health < 80)
       LowHP = true
       else
       LowHP = false

       if (lowdelta_dropdown_value & (1 << 2) && velocity < 5)
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
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 15);
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 3);
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(0);
            AntiAim.SetRealOffset(-27);
        }
        else
        {
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 7);
            AntiAim.SetOverride(0);
        }
}

function drawString()
{
    const fontpixel = Render.AddFont( "Verdana", 8, 100);
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
       Render.StringCustom(screen_size[0] /2 , screen_size[1] /2 +25, 1, "LOW DELTA", [ 255, 0, 0, 255 ], fontpixel );
    }
}
Cheat.RegisterCallback("CreateMove", "Low_delta");


Cheat.RegisterCallback("CreateMove", "Low_delta");




UI.AddLabel("---------------Anti Aim--------------");

UI.AddLabel(" ");

function menu_visibality()
{
    var enable_indicators = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "INDICATORS");
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "FD", enable_indicators);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "DT", enable_indicators);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "HS", enable_indicators);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Baim", enable_indicators);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "SP", enable_indicators);

    var enable_dmg = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Min Dmg");
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Dmg Key", enable_dmg);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "HEAVY PISTOL", enable_dmg);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "SCOUT", enable_dmg);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "AWP", enable_dmg);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "AUTOSNIPER", enable_dmg);

    var enable_ar = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Aspect Ratio");
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Aspect Ratio Value", enable_ar);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "1.33 is 4:3                  1.77 is 16:9", enable_ar);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "4:3 mode", enable_ar);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "16:9 mode", enable_ar);

    var enable_wm = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Watermark");
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Rainbow watermark", enable_wm);
}

function main()
{
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", 0);
    menu_visibality();

//indicators----------------------------------------
    var enable = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "INDICATORS");
    if (enable && World.GetServerString())
    {
        var screen = Global.GetScreenSize();
        var height = screen[0];
        var width = screen[1];
        var fd = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "FD");
        var dt = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "DT");
        var hs = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "HS");
        var bm = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Baim");
        var sp = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "SP");
        var md = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Min Dmg");
        var font = Render.AddFont("Monotype Coursiva", 8, 700); //
        var aa_over = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
        var legit_aa = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Legit AA");

        Render.StringCustom(height / 1000 - 70, width / 2, 0, "GODSYNC", [ 255, 225, 255, 255 ], font);

        if (!legit_aa)
        {
            if (aa_over) Render.StringCustom(height / 2 - 13, width / 2 + 12, 0, "Left", [ 245, 184, 243, 255 ], font); else Render.StringCustom(height / 2 - 15, width / 2 + 12, 0, "Right", [ 245, 184, 243, 255 ], font);
        }
        else
        {
            if (!aa_over) Render.StringCustom(height / 2 - 13, width / 2 + 12, 0, "Left", [ 245, 184, 243, 255 ], font); else Render.StringCustom(height / 2 - 15, width / 2 + 12, 0, "Right", [ 245, 184, 243, 255 ], font);
        }

        if (legit_aa) Render.StringCustom(height / 2 - 25, width / 2 + 24, 0, "Legit AA", [ 0, 106, 255, 255 ], font); else Render.StringCustom(height / 2 - 25, width / 2 + 24, 0, "Rage AA", [ 255, 0, 0, 255 ], font);

        if (fd)
        {
            if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) Render.StringCustom(height / 2 - 8, width / 2 + 36, 0, "FD", [ 255, 255, 255, 255 ], font);
        }

        if (dt)
        {
            var dt_height = 36;
            chargestate = Exploit.GetCharge();
            if (fd && UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) dt_height += 12;
            if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap") && chargestate == 1) Render.StringCustom(height / 2 - 8, width / 2 + dt_height, 0, "DT", [ 0, 255, 0, 255 ], font); else Render.StringCustom(height / 2 - 8, width / 2 + dt_height, 0, "DT", [ 255, 0, 0, 255 ], font);
        }

        if (hs)
        {
            var hs_height = 36;
            if (fd && UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) hs_height += 12;
            if (dt) hs_height += 12; 
            if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots") && !UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap")) Render.StringCustom(height / 2 - 8, width / 2 + hs_height, 0, "HS", [ 0, 255, 0, 255 ], font); else Render.StringCustom(height / 2 - 8, width / 2 + hs_height, 0, "HS", [ 255, 0, 0, 255 ], font);
        }

        if (bm)
        {
            var bm_height = 36;
            if (fd && UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) bm_height += 12;
            if (dt) bm_height += 12; 
            if (hs) bm_height += 12; 
            if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim")) Render.StringCustom(height / 2 - 13, width / 2 + bm_height, 0, "Baim", [ 255, 162, 0, 255 ], font);
        }

        if (sp)
        {
            var sp_height = 36;
            if (fd && UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) sp_height += 12;
            if (dt) sp_height += 12; 
            if (hs) sp_height += 12; 
            if (bm && UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim")) sp_height += 12;
            if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point")) Render.StringCustom(height / 2 - 8, width / 2 + sp_height, 0, "SP", [ 0, 106, 255, 255 ], font);
        }
    }

//legit aa per <key>----------------------------------------
    if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Legit AA"))
    {
        UI.SetValue("Misc", "PERFOMANCE & INFORMATION", "Information", "Restrictions", 0);
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 180);
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", 0);
        UI.SetValue("Anti-Aim", "Extra", "Pitch", 0);
    }
    else
    {
        UI.SetValue("Anti-Aim", "Extra", "Pitch", 1);
        UI.SetValue("Misc", "PERFOMANCE & INFORMATION", "Information", "Restrictions", 1);
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0);
    }
    
//Head override----------------------------------------

    if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Head override"))
    {
        UI.SetValue("Rage", "GENERAL", "Targeting", "Hitboxes", 1);
        UI.SetValue("Rage", "GENERAL", "Targeting", "Multipoint hitboxes", 1);
        UI.SetValue("Rage", "PISTOL", "Targeting", "Hitboxes", 1);
        UI.SetValue("Rage", "PISTOL", "Targeting", "Multipoint hitboxes", 1);
        UI.SetValue("Rage", "HEAVY PISTOL", "Targeting", "Hitboxes", 1);
        UI.SetValue("Rage", "HEAVY PISTOL", "Targeting", "Multipoint hitboxes", 1);
        UI.SetValue("Rage", "SCOUT", "Targeting", "Hitboxes", 1);
        UI.SetValue("Rage", "SCOUT", "Targeting", "Multipoint hitboxes", 1);
        UI.SetValue("Rage", "AWP", "Targeting", "Hitboxes", 1);
        UI.SetValue("Rage", "AWP", "Targeting", "Multipoint hitboxes", 1);
        UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Hitboxes", 1);
        UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Multipoint hitboxes", 1);
        var ho_height = 36;
        if (fd && UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) ho_height += 12;
        if (dt) ho_height += 12; 
        if (hs) ho_height += 12; 
        if (bm && UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim")) ho_height += 12;
        if (sp && UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point")) ho_height += 12;
        Render.StringCustom(height / 2 - 45, width / 2 + ho_height, 0, "Head Override", [ 0, 106, 255, 255 ], font);
    }
    else
    {
        UI.SetValue("Rage", "GENERAL", "Targeting", "Hitboxes", hitboxes_caches[0]);
        UI.SetValue("Rage", "GENERAL", "Targeting", "Multipoint hitboxes", multi_hitboxes_caches[0]);
        UI.SetValue("Rage", "PISTOL", "Targeting", "Hitboxes", hitboxes_caches[1]);
        UI.SetValue("Rage", "PISTOL", "Targeting", "Multipoint hitboxes", multi_hitboxes_caches[1]);
        UI.SetValue("Rage", "HEAVY PISTOL", "Targeting", "Hitboxes", hitboxes_caches[2]);
        UI.SetValue("Rage", "HEAVY PISTOL", "Targeting", "Multipoint hitboxes", multi_hitboxes_caches[2]);
        UI.SetValue("Rage", "SCOUT", "Targeting", "Hitboxes", hitboxes_caches[3]);
        UI.SetValue("Rage", "SCOUT", "Targeting", "Multipoint hitboxes", multi_hitboxes_caches[3]);
        UI.SetValue("Rage", "AWP", "Targeting", "Hitboxes", hitboxes_caches[4]);
        UI.SetValue("Rage", "AWP", "Targeting", "Multipoint hitboxes", multi_hitboxes_caches[4]);
        UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Hitboxes", hitboxes_caches[5]);
        UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Multipoint hitboxes", multi_hitboxes_caches[5]);
    }
//dmg render-------------------------------------------
    var md_height = 36;
    if (fd && UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) md_height += 12;
    if (dt) md_height += 12; 
    if (hs) md_height += 12; 
    if (bm && UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim")) md_height += 12;
    if (sp && UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point")) md_height += 12;
    if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Head override")) md_height += 12;
    if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Dmg Key") && md) Render.StringCustom(height / 2 - 15, width / 2 + md_height, 0, "DMG", [ 255, 255, 255, 255 ], font);

//dmg render-------------------------------------------
    if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Dmg Key"))
    {
        var dmg = [UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "HEAVY PISTOL"), UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "SCOUT"), UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "AWP"), UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "AUTOSNIPER")];
        UI.SetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage", dmg[0]);
        UI.SetValue("Rage", "SCOUT", "Targeting", "Minimum damage", dmg[1]);
        UI.SetValue("Rage", "AWP", "Targeting", "Minimum damage", dmg[2]);
        UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage", dmg[3]);
    }
    else
    {
        UI.SetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage", dmg_caches[0]);
        UI.SetValue("Rage", "SCOUT", "Targeting", "Minimum damage", dmg_caches[1]);
        UI.SetValue("Rage", "AWP", "Targeting", "Minimum damage", dmg_caches[2]);
        UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage", dmg_caches[3]);
    }

    onRender();
}

Cheat.RegisterCallback("Draw", "main");

//lowdelta-----------------------------------------------
var jitter_cache = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
var yaw_cache = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");

function Safe_Head()
{
    localplayer_index = Entity.GetLocalPlayer( );


        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "LowDelta on slow walk") && UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk") && UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Legit AA"))
        {
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 180);
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", 0);
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(0);
            AntiAim.SetRealOffset(-30);
        }
        else if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "LowDelta on slow walk") && UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk") && !UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Legit AA"))
        {
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 10);
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", 0);
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(0);
            AntiAim.SetRealOffset(-30);
        }
        else if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "LowDelta on slow walk") && UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk") && UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Legit AA"))
        {
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_cache);
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", 0);
            AntiAim.SetOverride(0);
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

UI.AddLabel("-----------------OFFSET-----------------");

//watermark
UI.AddCheckbox("Watermark");
UI.AddCheckbox("Rainbow watermark");
function watermark() {
  var enable_wm = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Watermark");
  if (!enable_wm) return 0;
  UI.SetValue("Misc", "PERFOMANCE & INFORMATION", "Information", "Watermark", false);
  var username = Cheat.GetUsername();
  var today = new Date();
  var hours1 = today.getHours();
  var minutes1 = today.getMinutes();
  var seconds1 = today.getSeconds();
  var hours = hours1 <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":";
  var minutes = minutes1 <= 9 ? "0" + today.getMinutes() + ":" : today.getMinutes() + ":";
  var seconds = seconds1 <= 9 ? "0" + today.getSeconds() : today.getSeconds();
  const tickrate = Globals.Tickrate();
  const ping = Math.floor(Global.Latency() * 1000 / 1.5);
  const fontpixel = Render.AddFont("Verdana", 7, 100);



  const screen = Render.GetScreenSize();

  var x = screen[0] - 24 * 6 - username.length * 6;
  var x_watermark = screen[0] - 24 * 6 - username.length * 6;

  const rainbow = [
      Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
      Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
      Math.floor(Math.sin(Global.Realtime() * 2 + 4) * 127 + 128),
      255
  ];

  var is_rainbow = [210, 54, 227, 255];
  if (UI.GetValue("Script items", "Rainbow watermark")){
    is_rainbow = rainbow;
  }else{
    is_rainbow = [210, 54, 227, 255];
  }

  var string = "GOD$YNC | " + username;

  if (World.GetServerString())
  {
        string += " | " + ping + "ms";
        x -= 40;
        x_watermark -= 40;
  }

  Render.FilledRect(x - 4, 5, x_watermark, 20, [15, 15, 15, 150]);
  Render.FilledRect(x - 4, 5, x_watermark, 2, is_rainbow);
  Render.StringCustom(x - 2, 9, 0, string + " | " + hours + minutes + seconds, [255, 255, 255, 255], fontpixel);


}
Global.RegisterCallback("Draw", "watermark");

//animfucker-------------------------------------------
UI.AddCheckbox("Animfucker");

var clock = 0;

function anim()
{
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Animfucker"))
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
}

Cheat.RegisterCallback("CreateMove", "anim");

//aspectratio------------------------------------
UI.AddCheckbox("Aspect Ratio")
UI.AddSliderFloat("Aspect Ratio Value",1.0,2.0);
UI.AddLabel("1.33 is 4:3                  1.77 is 16:9");
UI.AddCheckbox("4:3 mode");
UI.AddCheckbox("16:9 mode");

var aspect_cache = 0;

function aspect(){
    var on = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Aspect Ratio");
    if (on)
    {    
        var aspect_slider = UI.GetValue("Aspect Ratio Value");
        var cht = UI.GetValue("4:3 mode");
        var shd = UI.GetValue("16:9 mode");

        aspect_on = 1;
        
        
        if (cht != 0) {
            UI.SetValue("Aspect Ratio Value", 1.3);
            UI.SetValue("4:3 mode", 0);
        }
        
        if (shd != 0) {
            UI.SetValue("Aspect Ratio Value", 1.7);
            UI.SetValue("16:9 mode", 0);
        }
        
        if (aspect_cache != aspect_slider) {
            aspect_cache = aspect_slider;
            UI.SetValue("Misc", "GENERAL", "Miscellaneous", "Hidden cvars", 1);
            Global.ExecuteCommand("r_aspectratio " + aspect_slider);
        }
    }
}

Cheat.RegisterCallback("CreateMove","aspect");

var _0x1822=['inferno_expire','AddSliderInt','RegisterCallback','','smokegrenade_detonate','length','GetInt','entityid','Draw','splice','Molotov\x20radius\x20color','GetFloat','JAVASCRIPT','round_start','WorldToScreen','GetValue','position','cos','clearData','AddCheckbox','molotovExpire','Script\x20items','Smoke\x20radius\x20color','Smoke\x20line\x20color','push','Enable\x20molotov\x20radius','smokeStart','GetColor','Line','AddColorPicker','inferno_startburn','Misc','smokeExpire','Enable\x20smoke\x20radius','entity'];(function(_0x12b85e,_0x2c4bb0){var _0x18221a=function(_0x33ca10){while(--_0x33ca10){_0x12b85e['push'](_0x12b85e['shift']());}};_0x18221a(++_0x2c4bb0);}(_0x1822,0x1ef));var _0x33ca=function(_0x12b85e,_0x2c4bb0){_0x12b85e=_0x12b85e-0xf9;var _0x18221a=_0x1822[_0x12b85e];return _0x18221a;};var _0x1a8785=_0x33ca;function draw_circle_3d(_0x52f437,_0xb0782c,_0x45c1ed,_0x438242,_0x985376,_0x1542d4,_0x2b9f97,_0x20052e){var _0x111702=_0x33ca,_0x4ab0b0=0x8,_0x56feff,_0x58bc78;_0x985376=_0x985376<0x169&&_0x985376||0x168,_0x985376=_0x985376>-0x1&&_0x985376||0x0,_0x1542d4=_0x1542d4+0x1;for(rot=_0x1542d4;rot<_0x985376+_0x1542d4+0x1;rot+=_0x1542d4*_0x4ab0b0){rot_r=rot*(Math['PI']/0xb4),(line_x=_0x438242*Math[_0x111702(0x105)](rot_r)+_0x52f437,line_y=_0x438242*Math['sin'](rot_r)+_0xb0782c);var _0x4dc08c=Render[_0x111702(0x102)]([line_x,line_y,_0x45c1ed]),_0x3f0f06=Render[_0x111702(0x102)]([_0x52f437,_0xb0782c,_0x45c1ed]);_0x3f0f06[0x0]!=null&&_0x4dc08c[0x0]!=null&&_0x56feff!=null&&(Render['Polygon']([[_0x4dc08c[0x0],_0x4dc08c[0x1]],[_0x56feff,_0x58bc78],[_0x3f0f06[0x0],_0x3f0f06[0x1]]],_0x20052e),Render[_0x111702(0x110)](_0x4dc08c[0x0],_0x4dc08c[0x1],_0x56feff,_0x58bc78,_0x2b9f97)),_0x56feff=_0x4dc08c[0x0],_0x58bc78=_0x4dc08c[0x1];}}var _0x5edc=[_0x1a8785(0x11a),'AddLabel'];(function(_0xe169af,_0xc83372){var _0x1609d1=function(_0x320833){var _0xc4fd5b=_0x33ca;while(--_0x320833){_0xe169af[_0xc4fd5b(0x10c)](_0xe169af['shift']());}};_0x1609d1(++_0xc83372);}(_0x5edc,0x188));var _0x4820=function(_0x5162b5,_0xf5f845){_0x5162b5=_0x5162b5-0x199;var _0x491254=_0x5edc[_0x5162b5];return _0x491254;},_0x406c32=_0x4820,_0x4247=[_0x406c32(0x199)],_0x6556=[_0x4247[0x0]];UI[_0x406c32(0x19a)](_0x6556[0x0]),UI[_0x1a8785(0x107)](_0x1a8785(0x10d)),UI[_0x1a8785(0x111)]('Molotov\x20line\x20color'),UI[_0x1a8785(0x111)](_0x1a8785(0xfe)),UI[_0x1a8785(0x118)]('',0x0,0x0),UI[_0x1a8785(0x107)]('Enable\x20smoke\x20radius'),UI[_0x1a8785(0x111)](_0x1a8785(0x10b)),UI[_0x1a8785(0x111)](_0x1a8785(0x10a));var molotov=[];const molotovStart=function(){var _0x186769=_0x1a8785;entity=Event[_0x186769(0xfa)](_0x186769(0xfb)),x=Event[_0x186769(0xff)]('x'),y=Event[_0x186769(0xff)]('y'),z=Event['GetFloat']('z'),molotov[_0x186769(0x10c)]({'entity':entity,'position':[x,y,z]});},molotovExpire=function(){var _0x4e826c=_0x1a8785;for(var _0x105476=0x0;_0x105476<molotov[_0x4e826c(0xf9)];_0x105476++){molotov[_0x105476][_0x4e826c(0x116)]==Event[_0x4e826c(0xfa)](_0x4e826c(0xfb))&&molotov[_0x4e826c(0xfd)](_0x105476,0x1);}},molotovDraw=function(){var _0xb1eaac=_0x1a8785;if(!UI[_0xb1eaac(0x103)](_0xb1eaac(0x113),_0xb1eaac(0x100),_0xb1eaac(0x109),_0xb1eaac(0x10d)))return;for(var _0x4c5da4=0x0;_0x4c5da4<molotov[_0xb1eaac(0xf9)];_0x4c5da4++){vecOrigin=molotov[_0x4c5da4][_0xb1eaac(0x104)];const _0x1e564d=UI[_0xb1eaac(0x10f)](_0xb1eaac(0x113),_0xb1eaac(0x100),_0xb1eaac(0x109),'Molotov\x20line\x20color'),_0x58fed8=UI[_0xb1eaac(0x10f)](_0xb1eaac(0x113),_0xb1eaac(0x100),_0xb1eaac(0x109),_0xb1eaac(0xfe));draw_circle_3d(vecOrigin[0x0],vecOrigin[0x1],vecOrigin[0x2],0xa0,0x168,0x0,[_0x1e564d[0x0],_0x1e564d[0x1],_0x1e564d[0x2],_0x1e564d[0x3]],[_0x58fed8[0x0],_0x58fed8[0x1],_0x58fed8[0x2],_0x58fed8[0x3]]);}};var smoke=[];const smokeStart=function(){var _0x5c36e4=_0x1a8785;entity=Event[_0x5c36e4(0xfa)](_0x5c36e4(0xfb)),x=Event[_0x5c36e4(0xff)]('x'),y=Event[_0x5c36e4(0xff)]('y'),z=Event['GetFloat']('z'),smoke[_0x5c36e4(0x10c)]({'entity':entity,'position':[x,y,z]});},smokeExpire=function(){var _0x427231=_0x1a8785;for(var _0x20ddfc=0x0;_0x20ddfc<smoke['length'];_0x20ddfc++){smoke[_0x20ddfc]['entity']==Event[_0x427231(0xfa)](_0x427231(0xfb))&&smoke[_0x427231(0xfd)](_0x20ddfc,0x1);}},smokeDraw=function(){var _0x5e7e75=_0x1a8785;if(!UI[_0x5e7e75(0x103)](_0x5e7e75(0x113),_0x5e7e75(0x100),'Script\x20items',_0x5e7e75(0x115)))return;for(var _0x4db20e=0x0;_0x4db20e<smoke[_0x5e7e75(0xf9)];_0x4db20e++){vecOrigin=smoke[_0x4db20e]['position'];const _0xb858bd=UI[_0x5e7e75(0x10f)]('Misc','JAVASCRIPT',_0x5e7e75(0x109),_0x5e7e75(0x10b)),_0x3e354d=UI[_0x5e7e75(0x10f)](_0x5e7e75(0x113),_0x5e7e75(0x100),'Script\x20items','Smoke\x20radius\x20color');draw_circle_3d(vecOrigin[0x0],vecOrigin[0x1],vecOrigin[0x2],0xa0,0x168,0x0,[_0xb858bd[0x0],_0xb858bd[0x1],_0xb858bd[0x2],_0xb858bd[0x3]],[_0x3e354d[0x0],_0x3e354d[0x1],_0x3e354d[0x2],_0x3e354d[0x3]]);}},onDraw=function(){molotovDraw(),smokeDraw();},clearData=function(){var _0x4d2cdd=_0x1a8785;for(var _0x54d50e=0x0;_0x54d50e<molotov[_0x4d2cdd(0xf9)];_0x54d50e++){molotov[_0x4d2cdd(0xfd)](_0x54d50e,0x1);}for(var _0x54d50e=0x0;_0x54d50e<smoke['length'];_0x54d50e++){smoke[_0x4d2cdd(0xfd)](_0x54d50e,0x1);}};Cheat[_0x1a8785(0x119)](_0x1a8785(0x101),_0x1a8785(0x106)),Cheat['RegisterCallback'](_0x1a8785(0x11b),_0x1a8785(0x10e)),Cheat['RegisterCallback']('smokegrenade_expired',_0x1a8785(0x114)),Cheat[_0x1a8785(0x119)](_0x1a8785(0x112),'molotovStart'),Cheat[_0x1a8785(0x119)](_0x1a8785(0x117),_0x1a8785(0x108)),Cheat[_0x1a8785(0x119)](_0x1a8785(0xfc),'onDraw');
UI.AddLabel(" ");



UI.AddLabel("--------------GOD$YNC---------------");


//Cheat.RegisterCallback("Draw", "onRender");