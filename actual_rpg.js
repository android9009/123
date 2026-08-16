/* pasted by epiccsgohaker1337 */

/* variables */
var level = 1, xp = 0, needed_xp = 100.0, prev_reached_xp = 0, reached_xp = 0, money = 0;
var coins = [];
var current_map = World.GetMapName()|| "";
var reward = 0;
var screen = Render.GetScreenSize();
var username = Cheat.GetUsername()
var items = [
    ["dt", 800, 0, "Double tap", "Exploits", "Doubletap"],
    ["os", 200, 0, "On shot", "Exploits", "Hide shots"]
];
var sounds_ = true;

/* function */
function draw_circle_3d(x, y, z, radius, degrees, start_at, clr, filled, fill_clr) {
    var accuracy = 10;
    var old_x, old_y;
    start_at = start_at+1
    for (rot=start_at; rot < degrees+start_at+1; rot+=accuracy) {
        rot_r = rot*(Math.PI/180)
        line_x = radius * Math.cos(rot_r) + x, line_y = radius * Math.sin(rot_r) + y
        var curr = Render.WorldToScreen([line_x, line_y, z]), cur = Render.WorldToScreen([x, y, z]);
        if (cur[0] != null && curr[0] != null && old_x != null) {
            if (filled) Render.Polygon([ [curr[0], curr[1]], [old_x, old_y], [cur[0], cur[1]] ], fill_clr)
            Render.Line(curr[0], curr[1], old_x, old_y, clr)
        }
        old_x = curr[0], old_y = curr[1];
    }
}
function find_distance(v0, v1) {
    var x = v0[0] - v1[0], y = v0[1] - v1[1], z = v0[2] - v1[2];
    return Math.sqrt(x*x+y*y+z*z);
}
function is_in_range(obj, range, dist) {
    return obj[0] > range[0]-dist && obj[0] < range[0]+dist && obj[1] > range[1]-dist && obj[1] < range[1]+dist;
}
function add_coin(pos, value, dist, xp, e_dist) {
    coins.push([pos, value, dist, xp, e_dist])
}
function remove_coin(index) {
    coins.splice(index, 1)
}
function spawn_coins(map) {
    if (map == "" || map == null) return;
    switch(map) {
        case "de_mirage":
            add_coin([-1248, -1499, -155], 100, 30, 10, 60)
            add_coin([77, -2152, -111], 250, 25, 25, 50)
            add_coin([-1334, -974, -168], 50, 15, 5, 10)
            add_coin([-2113, -696, -71], 250, 15, 20, 25)
            if (Math.random() < .6) add_coin([100, -911, -40], 400, 10, 50, 50)
            add_coin([581, -1129, -128], 50, 30, 5, 70)
            add_coin([-923, -518, -49], 150, 10, 10, 90)
            if (Math.random() < .05) add_coin([1071, -2360, -40], 1000, 40, 100, 40)
            add_coin([-2005, 90, -90], 250, 15, 25, 35)
            add_coin([-635, -2092, -54], 150, 30, 10, 60)
            add_coin([-860, -2539, -36], 150, 30, 10, 70)
        break;
        case "cs_office":
            add_coin([296, -1488, -171], 50, 15, 10, 40)
            add_coin([562, 914, -160], 150, 30, 10, 70)
            if (Math.random() < .05) add_coin([1513, 421, -130], 1000, 30, 100, 70)
            if (Math.random() < .05) add_coin([-1776, -1600, -328], 1000, 30, 100, 70)
            if (Math.random() < .6) add_coin([1367, 89, -139], 50, 5, 50, 60)
            add_coin([-305, -502, -176], 250, 15, 15, 30)
            add_coin([1482, -532, -123], 50, 15, 10, 70)
        break;
    }
}

