// Tap Target Extension
// 1. Make the targets a different color everytime
// 2. Make the size of the cirlces random
// 3. Add a "Reset" button, which resets the score

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let targetX = canvas.width / 2;
let targetY = canvas.height / 2;
let targetRadius = 50;
let targetColor = 'red';
let colorArray = ['red', 'blue', 'green', 'yellow', 'purple', 'brown'];
let score = 0;

// Draw function
function draw() {
    console.log('Draw function called');
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // clear the canvas

    // Draw the target
    const colorLen = Math.floor(colorArray.length * Math.random() - 1);
    targetColor = colorArray[colorLen]; // change color of target
    console.log("Color is: " + targetColor + ". colorLen: " + colorLen);
    console.log("Testing array: " + colorArray[1]);
    ctx.fillStyle = targetColor;
    ctx.beginPath();
    ctx.arc(targetX, targetY, Math.random() * targetRadius + 10, 0, Math.PI * 2); // random size
    ctx.fill();

    // Draw the score
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 20, 40);

    // Draw Square then Text for Reset button
    ctx.fillStyle = 'gray';
    ctx.drawRect(canvas.width - 200, canvas.height - 200, canvas.width - 10, canvas.height - 10);

    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Reset', canvas.width - 150, canvas.height - 150);
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
        
        // Only update the draw on successful tap
        draw();
   
    };

})

// Initial target draw
draw();
