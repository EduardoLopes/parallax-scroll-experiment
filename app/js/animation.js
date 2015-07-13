export class Animation{
  constructor(id){
    this.objects = [];
    this.onScreen = false;
    this.id = id;
    this.$canvas = $(`.container-${id}`).children('.canvas')[0];
    this.ctx = this.$canvas.getContext('2d');
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