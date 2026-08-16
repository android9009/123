  UI.AddLabel("                   Hotkeys            ");
const x1 = UI.AddSliderInt("Hotkeys_x", 0, Global.GetScreenSize()[0]);
const y1 = UI.AddSliderInt("Hotkeys_y", 0, Global.GetScreenSize()[1]);
UI.AddColorPicker("Hotkeys");
var color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Hotkeys");
if (color[3] == 0) {
	UI.SetColor("Misc", "JAVASCRIPT", "Script items", "Hotkeys", [89, 119, 239, 255]);
}
function in_bounds(vec, x, y, x2, y2)
{
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}
function main()
{
	if(!World.GetServerString()) return;
	const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Hotkeys_x"),
            y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Hotkeys_y");
	color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Hotkeys");
	var font = Render.AddFont( "Verdana", 7, 100);
	var h = [];

     if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
       h.push("Slow walk")
     }
     if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
       h.push("Fake duck")
     }
     if (UI.IsHotkeyActive("Misc", "GENERAL", "Movement", "Auto peek")) {
       h.push("Auto peek")
     }
     if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
       h.push("Anti-aim inverter")
     }
     if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point")) {
       h.push("Safe point override")
     }
     if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim")) {
       h.push("Force body aim")
     }
     if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap")) {
       h.push("Doubletap")
     }
     if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {
       h.push("Hide shots")
     }
     if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Minimum damage override")) {
       h.push("Damage override")
     }
	if (h.length > 0) {
		Render.FilledRect(x, y+3, 200, 2, [color[0], color[1], color[2], 255]);
		Render.FilledRect(x, y + 5, 200, 18, [17, 17, 17, 255]);
		Render.StringCustom(x + 100 - (Render.TextSizeCustom("Hotkeys", font)[0] / 2) + 2, y + 9, 0, "Hotkeys", [0, 0, 0, 180], font);
		Render.StringCustom(x + 100 - (Render.TextSizeCustom("Hotkeys", font)[0] / 2) + 1, y + 8, 0, "Hotkeys", [255, 255, 255, 255], font);
		Render.FilledRect(x, y + 23, 200, 18 * h.length, [17, 17, 17, color[3]]);
		for (i = 0; i < h.length; i++)
		{
			Render.StringCustom(x + 102 - (Render.TextSizeCustom(h[i], font)[0] / 2), y + 26 + 18 * i, 0, h[i], [0, 0, 0, 180], font);
			Render.StringCustom(x + 101 - (Render.TextSizeCustom(h[i], font)[0] / 2), y + 26 + 18 * i, 0, h[i], [255, 255, 255, 255], font);
		}
	}
    if (Global.IsKeyPressed(1) && UI.IsMenuOpen()) {
        const mouse_pos = Global.GetCursorPosition();
        if (in_bounds(mouse_pos, x, y, x + 200, y + 30)) {
            UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Hotkeys_x", mouse_pos[0] - 100);
            UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Hotkeys_y", mouse_pos[1] - 20);
        }
    }

}
Global.RegisterCallback("Draw", "main")