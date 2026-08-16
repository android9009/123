var trails = [];

function rgb(speed) {
    var timer = Global.Tickcount();
    var result = [0, 0, 0, 255];

    result[0] = Math.floor(Math.sin(timer * speed + 0) * 127 + 128);
    result[1] = Math.floor(Math.sin(timer * speed + 2) * 127 + 128);
    result[2] = Math.floor(Math.sin(timer * speed + 4) * 127 + 128);
    return result;
}

function trail() {
    var localPlayer = Entity.GetLocalPlayer();
    if (Entity.IsValid(localPlayer)){
        var position = Entity.GetHitboxPosition(localPlayer, 6);
        if(Array.isArray(position)){
            trails.push({remove:Global.Tickcount() + UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Trail timer"), location:position});

            trails.forEach(function(x, y){
                var location = trails[y]["location"];
                var rainbow = rgb(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "RGB Speed")/500);
                rainbow[3] = 50;
                if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Trail RGB")) {
                    var color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Trail color");
                    rainbow = color;
                }
                var position = Render.WorldToScreen([location[0], location[1], location[2]-50.0]);
                Render.FilledRect(position[0], position[1], 15, 15, rainbow);

                var time = Global.Tickcount();
                if (trails[y]["remove"] <= time){
                    trails.splice(y, 1);
                }
            })
        }
    }
}

function init(){
    Global.RegisterCallback("Draw", "trail");
    UI.AddCheckbox('Trail RGB');
    UI.AddSliderInt("RGB Speed", 1, 100);
    UI.AddColorPicker("Trail color");
    UI.AddSliderInt("Trail timer", 1, 500);

}

init();