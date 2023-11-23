import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import BulletController from './controllers/bullet.controller';
import EnemyController from './controllers/enemy.controller';
import { Player } from './controllers/Player';

@Component({
  selector: 'app-space-invaders',
  templateUrl: './space-invaders.page.html',
  styleUrls: ['./space-invaders.page.scss'],
})
export class SpaceInvadersPage implements OnInit {
  @ViewChild('playerImg') playerImg!: ElementRef;
  @ViewChild('enemy1Img') enemy1Img!: ElementRef;
  @ViewChild('enemy2Img') enemy2Img!: ElementRef;
  @ViewChild('enemy3Img') enemy3Img!: ElementRef;
  @ViewChild('game', {static: true}) myCanvas!: ElementRef;
  @ViewChild('spaceBg') spaceBg!: ElementRef;
  canvas: HTMLCanvasElement = this.myCanvas?.nativeElement;
  ctx: CanvasRenderingContext2D | null = this.canvas?.getContext("2d");
  space: any;
    
  isGameOver = false;
  didWin = false;

  playerBulletController:any; // = new BulletController(this.canvas, 10, "red", true);
  enemyBulletController:any; // = new BulletController(this.canvas, 4, "white", false);
  enemyController:any; // = new EnemyController(
  player:any; // = new Player(this.canvas, 3, this.playerBulletController);

  constructor() { }

  ngAfterViewInit(){
  }

  ionViewDidEnter(){ 
    console.log(this.spaceBg)
    this.space = this.spaceBg.nativeElement;
    this.canvas = this.myCanvas.nativeElement;
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext("2d");
    if(this.ctx){
      this.ctx?.drawImage(this.space, 0, 0, this.canvas.width, this.canvas.height);
    }
    this.startGame();
  }

  ngOnInit() {
  }

  startGame(){
    this.isGameOver = false;
    this.didWin = false;

    this.playerBulletController = new BulletController(this.canvas, 10, "red", true);
    const enemyImgs = [ this.enemy1Img.nativeElement, this.enemy2Img.nativeElement, this.enemy3Img.nativeElement ]
    this.enemyBulletController = new BulletController(this.canvas, 4, "white", false);
    this.enemyController = new EnemyController(
      this.canvas,
      this.enemyBulletController,
      this.playerBulletController,
      enemyImgs
    );
    this.player = new Player(this.canvas, 3, this.playerBulletController, this.playerImg.nativeElement);
    this.game();
  }

  game() {
    const that = this;
    setInterval(()=>{
      that.checkGameOver();
      that.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      that.ctx?.drawImage(this.space, 0, 0, this.canvas.width, this.canvas.height);
      that.displayGameOver();
      if (!that.isGameOver) {
        that.enemyController.draw(this.ctx);
        that.player.draw(this.ctx);
        that.playerBulletController.draw(this.ctx);
        that.enemyBulletController.draw(this.ctx);
      }
    }, 1000 / 60);
  }

  displayGameOver() {
    if (this.isGameOver && this.ctx) {
      let text = this.didWin ? "You Win" : "Game Over";
      let textOffset = this.didWin ? 3.5 : 5;
  
      this.ctx.fillStyle = "white";
      this.ctx.font = "70px Arial";
      this.ctx.fillText(text, this.canvas.width / textOffset, this.canvas.height / 2);
    }
  }
  
  checkGameOver() {
    if (this.isGameOver) {
      return;
    }
  
    if (this.enemyBulletController.collideWith(this.player)) {
      this.isGameOver = true;
    }
  
    if (this.enemyController.collideWith(this.player)) {
      this.isGameOver = true;
    }
  
    if (this.enemyController.enemyRows.length === 0) {
      this.didWin = true;
      this.isGameOver = true;
    }
  }

}
