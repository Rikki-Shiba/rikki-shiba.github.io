const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let circles = [];	    // Start empty! Add circles dynamically
let spawnTimer = 0;
let spawnInterval = 60;	// Spawn every 60 frames (1 second)

function spawnCircle() {
	let newCircle = {
		x: Math.random() * canvas.width,		// Random x
		y: canvas.height + 50,			        // Below screen
		radius: 20 + Math.random() * 30,		// Random size between 20-50
		color: getRandomColor(),			    // Random color
		speed: 1 + Math.random() * 2,		    // Random speed 1~3
		points: 10					            // Worth 10 points
	};
	
	circles.push(newCircle);		// Push/Add to our array
}

function getRandomColor() {
	let colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
	return colors[Math.floor(Math.random() * colors.length)];
}

function hitCircle(touchX, touchY, circle) {
	let distance = Math.sqrt(
		(touchX - circle.x) ** 2 +
		(touchY - circle.y) ** 2
	);
	return distance < circle.radius;
}

canvas.addEventListener('touchstart', function(e) {
	e.preventDefault();
	let touch = e.touches[0];
	let touchX = touch.clientX;
	let touchY = touch.clientY;

    // Check all circles (loop backwards)
	for (let i = circles.length - 1; i >= 0; i--) {
		if (hitCircle(touchX, touchY, circles[i])) {
			score += circles[i].points;	// Add points
			circles.splice(i, 1);		// Remove circle
			break;					    // Only remove 1
		}
	}
});

canvas.addEventListener('mousedown', function(e) {  // Mouse Input for Testing
	// Same code as touchstart
	let touchX = e.clientX;
	let touchY = e.clientY;

	for (let i = circles.length - 1; i >= 0; i--) {
		if (hitCircle(touchX, touchY, circles[i])) {
			score += circles[i].points;	
			circles.splice(i, 1);		
			break;					
		}
	}
});

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Spawning System
	spawnTimer++;
	if (spawnTimer >= spawnInterval) {
		spawnCircle();
		spawnTimer = 0;  // Reset
	}

        // Update all circles
	for (let i = 0; i < circles.length; i++) {
		circles[i].y -= circles[i].speed; // Move up
	}

    // Draw all circles
	for (let i = 0; i < circles.length; i++) {
		ctx.fillStyle = circles[i].color;
		ctx.beginPath();
		ctx.arc(circles[i].x, circles[i].y, circles[i].radius,
			0, Math.PI * 2);
		ctx.fill();

        // Draw points on the circles
	    ctx.fillStyle = 'white';
	    ctx.font = '16px Arial';
	    ctx.textAlign = 'center';
	    ctx.fillText(circles[i].points, circles[i].x, circles[i].y + 5);

        // Draw score
	    ctx.fillStyle = 'white';
	    ctx.font = 'bold 24px Arial';
	    ctx.textAlign = 'left';
	    ctx.fillText('Score: ' + score, 20, 40);
    }

	requestAnimationFrame(gameLoop);
}

gameLoop();