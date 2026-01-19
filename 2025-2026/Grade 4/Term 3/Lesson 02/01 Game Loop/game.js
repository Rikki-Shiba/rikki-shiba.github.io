// Setup Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function gameLoop() {
    // 1. Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Update (We will add this later)
    
    // 3. Draw
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, Math.PI * 2);
    
    // 4. Request next frame
    requestAnimationFrame(gameLoop);
}

// Start the loop
gameLoop();