function save(manual) {
    Convar.SetFloat("xbox_autothrottle", level)
    Convar.SetFloat("joy_diagonalpov", needed_xp)
    Convar.SetFloat("xbox_throttlebias", xp)
    Convar.SetFloat("xbox_throttlespoof", money)
    Convar.SetFloat("joy_lowend", items[0][2])
    Convar.SetFloat("joy_display_input", items[1][2])

    Convar.SetFloat("vprof_graphheight", 1337)
    Cheat.PrintChat(manual ? " \x01[\x06RPG\x01] Saved progress" : " \x01[\x06RPG\x01] Automatically saved progress")
}

function load() {
    if (Convar.GetInt("vprof_graphheight") != 1337) return Cheat.PrintChat(" \x01[\x06RPG\x01] Couldn't find your save. Sorry bro");
    level = Convar.GetInt("xbox_autothrottle")
    needed_xp = Convar.GetFloat("joy_diagonalpov")
    xp = Convar.GetInt("xbox_throttlebias")
    money = Convar.GetInt("xbox_throttlespoof")
    items[0][2] = Convar.GetInt("joy_lowend")
    items[1][2] = Convar.GetInt("joy_display_input")
    Cheat.PrintChat(" \x01[\x06RPG\x01] Hopefully loaded non-corrupted save!")
}

function restart(save) {
    level = 1, xp = 0, needed_xp = 100.0, prev_reached_xp = 0, reached_xp = 0, money = 0
    if (save) {
        Convar.SetFloat("xbox_autothrottle", level)
        Convar.SetFloat("joy_diagonalpov", needed_xp)
        Convar.SetFloat("xbox_throttlebias", xp)
        Convar.SetFloat("xbox_throttlespoof", money)
        Convar.SetFloat("joy_lowend", items[0][2])
        Convar.SetFloat("joy_display_input", items[1][2])
        Convar.SetFloat("vprof_graphheight", 0)
    }
    Cheat.PrintChat(save ? " \x01[\x06RPG\x01] Restarted progress (+save)" : " \x01[\x06RPG\x01] Restarted progress")
}

/* callbacks */
function on_draw() {
    var local = Entity.GetLocalPlayer();
    if (local==null||!Entity.IsAlive(local)) return;
    var fonts = [
        Render.AddFont("Verdana", 8, 900),
        Render.AddFont("Verdana", 15, 900)
    ]

    var pos = Entity.GetRenderOrigin(local);
    var mouse = Input.GetCursorPosition()
    for (i=0; i < coins.length; i++) {
        var coin = coins[i];
        var pos_ = coin[0];
        var distance = Math.floor(find_distance(pos, pos_))
        var alpha = 255-distance
        if (alpha < 0) alpha = 0; if (alpha > 255) alpha = 255
        var w2s = Render.WorldToScreen(pos_)
        var text_ = Render.TextSizeCustom("$"+coin[1], fonts[0]), text__ = Render.TextSizeCustom("Press e to pickup", fonts[0])

        draw_circle_3d(pos_[0], pos_[1], pos_[2], 5, 360, 0, [255, 255, 0, alpha], true, [255, 255, 0, alpha/2])
        Render.StringCustom(w2s[0]-text_[0]/2, w2s[1]-25-text_[1]/2, 0, "$"+coin[1], [255, 255, 0, alpha], fonts[0])
        if (distance < coin[4] && is_in_range(mouse, w2s, 25))
            Render.StringCustom(w2s[0]-text__[0]/2, w2s[1]-35-text__[1]/2, 0, "Press e to pickup", [255, 255, 255, 255], fonts[0])
        if (distance < coin[2] || distance < coin[4] && is_in_range(mouse, w2s, 35) && Input.IsKeyPressed(0x45)) {
            remove_coin(i)
            money += coin[1]
            xp += coin[3]
            if (sounds_)
                Sound.Play("C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\ot\\sounds\\rpg\\collected.wav")
            bruh = Globals.Tickcount()+25
            Cheat.PrintChat(" + \x10$" + coin[1] + "\n")
            Cheat.PrintChat(" + \x0A" + coin[3] + "xp\n")
        }
    }
    //Render.String(5, 500, 0, Math.floor(pos[0]).toString()+" "+Math.floor(pos[1]).toString()+" "+Math.floor(pos[2]).toString()+" "+current_map+" "+coins.length, [255, 255, 255, 255])
}

