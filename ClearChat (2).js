UI.AddCheckbox("Enable clear chat");
UI.AddSliderInt("Clear chat speed", 1, 100);

UI.SetValue( "MISC", "JAVASCRIPT", "Script Items", "Enable clear chat", false ) // Disable by default
UI.SetValue( "MISC", "JAVASCRIPT", "Script Items", "Clear chat speed", 22 ) // Default speed: 22

var LastSpammed = Global.Tickcount();

function ClearChat()
{
	if ( !UI.GetValue( "MISC", "JAVASCRIPT", "Script Items", "Enable clear chat" ) )
		return;

	var ClearChatSpeed = ( UI.GetValue( "MISC", "JAVASCRIPT", "Script Items", "Clear chat speed" ) );

	if ( Global.Tickcount() - LastSpammed > ClearChatSpeed )
	{
		Global.ExecuteCommand( "say " + "﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽" );
		LastSpammed = Global.Tickcount();
	}

}

Global.RegisterCallback( "CreateMove", "ClearChat" );