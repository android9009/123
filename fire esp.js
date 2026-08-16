function FireShow( )
{

    entities = Entity.GetEntities();
    if(UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Molotov Esp")){
        for ( i = 0; i < entities.length; i++ )
        {
                world_pos = Entity.GetRenderOrigin( entities[i] );
                world_pos[2] += 26;
                name = Entity.GetClassName( entities[i] );
                screen_pos = Render.WorldToScreen( world_pos );
                if (name != "CInferno")
                    continue;
             
                Render.String( screen_pos[0], screen_pos[1], 1, "FIRE", UI.GetColor("MISC", "JAVASCRIPT", "Script Items", "Text Color"), 3 );
               
         
        }
    }


         
       
   
}
Global.RegisterCallback("Draw", "FireShow");
UI.AddCheckbox("Molotov Esp");
colorpicker = UI.AddColorPicker("Text Color");