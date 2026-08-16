localplayer_index = Entity.GetLocalPlayer( );
localplayer_alive = Entity.IsAlive( localplayer_index );
var next_tick_should_fakelag = true;
tickrate = Globals.Tickrate();
tickcount = 0;
var Lim = UI.GetValue("Anti-Aim", "Fake-Lag", "Limit");
count = 0;
Lim = 0;
yaw_add = 0;

// menu
UI.AddLabel("-----[HARDLINE]-----");
UI.AddLabel("My ds Muiqy#0110");
UI.AddCheckbox("Start");
UI.AddSliderInt("Wait Time", 0, tickrate);
UI.AddHotkey("Invert Switch");
UI.AddLabel("-------------------");
// end region

function fire(){
    var ent = Entity.GetEntityFromUserID(Event.GetInt("userid"))
    if(ent != Entity.GetLocalPlayer())
        return
    next_tick_should_fakelag = false
}

function randomIntFrom(min,max) // Get a random integer from [min] to [max]
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function aa(){
    AntiAim.SetOverride(1);
    start = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Start");
    wait_ticks = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Wait Time");
    invert_switch = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Invert Switch");
    UI.SetValue("Anti-Aim", "Fake angles", "Fake desync", false);
    realrndmyaw = 0;
    fakerndmyaw = 0;

    if (!start)
    return;

    if (!invert_switch){
        AntiAim.SetFakeOffset(30);
        AntiAim.SetRealOffset(-30);
        AntiAim.SetLBYOffset(90);
    }
    else{
        AntiAim.SetFakeOffset(-30);
        AntiAim.SetRealOffset(30);
        AntiAim.SetLBYOffset(-90);
    }

    if (tickcount >= wait_ticks){
        if (count = 0){
            Lim = 0;
            if (!invert_switch){
                AntiAim.SetFakeOffset(randomIntFrom(15, 30));
                AntiAim.SetRealOffset(-30);
                AntiAim.SetLBYOffset(90);
            }
            else{
                AntiAim.SetFakeOffset(randomIntFrom(-30, -15));
                AntiAim.SetRealOffset(30);
                AntiAim.SetLBYOffset(-90);
            }
        }

        if (count = 1){
            Lim = 14;
            realrndmyaw = randomIntFrom(-38, 38);
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", realrndmyaw);
            if (!invert_switch){
                AntiAim.SetFakeOffset(0);
                AntiAim.SetRealOffset(randomIntFrom(-20, 20));
                AntiAim.SetLBYOffset(0);
            }
            else{
                AntiAim.SetFakeOffset(0);
                AntiAim.SetRealOffset(randomIntFrom(-20, 20));
                AntiAim.SetLBYOffset(0);
            }
        }

        count = count + 1;

        if (count > 1)
        count = 0;
    }
    else {
        Lim = Lim + 1;
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yaw_add);
    }

    if (!invert_switch)
    yaw_add = yaw_add + 1;

    if (invert_switch)
    yaw_add = yaw_add - 1;

    if (Lim > 14)
        Lim = 0;

    if (yaw_add > 14 || yaw_add < -14)
        yaw_add = 0;

    tickcount = tickcount + 1;

    if (tickcount > tickrate){
        tickcount = 0;
    }

    // Fake Lag
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", Lim);

    UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", true)
    if(!next_tick_should_fakelag)
    {
        UserCMD.Choke(0);
        UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", false)
        next_tick_should_fakelag = true
    }
}

Cheat.RegisterCallback("CreateMove", "aa");
Cheat.RegisterCallback("weapon_fire", "fire")