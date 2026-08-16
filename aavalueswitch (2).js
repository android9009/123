function addtomenu(){
    UI.AddSliderInt("YAW Offset #1",-180, 180);
    UI.AddSliderInt("JITTER Offset #1",-180, 180);
    UI.AddSliderInt("YAW Offset #2",-180, 180);
    UI.AddSliderInt("JITTER Offset #2",-180, 180);
    UI.AddSliderInt("YAW Offset #3",-180, 180);
    UI.AddSliderInt("JITTER Offset #3",-180, 180);
    UI.AddDropdown( "SWITCH Way", [ "off", "Random", "farword"] );
    UI.AddSliderFloat("SWITCH delay",0, 5);
}
var aa=1;
var aad=1;
var lasttime = Global.Realtime();
var realtime = Global.Realtime();
var yawoffset =UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
var jitteroffset =UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
var de=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","SWITCH delay");
var status=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","SWITCH Way");
function S1(){
//    Global.Print(String("S1"));
    yawoffset = UI.GetValue("Misc", "JAVASCRIPT", "Script Items","YAW Offset #1");
    jitteroffset = UI.GetValue("Misc", "JAVASCRIPT", "Script Items","JITTER Offset #1");
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset",yawoffset);
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset",jitteroffset);
}
function S2(){
//    Global.Print(String("S2"));
    yawoffset = UI.GetValue("Misc", "JAVASCRIPT", "Script Items","YAW Offset #2");
    jitteroffset = UI.GetValue("Misc", "JAVASCRIPT", "Script Items","JITTER Offset #2");
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset",yawoffset);
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset",jitteroffset);
}
function S3(){
//    Global.Print(String("S3"));
    yawoffset = UI.GetValue("Misc", "JAVASCRIPT", "Script Items","YAW Offset #3");
    jitteroffset = UI.GetValue("Misc", "JAVASCRIPT", "Script Items","JITTER Offset #3");
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset",yawoffset);
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset",jitteroffset);
}
function main(){
    status=UI.GetValue("Misc", "JAVASCRIPT", "Script Items","SWITCH Way");
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
Global.RegisterCallback("Draw", "main")