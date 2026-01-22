// Mini-Project Sample JavaScript
let buttonX = canvas.width / 2;
let buttonY = canvas.height / 2;
let buttonRadius = 60;
let buttonScale = 1;
let score = 0;

canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    const touch = e.touches[0];    

    // Check if hit button
    let distance = Math.sqrt(
        (touch.clientX - buttonX) ** 2 +
        (touch.clientY - buttonY) ** 2
    );

    if (distance < buttonRadius) {
        score++;
        buttonScale = 1.5;  // Grow!
    }
});

function randomColor() {
    // Math.ceil(ing) rounds up | Math.floor rounds down
    return Math.ceil(Math.random() * 255);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Shrink button back to normal
    if (buttonScale > 1) {
        buttonScale -= 0.05;
    }

    // Draw button
    let.drawRadius = buttonRadius * buttonScale;
    ctx.fillStyle = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
    ctx.beginPath();
    ctx.arc(buttonX, buttonY, drawRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(score, buttonX, buttonY + 8);

    requestAnimationFrame(gameLoop);
}

gameLoop();