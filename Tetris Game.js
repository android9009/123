/*
    Tetris Game
    by kseny :D
*/

var screenSize = Global.GetScreenSize();

var boxWidth = 240;
var boxHeight = 400;

function createGamePiece(type)
{
    switch(type)
    {
        case 't': return [[0,0,0], [5,5,5], [0,5,0]];
        case 'o': return [[7,7], [7,7]];
        case 'l': return [[0,4,0], [0,4,0], [0,4,4]];
        case 'j': return [[0,1,0], [0,1,0], [1,1,0]]; 
        case 'i': return [[0,2,0,0], [0,2,0,0], [0,2,0,0], [0,2,0,0]];
        case 's': return [[0,3,3], [3,3,0], [0,0,0]];
        case 'z': return [[6,6,0], [0,6,6], [0,0,0]];
     }
}

var tetrominoesColors = [null, [255, 0, 0, 255], [255, 20, 147, 255], [255, 69, 0, 255], [255, 255, 0, 255], [128, 0, 128, 255], [50, 205, 50, 255], [0, 139, 139, 255]];

function makeMatrix(w, h)
{
    var matrix = [];
  
    for(var i = 0; i < h; i++)
    {
        matrix[i] = [];
        for(var j = 0; j < w; j++)
            matrix[i][j] = 0;
    }

    return matrix; 
}

var area = makeMatrix(12,20);
var player = { pos: {x : 0, y : 0}, matrix: null, score: 0 };
var move = 1;
var pieces = "ijlostz";
var gameRun = true;

function points()
{
    var rowCount = 1;

    outer:for(var y = area.length-1; y > 0; --y)
    {
        for(var x = 0; x < area[y].length; ++x)
        {
            if(area[y][x] === 0)
            {
                continue outer;
            }
        }

        var row = area.splice(y, 1)[0];

        for(var k = 0; k < row.length; k++)
            row[k] = 0;

        area.unshift(row);
        ++y;

        player.score += rowCount*100;
        rowCount *= 2;
    }
}

function collide(area, player)
{
    var m = player.matrix;
    var o = player.pos;

    for(var y = 0; y < m.length; ++y)
    {
        for(var x = 0; x < m[y].length; ++x)
        {
            if(m[y][x] !== 0 && (area[y+o.y] && area[y+o.y][x+o.x]) !==0)
            {
                return true;
            }
        }
    }
    return false;
};


function drawMatrix(matrix, offset)
{
    for(var i = 0; i < matrix.length; i++)
    {
        for(var j = 0; j < matrix[i].length; j ++)
        {
            if(matrix[i][j] != 0)
            {
                Render.FilledRect(screenSize[0]/2 - boxWidth/2 + j * 20 + offset.x * 20, screenSize[1]/2 - boxHeight/2 + i *20 +offset.y * 20, 20, 20, tetrominoesColors[matrix[i][j]]);
                Render.Rect(screenSize[0]/2 - boxWidth/2 + j * 20 + offset.x * 20, screenSize[1]/2 - boxHeight/2 + i *20 +offset.y * 20, 20, 20, [0, 0, 0, 255]);
            }
        }
    }
};


function merge(area, player)
{
    for(var y = 0; y < player.matrix.length; y++)   
        for(var x = 0; x < player.matrix[y].length; x++)
            if(player.matrix[y][x]) area[y+player.pos.y][x+player.pos.x] = player.matrix[y][x];
}

function rotate(matrix, dir)
{
    for(var y = 0; y < matrix.length; ++y)
    {
        for(var x = 0; x < y; ++x)
        {
            var tmp = matrix[x][y];
            matrix[x][y] = matrix[y][x];
            matrix[y][x] = tmp;
        }
    }
  
    if(dir > 0)
        for(var i = 0; i < matrix.length; i++)
            matrix[i].reverse(); 
    else
        matrix.reverse();
}

