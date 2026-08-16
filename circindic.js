// UI Widgets //
UI.AddLabel("=======INDICATORS V2=======");
UI.AddColorPicker("Text Color");
UI.AddLabel("========================");

// Default values //
UI.SetColor("Misc", "JAVASCRIPT", "Script items", "Text Color", [86, 66, 235, 255]);

// Settings //
var text_color          = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Text Color");

function update_settings()
{

    text_color          = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Text Color");

  
}

function draw_circle(x, y, radius, thickness, color)
{
    var inner = radius - thickness;

    for(; radius > inner; --radius)
    {
        Render.Circle(x, y, radius, color);
    }
}

function draw_arc(x, y, radius, start_angle, percent, thickness, color)
{
    var precision   = (2 * Math.PI) / arc_precision;
    var step        = Math.PI / 180;
    var inner       = radius - thickness;
    var end_angle   = (start_angle + percent) * step;
    var start_angle = (start_angle * Math.PI) / 180;

    for(; radius > inner; --radius)
    {
        for(var angle = start_angle; angle < end_angle; angle += precision)
        {
            var cx = Math.round(x + radius * Math.cos(angle));
            var cy = Math.round(y + radius * Math.sin(angle));

            var cx2 = Math.round(x + radius * Math.cos(angle + precision));
            var cy2 = Math.round(y + radius * Math.sin(angle + precision));

            Render.Line(cx, cy, cx2, cy2, color);
        }
    }
}

function adjust_angle(angle)
{
    if(angle < 0)
    {
        angle = (90 + angle * (-1));
    }
    else if(angle > 0)
    {
        angle = (90 - angle);
    }

    return angle;
}

function main()
{
    var local_player = Entity.GetLocalPlayer();

    if(!Entity.IsAlive(local_player))
        return;

    update_settings();

    var screen_size     = Render.GetScreenSize();
    var screen_middle_x = screen_size[0] * 0.5;
    var screen_middle_y = screen_size[1] * 0.5;

    var view_angles = Local.GetViewAngles();

    var real_yaw = Local.GetRealYaw();
    var fake_yaw = Local.GetFakeYaw();
    var view_yaw = view_angles[1] - 180;

    var real = adjust_angle(real_yaw - view_yaw);
    var fake = adjust_angle(fake_yaw - view_yaw);


    var double_tap_color = UI.IsHotkeyActive( "Rage", "GENERAL", "Exploits", "Doubletap" ) ? text_color : [120, 120, 120, 255];
    var hide_shots_color = UI.IsHotkeyActive( "Rage", "GENERAL", "Exploits", "Hide shots" ) ? text_color : [120, 120, 120, 255];
    var safe_point_color = UI.IsHotkeyActive( "Rage", "GENERAL", "General", "Force safe point" ) ? text_color : [120, 120, 120, 255];
    var body_point_color = UI.IsHotkeyActive( "Rage", "GENERAL", "General", "Force body aim" ) ? text_color : [120, 120, 120, 255];

    var text_offset = screen_middle_y 
    var text_spacing = screen_size[1] * 0.0185185185;

    Render.String(screen_middle_x, text_offset + (text_spacing * 4), 1, "ON-SHOT", hide_shots_color);
    Render.String(screen_middle_x, text_offset + (text_spacing * 5), 1, "DOUBLE TAP", double_tap_color);
    Render.String(screen_middle_x, text_offset + (text_spacing * 6), 1, "SAFE POINT", safe_point_color);
    Render.String(screen_middle_x, text_offset + (text_spacing * 7), 1, "FORCE BODY", body_point_color);
}

Cheat.RegisterCallback("Draw", "main");