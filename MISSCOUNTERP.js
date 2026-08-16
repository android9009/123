UI.AddLabel("--------------------------------------");
const active = UI.AddCheckbox("Activate Miss Counter");

var target = -1;
var shots_fired = 0;
var hits = 0;
var lastUpdate = 0;
var logged = false;
var jumping = false;

function getValue(val) {
    return UI.GetValue.apply(null, val);
}

function rb_fire() {
    if (!getValue(active)) return;
    target = Event.GetInt("target_index");
    shots_fired++;
    logged = false;
    lastUpdate = Globals.Curtime();
    jumping = (Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_fFlags", "FL_ONGROUND") == 256) ? true : false;
}

function p_hurt() {
    if (!getValue(active)) return;
    hit = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    if (attacker == Entity.GetLocalPlayer() && hit == target) hits++;
}

function draw() {
    fonte = Render.AddFont("Segoe UI", 12, 300);
    x = Render.GetScreenSize()[0];
    y = Render.GetScreenSize()[1];
    if (!getValue(active)) return;
    if (shots_fired > hits && (Globals.Curtime() - lastUpdate > 0.05)) {
        if (Globals.Curtime() - lastUpdate > 1) {
            shots_fired = 0;
            hits = 0;
        }
        if (jumping) {
            Render.StringCustom(x / 2 + 2, y / 2 + 4, 1, "Missed cuz jumping like a monkey", [0, 0, 0, 255], fonte);
            Render.StringCustom(x / 2, y / 2 + 2, 1, "Missed cuz jumping like a monkey", [255, 0, 0, 255], fonte);
            Sound.Play("ambient\\office\\button1");
        } else if (Globals.Curtime() - lastUpdate > 0.05) {
            Render.StringCustom(x / 2 + 2, y / 2 + 4, 1, "Missed cuz bad", [0, 0, 0, 255], fonte);
            Render.StringCustom(x / 2, y / 2 + 2, 1, "Missed cuz bad", [255, 0, 0, 255], fonte);
        }
        if (!logged) {
            if (jumping) {
                logged = true;
                Cheat.PrintColor([45, 45, 45, 255], "[");
                Cheat.PrintColor([255, 0, 0, 255], "RAGE");
                Cheat.PrintColor([45, 45, 45, 255], "]");
                Cheat.PrintColor([255, 255, 255, 255], " - ");
                Cheat.PrintColor([0, 150, 0, 255], "Missed due to ");
                Cheat.PrintColor([100, 0, 0, 255], "jumping like the monkey you are.\n");
                return;
            }
            logged = true;
            Cheat.PrintColor([45, 45, 45, 255], "[");
            Cheat.PrintColor([255, 0, 0, 255], "RAGE");
            Cheat.PrintColor([45, 45, 45, 255], "]");
            Cheat.PrintColor([255, 255, 255, 255], " - ");
            Cheat.PrintColor([0, 150, 0, 255], "Missed due to ");
            Cheat.PrintColor([100, 0, 0, 255], "being so fucking bad.\n");
        }
    }
}

Cheat.RegisterCallback("ragebot_fire", "rb_fire");
Cheat.RegisterCallback("player_hurt", "p_hurt");
Cheat.RegisterCallback("Draw", "draw");