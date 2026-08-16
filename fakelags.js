UI.AddSliderInt("Send Limit", 0, 16)
UI.AddSliderInt("Choke Limit", 0, 16)
var tickcount = 0
var flip = false
function onCM()
{
    var send = UI.GetValue("Script items", "Send Limit")
    var choke = UI.GetValue("Script items", "Choke Limit")
    if(tickcount >= choke && !flip)
    {
        flip = true
        tickcount = 0
    }
    if(tickcount >= send && flip)
    {
        flip = false
        tickcount = 0
    }
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", !flip ? choke : 0)
    tickcount++
}
function roundstart()
{
    tickcount = 0
}


Cheat.RegisterCallback("round_start", "roundstart")
Cheat.RegisterCallback("CreateMove", "onCM")




