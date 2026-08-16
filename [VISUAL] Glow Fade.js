

function BreathingGlow() 
{ 

    const delay = UI.GetValue("Script items", "[BG] Delay");
    const maxAlpha = UI.GetValue("Script items", "[BG] Maximal alpha")
    const color = UI.GetColor("Script items", "[BG] Color"); 
    
    const alpha = Math.sin(Math.abs(-Math.PI + (Globals.Curtime() * (1 / delay)) % (Math.PI * 2))) * maxAlpha; /* credits to april#0001 for sharing this */ 
    UI.SetColor("Visual", "ENEMIES", "ESP", "Glow", [color[0], color[1], color[2], alpha])

}

function setupBreathingGlow() 
{

    UI.AddLabel("====== Breathing Glow ======"); 
    UI.AddColorPicker("[BG] Color");
    UI.AddSliderFloat("[BG] Delay", 0.1, 1); 
    UI.AddSliderInt("[BG] Maximal alpha", 90, 255);

} 
setupBreathingGlow();

Cheat.RegisterCallback("Draw", "BreathingGlow")

