// UI Elements
UI.AddCheckbox( "Enable Location Spammer" );

UI.AddDropdown( "Send info in",
	[ "Global Chat", "Team Chat" ]
);

UI.AddSliderInt( "Spam Delay", 64, 256 );
UI.SetValue( "MISC", "JAVASCRIPT", "Script Items", "Spam Delay", 256 );


function GetValue( Name )
{
	var Value = UI.GetValue( "Misc", "JAVASCRIPT", "Script Items", Name );
	return Value;
}

function ChatSay( String )
{
	if ( GetValue("Send info in") == "0" ) {
		Global.ExecuteCommand( "say " + String ); // Global Chat
	} else if ( GetValue("Send info in") == "1" ) {
		Global.ExecuteCommand( "say_team " + String ); // Team Chat
	}
}

var enemies = null;
var LastTickcount = 0;

function Main()
{
    if ( !GetValue("Enable Location Spammer") )
    return;

	if ( LastTickcount == 0 ) {
		LastTickcount = Global.Tickcount();
		return;
	}

	var SpamDelay = ( GetValue("Spam Delay") );
	var CurrentTickcount = Global.Tickcount();
	if ( CurrentTickcount - LastTickcount < SpamDelay ) {
		return;
	} else if ( CurrentTickcount - LastTickcount > SpamDelay ) {
		LastTickcount = CurrentTickcount;
	}

	enemies = Entity.GetEnemies();

	for ( i=0; i < enemies.length; i++ ) {
  		if ( Entity.IsAlive( enemies[i] ) ) {
			Name = Entity.GetName( enemies[i] );
			Location = Entity.GetProp( enemies[i], "CBasePlayer", "m_szLastPlaceName" );
			Health = Entity.GetProp( enemies[i], "CBasePlayer", "m_iHealth" );
			Weapon =  Entity.GetName( Entity.GetWeapon( enemies[i] ) );

			var SendInfo = ( "Player " + Name + " with " + Health + " HP " + " is at " + Location + " with weapon " + Weapon + "." );
			ChatSay(SendInfo);
  		}
	}
}
Global.RegisterCallback( "Draw", "Main" );