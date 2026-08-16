UI.AddCheckbox( "Enable Anti-Kick" );

UI.AddSliderInt( "Threshold", 1, 100 );
UI.SetValue( "MISC", "JAVASCRIPT", "Script Items", "Threshold", 80 );

var LastCommandTime;
var PotentialVotes = 0;

var Voters = 0;
var GettingKicked = false;

function GetValue( Name )
{
	var Value = UI.GetValue( "Misc", "JAVASCRIPT", "Script Items", Name );
	return Value;
}

Global.RegisterCallback( 'game_start', function()
	{ LastCommandTime = null } );

Global.RegisterCallback( 'vote_changed', function()
	{ PotentialVotes = Event.GetInt("potentialVotes") } );

function Main()
{
	var CurrentMap = Global.GetMapName();
	var Me = Entity.GetLocalPlayer();

	if ( !GetValue("Enable Anti-Kick") || CurrentMap == null || Me == null )
		return;

	var VoteOption = Event.GetInt("vote_option");
	var VoteEid = Event.GetInt("entityid");

	if ( Me != VoteEid && VoteOption == 0 ) {
		Voters = Voters + 1;
	}

	if ( Me == VoteEid && VoteOption == 1 ) {
		GettingKicked = true;
		Voters = 1;
	}

	if ( GettingKicked == false ) {
		return;
	}

	var KickPercentage = ( (Voters - 1) / ( PotentialVotes / 2 ) * 100 );

	if ( Voters > 0 && PotentialVotes > 0 && KickPercentage >= GetValue("Threshold")
		&& ( LastCommandTime == null || Global.Curtime() - LastCommandTime > 300 ) )
	{
		Global.ExecuteCommand( "callvote ChangeLevel " + CurrentMap );
		LastCommandTime = Global.Curtime();
	}

}

Global.RegisterCallback( 'vote_cast', 'Main' );