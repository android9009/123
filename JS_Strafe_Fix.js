var a = UI.AddSliderInt("Turn speed",0, 500)
function d()
{
    UI.SetValue("Misc", "GENERAL", "Movement", "Turn speed", UI.GetValue.apply(null,a))
}
Cheat.RegisterCallback("Draw", "d")