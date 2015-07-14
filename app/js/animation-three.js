import {Animation} from "./animation";
import {Rect} from "./rect";

const ID = 2;
const QAUNT = 20;

const random = new Random(Random.engines.mt19937().autoSeed());

class RectThree extends Rect{

  constructor(index, animation){
    super(0,0,10,10);

    this.index = index;
    this.animation = animation;
    this.angle = this.index * ((Math.PI * 2) / QAUNT);
    this.size = random.integer(10, 50);

  }

  update(){

    this.x = this.animation.center.x + Math.cos(this.angle) * 300;
    this.y = this.animation.center.y + Math.sin(this.angle) * 300;

    this.x = Math.max(0, Math.min(300 - this.size, this.x));
    this.y = Math.max(0, Math.min(300 - this.size, this.y));

    if(this.index % 2 == 0){
      this.angle += 0.01;
    } else {
      this.angle += 0.012;
    }

    this.size += Math.sin(this.angle) * 0.2;


  }

  draw(){

    this.animation.ctx.fillStyle = this.animation.color;
    this.animation.ctx.fillRect(this.x, this.y, this.size, this.size);

  }
}

export class AnimationThree extends Animation{
  constructor(){
    super(ID);

    for (let i = 0; i < QAUNT; i++) {
      this.objects[i] = new RectThree(i, this);
    };

  }

  draw(){
    this.ctx.clearRect(0, 0, this.$canvas.width,  this.$canvas.height);
    //draw all the rectangles
    super.draw();
  }
}