var bSendPacket = false;
var do1 = false;
var cnt = 0;
const buttons = UserCMD.GetButtons();
var shouldSend = false;
UI.AddCheckbox("Fast duck");

function on_create_move()
{
    var buttons = UserCMD.GetButtons();
   
    if(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Fast duck"))
        UserCMD.SetButtons(buttons | (1 << 22));
}

function choked_commands()
{

    if(UI.IsHotkeyActive( "Script items", "Fake Duck" )) {
            shouldSend = true;
           
            bSendPacket = false;
            FakelagShouldLag = false;
            if (cnt % 14 == 0)
                do1 = false;
           if (cnt % 14 == 6)
              bSendPacket = true;
            else if (cnt % 14 == 7)
                do1 = true;
            if (do1)
                UserCMD.SetButtons(buttons | (1 << 2));
            cnt++;
    }
    else {
        do1 = false;
        shouldSend = false;
        cnt = 0;
    }

}

function sendpacket() {

    if(shouldSend) {
        if(bSendPacket)
            UserCMD.Send()
        else UserCMD.Choke()
    }
}
UI.AddHotkey( "Fake Duck" );
Cheat.RegisterCallback("CreateMove", "on_create_move");
Cheat.RegisterCallback("CreateMove", "choked_commands")
Cheat.RegisterCallback("CreateMove", "sendpacket")