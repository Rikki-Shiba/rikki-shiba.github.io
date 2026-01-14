// Setup Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 1: Draw a red circle at (100, 100) with a radius of 40
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(100, 100, 40, 0, Math.PI * 2);
ctx.fillStyle();

// 2: Draw a blue rectangle at (200, 200) size 150x100
ctx.fillStyle = 'blue';
ctx.fillRect(200, 200, 150, 100);

// 3: Draw text "My Canvas" in the center of the screen
ctx.fillStyle = 'white';
ctx.font = 'bold 48px Arial';
ctx.textAlign = 'center';
ctx.fillText('My Canvas', canvas.width / 2, canvas.height / 2);