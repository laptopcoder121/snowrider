import { Sled } from './sled.js';
import { Obstacle } from './obstacle.js';
import { Present } from './present.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0, presentCount = 0, gameRunning = true;
let sled = new Sled(ctx);
let obstacles = [];
let presents = [];
let lastFrameTime = 0, fps = 0;

function initGame() {
  setInterval(() => obstacles.push(new Obstacle(ctx, canvas)), 2000);
  setInterval(() => presents.push(new Present(ctx, canvas)), 3000);
  gameLoop();
}

function gameLoop(currentTime) {
  if (!gameRunning) return;
  const deltaTime = currentTime - lastFrameTime;
  fps = 1000 / deltaTime;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  sled.update();
  sled.draw();
  obstacles.forEach(o => o.updateAndDraw(sled));
  presents.forEach(p => p.updateAndCollect(sled, incrementScore));

  document.getElementById('fpsValue').innerText = Math.round(fps);
  lastFrameTime = currentTime;
  requestAnimationFrame(gameLoop);
}

function incrementScore(points) {
  score += points;
  document.getElementById('scoreValue').innerText = score;
}

initGame();
