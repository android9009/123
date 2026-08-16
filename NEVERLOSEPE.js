//------------------------
//---created by DeLLeNN---
//-discord:  DeNRouN#8712-
//--neverlose.cc visuals--
//------------------------


var time, delay, fillbar, shotsfired;
var Xoffset = 'X offset';
var Yoffset = 'Y offset';

//Weapon fire event
function EVENT_WEAPON_FIRE()
{
    iShotsFired = Event.GetInt("userid"); iShotsFired_index = Entity.GetEntityFromUserID(iShotsFired);
 
    if(Entity.GetLocalPlayer() == iShotsFired_index)
    {
        if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap", "Enabled"))
        {
            //Released only once
            if(shotsfired == 0)
            {
                time = Globals.Curtime();
                delay = time+0.3;
                fillbar = 0;
            }            
        }    
    }    
}

//Draw
function HUD_REDRAW()
{

    const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_x"),
            y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_y");
    const x1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_x1"),
            y1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_y1");

    if(UI.GetValue( "Rage", "GENERAL", "Exploits", "Doubletap" ))
    {
        font = Render.AddFont("Verdana", 16, 500);
           const fontpixel = Render.AddFont( "Verdana", 7, 100);
     
        //Enabled
        if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap", "Enabled"))
        {
            curtime = Globals.Curtime();
         
            //>_<
            if (curtime <= delay)
            {
                fillbar+=2;
                shotsfired = 1;    
             
                //Not allowing fill more
                if(fillbar >= 30) fillbar = 30;
                 
                Render.FilledRect(x + 1674, y + 30, 230, 20, [2, 23, 37, 255]);
                Render.FilledRect(x + 1670, y + 30, 7, 20, [4, 13, 25, 255]);
                Render.StringCustom(x + 1790, y + 34, 1, "DT indicator | tickbase(0): 0 | state: 0", [255, 255, 255, 255], fontpixel);
                Render.StringCustom(Global.GetScreenSize()[0]/49+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-349+UI.GetValue(Yoffset), 1, "DT", [ 0, 0, 0, 255 ], font);  
                Render.StringCustom(Global.GetScreenSize()[0]/50+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-350+UI.GetValue(Yoffset), 1, "DT", [ 255, 0, 0, 255 ], font);  
            }
            else
            {
                Render.FilledRect(x + 1674, y + 30, 232, 20, [2, 23, 37, 255]);
                Render.FilledRect(x + 1670, y + 30, 7, 20, [4, 13, 25, 255]);
                Render.StringCustom(x + 1791, y + 34, 1, "DT indicator | tickbase(1): 16 | state: 2", [255, 255, 255, 255], fontpixel);
                Render.StringCustom(Global.GetScreenSize()[0]/49+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-349+UI.GetValue(Yoffset), 1, "DT", [ 0, 0, 0, 255 ], font);    
                Render.StringCustom(Global.GetScreenSize()[0]/50+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-350+UI.GetValue(Yoffset), 1, "DT", [ 255, 255, 255, 255 ], font);    
                shotsfired = 0;    //Released
            }    
        }
        else
        {
            //Disabled
            Render.StringCustom(Global.GetScreenSize()[0]/50+UI.GetValue(Xoffset), Global.GetScreenSize()[1]-350+UI.GetValue(Yoffset), 1, "DT", [ 255, 50, 50, 0 ], font);
        }    
    }    
}

function Main()
{
    Global.RegisterCallback("Draw", "HUD_REDRAW");
    Global.RegisterCallback("weapon_fire", "EVENT_WEAPON_FIRE");
    UI.AddSliderInt(Xoffset, -1000, 2000);
    UI.AddSliderInt(Yoffset, -1000, 1000);
}

Main();



