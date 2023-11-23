export class Bullet {
    canvas: any;
    velocity: any;
    bulletColor: any;
    x: any;
    y: any;
    height: any;
    width: any;

    constructor(canvas: any, x: any, y: any, velocity: any, bulletColor: any) {
      this.canvas = canvas;
      this.x = x;
      this.y = y;
      this.velocity = velocity;
      this.bulletColor = bulletColor;
  
      this.width = 5;
      this.height = 20;
    }
  
    draw(ctx: { fillStyle: any; fillRect: (arg0: any, arg1: any, arg2: any, arg3: any) => void; }) {
      this.y -= this.velocity;
      ctx.fillStyle = this.bulletColor;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    collideWith(sprite: { x: number; width: any; y: number; height: any; }) {
      if (
        this.x + this.width > sprite.x &&
        this.x < sprite.x + sprite.width &&
        this.y + this.height > sprite.y &&
        this.y < sprite.y + sprite.height
      ) {
        return true;
      } else {
        return false;
      }
    }
}
  