

//region main
const global = this;
//endregion

//region Menu
UI.AddCheckbox("On peek utilities");
UI.AddCheckbox("On peek anti-aim");
UI.AddDropdown("On peek fake-lag", ["Maximum", "Random"]);
UI.AddSliderInt("Default choke amount", 1, 14);
//endregion

//region Functions
//region Math
function radToDeg(radians) {
    return radians * 180 / Math.PI;
}
//endregion

//region Utilities
var Cache = {
    values: []
};

Cache.InvokeCallback = function(label, state, func, args) {
    if (this.values[label] == null)
        this.values[label] = null;
    
    if (this.values[label] === state)
        return;
    
    this.values[label] = state;

    func.apply(null, args);
}

function Format(string, values) {
    const array = string.split("%");
    const final_string = array[0];

    if (array.length - 1 != values.length)
        throw new Error("[Format] The amount of placeholders does not match the amount of values.");

    for (var i = 1; i < array.length; i++) 
        final_string += values[i - 1] + array[i];

    return final_string;
}

function Hook(name) {
    const split = name.split("hk")[1];
    
    Cheat.Print(Format("[ % ] Successfully hooked %!\n", [global.__filename, split]));
    Cheat.RegisterCallback(split, name);
}

var ticks = 0;
function Choke(choke, send) {
    if (ticks < choke) {
        ticks++;

        UserCMD.Choke();
        return;
    }

    if (ticks >= choke && ticks < choke + send) {
        ticks++;

        UserCMD.Send();
        return;
    }

    ticks = 0;
}
//endregion

//region Targeting
var Targeting = {};

Targeting.FindOptimalTarget = function() {
    const players = Entity.GetEnemies();
    const me = Entity.GetLocalPlayer();

    if (!me || !Entity.IsAlive(me))
        return null;

    const eye_position = Entity.GetEyePosition(me);
    const view_angles = Local.GetViewAngles();

    var data = {fov: 180, id: null};

    for (var i = 0; i < players.length; i++) {
        const e = players[i];

        if (!Entity.IsAlive(e) || Entity.IsDormant(e))
            continue;

        const head_position = Entity.GetHitboxPosition(e, 0);
        const sub = [head_position[0] - eye_position[0], head_position[1] - eye_position[1], head_position[2] - eye_position[2]];
        
        const pitch = -radToDeg(Math.atan2(sub[2], Math.sqrt(sub[0] ** 2 + sub[1] ** 2)));
        const yaw = radToDeg(Math.atan2(sub[1], sub[0]));

        const delta_x = Math.abs(view_angles[0] - pitch);
        const delta_y = Math.abs(view_angles[1] % 360 - yaw % 360) % 360;

        const fov = Math.sqrt(delta_x * delta_x + delta_y * delta_y);

        if (fov < data.fov) {
            data.fov = fov;
            data.id = e;
        }
    }

    return data.id;
}
//endregion

//region Prediction
var Prediction = {
    hitboxMap: [0, 3, 6],
    was_peeking: false
};

Prediction.PredictMovement = function(e, ticks) {
    const origin = Entity.GetRenderOrigin(e);
    const velocity = Entity.GetProp(e, "CBasePlayer", "m_vecVelocity[0]");

    const TICK_INTERVAL = Globals.TickInterval();

    origin[2] += 32;

    origin[0] += velocity[0] * TICK_INTERVAL * ticks;
    origin[1] += velocity[1] * TICK_INTERVAL * ticks;
    origin[2] += velocity[2] * TICK_INTERVAL * ticks;

    return origin;
}

Prediction.IsPeeking = function(ticks) {
    const me = Entity.GetLocalPlayer();

    if (!me || !Entity.IsAlive(me))
        return false;
    
    const extrapolated_origin = this.PredictMovement(me, ticks);
    this.origin = extrapolated_origin;

    const target = Targeting.FindOptimalTarget();

    if (!target || !Entity.IsAlive(target))
        return false;

    if (this.was_peeking && Globals.ChokedCommands() < ticks)
        return true;

    for (var i = 0; i < this.hitboxMap.length; i++) {
        const hitbox = this.hitboxMap[i];

        const hitbox_position = Entity.GetHitboxPosition(target, hitbox);

        const line = Trace.Line(me, extrapolated_origin, hitbox_position);

        if (line[0] < 0.98 && this.was_peeking)
        {
            this.was_peeking = false;

            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "On peek anti-aim"))
                UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
                
            return false;
        }

        if (line[0] > 0.98 && !this.was_peeking)
        {
            this.was_peeking = true;
            return true;
        }
    }

    return false;
}
//endregion

//region Callbacks
var once = true;

function hkCreateMove() {
    const random = Math.ceil(Math.random() * 14);
    const amount = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "On peek fake-lag") === 0 ? 14 : random;

    const peeking = Prediction.IsPeeking(amount);
    
    UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", false);
    
    if (peeking)
    {
        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "On peek anti-aim") && once)
        {
            UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
            once = false;
        }

        Choke(amount);
        return;
    }

    once = true;

    Choke(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Default choke amount"));
} Hook("hkCreateMove");
//endregion
//endregion