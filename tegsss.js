// by encourage
// made in Russia (аче)
// update: 2.2
UI.AddDropdown( "clantag setup", [ "offclantag", "PPHUD", "fatality", "legendware", "svgcord", "nemesis", "SyNoRy", "KAZAKHWARE", "onetap", "onetapanim" ] );
UI.AddSliderInt( "clantag speed", 1, 10 );
var lasttime = 0;
function onRender( )
{
    var tag = UI.GetValue( "Script Items", "clantag setup" );
    var speed = UI.GetValue( "Script Items", "clantag speed" );
    var time = parseInt((Globals.Curtime() * speed))
    if (time != lasttime)
    {
        if(tag == 0) { Local.SetClanTag(""); }
        if(tag == 1)
            {
            switch((time) % 37)
            {
            case 0: { Local.SetClanTag("               "); break; }
            case 1: { Local.SetClanTag("             P "); break; }
            case 2: { Local.SetClanTag("            PP "); break; }
            case 3: { Local.SetClanTag("           PPH "); break; }
            case 4: { Local.SetClanTag("          PPHU "); break; }
            case 5: { Local.SetClanTag("         PPHUD "); break; }
            case 6: { Local.SetClanTag("        PPHUD/ "); break; }
            case 7: { Local.SetClanTag("       PPHUD\ "); break; }
            case 8: { Local.SetClanTag("      PPHUD/ "); break; }
            case 9: { Local.SetClanTag("      PPHUD/F "); break; }
            case 10:{ Local.SetClanTag("      PPHUD/FR "); break; }
            case 11:{ Local.SetClanTag("      PPHUD/FRE "); break; }
            case 12:{ Local.SetClanTag("      PPHUD/FREE "); break; }
            case 13:{ Local.SetClanTag("     PPHUD/FREE    "); break; }
            case 14:{ Local.SetClanTag("    PPHUD/FREE     "); break; }
            case 15:{ Local.SetClanTag("   PPHUD/FREE      "); break; }
            case 16:{ Local.SetClanTag("  PPHUD/FREE       "); break; }
            case 17:{ Local.SetClanTag(" PPHUD/FREE        "); break; }
            case 18:{ Local.SetClanTag("PHUD/FREE          "); break; }
            case 19:{ Local.SetClanTag("HUD/FREE           "); break; }
            case 20:{ Local.SetClanTag("UD/FREE            "); break; }
            case 21:{ Local.SetClanTag("D/FREE             "); break; }
            case 22:{ Local.SetClanTag("/FREE              "); break; }
            case 23:{ Local.SetClanTag("\FREE               "); break; }
            case 24:{ Local.SetClanTag("FREE                "); break; }
            case 25:{ Local.SetClanTag("EE                 "); break; }
            case 26:{ Local.SetClanTag("                  "); break; }
 
            }
        }
    if(tag == 2)
            {
            switch((time) % 28)
            {
                case 0: { Local.SetClanTag(" "); break; }
                case 1: { Local.SetClanTag("f "); break; }
                case 2: { Local.SetClanTag("fa "); break; }
                case 3: { Local.SetClanTag("fat "); break; }
                case 4: { Local.SetClanTag("fata "); break; }
                case 5: { Local.SetClanTag("fatal "); break; }
                case 6: { Local.SetClanTag("fatali "); break; }
                case 7: { Local.SetClanTag("fatalit "); break; }
                case 8: { Local.SetClanTag("fatality "); break; }
                case 9: { Local.SetClanTag("fatality "); break; }
                case 10:{ Local.SetClanTag("fatality"); break; }
                case 11:{ Local.SetClanTag("fatality "); break; }
                case 12:{ Local.SetClanTag("fatality "); break; }
                case 13:{ Local.SetClanTag("fatality "); break; }
                case 14:{ Local.SetClanTag("fatality "); break; }
                case 15:{ Local.SetClanTag("fatalit "); break; }
                case 16:{ Local.SetClanTag("fatali "); break; }
                case 17:{ Local.SetClanTag("fatal "); break; }
                case 18:{ Local.SetClanTag("fata "); break; }
                case 19:{ Local.SetClanTag("fat "); break; }
                case 20:{ Local.SetClanTag("fa "); break; }
                case 21:{ Local.SetClanTag("f "); break; }
                case 22:{ Local.SetClanTag(" "); break; }
 
 
 
         
            }
        }
    if(tag == 3)
            {
            switch((time) % 32)
            {
                case 0: { Local.SetClanTag(" "); break; }
                case 1: { Local.SetClanTag("l "); break; }
                case 2: { Local.SetClanTag("le "); break; }
                case 3: { Local.SetClanTag("leg "); break; }
                case 4: { Local.SetClanTag("lege "); break; }
                case 5: { Local.SetClanTag("legen"); break; }
                case 6: { Local.SetClanTag("legend"); break; }
                case 7: { Local.SetClanTag("legendw"); break; }
                case 8: { Local.SetClanTag("legendwa "); break; }
                case 9: { Local.SetClanTag("legendwar "); break; }
                case 10:{ Local.SetClanTag("legendware"); break; }
                case 11:{ Local.SetClanTag("legendware "); break; }
                case 12:{ Local.SetClanTag("legendware "); break; }
                case 13:{ Local.SetClanTag("legendware "); break; }
                case 14:{ Local.SetClanTag("legendware "); break; }
                case 15:{ Local.SetClanTag("legendware "); break; }
                case 16:{ Local.SetClanTag("legendware "); break; }
                case 17:{ Local.SetClanTag("legendware "); break; }
                case 18:{ Local.SetClanTag("egendware "); break; }
                case 19:{ Local.SetClanTag("gendware "); break; }
                case 20:{ Local.SetClanTag("endware "); break; }
                case 21:{ Local.SetClanTag("ndware "); break; }
                case 22:{ Local.SetClanTag("dware "); break; }
				case 23:{ Local.SetClanTag("ware "); break; }
				case 24:{ Local.SetClanTag("are "); break; }
				case 25:{ Local.SetClanTag("re "); break; }
				case 26:{ Local.SetClanTag("e "); break; }
				case 27:{ Local.SetClanTag(" "); break; }
 
 
 
         
            }
        }
    if(tag == 4)
            {
            switch((time) % 29)
            {
                case 0: { Local.SetClanTag("e "); break; }
                case 1: { Local.SetClanTag("S "); break; }
                case 2: { Local.SetClanTag("SV "); break; }
                case 3: { Local.SetClanTag("SVG "); break; }
                case 4: { Local.SetClanTag("SVGC "); break; }
                case 5: { Local.SetClanTag("SVGCO "); break; }
                case 6: { Local.SetClanTag("SVGCOR "); break; }
                case 7: { Local.SetClanTag("SVGCORD "); break; }
                case 8: { Local.SetClanTag("SVGC0RD "); break; }
                case 9: { Local.SetClanTag("SVGCORD "); break; }
                case 10:{ Local.SetClanTag("SVGC0RD "); break; }
                case 11:{ Local.SetClanTag("SVGCORD "); break; }
                case 12:{ Local.SetClanTag("SVGC0RD "); break; }
                case 13:{ Local.SetClanTag("SVGCORD "); break; }
                case 14:{ Local.SetClanTag("SVGC0RD "); break; }
                case 15:{ Local.SetClanTag("SVGCORD "); break; }
                case 16:{ Local.SetClanTag("SVGCOR "); break; }
                case 17:{ Local.SetClanTag("SVGCO "); break; }
                case 18:{ Local.SetClanTag("SVGC "); break; }
                case 19:{ Local.SetClanTag("SVG "); break; }
                case 20:{ Local.SetClanTag("SV "); break; }
                case 21:{ Local.SetClanTag("S "); break; }
                case 22:{ Local.SetClanTag("s "); break; }
				case 23:{ Local.SetClanTag("a "); break; }
				case 24:{ Local.SetClanTag("v "); break; }
				case 25:{ Local.SetClanTag("a "); break; }
				case 26:{ Local.SetClanTag("g "); break; }

 
 
 
         
            }
        }
    if(tag == 5)
            {
            switch((time) % 37)
            {
                case 0: { Local.SetClanTag("nemesis "); break; }
                case 1: { Local.SetClanTag("n3m3sis "); break; }
                case 2: { Local.SetClanTag("nemesis "); break; }
                case 3: { Local.SetClanTag("nemesis "); break; }

 
 
 
         
            }
        }
    if(tag == 6) { Local.SetClanTag("$yηořy"); }
    if(tag == 7)
            {
            switch((time) % 35)
            {
                case 0: { Local.SetClanTag("K"); break; }
                case 1: { Local.SetClanTag("K "); break; }
                case 2: { Local.SetClanTag(" "); break; }
                case 3: { Local.SetClanTag("KA "); break; }
                case 4: { Local.SetClanTag(" "); break; }
                case 5: { Local.SetClanTag("KAZ "); break; }
                case 6: { Local.SetClanTag(" "); break; }
                case 7: { Local.SetClanTag("KAZA "); break; }
                case 8: { Local.SetClanTag(" "); break; }
                case 9: { Local.SetClanTag("KAZAK "); break; }
                case 10:{ Local.SetClanTag(" "); break; }
                case 11:{ Local.SetClanTag("KAZAKH "); break; }
                case 12:{ Local.SetClanTag(" "); break; }
                case 13:{ Local.SetClanTag("KAZAKHW "); break; }
                case 14:{ Local.SetClanTag(" "); break; }
                case 15:{ Local.SetClanTag("KAZAKHWA "); break; }
                case 16:{ Local.SetClanTag(" "); break; }
                case 17:{ Local.SetClanTag("KAZAKHWAR "); break; }
                case 18:{ Local.SetClanTag(" "); break; }
                case 19:{ Local.SetClanTag("KAZAKHWARE "); break; }
                case 20:{ Local.SetClanTag("KAZAKHWAR3 "); break; }
                case 21:{ Local.SetClanTag("KAZAKHWARE "); break; }
                case 22:{ Local.SetClanTag("KAZAKHWAR3 "); break; }
				case 23:{ Local.SetClanTag(" KAZAKHWARE"); break; }
				case 24:{ Local.SetClanTag("KAZAKHWAR3 "); break; }
				case 25:{ Local.SetClanTag(""); break; }

 
 
 
         
            }
        }
    if(tag == 8) { Local.SetClanTag("onetap"); }
    if(tag == 9)
            {
            switch((time) % 35)
            {
                case 0: { Local.SetClanTag(" "); break; }
                case 1: { Local.SetClanTag("o "); break; }
                case 2: { Local.SetClanTag("0n "); break; }
                case 3: { Local.SetClanTag("on3 "); break; }
                case 4: { Local.SetClanTag("0neT "); break; }
                case 5: { Local.SetClanTag("on3ta "); break; }
                case 6: { Local.SetClanTag("0n3TaP "); break; }
                case 7: { Local.SetClanTag("onetap "); break; }
                case 8: { Local.SetClanTag("onetap. "); break; }
                case 9: { Local.SetClanTag("onetap.c "); break; }
                case 10:{ Local.SetClanTag("onetap.c0 "); break; }
                case 11:{ Local.SetClanTag("onetap.com "); break; }
                case 12:{ Local.SetClanTag("0n3TaP.c0m "); break; }
                case 13:{ Local.SetClanTag("onetap.com "); break; }
                case 14:{ Local.SetClanTag("onetap.c0 "); break; }
                case 15:{ Local.SetClanTag("onetap.c "); break; }
                case 16:{ Local.SetClanTag("onetap. "); break; }
                case 17:{ Local.SetClanTag("0n3TaP "); break; }
                case 18:{ Local.SetClanTag("on3ta"); break; }
                case 19:{ Local.SetClanTag("0neT "); break; }
                case 20:{ Local.SetClanTag("0n3 "); break; }
                case 21:{ Local.SetClanTag("one "); break; }
                case 22:{ Local.SetClanTag("0n "); break; }
				case 23:{ Local.SetClanTag("o "); break; }
				case 24:{ Local.SetClanTag("0 "); break; }
				case 25:{ Local.SetClanTag(" "); break; }

 
 
 
         
            }
        }

    }
    lasttime = time;
}
Cheat.RegisterCallback("Draw", "onRender");