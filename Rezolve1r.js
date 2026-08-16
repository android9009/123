var alpha = 0;
var size = 0;
// Js by unknown creator
// Js by unknown creator
// Js by unknown creator
// Js by unknown creator
// Js by unknown creator
// Js by unknown creator
// Js by unknown creator
function addtomenu(){
//    UI.AddSliderInt("YAW Offset #1",-180, 180);
 //   UI.AddSliderInt("JITTER Offset #1",-180, 180);
 //   UI.AddSliderInt("YAW Offset #2",-180, 180);
 //   UI.AddSliderInt("JITTER Offset #2",-180, 180);
 //   UI.AddSliderInt("YAW Offset #3",-180, 180);
 //   UI.AddSliderInt("JITTER Offset #3",-180, 180);
    UI.AddLabel("                  REZOLVER           ");
    UI.AddLabel("                   Antiaim            ");
    UI.AddSliderInt("Antiaim_x", 0, Global.GetScreenSize()[0]);
    UI.AddSliderInt("Antiaim_y", 0, Global.GetScreenSize()[1]);
    UI.AddSliderInt("                  ", 0, 0);
    UI.AddLabel("--------------------------");
    UI.AddDropdown( "Lagsync", [ "0", "1"] );
    UI.AddDropdown( "Lagsync mode", [ "Off", "v1", "v2", "v3" ] );
    UI.AddLabel("--------------------------");
    UI.AddSliderInt("                  ", 0, 0);
const time = UI.AddSliderFloat("Effect duration", 0, 2);
    UI.AddDropdown( "Breaker", [ "Off", "Lag V1", "Lag V2" ] );
 //   UI.AddSliderFloat("SWITCH delay",0, 5);
}
var aa=1;
var aad=1;
var lasttime = Global.Realtime();
var realtime = Global.Realtime();
var yawoffset =UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
var jitteroffset =UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
var de=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","SWITCH delay");
var status=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","SWITCH Way");
var yawnewoffset;

function randomIntFrom(min,max) // Get a random integer from [min] to [max]
{
    return Math.floor(Math.random()*(max-min+1)+min);
}




//Бля дру ненадо сюда лесть!!!!!!!!!!!
const normal_killsays = ["вставить текст \"" ];
  
const hs_killsays = ["вставить текст"];

const on_player_death = function()
{
    if(true)
    {
        
        {
            Cheat.ExecuteCommand("say " + (Event.GetInt("headshot") == 1 && Math.random() > 0.5 ? hs_killsays[Math.floor(Math.random() * hs_killsays.length)] : normal_killsays[Math.floor(Math.random() * normal_killsays.length)]));
        }
    }
};

Cheat.Print("trashtalk js loaded, killsay count: " + normal_killsays.length + hs_killsays.length + "\n");
Cheat.RegisterCallback("player_death", "on_player_death");




// -------------------------------------------------------------------- LAGSYNC V1 --------------------------------------------------------------------

function V1(){

    
    // Fake Angles
    
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", -30);

    UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 20);

    
    // Fake Lag
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 150);
    
}
function V2(){
    
    // Fake Angles
    
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 10);
    UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 100);
    
    // Fake Lag
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 20);
    
}
function V3(){
    
    // Fake Angles
    
//    UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 1);
    UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 200);

    
    // Fake Lag
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 1);

    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 40);
    UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 100);
    
}

// -------------------------------------------------------------------- LAGSYNC V2 --------------------------------------------------------------------

function S1(){
    UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Breaker", 0);
    
    // Fake Angles
    
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", -10);

    UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 20);

    
    // Fake Lag
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 7);

    

    
}
function S2(){
    // Disable Breaker

    yawnewoffset = randomIntFrom(-50, 50);

    UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Breaker", 0);

    UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 20);
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 3);    
    // Fake Angles
    
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
    
}

// -------------------------------------------------------------------- LAGSYNC V3 --------------------------------------------------------------------

