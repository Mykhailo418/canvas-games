window.onload = function(){
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d');

  // Ball Params
  const radius = 10;
  let speedX = 2;
  let speedY = 1;
  let ballX = 100;
  let ballY = 100;

  animation(update)

  // Update
  function update(){
    ballX += speedX;
    ballY += speedY;

    // Change direction
    if (ballX + radius > canvas.width || ballX - radius < 0) speedX *= -1;
    if (ballY + radius > canvas.height || ballY - radius < 0) speedY *= -1;

    // Black rectangle
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Ball
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ballX, ballY, radius, 0, Math.PI*2, true);
    ctx.fill();
  }

  // Animation
  function animation(callback){
    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      callback();
      requestID = window.requestAnimationFrame(step);
    }
    let requestID = window.requestAnimationFrame(step)
  }
}
