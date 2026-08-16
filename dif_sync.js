var screen_size = Global.GetScreenSize();
var isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Sync" );
var isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Sync" );
var isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backward Sync" );
var drawLeft = 1;
var drawRight = 0, drawBack = 0;

		
function drawString()
{
	var colors = UI.GetColor("MISC", "JAVASCRIPT", "Script items", "Indicator color");
	
	if(drawLeft)
	{
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -20, 1,  "<", [ 200, 162, 200, 255 ], 4 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -20, 1,  ">", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +25, 1,  "v", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +57, 0,  "OPPOSITE", [ 255, 140, 0, 255 ], 3 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +71, 0,  "LEFT", [ 200, 162, 200, 255 ], 3 );
	}
	else if(drawRight)
	{	
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -20, 1,  "<", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -20, 1,  ">", [ 200, 162, 200, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +25, 1,  "v", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +57, 0,  "NORMAL", [ 255, 140, 0, 255 ], 3 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +71, 0,  "RIGHT", [ 200, 162, 200, 255 ], 3 );
	}
	else if(drawBack)
	{
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -20, 1,  "<", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -20, 1,  ">", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +25, 1,  "v", [ 200, 162, 200, 255 ], 4 );	
		Render.String(screen_size[0] /2, screen_size[1] /2 +57, 0,  "OPPOSITE", [ 255, 140, 0, 255 ], 3 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +71, 0,  "BACK", [ 200, 162, 200, 255 ], 3 );
	}
}

function onCreateMove()
{
	isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Sync" );
	isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Sync" );
	isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backward Sync" );
		
	if(isLeftActive)
	{	
		drawLeft = 1;
		drawBack = 0;
		drawRight = 0;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Jitter offset", 12 );
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Auto direction", false);
	}
	else if(isRightActive)
	{	
		drawLeft = 0;
		drawBack = 0;
		drawRight = 1;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Jitter offset", -27 );
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Auto direction", false);
	}
	else if(isBackwardsActive)
	{	
		drawLeft = 0;
		drawBack = 1;
		drawRight = 0;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Jitter offset", 27 );
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Auto direction", false);
	}
}



function Main()
{
	UI.AddHotkey( "Left Sync" );
	UI.AddHotkey( "Right Sync" );
	UI.AddHotkey( "Backward Sync" );
	
	//  callbacks
	Global.RegisterCallback("Draw", "drawString")
	Global.RegisterCallback("CreateMove", "onCreateMove")
}
Main(); 