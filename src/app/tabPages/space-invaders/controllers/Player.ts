export class Player {
    rightPressed = false;
    leftPressed = false;
    shootPressed = false;
    canvas: any;
    velocity: any;
    bulletController: any;
    height: any;
    width: any;
    image: any;
    x: any;
    y: any;
  
    constructor(canvas: any, velocity: any, bulletController: any, PlayerImg: any) {
      console.log(canvas)
      this.canvas = canvas;
      this.velocity = velocity;
      this.bulletController = bulletController;
  
      this.x = this.canvas.width / 2;
      this.y = this.canvas.height - 75;
      this.width = 50;
      this.height = 48;
      this.image = PlayerImg;
  
      document.addEventListener("keydown", this.keydown);
      document.addEventListener("keyup", this.keyup);
    }
  
    draw(ctx: { drawImage: (arg0: any, arg1: any, arg2: any, arg3: any, arg4: any) => void; }) {
      if (this.shootPressed) {
        this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
      }
      this.move();
      this.collideWithWalls();
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    collideWithWalls() {
      //left
      if (this.x < 0) {
        this.x = 0;
      }
  
      //right
      if (this.x > this.canvas.width - this.width) {
        this.x = this.canvas.width - this.width;
      }
    }
  
    move() {
      if (this.rightPressed) {
        this.x += this.velocity;
      } else if (this.leftPressed) {
        this.x += -this.velocity;
      }
    }
  
    keydown = (event: { code: string; }) => {
      if (event.code == "ArrowRight") {
        this.rightPressed = true;
      }
      if (event.code == "ArrowLeft") {
        this.leftPressed = true;
      }
      if (event.code == "Space") {
        this.shootPressed = true;
      }
    };
  
    keyup = (event: { code: string; }) => {
      if (event.code == "ArrowRight") {
        this.rightPressed = false;
      }
      if (event.code == "ArrowLeft") {
        this.leftPressed = false;
      }
      if (event.code == "Space") {
        this.shootPressed = false;
      }
    };
  }
  