UI.AddSliderInt("", 0, 0);
UI.AddLabel("Dota Killstreaks by MikiMiki");
UI.AddCheckbox("Enable Dota Killstreaks");
UI.AddSliderInt("", 0, 0);

// Made by MikiMiki

var kills = 0;

function killstreakHandler() {
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable Dota Killstreaks")) return;
    if (Entity.GetEntityFromUserID(Event.GetInt("attacker")) != Entity.GetLocalPlayer()) return;

    if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) {
        kills = 0;
        return;
    }

    kills += 1

    switch (kills) {
        case 3:
            playSound("killing_spree");
            started = Globals.Realtime();
            image = "killing_spree";
            break;
        case 4:
            playSound("dominating");
            started = Globals.Realtime();
            image = "dominating";
            break;
        case 5:
            playSound("mega_kill");
            started = Globals.Realtime();
            image = "mega_kill";
            break;
        case 6:
            playSound("unstoppable")
            started = Globals.Realtime();
            image = "unstoppable";
            break;
        case 7:
            playSound("wicked_sick");
            started = Globals.Realtime();
            image = "wicked_sick";
            break;
        case 8:
            playSound("monster_kill");
            started = Globals.Realtime();
            image = "monster_kill";
            break;
        case 9:
            playSound("godlike");
            started = Globals.Realtime();
            image = "godlike";
            break;
        case 10:
            playSound("holy_shit")
            started = Globals.Realtime();
            image = "holy_shit";
            break;
    }
}

function playSound(filename) {
    Sound.Play("C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\ot\\scripts\\killstreaks\\" + filename + ".wav");
}

function reset() {
    kills = 0;
}

var image = null;
var duration = 3;
var started = 0;

function drawBanner() {
    currentTime = Globals.Realtime();

    if (image != null && (currentTime - started) <= duration) {
        screen_size = Render.GetScreenSize();
        banner = Render.AddTexture("ot/scripts/killstreaks/" + image + ".png");
        Render.TexturedRect(randomInt((screen_size[0] / 3 + 78), 722), randomInt((screen_size[1] / 8), 140), 480, 240, banner);
    }
    else {
        image = null;
    }
}

function randomInt(min, max) {
    return Math.round(Math.random() * (max - min + 1) + min);
}

Global.RegisterCallback("player_death", "killstreakHandler");
Global.RegisterCallback("round_end", "reset");
Global.RegisterCallback("Draw", "drawBanner");