UI.AddSliderInt( "Aspect ratio", 0, 10 );

function fsn( ) {
    ui_arat_val = UI.GetValue( "Aspect ratio" );

    switch ( Global.FrameStage( ) ) {
        case 5: {
            Global.ExecuteCommand( "r_aspectratio " + ui_arat_val.toString( ) );

            break;
        }
        default: break;
    }
}


Global.RegisterCallback( "FrameStageNotify", "fsn" );

