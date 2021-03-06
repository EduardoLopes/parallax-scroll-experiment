import {Animation} from "./animation";
import {Rect} from "./rect";

const ID = 3;
const QAUNT = 40;

class RectFour extends Rect{

  constructor(index, animation){
    super(0, 0, 15);

    this.index = index;
    this.animation = animation;
    this.angle = this.index * ((Math.PI * 2) / QAUNT);

  }

  update(){

    this.x = (this.animation.center.x) + Math.cos(this.angle) * 300;
    this.y = (this.animation.center.y) + Math.sin(this.angle) * 300;

    if(this.index % 5 == 0){

      this.x = Math.max(0, Math.min(300 - this.size, this.x));
      this.y = Math.max(0, Math.min(300 - this.size, this.y));

      this.angle += 0.01;

    } else {

      this.x = Math.max(30, Math.min((300 - 30) - this.size, this.x));
      this.y = Math.max(30, Math.min((300 - 30) - this.size, this.y));

      this.angle -= 0.005;

    }
  }

  draw(){

    this.animation.ctx.fillStyle = this.animation.color;
    this.animation.ctx.fillRect(this.x , this.y + ( this.animation.scrollPosition / 100 ) * (this.parallaxOffsetHorizontal), this.size, this.size);

  }
}

export class AnimationFour extends Animation{
  constructor(){
    super(ID, RectFour, QAUNT);
  }
}