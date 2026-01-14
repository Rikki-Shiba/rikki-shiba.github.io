// Interactive Demo - Draw Where You Touch

// Setup Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to handle touch and mouse inputs
function handleTouch(x, y) {
    // Draw a circle where touched
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
}

// Touch handler
canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();             // disable scrolling
    const touch = e.touches[0];     
    handleTouch(touch.clientX, touch.clientY);  // call above function
});

// Mouse handler (for testing)
canvas.addEventListener('mousedown', function(e) {
        handleTouch(e.clientX, e.clientY);
})