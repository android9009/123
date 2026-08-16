/*ONETAP.SU Hud Engine build 0.1.DEV.18945/18952

AUTHOR https://onetap.su/members/tilestra.54952/

Current build features:

1. Killstreaks
2. Points Scoreboard (Single Player/Deathmatch board soon!)
3. Special Watermarks
4. Sound announcer from Quake Champions (Athena/Ranger) and score (lead, lost, tied)
5. Custom font from Quake Champions!
6. Healthbar, character icons
7. Ammobar!

P.S. No custom images was used >_>

MORE COMING SOON!

The mod is hardcoded too much, instead of checking through curtime i made checks just for each frame (cuz of font size bug and delay between switching/loading fonts).
Also u can replace fragged player nickname as THE ENEMY (no utf8 support in onetap SDK function - Render.String)
Mod uses custom font from Quake Champions

UPDATE DEC 14/2019 - fix for background sound bug (force_sv_cheats in onetap menu to make it work) + Casual/Ordinal mode background sound bug.
UPDATE DEC 14/2019 FIX 2 - added engine checks for round prestart and round end (for Casual mode)
UPDATE DEC 15/2019 - forced onetap sv_cheats value by default while script is running, fix watermark for 1024/1280 resolution 
UPDATE DEC 16/2019 - added more watermarks!
UPDATE DEC 17/2019 - fixed sboard/beta info Y offset position for all resolutions
UPDATE DEC 20/2019 - added animated character Healthbar (Quake Champions like), m_ArmorValue > m_iArmor (after CS:GO update)
UPDATE DEC 22/2019 - fix hud disappearing after disconnect/connect to server, added more char icons, dreamhack and starladder series watermarks and ammo hud
UDPATE DEC 23/2019 - fix for 99 hp >_<
UPDATE DEC 24/2019 - force locked hp/ap/ammo values to ingame max (100/150), added more options to enable/disable features (sboard/killstreak)
UPDATE DEC 27/2019 - added Scoreboard color fill feature (each team kill decreases fillbar by 1)
*/

//Main Settings
var iMaxPoints = 800;	//This is the target kills/Points, setup your own, 1000+ not supported

//Collecting all Vars
var iKills = 0, iSize = 0, iFrame = 0, iAlpha = 0, iTotalKills = 0, iExp = 0, iScore = 0, getExp = 0, yOffset = 0, iMedal = 0,
RedTeamScore = 0, BlueTeamScore = 0, iTeam, LoadFont = 0, iRedSize = 0, iRedFrame = 0, iRedAlpha = 0, iBlueSize = 0, iBlueFrame = 0, iBlueAlpha = 0, 
iRemoveHud = 0, iMiniSboard = 0, iBGMmus = 0, bgm = 0, mini_scoreboard_pos = 0, match_started = 0, hide_hud = 0, iArmor, iHealth, iAmmo, iSecondaryAmmo, iWeapon, iLocalPlayer,
iHpSize = 0, iHpFrame = 0, iApSize = 0, iApFrame = 0, iAmmoSize = 0, iAmmoFrame = 0, tickcount = 20/*This is because we shouldn't get it as null at game start or script reload*/,
RedSideFill = 220, BlueSideFill = 0;

//Weapon fire event
function EVENT_WEAPON_FIRE()
{
    iShotsFired = Event.GetInt("userid"); iShotsFired_index = Entity.GetEntityFromUserID(iShotsFired);
	
	//BEGIN ANIM
	if(Entity.GetLocalPlayer() == iShotsFired_index)
	{
		if(iAmmo < 0 || iSecondaryAmmo < 0)	return;	//Maybe a knife knock???
		iAmmoSize = 48, iAmmoFrame = 255;	
	}		
}

//Damage event
function EVENT_PLAYER_HURT()
{
    iHurt = Event.GetInt("userid"); iHurt_index = Entity.GetEntityFromUserID(iHurt);
	
	//BEGIN ANIM
	if(Entity.GetLocalPlayer() == iHurt_index)
	{
		iHpSize = 48, iHpFrame = 255, iApSize = 48, iApFrame = 255;	
	}		
}	

//Original HUD draw now
function EVENT_ROUND_END()
{
	hide_hud = 1;
	match_started = 0;	//FIX
}

//Original HUD draw turn OFF
function EVENT_ROUND_PRESTART()
{
	hide_hud = 0;	
	match_started = 1;	//FIX
}	

//Out match is ended
function EVENT_MATCH_END()
{
	RESET();
	
	//Next map, reset only globals
	iTotalKills = 0, iExp = 0, iScore = 0, getExp = 0, tickcount = 0/*doesn't matter here*/, iMedal = 0, RedTeamScore = 0, RedSideFill = 220, BlueSideFill = 0, BlueTeamScore = 0, bgm = 0, match_started = 0;
	
	//If background track was enabled
	//Cheat.ExecuteCommand("stopsound");
	Global.ExecuteCommand("stopsound");
}	

//Setup to default everything at round start
function EVENT_ROUND_START()
{
    RESET();
	iBGMmus = 0;
}

//HUD_REDRAW, EVERYTHING HERE IS HARDCODED
function HUD_REDRAW()
{	
	//Variables, picking up here any number
	getExp++, tickcount++;
	if(getExp > 20) getExp = 1;	//Cannot be lower
	
	//No way, if local is dead
	if (!Entity.IsAlive(Entity.GetLocalPlayer()))	return;
			
	//Load Different fonts, to render our own
	LOAD_FONTS();
	
	//Healthbar and avatar
	DRAW_HEALTH();
	
	//Read and draw armor
	DRAW_ARMOR();

	//Ammo
	DRAW_AMMO();

	//Nothing
	//DRAW_DTAP_INDICATOR();	
	
	//Scoreboard
	DRAW_SCOREBOARD();
	
	//Info about current hud engine state
	DRAW_BETA_VERSION();

	//Draw our own watermark
	DRAW_ONETAP_WATERMARK();

	//Combo Kill for Local Player
	DRAW_KILLSTREAKS();
	
}

//Dafuq this
function OnCreateMove()
{
	//To avoid spam it everytime	
	if(iRemoveHud != 1 && getCustomValue('Hud Engine: Remove CS:GO Hud'))
	{	
		Global.ExecuteCommand("cl_draw_only_deathnotices 1");
		iRemoveHud = 1;
	}
	if(iRemoveHud == 1 && !getCustomValue('Hud Engine: Remove CS:GO Hud'))
	{	
		Global.ExecuteCommand("cl_draw_only_deathnotices 0");
		iRemoveHud = 0;
	}
	if(iMiniSboard != 1 && getCustomValue('Hud Engine: Mini Sboard position'))
	{	
		Global.ExecuteCommand("cl_hud_playercount_pos 1");
		iMiniSboard = 1;
	}
	if(iMiniSboard == 1 && !getCustomValue('Hud Engine: Mini Sboard position'))
	{	
		Global.ExecuteCommand("cl_hud_playercount_pos 0");
		iMiniSboard = 0;
	}
	
	//BGM Checkout -> Valve's logic >_<, double vars
	if(iBGMmus != 1 && getCustomValue('Hud Engine: Background music'))
	{		
		bgm = 0;
		iBGMmus = 1;
	}
	if(iBGMmus == 1 && !getCustomValue('Hud Engine: Background music'))
	{	
		//Cheat.ExecuteCommand("stopsound");
		Global.ExecuteCommand("stopsound");
		bgm = 1;
		iBGMmus = 0;
	}		
}