//
     UI.AddCheckbox("Hot-Keys");
     UI.AddCheckbox("Spectator-List");
     UI.AddColorPicker("Header Text Color");
     UI.AddColorPicker("Active Text Color");
     UI.AddColorPicker("Logo Color");
     UI.AddLabel(" ");
     UI.AddColorPicker("Top Bar Color");
     UI.AddColorPicker("Bottom Bar Color");
     UI.SetColor("Script items", "Bottom Bar Color", [2, 23, 37, 255 ]);
     UI.SetColor("Script items", "Top Bar Color", [4, 13, 25, 255 ]);
     UI.SetColor("Script items", "Logo Color", [45, 121, 126, 255]);
     UI.SetColor("Script items", "Active Text Color", [255, 255, 255, 255]);
     UI.SetColor("Script items", "Header Text Color", [255, 255, 255, 255]);
     //
     const Binds_x = UI.AddSliderInt("Binds_x", 0, Global.GetScreenSize()[0])
     const Binds_y = UI.AddSliderInt("Binds_y", 0, Global.GetScreenSize()[1])
     const Bindss_x = UI.AddSliderInt("Bindss_x", +40, Global.GetScreenSize()[0])
     const Bindss_y = UI.AddSliderInt("Bindss_y", +40, Global.GetScreenSize()[1])
     UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Binds_x", false)
     UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Binds_y", false)
     UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Bindss_x", false)
     UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Bindss_y", false)
     var screensize = Global.GetScreenSize();
     //
function in_bounds(vec, x, y, x2, y2)
{
     return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}
