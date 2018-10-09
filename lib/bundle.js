/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/cell.js":
/*!*********************!*\
  !*** ./lib/cell.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const COLOR = {
  2 : '#eaf1f4', 4 : '#d1e5f0', 8 : '#b5d7e8', 16 : '#9fcbe1', 32 : '#90c4dd', 64 : '#4c98c6',
  128 : '#3581b9', 256 : '#2a73b2', 512 : '#144d8a', 1024 : '#164b86', 2048 : '#134984',
  4096 : '#5106da', 8192 : '#6b23ef', 16384 : '#8549f3', 32768 : '#a37aef'
};




class Cell{
  constructor(ctx, value, width, height, pos, x, y){
    this.ctx = ctx;
    this.value = value;
    this.width = width;
    this.height = height;
    this.pos = pos;
    this.x = x;
    this.y = y;
  }

  draw(){
    if(this.value !== 0){
      this.ctx.beginPath();
      this.ctx.fillStyle = COLOR[this.value] ? COLOR[this.value] : '#ff80ff';
      this.ctx.fillRect(this.x + 6, this.y + 6, this.width - 12, this.height - 12);
      this.ctx.beginPath();
      this.ctx.font = 'bold 25pt Courier';
      this.ctx.fillStyle = 'black';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(this.value, this.x + this.width / 2, this.y + 12 + this.height / 2);
    }else{
      this.ctx.beginPath();
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x + 6, this.y + 6, this.width - 12, this.height - 12);
      this.ctx.beginPath();
    }
  }





}

module.exports = Cell;


/***/ }),

/***/ "./lib/dynamic_cell.js":
/*!*****************************!*\
  !*** ./lib/dynamic_cell.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

const COLOR = {
  2 : '#eaf1f4', 4 : '#d1e5f0', 8 : '#b5d7e8', 16 : '#9fcbe1', 32 : '#90c4dd', 64 : '#4c98c6',
  128 : '#3581b9', 256 : '#2a73b2', 512 : '#144d8a', 1024 : '#164b86', 2048 : '#134984',
  4096 : '#5106da', 8192 : '#6b23ef', 16384 : '#8549f3', 32768 : '#a37aef'
};




class DynamicCell{

  constructor(value, ctx, x, y, width, height, endX, endY, collision = false, xSpeed = 0, ySpeed = 0, targetPos){
    this.value = value;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.endX = endX;
    this.endY = endY;
    this.collision = collision;
    this.xSpeed = xSpeed * Math.floor(Math.abs(endX-x)/20);
    this.ySpeed = ySpeed * Math.floor(Math.abs(endY-y)/20);
    this.targetPos = targetPos;
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.fillStyle = COLOR[this.value] ? COLOR[this.value] : '#ff80ff';
    this.ctx.fillRect(this.x + 6, this.y + 6, this.width - 12, this.height - 12);

    this.ctx.beginPath();
    this.ctx.font = 'bold 25pt Courier';
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.value, this.x + this.width / 2, this.y + 12 + this.height / 2);
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  checkingCollision(){
    if(this.x === this.endX && this.y === this.endY){
      window.grid.updateGrid(this.targetPos, this);
    }else{
      this.draw();
    }
  }



}

module.exports = DynamicCell;


/***/ }),

/***/ "./lib/grid.js":
/*!*********************!*\
  !*** ./lib/grid.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Cell = __webpack_require__(/*! ./cell */ "./lib/cell.js");
const DynamicCell = __webpack_require__(/*! ./dynamic_cell */ "./lib/dynamic_cell.js");


class Grid{
  constructor(ctx){
    this.score = 0;
    this.scoreChanging = 0;
    this.ctx = ctx;
    this.cellsArray = [
      [ 0, 0, 0, 0],
      [ 0, 0, 0, 0],
      [ 0, 0, 0, 0],
      [ 0, 0, 0, 0]
    ];
    this.raf = null;
    this.row = this.cellsArray.length;
    this.column = this.cellsArray[0].length;
    this.cellHeight = Math.floor(window.canvasHeight/this.row);
    this.cellWidth = Math.floor(window.canvasWidth/this.column);
    this.intervalFunction = this.intervalFunction.bind(this);
    this.dynamic_cells = [];
    this.initGrid();
    this.drawGrid();
    this.onMoving = false;
    this.move = this.move.bind(this);
    document.addEventListener('keydown', this.move );
  }