function A1(){

    
    yawnewoffset = randomIntFrom(-200, 200);
    
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
    
    UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 20);

    
    // Fake Lag
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 150);
    
}
function A2(){

    
    yawnewoffset = randomIntFrom(-200, 200);
    
    // Fake Angles
    
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);

    UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 1);

    
    // Fake Lag
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 5);
    
}
function A3(){

    
    yawnewoffset = randomIntFrom(-20, 20);
    
    // Fake Angles
    
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
    UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);

    
    // Fake Lag
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 9);
    
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------















// -------------------------------------------------------------------- Breaker V1 --------------------------------------------------------------------

function BR1(){

    
    yawnewoffset = randomIntFrom(-10, -20);

    
    // Fake Lag
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Trigger limit", 15);
    
}
function BR2(){

    
    yawnewoffset = randomIntFrom(-15, -25);

    
    // Fake Lag
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Trigger limit", 5);
    
}
function BR3(){


    yawnewoffset = randomIntFrom(-10, -10);
    
    
    // Fake Lag
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Trigger limit", 9);
    
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------- Breaker V2 --------------------------------------------------------------------

function BRR1(){

    
    yawnewoffset11 = randomIntFrom(1, 34);
    
    // Fake Lag
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Trigger limit", yawnewoffset11);
    
}
function BRR2(){

    
    // Fake Lag
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Trigger limit", 5);
    
}
function BRR3(){

    
    yawnewoffset11 = randomIntFrom(2, 8);

    
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", yawnewoffset11);
    
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------
























function lagsyncmain() {
    mode=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","Lagsync mode");
    breakermenu=UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Breaker");
    
    if (mode==0) { lagsyncdisable(); }
    if (mode==1) { lagsyncv2(); }
    if (mode==2) { lagsyncv1(); }
    if (mode==3) { lagsyncv3(); }
    
    if (breakermenu==0) { breakerdisable(); }
    if (breakermenu==1) { breakerv1(); }
    if (breakermenu==2) { breakerv2(); }
}

function breakerv1() {
    status=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","Lagsync");
    de=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","SWITCH delay");
    realtime = Global.Realtime();
//    Global.Print(String(realtime-lasttime));
    if(realtime-lasttime>=de){
//        Global.Print(String(realtime-lasttime));
        if(status==1){
            aad=aa+1;
            if(aad>3){
                aad=1;
            }
            aa=aad;
        }
        if(aa==1){
           BR1();
        }
        if(aa==2){
            BR2();
        }
        if(aa==3){
            BR3();
        }
        lasttime = realtime;
    }
    if(realtime<lasttime){
        lasttime = Global.Realtime();
        realtime = Global.Realtime();
    }
}

function lagsyncdisable() {
    
}

function breakerv2() {
    status=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","Lagsync");
    de=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","SWITCH delay");
    realtime = Global.Realtime();
//    Global.Print(String(realtime-lasttime));
    if(realtime-lasttime>=de){
//        Global.Print(String(realtime-lasttime));
        if(status==1){
            aad=1+Math.floor(Math.random()*3);
            aa=aad;
//            Global.Print(String(aad));
        }
        if(status==2){
            aad=aa+1;
            if(aad>3){
                aad=1;
            }
            aa=aad;
//            Global.Print(String(aad));
        }
        if(aa==1){
           BRR1();
        }
        if(aa==2){
            BRR2();
        }
        if(aa==3){
            BRR3();
        }
        lasttime = realtime;
    }
    if(realtime<lasttime){
        lasttime = Global.Realtime();
        realtime = Global.Realtime();
    }
}

function breakerdisable() {
    
}

// --- THIS IS LAGSYNC V2 ---

function lagsyncv1() {
    status=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","Lagsync");
    de=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","SWITCH delay");
    realtime = Global.Realtime();
//    Global.Print(String(realtime-lasttime));
    if(realtime-lasttime>=de){
//        Global.Print(String(realtime-lasttime));
        if(status==1){
            aad=aa+1;
            if(aad>2){
                aad=1;
            }
            aa=aad;
//            Global.Print(String(aad));
        }
        if(aa==1){
           S1();
        }
        if(aa==2){
            S2();
        }
        lasttime = realtime;
    }
    if(realtime<lasttime){
        lasttime = Global.Realtime();
        realtime = Global.Realtime();
    }
}

// --- THIS IS LAGSYNC V1 ---

function lagsyncv2() {
    status=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","Lagsync");
    de=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","SWITCH delay");
    realtime = Global.Realtime();
//    Global.Print(String(realtime-lasttime));
    if(realtime-lasttime>=de){
//        Global.Print(String(realtime-lasttime));
        
        if(status==1){
            aad=aa+1;
            if(aad>3){
                aad=1;
            }
            aa=aad;
//            Global.Print(String(aad));
        }
        if(aa==1){
            V1();
        }
        if(aa==2){
            V2();
        }
        if(aa==3){
            V3();
        }
        lasttime = realtime;
    }
    if(realtime<lasttime){
        lasttime = Global.Realtime();
        realtime = Global.Realtime();
    }
}

// --- THIS IS LAGSYNC V3 ---

function lagsyncv3() {
    status=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","Lagsync");
    de=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","SWITCH delay");
    realtime = Global.Realtime();
//    Global.Print(String(realtime-lasttime));
    if(realtime-lasttime>=de){
//        Global.Print(String(realtime-lasttime));
        if(status==1){
            aad=1+Math.floor(Math.random()*3);
            aa=aad;
//            Global.Print(String(aad));
        }
        if(status==2){
            aad=aa+1;
            if(aad>3){
                aad=1;
            }
            aa=aad;
//            Global.Print(String(aad));
        }
        if(aa==1){
            A1();
        }
        if(aa==2){
            A2();
        }
        if(aa==3){
            A3();
        }
        lasttime = realtime;
    }
    if(realtime<lasttime){
        lasttime = Global.Realtime();
        realtime = Global.Realtime();
    }
}

function main(){
    status=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","Lagsync");
    de=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","SWITCH delay");
    realtime = Global.Realtime();
//    Global.Print(String(realtime-lasttime));
    if(realtime-lasttime>=de){
//        Global.Print(String(realtime-lasttime));
        if(status==1){
            aad=1+Math.floor(Math.random()*3);
            aa=aad;
//            Global.Print(String(aad));
        }
        if(status==2){
            aad=aa+1;
            if(aad>3){
                aad=1;
            }
            aa=aad;
//            Global.Print(String(aad));
        }
        if(aa==1){
            S1();
        }
        if(aa==2){
            S2();
        }
        if(aa==3){
            S3();
        }
        lasttime = realtime;
    }
    if(realtime<lasttime){
        lasttime = Global.Realtime();
        realtime = Global.Realtime();
    }
    
}







function in_bounds(vec, x, y, x2, y2) {
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

function draw_arc(x, y, radius, start_angle, percent, thickness, color) {
        var precision = (2 * Math.PI) / 30;
        var step = Math.PI / 180;
        var inner = radius - thickness;
        var end_angle = (start_angle + percent) * step;
        var start_angle = (start_angle * Math.PI) / 180;

        for (; radius > inner; --radius) {
            for (var angle = start_angle; angle < end_angle; angle += precision) {
                var cx = Math.round(x + radius * Math.cos(angle));
                var cy = Math.round(y + radius * Math.sin(angle));

                var cx2 = Math.round(x + radius * Math.cos(angle + precision));
                var cy2 = Math.round(y + radius * Math.sin(angle + precision));

                Render.Line(cx, cy, cx2, cy2, color);
            }
        }
}

function main_aa() {
    if (!World.GetServerString()) return;

    const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Antiaim_x"),
        y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Antiaim_y");

    var font = Render.AddFont("Verdana", 7, 100);
    var RealYaw = Local.GetRealYaw();
    var FakeYaw = Local.GetFakeYaw();
    var delta = Math.min(Math.abs(RealYaw - FakeYaw) / 2, 60).toFixed(1);
    var safety = Math.min(Math.round(1.7 * Math.abs(delta)), 100);
    if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
        var side = "<-";
    } else {
        var side = "->";
    }
    var text = "    FAKE (" + delta.toString() + "  ) | safety: " + safety.toString() + "% | side: " + side;
    var w = Render.TextSizeCustom(text, font)[0] + 8;

    Render.FilledRect(x - w, y, w, 2, [89, 89 + (delta / 2), 89 + (delta / 0.4), 100]);
    Render.FilledRect(x - w, y + 2, w, 18, [17, 17, 17, 111]);
    Render.StringCustom(x + 5 - w, y + 5, 0, text, [0, 0, 0, 180], font);
    Render.StringCustom(x + 4 - w, y + 4, 0, text, [255, 255, 255, 255], font);
    Render.Circle(x + 18 - w + Render.TextSizeCustom("FAKE (" + delta.toString(), font)[0], y + 8, 1, [255, 255, 255, 255]);
    draw_arc(x + 7 - w, y + 10, 5, 0, delta * 6, 2, [89, 119, 239, 255]);
    if (Global.IsKeyPressed(1) && UI.IsMenuOpen()) {
        const mouse_pos = Global.GetCursorPosition();
        if (in_bounds(mouse_pos, x - w, y, x + w, y + 30)) {
            UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Antiaim_x", mouse_pos[0] + w / 2);
            UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Antiaim_y", mouse_pos[1] - 20);
        }
    }
}


function clamp(v, min, max)
{
    return Math.max(Math.min(v, max), min);
}

/**
 * Returns the value of a script menu element
 *
 * @param element
 * @returns {*}
 */
function get(element)
{
    return UI.GetValue("Misc", "JAVASCRIPT", "Script items", element);
}

/**
 * Renders the effect
 */
function render_effect()
{
    if (alpha === 0)
        return;

    const inc_alpha = ((1 / get("Effect duration")) * Global.Frametime()) * 255
    const inc_size = ((1 / get("Effect duration")) * Global.Frametime()) * 360

    alpha = clamp(alpha - inc_alpha, 0, 255);
    size = clamp(size - inc_size, 0, 360);

    const x = Global.GetScreenSize()[0], y = Global.GetScreenSize()[1];

    Render.GradientRect(0, 0, x, size, 0, [128, 195, 255, alpha], [128, 195, 255, 0]);
    Render.GradientRect(0, y - size, x, size, 0, [128, 195, 255, 0], [128, 195, 255, alpha]);
    Render.GradientRect(x - size, 0, size, y, 1, [128, 195, 255, 0], [128, 195, 255, alpha]);
    Render.GradientRect(0, 0, size, y, 1, [128, 195, 255, alpha], [128, 195, 255, 0]);
}

/**
 * Updates rendering data
 */
function on_death()
{
    const attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    const userid = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    const player = Entity.GetLocalPlayer();

    if (attacker === player && userid != player)
    {
        alpha = 255;
        size = 360;
    }
}

//endregion

//region callbacks

// Callbacks our functions
Global.RegisterCallback("player_death", "on_death");
Global.RegisterCallback("Draw", "render_effect");

//endregion







addtomenu();
UI.SetValue("Misc", "JAVASCRIPT", "Script Items","YAW Offset #1",yawoffset);
UI.SetValue("Misc", "JAVASCRIPT", "Script Items","JITTER Offset #1",jitteroffset);
Global.RegisterCallback("Draw", "main_aa");
//UI.SetValue("Misc", "JAVASCRIPT", "Script Items","YAW Offset #2",yawoffset);
//UI.SetValue("Misc", "JAVASCRIPT", "Script Items","JITTER Offset #2",jitteroffset);
//UI.SetValue("Misc", "JAVASCRIPT", "Script Items","YAW Offset #3",yawoffset);
//UI.SetValue("Misc", "JAVASCRIPT", "Script Items","JITTER Offset #3",jitteroffset);
//UI.SetValue("Misc", "JAVASCRIPT", "Script Items","SWITCH delay",de);
//Global.RegisterCallback("Draw", "main")
Global.RegisterCallback("Draw", "lagsyncmain")