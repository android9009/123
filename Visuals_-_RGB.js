

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
var oldTick = Global.Tickcount()
var ticksToDelay = 1 //1 second you can do the math from this point :D

UI.AddCheckbox("Rainbow glow pulse");
UI.AddSliderInt("Speed",1,16);
UI.AddSliderInt("Minimum alpha",50,255);


var alpha = 50
var up = true
function rainbowColors()
{
    var min_alpha = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Minimum alpha"); //Move this into rainbowColors if you end up adding a a slider

    var enabled = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Rainbow glow pulse");
    var speed = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Speed");
    if (Entity.IsValid(Entity.GetLocalPlayer()) && enabled) {
        var curTick = Global.Tickcount()
        if (oldTick > curTick + ticksToDelay * speed * 3) {
            oldTick = Global.Tickcount()
        }
        if (curTick > oldTick + (ticksToDelay * speed)){
            if (up) {
                alpha += 10
            }
            if (!up) {
                alpha -= 10
            }
            oldTick = Global.Tickcount()
        }
        if (alpha >= 255) {
            alpha = 255
            up = false
        }
        if (alpha <= min_alpha) {
            alpha = min_alpha
            up = true
        }
        tickcount = Global.Tickcount();
        color = HSVtoRGB(tickcount % 350 / 350, 1, 1, 1, 255);
        UI.SetColor("Visual", "ENEMIES", "ESP", "Glow", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "SELF", "ESP", "Glow", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "FRIENDLIES", "ESP", "Glow", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "ENEMIES", "ESP", "Skeleton", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "ENEMIES", "ESP", "Box", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "ENEMIES", "HUD", "Footsteps", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "ENEMIES", "ESP", "Health color override", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "FRIENDLIES", "ESP", "Health color override", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "FRIENDLIES", "ESP", "Box", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "FRIENDLIES", "ESP", "Skeleton", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "SELF", "ESP", "Shot timer", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "SELF", "ESP", "Taser range", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "SELF", "ESP", "Knife range", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "ENEMIES", "ESP", "Name", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "SELF", "ESP", "Weapon spread", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Visual", "SELF", "WORLD", "Bullet tracers", [color.r, color.g, color.b, alpha]);
        UI.SetColor("Anti-Aim", "Rage Anti-Aim", "Manual dir", [color.r, color.g, color.b, alpha]);
  
    }
}
Global.RegisterCallback("Draw", "rainbowColors");

