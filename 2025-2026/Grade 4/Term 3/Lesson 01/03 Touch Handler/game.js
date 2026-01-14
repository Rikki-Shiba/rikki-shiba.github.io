// Setup Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Touch Handler

// Listen for touch
canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();             // prevent page from scrolling
        const touch = e.touches[0];     // Get the first touch point

        // Get touch co-ordinates
        const touchX = touch.clientX;   // touchX = e.touches[0].clientX
        const touchY = touch.clientY;
        
        console.log('Touched at: ', touchX, touchY);
});

// Handle mouse click (for testing on computers)
canvas.addEventListener('mousedown', function(e) {
        const touchX = e.clientX;
        const touchY = e.clientY;

        console.log('Ckicked at: ', touchX, touchY);
})