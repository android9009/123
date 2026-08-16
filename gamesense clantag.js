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
                Local.SetClanTag("g");
                break;
            }
            case 1:{
                Local.SetClanTag("ga");
                break;
            }
            case 2:{
                Local.SetClanTag("gam");
                break;
            }
            case 3:{
                Local.SetClanTag("game");
                break;
            }
            case 4:{
                Local.SetClanTag("games");
                break;
            }
            case 5:{
                Local.SetClanTag("gamese");
                break;
            }
            case 6:{
                Local.SetClanTag("gamesen");
                break;
            }
            case 7:{
                Local.SetClanTag("gamesens");
                break;
            }
            case 8:{
                Local.SetClanTag("gamesense");
                break;
            }
            case 9:{
                Local.SetClanTag("gamesens");
                break;
            }
            case 10:{
                Local.SetClanTag("gamesen");
                break;
            }
            case 11:{
                Local.SetClanTag("gamese");
                break;
            }
            case 12:{
                Local.SetClanTag("games");
                break;
            }
            case 13:{
                Local.SetClanTag("game");
                break;
            }
            case 14:{
                Local.SetClanTag("gam");
                break;
            }
            case 15:{
                Local.SetClanTag("ga");
                break;
            }
            case 16:{
                Local.SetClanTag("g");
                break;
            }
            case 17:{
                Local.SetClanTag("ga");
                break;
            }
            case 18:{
                Local.SetClanTag("gam");
                break;
            }
            case 19:{
                Local.SetClanTag("game");
                break;
            }
            case 20:{
                Local.SetClanTag("games");
                break;
            }
            case 21:{
                Local.SetClanTag("gamese");
                break;
            }
            case 22:{
                Local.SetClanTag("gamesen");
                break;
            }
            case 23:{
                Local.SetClanTag("gamesens");
                break;
            }
            case 24:{
                Local.SetClanTag("gamesense");
                break;
            }
            case 25:{
                Local.SetClanTag("gamesens");
                break;
            }
            case 26:{
                Local.SetClanTag("gamesen");
                break;
            }
            case 27:{
                Local.SetClanTag("gamese");
                break;
            }
            case 28:{
                Local.SetClanTag("games");
                break;
            }
            case 29:{
                Local.SetClanTag("game");
                break;
            }
            case 30:{
                Local.SetClanTag("gam");
                break;
            }
            case 31:{
                Local.SetClanTag("ga");
                break;
            }
            case 32:{
                Local.SetClanTag("g");
                break;
            }
            case 33:{
                Local.SetClanTag("ga");
                break;
            }
            case 34:{
                Local.SetClanTag("gam");
                break;
            }
            case 35:{
                Local.SetClanTag("game");
                break;
            }
            case 36:{
                Local.SetClanTag("games");
                break;
            }
            case 37:{
                Local.SetClanTag("gamese");
                break;
            }
            case 38:{
                Local.SetClanTag("gamesen");
                break;
            }
            case 39:{
                Local.SetClanTag("gamesens");
                break;
            }
            case 40:{
                Local.SetClanTag("gamesense");
                break;
            }
            case 41:{
                Local.SetClanTag("gamesense ");
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