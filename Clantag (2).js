UI.AddDropdown( "Custom ClanTag", [ "Disabled", "gamesense"] );
UI.AddSliderInt( "Custom ClanTag Speed", 1, 10 );
var lasttime = 0;
function onRender( )
{
    var tag = UI.GetValue( "Script Items", "Custom ClanTag" );
    var speed = UI.GetValue( "Script Items", "Custom ClanTag Speed" );
    var time = parseInt((Globals.Curtime() * speed))
    if (time != lasttime)
    {
        if(tag == 0) { Local.SetClanTag(""); }
        if(tag == 1)
            {
            switch((time) % 25)
            {
            case 1: { Local.SetClanTag("                  "); break; }
            case 2: { Local.SetClanTag("             ga"); break; }
            case 3: { Local.SetClanTag("            gam"); break; }
            case 4: { Local.SetClanTag("           game"); break; }
            case 5: { Local.SetClanTag("          games"); break; }
            case 6: { Local.SetClanTag("         gamese"); break; }
            case 7: { Local.SetClanTag("        gamesen"); break; }
            case 8: { Local.SetClanTag("       gamesens"); break; }
            case 8: { Local.SetClanTag("      gamesense "); break; }
            case 8: { Local.SetClanTag("     gamesense "); break; }
            case 8: { Local.SetClanTag("    gamesense  "); break; }
            case 9: { Local.SetClanTag("   gamesense   "); break; }
            case 10:{ Local.SetClanTag("  gamesense    "); break; }
            case 11:{ Local.SetClanTag(" gamesense     "); break; }
            case 12:{ Local.SetClanTag("gamesense      "); break; }
            case 13:{ Local.SetClanTag("gamesense      "); break; }
            case 14:{ Local.SetClanTag("gamesense      "); break; }
            case 15:{ Local.SetClanTag("gamesense      "); break; }
            case 16:{ Local.SetClanTag("amesense       "); break; }
            case 17:{ Local.SetClanTag("mesense        "); break; }
            case 18:{ Local.SetClanTag("esense         "); break; }
            case 19:{ Local.SetClanTag("sense          "); break; }
            case 20:{ Local.SetClanTag("ense           "); break; }
            case 21:{ Local.SetClanTag("nse            "); break; }
            case 22:{ Local.SetClanTag("se             "); break; }
            case 23:{ Local.SetClanTag("e              "); break; }
            case 24:{ Local.SetClanTag("               "); break; }
            }
        }
    }
    lasttime = time;
}
Cheat.RegisterCallback("Draw", "onRender");