  initGrid(){
    for(let i = 0; i < this.row; i++){
      for(let j = 0; j < this.column; j++){
        this.cellsArray[i][j] = new Cell(this.ctx, this.cellsArray[i][j], this.cellWidth, this.cellHeight, [i,j], j*this.cellWidth, i*this.cellHeight);
      }
    }
  }


  move(event){
    if(event.keyCode === 37){
      this.keyLeft();
    }else if(event.keyCode === 38){
      this.keyUp();
    }else if(event.keyCode === 39){
      this.keyRight();
    }else if(event.keyCode === 40){
      this.keyDown();
    }
  }

  slideDown(columnIdx, columnArr){
    let steps = 0;
    let prevCellNum = 0;
    let preEven = false;
    let prevCellValue = null;
    let add = 0;
    for(let j = columnArr.length - 1; j >= 0; j--){
      if(columnArr[j].value===0){
        steps += 1;
      }else{
        if(steps !== 0 || prevCellValue){
          if(prevCellValue && prevCellValue === columnArr[j].value && !preEven){
            this.dynamic_cells.push(new DynamicCell(
              columnArr[j].value,
              this.ctx,
              columnArr[j].x,
              columnArr[j].y,
              this.cellWidth,
              this.cellHeight,
              columnArr[j + steps + 1 + add].x,
              columnArr[j + steps + 1 + add].y,
              !preEven,
              0,
              +1,
              [j + steps + 1 + add, columnIdx]
            ));
            preEven = !preEven;
            if(preEven){add += 1;}
          }else{
            this.dynamic_cells.push(new DynamicCell(
              columnArr[j].value,
              this.ctx,
              columnArr[j].x,
              columnArr[j].y,
              this.cellWidth,
              this.cellHeight,
              columnArr[j + steps + add].x,
              columnArr[j + steps + add].y,
              false,
              0,
              +1,
              [j + steps + add, columnIdx]
            ));
            if(preEven){preEven = false;}
          }
          prevCellNum += 1;
          prevCellValue = columnArr[j].value;
          columnArr[j].value = 0;
        }else{
          prevCellNum += 1;
          prevCellValue = columnArr[j].value;
        }
      }
    }
    return columnArr;
  }


  slideUp(columnIdx, columnArr){
    let steps = 0;
    let prevCellNum = 0;
    let preEven = false;
    let prevCellValue = null;
    let add = 0;
    for(let j = 0; j< columnArr.length; j++){
      if(columnArr[j].value===0){
        steps += 1;
        }else{
        if(steps !== 0 || prevCellValue){
          if(prevCellValue && prevCellValue === columnArr[j].value && !preEven){
            this.dynamic_cells.push(new DynamicCell(
              columnArr[j].value,
              this.ctx,
              columnArr[j].x,
              columnArr[j].y,
              this.cellWidth,
              this.cellHeight,
              columnArr[j-steps - 1 - add].x,
              columnArr[j-steps - 1 - add].y,
              !preEven,
              0,
              -1,
              [j-steps -1-add, columnIdx]
            ));
            preEven = !preEven;
            if(preEven){add += 1;}
          }else{
            this.dynamic_cells.push(new DynamicCell(
              columnArr[j].value,
              this.ctx,
              columnArr[j].x,
              columnArr[j].y,
              this.cellWidth,
              this.cellHeight,
              columnArr[j-steps - add].x,
              columnArr[j-steps - add].y,
              false,
              0,
              -1,
              [j-steps -add, columnIdx]
            ));
            if(preEven){preEven = false;}
          }
          prevCellNum += 1;
          prevCellValue = columnArr[j].value;
          columnArr[j].value = 0;
        }else{
          prevCellNum += 1;
          prevCellValue = columnArr[j].value;
        }
      }
    }
    return columnArr;
  }




