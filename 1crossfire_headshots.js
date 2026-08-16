/*ONETAP.SU Crossfire Headshot Killmarks
AUTHOR https://onetap.su/members/tilestra.54952/
*/

//Collecting all Vars
var iHeadMark = 0, iFrame = 0;
var Xoffset = 'CF marks X offset';
var Yoffset = 'CF marks Y offset';

//HUD_REDRAW
function HUD_REDRAW()
{	
	//Headshots
	DRAW_HEADMARKS();	
}

//EVENT DEATH
function EVENT_DEATH()
{
	//Get them
    iVictim = Event.GetInt("userid"); iVictim_index = Entity.GetEntityFromUserID(iVictim);
    iAttacker = Event.GetInt("attacker"); iAttacker_index = Entity.GetEntityFromUserID(iAttacker);
	 
	//This is fuck
    if(Entity.GetLocalPlayer() == iVictim_index && Entity.GetLocalPlayer() !== iAttacker_index)    return;  
   
    //A kill count only for us + info
    if(Entity.GetLocalPlayer() == iAttacker_index)
    {
		//1 collect this bad guys killed by hs...
		iHeadshot = Event.GetInt("headshot");	
		
		//Collecting headshots only
		if(iHeadshot)	iHeadMark ++;
		else iHeadMark = 0;
		
		//Null, the logic of this to draw the first skull after last
		if(iHeadMark == 5) iHeadMark = 1;
		
		//Frame count
		iFrame = 110;
    }
}

