// Variables Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let angle = 0;

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	angle += 0.05;

	ctx.save();	// save the current state
	ctx.translate(ballX, ballY);	// move to ball center
	ctx.rotate(angle);	// rotate

    // Draw rectangle (will be rotated)
	ctx.fillStyle = 'blue';
	ctx.fillRect(-25, -25, 50, 50);

	ctx.restore();	// restore state

	requestAnimationFrame(gameLoop);
}

gameLoop();