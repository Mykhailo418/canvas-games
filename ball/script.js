window.onload = function(){
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(100, 100, 10, 0, Math.PI*2, true);
  ctx.fill();
}
