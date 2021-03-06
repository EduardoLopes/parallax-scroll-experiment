import {Animation} from "./animation";
import {Rect} from "./rect";

const ID = 0;
const QAUNT = 60;

class RectOne extends Rect{

  constructor(index, animation){
    super(0, 0, ((index % 4) + 1) * (15 / 4)) /*size*/ ;

    this.index = index;
    this.animation = animation;
    this.angle = this.index * ((Math.PI * 2) / QAUNT);

  }

  update(){

      this.x = (this.animation.center.x) + Math.cos(this.angle) * 300;
      this.y = (this.animation.center.y) + Math.sin(this.angle) * 300;

    if(this.index % 4 == 0){

      this.x = Math.max(0, Math.min((300 - 0) - this.size, this.x));
      this.y = Math.max(0, Math.min((300 - 0) - this.size, this.y));

      this.angle += 0.01;

    } else if(this.index % 4 == 1){

      this.x = Math.max(15, Math.min((300 - 15) - this.size, this.x));
      this.y = Math.max(15, Math.min((300 - 15) - this.size, this.y));

      this.angle += 0.011;

    } else if(this.index % 4 == 2){

      this.x = Math.max(30, Math.min((300 - 30) - this.size, this.x));
      this.y = Math.max(30, Math.min((300 - 30) - this.size, this.y));

      this.angle += 0.012;

    } else if(this.index % 4 == 3){

      this.x = Math.max(45, Math.min((300 - 45) - this.size, this.x));
      this.y = Math.max(45, Math.min((300 - 45) - this.size, this.y));

      this.angle += 0.013;

    }

  }

  draw(){

    this.animation.ctx.fillStyle = this.animation.color;
    this.animation.ctx.fillRect(this.x , this.y + ( this.animation.scrollPosition / 100 ) * (this.parallaxOffsetHorizontal), this.size, this.size);

  }
}

export class AnimationOne extends Animation{
  constructor(){
    super(ID, RectOne, QAUNT);
  }
}