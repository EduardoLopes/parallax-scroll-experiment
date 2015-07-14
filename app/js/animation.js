import {COLORS} from "./colors";

export class Animation{
  constructor(id){
    this.objects = [];
    this.onScreen = false;
    this.id = id;
    this.color = `hsl(${COLORS[this.id].h}, ${COLORS[this.id].s + 30}%, ${COLORS[this.id].l + 20}%)`;
    this.$canvas = $(`.container-${id}`).children('.canvas')[0];
    this.ctx = this.$canvas.getContext('2d');
    this.scrollPosition = 0;
    this.center = {
      x: this.$canvas.width / 2,
      y: this.$canvas.height / 2
    }
  }

  update(){
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].update();
    }
  }

  draw(){
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].draw();
    }
  }
};