//EVENT DEATH
function EVENT_DEATH()
{
	//Get them
    iVictim = Event.GetInt("userid"); iVictim_index = Entity.GetEntityFromUserID(iVictim);
    iAttacker = Event.GetInt("attacker"); iAttacker_index = Entity.GetEntityFromUserID(iAttacker);
	
	//Get the Killer Team here and go on, checking team frags
	myTeam = Entity.GetProp(Entity.GetLocalPlayer(), "CBaseEntity", "m_iTeamNum");
	iTeam = Entity.GetProp(iAttacker_index, "CBaseEntity", "m_iTeamNum");
	
	//Deathmatch or just frags collection from both sides, 2 - TR, 3 - CT
	if(iTeam == 2)
	{
		//Right side	
		RedTeamScore++;
		
		//This is from 0 to -220
		RedSideFill--;
		
		//RSCORE
		iRedAlpha = 255;
		iRedFrame = 255;
		iRedSize = 48;		
	}		
	if(iTeam == 3)
	{
		//Main points	
		BlueTeamScore++;
		
		//From 0 to 220
		BlueSideFill++;
		
		//BSCORE
		iBlueAlpha = 255;
		iBlueFrame = 255;
		iBlueSize = 48;			
	}

	//Setup now, to check scores and allow announcer, again hardcoding code
	if (getCustomValue('Hud Engine: Enable announcer'))
	{	
		if(myTeam == iTeam)
		{
			if(iTeam == 2)
			{		
				//This is how actually it going to work (once)
				if(RedTeamScore > BlueTeamScore && RedTeamScore-1 == BlueTeamScore)
				{
					if(getCustomValue('Hud Engine: Enable announcer'))	Global.PlaySound("ot/he_sounds/qk_vo_announcer_lead_taken.wav");
				}
			}		
			if(iTeam == 3)
			{		
				if(RedTeamScore < BlueTeamScore && RedTeamScore-1 == BlueTeamScore)
				{
					if(getCustomValue('Hud Engine: Enable announcer'))	Global.PlaySound("ot/he_sounds/qk_vo_announcer_lead_taken.wav");
				}
			}		
		}	
		else
		{
			if(iTeam == 2)
			{		
				if(RedTeamScore > BlueTeamScore && RedTeamScore == BlueTeamScore-1)
				{
					if(getCustomValue('Hud Engine: Enable announcer'))	Global.PlaySound("ot/he_sounds/qk_vo_announcer_lead_lost.wav");
				}
			}		
			if(iTeam == 3)	
			{	
				if(RedTeamScore < BlueTeamScore && RedTeamScore == BlueTeamScore-1)
				{
					if(getCustomValue('Hud Engine: Enable announcer'))	Global.PlaySound("ot/he_sounds/qk_vo_announcer_lead_lost.wav");
				}
			}		
		}
	}
	//Team are tied
	if(RedTeamScore == BlueTeamScore)	Global.PlaySound("ot/he_sounds/qk_vo_announcer_lead_tied.wav");			

	//Moved instead of spawn check
	if(Entity.GetLocalPlayer() == iVictim_index)
	{
		//bgm = 0;
		iBGMmus = 0;		
		RESET();
		//Cheat.ExecuteCommand("stopsound");
		Global.ExecuteCommand("stopsound");
	}		
   
	//This is fuck
    if(Entity.GetLocalPlayer() == iVictim_index && Entity.GetLocalPlayer() !== iAttacker_index)    return;  
   
    //A kill count only for us + info
    if(Entity.GetLocalPlayer() == iAttacker_index)
    {
		//Simulating Exp
		iExp = getExp;
		
		//Simulating score
		iScore = iExp + iScore;
		
		//Setup Y offset for medals
		yOffset = 0;
		
		//Reset if MAX (or remove if u want)
		if(iKills > 9)	iKills = 0;		
		
		//Collecting frags for each spawn
        iKills++;
			
		//Collecting total map kills
		iTotalKills++;
		
		//Every kill after 3 kills gives a medal
		if(iKills >= 3)	iMedal += 1;
		
        //Get a victim name	
        playerName = Entity.GetName(iVictim_index);
		
		//Set text size to maximum
		iSize = 48;
		
		//Frame count and transparency
		iFrame = 255;
		iAlpha = 255;

		//Some sounds, from Quake Champions .PAK
		if(getCustomValue('Hud Engine: Enable announcer'))
		{
			//This can be executed with Global.Execute, but will interrupt each other and the sample rate trouble
			if(getCustomValue('Hud Engine: Use male announcer'))
			{
				if(iKills == 1)	Global.PlaySound("ot/he_sounds/qk_vo_ranger_chatter_positive_01.wav");
				if(iKills == 2)	Global.PlaySound("ot/he_sounds/qk_vo_ranger_chatter_positive_03.wav");
				if(iKills == 3)	Global.PlaySound("ot/he_sounds/qk_vo_ranger_chatter_positive_05.wav");
				if(iKills == 4)	Global.PlaySound("ot/he_sounds/qk_vo_ranger_chatter_negative_08.wav");
				if(iKills == 5)	Global.PlaySound("ot/he_sounds/qk_vo_ranger_chatter_positive_07.wav");
				if(iKills == 6)	Global.PlaySound("ot/he_sounds/qk_vo_ranger_chatter_positive_08.wav");
				if(iKills == 7)	Global.PlaySound("ot/he_sounds/qk_vo_ranger_chatter_positive_09.wav");
				if(iKills == 8)	Global.PlaySound("ot/he_sounds/qk_vo_ranger_chatter_positive_10.wav");
				if(iKills == 9)	Global.PlaySound("ot/he_sounds/qk_vo_ranger_chatter_positive_10a.wav");
				if(iKills == 10)	Global.PlaySound("ot/he_sounds/qk_vo_ranger_chatter_positive_06.wav");
			}
			else
			{		
				if(iKills == 1)	Global.PlaySound("ot/he_sounds/qk_vo_athena_chatter_positive_01.wav");
				if(iKills == 2)	Global.PlaySound("ot/he_sounds/qk_vo_athena_chatter_positive_03.wav");
				if(iKills == 3)	Global.PlaySound("ot/he_sounds/qk_vo_athena_chatter_positive_05.wav");
				if(iKills == 4)	Global.PlaySound("ot/he_sounds/qk_vo_athena_chatter_positive_06.wav");
				if(iKills == 5)	Global.PlaySound("ot/he_sounds/qk_vo_athena_chatter_positive_07.wav");
				if(iKills == 6)	Global.PlaySound("ot/he_sounds/qk_vo_athena_chatter_positive_08.wav");
				if(iKills == 7)	Global.PlaySound("ot/he_sounds/qk_vo_athena_chatter_positive_09.wav");
				if(iKills == 8)	Global.PlaySound("ot/he_sounds/qk_vo_athena_chatter_positive_10.wav");
				if(iKills == 9)	Global.PlaySound("ot/he_sounds/qk_vo_athena_chatter_positive_10b.wav");
				if(iKills == 10)	Global.PlaySound("ot/he_sounds/qk_vo_athena_chatter_positive_06.wav");
			}	
		}
		
		//Checking out if we touched settings, the music will play after next player kill
		if(bgm == 0)
		{
			if(getCustomValue('Hud Engine: Background music'))
			{	
				//Cheat.ExecuteCommand("play black_magic.mp3");
				Global.ExecuteCommand("play black_magic.mp3");
				bgm = 1;
			}	
		}
    }
}

//Nothing special, some checks for DM
function EVENT_PLAYER_SPAWNED()
{
	match_started = 1;
	hide_hud = 0;
}

