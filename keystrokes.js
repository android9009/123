var damage = 0;
var rgb = [0,0,0,155];

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function event_player_hurt ( ) {
    victim = Event.GetInt ( "userid" );
    victim_idx = Entity.GetEntityFromUserID ( victim );
    attacker = Event.GetInt ( "attacker" );
    attacker_idx = Entity.GetEntityFromUserID ( attacker );
  
    if ( Entity.GetLocalPlayer( ) == attacker_idx && Entity.GetLocalPlayer( ) !== victim_idx && UI.GetValue ( "Script Items" , "[ keys ] keystrokes mod" ) ) {
        // we attacked, get the damage we done and transform it into minecraft hearts
        damage = Event.GetInt ( "dmg_health" );
      
        damage /= 5;
    }
}

function event_draw ( ) {
    if ( !UI.GetValue ( "Script Items" , "[ keys ] keystrokes mod" ) )
        return;
  
    var box_size = 65;
    var box_size_slash = 22; // autistic
  
    var spacing = 5;
	
	if(UI.GetValue ( "Script Items" , "[ keys ] keystrokes chroma" )){
		color = HSVtoRGB(Globals.Tickcount() % 350 / 350, 1, 1, 1, 255);
		rgb = [color.r, color.g, color.b, 155];
	}
	
	if(!UI.GetValue ( "Script Items" , "[ keys ] keystrokes chroma" ))
		rgb = UI.GetColor ( "Script Items" , "[ keys ] keystrokes color" );
  
    // todo: support for custom colours and refactor the retarded ugly code here ( i don't know how javascript works leave me alone ).
  
    // w key
    Render.FilledRect ( UI.GetValue ( "Script Items" , "[ keys ] keystrokes position x" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes position y" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , rgb );
    // a key
    Render.FilledRect ( UI.GetValue ( "Script Items" , "[ keys ] keystrokes position x" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes position y" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , rgb );
    // s key
    Render.FilledRect ( UI.GetValue ( "Script Items" , "[ keys ] keystrokes position x" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes position y" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , rgb );
    // d key
    Render.FilledRect ( UI.GetValue ( "Script Items" , "[ keys ] keystrokes position x" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes position y" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , rgb );
    // space key
    Render.FilledRect ( UI.GetValue ( "Script Items" , "[ keys ] keystrokes position x" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes position y" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , rgb );
  
    // draw last hit damage below
    if ( UI.GetValue ( "Script Items" , "[ keys ] last hit damage mod" ) )
        Render.String ( UI.GetValue ( "Script Items" , "[ keys ] keystrokes position x" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing + box_size_slash , UI.GetValue ( "Script Items" , "[ keys ] keystrokes position y" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing + 5 , UI.GetValue ( "[ keys ] keystrokes font" ) , damage + " HEARTS DEALT" , [ 255, 255, 255, 180 ] );
  
    // w key
    if ( Global.IsKeyPressed ( 0x57 ) )
        Render.FilledRect ( UI.GetValue ( "Script Items" , "[ keys ] keystrokes position x" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes position y" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetColor ( "Script Items" , "[ keys ] keystrokes pressed color" ) );
  
    // a key
    if ( Global.IsKeyPressed ( 0x41 ) )
        Render.FilledRect ( UI.GetValue ( "Script Items" , "[ keys ] keystrokes position x" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes position y" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetColor ( "Script Items" , "[ keys ] keystrokes pressed color" ) );
  
    // s key
    if ( Global.IsKeyPressed ( 0x53 ) )
        Render.FilledRect ( UI.GetValue ( "Script Items" , "[ keys ] keystrokes position x" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes position y" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetColor ( "Script Items" , "[ keys ] keystrokes pressed color" ) );
  
    // d key
    if ( Global.IsKeyPressed ( 0x44 ) )
        Render.FilledRect ( UI.GetValue ( "Script Items" , "[ keys ] keystrokes position x" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes position y" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetColor ( "Script Items" , "[ keys ] keystrokes pressed color" ) );
	// space key
    if ( Global.IsKeyPressed ( 0x20 ) )
        Render.FilledRect ( UI.GetValue ( "Script Items" , "[ keys ] keystrokes position x" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes position y" ) + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) + spacing + UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) , UI.GetColor ( "Script Items" , "[ keys ] keystrokes pressed color" ) );
}

function main_func ( ) {
    var screen_size = Global.GetScreenSize ( );
    
	UI.AddLabel ( "-------------------------------" );
    UI.AddLabel ( "keystrokes mod by swoopae" );
	UI.AddLabel ( "edited by KibbeWater" );
  
    UI.AddCheckbox ( "[ keys ] keystrokes mod" );
	UI.AddLabel ( "" );
    UI.AddSliderInt ( "[ keys ] keystrokes position x" , 0 , screen_size [ 0 ] );
    UI.AddSliderInt ( "[ keys ] keystrokes position y" , 0 , screen_size [ 1 ] );
	UI.AddSliderInt ( "[ keys ] keystrokes size" , 0 , 100 );
	UI.AddLabel ( "" );
	UI.AddLabel ( "- Chroma only works in-game" );
	UI.AddCheckbox ( "[ keys ] keystrokes chroma" );
	UI.AddColorPicker("[ keys ] keystrokes pressed color");
	UI.AddColorPicker("[ keys ] keystrokes color");
    UI.AddLabel ( "" );
    UI.AddCheckbox ( "[ keys ] last hit damage mod" );
	
	Cheat.Print(UI.GetColor ( "Script Items" , "[ keys ] keystrokes color" ) + "-" + UI.GetColor ( "Script Items" , "[ keys ] keystrokes pressed color" ));
	
	//Set default settings if 0
	if(UI.GetValue ( "Script Items" , "[ keys ] keystrokes size" ) === 0)
		UI.SetValue( "Script Items" , "[ keys ] keystrokes size" , 65 );
	
		UI.SetColor( "Script Items" , "[ keys ] keystrokes color", [0,0,0,155]);
	
		UI.SetColor( "Script Items" , "[ keys ] keystrokes pressed color", [255,255,255,155]);
  
    Global.RegisterCallback ( "player_hurt" , "event_player_hurt" );
    Global.RegisterCallback ( "Draw" , "event_draw" );
}

main_func ( );