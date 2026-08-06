const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const unitSize = 25; // Size of one block
let score = 0;
let running = false;
let xVelocity = unitSize; // moving right by default
let yVelocity = 0;
let foodX;
let foodY;
let changingDirection = false;

// The snake is an array of coordinates
let snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
];

window.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", resetGame);

startGame();

function startGame() {
    running = true;
    scoreElement.textContent = score;
    spawnFood();
    drawFood();
    gameLoop();
}

function gameLoop() {
    if (running) {
        setTimeout(function() {
            clearCanvas();
            drawFood();
            moveSnake();
            drawSnake();
            checkCollisions();
            changingDirection = false;
            gameLoop(); // call itself again
        }, 100); // game speed is 100ms
    } else {
        displayGameOver();
    }
}

function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function spawnFood() {
    // Pick a random number between 0 and the canvas width/height, but make sure it snaps to our 25px grid
    foodX = Math.round((Math.random() * (canvas.width - unitSize)) / unitSize) * unitSize;
    foodY = Math.round((Math.random() * (canvas.height - unitSize)) / unitSize) * unitSize;

    // Make sure food doesn't spawn on the snake's body
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === foodX && snake[i].y === foodY) {
            spawnFood(); // try again if it spawned on the snake
        }
    }
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
    // Create a new head object based on where it's currently moving
    const newHead = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };
    
    // Add the new head to the front of the snake array
    snake.unshift(newHead);

    // If the new head is on the food, we ate it
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score++;
        scoreElement.textContent = score;
        spawnFood();
    } else {
        // If we didn't eat, remove the tail so it looks like we are moving
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";
    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, unitSize, unitSize);
        ctx.strokeRect(snake[i].x, snake[i].y, unitSize, unitSize);
    }
}

function changeDirection(event) {
    if (changingDirection) return; // prevent double key presses in one frame

    const key = event.keyCode;
    const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

    // Check where we are currently going so we don't reverse into ourselves
    const goingUp = yVelocity === -unitSize;
    const goingDown = yVelocity === unitSize;
    const goingRight = xVelocity === unitSize;
    const goingLeft = xVelocity === -unitSize;

    if (key === LEFT && !goingRight) {
        xVelocity = -unitSize;
        yVelocity = 0;
        changingDirection = true;
    } else if (key === UP && !goingDown) {
        xVelocity = 0;
        yVelocity = -unitSize;
        changingDirection = true;
    } else if (key === RIGHT && !goingLeft) {
        xVelocity = unitSize;
        yVelocity = 0;
        changingDirection = true;
    } else if (key === DOWN && !goingUp) {
        xVelocity = 0;
        yVelocity = unitSize;
        changingDirection = true;
    }
}

function checkCollisions() {
    // Check if head hit the walls
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        running = false;
    }
    
    // Check if head hit the body
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            running = false;
        }
    }
}


    function displayGameOver() {
    alert("Game Over!"); 
}
function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ];
    startGame();
}
