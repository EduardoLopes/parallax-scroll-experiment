import {Animation} from "./animation";
import {Rect} from "./rect";

const ID = 1;
const QAUNT = 20;

class RectTwo extends Rect{

  constructor(index, animation){
    super(0, 0, 15);

    this.index = index;
    this.animation = animation;
    this.angle = this.index * ((Math.PI * 2) / QAUNT);

  }

  update(){

    this.x = (this.animation.center.x) + Math.cos(this.angle) * 300;
    this.y = (this.animation.center.y) + Math.sin(this.angle) * 300;

    if(this.index % 2 == 0){

      this.x = Math.max(0, Math.min(300 - this.size, this.x));
      this.y = Math.max(0, Math.min(300 - this.size, this.y));

      this.angle += 0.01;

    } else {

      this.x = Math.max(75, Math.min(225 - this.size, this.x));
      this.y = Math.max(75, Math.min(225 - this.size, this.y));

      this.angle -= 0.01;
    }  }

  draw(){

    this.animation.ctx.fillStyle = this.animation.color;
    if(this.index % 2 == 0){
      this.animation.ctx.fillRect(this.x, this.y + ( this.animation.scrollPosition / 100 ) * (this.parallaxOffsetHorizontal), this.size, this.size);
    } else {
      this.animation.ctx.fillRect(this.x + (this.size / 4), this.y + ( this.animation.scrollPosition / 100 ) * (this.parallaxOffsetHorizontal) + (this.size / 4), this.size, this.size);
    }


  }
}

export class AnimationTwo extends Animation{
  constructor(){
    super(ID, RectTwo, QAUNT);
  }
}