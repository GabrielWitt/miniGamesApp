import { SoundsService } from 'src/app/shared/sounds.service';
import { Bullet } from './bullet';

export default class BulletController {
    bullets: Bullet[] = [];
    timeTillNextBulletAllowed = 0;
    canvas: any;
    maxBulletsAtATime: any;
    bulletColor: any;
    soundEnabled: any;
    shootSound: any;

  
    constructor(canvas: any, maxBulletsAtATime: any, bulletColor: any, soundEnabled: any,
      private sound: SoundsService) {
      this.canvas = canvas;
      this.maxBulletsAtATime = maxBulletsAtATime;
      this.bulletColor = bulletColor;
      this.soundEnabled = soundEnabled; this.sound.muteSound;
  
      this.shootSound = new Audio("assets/game_four/sounds/shoot.wav");
      this.shootSound.volume = 0.1;
    }
  
    draw(ctx: any) {
      this.bullets = this.bullets.filter(
        (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
      );
  
      this.bullets.forEach((bullet) => bullet.draw(ctx));
      if (this.timeTillNextBulletAllowed > 0) {
        this.timeTillNextBulletAllowed--;
      }
    }
  
    collideWith(sprite: any) {
      const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
        bullet.collideWith(sprite)
      );
  
      if (bulletThatHitSpriteIndex >= 0) {
        this.bullets.splice(bulletThatHitSpriteIndex, 1);
        return true;
      }
  
      return false;
    }
  
    shoot(x: any, y: any, velocity: any, timeTillNextBulletAllowed = 0) {
      if (
        this.timeTillNextBulletAllowed <= 0 &&
        this.bullets.length < this.maxBulletsAtATime
      ) {
        const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
        this.bullets.push(bullet);
        if (this.soundEnabled) {
          this.shootSound.currentTime = 0;
          this.shootSound.play();
        }
        this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
      }
    }
  }