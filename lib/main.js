const Grid = require('./grid');

document.addEventListener('DOMContentLoaded', () => {
  var myCanvas = document.getElementById('myCanvas');
  var ctx = myCanvas.getContext("2d");
  window.canvasWidth = myCanvas.width;
  window.canvasHeight = myCanvas.height;
  let grid = new Grid(ctx);
  window.grid = grid;
  window.grid.drawGrid();

  ctx.beginPath();
  ctx.fillStyle ="rgba(255, 255, 255, 0.5)";
  ctx.fillRect(0,0,400,400);

  // ctx.beginPath();
  // ctx.font = 'bold 35px Arial';
  // ctx.textAlign = 'center';
  // ctx.fillStyle = 'black';
  // ctx.fillText("press N to start", 200, 200);
  start();
  document.getElementsByTagName("button")[0].addEventListener('click', reset, false);
  // document.addEventListener('keydown', start, false);
  function start(event){
    // if(event.keyCode === 78){
      window.grid.addRandom();
      // document.removeEventListener('keydown', start, false);
      requestAnimationFrame(window.grid.intervalFunction);
    // }
  }

  function reset(){
    window.grid.resetGrid();
    window.grid = new Grid(ctx);
    window.grid.addRandom();
    requestAnimationFrame(window.grid.intervalFunction);
  }

  window.start = start;

});
