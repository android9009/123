var array = [];
var lasttime = 0;
var customtext = 0;

function Ticks(time) {
    var timer = time / Globals.TickInterval() + .5;
    return timer;
}
var old_text_anim = 0;
var number = 0;

function time_to_ticks(time) {
    var timer = time / Globals.TickInterval() + .5;
    return timer;
}

function anim(texta, indices) {
    if (!World.GetServerString()) return;
    if (UI.GetValue("MISC", "JAVASCRIPT", "Script items", "Clantag enabled")) {
        text_anim = "               " + texta + "                      ";
    } else {
        text_anim = "  ";
    }
    tickinterval = Globals.TickInterval();
    tickcount = Globals.Tickcount() + time_to_ticks(Local.Latency());
    slicer = tickcount / time_to_ticks(0.3);
    slicer = slicer % indices.length;
    slicer = indices[parseInt(slicer)] + 1;
    text_anim = text_anim.slice(slicer, slicer + 15);
    if (text_anim != old_text_anim) {
        if (UI.GetValue("Script Items", "Print in Console")) {
            Cheat.Print(text_anim + "\n");
        };
        Local.SetClanTag(text_anim);
    }
    old_text_anim = text_anim;
}

function clantag() {
    var shift = UI.GetValue("Script Items", "ClanTag Shift");
    customtext = UI.GetString("MISC", "JAVASCRIPT", "Script items", "Custom Clantag");
    for (i = 0; i < customtext.length + shift; i++) {
        array[i] = i;
    }
    anim(customtext, array);
}

UI.AddLabel("<> ClanTag Changer (credits @elleqt)");
UI.AddCheckbox('Clantag enabled');
UI.AddSliderInt("ClanTag Shift", 0, 100);
UI.AddTextbox("Custom Clantag");
UI.AddCheckbox('Print in Console');
UI.AddLabel("<> ClanTag Changer End");
Cheat.RegisterCallback("Draw", "clantag");