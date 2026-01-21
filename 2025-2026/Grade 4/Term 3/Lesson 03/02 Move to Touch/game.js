// Variables Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 50;
let targetX = ballX;
let targetY = ballY;

canvas.addEventListener('touchstart', function(e) {
	e.preventDefault();
	const touch = e.touches[0];

	targetX = touch.clientX;
	targetY = touch.clientY;
});

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Move towards the target (smooth!)
	ballX += (targetX - ballX) * 0.1;	// Move 10% of the distance
	ballY += (targetY - ballY) * 0.1;

	// Draw the ball
	ctx.fillStyle = 'orange';
	ctx.beginPath();
	ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
	ctx.fill();

	requestAnimationFrame(gameLoop);
}

gameLoop();