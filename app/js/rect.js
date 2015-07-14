const random = new Random(Random.engines.mt19937().autoSeed());

export class Rect{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;


    this.parallaxOffsetHorizontal = random.integer(200, 600);
    this.parallaxOffsetVertical = random.integer(200, 600);
  }
}