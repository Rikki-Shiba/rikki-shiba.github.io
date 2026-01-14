// Putting It Together - Tap Target

// Setup Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Target Properties
let targetX = canvas.width / 2;
let targetY = canvas.height / 2;
let targetRadius = 50;
let score = 0;

// Draw function
function draw() {
    console.log('Draw function called');
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // clear the canvas

    // Draw the target
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(targetX, targetY, targetRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw the score
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 20, 40);
}

// ----------------------------------------------------
// = To Do: Function to handle touch and mouse inputs =
// ----------------------------------------------------

// Touch handler
canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;

    // Check if the target was touched
    const distance = Math.sqrt(
        (touchX - targetX) ** 2 +
        (touchY - targetY) **2
    );

    if (distance < targetRadius) {
        // Hit!
        score++;

        // Move target to random position
        targetX = targetRadius + Math.random() * (canvas.width - targetRadius * 2);
        targetY = targetRadius + Math.random() * (canvas.height - targetRadius * 2);
    };

    // Draw the target at a new location
    draw();
});

// Mouse handler (for testing)
canvas.addEventListener('mousedown', function(e) {

        const touchX = e.clientX;
        const touchY = e.clientY;

        // Check if the target was touched
    const distance = Math.sqrt(
        (touchX - targetX) ** 2 +
        (touchY - targetY) **2
    );

    if (distance < targetRadius) {
        // Hit!
        score++;

        // Move target to random position
        targetX = targetRadius + Math.random() * (canvas.width - targetRadius * 2);
        targetY = targetRadius + Math.random() * (canvas.height - targetRadius * 2);
    };

    // Draw the target at a new location
    draw();
})

// Initial target draw
draw();
