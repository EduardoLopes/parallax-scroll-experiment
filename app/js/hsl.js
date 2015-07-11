export class HSL{
  constructor(h, s, l){
    this.h = h;
    this.s = s;
    this.l = l;
  }

  toString(){
    return `hsl(${this.h},${this.s}%,${this.l}%)`
  }
};