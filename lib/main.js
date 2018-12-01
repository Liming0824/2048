const Grid = require('./grid');

document.addEventListener('DOMContentLoaded', () => {
  var myCanvas = document.getElementById('myCanvas');
  var ctx = myCanvas.getContext("2d");
  window.scoreArr = [];
  window.canvasWidth = myCanvas.width;
  window.canvasHeight = myCanvas.height;
  let grid = new Grid(ctx);
  window.grid = grid;
  window.grid.drawGrid();

  ctx.beginPath();
  ctx.fillStyle ="rgba(255, 255, 255, 0.5)";
  ctx.fillRect(0,0,400,400);

  start();
  document.getElementsByTagName("button")[0].addEventListener('click', reset, false);
  document.getElementsByTagName("form")[0].addEventListener('submit', window.grid.updateFirebase);

  function start(event){
      window.grid.addRandom();
      requestAnimationFrame(window.grid.intervalFunction);
  }

  function reset(){
    window.grid.resetGrid();
    window.grid = new Grid(ctx);
    window.grid.addRandom();
    requestAnimationFrame(window.grid.intervalFunction);
  }

  window.start = start;

});
