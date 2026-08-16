function drawSnapLines( )
{
    screen_center = Global.GetScreenSize( );
    screen_center[0] = screen_center[0] / 2;
    screen_center[1] = screen_center[1] / 2;

    if ( UI.GetValue( "Misc", "JAVASCRIPT", "Script items", "Snaplines" ) )
    {
        entities = Entity.GetEnemies();

        for ( i = 0; i < entities.length; i++ )
        if ( Entity.IsAlive(entities[i]) == true && Entity.IsDormant(entities[i]) == false)
{
world_pos = Entity.GetRenderOrigin( entities[i] );
            screen_pos = Render.WorldToScreen( world_pos );
            Render.Line( screen_center[0], screen_center[1], screen_pos[0], screen_pos[1], [ 255, 255, 255, 255 ] );
}
        }
    }


function Main( )
{
    UI.AddCheckbox( "Snaplines" );

    Global.RegisterCallback( "Draw", "drawSnapLines" );
}

Main( );