function on_create_move() {
    if (xp < 0) xp = 0
    if (xp >= needed_xp) {
        reward += 20
        level += 1
        prev_reached_xp = reached_xp
        reached_xp = needed_xp
        money += reward
        if (level < 10) {
            needed_xp *= 2
        } else {
            needed_xp *= 3
        }
        Cheat.PrintChat(" \x0DLEVEL UP! - level " + level + "! \x10(reward $"+reward+")")
        save(false)
    }
    if (xp < reached_xp) {
        level -= 1
        needed_xp = reached_xp
        reached_xp = prev_reached_xp
        Cheat.PrintChat(" \x0DLEVELED DOWN.. - level " + level)
    }
    for (i=0; i < items.length; i++) {
        item = items[i]
        UI.SetEnabled(item[4], item[5], item[2] == 1)
        if (item[2] != 1) UI.SetValue(item[4], item[5], false)
    }
}

function despawn_coins() { coins = [] }
function on_start() { spawn_coins(current_map) }
function on_connect() { current_map = World.GetMapName() }
function on_player_death() {
    var userid = Entity.GetEntityFromUserID(Event.GetString("userid"))
    var attacker = Entity.GetEntityFromUserID(Event.GetString("attacker"))
    if (userid == Entity.GetLocalPlayer()) { 
        xp -= 5
        Cheat.PrintChat(" - \x0A5xp\n")
        if (attacker == Entity.GetLocalPlayer())
            Cheat.PrintChat("And so, "+username+" did the stupidest thing imaginable.") 
    }
    if (attacker == Entity.GetLocalPlayer() && Entity.IsEnemy(userid)) {
        var epos = Entity.GetRenderOrigin(userid);
        var kill_re = 10*(level*0.5)
        var kdr = 0;
        var kills = Entity.GetProp(userid, "CPlayerResource", "m_iKills"), deaths = Entity.GetProp(userid, "CPlayerResource", "m_iDeaths");
        kdr = kills/deaths
        xp += 50
        money += kill_re
        Cheat.PrintChat(" + \x10$"+kill_re+"\n")
        Cheat.PrintChat(" + \x0A50xp\n")
        if (Math.random() < .09) {
            Cheat.PrintChat(" \x10WOAH! \x01this person had some money with them. \x10Go pick it up")
            add_coin(epos, Math.floor(Math.random()*100), 10, 10, 90)
        }
        if (kdr > 2.5 && Math.random() < .5) {
            money += 50
            xp += 250
            Cheat.PrintChat(" \x01U KILLED A \x10'BOSS' \x01- your reward is some xp and \x10$50\x01")
        }
    }
    if (attacker == Entity.GetLocalPlayer() && !Entity.IsEnemy(userid) && userid != Entity.GetLocalPlayer()) {
        xp -= 100
        money -= 20
        Cheat.PrintChat(" - \x10$20\n")
        Cheat.PrintChat(" - \x0A100xp\n")
        Cheat.PrintChat(username+" we do not support terrorism and griefing.") 
    }
}
function commands() {
    var text = Event.GetString("text")
    var userid = Event.GetString("userid")
    if (Entity.GetEntityFromUserID(userid) != Entity.GetLocalPlayer()) return;
    if (text.substring(0, 6) == ".stats") {
        Cheat.PrintChat(" \x01[\x06RPG STATS\x01]" + " \x0A" + level + "lvl & " + xp + "xp (" + (needed_xp-xp) + " more needed)" + " \x01 - \x10$" + money + "\n")
    }
    if (text.substring(0, 5) == ".shop") {
        for (i=0; i < items.length; i++) {
            item = items[i]
            if (i==0) { 
                Cheat.PrintChat(item[2] != 1 ? "[\x06RPG SHOP\x01] [\x10$"+item[1]+"\x01] "+item[3]+" (.buy "+item[0]+") \x02O" : "[\x06RPG SHOP\x01] [\x10$"+item[1]+"\x01] "+item[3]+" (.buy "+item[0]+") \x06O") 
            } else {
                Cheat.PrintChat(item[2] != 1 ? "[\x10$"+item[1]+"\x01] "+item[3]+" (.buy "+item[0]+") \x02O" : "[\x10$"+item[1]+"\x01] "+item[3]+" (.buy "+item[0]+") \x06O")
            }
        }
    }
    if (text.substring(0, 13) == ".enable_sound") {
        sounds_ = !sounds_
        Cheat.PrintChat(sounds_ ? " \x01[\x06RPG\x01] Sound enabled" : " \x01[\x06RPG\x01] Sound disabled")
    }
    if (text.substring(0, 4) == ".buy") {
        var sub_ = text.substring(5, 8)
        for (i=0; i < items.length; i++) {
            item = items[i]
            if (sub_ == item[0]) {
                if (money >= item[1] && item[2] != 1) {
                    money -= item[1]
                    item[2] = 1
                    Cheat.PrintChat("- \x10$"+item[1]+" \x01 UNLOCKED "+item[3].toUpperCase())
                    save(false);
                } else {
                    Cheat.PrintChat(item[2] != 1 ? " \x02Unable to purchase \x01(Not enough money)" : " \x02Unable to purchase \x01(Item already owned)")
                }
            }
        }
    }
    if (text.substring(0, 9) == ".username") {
        username = text.substring(10, 24)
        Cheat.PrintChat(" \x01[\x06RPG\x01] Changed your username to "+username)
    }
    if (text.substring(0, 5) == ".save") {
        save(true);
    }
    if (text.substring(0, 5) == ".load") {
        load();
    }
    if (text.substring(0, 8) == ".restart") {
        restart(text.substring(9, 13) == "save");
    }
    if (text.substring(0, 5) == ".help") {
        Cheat.PrintChat(" \x01Hey \x10"+username+" \x01what's up? Here are all commands")
        Cheat.PrintChat(" \x10.stats \x01- shows your current level, xp and balance")
        Cheat.PrintChat(" \x10.shop \x01- shows what you can buy in shop")
        Cheat.PrintChat(" \x10.enable_sound \x01- enable/disable sounds")
        Cheat.PrintChat(" \x10.username \x01- change your username")
        Cheat.PrintChat(" \x10.save \x01- save your progress")
        Cheat.PrintChat(" \x10.load \x01- load your latest save")
        Cheat.PrintChat(" \x10.restart (save) \x01- restart your progress (and remove your save)")
    }
}
/* chat color codes
    WHITE: "\x01",
	RED: "\x02",
	LIGHT_PURPLE: "\x03",
	GREEN: "\x04",
	LIGHT_GREEN: "\x05",
	LIME: "\x06",
	GRAY: "\x08",
	YELLOW: "\x09",
	LIGHT_BLUE: "\x0A",
	CYAN: "\x0B",
	BLUE: "\x0C",
	MAGENTA: "\x0D",
	PINK: "\x0E",
	LIGHT_RED: "\x0F",
    GOLD: "\x10"
*/

Cheat.RegisterCallback("round_prestart", "despawn_coins")
Cheat.RegisterCallback("round_start", "on_start")
Cheat.RegisterCallback("client_disconnect", "despawn_coins")
Cheat.RegisterCallback("CreateMove", "on_create_move")
Cheat.RegisterCallback("player_connect_full", "on_connect")
Cheat.RegisterCallback("player_death", "on_player_death")
Cheat.RegisterCallback("Draw", "on_draw")
Cheat.RegisterCallback("player_say", "commands")
spawn_coins(current_map)
load()