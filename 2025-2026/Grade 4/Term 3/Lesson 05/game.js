// Setup Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Target Circle
let targetX = canvas.width / 2;
let targetY = canvas.height / 2;
let targetRadius = 60;
let isHit = false;

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw target (red or green, depending on hit)
	ctx.fillStyle = isHit ? 'green' : 'red';
	ctx.beginPath();
	ctx.arc(targetX, targetY, targetRadius, 0, Math.PI * 2);
	ctx.fill();

	// Draw Text
	ctx.fillStyle = 'white';
	ctx.font = '24px Arial';
	ctx.textAlign = 'center';
	ctx.fillText(isHit ? 'HIT' : 'TAP ME!', targetX, targetY);
}

function hitCircle(touchX, touchY, circleX, circleY, radius) {
	const distance = Math.sqrt(
		(touchX - circleX) ** 2 +
		(touchY - circleY) ** 2
	);

	return distance < radius;
}

canvas.addEventListener('touchstart', function(e) {
	e.preventDefault();
	let touch = e.touches[0];
	let touchX = touch.clientX;
	let touchY = touch.clientY;

	// Check if hit
	isHit = hitCircle(touchX, touchY, targetX, targetY, targetRadius);
	draw();
    
    // Reset after 500ms
	setTimeout(function() {
		isHit = false;

		// Move target to a random position
		targetX = targetRadius + Math.random() * (canvas.width - targetRadius * 2);
		targetY = targetRadius + Math.random() * (canvas.height - targetRadius * 2);
        
		draw();
	}, 500);

});		

// Initial draw
draw();