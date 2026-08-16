UI.AddCheckbox("Enable riN");
UI.AddLabel("#                Anti-Aimbot                 #")
UI.AddCheckbox("Adjust Anti-Aimbot");
UI.AddHotkey("Anti-Aimbot Side Switch");
UI.AddLabel("#                Lag Amount                  #");
UI.AddCheckbox("Adjust Lag Amount");
function get_velocity() {
    velocity = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_vecVelocity[0]");
    speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
    return speed;
}
function rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
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
    wish.side = UI.IsHotkeyActive("Misc", "Javascript", "Script items", "Anti-Aimbot Side Switch") ? 1 : 0;
    local.shifting = Input.IsKeyPressed(0x10) ? true : false;// ensure you use misc->accurate walk
    local.in_air = Input.IsKeyPressed(0x20) ? true : false; // ¯\_(ツ)_/¯
}
function adjust_antiaim() {
    if (!UI.GetValue("Misc", "Javascript", "Script items", "Adjust Anti-Aimbot"))
        return;
  
    if (local.shifting) {
        if (get_velocity() > 2) {
            wish.lby = -140;
            wish.real = globals.tick_count % 2 ? rand_int(-55, -22) : rand_int(22, 55);
        }
    }
    else {
        if (wish.side == 0) {
            wish.lby = 120;
            wish.real = globals.tick_count % 12 ? wish.real : wish.real + -11;
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
    if (!UI.GetValue("Misc", "Javascript", "Script items", "Adjust Lag Amount"))
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
function create_move() {
    if (!UI.GetValue("Misc", "Javascript", "Script items", "Enable riN"))
        return;
    update();
    handle_hotkeys();
    adjust_antiaim();
    adjust_lag();
}
Cheat.RegisterCallback("CreateMove", "create_move");