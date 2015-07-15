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

    this.size = this.index * ((215) / QAUNT);

    this.x = (this.animation.$canvas.width / 2) - (this.size / 2);
    this.y = (this.animation.$canvas.height / 2) - (this.size / 2);

  }

  update(){

    if(this.index % 2 == 0){
      this.angle += 0.01;
    } else {
      this.angle -= 0.01;
    }

  }

  draw(){

    let y = (this.y + ( this.animation.scrollPosition / 100 ) * (this.parallaxOffsetHorizontal));


    this.animation.ctx.save();
    this.animation.ctx.strokeStyle = this.animation.color;
    this.animation.ctx.fillStyle = this.animation.color;
    this.animation.ctx.lineWidth = 4;
    this.animation.ctx.translate(this.x + (this.size / 2), y + (this.size / 2));
    this.animation.ctx.rotate(this.angle);
    this.animation.ctx.translate(-(this.x + (this.size / 2)), -(y + (this.size / 2)));

    this.animation.ctx.beginPath();
    this.animation.ctx.rect(this.x, y, this.size, this.size);
    this.animation.ctx.closePath();
    this.animation.ctx.stroke();

    this.animation.ctx.globalCompositeOperation = 'xor';
    this.animation.ctx.fillRect(this.x, y, this.size, this.size);

    this.animation.ctx.restore();

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