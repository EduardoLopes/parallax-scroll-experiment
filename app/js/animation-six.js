import {Animation} from "./animation";
import {Rect} from "./rect";

const ID = 5;
const QAUNT = 20;

class RectSix extends Rect{

  constructor(index, animation){
    super(0, 0, 15);

    this.index = index;
    this.animation = animation;
    this.angle = this.index * ((Math.PI * 2) / QAUNT);

  }

  update(){

    this.x = this.animation.center.x + Math.cos(this.angle) * 300;
    this.y = this.animation.center.y + Math.sin(this.angle) * 300;

    this.x = Math.max(0, Math.min(300 - this.size, this.x));
    this.y = Math.max(0, Math.min(300 - this.size, this.y));

    if(this.index % 2 == 0){
      this.angle += 0.01;
    } else {
      this.angle -= 0.01;
    }

  }

  draw(){
    let next = this.animation.objects[this.index + 5];
    this.animation.ctx.fillStyle = this.animation.color;
    this.animation.ctx.strokeStyle = this.animation.color;
    this.animation.ctx.fillRect(this.x , this.y + ( this.animation.scrollPosition / 100 ) * (this.parallaxOffsetHorizontal), this.size, this.size);

    if(typeof next != 'undefined'){

      this.animation.ctx.beginPath();
      this.animation.ctx.lineWidth = 15;
      this.animation.ctx.moveTo(this.x + (this.size / 2), (this.y + ( this.animation.scrollPosition / 100 ) * (this.parallaxOffsetHorizontal)) + (this.size / 2));
      this.animation.ctx.lineTo(next.x + (next.size / 2), (next.y + ( this.animation.scrollPosition / 100 ) * (next.parallaxOffsetHorizontal)) + (next.size / 2));
      this.animation.ctx.closePath();
      this.animation.ctx.stroke();

    }

  }
}

export class AnimationSix extends Animation{
  constructor(){
    super(ID, RectSix, QAUNT);
  }
}