import {Animation} from "./animation";
import {Rect} from "./rect";

const ID = 5;
const QAUNT = 60;

const random = new Random(Random.engines.mt19937().autoSeed());

class RectSix extends Rect{
  constructor(index, animation){
    super(0,0,10,10);

    this.index = index;
    this.animation = animation;
    this.angle = this.index * ((Math.PI * 2) / QAUNT);

    this.size = ((this.index % 4) + 1) * (15 / 4);

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

      this.angle += 0.01;

    } else if(this.index % 4 == 2){

      this.x = Math.max(30, Math.min((300 - 30) - this.size, this.x));
      this.y = Math.max(30, Math.min((300 - 30) - this.size, this.y));

      this.angle += 0.01;

    } else if(this.index % 4 == 3){

      this.x = Math.max(45, Math.min((300 - 45) - this.size, this.x));
      this.y = Math.max(45, Math.min((300 - 45) - this.size, this.y));

      this.angle += 0.01;

    }

  }

  draw(){

    this.animation.ctx.fillRect(this.x, this.y, this.size, this.size);

  }
}

export class AnimationSix extends Animation{
  constructor(){
    super(ID);

    for (let i = 0; i < QAUNT; i++) {
      this.objects[i] = new RectSix(i, this);
    };

  }

  draw(){
    this.ctx.clearRect(0, 0, this.$canvas.width,  this.$canvas.height);
    //draw all the rectangles
    super.draw();
  }
}