

function indicator()
{
    // W Indicator
    if(Input.IsKeyPressed(0x57)) {
        Render.FilledRect( 50, 400, 45, 45, [ 229, 229, 229, 83 ] );
        Render.String( 73, 415, 3, "W", [ 0, 255, 0, 255 ] );
    } else {
        Render.FilledRect( 50, 400, 45, 45, [ 229, 229, 229, 68 ] );
        Render.String( 73, 415, 3, "W", [ 255, 255, 255, 255 ] );
    }
    // A Indicator
    if(Input.IsKeyPressed(0x41)) {
        Render.FilledRect( 5, 445, 45, 45, [ 229, 229, 229, 83 ] );
        Render.String( 28.5, 460, 3, "A", [ 0, 255, 0, 255 ] );
    } else {
        Render.FilledRect( 5, 445, 45, 45, [ 229, 229, 229, 68 ] );
        Render.String( 28, 460, 3, "A", [ 255, 255, 255, 255 ] );
    }
    // S Indicator
    if(Input.IsKeyPressed(0x53)) {
        Render.FilledRect( 50, 445, 45, 45, [ 229, 229, 229, 83 ] );
        Render.String( 73, 460, 3, "S", [ 0, 255, 0, 255 ] );
    } else {
        Render.FilledRect( 50, 445, 45, 45, [ 229, 229, 229, 68 ] );
        Render.String( 73, 460, 3, "S", [ 255, 255, 255, 255 ] );
    }
    // D Indicator
    if(Input.IsKeyPressed(0x44)) {
        Render.FilledRect( 95, 445, 45, 45, [ 229, 229, 229, 83 ] );
        Render.String( 117, 460, 3, "D", [ 0, 255, 0, 255 ] );
    } else {
        Render.FilledRect( 95, 445, 45, 45, [ 229, 229, 229, 68 ] );
        Render.String( 117, 460, 3, "D", [ 255, 255, 255, 255 ] );
    }
    // Space Indicator
    if(Input.IsKeyPressed(0x20)) {
        Render.FilledRect( 5, 490, 135, 45, [ 229, 229, 229, 83 ] );
        Render.String( 70, 505, 3, "Space", [ 0, 255, 0, 255 ] );
    } else {
        Render.FilledRect( 5, 490, 135, 45, [ 229, 229, 229, 68 ] );
        Render.String( 70, 505, 3, "Space", [ 255, 255, 255, 255 ] );
    }
    // Shift Indicator
    if(Input.IsKeyPressed(0x10)) {
        Render.FilledRect( 5, 535, 135, 45, [ 229, 229, 229, 83 ] );
        Render.String( 70, 550, 3, "Shift", [ 0, 255, 0, 255 ] );
    } else {
        Render.FilledRect( 5, 535, 135, 45, [ 229, 229, 229, 68 ] );
        Render.String( 70, 550, 3, "Shift", [ 255, 255, 255, 255 ] );
    }
}

Cheat.RegisterCallback("Draw", "indicator")

