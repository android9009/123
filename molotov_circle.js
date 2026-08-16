function radians_to_degrees( radians ) {
    return radians * ( 180 / Math.PI );
  }


  function draw_circle( x, y, z, radius, accuracy ) {
        color = [250, 128, 114, 255]

      first = true;
      old_screen_pos = Render.WorldToScreen( [ x, y, z ] );
      for ( t = 0.000; t <= Math.PI * 2.1; t += accuracy ) {
          if ( first ) {
              world_pos = [ ( radius * Math.cos( -t ) + x ), ( radius * Math.sin(-t) + y), z];
              old_screen_pos = Render.WorldToScreen( world_pos );
              first = false;
          }
          world_pos = [(radius * Math.cos(t) + x), (radius * Math.sin(t) + y), z];
          screen_pos = Render.WorldToScreen( world_pos );
          Render.Line(screen_pos[0], screen_pos[1], old_screen_pos[0], old_screen_pos[1], color)
          old_screen_pos = screen_pos;
      }
  }


  function on_render( ) {
      entities = Entity.GetEntities();
      if( UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Molotov Circle" ) ) {
          for ( i = 0; i < entities.length; i++ ) {
              world_pos = Entity.GetRenderOrigin( entities[i] );
              name = Entity.GetClassName( entities[i] );
              screen_pos = Render.WorldToScreen( world_pos );
              
              if ( name != "CInferno" )
                  continue;
                
                draw_circle( world_pos[0], world_pos[1], world_pos[2], 180, 0.150);
          }
      }
  }
  Global.RegisterCallback("Draw", "on_render");
  UI.AddCheckbox("Molotov Circle");