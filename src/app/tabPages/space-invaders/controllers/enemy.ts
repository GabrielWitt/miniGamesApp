export class Enemy {
    x: any;
    y: any;
    imageNumber: any;
    height: any;
    width: any;
    image: any;

    constructor(x: any, y: any, imageNumber: any, enemyImages: any) {
      this.x = x;
      this.y = y;
      this.width = 44;
      this.height = 32;
      const idEnemy = parseInt(imageNumber) - 1;
      this.image = enemyImages[''+idEnemy]
    }
  
    draw(ctx: { drawImage: (arg0: any, arg1: any, arg2: any, arg3: any, arg4: any) => void; }) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    move(xVelocity: any, yVelocity: any) {
      this.x += xVelocity;
      this.y += yVelocity;
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
  