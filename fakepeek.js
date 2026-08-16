UI.AddSliderFloat("LBY offset", -180, 180)
UI.AddSliderFloat("Real offset", -180, 180)
UI.AddSliderFloat("Fake offset", -180, 180)
UI.AddSliderFloat("Pich Zero", 1, 5)

var restrictions_cache = UI.GetValue ("Misc", "PREFORMANCE & INFORMATION", "Infomation", "Restrictions")
var hiderealangle_chance = UI.GetValue (Anti-Aim", "Fake angles", "Hide real angle")
var yawoffset_chance = UI.GetValue ("Anti-Aim", "Rage Anti-Aim", "Yaw offset")
var pich_chance = UI.GetValue ("Anti-Aim, "Extra", "Pitch")
var isOriginal = true;

function main()
{
	if (UI.IsHotkeyActive("