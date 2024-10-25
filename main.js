// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let gameRunning = true;
let sledPosition = { x: canvas.width / 2 - 20, y: 500 };
let obstacles = [];
let presents = []; // Array for presents
let presentCount = 0; // Number of presents collected
let speed = 2; // Initial speed
let speedIncrement = 0.1; // Speed increment per 100 points
let gameOverElement = document.getElementById('gameOver');
let finalScoreElement = document.getElementById('finalScore');
let restartBtn = document.getElementById('restartBtn');
let sleds = ['red', 'blue', 'green']; // Available sleds
let currentSledIndex = 0; // Index of the current sled
let gameOverSled = document.getElementById('currentSled');
let presentsCollectedElement = document.getElementById('presentsCollected');

let lastFrameTime = 0; // Time of the last frame
let frameCount = 0; // Count of frames for FPS calculation
let fps = 0; // Current FPS

// Generate obstacles at random positions
function generateObstacle() {
  const x = Math.random() * (canvas.width - 40);
  obstacles.push({ x: x, y: 0, width: 40, height: 40 });
}

// Generate presents at random positions
function generatePresent() {
  const x = Math.random() * (canvas.width - 30);
  presents.push({ x: x, y: 0, width: 30, height: 30 });
}

// Update game state
function updateGame() {
  score++;
  document.getElementById('scoreValue').innerText = score;

  // Increase speed based on score
  speed += speedIncrement / 100;
  
  // Move obstacles and presents down
  obstacles.forEach(obstacle => {
    obstacle.y += speed;
  });
  presents.forEach(present => {
    present.y += speed;
  });

  // Remove off-screen obstacles and presents
  obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
  presents = presents.filter(present => present.y < canvas.height);
}

// Detect collision between sled and obstacles
function detectCollision() {
  for (let obstacle of obstacles) {
    if (
      sledPosition.x < obstacle.x + obstacle.width &&
      sledPosition.x + 40 > obstacle.x &&
      sledPosition.y < obstacle.y + obstacle.height &&
      sledPosition.y + 40 > obstacle.y
    ) {
      gameRunning = false;
      gameOverElement.style.display = 'block';
      finalScoreElement.innerText = score;
    }
  }

  // Detect collision with presents
  for (let present of presents) {
    if (
      sledPosition.x < present.x + present.width &&
      sledPosition.x + 40 > present.x &&
      sledPosition.y < present.y + present.height &&
      sledPosition.y + 40 > present.y
    ) {
      presentCount++; // Increment the present count
      presentsCollectedElement.innerText = presentCount;
      
      // Unlock a sled for every 5 presents collected
      if (presentCount % 5 === 0) {
        unlockSled();
      }

      // Increment score by 10 for each present collected
      score += 10; 
      document.getElementById('scoreValue').innerText = score;
      presents.splice(presents.indexOf(present), 1); // Remove collected present
    }
  }
}

// Unlock the next sled
function unlockSled() {
  if (currentSledIndex < sleds.length - 1) {
    currentSledIndex++;
    gameOverSled.innerText = sleds[currentSledIndex].charAt(0).toUpperCase() + sleds[currentSledIndex].slice(1) + ' Sled';
  }
}

// Draw the sled, obstacles, and presents
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the current sled
  ctx.fillStyle = sleds[currentSledIndex]; // Change sled color based on the current sled
  ctx.fillRect(sledPosition.x, sledPosition.y, 40, 40);

  // Draw obstacles
  ctx.fillStyle = 'black';
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });

  // Draw presents
  ctx.fillStyle = 'green'; // Color for presents
  presents.forEach(present => {
    ctx.fillRect(present.x, present.y, present.width, present.height);
  });
}

// Main game loop
function gameLoop(currentTime) {
  if (!gameRunning) return;

  // Calculate FPS
  if (lastFrameTime) {
    const deltaTime = currentTime - lastFrameTime;
    frameCount++;
    if (deltaTime >= 1000) {
      fps = frameCount;
      document.getElementById('fpsValue').innerText = fps;
      frameCount = 0; // Reset the frame count
      lastFrameTime = currentTime; // Reset the last frame time
    }
  } else {
    lastFrameTime = currentTime; // Set initial frame time
  }

  updateGame();
  detectCollision();
  drawGame();

  requestAnimationFrame(gameLoop);
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && sledPosition.x > 0) {
    sledPosition.x -= 20; // Move left
  }
  if (event.key === 'ArrowRight' && sledPosition.x < canvas.width - 40) {
    sledPosition.x += 20; // Move right
  }
});

// Restart the game
restartBtn.addEventListener('click', () => {
  score = 0;
  gameRunning = true;
  sledPosition = { x: canvas.width / 2 - 20, y: 500 };
  obstacles = [];
  presents = []; // Reset presents
  presentCount = 0; // Reset present count
  gameOverElement.style.display = 'none';
  speed = 2;
  gameOverSled.innerText = sleds[currentSledIndex]; // Reset sled display
  presentsCollectedElement.innerText = presentCount; // Reset presents collected display
  lastFrameTime = 0; // Reset last frame time
  gameLoop();
});

// Start generating obstacles and presents
setInterval(generateObstacle, 2000); // Generate obstacles every 2 seconds
setInterval(generatePresent, 3000); // Generate presents every 3 seconds

// Start the game loop
gameLoop();

// Function to change score directly (to be used in console)
function setScore(newScore) {
  score = newScore;
  document.getElementById('scoreValue').innerText = score;
}

// Function to change presents directly (to be used in console)
function setPresents(newPresents) {
  presentCount = newPresents;
  presentsCollectedElement.innerText = presentCount;
}
