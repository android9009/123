var screen_size = Global.GetScreenSize();
var isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
var isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
var isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
var isInverted; 
var drawLeft = 1; drawHideReal = 1;
var drawRight = 0, drawBack = 0;
var leftWasPressed = false; var rightWasPressed = false; var backWasPressed = false;
function drawString()
{
	
	isDoubletap = UI.IsHotkeyActive("Rage", "Exploits", "Doubletap");
	isInverted = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
	isHideReal = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Hide real angle");
	Render.String(screen_size[0] /2 , screen_size[1] /2 +40, 0, "OPPOSITE", [ 177, 151, 255, 255 ],3 );
	if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
        isDoubletap = false
    }
	
	if(drawLeft)
	{
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -20, 1,  "<", [ 177, 151, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -20, 1,  ">", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +20, 1,  "v", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +48, 0, isInverted ? "LEFT" : "RIGHT", [ 209, 139, 230, 255 ],3 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +56, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ],3 );
		
	}
	else if(drawRight)
	{	
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -20, 1,  "<", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -20, 1,  ">", [ 177, 151, 255, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +20, 1,  "v", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +48, 0, isInverted ? "LEFT" : "RIGHT", [ 209, 139, 230, 255 ],3 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +56, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ],3 );
	}
	else if(drawBack)
	{
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -20, 1,  "<", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -20, 1,  ">", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +20, 1,  "v", [ 177, 151, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +48, 0, isInverted ? "LEFT" : "RIGHT", [ 209, 139, 230, 255 ],3 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +56, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ],3 );
	}
	else if(drawHideReal)
	{
		Render.String(screen_size[0] /2 -50, screen_size[1] /2 -20, 1,  "<", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 +50, screen_size[1] /2 -20, 1,  ">", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2, screen_size[1] /2 +20, 1,  "v", [ 255, 255, 255, 255 ], 4 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +48, 0, isHideReal ? "HIDE" : "HIDE", [ 209, 139, 230, 255 ],3 );
		Render.String(screen_size[0] /2 , screen_size[1] /2 +56, 0, isDoubletap ? "DT" : "DT", isDoubletap ? [ 124, 195, 13, 255 ] : [ 255, 0, 0, 255 ],3 );
	}
}
var oldTick = 0
var lastPressed = 0
var isHideRealActive = false
function onCreateMove()
{
	isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left Hotkey" );
	isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right Hotkey" );
	isBackwardsActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Backwards Hotkey" );
	
	
	if(isLeftActive && leftWasPressed == false)
	{	
		lastPressed = Global.Tickcount();
		isHideRealActive = false;
		leftWasPressed = true;
		backWasPressed = false;
		rightWasPressed = false;
		drawLeft = 1;
		drawBack = 0;
		drawRight = 0;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", -90 );
		UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
	} else if(isLeftActive && leftWasPressed == true && Global.Tickcount() > lastPressed + 16){
		isHideRealActive = true;
		oldTick = Global.Tickcount();
	}
	if(isRightActive && rightWasPressed == false)
	{	
		lastPressed = Global.Tickcount();
		isHideRealActive = false;
		backWasPressed = false;
		leftWasPressed = false;
		rightWasPressed = true;
		drawLeft = 0;
		drawBack = 0;
		drawRight = 1;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 90 );
		UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
		
	} else if(isRightActive && rightWasPressed == true && Global.Tickcount() > lastPressed + 16){
		isHideRealActive = true;
		oldTick = Global.Tickcount();
	}
	if(isBackwardsActive && backWasPressed == false && Global.Tickcount() > lastPressed + 16)
	{	
		lastPressed = Global.Tickcount();
		isHideRealActive = false;
		backWasPressed = true;
		rightWasPressed = false;
		leftWasPressed = false;
		drawLeft = 0;
		drawBack = 1;
		drawRight = 0;
		UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
		UI.SetValue( "Anti-Aim", "Fake Angles", "Hide real angle", false);
	} else if(isBackwardsActive && backWasPressed == true && Global.Tickcount() > lastPressed + 16) {
		isHideRealActive = true;
		oldTick = Global.Tickcount();
	}
	if(isHideRealActive)
	{
		
		if (Global.Tickcount() > oldTick + 16){
			backWasPressed = false;
			rightWasPressed = false;
			leftWasPressed = false;
			oldTick = Global.Tickcount();
		}
		
		drawLeft = 0;
		drawBack = 0;
		drawRight = 0;
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0 );
		UI.SetValue("Anti-Aim", "Fake Angles", "Hide real angle", true);
	}
}

function player_connect(){
	var uid = Event.GetInt("userid");
	if (Entity.GetEntityFromUserID(uid) == Entity.GetLocalPlayer()) {
		lastPressed = Global.Tickcount();
		oldTick = Global.Tickcount();
	}
}

function Main()
{
	UI.AddHotkey( "Left Hotkey" );
	UI.AddHotkey( "Right Hotkey" );
	UI.AddHotkey( "Backwards Hotkey" );
	
	//  callbacks
	Global.RegisterCallback("Draw", "drawString")
	Global.RegisterCallback("CreateMove", "onCreateMove")
	Global.RegisterCallback("player_connect_full", "player_connect")
}
Main();
