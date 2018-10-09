const Cell = require('./cell');
const DynamicCell = require('./dynamic_cell');


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
