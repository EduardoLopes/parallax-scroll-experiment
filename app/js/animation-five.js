import {Animation} from "./animation";
import {Rect} from "./rect";

const ID = 4;
const QAUNT = 40;

function distance(ax, ay, bx, by) {
  return Math.sqrt(Math.pow( ax - bx, 2) + Math.pow( ay - by, 2));
};

const random = new Random(Random.engines.mt19937().autoSeed());
/*
  right here i'm testing out some design pattern trying to get hide of if's inside the update function
  i might try a different approach on this soon
*/
class RectFive extends Rect{

  constructor(index, animation){
    super(0, 0, 15);

    this.index = index;
    this.animation = animation;
    this.id = this.index % 4;
    this.angle = Math.floor(this.index / 4) * ((Math.PI * 2) / (QAUNT / 4));

  }

  update_0(){

    this.x = Math.max(150, Math.min(300 - this.size, this.x));
    this.y = Math.max(150, Math.min(300 - this.size, this.y));

    this.angle += 0.01;

  }

  update_1(){

    this.x = Math.max(0, Math.min(150 - this.size, this.x));
    this.y = Math.max(0, Math.min(150 - this.size, this.y));

    this.angle += 0.011;

  }

  update_2(){

    this.x = Math.max(150, Math.min(300 - this.size, this.x));
    this.y = Math.max(0, Math.min(150 - this.size, this.y));

    this.angle += 0.012;

  }

  update_3(){

    this.x = Math.max(0, Math.min(150 - this.size, this.x));
    this.y = Math.max(150, Math.min(300 - this.size, this.y));

    this.angle += 0.013;

  }

  update(){

    this.x = (this.animation.center.x) + Math.cos(this.angle) * 300;
    this.y = (this.animation.center.y) + Math.sin(this.angle) * 300;

    this[`update_${this.id}`]();

    this.size = (15 * ((distance(this.x, this.y, this.animation.center.x, this.animation.center.y) / 300))) + 2;

  }

  draw(){

    this.animation.ctx.fillStyle = this.animation.color;
    this.animation.ctx.fillRect(this.x , this.y + ( this.animation.scrollPosition / 100 ) * (this.parallaxOffsetHorizontal), this.size, this.size);

  }
}

export class AnimationFive extends Animation{
  constructor(){
    super(ID, RectFive, QAUNT);
  }
}