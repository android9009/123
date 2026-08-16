var currentTick = 0;
var lastTick = 0;
var special = false
var speed = 22;
var ctag = 0

function Draw(){
    currentTick = parseInt(Globals.Curtime() * 1000);
    if (currentTick - (10000 / speed) >= lastTick){
        switch ((ctag) % 42){
            case 0:{
                Local.SetClanTag("Luck");
                break;
            }
            case 1:{
                Local.SetClanTag("Lucky");
                break;
            }
            case 2:{
                Local.SetClanTag("LuckyC");
                break;
            }
            case 3:{
                Local.SetClanTag("LuckyCh");
                break;
            }
            case 4:{
                Local.SetClanTag("LuckyCh4");
                break;
            }
            case 5:{
                Local.SetClanTag("LuckyCh4r");
                break;
            }
            case 6:{
                Local.SetClanTag("LuckyCh4rm");
                break;
            }
            case 7:{
                Local.SetClanTag("LuckyCh4rm$");
                break;
            }
            case 8:{
                Local.SetClanTag("LuckyCh4rm$");
                break;
            }
            case 9:{
                Local.SetClanTag("LuckyCh4rm$");
                break;
            }
            case 10:{
                Local.SetClanTag("LuckyCh4rm$");
                break;
            }
            case 11:{
                Local.SetClanTag("uckyCh4rm$");
                break;
            }
            case 12:{
                Local.SetClanTag("ckyCh4rm$");
                break;
            }
            case 13:{
                Local.SetClanTag("kyCh4rm$");
                break;
            }
            case 14:{
                Local.SetClanTag("yCh4rm$");
                break;
            }
            case 15:{
                Local.SetClanTag("Ch4rm$");
                break;
            }
            case 16:{
                Local.SetClanTag("h4rm$");
                break;
            }
            case 17:{
                Local.SetClanTag("4rm$");
                break;
            }
            case 18:{
                Local.SetClanTag("rm$ L");
                break;
            }
            case 19:{
                Local.SetClanTag("m$ Lu");
                break;
            }
            case 20:{
                Local.SetClanTag("$ Luc");
                break;
            }
            case 21:{
                Local.SetClanTag("Luck");
                break;
            }
            case 22:{
                Local.SetClanTag("Lucky");
                break;
            }
            case 23:{
                Local.SetClanTag("LuckyC");
                break;
            }
            case 24:{
                Local.SetClanTag("LuckyCh");
                break;
            }
            case 25:{
                Local.SetClanTag("LuckyCha");
                break;
            }
            case 26:{
                Local.SetClanTag("LuckyChar");
                break;
            }
            case 27:{
                Local.SetClanTag("LuckyCharm");
                break;
            }
            case 28:{
                Local.SetClanTag("LuckyCharms");
                break;
            }
            case 29:{
                Local.SetClanTag("LuckyCharms");
                break;
            }
            case 30:{
                Local.SetClanTag("LuckyCharms");
                break;
            }
            case 31:{
                Local.SetClanTag("LuckyCharms");
                break;
            }
            case 32:{
                Local.SetClanTag("uckyCharms");
                break;
            }
            case 33:{
                Local.SetClanTag("ckyCharms");
                break;
            }
            case 34:{
                Local.SetClanTag("kyCharms");
                break;
            }
            case 35:{
                Local.SetClanTag("yCharms");
                break;
            }
            case 36:{
                Local.SetClanTag("Charms");
                break;
            }
            case 37:{
                Local.SetClanTag("harms");
                break;
            }
            case 38:{
                Local.SetClanTag("arms");
                break;
            }
            case 39:{
                Local.SetClanTag("rms L");
                break;
            }
            case 40:{
                Local.SetClanTag("ms Lu");
                break;
            }
            case 41:{
                Local.SetClanTag("s Luc");
                break;
            }
        }
        if (ctag == 41){
            ctag = 0;
        }else{
            ctag = ctag+1;
        }
        lastTick = currentTick;
    }
}

Cheat.RegisterCallback("Draw", "Draw");