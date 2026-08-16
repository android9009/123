username = Cheat.GetUsername();
Cheat.Print(username + "\n");
UI.AddColorPicker("Watermark");
UI.AddCheckbox("Rainbow bar");
var color = UI.GetColor("Misc", "Javascript", "Script items", "Watermark");
if (color[3] == 0) {
	UI.SetColor("Misc", "Javascript", "Script items", "Watermark", [89, 119, 239, 255]);
}
function draw() {
	if(!World.GetServerString()) return;
	var today = new Date();
    var hours1 = today.getHours();
    var minutes1 = today.getMinutes();
    var seconds1 = today.getSeconds();
    var hours = hours1 <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":";
    var minutes = minutes1 <= 9 ? "0" + today.getMinutes() + ":" : today.getMinutes() + ":";
    var seconds = seconds1 <= 9 ? "0" + today.getSeconds() : today.getSeconds()    ;
	color = UI.GetColor("Misc", "Javascript", "Script items", "Watermark");
	var font = Render.AddFont( "Verdana", 7, 100);
	var text = "BoberHook [alpha] | " Mamedov " | delay: " +Math.round(Entity.GetProp(Entity.GetLocalPlayer(), "CPlayerResource", "m_iPing")).toString()+ "ms | " +Globals.Tickrate().toString()+ "tick | " + hours + minutes + seconds;
	var h = 18;
	var w = Render.TextSizeCustom(text, font)[0] + 8;
	var x = Global.GetScreenSize()[0];
	var y = 10;
	x = x - w - 10;
	Render.FilledRect(x, y, w, 1, [color[0], color[1], color[2], 255]);
	Render.FilledRect(x, y+2, w, h, [17, 17, 17, color[3]]);
	Render.StringCustom(x+5, y + 5, 0, text, [0,0,0,180], font);
	Render.StringCustom(x+4, y + 4, 0, text, [255,255,255,255], font);
}
Cheat.RegisterCallback("Draw", "draw");