function values(name) {
     var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", name);
     return value;
}
function HotkeyersXD() {
         const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Binds_x"),
         y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Binds_y");
         //Color
         Color = UI.GetColor("Script items","Header Text Color");
         Color2 = UI.GetColor("Script items","Active Text Color");
         ColorLogo = UI.GetColor("Script items","Logo Color");
         ColorTop = UI.GetColor("Script items","Top Bar Color");
         ColorBottom = UI.GetColor("Script items","Bottom Bar Color");

     var h = [];

     if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
       h.push("Slow walk")
     }
     if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
       h.push("Fake Duck")
     }
     if (UI.IsHotkeyActive("Misc", "General", "Movement", "Auto peek")) {
       h.push("Auto peek")
     }
     if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
       h.push("Anti-Aim invert")
     }
     if (UI.IsHotkeyActive("Rage", "General", "General", "Safe point override")) {
       h.push("Safe point override")
     }
     if (UI.IsHotkeyActive("Rage", "Pistol", "Pistol config", "Hitbox override")) {
       h.push("Hitbox override")
     }
     if (UI.IsHotkeyActive("Rage", "Pistol", "Damage", "Minimum damage (on key)")) {
       h.push("Minimum damage")
     }
     if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap")) {
       h.push("Doubletap")
     }
     if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {
       h.push("Hide shots")
     }
     if (UI.IsHotkeyActive("Legit", "GENERAL", "Triggerbot", "Enabled")) {
       h.push("Triggerbot")
     }

     if (!UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Hot-Keys"))

        return;
        //Light bottom
        Render.FilledRect(x + 78, y + 26, 250, 60 + 30 * (h.length - 1), ColorBottom);
        //Dark Top rectangle
        Render.FilledRect( x + 78, y + 26, 250, 30, ColorTop );
        //Logo
        Render.Circle( x + 94, y + 39, 6, ColorLogo );
        Render.Circle( x + 94, y + 39, 9, ColorLogo );
        Render.Circle( x + 94, y + 39, 3, ColorLogo );
        //Line top
        Render.Line( x + 93, y + 30, x + 93, y + 36, ColorLogo);
        Render.Line( x + 94, y + 30, x + 94, y + 36, ColorLogo);
        Render.Line( x + 95, y + 30, x + 95, y + 36, ColorLogo);
        //Line bottom
        Render.Line( x + 95, y + 42, x + 95, y + 48, ColorLogo);
        Render.Line( x + 94, y + 42, x + 94, y + 48, ColorLogo);
        Render.Line( x + 93, y + 42, x + 93, y + 48, ColorLogo);
        //line left
        Render.Line( x + 85, y + 38, x + 91, y + 38, ColorLogo);
        Render.Line( x + 85, y + 39, x + 91, y + 39, ColorLogo);
        Render.Line( x + 85, y + 40, x + 91, y + 40, ColorLogo);
        //Line Right
        Render.Line( x + 97, y + 38, x + 103, y + 38, ColorLogo);
        Render.Line( x + 97, y + 39, x + 103, y + 39, ColorLogo);
        Render.Line( x + 97, y + 40, x + 103, y + 40, ColorLogo);
        //Binds text
        Render.String(x + 110, y + 33, 0, "Binds", Color, 4, 3);
        //Logo ENd
      
        //Render Active Keybind
     for (i = 0; i < h.length; i++) {
        Render.String(x + 80, y + 65 + 25 * i, 0, h[i], Color2,4, 3);
        Render.String(x + 273, y + 65 + 25 * i, 0, "toggled", Color2,4, 3);
     }
        //Move menu
        if (Global.IsKeyPressed(1)) {
         const mouse_pos = Global.GetCursorPosition();
         if (in_bounds(mouse_pos, x, y, x + 320, y + 110)) {
          if (UI.IsMenuOpen( ) == false)
            return;
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Binds_x", mouse_pos[0] - 200);
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Binds_y", mouse_pos[1] - 60);
         }
     }

}
function get_spectators() {
    var specs = [];
    const players = Entity.GetPlayers();
    for (i = 0; i < players.length; i++) {
        const cur = players[i];
        if (Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget") != "m_hObserverTarget") {
            const obs = Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget")

            if (obs === Entity.GetLocalPlayer())
            {
                const name = Entity.GetName(cur);
                specs.push(name);
            }}}
return specs;
}
function Spectatorss() {
        const names = get_spectators();
         const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Bindss_x"),
         y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Bindss_y");
         //Color
         Color = UI.GetColor("Script items","Header Text Color");
         Color2 = UI.GetColor("Script items","Active Text Color");
         ColorLogo = UI.GetColor("Script items","Logo Color");
         ColorTop = UI.GetColor("Script items","Top Bar Color");
         ColorBottom = UI.GetColor("Script items","Bottom Bar Color");

        if (!UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Spectator-List"))

        return;
        //Light bottom
        Render.FilledRect(x + 78, y + 26, 125, 60 + 30 * (names.length - 1), ColorBottom);
        //Dark Top rectangle
        Render.FilledRect( x + 78, y + 26, 125, 30, ColorTop );
        //Logo
        Render.Circle( x + 94, y + 39, 6, ColorLogo );
        Render.Circle( x + 94, y + 39, 9, ColorLogo );
        Render.Circle( x + 94, y + 39, 3, ColorLogo );
        //Line top
        Render.Line( x + 93, y + 30, x + 93, y + 36, ColorLogo);
        Render.Line( x + 94, y + 30, x + 94, y + 36, ColorLogo);
        Render.Line( x + 95, y + 30, x + 95, y + 36, ColorLogo);
        //Line bottom
        Render.Line( x + 95, y + 42, x + 95, y + 48, ColorLogo);
        Render.Line( x + 94, y + 42, x + 94, y + 48, ColorLogo);
        Render.Line( x + 93, y + 42, x + 93, y + 48, ColorLogo);
        //line left
        Render.Line( x + 85, y + 38, x + 91, y + 38, ColorLogo);
        Render.Line( x + 85, y + 39, x + 91, y + 39, ColorLogo);
        Render.Line( x + 85, y + 40, x + 91, y + 40, ColorLogo);
        //Line Right
        Render.Line( x + 97, y + 38, x + 103, y + 38, ColorLogo);
        Render.Line( x + 97, y + 39, x + 103, y + 39, ColorLogo);
        Render.Line( x + 97, y + 40, x + 103, y + 40, ColorLogo);
        //Spectators text
        Render.String(x + 110, y + 33, 0, "Spectators", Color, 4, 3);
      
        //Logo ENd
      
        //Render Active Keybind
        for (i = 0; i < names.length; i++){
         Render.String(x + 80, y + 65 + 25 * i, 0, names[i], [255, 255, 255, 255],4, 3);
     }
 
        //Move menu
        if (Global.IsKeyPressed(1)) {
         const mouse_pos = Global.GetCursorPosition();
         if (in_bounds(mouse_pos, x + 50, y + 20, x + 220, y + 60)) {
          if (UI.IsMenuOpen( ) == false)
            return;
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Bindss_x", mouse_pos[0] - 140);
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Bindss_y", mouse_pos[1] - 35);
         }
     }

}



Global.RegisterCallback("Draw", "Spectatorss");
Global.RegisterCallback("Draw", "HotkeyersXD");

/**
* kymiko's gs watermark
* last update 23 04 20
*/

function main()
{
  var watermark_name = Entity.GetName(Entity.GetLocalPlayer( ));
  var today = new Date();
  var hours1 = today.getHours();
  var minutes1 = today.getMinutes();
  var seconds1 = today.getSeconds();
  var localplayer_index = Entity.GetLocalPlayer();
  var velocity = Entity.GetProp(localplayer_index, "CBasePlayer", "m_vecVelocity[0]");
  var speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
  var finalspeed = Math.min( 9999, speed ) + 0.2
  var hours = hours1 <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":";
  var minutes = minutes1 <= 9 ? "0" + today.getMinutes() + ":" : today.getMinutes() + ":";
  var seconds = seconds1 <= 9 ? "0" + today.getSeconds() : today.getSeconds()    ;
  const tickrate = Globals.Tickrate();
   const ping = Math.floor(Global.Latency() * 1000 / 1.5);
   const fps = Math.floor( 1 / Global.Frametime() );
   const fontpixel = Render.AddFont( "Verdana", 7, 100);
   const fontpixel2 = Render.AddFont( "Verdana", 8, 100);
   const server_name = World.GetServerString();


    // Get our drawing properties
    const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_x"),
            y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_y");
    const x1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_x1"),
            y1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "watermark_y1");

    // Rainbow color for our bar
    const rainbow = [
        Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 4) * 127 + 128),
        255
    ];


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

    // skeetwater by kymiko
    Render.FilledRect(x + 1350, y + 7, 550, 20, [2, 23, 37, 255]);
    Render.FilledRect(x + 1350, y + 2, 550, 7, [4, 13, 25, 255]);
    Render.StringCustom(x + 1360, y + 9, 0, "neverlose.cc [alpha] | RezolveR | "+ server_name +" | delay: " + ping + "ms | " + tickrate + "tick | " + hours + minutes + seconds, [255, 255, 255, 255], fontpixel);


}
//endregion

