import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {

  constructor() { }

  /* Rock Paper Scissors Game sounds */
  loadingSound(){ this.playSound(`assets/sounds/shortLoad.mp3`); }

  winSound(){ this.playSound(`assets/sounds/WinGame.wav`); }

  drawSound(){ this.playSound(`assets/sounds/drawHuh.mp3`); }

  loseSound(){ this.playSound(`assets/sounds/spaceDeadNotification.wav`); }

  /* Memory Game sounds */

  flipUpSound(){ this.playSound(`assets/sounds/flipUp.mp3`); }

  flipDownSound(){ this.playSound(`assets/sounds/showOption.wav`); }

  positiveSound(){ this.playSound(`assets/sounds/positiveNotification.wav`); }

  negativeSound(){ this.playSound(`assets/sounds/negativePunch.wav`); }

  winGame(){ this.playSound(`assets/sounds/successTrumpet.mp3`); };

  shuffleCards(){ this.playSound(`assets/sounds/shuffle.mp3`); };

  /* Other Game sounds */

  optionSound(){ this.playSound(`assets/sounds/showOption.wav`); }
  
  unlockSound(){ this.playSound(`assets/sounds/unlockNotification-253.wav`); }

  loadingSoundTen(){ this.playSound(`assets/sounds/computerProcessing.mp3`); }

  increaseSound(){ this.playSound(`assets/sounds/coinsIncreasePresentation.wav`); }


  playSound(src: string){
    let audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play();
  }

}
