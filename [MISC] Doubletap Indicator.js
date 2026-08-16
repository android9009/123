

// Doubletap Visualizer Created By Toes
function drawDT()
{
    // Displays RED Text
        Render.String( 25, 500 - 5, 0, "DT", [255, 0, 0, 255], 4.6)
  
    // Checks If Doubletap Is Active
        if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap")) {
  
    // Displays GREEN Text
        Render.String( 25, 500 - 5, 0, "DT", [0, 255, 0, 255], 4.6);
    } 
}
Global.RegisterCallback("Draw", "drawDT")

