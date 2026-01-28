// Variables Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let radius = 40;

let hue = 0;

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Cycle through colors
	hue = (hue + 1) % 360; // When hue = 360, it resets to 1 with modulo
	ctx.fillStyle = `hsl(${hue}, 100%, 50%)`; // back-ticks!
	ctx.beginPath();
	ctx.arc(ballX, ballY, 50, 0, Math.PI * 2);
	ctx.fill();
	requestAnimationFrame(gameLoop);
}

gameLoop();