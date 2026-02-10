// Setup Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game State Variables
let gameState = 'START';    // Can be: 'START', 'PLAYING', 'GAME_OVER'
let score = 0;
let lives = 3;
let circles = [];
let spawnTimer = 0;
let spawnInterval = 60;	    // Spawn every 60 frames (1 second)

// Testing Effects
let CIRCLES_PULSE = true;       // Set to true to enable pulsing circles
let CIRCLES_FLASH = true;       // Set to true to enable flashing circles
let TEXT_STROKE = true;         // Add a black stroke to the score text

// Circle Functions
function spawnCircle() {
	let newCircle = {
		x: Math.random() * canvas.width,		            // Random x
		y: canvas.height + 50,			                    // Below screen
		radius: 20 + Math.random() * 30,		            // Random size between 20-50
		color: getRandomColor(),			                // Random color
		speed: 1 + Math.random() * 2,		                // Random speed 1~3
		points: 10,		                                    // Worth 10 points
        scale: 1.0,                                         // Size pulse effect
        scaleDirection: 0.01,
        flash: 0,                                           // Color flash effect
        flashDirection: 0.5
	};
	
	circles.push(newCircle);		// Push/Add to our array
}

function getRandomColor() {
	// Full RGB Randomized Color
	let r = Math.floor(Math.random() * 255), g = Math.floor(Math.random() * 255), b = Math.floor(Math.random() * 255);
	return `rgb(${r}, ${g}, ${b})`;
}

function getInverseColor(rgbString) {
    const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
        const r = 255 - parseInt(match[1]);
        const g = 255 - parseInt(match[2]);
        const b = 255 - parseInt(match[3]);
        return `rgb(${r}, ${g}, ${b})`;
    }
     return rgbString; // Return original if parsing fails
}

function hitCircle(touchX, touchY, circle) {
	let distance = Math.sqrt(
		(touchX - circle.x) ** 2 +
		(touchY - circle.y) ** 2
	);
	return distance < circle.radius;
}

// New Game Loop
function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (gameState === 'START') {
		drawStartScreen();
	} else if (gameState === 'PLAYING') {
		updateGame();
		drawGame();
	} else if (gameState === 'GAME_OVER') {
		drawGameOverScreen();
	}

	requestAnimationFrame(gameLoop);
}

// Game State: START (Start Screen)
function drawStartScreen() {
	ctx.fillStyle = 'white';
	ctx.font = 'bold 48px Arial';
	ctx.textAlign = 'center';
	ctx.fillText('TAP TO START', canvas.width / 2, canvas.height / 2);

	ctx.font = '20px Arial';
	ctx.fillText('Tap the circles before they escape!', canvas.width / 2, canvas.height / 2 + 60);
}

// Update Game Function
function updateGame() {
	
	// Spawn circles
	spawnTimer++;
	if (spawnTimer >= spawnInterval) {
		spawnCircle();
		spawnTimer = 0;
	}

    // Update Circles
	for (let i = circles.length - 1; i >= 0; i--) {
		circles[i].y -= circles[i].speed;

		if (circles[i].y < -circles[i].radius) {
			circles.splice(i, 1);
			lives--;

			// Check Game Over Condition
			if (lives <= 0) {
				gameState = 'GAME_OVER';
			}
		}
	}
}

function updateColor(rgbValue, flashValue) {
    const match = rgbValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
        const r = parseInt(match[1]) + flashValue;
        const g = parseInt(match[2]) + flashValue;
        const b = parseInt(match[3]) + flashValue;
        return `rgb(${r}, ${g}, ${b})`;
    }
    console.log("Color Flash Error");
}

// Draw Game Function
function drawGame() {
	// Draw all circles
	for (let i = 0; i < circles.length; i++) {
		
        // Color Flash Effect
        if (CIRCLES_FLASH) {
            circles[i].flash += circles[i].flashDirection;
	        if (circles[i].flash > 15 || circles[i].flash < -15) {
		        circles[i].flashDirection = -circles[i].flashDirection;
	        }
        } else {
            circles[i].flash = 0;
        }
        
        // Size Pulse Effect
        if (CIRCLES_PULSE) {
            circles[i].scale += circles[i].scaleDirection;
            if (circles[i].scale > 1.2 || circles[i].scale < 0.8 ) {
                circles[i].scaleDirection = -circles[i].scaleDirection;
            }
        } else {
            circles[i].scale = 0;
        }
        
        ctx.fillStyle = updateColor(circles[i].color, circles[i].flash);
		ctx.beginPath();
		ctx.arc(circles[i].x, circles[i].y, circles[i].radius * circles[i].scale, 0, Math.PI * 2);
		ctx.fill();

        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseLine = 'middle';

        if (TEXT_STROKE) {
            // Draw stroke first (outline)
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3; // 1px might be too thin
            ctx.strokeText(circles[i].points, circles[i].x, circles[i].y + 5);
        }
        
        ctx.fillStyle = '#87CEEB';
        ctx.fillText(circles[i].points, circles[i].x, circles[i].y + 5);
	}

    // Draw score and lives
	ctx.fillStyle = 'white';
	ctx.font = 'bold 24px Arial';
	ctx.textAlign = 'left';
	ctx.fillText('Score: ' + score, 20, 40);
	ctx.textAlign = 'right';
	ctx.fillText('Lives: ' + lives, canvas.width - 20, 40);
}

// Game State: GAME_OVER
function drawGameOverScreen() {
	ctx.fillStyle = 'white';
	ctx.font = 'bold 48px Arial';
	ctx.textAlign = 'center';
	ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 60);

	ctx.font = '32px Arial';
	ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2);

	ctx.font = '24px Arial';
	ctx.fillText('TAP TO PLAY AGAIN', canvas.width / 2, 
		canvas.height / 2 +	80);
}

// Touch Handlers
canvas.addEventListener('touchstart', function(e) {
	e.preventDefault();
	let touch = e.touches[0];
	let touchX = touch.clientX;
	let touchY = touch.clientY;

	if (gameState === 'START') {
		
        // Start the game!
		startGame();
    } else if (gameState === 'PLAYING') {
		
        // Check if any circles are hit
		for (let i = circles.length - 1; i >= 0; i--) {
			if (hitCircle(touchX, touchY, circles[i])) {
				score += circles[i].points;
				circles.splice(i, 1);
				break;
			}
		}
    } else if (gameState === 'GAME_OVER') {
		// Restart
		startGame();
	}
});

// Mouse Input for Debugging
canvas.addEventListener('mousedown', function(e) {
    let touchX = e.clientX;
    let touchY = e.clientY;

    if (gameState === 'START') {
		
        // Start the game!
		startGame();
    } else if (gameState === 'PLAYING') {
		
        // Check if any circles are hit
		for (let i = circles.length - 1; i >= 0; i--) {
			if (hitCircle(touchX, touchY, circles[i])) {
				score += circles[i].points;
				circles.splice(i, 1);
				break;
			}
		}
    } else if (gameState === 'GAME_OVER') {
		// Restart
		startGame();
	}
})

function startGame() {
	gameState = 'PLAYING';
	score = 0;
	lives = 3;
	circles = [];
	spawnTimer = 0;
}


gameLoop();