//region callbacks

// Callback our main function
Global.RegisterCallback("Draw", "main")
//Global Variables
const hitgroup = ['head', 'neck', 'pelvis', 'body', 'stomach', 'chest', 'upper chest', 'left thigh', 'right thigh', 'left calf', 'right calf', 'left foot', 'right foot', 'left hand', 'right hand', 'left upper arm', 'left forearm', 'right upper arm', 'right forearm'];

const activeLogs = [];

const ragebotTarget = {};

UI.AddColorPicker("Hitlog Color");

//Check if color is unset
var color = UI.GetColor("MISC", "JAVASCRIPT", "Script Items", "Hitlog Color");
if (color[0] === 0 && color[1] === 0 && color[2] === 0 && color[3] === 0)
    UI.SetColor("MISC", "JAVASCRIPT", "Script Items", "Hitlog Color", [32, 213, 225, 255]);


/**
 * Description returns width of multi colored text lines
 * @param {array}   lines  (0 == color, 1 == text);
 */

function getMultiColorTextSize(lines) {
    var w = 0;
    for (var x = 0; x < lines.length; x++) {
        w += Render.TextSize(lines[x][1], 8)[0];
    }
    return w;
}

/**
 * Description draws Multiple text with different color
 * @param {int}      x      x cords
 * @param {number}   y      y cords
 * @param {array}   lines  (0 == color, 1 == text);
 */