function playerReset()
{
    player.matrix = createGamePiece(pieces[Math.floor(Math.random()*pieces.length)]);
    player.pos.y = 0;
    player.pos.x = (Math.floor(area[0].length/2))-(Math.floor(player.matrix[0].length/2));

    if(collide(area, player))
    {
        for(var i = 0; i < area.length; i++)
            for(var j = 0; j < area[i].length; j++)
                area[i][j] = 0;
      
        player.score = 0;
        gameRun = false;
    }
}

function playerDrop()
{
    player.pos.y ++;

    if(collide(area, player))
    {
        player.pos.y --;
      
        merge(area, player);
        points();
        playerReset();
    }
}

function playerMove(dir)
{
    player.pos.x += dir;

    if(collide(area,player))
    {
        player.pos.x -= dir;
    }
}

function playerRotate(dir)
{
    var pos = player.pos.x;
    var offset = 1;

    rotate(player.matrix, dir);
  
    while(collide(area, player))
    {
        player.pos.x += offset;
        offset = -(offset+(offset > 0 ? 1 :-1));

        if(offset > player.matrix[0].length)
        {
            rotate(player.matrix,-dir);
            player.pos.x=pos;
            return;
        }
    }
}

var lastUpdate = 0;
var lastKeyPress = 0;

function onDrawEvent()
{
    if(!UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Play Tetris Game") || !UI.IsMenuOpen())
        return;

    Render.GradientRect(screenSize[0]/2 - boxWidth/2 - 5, screenSize[1]/2 - boxHeight/2 - 34 - 2, boxWidth + 10, 4, 1, [217, 157, 86, 255], [223, 174, 97, 255]);
    Render.FilledRect(screenSize[0]/2 - boxWidth/2 - 5, screenSize[1]/2 - boxHeight/2 - 30 - 2, boxWidth + 10, 25, [44, 48, 55, 255]);
    Render.String(screenSize[0]/2, screenSize[1]/2 - boxHeight/2 - 25 - 2, 1, "Tetris Game" + " [score: "+ player.score +"]", [255, 255, 255, 255]);

  
    Render.FilledRect(screenSize[0]/2 - boxWidth/2 - 5, screenSize[1]/2 - boxHeight/2 - 5, boxWidth + 10, boxHeight + 10, [44, 48, 55, 255]);
    Render.Rect(screenSize[0]/2 - boxWidth/2, screenSize[1]/2 - boxHeight/2, boxWidth, boxHeight, [100, 100, 100, 150]);

    var gameIsPaused = UI.IsHotkeyActive("MISC", "JAVASCRIPT", "Script Items", "Pause Tetris Game");

    if(gameIsPaused)
    {
        Render.String(screenSize[0]/2, screenSize[1]/2 - 5, 1, "The game is paused", [255, 0, 0, 255]);
        return;
    }

    if(!gameRun)
    {
        Render.String(screenSize[0]/2, screenSize[1]/2 - 15, 1, "Game over!", [255, 0, 0, 255]);
        Render.String(screenSize[0]/2, screenSize[1]/2, 1, "Press ENTER to start again", [255, 0, 0, 255]);

        if(Global.IsKeyPressed(0x0D))
            gameRun = true;
        return;
    }

    var realTime = Global.Realtime();

    if(realTime - lastKeyPress > 0.1)
    {
        if(Global.IsKeyPressed(0x25))
        {
            playerMove(-move);
        }
        else if(Global.IsKeyPressed(0x27)) {
            playerMove(+move);
        }
        else if(Global.IsKeyPressed(0x26)) {
            playerRotate(-move);
        }
        else if(Global.IsKeyPressed(0x28)) {
            playerDrop();
        }

        lastKeyPress = realTime;
    }

    if(realTime - lastUpdate > UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Tetris Speed"))
    {
        playerDrop();
        lastUpdate = realTime;
    }

    drawMatrix(area, {x : 0, y:0});
    drawMatrix(player.matrix, player.pos);
}

Global.RegisterCallback("Draw", "onDrawEvent");

UI.AddCheckbox("Play Tetris Game");
UI.AddHotkey("Pause Tetris Game");
UI.AddSliderFloat("Tetris Speed", 0.05, 0.5);

function onScriptInit()
{
    gameRun = true;
    playerReset();
}

onScriptInit();