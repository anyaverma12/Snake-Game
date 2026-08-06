a = prompt("Welcome! Please enter your name: ");
a=a.trim;
alert("Welcome", `${a}`);
const board = document.querySelector("#board");
const scoreText = document.querySelector("#score"); 
const resetBtn = document.querySelector("#reset");
const context = board.getContext("2d");
const gameWidth = board.width;
const gameHeight = board.height;
const boardBackground = "white"; 
const snakeColor = "green";
const foodColor = "red"; 
const unit = 25;
let running = false;
let xVel = unit;
let yVel = 0;
let foodX;
let foodY;
let score = 0; 
let snake = [{x: unit * 4, y: 0},{x: unit * 3, y: 0},{x: unit * 2, y: 0},{x: unit, y: 0},{x: 0, y: 0}];
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
gameStart();
function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick() {
    if(running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    } else {
        displayGameOver();
    }
};
function clearBoard() {
    context.fillStyle = boardBackground;
    context.fillRect(0, 0, gameWidth, gameHeight); 
};
function createFood() {
    function random(min, max) {
        const num = Math.round((Math.random() * (max - min) + min) / unit) * unit; 
        return num;
    }
    foodX = random(0, gameWidth - unit);
    foodY = random(0, gameHeight - unit); 
};
function drawFood() {
    context.fillStyle = foodColor; 
    context.fillRect(foodX, foodY, unit, unit);
};
function moveSnake() {
    const head = {x: snake[0].x + xVel, y: snake[0].y + yVel}; 
    snake.unshift(head);
    
    if(snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
};
function drawSnake() {
    context.fillStyle = snakeColor; 
    snake.forEach(snakePart => {
        context.fillRect(snakePart.x, snakePart.y, unit, unit); 
        context.strokeRect(snakePart.x, snakePart.y, unit, unit);
    });
};
function changeDirection (event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const goingUp = (yVel==-unit);
    const goingDown = (yVel==unit);
    const goingRight = (xVel== unit);
    const goingLeft = (xVel== -unit);
    switch(true) {case (keyPressed == LEFT && ! goingRight):
        xVel= -unit; yVel = 0; break;
        case(keyPressed == UP && ! goingDown):
        xVel= 0; yVel= -unit; break;
        case(keyPressed==RIGHT && !goingLeft):
        xVel=unit; yVel=0; break;
        case(keyPressed==DOWN && !goingUp):
        xVel=0; yVel=unit; break;
}};
function checkGameOver() {switch(true) {
    case (snake[0].x < 0):
        running = false; break;
    case (snake[0].x >= gameWidth):
        running = false; break;
    case (snake[0].y < 0):
        running = false; break;
    case (snake[0].y >= gameHeight):
        running = false; break;}
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
            running = false;}
};
function displayGameOver() {alert("GAME OVER!")};
function resetGame() {score = 0;
    xVel = unit;
    yVel = 0;
    snake = [
        {x: unit * 4, y: 0},
        {x: unit * 3, y: 0},
        {x: unit * 2, y: 0},
        {x: unit, y: 0},
        {x: 0, y: 0}
    ];
    scoreText.textContent = score;
    createFood();
    if (!running) {
        gameStart();
    }};
