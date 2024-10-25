// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let gameRunning = true;

function updateScore(newScore) {
  score = newScore;
  document.getElementById('scoreValue').innerText = score;
}

// Simple function to simulate game updates
function gameLoop() {
  if (!gameRunning) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw "sled"
  ctx.fillStyle = 'red';
  ctx.fillRect(380, 500, 40, 40);

  // Update score on each frame (simulate playing)
  score++;
  document.getElementById('scoreValue').innerText = score;

  // Loop the game
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Expose function to console for setting score
window.setScore = updateScore;
