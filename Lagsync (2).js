// Js by soft#1488
// Js by soft#1488
// Js by soft#1488
// Js by soft#1488
// Js by soft#1488
// Js by soft#1488
// Js by soft#1488
function addtomenu(){
//    UI.AddSliderInt("YAW Offset #1",-180, 180);
 //   UI.AddSliderInt("JITTER Offset #1",-180, 180);
 //   UI.AddSliderInt("YAW Offset #2",-180, 180);
 //   UI.AddSliderInt("JITTER Offset #2",-180, 180);
 //   UI.AddSliderInt("YAW Offset #3",-180, 180);
 //   UI.AddSliderInt("JITTER Offset #3",-180, 180);
    UI.AddSliderInt("                  ", 0, 0);
    UI.AddLabel("-------soft#1488-------");
    UI.AddDropdown( "Lagsync", [ "Off", "On"] );
	UI.AddDropdown( "Lagsync mode", [ "Off", "Lagsync V1", "Lagsync V2", "Lagsync V3" ] );
	UI.AddDropdown( "Breaker", [ "Off", "Breaker V1", "Breaker V2" ] );
	UI.AddLabel("-------soft#1488-------");
	UI.AddSliderInt("                  ", 0, 0);
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

// -------------------------------------------------------------------- LAGSYNC V1 --------------------------------------------------------------------

function V1(){
	// Disable Breaker
	UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Breaker", 0);
	
	// Fake Angles
	
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", -10);
	UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
	UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", false);
	UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 0);
	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", true);
	
	// Fake Lag
	
	UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 15);
	
}
function V2(){
	
	// Fake Angles
	
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", -25);
	UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 1);
	
	// Fake Lag
	
	UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 5);
	
}
function V3(){
	
	// Fake Angles
	
//	UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 1);
	UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);
	UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", false);
	UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
	
	// Fake Lag
	
	UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 9);
	
}

// -------------------------------------------------------------------- LAGSYNC V2 --------------------------------------------------------------------

function S1(){
	// Disable Breaker
	UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Breaker", 0);

	yawnewoffset = randomIntFrom(-10, -20);
	
	// Fake Angles
	
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
	UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", false);
	UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);
	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", true);
    UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
	
}
function S2(){
	// Disable Breaker

	yawnewoffset = randomIntFrom(-10, -20);

	UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Breaker", 0);
		UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
	UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);
	
	// Fake Angles
	
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
	
}

// -------------------------------------------------------------------- LAGSYNC V3 --------------------------------------------------------------------

function A1(){
	// Disable Breaker
	UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Breaker", 0);
	
	yawnewoffset = randomIntFrom(-20, 20);
	
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
	UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
	UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);
	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", true);
	UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
	
	// Fake Lag
	
	UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 15);
	
}
function A2(){
	// Disable Breaker
	UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Breaker", 0);
	
	yawnewoffset = randomIntFrom(-20, 20);
	
	// Fake Angles
	
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
	UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", false);
	UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 1);
	UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
	
	// Fake Lag
	
	UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 5);
	
}
function A3(){
	// Disable Breaker
	UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Breaker", 0);
	
	yawnewoffset = randomIntFrom(-20, 20);
	
	// Fake Angles
	
	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
    UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);
	UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
	UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
	
	// Fake Lag
	
	UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 9);
	
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------- Breaker V1 --------------------------------------------------------------------

function BR1(){
	// Disable Lagsync
	UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Lagsync mode", 0);
	
	yawnewoffset = randomIntFrom(-10, -20);
	
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
	UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
	UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 0);
	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", true);
	UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
	
	// Fake Lag
	
	UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 15);
	
}
function BR2(){
	// Disable Lagsync
	UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Lagsync mode", 0);
	
	yawnewoffset = randomIntFrom(-15, -25);
	
	// Fake Angles
	
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
	UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
	UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 1);
	UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", false);
	
	// Fake Lag
	
	UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 5);
	
}
function BR3(){
	// Disable Lagsync
	UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Lagsync mode", 0);

	yawnewoffset = randomIntFrom(-10, -10);
	
	// Fake Angles
	
	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
    UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);
	UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
	UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
	
	// Fake Lag
	
	UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 9);
	
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------- Breaker V2 --------------------------------------------------------------------

function BRR1(){
	// Disable Lagsync
	UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Lagsync mode", 0);
	
	yawnewoffset = randomIntFrom(-10, -34);
	
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
	UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
	UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);
	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", true);
	UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
	
	// Fake Lag
	
	UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 15);
	
}
function BRR2(){
	// Disable Lagsync
	UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Lagsync mode", 0);
	
	yawnewoffset = randomIntFrom(-16, -7);
	
	// Fake Angles
	
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
	UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", false);
	UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);
	UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
	
	// Fake Lag
	
	UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 5);
	
}
function BRR3(){
	// Disable Lagsync
	UI.SetValue("Misc", "JAVASCRIPT", "Script Items","Lagsync mode", 0);
	
	yawnewoffset = randomIntFrom(2, -4);
	
	// Fake Angles
	
	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawnewoffset);
    UI.SetValue("Anti-Aim", "Fake angles", "LBY mode", 2);
	UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", true);
	UI.SetValue("Anti-Aim", "Fake angles", "Avoid overlap", true);
	
	// Fake Lag
	
	UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 9);
	
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

addtomenu();
UI.SetValue("Misc", "JAVASCRIPT", "Script Items","YAW Offset #1",yawoffset);
UI.SetValue("Misc", "JAVASCRIPT", "Script Items","JITTER Offset #1",jitteroffset);
//UI.SetValue("Misc", "JAVASCRIPT", "Script Items","YAW Offset #2",yawoffset);
//UI.SetValue("Misc", "JAVASCRIPT", "Script Items","JITTER Offset #2",jitteroffset);
//UI.SetValue("Misc", "JAVASCRIPT", "Script Items","YAW Offset #3",yawoffset);
//UI.SetValue("Misc", "JAVASCRIPT", "Script Items","JITTER Offset #3",jitteroffset);
//UI.SetValue("Misc", "JAVASCRIPT", "Script Items","SWITCH delay",de);
//Global.RegisterCallback("Draw", "main")
Global.RegisterCallback("Draw", "lagsyncmain")