  slideRight(rowIdx, rowArr){
    let steps = 0;
    let prevCellNum = 0;
    let preEven = false;
    let prevCellValue = null;
    let add = 0;
    for(let j = rowArr.length - 1; j >= 0; j--){
      if(rowArr[j].value===0){
        steps += 1;
      }else{
        if(steps !== 0 || prevCellValue){
          if(prevCellValue && prevCellValue === rowArr[j].value && !preEven){
            this.dynamic_cells.push(new DynamicCell(
              rowArr[j].value,
              this.ctx,
              rowArr[j].x,
              rowArr[j].y,
              this.cellWidth,
              this.cellHeight,
              rowArr[ j + steps + 1 + add].x,
              rowArr[ j + steps + 1 + add].y,
              !preEven,
              +1,
              0,
              [rowIdx, j + steps + 1 + add]
            ));
            preEven = !preEven;
            if(preEven){add += 1;}
          }else{
            this.dynamic_cells.push(new DynamicCell(
              rowArr[j].value,
              this.ctx,
              rowArr[j].x,
              rowArr[j].y,
              this.cellWidth,
              this.cellHeight,
              rowArr[j+steps+add].x,
              rowArr[j+steps+add].y,
              false,
              +1,
              0,
              [rowIdx, j+steps + add]
            ));
            if(preEven){preEven = false;}
          }
          prevCellNum += 1;
          prevCellValue = rowArr[j].value;
          rowArr[j].value = 0;
        }else{
          prevCellNum += 1;
          prevCellValue = rowArr[j].value;
        }
      }
    }
    return rowArr;
  }

  slideLeft(rowIdx, rowArr){
    let steps = 0;
    let prevCellNum = 0;
    let preEven = false;
    let prevCellValue = null;
    let add = 0;
    for(let j = 0; j< rowArr.length; j++){
      if(rowArr[j].value === 0){
        steps += 1;
      }else{
        if(steps !== 0 || prevCellValue){
          if(prevCellValue && prevCellValue === rowArr[j].value && !preEven){
            this.dynamic_cells.push(new DynamicCell(
              rowArr[j].value,
              this.ctx,
              rowArr[j].x,
              rowArr[j].y,
              this.cellWidth,
              this.cellHeight,
              rowArr[j-steps -1 - add].x,
              rowArr[j-steps -1 - add].y,
              !preEven,
              -1,
              0,
              [rowIdx, j-steps -1 - add]
            ));
            preEven = !preEven;
            if(preEven){add += 1;}
          }else{
            this.dynamic_cells.push(new DynamicCell(
              rowArr[j].value,
              this.ctx,
              rowArr[j].x,
              rowArr[j].y,
              this.cellWidth,
              this.cellHeight,
              rowArr[j-steps - add].x,
              rowArr[j-steps - add].y,
              false,
              -1,
              0,
              [rowIdx, j - steps - add]
            ));
            if(preEven){preEven = false;}
          }
          prevCellNum += 1;
          prevCellValue = rowArr[j].value;
          rowArr[j].value = 0;
        }else{
          prevCellNum += 1;
          prevCellValue = rowArr[j].value;
        }
      }
    }
    return rowArr;
  }



  addRandom(){
    let options = [];
    for(let i = 0; i < this.row; i++){
      for(let j = 0; j < this.column; j++){
        if(this.cellsArray[i][j].value===0){
          options.push({r: i, c: j});
        }
      }
    }
    let position;
    if(options.length > 0){
      position = options[Math.floor(Math.random() * options.length)];
    }

    this.cellsArray[position.r][position.c] = Math.random() > 0.5 ?
      new Cell(this.ctx, 2, this.cellWidth, this.cellHeight, [position.r, position.c], position.c*this.cellWidth, position.r*this.cellHeight) :
      new Cell(this.ctx, 4, this.cellWidth, this.cellHeight, [position.r, position.c], position.c*this.cellWidth, position.r*this.cellHeight);
    this.onMoving = false;
  }


  updateGrid(pos, DyCell){
    if(DyCell.collision){
      this.cellsArray[pos[0]][pos[1]].value = DyCell.value * 2;
    }else{
      this.cellsArray[pos[0]][pos[1]].value = DyCell.value;
    }
    const idx = this.dynamic_cells.findIndex(cell => cell.targetPos[0] === pos[0] && cell.targetPos[1] === pos[1]);
    this.dynamic_cells = this.dynamic_cells.slice(0,idx).concat(this.dynamic_cells.slice(idx + 1));
  }



