var prefer_safe_backup = false
function drawww() {
    g_Local = Entity.GetLocalPlayer( );
    g_Local_weapon = Entity.GetWeapon(g_Local);
    weapon_name = Entity.GetName(g_Local_weapon);
    g_Local_classname = Entity.GetClassName( g_Local_weapon );
    if ( g_Local_classname == "CWeaponAWP" ) {
   is_force_safe_point = UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point");
		if( !is_force_safe_point ) {
			UI.ToggleHotkey("Rage", "GENERAL", "General", "Force safe point");
			prefer_safe_backup = true
		}
	} else if ( prefer_safe_backup ) {
		UI.ToggleHotkey("Rage", "GENERAL", "General", "Force safe point");
		prefer_safe_backup = false;
	}
}

Cheat.RegisterCallback("Draw", "drawww");