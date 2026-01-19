// Get the canvas element
const canvas = document.getElementById('gameCanvas');

// Get the "drawing tool" (context)
const ctx = canvas.getContext('2d');

// Make the canvas fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Drawing a Rectangle - ctx.fillRect(x, y, width, height)

// Draw a red rectangle
ctx.fillStyle = 'red';
ctx.fillRect(100, 100, 200, 150);

// Draw a blue square
ctx.fillStyle = 'blue';
ctx.fillRect(400, 300, 100, 100);


// Drawing a Circle - Circles are drawn with "arcs"
// ctx.arc(x, y, radius, startAngle, endAngle)

// Draw a yellow circle
ctx.fillStyle = 'yellow';
ctx.beginPath();            // Tells the canvas to start drawing a new path, otherwise it connects to the last co-ord used
ctx.arc(300, 200, 50, 0, Math.PI * 2);      // draw outline of full circle.
ctx.fill();


// Drawing Text
// Set text properties
// minimum requirements: xxx.font = "SIZE FAMILY"
// all: xxx.font = "STYLE VARIANT WEIGHT SIZE FAMILY"
//ctx.fillStyle = 'white';
//ctx.font = 'bold 48px Arial';
//ctx.textAlight = 'center';

// Draw text
//ctx.fillText('Hello Canvas!', canvas.width / 2, 100);