//Effects for Local Player
function DRAW_HEADMARKS()
{	
	//Continue only if headshot
    if (!iHeadMark || iFrame < 1) return;

	//Starts after our headshot
	iFrame--;
	
	//Started
	if(getCustomValue('Crossfire Headshots'))
	{
		//>_>
		if(iHeadMark == 1)
		{
			if(iFrame < 110 && iFrame > 100)	iRenderFrame = Render.AddTexture("ot/killmarks/FIRSTKILL/FIRSTKILL_FRAME1.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+10+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);
			if(iFrame < 101 && iFrame > 90)		Render.TexturedRect(Global.GetScreenSize()[0]/2-10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200-10+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);	
			if(iFrame < 91 && iFrame > 80)	Render.TexturedRect(Global.GetScreenSize()[0]/2+10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200-10+UI.GetValue(Yoffset),300/3, 300/3, iRenderFrame);	
			if(iFrame < 81 && iFrame > 70)	iRenderFrame = Render.AddTexture("ot/killmarks/FIRSTKILL/FIRSTKILL_FRAME2.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2-10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+10+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);
			if(iFrame < 71 && iFrame > 60)	iRenderFrame = Render.AddTexture("ot/killmarks/FIRSTKILL/FIRSTKILL_FRAME3.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 61 && iFrame > 50)	iRenderFrame = Render.AddTexture("ot/killmarks/FIRSTKILL/FIRSTKILL_FRAME4.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 51 && iFrame > 40)	iRenderFrame = Render.AddTexture("ot/killmarks/FIRSTKILL/FIRSTKILL_FRAME5.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 41 && iFrame > 30)	iRenderFrame = Render.AddTexture("ot/killmarks/FIRSTKILL/FIRSTKILL_FRAME6.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 31 && iFrame > 20)	iRenderFrame = Render.AddTexture("ot/killmarks/FIRSTKILL/FIRSTKILL_FRAME7.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);						
			if(iFrame < 21 && iFrame > 10)	iRenderFrame = Render.AddTexture("ot/killmarks/FIRSTKILL/FIRSTKILL_FRAME8.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);														
		}
		else if(iHeadMark == 2)
		{
			if(iFrame < 110 && iFrame > 100)	iRenderFrame = Render.AddTexture("ot/killmarks/DOUBLE_KILL/DOUBLE_KILL_FRAME1.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+10+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);
			if(iFrame < 101 && iFrame > 90)		Render.TexturedRect(Global.GetScreenSize()[0]/2-10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200-10+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);	
			if(iFrame < 91 && iFrame > 80)	Render.TexturedRect(Global.GetScreenSize()[0]/2+10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200-10+UI.GetValue(Yoffset),300/3, 300/3, iRenderFrame);	
			if(iFrame < 81 && iFrame > 70)	iRenderFrame = Render.AddTexture("ot/killmarks/DOUBLE_KILL/DOUBLE_KILL_FRAME2.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2-10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+10+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);
			if(iFrame < 71 && iFrame > 60)	iRenderFrame = Render.AddTexture("ot/killmarks/DOUBLE_KILL/DOUBLE_KILL_FRAME3.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 61 && iFrame > 50)	iRenderFrame = Render.AddTexture("ot/killmarks/DOUBLE_KILL/DOUBLE_KILL_FRAME4.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 51 && iFrame > 40)	iRenderFrame = Render.AddTexture("ot/killmarks/DOUBLE_KILL/DOUBLE_KILL_FRAME5.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 41 && iFrame > 30)	iRenderFrame = Render.AddTexture("ot/killmarks/DOUBLE_KILL/DOUBLE_KILL_FRAME6.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 31 && iFrame > 20)	iRenderFrame = Render.AddTexture("ot/killmarks/DOUBLE_KILL/DOUBLE_KILL_FRAME7.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);						
			if(iFrame < 21 && iFrame > 10)	iRenderFrame = Render.AddTexture("ot/killmarks/DOUBLE_KILL/DOUBLE_KILL_FRAME8.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);														
		}
		else if(iHeadMark == 3)
		{
			if(iFrame < 110 && iFrame > 100)	iRenderFrame = Render.AddTexture("ot/killmarks/TRIPPLE_KILL/TRIPPLE_KILL_FRAME1.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+10+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);
			if(iFrame < 101 && iFrame > 90)		Render.TexturedRect(Global.GetScreenSize()[0]/2-10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200-10+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);	
			if(iFrame < 91 && iFrame > 80)	Render.TexturedRect(Global.GetScreenSize()[0]/2+10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200-10+UI.GetValue(Yoffset),300/3, 300/3, iRenderFrame);	
			if(iFrame < 81 && iFrame > 70)	iRenderFrame = Render.AddTexture("ot/killmarks/TRIPPLE_KILL/TRIPPLE_KILL_FRAME2.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2-10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+10+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);
			if(iFrame < 71 && iFrame > 60)	iRenderFrame = Render.AddTexture("ot/killmarks/TRIPPLE_KILL/TRIPPLE_KILL_FRAME3.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 61 && iFrame > 50)	iRenderFrame = Render.AddTexture("ot/killmarks/TRIPPLE_KILL/TRIPPLE_KILL_FRAME4.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 51 && iFrame > 40)	iRenderFrame = Render.AddTexture("ot/killmarks/TRIPPLE_KILL/TRIPPLE_KILL_FRAME5.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 41 && iFrame > 30)	iRenderFrame = Render.AddTexture("ot/killmarks/TRIPPLE_KILL/TRIPPLE_KILL_FRAME6.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 31 && iFrame > 20)	iRenderFrame = Render.AddTexture("ot/killmarks/TRIPPLE_KILL/TRIPPLE_KILL_FRAME7.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);						
			if(iFrame < 21 && iFrame > 10)	iRenderFrame = Render.AddTexture("ot/killmarks/TRIPPLE_KILL/TRIPPLE_KILL_FRAME8.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);														
		}
		else if(iHeadMark == 4)
		{
			if(iFrame < 110 && iFrame > 100)	iRenderFrame = Render.AddTexture("ot/killmarks/MULTI_KILL/MULTI_KILL_FRAME1.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+10+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);
			if(iFrame < 101 && iFrame > 90)		Render.TexturedRect(Global.GetScreenSize()[0]/2-10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200-10+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);	
			if(iFrame < 91 && iFrame > 80)	Render.TexturedRect(Global.GetScreenSize()[0]/2+10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200-10+UI.GetValue(Yoffset),300/3, 300/3, iRenderFrame);	
			if(iFrame < 81 && iFrame > 70)	iRenderFrame = Render.AddTexture("ot/killmarks/MULTI_KILL/MULTI_KILL_FRAME2.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2-10+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+10+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);
			if(iFrame < 71 && iFrame > 60)	iRenderFrame = Render.AddTexture("ot/killmarks/MULTI_KILL/MULTI_KILL_FRAME3.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 61 && iFrame > 50)	iRenderFrame = Render.AddTexture("ot/killmarks/MULTI_KILL/MULTI_KILL_FRAME4.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 51 && iFrame > 40)	iRenderFrame = Render.AddTexture("ot/killmarks/MULTI_KILL/MULTI_KILL_FRAME5.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 41 && iFrame > 30)	iRenderFrame = Render.AddTexture("ot/killmarks/MULTI_KILL/MULTI_KILL_FRAME6.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);					
			if(iFrame < 31 && iFrame > 20)	iRenderFrame = Render.AddTexture("ot/killmarks/MULTI_KILL/MULTI_KILL_FRAME7.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);						
			if(iFrame < 21 && iFrame > 10)	iRenderFrame = Render.AddTexture("ot/killmarks/MULTI_KILL/MULTI_KILL_FRAME8.tga"), Render.TexturedRect(Global.GetScreenSize()[0]/2+UI.GetValue(Xoffset), Global.GetScreenSize()[1]/2-200+UI.GetValue(Yoffset), 300/3, 300/3, iRenderFrame);														
		}		
	}	
}

//Menu
function getCustomValue(name) 
{
	var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", name);
	return value;
}

//Our script hooks
function Main()
{
	//Menu titles
	UI.AddCheckbox('Crossfire Headshots');

	Global.RegisterCallback("Draw", "HUD_REDRAW");
	Global.RegisterCallback("player_death", "EVENT_DEATH");
	
	//4k resolution???
	UI.AddSliderInt(Xoffset, -2000, 2000);
	UI.AddSliderInt(Yoffset, -2000, 2000);	
}  

Main();