function drawMultiColorText(x, y, lines) {
    var x_pad = 0;
    for (var i = 0; i < lines.length; i++) {
        const line = lines[i];
        const text = line[1];
        var color = line[0];
        if (typeof line[0] == "number") {
            color = UI.GetColor("MISC", "JAVASCRIPT", "Script Items", "Hitlog Color");
        }
        Render.String(x + x_pad, y, 0, text, color, 8);
        const w = Render.TextSize(text, 8)[0];
        x_pad += w;
    }
}


/**
 * Description Displays the log detail on screen
 * @param {int}      count      Index of the log.
 * @param {number}   layer      Log Details .
 */
function showLog(count, layer) {
    const text = layer.text;
    const w = getMultiColorTextSize(text);
    const expiry = Global.Realtime() < layer.delay;
    const y = 26 + (26 * (count - 1));
    const h = 6;
    const logW = (w < 0) ? 0 : (w + 50);
    const speed = 10;
    const layerSize = 4;

    layer.firstLayer = expiry ? Math.min(layer.firstLayer + logW * 0.025, logW + layerSize) : Math.max(layer.firstLayer - speed, 0);
    layer.secondLayer = expiry ? Math.min(layer.secondLayer + logW * 0.025, logW) : Math.max(layer.secondLayer - 1 * speed, 0);
    var color = UI.GetColor("MISC", "JAVASCRIPT", "Script Items", "Hitlog Color");
    Render.FilledRect(layer.firstLayer - layer.firstLayer, y, layer.firstLayer, h + 20, color);
    Render.FilledRect(layer.secondLayer - layer.secondLayer, y, layer.secondLayer, h + 20, [5, 21, 39, 255]);

    drawMultiColorText(layer.secondLayer - logW + 5, y + 2 + 6, text);
    activeLogs[count] = layer;
    if (layer.secondLayer === 0) {
        activeLogs.splice(count, 1);
    }
}

function onDraw() {
    for (var x = 0; x < activeLogs.length; x++) {
        showLog(x, activeLogs[x]);
    }
}

function onRagebotFire() {
    ragebotTarget[Entity.GetName(Event.GetInt("target_index"))] = {
        hitgroup: hitgroup[Event.GetInt("hitbox")],
        hc: Event.GetInt("hitchance"),
        safepoint: Event.GetInt("safepoint"),
        exploit: Event.GetInt("exploit")
    }
}

function onPlayerHurt() {
    const attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    const victim = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    const victimName = Entity.GetName(victim);
    if (attacker === Entity.GetLocalPlayer() && victim !== Entity.GetLocalPlayer()) {
        const target = ragebotTarget[victimName];
        if (target != null) {
            const hitMessage = [
                [[255, 255, 255, 255], " You did "],
                [[255, 255, 255, 255], Event.GetInt("dmg_health").toString()],
                [[255, 255, 255, 255], " damage"],
                [[255, 255, 255, 255], " to "],
                [[255, 255, 255, 255], victimName.substring(0, 12)],
                [[255, 255, 255, 255], " in "],
                [[255, 255, 255, 255], target.hitgroup],
                [[255, 255, 255, 255], "  "],
            ];
            activeLogs.push({
                    text: hitMessage,
                    delay: Global.Realtime() + 7,
                    firstLayer: 0,
                    secondLayer: 0
                }
            );
        }
    }
}


//Register Callbacks
Global.RegisterCallback("Draw", "onDraw");
Global.RegisterCallback("ragebot_fire", "onRagebotFire");
Global.RegisterCallback("player_hurt", "onPlayerHurt");



