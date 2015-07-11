import {Animation} from "./animation";
import {Rect} from "./rect";

const ID = 0;

class RectOne extends Rect{
  constructor(index){
    super(0,0,10,10);

  }

  update(){

  }

  draw(){

  }
}

export class AnimationOne extends Animation{
  constructor(){
    super(ID);
  }

  draw(){
    this.ctx.fillStyle = '#FFF';
    this.ctx.fillRect(0, 0, this.$canvas.width,  this.$canvas.height);
    //draw all the rectangles
    super.draw();
  }
}