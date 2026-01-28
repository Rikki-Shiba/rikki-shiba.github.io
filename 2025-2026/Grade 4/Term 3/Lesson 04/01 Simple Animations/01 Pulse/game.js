// Variables Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let radius = 40;

// 1. Pulse Effect
let scale = 1;
let scaleDirection = 0.01;

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Update scale
	scale += scaleDirection;
	if (scale > 1.2 || scale < 0.8) {
		scaleDirection = -scaleDirection;
	}

    // Draw with scale
	let radius = 50 * scale;
	ctx.fillStyle = 'red';
	ctx.beginPath();
	ctx.arc(ballX, ballY, radius, 0, Math.PI * 2);
	ctx.fill();

	requestAnimationFrame(gameLoop);
}

gameLoop();