UI.AddDropdown( "Custom ClanTag", [ "Disabled", "Neverlose"] );
UI.AddSliderInt( "Custom ClanTag Speed", 1, 10 );
var lasttime = 0;
function onRender( )
{
    var tag = UI.GetValue( "Script Items", "Custom ClanTag" );
    var speed = UI.GetValue( "Script Items", "Custom ClanTag Speed" );
    var time = parseInt((Globals.Curtime() * speed))
    if (time != lasttime)
    {
        if(tag == 0) { Local.SetClanTag(""); }
        if(tag == 1)
            {
            switch((time) % 53)
            {
                case 1: { Local.SetClanTag("  "); break; }
                case 2: { Local.SetClanTag(" | "); break; }
                case 3: { Local.SetClanTag(" |\\ "); break; }
                case 4: { Local.SetClanTag(" |\\| "); break; }
                case 5: { Local.SetClanTag(" N "); break; }
                case 6: { Local.SetClanTag(" N3 "); break; }
                case 7: { Local.SetClanTag(" Ne "); break; }
                case 8: { Local.SetClanTag(" Ne\\ "); break; }
                case 9: { Local.SetClanTag(" Ne\\/ "); break; }
                case 10: { Local.SetClanTag(" Nev "); break; }
                case 11: { Local.SetClanTag(" Nev3 "); break; }
                case 12: { Local.SetClanTag(" Neve "); break; }
                case 13: { Local.SetClanTag(" Neve| "); break; }
                case 14: { Local.SetClanTag(" Neve|2 "); break; }
                case 15: { Local.SetClanTag(" Never|_ "); break; }
                case 16: { Local.SetClanTag(" Neverl "); break; }
                case 17: { Local.SetClanTag(" Neverl0 "); break; }
                case 18: { Local.SetClanTag(" Neverlo "); break; }
                case 19: { Local.SetClanTag(" Neverlo5 "); break; }
                case 20: { Local.SetClanTag(" Neverlos "); break; }
                case 21: { Local.SetClanTag(" Neverlos3 "); break; }
                case 22: { Local.SetClanTag(" Neverlose "); break; }
                case 23: { Local.SetClanTag(" Neverlose. "); break; }
                case 24: { Local.SetClanTag(" Neverlose.< "); break; }
                case 25: { Local.SetClanTag(" Neverlose.c< "); break; }
                case 26: { Local.SetClanTag(" Neverlose.cc "); break; }
                case 27: { Local.SetClanTag(" Neverlose.cc "); break; }
                case 28: { Local.SetClanTag(" Neverlose.c< "); break; }
                case 29: { Local.SetClanTag(" Neverlose.< "); break; }
                case 30: { Local.SetClanTag(" Neverlose. "); break; }
                case 31: { Local.SetClanTag(" Neverlose "); break; }
                case 32: { Local.SetClanTag(" Neverlos3 "); break; }
                case 33: { Local.SetClanTag(" Neverlos "); break; }
                case 34: { Local.SetClanTag(" Neverlo5 "); break; }
                case 35: { Local.SetClanTag(" Neverlo "); break; }
                case 36: { Local.SetClanTag(" Neverl0 "); break; }
                case 37: { Local.SetClanTag(" Neverl "); break; }
                case 38: { Local.SetClanTag(" Never|_ "); break; }
                case 39: { Local.SetClanTag(" Never|2 "); break; }
                case 40: { Local.SetClanTag(" Neve|2 "); break; }
                case 41: { Local.SetClanTag(" Neve| "); break; }
                case 42: { Local.SetClanTag(" Neve "); break; }
                case 43: { Local.SetClanTag(" Nev3 "); break; }
                case 44: { Local.SetClanTag(" Nev "); break; }
                case 45: { Local.SetClanTag(" Ne\\/ "); break; }
                case 46: { Local.SetClanTag(" Ne\\ "); break; }
                case 47: { Local.SetClanTag(" Ne "); break; }
                case 48: { Local.SetClanTag(" N3 "); break; }
                case 49: { Local.SetClanTag(" N "); break; }
                case 50: { Local.SetClanTag(" |\\| "); break; }
                case 51: { Local.SetClanTag(" |\\ "); break; }
                case 52: { Local.SetClanTag(" | "); break; }
                case 53: { Local.SetClanTag("  "); break; }
			
			
            }
        }
    }
    lasttime = time;
}
Cheat.RegisterCallback("Draw", "onRender");
