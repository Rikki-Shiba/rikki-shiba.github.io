// Setup Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ball Properties
let ballX = 100;        // Starting position
let ballY = 100;
let ballRadius = 30;
let ballSpeedX = 3;     // Moves 3 pixels horizontally per frame
let ballSpeedY = 2;     // Moves 2 pixels vertically per frame

function gameLoop() {
    // 1. Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Update Position
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    
    // 3. Check Boundaries

    // Right Edge
    if (ballX + ballRadius > canvas.width) {
        ballX = canvas.width - ballRadius;      // Keep inside
        ballSpeedX = -ballSpeedX;               // Reverse direction
    }

    // Left Edge
    if (ballX - ballRadius < 0) {
		ballX = ballRadius;	
		ballSpeedX = -ballSpeedX;			
	}

	// Bottom Edge
	if (ballY + ballRadius > canvas.height) {
		ballY = canvas.height - ballRadius;	
		ballSpeedY = -ballSpeedY;			
	}

	// Top Edge
	if (ballY - ballRadius < 0) {
		ballY = ballRadius;	
		ballSpeedY = -ballSpeedY;			
	}

    // 4. Draw
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    // 4. Request next frame
    requestAnimationFrame(gameLoop);
}

// Start the loop
gameLoop();