// Variables Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 50;
let isDragging = false;	// Are you dragging your finger on the screen?

// Check if touch is on the ball
function isTouchingBall(touchX, touchY) {
	
    // Calculate the difference between the touch point and the ball’s center using the Pythagorean theorem
	const distance = Math.sqrt(	
		(touchX - ballX) ** 2 +	// x-axis difference
		(touchY - ballY) ** 2	// y-axis difference
	);
	
    // If the difference is less than the ball’s radius (inside the ball) then return TRUE, otherwise return FALSE	
	return distance < ballRadius;	
}

// Touch start
canvas.addEventListener('touchstart', function(e) {
	e.preventDefault();
    const touch = e.touches[0];
	
	if (isTouchingBall(touch.clientX, touch.clientY)) {
		isDragging = true;
	}
});

// Touch move
canvas.addEventListener('touchmove', function(e) {
	e.preventDefault();
	
	if (isDragging) {
		const touch = e.touches[0];
		ballX = touch.clientX;
		ballY = touch.clientY;
	}
});

// Touch move
canvas.addEventListener('touchend', function(e) {
	e.preventDefault();
	isDragging = false;
});

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw ball (different color if dragging)
	ctx.fillStyle = isDragging ? 'red' : 'blue'; // true red, false blue
	ctx.beginPath();
	ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
	ctx.fill();

	requestAnimationFrame(gameLoop);
}
gameLoop();