

//frametick switch
var frame = 0;

function HUD_REDRAW()
{
    frame++;    if(frame == 50) frame = 1;   
    if (frame >= 25 && frame <= 50)    UI.SetValue( "Anti-Aim", "Fake-Lag", "Enabled", true );   
    else    UI.SetValue( "Anti-Aim", "Fake-Lag", "Enabled", false );
}

Global.RegisterCallback("CreateMove", "HUD_REDRAW");

