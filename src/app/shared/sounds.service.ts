import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {
  bgMusic = [
    {src: 'assets/game_one/PaperScissorsRockGame.mp3', duration: '04:24', game:1 },
    {src: 'assets/game_two/MemoryGame.mp3', duration:  '00:31', game:2 },
    {src: 'assets/game_three/ConnectFour.mp3', duration:  '02:07', game:3 },
    {src: 'assets/game_four/SpaceInvaders.mp3', duration:  '02:20', game:4 },
  ]

  BackgroundMusic: HTMLAudioElement = new Audio();
  bgMusicInterval: any;
  muteSound = false;

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

  /* ConnectFour Sounds */
  insertChip(){ this.playSound(`assets/game_three/coinPut.mp3`); };
  setChip(){ this.playSound(`assets/game_three/setCoin.mp3`); };

  /* Other Game sounds */

  optionSound(){ this.playSound(`assets/sounds/showOption.wav`); }
  
  unlockSound(){ this.playSound(`assets/sounds/unlockNotification-253.wav`); }

  loadingSoundTen(){ this.playSound(`assets/sounds/computerProcessing.mp3`); }

  increaseSound(){ this.playSound(`assets/sounds/coinsIncreasePresentation.wav`); }

  playBackgroundMusic(gameIndex: number){
    if(!this.muteSound){
      this.stopBgMusic();
      let duration = 0;
      let time = this.bgMusic[gameIndex].duration.split(':');
      const time1 = parseInt(time[0]) * 60;
      const time2 = parseInt(time[1]);
      duration = (time1 + time2) * 1000
      const that = this;
      console.log(this.bgMusic[gameIndex].src)
      this.BackgroundMusic.src = this.bgMusic[gameIndex].src;
      this.BackgroundMusic.load();
      this.BackgroundMusic.volume = 0.1;
      this.BackgroundMusic.play();
      // Code that restart track and keep playing the music
      this.bgMusicInterval = setInterval(() =>{
        that.BackgroundMusic.play();
      }, duration)
    }
  }

  stopBgMusic(){
    this.BackgroundMusic.pause();
    clearInterval(this.bgMusicInterval);
  }

  playSound(src: string){
    if(!this.muteSound){
      let audio = new Audio();
      audio.src = src;
      audio.load();
      audio.play();
    }
  }

  muteSounds(gameNo: number){
    if(this.muteSound){
      this.muteSound = false;
      this.playBackgroundMusic(gameNo)
    } else {
      this.muteSound = true;
      this.stopBgMusic();
    }
  }

}
