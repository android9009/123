    function postdataupdate_start()
{
        if (Global.FrameStage() != 2)
        return;
        var local = Entity.GetLocalPlayer();
    
        if (!Entity.IsAlive(local))
        return;
 
        var kills = Entity.GetProp( local, "CPlayerResource", "m_iKills" );
        var weapon = Entity.GetWeapon(local);
 
        Entity.SetProp(weapon, "CBaseAttributableItem", "m_iItemIDHigh", -1);
        Entity.SetProp(weapon, "CBaseAttributableItem", "m_nFallbackStatTrak", kills);
}

    function init()
{
        Global.RegisterCallback("FrameStageNotify", "postdataupdate_start");
}
init();