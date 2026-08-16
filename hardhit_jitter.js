var master = {
    dir: "back",
    cycle: false,
    iteration: 0,
    showArrows: false,
    showCycle: false,
    showDegree: false,
    showInverted: false,
    getJitter: function() { return UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset") },
    setJitter: function(jitter) { return UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter) },
    getJitterValue: function() { return UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Jitter Value") },
    getJitterRandom: function() { return UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Jitter Random") },
    leftPressed: function() { return UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Left") },
    backPressed: function() { return UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Back") },
    rightPressed: function() { return UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script Items", "Right") },
    getYaw: function() { return UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset") },
    setYaw: function(yaw) { return UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yaw) },
    getAAInvert: function() { return UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter") },
    setAAInvert: function() { return UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter") },
    getWidth: function() { return UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "[CJitter] Jitter Width") },
    getFreq: function() { return UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "[CJitter] Jitter Frequency") },
    getRandom: function() { return UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Yaw Randomization") },
    getInvert: function() { return UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "[CJitter] Auto-Inverter") },
    getVisuals: function() { return UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "[CJitter] Visuals") },
    setVisible: function() {
        var selected = master.getVisuals();
        var alias = {
            [1]: "showArrows",
            [2]: "showCycle",
            [4]: "showDegree",
            [8]: "showInverted"
        }, binaries = [8, 4, 2, 1];

        for (i in binaries) {
            i = binaries[i];

            if (selected - i >= 0) {
                selected -= i;
                master[alias[i]] = true;
            } else {
                master[alias[i]] = false;
            }
        }
    }
}

var colors = {
    neg: [255, 255, 255, 255],
    pos: [250, 161, 255, 255]
}

function ui() {
    UI.AddSliderInt(" ", 0, 0);
    UI.AddSliderInt("LBY's Jitter Script", 0, 0);
    UI.AddSliderInt("Jitter Value", 0, 180);
    UI.AddSliderInt("Jitter Random", 0, 180);
    UI.AddSliderInt("Yaw Randomization", 0, 180);
    UI.AddHotkey("Left");
    UI.AddHotkey("Right");
    UI.AddHotkey("Back");
    UI.AddSliderInt(" ", 0, 0);
    UI.AddSliderInt("Rory's Original Jitter", 0, 0);
    UI.AddSliderInt("[CJitter] Jitter Width", 0, 1);
    UI.AddSliderInt("[CJitter] Jitter Frequency", 0, 1);
    UI.AddCheckbox("[CJitter] Auto-Inverter");
    UI.AddMultiDropdown("[CJitter] Visuals", ["Arrows", "Cycle", "Degree", "Inverted"]);
    UI.AddSliderInt(" ", 0, 0);
}

function hud() {
    if (!Entity.IsAlive(Entity.GetLocalPlayer())) return;

    master.setVisible();

    var offset = 30;
    var x = Global.GetScreenSize()[0]/2, y = Global.GetScreenSize()[1]/2;

    function arrows() {
        Render.String(x-50, y-20, 1, "<", master.dir == "left" ? colors.pos : colors.neg, 4);
        Render.String(x, y+30, 1, "v", master.dir == "back" ? colors.pos : colors.neg, 4);
        Render.String(x+50, y-20, 1, ">", master.dir == "right" ? colors.pos : colors.neg, 4);
    }

    function cycle() {
        Render.String(x, y+30+offset, 0, "CYCLE", master.cycle ? colors.pos : colors.neg, 1);
        offset += 12;
    }

    function inverted() {
        Render.String(x, y+30+offset, 0, "INVERTED", master.getAAInvert() ? colors.pos : colors.neg, 1);
        offset += 12;
    }

    function degree() {
        var yaw = master.getYaw();
        Render.String(x, y+30+offset, 0, "DEG: " + yaw.toString(), colors.pos, 1);
    }

    if (master.showArrows) arrows();
    if (master.showCycle) cycle();
    if (master.showInverted) inverted();
    if (master.showDegree) degree();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function jitter() {
    master.iteration++;

    if (master.iteration % master.getFreq() != 0) return;
    master.cycle = !master.cycle;

    if (master.dir == "left") master.setYaw((master.cycle ? -90 : master.getWidth()-90)+getRandomInt(-master.getRandom(), master.getRandom()));
    else if (master.dir == "back") master.setYaw((master.cycle ? master.getWidth()/2 : -(master.getWidth()/2))+getRandomInt(-master.getRandom(), master.getRandom()));
    else if (master.dir == "right") master.setYaw((master.cycle ? 90 : 90-master.getWidth())+getRandomInt(-master.getRandom(), master.getRandom()));

    master.setJitter((master.cycle ? (master.getJitterValue()/2)*2 : -(master.getJitterValue()/2)*2)+getRandomInt(-master.getJitterRandom(), master.getJitterRandom()));
}

function invert() {
    if (!master.getInvert() || Entity.GetEntityFromUserID(Event.GetInt("userid")) != Entity.GetLocalPlayer()) return;

    master.setAAInvert();
}

function keys() {
    if (master.leftPressed()) master.dir = "left";
    if (master.backPressed()) master.dir = "back";
    if (master.rightPressed()) master.dir = "right";
}

function main() {
    ui();
    Global.RegisterCallback("Draw", "hud");
    Global.RegisterCallback("CreateMove", "jitter");
    Global.RegisterCallback("player_hurt", "invert");
    Global.RegisterCallback("Draw", "keys");
    Global.Print("LBY's Jitter Script Loaded.");
} main();