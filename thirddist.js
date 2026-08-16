function ChangeDist()
{
    Dist = UI.GetValue( "Misc", "JAVASCRIPT", "TP Dist");
    UI.SetValue( "Visuals", "WORLD", "View", "Thirdperson", Dist );
}
Cheat.RegisterCallback("FrameStageNotify", "ChangeDist");

function Main()
{
    UI.AddSliderFloat("TP Dist", 50, 300)
}
Main();