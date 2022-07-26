const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d"); /*ctx = context */
const snakeName = document.getElementById("snakeName")
const snakeScore = document.getElementById("snakeScore")
const submit = document.getElementById("submit")
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORE = 10;
const highScoreList = document.getElementById("highScoreList");


class SnakeTail {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// game play variables
let speed = 8;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

// Snake head starting position
let headX = 10;
let headY = 10;

const snakeTail = [];
let tailLength = 0;

// Snake food Starting position
let dotX = Math.floor(Math.random() * tileCount)
let dotY = Math.floor(Math.random() * tileCount)

// movement varilable
let xVelocity = 0;
let yVelocity = 0;

let score = 0;
const gulpSound = new Audio("/sprites/Gulp.mp3");

//game loop
function startGame() {
  changeSnakePosition(); /**/
  let result = isGameOver();
    {
    if (result) {
      return;
  }

  clearScreen(); /*resets the screen*/
  checkDotCollision(); /*Snake Eats Dot*/
  drawDot(); /*makes random dots on screen when one is Ate*/
  drawSnake(); /*Snakes starting position*/
    drawScore(); /*score text of how many dots have ben ate */
  if (score > 5) {
    speed = 11;
  }
  if (score > 10) {
    speed = 13;
  }
  if (score > 20) {
    speed = 15;
  }
  if (score > 25) {
    speed = 17;
  }
  if (score > 30) {
    speed = 20;
  }
  if (score > 40) {
    speed = 30;
  }
/*refreshes the screen while the snake is moving*/
  setTimeout(
    startGame,
    1000 / speed
      ); 
}}

// game over settings and function
function isGameOver() {
  let gameOver = false;
    // snake is not moving yet no game over
  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  //walls
  if (headX < 0) {
    gameOver = true;
  } else if (headX == tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY == tileCount) {
    gameOver = true;
  }

  //Snake body
  for (let i = 0; i < snakeTail.length; i++) {
    let part = snakeTail[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  // game over text
  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "50px Arial";
    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
}
  return gameOver;
}
// Score text on screen
function drawScore() {
  snakeScore.value = (score)
//console.log(snakeScore.value,"Top")
 }

// sets the game square when the browser is refreshed or loaded
function clearScreen() {
  ctx.fillStyle = "Black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// snake head and tail design
function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeTail.length; i++) {
    let part = snakeTail[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeTail.push(new SnakeTail(headX, headY)); //put an item at the end
  while (snakeTail.length > tailLength) {
    snakeTail.shift(); // removes the furthest item from the snake tail if its more then
  }
  ctx.fillStyle = "Orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

// Snake Food
function drawDot() {
  ctx.fillStyle = "white";
  ctx.fillRect(dotX * tileCount, dotY * tileCount, tileSize, tileSize);
}

// Snake eats Dot
function checkDotCollision() {
  if (dotX === headX && dotY == headY) {
    dotX = Math.floor(Math.random() * tileCount);
    dotY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    gulpSound.play();
  }
}

// Snake
function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

// Snake movement Keys
function keyDown(event) {
  //up key movement
  if (event.keyCode == 38){
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }
  //down key movement
  if (event.keyCode == 40){
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }
  //left key movement
  if (event.keyCode == 37){
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }
  //right key movement
  if (event.keyCode == 39){
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}


function saveHighScore (e) {
    e.preventDefault();
    const score = {
        name: snakeName.value,
        score: snakeScore.value
    };
    highScores.push(score); // add score to array
    highScores.sort( (a,b) => b.score - a.score); // sort the array
    highScores.splice(10); // cut the array to top 10
    localStorage.setItem("highScores", JSON.stringify(highScores));
}


highScoreList.innerHTML = highScores
    .map(score => {
        return (`<li>Player: ${score.name}, Score: ${score.score}</li>`);
       })
.join("");

function reload(){
    reload = location.reload();
}

//Event listeners
document.body.addEventListener("keydown", keyDown);
snakeName.addEventListener('keyup', () => {
    submit.disabled = !snakeName.value;
})
submit.addEventListener("click", reload, false);

startGame();