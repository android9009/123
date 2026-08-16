const hotkey = UI.AddHotkey('Auto-Smoke');
const actions = [
    [function() {Cheat.ExecuteCommand('use weapon_smokegrenade')}, 50],
    [function() {Cheat.ExecuteCommand('+attack2')}, 10],
    [function() {angles = Local.GetViewAngles(); Local.SetViewAngles([90, angles[1], angles[2]])}, 0],
    [function() {Cheat.ExecuteCommand('-attack2')}, 7],
    [function() {Local.SetViewAngles(angles)}, 0],
    [function() {Cheat.ExecuteCommand('slot3')}, 0],
    [function() {Cheat.ExecuteCommand('slot2')}, 0],
    [function() {Cheat.ExecuteCommand('slot1')}, 0]
];
const next = 0, angles = [], current = -1;

function on_tick() {
    if (current == -1 || Globals.Tickcount() <= next) return;
    actions[current][0]();
    next = Globals.Tickcount() + actions[current][1] * (Globals.Tickrate()/64);
    if (++current == actions.length) {
        next = 0;
        current = -1;
    }
} Cheat.RegisterCallback('CreateMove', 'on_tick');

function molotov_detonated() {
    if (!UI.IsHotkeyActive.apply(this, hotkey) || !Entity.IsAlive(Entity.GetLocalPlayer())) return;
    if (~Entity.GetTeammates().indexOf(Entity.GetEntityFromUserID(Event.GetInt('userid'))) && !Entity.IsLocalPlayer(Entity.GetEntityFromUserID(Event.GetInt('userid')))) return;
    const player_pos = Entity.GetRenderOrigin(Entity.GetLocalPlayer());
    const magnitude = Math.sqrt((Event.GetFloat('x') - player_pos[0]) ** 2 + (Event.GetFloat('y') - player_pos[1]) ** 2);
    if (magnitude <= 175 && Math.abs(Event.GetFloat('z') - player_pos[2]) <= 300) current = 0;
} Cheat.RegisterCallback('molotov_detonate', 'molotov_detonated');

function on_draw() {
    Render.String(0, 500, 0, 'Auto-Smoke', [0, 255, 0, UI.IsHotkeyActive.apply(this, hotkey) ? 255 : 0], 16)
} Cheat.RegisterCallback('Draw', 'on_draw');