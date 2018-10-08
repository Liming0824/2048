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
