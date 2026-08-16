//region menu
UI.AddSliderInt("Boost dt", 0, 2);
UI.AddSliderInt("FakeLag", 1, 14);
//endregion
//region main
function _FrameNetUpdateStart( )
{
    Exploit.OverrideTolerance(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Boost dt"));
    Exploit.OverrideShift(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "FakeLag"));
}
//endregion
//region callbacks
Cheat.RegisterCallback("FRAME_NET_UPDATE_START", "_FrameNetUpdateStart");
//endregion