//LET'S DRAW OUR SCOREBOARD, MAINFRAME ROBOTO
function DRAW_SCOREBOARD()
{
	if(hide_hud == 1 || match_started == 0) return;
	
	//Vars for RED TEAM SCORE
	iRedAlpha--;
	iRedFrame--;

	//Vars for BLUE TEAM SCORE
	iBlueAlpha--;
	iBlueFrame--;		
	
	//Draw Scoreboard
	if(getCustomValue('Hud Engine: Enable Scoreboard'))
	{

		//This will draw the characters
		if (getCustomValue('Hud Engine: Sboard chars'))
		{
			if (getCustomValue('Sboard chars icons') == 0)	
			{	
				right_side = Render.AddTexture("ot/he_hud/sboard/right_side.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2+265, Global.GetScreenSize()[1]/8, 100, 100, right_side);
	
				left_side = Render.AddTexture("ot/he_hud/sboard/left_side.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-370, Global.GetScreenSize()[1]/8, 100, 100, left_side);
			}
			if (getCustomValue('Sboard chars icons') == 1)	
			{	
				right_side = Render.AddTexture("ot/he_hud/sboard/right_side2.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2+275, Global.GetScreenSize()[1]/8, 100, 100, right_side);
	
				left_side = Render.AddTexture("ot/he_hud/sboard/left_side2.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-370, Global.GetScreenSize()[1]/8, 100, 100, left_side);
			}
			if (getCustomValue('Sboard chars icons') == 2)	
			{	
				right_side = Render.AddTexture("ot/he_hud/sboard/right_side3.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2+275, Global.GetScreenSize()[1]/8, 100, 100, right_side);
	
				left_side = Render.AddTexture("ot/he_hud/sboard/left_side3.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-355, Global.GetScreenSize()[1]/8, 100, 100, left_side);
			}
			if (getCustomValue('Sboard chars icons') == 3)	
			{	
				right_side = Render.AddTexture("ot/he_hud/sboard/right_side4.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2+265, Global.GetScreenSize()[1]/8, 100, 100, right_side);
	
				left_side = Render.AddTexture("ot/he_hud/sboard/left_side4.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-355, Global.GetScreenSize()[1]/8, 100, 100, left_side);
			}			
		}		
		//Scoreboard RED TEAM
		/*Render.GradientRect( Global.GetScreenSize()[0]/2+50, Global.GetScreenSize()[1]/7, 220, 35, 0, [ 139, 0, 0, 200 ], [ 0, 0, 0, 100 ]);
		Render.Rect( Global.GetScreenSize()[0]/2+50, Global.GetScreenSize()[1]/7, 220, 35, [ 0, 0, 0, 50 ]);
		Render.FilledRect( Global.GetScreenSize()[0]/2+50, Global.GetScreenSize()[1]/7+35, 220, 20, [ 0, 0, 0, 80 ]);
	
		//Scoreboard BLUE TEAM
		Render.GradientRect( Global.GetScreenSize()[0]/2-270, Global.GetScreenSize()[1]/7, 220, 35, 0, [ 30, 144, 255, 200 ], [ 0, 0, 0, 100 ]);
		Render.Rect( Global.GetScreenSize()[0]/2-270, Global.GetScreenSize()[1]/7, 220, 35, [ 0, 0, 0, 50 ]);	
		Render.FilledRect( Global.GetScreenSize()[0]/2-270, Global.GetScreenSize()[1]/7+35, 220, 20, [ 0, 0, 0, 80 ]);

		//Max Kills/Points
		Render.FilledRect(Global.GetScreenSize()[0]/2-40, Global.GetScreenSize()[1]/7+34, 80, 2, [ 255, 255, 255, 150 ]);
		Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/7+35, 1, "" + iMaxPoints, [ 255, 255, 255,255 ], fontB4);
		Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/7+3, 1, "POINT", [ 255, 165, 0,255 ], fontBold);*/
	
		//Fixed Y position, this will fill the each team scorebar
		if (getCustomValue('Hud Engine: Sboard Fillpoints'))
		{		
			//Scoreboard RED TEAM	
			Render.GradientRect( Global.GetScreenSize()[0]/2+50, Global.GetScreenSize()[1]/8+15, 220, 35, 0, [ 139, 0, 0, 50 ], [ 0, 0, 0, 50 ]);		
		
			if(RedSideFill > -220)
				Render.GradientRect( Global.GetScreenSize()[0]/2+50, Global.GetScreenSize()[1]/8+15, RedSideFill, 35, 0, [ 139, 0, 0, 255 ], [ 0, 0, 0, 100 ]);
			else
				Render.GradientRect( Global.GetScreenSize()[0]/2+50, Global.GetScreenSize()[1]/8+15, 0, 35, 0, [ 139, 0, 0, 255 ], [ 0, 0, 0, 100 ]);	
		
			Render.Rect( Global.GetScreenSize()[0]/2+50, Global.GetScreenSize()[1]/8+15, 220, 35, [ 0, 0, 0, 50 ]);
			Render.FilledRect( Global.GetScreenSize()[0]/2+50, Global.GetScreenSize()[1]/8+35+15, 220, 20, [ 0, 0, 0, 80 ]);
	
			//Scoreboard BLUE TEAM		
			Render.GradientRect( Global.GetScreenSize()[0]/2-270, Global.GetScreenSize()[1]/8+15, 220, 35, 0, [ 30, 144, 255, 50 ], [ 0, 0, 0, 50 ]);
		
			if(BlueSideFill < 220)
				Render.GradientRect( Global.GetScreenSize()[0]/2-270+BlueSideFill, Global.GetScreenSize()[1]/8+15, 220-BlueSideFill, 35, 0, [ 30, 144, 255, 255 ], [ 0, 0, 0, 100 ]);
			else
				Render.GradientRect( Global.GetScreenSize()[0]/2-270, Global.GetScreenSize()[1]/8+15, 0, 35, 0, [ 30, 144, 255, 255 ], [ 0, 0, 0, 100 ]);	
	
			Render.Rect( Global.GetScreenSize()[0]/2-270, Global.GetScreenSize()[1]/8+15, 220, 35, [ 0, 0, 0, 50 ]);	
			Render.FilledRect( Global.GetScreenSize()[0]/2-270, Global.GetScreenSize()[1]/8+35+15, 220, 20, [ 0, 0, 0, 80 ]);
		}
		else
		{
			//Scoreboard RED TEAM
			Render.GradientRect( Global.GetScreenSize()[0]/2+50, Global.GetScreenSize()[1]/8+15, 220, 35, 0, [ 139, 0, 0, 255 ], [ 0, 0, 0, 50 ]);
		
			Render.Rect( Global.GetScreenSize()[0]/2+50, Global.GetScreenSize()[1]/8+15, 220, 35, [ 0, 0, 0, 50 ]);
			Render.FilledRect( Global.GetScreenSize()[0]/2+50, Global.GetScreenSize()[1]/8+35+15, 220, 20, [ 0, 0, 0, 80 ]);
	
			//Scoreboard BLUE TEAM		
			Render.GradientRect( Global.GetScreenSize()[0]/2-270, Global.GetScreenSize()[1]/8+15, 220, 35, 0, [ 30, 144, 255, 255 ], [ 0, 0, 0, 50 ]);
	
			Render.Rect( Global.GetScreenSize()[0]/2-270, Global.GetScreenSize()[1]/8+15, 220, 35, [ 0, 0, 0, 50 ]);	
			Render.FilledRect( Global.GetScreenSize()[0]/2-270, Global.GetScreenSize()[1]/8+35+15, 220, 20, [ 0, 0, 0, 80 ]);
		}		

		//Max Kills/Points
		Render.FilledRect(Global.GetScreenSize()[0]/2-40, Global.GetScreenSize()[1]/8+34+15, 80, 2, [ 255, 255, 255, 150 ]);
		Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/8+35+15, 1, "" + iMaxPoints, [ 255, 255, 255,255 ], fontB4);
		Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/8+3+15, 1, "POINT", [ 255, 165, 0,255 ], fontBold);	
	
		//RED TEAM SCORE, a digits for the right side...
		/*if(RedTeamScore < 10)
			Render.StringCustom(Global.GetScreenSize()[0]/2+210, Global.GetScreenSize()[1]/8+11, 0, "" +RedTeamScore, [ 255,255,255,255 ], fontB4);
		if(RedTeamScore > 9 && RedTeamScore < 100)
			Render.StringCustom(Global.GetScreenSize()[0]/2+190, Global.GetScreenSize()[1]/8+11, 0, "" +RedTeamScore, [ 255,255,255,255 ], fontB4);
		if(RedTeamScore > 99 && RedTeamScore < 1000)
			Render.StringCustom(Global.GetScreenSize()[0]/2+160, Global.GetScreenSize()[1]/8+11, 0, "" +RedTeamScore, [ 255,255,255,255 ], fontB4);
		if(RedTeamScore > 1000)
			Render.StringCustom(Global.GetScreenSize()[0]/2+130, Global.GetScreenSize()[1]/8+11, 0, "" +RedTeamScore, [ 255,255,255,255 ], fontB4);*/
	
		//Animated, just comment if you don't want it like that
		if(iRedFrame < 255 && iRedFrame > 0)
		{	
			if(iRedSize < 49 && iRedSize > 30)	iRedSize--;
			else	iRedSize = 30;	//doesn't matter
	
			//Hardcode and trashcode, just a three frame
			if(iRedSize < 49 && iRedSize > 42)
			{
				if(RedTeamScore < 10)
					Render.StringCustom(Global.GetScreenSize()[0]/2+210-11, Global.GetScreenSize()[1]/8+2, 0, "" +RedTeamScore, [ 0,255,127,255 ], fontB1);
				if(RedTeamScore > 9 && RedTeamScore < 100)
					Render.StringCustom(Global.GetScreenSize()[0]/2+190-11, Global.GetScreenSize()[1]/8+2, 0, "" +RedTeamScore, [ 0,255,127,255 ], fontB1);
				if(RedTeamScore > 99 && RedTeamScore < 1000)
					Render.StringCustom(Global.GetScreenSize()[0]/2+160-11, Global.GetScreenSize()[1]/8+2, 0, "" +RedTeamScore, [ 0,255,127,255 ], fontB1);
				if(RedTeamScore > 1000)
					Render.StringCustom(Global.GetScreenSize()[0]/2+130-11, Global.GetScreenSize()[1]/8+2, 0, "" +RedTeamScore, [ 0,255,127,255 ], fontB1);			
			}			
			if(iRedSize < 43 && iRedSize > 37)
			{
				if(RedTeamScore < 10)
					Render.StringCustom(Global.GetScreenSize()[0]/2+210-8, Global.GetScreenSize()[1]/8+5, 0, "" +RedTeamScore, [ 0,255,127,255 ], fontB2);
				if(RedTeamScore > 9 && RedTeamScore < 100)
					Render.StringCustom(Global.GetScreenSize()[0]/2+190-8, Global.GetScreenSize()[1]/8+5, 0, "" +RedTeamScore, [ 0,255,127,255 ], fontB2);
				if(RedTeamScore > 99 && RedTeamScore < 1000)
					Render.StringCustom(Global.GetScreenSize()[0]/2+160-8, Global.GetScreenSize()[1]/8+5, 0, "" +RedTeamScore, [ 0,255,127,255 ], fontB2);
				if(RedTeamScore > 1000)
					Render.StringCustom(Global.GetScreenSize()[0]/2+130-8, Global.GetScreenSize()[1]/8+5, 0, "" +RedTeamScore, [ 0,255,127,255 ], fontB2);			
			}		
			if(iRedSize < 38 && iRedSize > 32)
			{
				if(RedTeamScore < 10)
					Render.StringCustom(Global.GetScreenSize()[0]/2+210-5, Global.GetScreenSize()[1]/8+8, 0, "" +RedTeamScore, [ 0,255,127,255 ], fontB3);
				if(RedTeamScore > 9 && RedTeamScore < 100)
					Render.StringCustom(Global.GetScreenSize()[0]/2+190-5, Global.GetScreenSize()[1]/8+8, 0, "" +RedTeamScore, [ 0,255,127,255 ], fontB3);
				if(RedTeamScore > 99 && RedTeamScore < 1000)
					Render.StringCustom(Global.GetScreenSize()[0]/2+160-5, Global.GetScreenSize()[1]/8+8, 0, "" +RedTeamScore, [ 0,255,127,255 ], fontB3);
				if(RedTeamScore > 1000)
					Render.StringCustom(Global.GetScreenSize()[0]/2+130-5, Global.GetScreenSize()[1]/8+8, 0, "" +RedTeamScore, [ 0,255,127,255 ], fontB3);			
			}
			//A bugfix prev next step and frames... (font size)	
			if(iRedSize < 33 && iRedSize > 29)
			{
				if(RedTeamScore < 10)
					Render.StringCustom(Global.GetScreenSize()[0]/2+210, Global.GetScreenSize()[1]/8+11, 0, "" +RedTeamScore, [ 255,255,255,255 ], fontB4);
				if(RedTeamScore > 9 && RedTeamScore < 100)
					Render.StringCustom(Global.GetScreenSize()[0]/2+190, Global.GetScreenSize()[1]/8+11, 0, "" +RedTeamScore, [ 255,255,255,255 ], fontB4);
				if(RedTeamScore > 99 && RedTeamScore < 1000)
					Render.StringCustom(Global.GetScreenSize()[0]/2+160, Global.GetScreenSize()[1]/8+11, 0, "" +RedTeamScore, [ 255,255,255,255 ], fontB4);
				if(RedTeamScore > 1000)
					Render.StringCustom(Global.GetScreenSize()[0]/2+130, Global.GetScreenSize()[1]/8+11, 0, "" +RedTeamScore, [ 255,255,255,255 ], fontB4);			
			}
		}
		else
		{
			if(RedTeamScore < 10)
				Render.StringCustom(Global.GetScreenSize()[0]/2+210, Global.GetScreenSize()[1]/8+11, 0, "" +RedTeamScore, [ 255,255,255,255 ], fontB4);
			if(RedTeamScore > 9 && RedTeamScore < 100)
				Render.StringCustom(Global.GetScreenSize()[0]/2+190, Global.GetScreenSize()[1]/8+11, 0, "" +RedTeamScore, [ 255,255,255,255 ], fontB4);
			if(RedTeamScore > 99 && RedTeamScore < 1000)
				Render.StringCustom(Global.GetScreenSize()[0]/2+160, Global.GetScreenSize()[1]/8+11, 0, "" +RedTeamScore, [ 255,255,255,255 ], fontB4);
			if(RedTeamScore > 1000)
				Render.StringCustom(Global.GetScreenSize()[0]/2+130, Global.GetScreenSize()[1]/8+11, 0, "" +RedTeamScore, [ 255,255,255,255 ], fontB4);
		}
		/*FINISHED RED TEAM SIDE*/	
	
		//Team 1 TEXT
		if(getCustomValue('Hud Engine: Sboard text color'))
			Render.StringCustom(Global.GetScreenSize()[0]/2+200, Global.GetScreenSize()[1]/8+52, 0, "TEAM 1", [ 220, 20, 60,255 ], fontSM2);
		else	Render.StringCustom(Global.GetScreenSize()[0]/2+200, Global.GetScreenSize()[1]/8+52, 0, "TEAM 1", [ 255, 255, 255,255 ], fontSM2);
	
		//BLUE TEAM SCORE, no need to check this one as RED...
		//Render.StringCustom(Global.GetScreenSize()[0]/2-245, Global.GetScreenSize()[1]/8+11, 0, "" +BlueTeamScore, [ 255,255,255,255 ], fontB4);
		if(iBlueFrame < 255 && iBlueFrame > 0)
		{	
			if(iBlueSize < 49 && iBlueSize > 30)	iBlueSize--;
			else	iBlueSize = 30;
	
			if(iBlueSize < 49 && iBlueSize > 42)	Render.StringCustom(Global.GetScreenSize()[0]/2-245-11, Global.GetScreenSize()[1]/8+2, 0, "" +BlueTeamScore, [ 0,255,127,255 ], fontB1);			
			if(iBlueSize < 43 && iBlueSize > 37)	Render.StringCustom(Global.GetScreenSize()[0]/2-245-8, Global.GetScreenSize()[1]/8+5, 0, "" +BlueTeamScore, [ 0,255,127,255 ], fontB2);				
			if(iBlueSize < 38 && iBlueSize > 32)	Render.StringCustom(Global.GetScreenSize()[0]/2-245-5, Global.GetScreenSize()[1]/8+8, 0, "" +BlueTeamScore, [ 0,255,127,255 ], fontB3);
			//A bugfix prev next step and frames... (font size)	
			if(iBlueSize < 33 && iBlueSize > 29)	Render.StringCustom(Global.GetScreenSize()[0]/2-245, Global.GetScreenSize()[1]/8+11, 0, "" +BlueTeamScore, [ 255,255,255,255 ], fontB4);
		}
		else	Render.StringCustom(Global.GetScreenSize()[0]/2-245, Global.GetScreenSize()[1]/8+11, 0, "" +BlueTeamScore, [ 255,255,255,255 ], fontB4);
		/*FINISHED BLUE TEAM SIDE*/		
	
		//Team 2 TEXT
		if(getCustomValue('Hud Engine: Sboard text color'))
			Render.StringCustom(Global.GetScreenSize()[0]/2-265, Global.GetScreenSize()[1]/8+52, 0, "TEAM 2", [ 30, 144, 255,255 ], fontSM2);
		else	Render.StringCustom(Global.GetScreenSize()[0]/2-265, Global.GetScreenSize()[1]/8+52, 0, "TEAM 2", [ 255, 255, 255,255 ], fontSM2);
	}		
}

//The gray colored message about EARLY ACCESS
function DRAW_BETA_VERSION()
{
	if(hide_hud == 1 || match_started == 0) return;
	
	//EARLY ACCESS, check the mini scoreboard pos before draw
	mini_scoreboard_pos = Convar.GetInt("cl_hud_playercount_pos");
	
	//ONLY IF SBOARD IS ENABLED
	if(getCustomValue('Hud Engine: Enable Scoreboard'))
	{	
		if(getCustomValue('Hud Engine: Draw build info'))
		{	
			if (getCustomValue('Watermark type') == 0)
			{	
				if(mini_scoreboard_pos < 1)
					Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]-25, 1, "EARLY ACCESS [0.1.DEV.18945/18952] [KSIVA: 988e7 Env: US2]", [ 100,100,100,255 ], fontSM3);
				else		Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/8-10, 1, "EARLY ACCESS [0.1.DEV.18945/18952] [KSIVA: 988e7 Env: US2]", [ 100,100,100,255 ], fontSM3);
			}
			//Cuz the image too big
			else
			{
				if(mini_scoreboard_pos < 1)
					Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]-25, 1, "EARLY ACCESS [0.1.DEV.18945/18952] [KSIVA: 988e7 Env: US2]", [ 100,100,100,255 ], fontSM3);
				else		Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/8+100, 1, "EARLY ACCESS [0.1.DEV.18945/18952] [KSIVA: 988e7 Env: US2]", [ 100,100,100,255 ], fontSM3);		
			}
		}
	}	
}

