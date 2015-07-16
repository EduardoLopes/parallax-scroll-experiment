import {random} from "./random";

export class Rect{
  constructor(x, y, size){

    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = 0;
    this.parallaxOffsetHorizontal = random.integer(200, 600);
    this.parallaxOffsetVertical = random.integer(200, 600);

  }
}