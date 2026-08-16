UI.AddLabel("------------ C4 Timer -------------");
UI.AddCheckbox("Enable C4 Indicator");

function calcDist(local, target) {
    var lx = local[0];
    var ly = local[1];
    var lz = local[2];
    var tx = target[0];
    var ty = target[1];
    var tz = target[2];
    var dx = lx - tx;
    var dy = ly - ty;
    var dz = lz - tz;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function dispDamage() {
    local = Entity.GetLocalPlayer();
	
    if (!UI.GetValue("Script items", "Enable C4 Indicator")) return;
    var c4 = Entity.GetEntitiesByClassID(128)[0];

    if (c4 == undefined) return;

    var eLoc = Entity.GetRenderOrigin(c4);
    var lLoc = Entity.GetRenderOrigin(local)
    var distance = calcDist(eLoc, lLoc);
    var willKill = false;
    var dmg;
	//player checks
    var armor = Entity.GetProp(local, "CCSPlayerResource", "m_iArmor"); // player armor
    var health = Entity.GetProp(local, "CBasePlayer", "m_iHealth"); // player health
	//c4 things
    var timer = (Entity.GetProp(c4, "CPlantedC4", "m_flC4Blow") - Globals.Curtime()); // c4 left time
    var c4length = Entity.GetProp(c4, "CPlantedC4", "m_flTimerLength");
    var bar_length = (((Render.GetScreenSize()[1] - 50) / c4length) * (timer));
    var isbombticking = Entity.GetProp(c4, "CPlantedC4", "m_bBombTicking");
	//defusing things
	var deflength = Entity.GetProp(c4, "CPlantedC4", "m_flDefuseLength"); // length of defuse
    var deftimer = (Entity.GetProp(c4, "CPlantedC4", "m_flDefuseCountDown") - Globals.Curtime()); // timer when defusing
    var defbarlength = (((Render.GetScreenSize()[1] - 50) / deflength) * (deftimer)); // lenght for left bar
    var isbeingdefused = Entity.GetProp(c4, "CPlantedC4", "m_hBombDefuser"); // check if bomb is being defused
    var gotdefused = Entity.GetProp(c4, "CPlantedC4", "m_bBombDefused"); // check if bomb has or hasnt defused
	
    const a = 450.7;
    const b = 75.68;
    const c = 789.2;

    const d = (distance - b) / c;

    var damage = a * Math.exp(-d * d);

    if (armor > 0) {
        var newDmg = damage * 0.5;
        var armorDmg = (damage - newDmg) * 0.5;

        if (armorDmg > armor) {
            armor = armor * (1 / .5);
            newDmg = damage - armorDmg;
        }
        damage = newDmg;
    }
    dmg = Math.ceil(damage);

    if (dmg >= health) {
		willKill = true; 
	}
    else {
        willKill = false;
	}
	
    timer = parseFloat(timer.toPrecision(3));
    timer2 = parseFloat(timer.toPrecision(2));
    timer3 = parseFloat(timer.toPrecision(1));
    bomb_font = Render.AddFont("Arial Black", 16, 800);
	
	if (!isbombticking) return;
	
	if (gotdefused) return;
		if (timer >= 1 && timer > 10)
		{
			Render.StringCustom(10 + 1, 5 + 1, 0, getSite(c4) + timer + "s", [0, 0, 0, 255], bomb_font);
			Render.StringCustom(10, 5, 0, getSite(c4) + timer + "s", [129, 177, 14, 255], bomb_font);
		}
		else if (timer <= 10 && timer > 5 && timer >= 1)
		{
			Render.StringCustom(10 + 1, 5 + 1, 0, getSite(c4) + timer2 + "s", [0, 0, 0, 255], bomb_font);
			Render.StringCustom(10, 5, 0, getSite(c4) + timer2 + "s", [210, 216, 112, 255], bomb_font);
		}
		else if (timer <= 5 && timer >= 1)
		{
			Render.StringCustom(10 + 1, 5 + 1, 0, getSite(c4) + timer2 + "s", [0, 0, 0, 255], bomb_font);
			Render.StringCustom(10, 5, 0, getSite(c4) + timer2 + "s", [252, 18, 19, 255], bomb_font);
		}
		else if (timer < 1 && timer >= 0.1)
		{
			Render.StringCustom(10 + 1, 5 + 1, 0, getSite(c4) + timer3 + "s", [0, 0, 0, 255], bomb_font);
			Render.StringCustom(10, 5, 0, getSite(c4) + timer3 + "s", [252, 18, 19, 255], bomb_font);
		}
		// defuse time bar
		if (isbeingdefused > 0){
			if (timer > deflength && timer >= 0.1) {
				Render.FilledRect(0, 0, 15, defbarlength, [58, 191, 54, 120]);
			}
			else {
				Render.FilledRect(0, 0, 15, defbarlength, [252, 18, 19, 120]);
			}
		}
	
	if (!Entity.IsAlive(local)) return;
		if (willKill) {
			Render.StringCustom(10 + 1, 25 + 1, 0, "FATAL", [0, 0 , 0, 200], bomb_font);
			Render.StringCustom(10, 25, 0, "FATAL", [252, 18, 19, 200], bomb_font);
		} 
		else if (damage > 0.5) {
			Render.StringCustom(10 + 1, 25 + 1, 0, "-" + dmg + "HP", [0, 0, 0, 255], bomb_font);
			Render.StringCustom(10, 25, 0, "-" + dmg + "HP", [210, 216, 112, 255], bomb_font);
		}
}

function getSite(c4) {
    bombsite = Entity.GetProp(c4, "CPlantedC4", "m_nBombSite");

    if (bombsite == 0) {
        return "A - ";
    } else {
        return "B - ";
    }
}

Cheat.RegisterCallback("Draw", "dispDamage");