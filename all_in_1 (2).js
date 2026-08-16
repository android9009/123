UI.AddCheckbox("Better doubletap");

function on_ragebot_fire()
{ 
    
    ragebot_target_exploit = Event.GetInt("exploit");
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Better doubletap"))
    {
        if (ragebot_target_exploit == 2)
        {
            UI.SetValue("Rage", "GENERAL", "Exploits", "Doubletap fast recovery", true);
        }
        else
        {
            UI.SetValue("Rage", "GENERAL", "Exploits", "Doubletap fast recovery", false);
        }
    }
            
}

Global.RegisterCallback("ragebot_fire", "on_ragebot_fire");



// pasted from april#0001's thing :)

var alpha = 0;
var size = 0;

UI.AddSliderFloat("Hitmarker duration", 0, 2);
UI.AddSliderInt("Hitmarker size", 0, 100);
UI.AddSliderInt("Hitmarker gap", 0, 75);
var color_init = UI.AddColorPicker("Hitmarker color");

function clamp(v, min, max)
{
    return Math.max(Math.min(v, max), min);
}

function get(element)
{
    return UI.GetValue("Misc", "JAVASCRIPT", "Script items", element);
}

function render_hitmarker()
{
    if (alpha === 0)
        return;
  
    var color = UI.GetColor("MISC", "JAVASCRIPT", "Script Items", "Hitmarker color");
    const inc_alpha = ((1 / get("Hitmarker duration")) * Global.Frametime()) * 255
    const inc_size = ((1 / get("Hitmarker duration")) * Global.Frametime()) * get("Hitmarker size")

    alpha = clamp(alpha - inc_alpha, 0, 255);
    color[3] = alpha;
    size = clamp(size - inc_size, 0, get("Hitmarker size"));
    gap = get("Hitmarker gap");
  
    if ( size < gap )
        return;

    const x = Global.GetScreenSize()[0], y = Global.GetScreenSize()[1];

    /*Render.GradientRect(0, 0, x, size, 0, [128, 195, 255, alpha], [128, 195, 255, 0]);
    Render.GradientRect(0, y - size, x, size, 0, [128, 195, 255, 0], [128, 195, 255, alpha]);
    Render.GradientRect(x - size, 0, size, y, 1, [128, 195, 255, 0], [128, 195, 255, alpha]);
    Render.GradientRect(0, 0, size, y, 1, [128, 195, 255, alpha], [128, 195, 255, 0]);*/

    /*Render.Line( ( x / 2 ) - size, ( y / 2 ) - size, ( x / 2 ) + size, ( y / 2 ) + size, [ 255, 255, 255, alpha ] );
    Render.Line( ( x / 2 ) + size, ( y / 2 ) - size, ( x / 2 ) - size, ( y / 2 ) + size, [ 255, 255, 255, alpha ] );*/
  
    Render.Line( ( x / 2 ) - gap, ( y / 2 ) - gap, ( x / 2 ) - size, ( y / 2 ) - size, color ); // top left
    Render.Line( ( x / 2 ) + gap, ( y / 2 ) + gap, ( x / 2 ) + size, ( y / 2 ) + size, color ); // botton right
    Render.Line( ( x / 2 ) + gap, ( y / 2 ) - gap, ( x / 2 ) + size, ( y / 2 ) - size, color ); // top right
    Render.Line( ( x / 2 ) - gap, ( y / 2 ) + gap, ( x / 2 ) - size, ( y / 2 ) + size, color ); // bottom left
}

function on_death()
{
    const attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    const userid = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    const player = Entity.GetLocalPlayer();

    if (attacker === player && userid != player)
    {
        alpha = 255;
        size = 360;
    }
}

Global.RegisterCallback("player_death", "on_death");
Global.RegisterCallback("Draw", "render_hitmarker");

