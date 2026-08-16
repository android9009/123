var screen_size = Global.GetScreenSize();
var isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
var isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
var isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
var drawLeft = 1;
var drawRight = 0, drawBack = 0;

		
function drawString()
{
	var colors = UI.GetColor("MISC", "JAVASCRIPT", "Script items", "Indicator color");
	
	if(drawLeft)
	{
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -20, 1,  "<", [ colors[0], colors[1], colors[2], 255 ], 4 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -20, 1,  ">", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +30, 1,  "v", [ 255, 255, 255, 255 ], 4 );
	}
	else if(drawRight)
	{	
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -20, 1,  "<", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -20, 1,  ">", [ colors[0], colors[1], colors[2], 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +30, 1,  "v", [ 255, 255, 255, 255 ], 4 );
	}
	else if(drawBack)
	{
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -20, 1,  "<", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -20, 1,  ">", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +30, 1,  "v", [ colors[0], colors[1], colors[2], 255 ], 4 );	
	}
}

function onCreateMove()
{
	isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
	isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
	isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
		
	if(isLeftActive)
	{	
		drawLeft = 1;
		drawBack = 0;
		drawRight = 0;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", -90 );
	}
	else if(isRightActive)
	{	
		drawLeft = 0;
		drawBack = 0;
		drawRight = 1;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 90 );
	}
	else if(isBackwardsActive)
	{	
		drawLeft = 0;
		drawBack = 1;
		drawRight = 0;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
	}
}



function Main()
{
	UI.AddHotkey( "Left Hotkey" );
	UI.AddHotkey( "Right Hotkey" );
	UI.AddHotkey( "Backwards Hotkey" );
	UI.AddColorPicker("Indicator color");
	
	//  callbacks
	Global.RegisterCallback("Draw", "drawString")
	Global.RegisterCallback("CreateMove", "onCreateMove")
}
Main();