const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

// Set the canvas width and height
canvas.width = 400;
canvas.height = 600;

// Create the player platform
const playerWidth = 80;
const playerHeight = 10;
const player = {
  x: canvas.width / 2 - playerWidth / 2,
  y: canvas.height - 20,
  width: playerWidth,
  height: playerHeight,
  color: '#fff',
  speed: 8
};

// Create the falling blocks
const blockWidth = 50;
const blockHeight = 20;
let blocks = [];
let score = 0;

// Generate a random block
function generateBlock() {
  const x = Math.random() * (canvas.width - blockWidth);
  const block = {
    x: x,
    y: 0,
    width: blockWidth,
    height: blockHeight,
    color: '#ff0000',
    speed: 2
  };
  blocks.push(block);
}

// Draw the player platform
function drawPlayer() {
  context.fillStyle = player.color;
  context.fillRect(player.x, player.y, player.width, player.height);
}

// Draw the falling blocks
function drawBlocks() {
  blocks.forEach(block => {
    context.fillStyle = block.color;
    context.fillRect(block.x, block.y, block.width, block.height);
  });
}

// Move the player platform
function movePlayer(direction) {
  if (direction === 'left') {
    player.x -= player.speed;
    if (player.x < 0) {
      player.x = 0;
    }
  } else if (direction === 'right') {
    player.x += player.speed;
    if (player.x + player.width > canvas.width) {
      player.x = canvas.width - player.width;
    }
  }
}

// Update the game state
function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player platform
  drawPlayer();

  // Draw the falling blocks
  drawBlocks();

  // Move the falling blocks
  blocks.forEach(block => {
    block.y += block.speed;

    // Check collision with the player platform
    if (
      block.y + block.height >= player.y &&
      block.x >= player.x &&
      block.x + block.width <= player.x + player.width
    ) {
      score++;
      blocks = blocks.filter(b => b !== block);
    }

    // Remove blocks that reach the bottom
    if (block.y + block.height >= canvas.height) {
      blocks = blocks.filter(b => b !== block);
    }
  });

  // Generate a new block randomly
  if (Math.random() < 0.02) {
    generateBlock();
  }

  // Display the score
  context.fillStyle = '#fff';
  context.font = '20px Arial';
  context.fillText('Score: ' + score, 10, 30);
}

// Keyboard event listeners
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    movePlayer('left');
  } else if (event.key === 'ArrowRight') {
    movePlayer('right');
  }
});

// Update the game every frame
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
