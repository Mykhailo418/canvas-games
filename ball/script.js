window.onload = function(){
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d');

  // Ball Params
  const radius = 10;
  const initSpeedX = 4;
  const initSpeedY = 3;
  let speedX = initSpeedX;
  let speedY = initSpeedY;
  let ballX = canvas.width/2;
  let ballY = canvas.height/2;

  // Paddle Params
  const paddleWidth = 100;
  const paddleHeight = 10;
  let paddleX = canvas.width/2 - paddleWidth/2;
  let paddleY = canvas.height - paddleHeight - 20;

  // Brick Params
  const brickHeight = 20;
  const brickWeight = 100;
  const bricksCount = Math.floor(canvas.width/brickWeight);
  const hiddenBricks = new Set();
  const brickImg = new Image();
  brickImg.src = 'img/brick.png';

  animation(update);
  window.addEventListener('mousemove', updateMouseMove);

  // ---

  function update(){
    moveAll();
    drawAll();
  }

  function moveAll(){
    ballX += speedX;
    ballY += speedY;

    // Change direction
    if (ballX + radius > canvas.width || ballX - radius < 0) speedX *= -1;
    if (ballY - radius < 0) speedY *= -1;
    if (ballY + radius > canvas.height) reset();

    let paddleTopEdgeY = paddleY;
    let paddleBottomEdgeY = paddleY + paddleHeight;
    let paddleLeftEdgeX = paddleX;
    let paddleRightEdgeX = paddleX + paddleWidth;

    if (paddleTopEdgeY <= ballY + radius &&
        paddleBottomEdgeY >= ballY + radius &&
        paddleLeftEdgeX <= ballX + radius &&
        paddleRightEdgeX >= ballX - radius)
    {
       speedY = -Math.abs(speedY);
       const paddleCenter = paddleX + paddleWidth/2;
       const ballDistFromPaddleCenterX = ballX - paddleCenter;
       speedX = ballDistFromPaddleCenterX * 0.35;
    }
  }

  function reset(){
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    speedY = Math.abs(speedY);
    speedX = initSpeedX;
  }

  function drawAll(){
    // background
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    // ball
    drawBall(ballX, ballY, radius, 'white');
    //paddle
    drawRect(paddleX, paddleY, paddleWidth, paddleHeight, 'white');
    drawBricks();
  }

  function drawBricks(){
    let i = 0;
    let brickX = i*brickWeight;
    let brickY = 0;
    if (hiddenBricks.size === bricksCount) return;
    while(brickX + brickWeight <= canvas.width){
      checkCollisionBallWithBricks(i, brickX, brickY, brickWeight - 2, brickHeight);
      if (!hiddenBricks.has(i)) {
        drawBrick(brickX, brickY, brickWeight - 2, brickHeight);
      }
      i++;
      brickX = i*brickWeight
    }
  }

  function drawRect(top, left, width, height, color){
    ctx.fillStyle = color;
    ctx.fillRect(top, left, width, height);
  }

  function drawBrick(x, y, width, height) {
    ctx.drawImage(brickImg, x, y, width, height);
  }

  function drawBall(ballX, ballY, radius, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(ballX, ballY, radius, 0, Math.PI*2, true);
    ctx.fill();
  }

  function animation(callback){
    let start = null;
    let requestID = window.requestAnimationFrame(step);
    function step(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      callback();
      requestID = window.requestAnimationFrame(step);
    }
  }

  function updateMouseMove(e){
    const rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left - pageXOffset
    //let mouseY = e.clientY - rect.top - pageYOffset

    paddleX = mouseX - paddleWidth/2;
  }

  function checkCollisionBallWithBricks(index, x, y, weight, height) {

    if (
      x <= ballX + radius && x + weight >= ballX - radius &&
      y <= ballY + radius && y + height >= ballY - radius
    ) {
          hiddenBricks.add(index)
    }
  }
}
