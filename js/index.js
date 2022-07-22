const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

let speed = 7;

let tileCount = 40;
let tileSize = canvas.width / tileCount -2;
let headX = 10;
let headY = 10;

let xVelocity=0;
let yVelocity=0;

//game loop
function drawGame(){
    clearScreen(); /*resets the screen*/
    drawSnake();
setTimeout(drawGame, 1000/ speed);    

}

function clearScreen(){
    ctx.fillStyle = 'Black'
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'orange'
    ctx.fillRect(headX * tileCount, headY* tileCount, tileSize, tileSize)
}

document.body.addEventListener('keydown', keyDown);
document.body.addEventListener('keyup', keyUp);

function keyDown(event){
    //up key
    if (event.keyCode == 38){
        upPressed = true;
    }
    //down key
    if (event.keyCode == 40){
        downPressed = true;
    }
        //left key
        if (event.keyCode == 37){
            leftPressed = true;
        }
            //right key
    if (event.keyCode == 39){
        rightPressed = true;
    }
}
function keyUp(event){
    //up key
    if (event.keyCode == 38){
        upPressed = false;
    }
    //down key
    if (event.keyCode == 40){
        downPressed = false;
    }
        //left key
        if (event.keyCode == 37){
            leftPressed = false;
        }
            //right key
    if (event.keyCode == 39){
        rightPressed = false;
    }}
    
    document.body.addEventListener('keydown', keyDown);
    document.body.addEventListener('keyup', keyUp);

drawGame();

//ctx = context 