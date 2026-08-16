UI.AddCheckbox("Team based model")
UI.AddDropdown("CT Model", ["None", "'TwoTimes' McCoy", "Seal Team 6 Soldier", "Buckshot", "Lt. Commander Ricksaw", "Dragomir", "Rezan The Ready", "Maximus", "Blackwolf", "The Doctor' Romanov", "B Squadron Officer", "3rd Commando Company", "Special Agent Ava", "Operator", "Markus Delrow", "Michael Syfers", "Enforcer", "Slingshot", "Soldier", "The Elite Mr. Muhlik", "Ground Rebel", "Osiris", "Prof. Shahmat", "Heavy armor"])
UI.AddDropdown("T Model", ["None", "'TwoTimes' McCoy", "Seal Team 6 Soldier", "Buckshot", "Lt. Commander Ricksaw", "Dragomir", "Rezan The Ready", "Maximus", "Blackwolf", "The Doctor' Romanov", "B Squadron Officer", "3rd Commando Company", "Special Agent Ava", "Operator", "Markus Delrow", "Michael Syfers", "Enforcer", "Slingshot", "Soldier", "The Elite Mr. Muhlik", "Ground Rebel", "Osiris", "Prof. Shahmat", "Heavy armor"])

function onFSN(){
    if(Cheat.FrameStage() != 2)
        return
    var team = Entity.GetProp(Entity.GetLocalPlayer(),"DT_BaseEntity", "m_iTeamNum")
    if(!UI.GetValue("Script Items", "Team based model")){
        UI.SetEnabled("Script Items", "CT Model", false)
        UI.SetEnabled("Script Items", "T Model", false)
        return;
    }
    UI.SetEnabled("Script Items", "T Model", true)
    UI.SetEnabled("Script Items", "CT Model", true)
    if(team == 2){ // T
        UI.SetValue("Misc", "SKINS", "Player", "Player model", UI.GetValue("Script Items", "T Model"))
    }
    else if(team == 3){ // CT
        UI.SetValue("Misc", "SKINS", "Player", "Player model", UI.GetValue("Script Items", "CT Model"))
    }
}
Cheat.RegisterCallback("FrameStageNotify","onFSN")