  drawGrid(){
    for(let i = 0; i < this.row; i++){
      for(let j = 0; j < this.column; j++){
        this.ctx.beginPath();
        this.ctx.lineWidth="12";
        this.ctx.strokeStyle= "#010329";
        this.ctx.rect(j*this.cellWidth, i*this.cellHeight, this.cellWidth, this.cellHeight);
        this.ctx.stroke();

        this.cellsArray[i][j].draw();
      }
    }
  }



  keyUp(){
    for(let j = 0; j< this.column; j++){
      let arrU = [this.cellsArray[0][j], this.cellsArray[1][j], this.cellsArray[2][j], this.cellsArray[3][j]];
      this.slideUp(j, arrU);
      for(let i = 0; i < this.row; i++){
        this.cellsArray[i][j] = arrU[i];
      }
    }
    this.dynamic_cells.forEach( cell => {
      cell.checkingCollision();
    });
    if(this.dynamic_cells.length !== 0){
      this.onMoving = true;
    }
  }

  keyDown(){
    for(let j = 0; j< this.column; j++){
      let arrU = [this.cellsArray[0][j], this.cellsArray[1][j], this.cellsArray[2][j], this.cellsArray[3][j]];
      this.slideDown(j, arrU);
      for(let i = 0; i < this.row; i++){
        this.cellsArray[i][j] = arrU[i];
      }
    }
    this.dynamic_cells.forEach( cell => {
      cell.checkingCollision();
    });
    if(this.dynamic_cells.length !== 0){
      this.onMoving = true;
    }
  }

  keyLeft(){
    for(let i = 0; i< this.row; i++){
      this.slideLeft(i, this.cellsArray[i]);
    }
    this.dynamic_cells.forEach( cell => {
      cell.checkingCollision();
    });
    if(this.dynamic_cells.length !== 0){
      this.onMoving = true;
    }
  }


  keyRight(){
    for(let i = 0; i< this.row; i++){
      this.slideRight(i, this.cellsArray[i]);
    }
    this.dynamic_cells.forEach( cell => {
      cell.checkingCollision();
    });
    if(this.dynamic_cells.length !== 0){
      this.onMoving = true;
    }
  }



  gameOver(){
    for(let i = 0; i < this.row; i++){
      for(let j = 0; j < this.column; j ++){
        if(this.cellsArray[i][j].value === 0){
          return false;
        }
        if(i != this.row-1 && this.cellsArray[i][j].value === this.cellsArray[i+1][j].value){
          return false;
        }
        if(j != this.column-1 && this.cellsArray[i][j].value === this.cellsArray[i][j+1].value){
          return false;
        }
      }
    }
    return true;
  }


  intervalFunction(){
    this.raf = requestAnimationFrame(this.intervalFunction);
    this.ctx.clearRect(0,0,400,400);
    this.drawGrid();
    this.dynamic_cells.forEach( cell => {
      cell.checkingCollision();
    });
    if(this.dynamic_cells.length === 0 && this.onMoving){
      this.addRandom();
    }
    document.getElementsByTagName('span')[0].innerHTML = `<span> score : ${this.highestScore()}</span>`;

    if(this.scoreChanging > 0){
      document.getElementsByTagName('strong')[0].innerHTML = `<p> + ${this.scoreChanging}</p>`;
    }

    if(this.gameOver() && this.dynamic_cells.length === 0){
      document.removeEventListener('keydown', this.move );
      cancelAnimationFrame(this.raf);
      this.gameOverPage();
    }
  }

  resetGrid(){
    document.removeEventListener('keydown', this.move );
    cancelAnimationFrame(this.raf);
    this.ctx.clearRect(0,0,400,400);
  }

  highestScore(){
    const s = this.score;
    for(let i = 0; i < this.row; i++){
      for(let j = 0; j < this.column; j++){
        if(this.cellsArray[i][j].value >= this.score){
          this.score = this.cellsArray[i][j].value;
        }
      }
    }
    this.scoreChanging = this.score - s;
    return this.score;
  }

  gameOverPage(){
    this.drawGrid();
    this.ctx.beginPath();
    this.ctx.fillStyle ="rgba(255, 255, 255, 0.5)";
    this.ctx.fillRect(0,0,400,400);
    this.ctx.beginPath();
    this.ctx.font = 'bold 35px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('your score is ' + this.highestScore(), 200, 200);
  }



}



module.exports = Grid;


/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Grid = __webpack_require__(/*! ./grid */ "./lib/grid.js");

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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map