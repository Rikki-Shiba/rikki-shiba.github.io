// Setup Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create a simple face:
// 1. Circle for the head
ctx.fillStyle = 'yellow';
ctx.beginPath();
ctx.arc(400, 400, 200, 0, Math.PI * 2);
ctx.fill();

// 2. Two smaller circles for the eyes
ctx.fillStyle = 'black';
ctx.beginPath();
ctx.arc(300, 350, 20, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(500, 350, 20, 0, Math.PI * 2);
ctx.fill();

// 3. Semi-Circle for the mouth
ctx.beginPath();
ctx.arc(400, 450, 100, 0, Math.PI);
ctx.fill();

// 4. Something original by yourself
// Text