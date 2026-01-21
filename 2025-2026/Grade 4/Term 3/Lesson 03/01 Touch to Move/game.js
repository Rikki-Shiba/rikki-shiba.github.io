// Variables Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 40;

// Touch Input Handler
canvas.addEventListener('touchstart', function(e) {
	e.preventDefault();
	const touch = e.touches[0];

	// Move ball to touch position
	ballX = touch.clientX;
	ballY = touch.clientY;
});

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw ball
	ctx.fillStyle = 'orange';
	ctx.beginPath();
	ctx.arc(ballX, ballY, ballRadius, 0, MathPI * 2);
	ctx.fill();

	requestAnimationFrame(gameLoop);
}

gameLoop();
