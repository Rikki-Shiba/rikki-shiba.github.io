// Variables Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;

let angle = 0;
let scale = 1;
let scaleDirection = 0.01;
let hue = 0;

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	angle += 0.1;

	ctx.save();	// save the current state
	ctx.translate(ballX, ballY);	// move to ball center
	ctx.rotate(angle);	// rotate

	scale += scaleDirection;
	if (scale > 1.5 || scale < 0.6) {
		scaleDirection = -scaleDirection;
	}

    // Draw with scale
	let radius = 350 * scale;

    // Draw rectangle (will be rotated)
	hue = (hue + 1) % 360; // When hue = 360, it resets to 1 with modulo
	ctx.fillStyle = `hsl(${hue}, 100%, 50%)`; // back-ticks!
	ctx.fillRect(-175, -175, radius, radius);

	ctx.restore();	// restore state

	requestAnimationFrame(gameLoop);
}

gameLoop();