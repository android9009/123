var local = Entity.GetLocalPlayer();
var waiting = false;
var lastJump = Globals.Curtime();
var delay = 1;
var delayed = true;
var jumps = 0;

setup();

function jump()
{
    if (!Input.IsKeyPressed(0x20))
    {
        return;
    }

    flags = Entity.GetProp(local, "CBasePlayer", "m_fFlags");
    delayMin = UI.GetValue("Script items", "Delay Min");
    delayMax = UI.GetValue("Script items", "Delay Max");
    hitchance = UI.GetValue("Script items", "Bunnyhop Hitchance");
    choke_max = UI.GetValue("Script items", "Max Jumps before choke");
    rand = Math.random() * 100;

    Cheat.Print(choke_max + " | " + jumps + "\n");

    if (rand > hitchance || (jumps >= choke_max && choke_max != 0))
    {
        Cheat.ExecuteCommand("-jump");
        delayed = false;
        lastJump = Globals.Curtime();
        waiting = true;
        jumps = 0;
        return;
    }

    delay = clamp(Math.random(), delayMin, delayMax);

    if (flags & 1 && delayed)
    {
        jumps++;
        Cheat.ExecuteCommand("+jump");
        lastJump = Globals.Curtime();
        delayed = false;
        waiting = true;
    }
    else
    {
        Cheat.ExecuteCommand("-jump");
    }
}

function setup()
{
    UI.AddSliderInt("Bunnyhop Hitchance", 0, 100);
    UI.AddSliderFloat("Delay Min", 0, 1);
    UI.AddSliderFloat("Delay Max", 0, 1);
    UI.AddSliderInt("Max Jumps before choke", 0, 10);

}

function clamp(v, min, max)
{
    return Math.min(Math.max(v, min), max);
}

function count()
{
    if ((Globals.Curtime() - lastJump > delay) && waiting)
    {
        delayed = true;
        waiting = false;
    }
}

Cheat.RegisterCallback("CreateMove", "jump");
Cheat.RegisterCallback("Draw", "count");