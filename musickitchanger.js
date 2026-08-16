UI.AddSliderInt("Music kit", 1, 41);
function fsn() {
    if (Cheat.FrameStage() != 1)
        return;
      
    Entity.SetProp(Entity.GetLocalPlayer(), "CCSPlayerResource", "m_nMusicID", UI.GetValue("Music kit"))
}
Global.RegisterCallback( "FrameStageNotify", "fsn" );