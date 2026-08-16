UI.AddSliderInt("Rank changer", 1, 18);
function fsn() {
    if (Cheat.FrameStage() != 1)
        return;
    Entity.SetProp(Entity.GetLocalPlayer(), "CCSPlayerResource", "m_iCompetitiveRanking", UI.GetValue("Rank changer"))
}
Global.RegisterCallback( "FrameStageNotify", "fsn" );