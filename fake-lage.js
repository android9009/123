UI.AddLabel('                   FAKE LAG   ')
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

function guishit()
{
UI.AddSliderFloat("Max fakelag limit", 0, 16);
UI.AddSliderFloat("Switch frequency", 0.01, 1);
UI.AddSliderFloat("Central value", 0, 16);
}

function fakelags()
{
var curtime = Global.Realtime();
var limit = UI.GetValue("Misc","JAVASCRIPT","Script items","Max fakelag limit");
var freq = UI.GetValue("Misc","JAVASCRIPT","Script items","Switch frequency");
var center = UI.GetValue("Misc","JAVASCRIPT","Script items","Central value");
var fl = (limit*Math.cos((curtime)/freq) + center);
return fl;
}

function push()
{
UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Send Limit", fakelags());
}
guishit();
Global.RegisterCallback("Draw", "push");