//WELL EVERYONE IS CODING THEIR OWN WATERMARKS, SO LET'S DO IT TOO HEHE
function DRAW_ONETAP_WATERMARK()
{
	if(hide_hud == 1 || match_started == 0) return;
	
	//Thanks for this 
	var colors = HSVtoRGB(Global.Realtime() * 0.5, 1, 1);
	
	//Watermark, checking mini sboard before draw
	if (getCustomValue('Hud Engine: Draw watermark'))
	{
		if (getCustomValue('Watermark type') == 0)
		{	
			if(mini_scoreboard_pos < 1)
			{
				/*Render.FilledRect(Global.GetScreenSize()[0]/2+47, Global.GetScreenSize()[1]-82, 18, 1, [ 255, 255, 255, 255 ]);
				Render.FilledRect(Global.GetScreenSize()[0]/2-65, Global.GetScreenSize()[1]-82, 18, 1, [ 255, 255, 255, 255 ]);*/
				Render.GradientRect(Global.GetScreenSize()[0]/2+50, Global.GetScreenSize()[1]-82, 15, 1, 1, [colors.r, colors.g, colors.b, 255], [colors.b, colors.r, colors.g, 255]);
				Render.GradientRect(Global.GetScreenSize()[0]/2-65, Global.GetScreenSize()[1]-82, 15, 1, 1, [colors.r, colors.g, colors.b, 255], [colors.b, colors.r, colors.g, 255]);	
	
				//Wrect
				/*Render.FilledRect(Global.GetScreenSize()[0]/2-65, Global.GetScreenSize()[1]-82, 1, 37, [ 255, 255, 255, 255 ]);
				Render.FilledRect(Global.GetScreenSize()[0]/2+64, Global.GetScreenSize()[1]-82, 1, 37, [ 255, 255, 255, 255 ]);*/
				Render.GradientRect(Global.GetScreenSize()[0]/2-65, Global.GetScreenSize()[1]-82, 1, 37, 1, [colors.r, colors.g, colors.b, 255], [colors.b, colors.r, colors.g, 255]);
				Render.GradientRect(Global.GetScreenSize()[0]/2+64, Global.GetScreenSize()[1]-82, 1, 37, 1, [colors.b, colors.r, colors.g, 255], [colors.g, colors.r, colors.b, 255]);
	
				//Invert
				Render.GradientRect(Global.GetScreenSize()[0]/2-65, Global.GetScreenSize()[1]-45, 130, 1, 1, [colors.r, colors.g, colors.b, 255], [colors.b, colors.r, colors.g, 255]);			
				//Render.FilledRect(Global.GetScreenSize()[0]/2-65, Global.GetScreenSize()[1]-45, 130, 1, [ 255, 255, 255, 255 ]);	
				Render.StringCustom(Global.GetScreenSize()[0]/2-15, Global.GetScreenSize()[1]-70, 1, "ONETAP", [ 255, 255, 255,255 ], fontBold2);
				Render.StringCustom(Global.GetScreenSize()[0]/2+40, Global.GetScreenSize()[1]-70, 1, ".SU", [ 255, 0, 0, 255 ], fontBold2);
				Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]-90, 1, "TIME TO PLAY", [ 255, 255, 255,255 ], fontSM3);				
			}
			//Top side
			else
			{	
				/*Render.FilledRect(Global.GetScreenSize()[0]/2+47, Global.GetScreenSize()[1]/8-82, 18, 1, [ 255, 255, 255, 255 ]);
				Render.FilledRect(Global.GetScreenSize()[0]/2-65, Global.GetScreenSize()[1]/8-82, 18, 1, [ 255, 255, 255, 255 ]);*/
				Render.GradientRect(Global.GetScreenSize()[0]/2+50, Global.GetScreenSize()[1]/8-82, 15, 1, 1, [colors.r, colors.g, colors.b, 255], [colors.b, colors.r, colors.g, 255]);
				Render.GradientRect(Global.GetScreenSize()[0]/2-65, Global.GetScreenSize()[1]/8-82, 15, 1, 1, [colors.r, colors.g, colors.b, 255], [colors.b, colors.r, colors.g, 255]);	
	
				//Wrect
				/*Render.FilledRect(Global.GetScreenSize()[0]/2-65, Global.GetScreenSize()[1]/8-82, 1, 37, [ 255, 255, 255, 255 ]);
				Render.FilledRect(Global.GetScreenSize()[0]/2+64, Global.GetScreenSize()[1]/8-82, 1, 37, [ 255, 255, 255, 255 ]);*/
				Render.GradientRect(Global.GetScreenSize()[0]/2-65, Global.GetScreenSize()[1]/8-82, 1, 37, 1, [colors.r, colors.g, colors.b, 255], [colors.b, colors.r, colors.g, 255]);
				Render.GradientRect(Global.GetScreenSize()[0]/2+64, Global.GetScreenSize()[1]/8-82, 1, 37, 1, [colors.b, colors.r, colors.g, 255], [colors.g, colors.r, colors.b, 255]);
	
				//Invert
				Render.GradientRect(Global.GetScreenSize()[0]/2-65, Global.GetScreenSize()[1]/8-45, 130, 1, 1, [colors.r, colors.g, colors.b, 255], [colors.b, colors.r, colors.g, 255]);			
				//Render.FilledRect(Global.GetScreenSize()[0]/2-65, Global.GetScreenSize()[1]/8-45, 130, 1, [ 255, 255, 255, 255 ]);	
				Render.StringCustom(Global.GetScreenSize()[0]/2-15, Global.GetScreenSize()[1]/8-70, 1, "ONETAP", [ 255, 255, 255,255 ], fontBold2);
				Render.StringCustom(Global.GetScreenSize()[0]/2+40, Global.GetScreenSize()[1]/8-70, 1, ".SU", [ 255, 0, 0, 255 ], fontBold2);
				Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/8-90, 1, "TIME TO PLAY", [ 255, 255, 255,255 ], fontSM3);
			}	
		}
		//Actually this is very big image by itself, so just set it to bottom, if you are using low ingame resolution
		if(getCustomValue('Watermark type') == 1)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt_bg = Render.AddTexture("ot/he_hud/watermark_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt_bg);				
				
				forumBG = Render.AddTexture("ot/he_hud/watermark.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, forumBG);						
			}
			else
			{
				wt_bg = Render.AddTexture("ot/he_hud/watermark_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt_bg);			
				
				forumBG = Render.AddTexture("ot/he_hud/watermark.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, forumBG);				
			}		
		}
		if(getCustomValue('Watermark type') == 2)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt2_bg = Render.AddTexture("ot/he_hud/watermark2_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt2_bg);				
				
				wt2 = Render.AddTexture("ot/he_hud/watermark2.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt2);						
			}
			else
			{
				wt2_bg = Render.AddTexture("ot/he_hud/watermark2_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt2_bg);			
				
				wt2 = Render.AddTexture("ot/he_hud/watermark2.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt2);				
			}		
		}
		if(getCustomValue('Watermark type') == 3)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt3_bg = Render.AddTexture("ot/he_hud/watermark3_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt3_bg);				
				
				wt3 = Render.AddTexture("ot/he_hud/watermark3.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt3);						
			}
			else
			{
				wt3_bg = Render.AddTexture("ot/he_hud/watermark3_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt3_bg);			
				
				wt3 = Render.AddTexture("ot/he_hud/watermark3.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt3);				
			}		
		}
		if(getCustomValue('Watermark type') == 4)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt4_bg = Render.AddTexture("ot/he_hud/watermark4_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt4_bg);				
				
				wt4 = Render.AddTexture("ot/he_hud/watermark4.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt4);						
			}
			else
			{
				wt4_bg = Render.AddTexture("ot/he_hud/watermark4_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt4_bg);			
				
				wt4 = Render.AddTexture("ot/he_hud/watermark4.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt4);				
			}		
		}
		if(getCustomValue('Watermark type') == 5)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt5_bg = Render.AddTexture("ot/he_hud/watermark5_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt5_bg);				
				
				wt5 = Render.AddTexture("ot/he_hud/watermark5.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt5);						
			}
			else
			{
				wt5_bg = Render.AddTexture("ot/he_hud/watermark5_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt5_bg);			
				
				wt5 = Render.AddTexture("ot/he_hud/watermark5.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt5);				
			}		
		}
		if(getCustomValue('Watermark type') == 6)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt6_bg = Render.AddTexture("ot/he_hud/watermark6_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt6_bg);				
				
				wt6 = Render.AddTexture("ot/he_hud/watermark6.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt6);						
			}
			else
			{
				wt6_bg = Render.AddTexture("ot/he_hud/watermark6_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt6_bg);			
				
				wt6 = Render.AddTexture("ot/he_hud/watermark6.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt6);				
			}		
		}
		if(getCustomValue('Watermark type') == 7)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt7_bg = Render.AddTexture("ot/he_hud/watermark7_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt7_bg);				
				
				wt7 = Render.AddTexture("ot/he_hud/watermark7.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt7);						
			}
			else
			{
				wt7_bg = Render.AddTexture("ot/he_hud/watermark7_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt7_bg);			
				
				wt7 = Render.AddTexture("ot/he_hud/watermark7.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt7);				
			}		
		}
		if(getCustomValue('Watermark type') == 8)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt8_bg = Render.AddTexture("ot/he_hud/watermark8_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt8_bg);				
				
				wt8 = Render.AddTexture("ot/he_hud/watermark8.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt8);						
			}
			else
			{
				wt8_bg = Render.AddTexture("ot/he_hud/watermark8_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt8_bg);			
				
				wt8 = Render.AddTexture("ot/he_hud/watermark8.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt8);				
			}		
		}
		if(getCustomValue('Watermark type') == 9)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt9_bg = Render.AddTexture("ot/he_hud/watermark9_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt9_bg);				
				
				wt9 = Render.AddTexture("ot/he_hud/watermark9.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt9);						
			}
			else
			{
				wt9_bg = Render.AddTexture("ot/he_hud/watermark9_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt9_bg);			
				
				wt9 = Render.AddTexture("ot/he_hud/watermark9.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt9);				
			}		
		}
		if(getCustomValue('Watermark type') == 10)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt10_bg = Render.AddTexture("ot/he_hud/watermark10_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt10_bg);				
				
				wt10 = Render.AddTexture("ot/he_hud/watermark10.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt10);						
			}
			else
			{
				wt10_bg = Render.AddTexture("ot/he_hud/watermark10_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt10_bg);			
				
				wt10 = Render.AddTexture("ot/he_hud/watermark10.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt10);				
			}		
		}
		if(getCustomValue('Watermark type') == 11)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt11_bg = Render.AddTexture("ot/he_hud/watermark11_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt11_bg);				
				
				wt11 = Render.AddTexture("ot/he_hud/watermark11.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt11);						
			}
			else
			{
				wt11_bg = Render.AddTexture("ot/he_hud/watermark11_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt11_bg);			
				
				wt11 = Render.AddTexture("ot/he_hud/watermark11.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt11);				
			}		
		}
		if(getCustomValue('Watermark type') == 12)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt12_bg = Render.AddTexture("ot/he_hud/watermark12_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt12_bg);				
				
				wt12 = Render.AddTexture("ot/he_hud/watermark12.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt12);						
			}
			else
			{
				wt12_bg = Render.AddTexture("ot/he_hud/watermark12_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt12_bg);			
				
				wt12 = Render.AddTexture("ot/he_hud/watermark12.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt12);				
			}		
		}
		if(getCustomValue('Watermark type') == 13)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt13_bg = Render.AddTexture("ot/he_hud/watermark13_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt13_bg);				
				
				wt13 = Render.AddTexture("ot/he_hud/watermark13.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt13);						
			}
			else
			{
				wt13_bg = Render.AddTexture("ot/he_hud/watermark13_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt13_bg);			
				
				wt13 = Render.AddTexture("ot/he_hud/watermark13.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt13);				
			}		
		}
		if(getCustomValue('Watermark type') == 14)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt14_bg = Render.AddTexture("ot/he_hud/watermark14_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt14_bg);				
				
				wt14 = Render.AddTexture("ot/he_hud/watermark14.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt14);						
			}
			else
			{
				wt14_bg = Render.AddTexture("ot/he_hud/watermark14_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt14_bg);			
				
				wt14 = Render.AddTexture("ot/he_hud/watermark14.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt14);				
			}		
		}
		if(getCustomValue('Watermark type') == 15)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt15_bg = Render.AddTexture("ot/he_hud/watermark15_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt15_bg);				
				
				wt15 = Render.AddTexture("ot/he_hud/watermark15.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt15);						
			}
			else
			{
				wt15_bg = Render.AddTexture("ot/he_hud/watermark15_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt15_bg);			
				
				wt15 = Render.AddTexture("ot/he_hud/watermark15.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt15);				
			}		
		}
		if(getCustomValue('Watermark type') == 16)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt16_bg = Render.AddTexture("ot/he_hud/watermark16_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt16_bg);				
				
				wt16 = Render.AddTexture("ot/he_hud/watermark16.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt16);						
			}
			else
			{
				wt16_bg = Render.AddTexture("ot/he_hud/watermark16_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt16_bg);			
				
				wt16 = Render.AddTexture("ot/he_hud/watermark16.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt16);				
			}		
		}
		if(getCustomValue('Watermark type') == 17)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt17_bg = Render.AddTexture("ot/he_hud/watermark17_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt17_bg);				
				
				wt17 = Render.AddTexture("ot/he_hud/watermark17.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt17);						
			}
			else
			{
				wt17_bg = Render.AddTexture("ot/he_hud/watermark17_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt17_bg);			
				
				wt17 = Render.AddTexture("ot/he_hud/watermark17.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt17);				
			}		
		}
		if(getCustomValue('Watermark type') == 18)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt18_bg = Render.AddTexture("ot/he_hud/watermark18_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt18_bg);				
				
				wt18 = Render.AddTexture("ot/he_hud/watermark18.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt18);						
			}
			else
			{
				wt18_bg = Render.AddTexture("ot/he_hud/watermark18_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt18_bg);			
				
				wt18 = Render.AddTexture("ot/he_hud/watermark18.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt18);				
			}		
		}
		if(getCustomValue('Watermark type') == 19)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt19_bg = Render.AddTexture("ot/he_hud/watermark19_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt19_bg);				
				
				wt19 = Render.AddTexture("ot/he_hud/watermark19.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt19);						
			}
			else
			{
				wt19_bg = Render.AddTexture("ot/he_hud/watermark19_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt19_bg);			
				
				wt19 = Render.AddTexture("ot/he_hud/watermark19.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt19);				
			}		
		}
		if(getCustomValue('Watermark type') == 20)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt20_bg = Render.AddTexture("ot/he_hud/watermark20_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt20_bg);				
				
				wt20 = Render.AddTexture("ot/he_hud/watermark20.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt20);						
			}
			else
			{
				wt20_bg = Render.AddTexture("ot/he_hud/watermark20_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt20_bg);			
				
				wt20 = Render.AddTexture("ot/he_hud/watermark20.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt20);				
			}		
		}
		if(getCustomValue('Watermark type') == 21)
		{
			if(mini_scoreboard_pos < 1)
			{						
				wt21 = Render.AddTexture("ot/he_hud/dreamhack_old.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-235/2, Global.GetScreenSize()[1]-135, 820/3.5, 400/3.5, wt21);						
			}
			else
			{				
				wt21 = Render.AddTexture("ot/he_hud/dreamhack_old.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-235/2, Global.GetScreenSize()[1]/8-90, 820/3.5, 400/3.5, wt21);				
			}		
		}
		if(getCustomValue('Watermark type') == 22)
		{
			if(mini_scoreboard_pos < 1)
			{							
				wt22 = Render.AddTexture("ot/he_hud/dreamhack_2020.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-235/2, Global.GetScreenSize()[1]-135, 820/3.5, 400/3.5, wt22);						
			}
			else
			{				
				wt22 = Render.AddTexture("ot/he_hud/dreamhack_2020.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-235/2, Global.GetScreenSize()[1]/8-100, 820/3.5, 400/3.5, wt22);				
			}		
		}
		if(getCustomValue('Watermark type') == 23)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt23_bg = Render.AddTexture("ot/he_hud/tyloo_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt23_bg);				
				
				wt23 = Render.AddTexture("ot/he_hud/tyloo.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt23);						
			}
			else
			{
				wt23_bg = Render.AddTexture("ot/he_hud/tyloo_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt23_bg);			
				
				wt23 = Render.AddTexture("ot/he_hud/tyloo.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt23);				
			}		
		}
		if(getCustomValue('Watermark type') == 24)
		{
			if(mini_scoreboard_pos < 1)
			{		
				
				wt24 = Render.AddTexture("ot/he_hud/complex.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]-130, 100, 100, wt24);						
			}
			else
			{		
				
				wt24 = Render.AddTexture("ot/he_hud/complex.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-100/2, Global.GetScreenSize()[1]/8-85, 100, 100, wt24);				
			}		
		}
		if(getCustomValue('Watermark type') == 25)
		{
			if(mini_scoreboard_pos < 1)
			{
				wt25_bg = Render.AddTexture("ot/he_hud/mousesports_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-235/2, Global.GetScreenSize()[1]-135, 820/3.5, 400/3.5, wt25_bg);
				
				wt25 = Render.AddTexture("ot/he_hud/mousesports.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-235/2, Global.GetScreenSize()[1]-135, 820/3.5, 400/3.5, wt25);						
			}
			else
			{
				wt25_bg = Render.AddTexture("ot/he_hud/mousesports_bg.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-235/2, Global.GetScreenSize()[1]/8-100, 820/3.5, 400/3.5, wt25_bg);
				
				wt25 = Render.AddTexture("ot/he_hud/mousesports.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-235/2, Global.GetScreenSize()[1]/8-100, 820/3.5, 400/3.5, wt25);				
			}		
		}
		if(getCustomValue('Watermark type') == 26)
		{
			if(mini_scoreboard_pos < 1)
			{				
				wt26 = Render.AddTexture("ot/he_hud/sk.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-235/2, Global.GetScreenSize()[1]-185, 820/2.2, 400/2.2, wt26);						
			}
			else
			{				
				wt26 = Render.AddTexture("ot/he_hud/sk.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-275/2, Global.GetScreenSize()[1]/8-150, 820/2.2, 400/2.2, wt26);				
			}		
		}
		if(getCustomValue('Watermark type') == 27)
		{
			if(mini_scoreboard_pos < 1)
			{				
				wt27 = Render.AddTexture("ot/he_hud/starseries.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-330/2, Global.GetScreenSize()[1]-165, 820/2.5, 400/2.5, wt27);						
			}
			else
			{				
				wt27 = Render.AddTexture("ot/he_hud/starseries.tga");
				Render.TexturedRect(Global.GetScreenSize()[0]/2-330/2, Global.GetScreenSize()[1]/8-130, 820/2.5, 400/2.5, wt27);				
			}		
		}		
	}
}

//Effects for Local Player
function DRAW_KILLSTREAKS()
{
	if(hide_hud == 1 || match_started == 0) return;
	
	//Continue only for ourself
    if (iKills < 1) return;	

	//BUG
	/*if(iSize < 49 && iSize > 30)	iSize--;
	else	iSize = 30;
	Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]-70, 1, "" +iKills, [ 30,144,255,255 ], iSize);*/

	//Starts after our kill only
	iFrame--;
	iAlpha--;
	
	//Killstreaks started
	if(getCustomValue('Hud Engine: Enable Killstreaks'))
	{	
		//Depended on your FPS, not using globaltime/curtime
		if(iFrame < 255 && iFrame > 0)
		{	
			if(iSize < 49 && iSize > 30)	iSize--;
			else	iSize = 30;	//non logical fix for last frame	
	
			//Max 4 frame, again alien code
			if(iKills == 1)
			{	
				/*if(iSize < 49 && iSize > 42)	Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-35, 1, " " +iKills +" ENEMY ANNIHILATED", [ 0,255,127,iAlpha ], 48);
				if(iSize < 43 && iSize > 37)	Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-30, 1, " " +iKills +" ENEMY ANNIHILATED", [ 0,255,127,iAlpha ], 42);
				if(iSize < 38 && iSize > 32)	Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-25, 1, " " +iKills +" ENEMY ANNIHILATED", [ 0,255,127,iAlpha ], 36);	
				if(iSize < 33 && iSize > 29)	Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-20, 1, " " +iKills +" ENEMY ANNIHILATED", [ 30,144,255,iAlpha ], 30);*/
				if(iSize < 49 && iSize > 42)	Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-35, 1, " " +iKills +" ENEMY ANNIHILATED", [ 0,255,127,iAlpha ], fontB1 );
				if(iSize < 43 && iSize > 37)	Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-30, 1, " " +iKills +" ENEMY ANNIHILATED", [ 0,255,127,iAlpha ], fontB2 );
				if(iSize < 38 && iSize > 32)	Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-25, 1, " " +iKills +" ENEMY ANNIHILATED", [ 0,255,127,iAlpha ], fontB3 );	
				if(iSize < 33 && iSize > 29)	Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-20, 1, " " +iKills +" ENEMY ANNIHILATED", [ 30,144,255,iAlpha ], fontB4 );			
			}
			else
			{		
				/*if(iSize < 49 && iSize > 42)	Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-35, 1, " " +iKills +" ENEMIES ANNIHILATED", [ 0,255,127,iAlpha ], 48);
				if(iSize < 43 && iSize > 37)	Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-30, 1, " " +iKills +" ENEMIES ANNIHILATED", [ 0,255,127,iAlpha ], 42);
				if(iSize < 38 && iSize > 32)	Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-25, 1, " " +iKills +" ENEMIES ANNIHILATED", [ 0,255,127,iAlpha ], 36);	
				if(iSize < 33 && iSize > 29)	Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-20, 1, " " +iKills +" ENEMIES ANNIHILATED", [ 30,144,255,iAlpha ], 30);*/
				if(iSize < 49 && iSize > 42)	Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-35, 1, " " +iKills +" ENEMIES ANNIHILATED", [ 0,255,127,iAlpha ], fontB1 );
				if(iSize < 43 && iSize > 37)	Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-30, 1, " " +iKills +" ENEMIES ANNIHILATED", [ 0,255,127,iAlpha ], fontB2 );
				if(iSize < 38 && iSize > 32)	Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-25, 1, " " +iKills +" ENEMIES ANNIHILATED", [ 0,255,127,iAlpha ], fontB3 );	
				if(iSize < 33 && iSize > 29)	Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3-20, 1, " " +iKills +" ENEMIES ANNIHILATED", [ 30,144,255,iAlpha ], fontB4 );				
			}	
		
			//Killed enemy name, may have a problem with cyrillic\cn\kr\jp symbols cuz no UTF8 support
			/*if (getCustomValue('Hud Engine: Force fragged names'))	Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3+30, 1, "YOU FRAGGED " +playerName, [ 255,255,255,iAlpha ], 4);
			else	Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3+30, 1, "YOU FRAGGED THE ENEMY", [ 255,255,255,iAlpha ], 4);
			Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3+62, 1, " " +iKills + " killsreak kills with total " +iTotalKills + " frags", [ 255,255,255,iAlpha ], 1);*/
			if (getCustomValue('Hud Engine: Force fragged names'))	Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3+30, 1, "YOU FRAGGED " +playerName, [ 255,255,255,iAlpha ], fontBold);
			else	Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3+30, 1, "YOU FRAGGED THE ENEMY", [ 255,255,255,iAlpha ], fontBold);
			//Render.String(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3+62, 1, " " +iKills + " killsreak kills with total " +iTotalKills + " frags", [ 255,255,255,iAlpha ], 1);
			Render.StringCustom(Global.GetScreenSize()[0]/2, Global.GetScreenSize()[1]/3+57, 1, " " +iKills + " killstreak kills with total " +iTotalKills + " frags", [ 255,255,255,iAlpha ], fontSM);	

			//Other info
			/*Render.String(Global.GetScreenSize()[0]/3-20, Global.GetScreenSize()[1]/3+120, 0, "SUMMARY SCORE: " +iScore, [ 255,180,30,iAlpha ], 1);
			Render.String(Global.GetScreenSize()[0]/3-20, Global.GetScreenSize()[1]/3+135, 0, "SUMMARY XP: " +iExp, [ 255,180,30,iAlpha ], 1);*/
			Render.StringCustom(Global.GetScreenSize()[0]/3-80, Global.GetScreenSize()[1]/3+120, 0, "SUMMARY SCORE: " +iScore, [ 255,180,30,iAlpha ], fontSM2);
			Render.StringCustom(Global.GetScreenSize()[0]/3-80, Global.GetScreenSize()[1]/3+138, 0, "SUMMARY XP: " +iExp, [ 255,180,30,iAlpha ], fontSM2);		

			//xD, this logic is not for humans >_<
			if(yOffset <= 0 && yOffset > -120)
			{	
				yOffset--;
				/*Render.String(Global.GetScreenSize()[0]/3-60-yOffset-20, Global.GetScreenSize()[1]/3+150, 0, "KILL +" +iTotalKills, [ 255,255,255,iAlpha ], 1);
				if(iMedal > 0)	Render.String(Global.GetScreenSize()[0]/3-60-yOffset-20, Global.GetScreenSize()[1]/3+165, 0, "MEDAL +" +iMedal, [ 255,255,255,iAlpha ], 1);*/
				Render.StringCustom(Global.GetScreenSize()[0]/3-120-yOffset-80, Global.GetScreenSize()[1]/3+155, 0, "KILL +" +iTotalKills, [ 255,255,255,iAlpha ], fontSM2);
				if(iMedal > 0)	Render.StringCustom(Global.GetScreenSize()[0]/3-120-yOffset-80, Global.GetScreenSize()[1]/3+172, 0, "MEDAL +" +iMedal, [ 255,255,255,iAlpha ], fontSM2);			
			}
			else
			{
				/*Render.String(Global.GetScreenSize()[0]/3-20, Global.GetScreenSize()[1]/3+150, 0, "KILL +" +iTotalKills, [ 255,255,255,iAlpha ], 1);
				if(iMedal > 0)	Render.String(Global.GetScreenSize()[0]/3-20, Global.GetScreenSize()[1]/3+165, 0, "MEDAL +" +iMedal, [ 255,255,255,iAlpha ], 1);*/
				Render.StringCustom(Global.GetScreenSize()[0]/3-80, Global.GetScreenSize()[1]/3+155, 0, "KILL +" +iTotalKills, [ 255,255,255,iAlpha ], fontSM2);
				if(iMedal > 0)	Render.StringCustom(Global.GetScreenSize()[0]/3-80, Global.GetScreenSize()[1]/3+172, 0, "MEDAL +" +iMedal, [ 255,255,255,iAlpha ], fontSM2);
			}		
		}		
	}	
}

//QUAKE Healthbar
function DRAW_HEALTH()
{
	if(hide_hud == 1 || match_started == 0) return;
	
	iHpFrame--;
	
	if(getCustomValue('Hud Engine: Draw Health/Armor'))
	{	
		//Ranger avatar
		if(getCustomValue('Character icon') == 0)
		{	
			avatar = Render.AddTexture("ot/he_hud/char/ranger.tga");
			Render.TexturedRect(Global.GetScreenSize()[0]/8, Global.GetScreenSize()[1]-300, 300/2, 300/2, avatar);
		}
		if(getCustomValue('Character icon') == 1)
		{
			clutch = Render.AddTexture("ot/he_hud/char/clutch.tga");
			Render.TexturedRect(Global.GetScreenSize()[0]/8, Global.GetScreenSize()[1]-300, 300/2, 300/2, clutch);			
		}
		if(getCustomValue('Character icon') == 2)
		{
			sorlag = Render.AddTexture("ot/he_hud/char/sorlag.tga");
			Render.TexturedRect(Global.GetScreenSize()[0]/8, Global.GetScreenSize()[1]-300, 300/2, 300/2, sorlag);			
		}
		if(getCustomValue('Character icon') == 3)
		{
			strogg = Render.AddTexture("ot/he_hud/char/strogg.tga");
			Render.TexturedRect(Global.GetScreenSize()[0]/8, Global.GetScreenSize()[1]-300, 300/2, 300/2, strogg);			
		}
		if(getCustomValue('Character icon') == 4)
		{
			visor = Render.AddTexture("ot/he_hud/char/visor.tga");
			Render.TexturedRect(Global.GetScreenSize()[0]/8, Global.GetScreenSize()[1]-300, 300/2, 300/2, visor);			
		}
		if(getCustomValue('Character icon') == 5)
		{
			bearer = Render.AddTexture("ot/he_hud/char/bearer.tga");
			Render.TexturedRect(Global.GetScreenSize()[0]/8, Global.GetScreenSize()[1]-300, 300/2, 300/2, bearer);			
		}
		if(getCustomValue('Character icon') == 6)
		{
			knight = Render.AddTexture("ot/he_hud/char/knight.tga");
			Render.TexturedRect(Global.GetScreenSize()[0]/8, Global.GetScreenSize()[1]-300, 300/2, 300/2, knight);			
		}
		if(getCustomValue('Character icon') == 7)
		{
			anarki = Render.AddTexture("ot/he_hud/char/anarki.tga");
			Render.TexturedRect(Global.GetScreenSize()[0]/8, Global.GetScreenSize()[1]-300, 300/2, 300/2, anarki);			
		}
		if(getCustomValue('Character icon') == 8)
		{
			galena = Render.AddTexture("ot/he_hud/char/galena.tga");
			Render.TexturedRect(Global.GetScreenSize()[0]/8, Global.GetScreenSize()[1]-300, 300/2, 300/2, galena);			
		}
		if(getCustomValue('Character icon') == 9)
		{
			nyx = Render.AddTexture("ot/he_hud/char/nyx.tga");
			Render.TexturedRect(Global.GetScreenSize()[0]/8, Global.GetScreenSize()[1]-300, 300/2, 300/2, nyx);			
		}		
		if(getCustomValue('Character icon') == 10)
		{
			athena = Render.AddTexture("ot/he_hud/char/athena.tga");
			Render.TexturedRect(Global.GetScreenSize()[0]/8, Global.GetScreenSize()[1]-300, 300/2, 300/2, athena);			
		}		
	
		//Health icon
		hp_icon = Render.AddTexture("ot/he_hud/char/hp_icon.tga");
		Render.TexturedRect(Global.GetScreenSize()[0]/8+150, Global.GetScreenSize()[1]-240, 64/2, 64/2, hp_icon);
	
		//BEGIN READ BYTE + SAVE IT TO ALWAYS 100
		
		iHealth = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_iHealth");
		
		//HUDFIX
		if(iHealth > 100)	iHealth = 100;
	
		//Always white
		Render.FilledRect(Global.GetScreenSize()[0]/8+192, Global.GetScreenSize()[1]-230, 25, 13, [ 255, 255, 255, 255 ]);

		//second
		if(iHealth < 26)	
			Render.FilledRect(Global.GetScreenSize()[0]/8+192+25+5, Global.GetScreenSize()[1]-230, 25, 13, [ 220, 20, 60, 255 ]);
		else
			Render.FilledRect(Global.GetScreenSize()[0]/8+192+25+5, Global.GetScreenSize()[1]-230, 25, 13, [ 255, 255, 255, 255 ]);	
	
		//third
		if(iHealth < 51)
			Render.FilledRect(Global.GetScreenSize()[0]/8+192+25+5+25+5, Global.GetScreenSize()[1]-230, 25, 13, [ 220, 20, 60, 255 ]);
		else
			Render.FilledRect(Global.GetScreenSize()[0]/8+192+25+5+25+5, Global.GetScreenSize()[1]-230, 25, 13, [ 255, 255, 255, 255 ]);
	
		//last
		if(iHealth < 76)	
			Render.FilledRect(Global.GetScreenSize()[0]/8+192+25+5+25+5+25+5, Global.GetScreenSize()[1]-230, 25, 13, [ 220, 20, 60, 255 ]);
		else
			Render.FilledRect(Global.GetScreenSize()[0]/8+192+25+5+25+5+25+5, Global.GetScreenSize()[1]-230, 25, 13, [ 220, 255, 255, 255 ]);	
	
		//BEGIN DRAW
		if(iHpFrame < 255 && iHpFrame > 0)
		{	
			if(iHpSize < 49 && iHpSize > 30)	iHpSize--;
			else	iHpSize = 30;	//doesn't matter
		
			//Just a three frame
			if(iHpSize < 49 && iHpSize > 42)
				Render.StringCustom(Global.GetScreenSize()[0]/8+192-11, Global.GetScreenSize()[1]-275-11, 0, "" +iHealth, [ 220, 20, 60,255 ], fontB1);			
			if(iHpSize < 43 && iHpSize > 37)			
				Render.StringCustom(Global.GetScreenSize()[0]/8+192-8, Global.GetScreenSize()[1]-275-8, 0, "" +iHealth, [ 220, 20, 60,255 ], fontB2);		
			if(iHpSize < 38 && iHpSize > 32)
				Render.StringCustom(Global.GetScreenSize()[0]/8+192-5, Global.GetScreenSize()[1]-275-5, 0, "" +iHealth, [ 220, 20, 60,255 ], fontB3);
			//A bugfix prev next step and frames... (font size)	
			if(iHpSize < 33 && iHpSize > 29)
				Render.StringCustom(Global.GetScreenSize()[0]/8+192, Global.GetScreenSize()[1]-275, 0, "" +iHealth, [ 255, 255, 255,255 ], fontB4);	
		}
		//LAST AND STAY!
		else
			Render.StringCustom(Global.GetScreenSize()[0]/8+192, Global.GetScreenSize()[1]-275, 0, "" +iHealth, [ 255, 255, 255,255 ], fontB4);
		
		//Calculate now bar pos depended on Health Value
		if(iHealth < 100 && iHealth > 19)
			Render.StringCustom(Global.GetScreenSize()[0]/8+255, Global.GetScreenSize()[1]-265, 0, "/100", [ 255, 255, 255,255 ], fontBold);
		if(iHealth < 20 && iHealth > 9)
			Render.StringCustom(Global.GetScreenSize()[0]/8+245, Global.GetScreenSize()[1]-265, 0, "/100", [ 255, 255, 255,255 ], fontBold);		
		if(iHealth < 10)
			Render.StringCustom(Global.GetScreenSize()[0]/8+225, Global.GetScreenSize()[1]-265, 0, "/100", [ 255, 255, 255,255 ], fontBold);
		if(iHealth > 99)
			Render.StringCustom(Global.GetScreenSize()[0]/8+275, Global.GetScreenSize()[1]-265, 0, "/100", [ 255, 255, 255,255 ], fontBold);	//100 HP POS CALC
	}		
}

//QUAKE Armorbar
function DRAW_ARMOR()
{
	if(hide_hud == 1 || match_started == 0) return;
	
	iApFrame--;
	
	if(getCustomValue('Hud Engine: Draw Health/Armor'))
	{	
		//Armor icon
		armor_icon = Render.AddTexture("ot/he_hud/char/armor_icon.tga");
		Render.TexturedRect(Global.GetScreenSize()[0]/8+130, Global.GetScreenSize()[1]-170, 64/2, 64/2, armor_icon);
	
		//BEGIN READ BYTE
		iArmor = Entity.GetProp(Entity.GetLocalPlayer(), "CCSPlayerResource", "m_iArmor");
		
		//BUGFIX
		if(iArmor > 100)	iArmor = 100;
	
		//Construct
		Render.FilledRect(Global.GetScreenSize()[0]/8+192-20, Global.GetScreenSize()[1]-160, 25, 13, [ 255, 255, 255, 255 ]);

		if(iArmor < 26)	
			Render.FilledRect(Global.GetScreenSize()[0]/8+192+25+5-20, Global.GetScreenSize()[1]-160, 25, 13, [ 255, 255, 255, 255 ]);
		else
			Render.FilledRect(Global.GetScreenSize()[0]/8+192+25+5-20, Global.GetScreenSize()[1]-160, 25, 13, [ 255, 255, 255, 255 ]);
	
		if(iArmor < 51)
			Render.FilledRect(Global.GetScreenSize()[0]/8+192+25+5+25+5-20, Global.GetScreenSize()[1]-160, 25, 13, [ 255, 255, 255, 255 ]);
		else
			Render.FilledRect(Global.GetScreenSize()[0]/8+192+25+5+25+5-20, Global.GetScreenSize()[1]-160, 25, 13, [ 255, 255, 255, 255 ]);
	
		if(iArmor < 76)	
			Render.FilledRect(Global.GetScreenSize()[0]/8+192+25+5+25+5+25+5-20, Global.GetScreenSize()[1]-160, 25, 13, [ 255, 255, 255, 255 ]);
		else
			Render.FilledRect(Global.GetScreenSize()[0]/8+192+25+5+25+5+25+5-20, Global.GetScreenSize()[1]-160, 25, 13, [ 255, 255, 255, 255 ]);

		/*BEGIN DRAW
		btw need to check later if you jump damaged or non bullet killed*/
		if(iApFrame < 255 && iApFrame > 0)
		{	
			if(iApSize < 49 && iApSize > 30)	iApSize--;
			else	iApSize = 30;	//doesn't matter
		
			//Just a three frame
			if(iApSize < 49 && iApSize > 42)
				Render.StringCustom(Global.GetScreenSize()[0]/8+192-20-11, Global.GetScreenSize()[1]-205-11, 0, "" +iArmor, [ 220, 20, 60, 255 ], fontB1);
			if(iApSize < 43 && iApSize > 37)			
				Render.StringCustom(Global.GetScreenSize()[0]/8+192-20-8, Global.GetScreenSize()[1]-205-8, 0, "" +iArmor, [ 220, 20, 60, 255 ], fontB2);
			if(iApSize < 38 && iApSize > 32)
				Render.StringCustom(Global.GetScreenSize()[0]/8+192-20-5, Global.GetScreenSize()[1]-205-5, 0, "" +iArmor, [ 220, 20, 60, 255 ], fontB3);
			//A bugfix prev next step and frames... (font size)	
			if(iApSize < 33 && iApSize > 29)
				Render.StringCustom(Global.GetScreenSize()[0]/8+192-20, Global.GetScreenSize()[1]-205, 0, "" +iArmor, [ 255, 255, 255, 255 ], fontB4);	
		}
		//LAST AND STAY!
		else
			Render.StringCustom(Global.GetScreenSize()[0]/8+192-20, Global.GetScreenSize()[1]-205, 0, "" +iArmor, [ 255, 255, 255,255 ], fontB4);
		
		//Calculate now bar pos depended on AP Value
		if(iArmor < 100 && iArmor > 19)
			Render.StringCustom(Global.GetScreenSize()[0]/8+235, Global.GetScreenSize()[1]-195, 0, "/100", [ 255, 255, 255,255 ], fontBold);
		if(iArmor < 20 && iArmor > 9)
			Render.StringCustom(Global.GetScreenSize()[0]/8+225, Global.GetScreenSize()[1]-195, 0, "/100", [ 255, 255, 255,255 ], fontBold);		
		if(iArmor < 10)
			Render.StringCustom(Global.GetScreenSize()[0]/8+205, Global.GetScreenSize()[1]-195, 0, "/100", [ 255, 255, 255,255 ], fontBold);
		if(iArmor > 99)
			Render.StringCustom(Global.GetScreenSize()[0]/8+255, Global.GetScreenSize()[1]-195, 0, "/100", [ 255, 255, 255,255 ], fontBold);	//100 AP POS CALC		
	}		
}	

//AMMOBAR, designed by myself
function DRAW_AMMO()
{
	if(hide_hud == 1 || match_started == 0) return;
	
	iAmmoFrame--;
	
	if(getCustomValue('Hud Engine: Draw Ammobar'))
	{	
		iLocalPlayer = Entity.GetLocalPlayer();
		iWeapon = Entity.GetWeapon(iLocalPlayer);
	
		if(!iWeapon) return;	//Too quick
	
		//This shit is blinking while fakelag is enabled, so let's force it to switch not so fast... In fact this is just a bugfix
		if(tickcount > 20)
		{
			tickcount = 0;	//Reset, go make it more smoother
		
			//BEGIN READ BYTE	
			iAmmo = Entity.GetProp(iWeapon, "CBaseCombatWeapon", "m_iClip1");
			iSecondaryAmmo = Entity.GetProp(iWeapon, "CBaseCombatWeapon", "m_iPrimaryReserveAmmoCount");		
		}		
	
		//This is for -1
		if(iAmmo < 0 || iSecondaryAmmo < 0)	return;
		
		//BUGFIX FO AMMO
		if(iAmmo > 150)	iAmmo = 150;
		
		//CLIP BUGFIX
		if(iSecondaryAmmo > 300)	iSecondaryAmmo = 300;
	
		//Texture
		ammo_bg = Render.AddTexture("ot/he_hud/char/ammo_mg.tga");
		Render.TexturedRect(Global.GetScreenSize()[0]-455, Global.GetScreenSize()[1]-245, 100, 100, ammo_bg);

		//The font is left sided in .ttf, how to check the second char lengh -+??? Our delimiter should be animated too, so let's check this all (btw 1000+ not counted, but who cares???)
		if(iAmmo < 10)
			Render.FilledRect(Global.GetScreenSize()[0]-345, Global.GetScreenSize()[1]-190, 85, 2, [ 255, 255, 255, 150 ]);	
		if(iAmmo > 9 && iAmmo < 20)
			Render.FilledRect(Global.GetScreenSize()[0]-345, Global.GetScreenSize()[1]-190, 110, 2, [ 255, 255, 255, 150 ]);
		if(iAmmo > 19 && iAmmo < 100)
			Render.FilledRect(Global.GetScreenSize()[0]-345, Global.GetScreenSize()[1]-190, 135, 2, [ 255, 255, 255, 150 ]);
		if(iAmmo > 99 && iAmmo < 101)
			Render.FilledRect(Global.GetScreenSize()[0]-345, Global.GetScreenSize()[1]-190, 115, 2, [ 255, 255, 255, 150 ]);
		if(iAmmo > 101 && iAmmo < 110)
			Render.FilledRect(Global.GetScreenSize()[0]-345, Global.GetScreenSize()[1]-190, 115, 2, [ 255, 255, 255, 150 ]);		
		if(iAmmo > 109 && iAmmo < 120)
			Render.FilledRect(Global.GetScreenSize()[0]-345, Global.GetScreenSize()[1]-190, 90, 2, [ 255, 255, 255, 150 ]);
		if(iAmmo > 119)
			Render.FilledRect(Global.GetScreenSize()[0]-345, Global.GetScreenSize()[1]-190, 115, 2, [ 255, 255, 255, 150 ]);
		if(iAmmo == 101)
			Render.FilledRect(Global.GetScreenSize()[0]-345, Global.GetScreenSize()[1]-190, 90, 2, [ 255, 255, 255, 150 ]);		
	
		//Clipside
		if(iSecondaryAmmo < 100)
			Render.StringCustom(Global.GetScreenSize()[0]-318+2, Global.GetScreenSize()[1]-190, 0, "" + iSecondaryAmmo, [ 30, 144, 255, 255 ], fontB4);
		else
			Render.StringCustom(Global.GetScreenSize()[0]-350+2, Global.GetScreenSize()[1]-190, 0, "" + iSecondaryAmmo, [ 30, 144, 255, 255 ], fontB4);
	
		//Zero, grey
		if(iAmmo < 100)
			Render.StringCustom(Global.GetScreenSize()[0]-350, Global.GetScreenSize()[1]-250, 0, "0", [ 100, 100, 100,255 ], fontB1);
		if(iSecondaryAmmo < 100)
			Render.StringCustom(Global.GetScreenSize()[0]-350+2, Global.GetScreenSize()[1]-190, 0, "0", [ 100, 100, 100,255 ], fontB4);	
		
		//BEGIN DRAW
		if(iAmmoFrame < 255 && iAmmoFrame > 0)
		{	
			if(iAmmoSize < 49 && iAmmoSize > 30)	iAmmoSize--;
			else	iAmmoSize = 30;		
	
			if(iAmmo < 100)
			{	
				if(iAmmoSize < 49 && iAmmoSize > 42)
					Render.StringCustom(Global.GetScreenSize()[0]-302-8, Global.GetScreenSize()[1]-250-11, 0, "" + iAmmo, [ 0,255,127,255 ], fontBIG1);
				if(iAmmoSize < 43 && iAmmoSize > 37)			
					Render.StringCustom(Global.GetScreenSize()[0]-302-5, Global.GetScreenSize()[1]-250-8, 0, "" + iAmmo, [ 0,255,127,255 ], fontBIG2);
				if(iAmmoSize < 38 && iAmmoSize > 32)
					Render.StringCustom(Global.GetScreenSize()[0]-302-2, Global.GetScreenSize()[1]-250-5, 0, "" + iAmmo, [ 0,255,127,255 ], fontBIG3);

				if(iAmmoSize < 33 && iAmmoSize > 29)
					Render.StringCustom(Global.GetScreenSize()[0]-302, Global.GetScreenSize()[1]-250, 0, "" + iAmmo, [ 255, 255, 255,255 ], fontB1);
			}
			if(iAmmo > 99)
			{
				if(iAmmoSize < 49 && iAmmoSize > 42)
					Render.StringCustom(Global.GetScreenSize()[0]-350-8, Global.GetScreenSize()[1]-250-11, 0, "" + iAmmo, [ 0,255,127,255 ], fontBIG1);
				if(iAmmoSize < 43 && iAmmoSize > 37)			
					Render.StringCustom(Global.GetScreenSize()[0]-350-5, Global.GetScreenSize()[1]-250-8, 0, "" + iAmmo, [ 0,255,127,255 ], fontBIG2);
				if(iAmmoSize < 38 && iAmmoSize > 32)
					Render.StringCustom(Global.GetScreenSize()[0]-350-2, Global.GetScreenSize()[1]-250-5, 0, "" + iAmmo, [ 0,255,127,255 ], fontBIG3);

				if(iAmmoSize < 33 && iAmmoSize > 29)
					Render.StringCustom(Global.GetScreenSize()[0]-350, Global.GetScreenSize()[1]-250, 0, "" + iAmmo, [ 255, 255, 255,255 ], fontB1);				
			}		
		}
		else
		{	
			//+clips
			if(iAmmo < 100)
				Render.StringCustom(Global.GetScreenSize()[0]-302, Global.GetScreenSize()[1]-250, 0, "" + iAmmo, [ 255, 255, 255,255 ], fontB1);
			else
				Render.StringCustom(Global.GetScreenSize()[0]-350, Global.GetScreenSize()[1]-250, 0, "" + iAmmo, [ 255, 255, 255,255 ], fontB1);
		}		
	}	
}

function DRAW_DTAP_INDICATOR()
{
	/*DTAP_BG = Render.AddTexture("ot/he_hud/dtap_bg.tga");
	Render.TexturedRect(Global.GetScreenSize()[0]/60, Global.GetScreenSize()[1]/2, 100, 100, DTAP_BG);	
	
	DTAP_INDICATOR = Render.AddTexture("ot/he_hud/dtap_enabled.tga");
	Render.TexturedRect(Global.GetScreenSize()[0]/60, Global.GetScreenSize()[1]/2, 100, 100, DTAP_INDICATOR);*/
}

//Store and reset
function RESET()
{
	iKills = 0, iSize = 0, iFrame = 0, iAlpha = 0, yOffset = 0, iRedSize = 0, iRedFrame = 0, iRedAlpha = 0, iBlueSize = 0, iBlueFrame = 0, iBlueAlpha = 0, 
	iHpSize = 0, iHpFrame = 0, iApSize = 0, iApFrame = 0, iAmmoSize = 0, iAmmoFrame = 0;
}

//To call it
function LOAD_FONTS()
{
	//Load fonts only once
	if(LoadFont == 0)
	{	
		fontB1 = Render.AddFont("Roboto Medium", 45, 700), fontB2 = Render.AddFont("Roboto Medium", 40, 700), fontB3 = Render.AddFont("Roboto Medium", 35, 700), fontB4 = Render.AddFont("Roboto Medium", 30, 700), 
		fontSM = Render.AddFont("Roboto Medium", 15, 100), fontSM2 = Render.AddFont("Roboto Medium", 13, 100), fontSM3 = Render.AddFont("Roboto Medium", 10, 100), fontBold = Render.AddFont("Roboto Medium", 20, 700), fontBold2 = Render.AddFont("Roboto Medium", 13, 700)
		fontBIG1 = Render.AddFont("Roboto Medium", 60, 100), fontBIG2 = Render.AddFont("Roboto Medium", 55, 100), fontBIG3 = Render.AddFont("Roboto Medium", 50, 100);
		
		//LOADED!!!
		LoadFont = 1;
	}	
}		

function HSVtoRGB(h, s, v)
{
    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6)
    {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
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
	//ENABLE FOR DEBUG, WILL GIVE YOU IMMEDIATELY POINTED KILLS FOR EACH TEAM
	/*BlueTeamScore = RedTeamScore = 150;
	RedSideFill -=150;
	BlueSideFill =150;*/
	
	//RESET CLIENT CVAR ONCE (BUG)
	Global.ExecuteCommand("cl_hud_playercount_pos 0");
	Global.ExecuteCommand("stopsound");
	
	//Forcing value
	UI.SetValue("Misc", "GENERAL", "Miscellaneous", "Force sv_cheats", true);
	match_started = 1;	//Or while reloading code will become bug
	tickcount = 20;	//ammo...

	/*Global.ExecuteCommand("sv_cheats 1");
	Global.ExecuteCommand("bot_stop 1");
	Global.ExecuteCommand("mp_roundtime 60");
	Global.ExecuteCommand("mp_fraglimit 999");
	Global.ExecuteCommand("mp_restartgame 1");*/
	
	/*Giving up attempts to make more random spawn points. Current count: 44.*/	
	
	//Menu titles
	UI.AddLabel(">>>>>>>>>>>>>>>>>>>>>>>");
	UI.AddCheckbox('Hud Engine: Enable announcer');
	UI.AddCheckbox('Hud Engine: Use male announcer');
	UI.AddCheckbox('Hud Engine: Force fragged names');
	UI.AddCheckbox('Hud Engine: Enable Killstreaks');
	UI.AddCheckbox('Hud Engine: Enable Scoreboard');
	UI.AddCheckbox('Hud Engine: Sboard Fillpoints');
	UI.AddCheckbox('Hud Engine: Sboard text color');
	UI.AddCheckbox('Hud Engine: Sboard chars');
	UI.AddSliderInt('Sboard chars icons', 0, 3);
	UI.AddCheckbox('Hud Engine: Draw Health/Armor');
	//0 is ranger
	UI.AddSliderInt('Character icon', 0, 10);	
	UI.AddCheckbox('Hud Engine: Draw Ammobar');
	UI.AddCheckbox('Hud Engine: Draw watermark');
	UI.AddSliderInt('Watermark type', 0, 27);
	UI.AddCheckbox('Hud Engine: Draw build info');
	UI.AddCheckbox('Hud Engine: Remove CS:GO Hud');
	UI.AddCheckbox('Hud Engine: Mini Sboard position');
	UI.AddCheckbox('Hud Engine: Background music');
	UI.AddLabel("<<<<<<<<<<<<<<<<<<<<<<<");	
	Global.RegisterCallback("Draw", "HUD_REDRAW");
	Global.RegisterCallback("player_death", "EVENT_DEATH");
	Global.RegisterCallback("round_start", "EVENT_ROUND_START");
	Global.RegisterCallback("round_end", "EVENT_ROUND_END");
	Global.RegisterCallback("round_prestart", "EVENT_ROUND_PRESTART");
	Global.RegisterCallback("round_poststart", "EVENT_ROUND_PRESTART");
	Global.RegisterCallback("CreateMove", "OnCreateMove");
	Global.RegisterCallback("cs_intermission", "EVENT_MATCH_END");
	Global.RegisterCallback("cs_win_panel_match", "EVENT_MATCH_END");
	Global.RegisterCallback("cs_match_end_restart", "EVENT_MATCH_END");
	Global.RegisterCallback("player_spawned", "EVENT_PLAYER_SPAWNED");
	Global.RegisterCallback("player_hurt", "EVENT_PLAYER_HURT");
	Global.RegisterCallback("weapon_fire", "EVENT_WEAPON_FIRE");
}  

Main();