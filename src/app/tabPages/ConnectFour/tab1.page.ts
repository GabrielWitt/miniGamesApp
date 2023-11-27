import { Component, HostListener } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { SoundsService } from 'src/app/shared/sounds.service';

export interface Square {
  id: number, 
  status: 'green' | 'red' | 'white';
  taken: boolean;
  lastLine: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  playing = false;
  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e:any) { 
    if(!this.playing){
      this.sound.playBackgroundMusic(3);
      this.playing = true;
    } 
  }
  squares: any = [];
  CurrentPlayer: 1 | 2 = 1;
  result: any;
  loading = false;
  fallTime = 150;
  recoverTime = 100;
  screenSize = '';

  constructor(
    private sound: SoundsService,
    private alertController: AlertController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ionViewDidEnter(){
    this.calculateGameSize();
    this.createBoard();
    if(!this.playing){
      this.sound.playBackgroundMusic(2);
      this.playing = true;
    } 
  }

  ionViewWillLeave(){
    this.sound.stopBgMusic();
  }

  createBoard(){
    this.squares = [];
    for(let i = 0; i < 49; i++){
      const taken = i > 41;
      const square: Square = { id: i, status: 'white', taken, lastLine: taken  }
      this.squares.push(square);
    }
    this.result = '';
    this.CurrentPlayer = 1;
  }

  async clickSquare(square: Square){
    if(!this.playing){
      this.sound.playBackgroundMusic(3);
      this.playing = true;
    } 
    if(!this.loading){
      this.sound.insertChip();
      this.loading = true;
      let chip = -1;
      for(let i=square.id;i<49;i=i+7){
        chip = await this.checkSquare(this.squares[i]);
        if(chip > -1){ break; }
      }
      this.fallEffect(square.id,chip)
    }
  } 

  // Verify where the chip will fall
  async checkSquare(square: Square){
    return new Promise<number>((resolve) => {
      const takenSquare = this.squares[square.id + 7];
      if(takenSquare.taken && !square.lastLine && this.result === ''){
        resolve(square.id);
      } else {
        resolve(-1);
      };
    })
  }

  // Create falling effect on the board
  async fallEffect(start: number, chipSet: number){
    let count = start;
    let chipColor = this.CurrentPlayer === 1 ? 'red' : 'green';
    let that = this;
    const ChipAnimation = await setInterval(()=>{
      that.changingColor(count,chipColor);
      count = count + 7;
      if(count > chipSet){ 
        clearInterval(ChipAnimation);
        that.setSpace(chipSet);
      }
    },this.fallTime)
  }

  // Change color to create falling effect
  changingColor(count: number, chipColor: string){
    this.squares[count].status = chipColor;
    setTimeout(() => {
      this.squares[count].status = 'white';
    }, this.recoverTime);
  }

  // Set the chip and call the board status verifier;
  setSpace(chipSet:number){
    setTimeout(() => {
      if(this.CurrentPlayer === 1){
        this.squares[chipSet].status = 'red';
        this.squares[chipSet].taken = true;
        this.CurrentPlayer = 2;
      } else if(this.CurrentPlayer === 2) {
        this.squares[chipSet].status = 'green';
        this.squares[chipSet].taken = true;
        this.CurrentPlayer = 1;
      }
      this.sound.setChip();
      this.loading = false;
      this.checkBoard();
    }, this.fallTime);
  }

  checkBoard(){
    horizontalList.forEach(async (chipId: number) => { 
      if(!this.result){  this.generateFour(chipId,1,false); }
      else{ return ; }
    })
    verifyList.forEach(async (chipId: number) => { 
      if(!this.result){ 
        this.generateFour(chipId,1,false);
        this.generateFour(chipId,7,false);
        this.generateFour(chipId,8,false);
       }
      else{ return ; }
    })
    reverseList.forEach(async (chipId: number) => { 
      if(!this.result){  
        this.generateFour(chipId,7,false); 
        this.generateFour(chipId,6,false);
      }
      else{ return ; }
    })
  }

  generateFour(index: number, spaceB: number, sideways: boolean){
    let list = []; let count = index;
    for(let i =0; i<4;i++){
      list.push(count)
      if(sideways){ count = count + spaceB + i +1;}
      else{ count = count + spaceB; }
    }
    this.checkFour(list);
    return list;
  }

  checkFour(chipList: number[]){
    const square1 = this.squares[chipList[0]];
    const square2 = this.squares[chipList[1]];
    const square3 = this.squares[chipList[2]];
    const square4 = this.squares[chipList[3]];

    //check those squares to see if they all have the class of player-one
    if (
      square1.status === 'green' &&
      square2.status === 'green' &&
      square3.status === 'green' &&
      square4.status === 'green'
    )
    {
      this.result = 'Player Two Wins!'
      this.presentAlert();
    }
    //check those squares to see if they all have the class of player-two
    if (
      square1.status === 'red' &&
      square2.status === 'red' &&
      square3.status === 'red' &&
      square4.status === 'red'
    )
    {
      this.result = 'Player One Wins!';
      this.presentAlert();
    }
  }

  async presentAlert() {
    // Show an Congratulations
    this.sound.winGame();
    const alert = await this.alertController.create({
      header: 'YOU WIN!',
      message: 'Congratulations, '+this.result,
      buttons: ['Restart Game'],
    });

    await alert.present();
    await alert.onDidDismiss().then(() => {
      // Restart Game
      this.createBoard();
    })
  }

  // Modal to display an handle options
  async presentOptions() {
    this.sound.optionSound();
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'PICK A LEVEL',
      buttons: [
        {
          text: 'Enable / Disable Sounds',
          data: {
            action: 'sounds',
          },
        },
        {
          text: 'Restart Game',
          role: 'destructive',
          data: {
            action: 'restart',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
    actionSheet.onWillDismiss().then(option => {
      if(option.data){
        if(option.data.action !== 'cancel'){ this.sound.unlockSound();}
        else { this.sound.optionSound(); }
        switch(option.data.action){
          case 'restart': this.createBoard(); break;
          case 'sounds': this.sound.muteSounds(3); break;
          default: console.log('cancel');
        }
      }
    })
  }
  
  //Adjust game size to screen
  calculateGameSize(){
    var w = window.innerWidth;
    console.log(w);
    if(w >= 599 && w <= 998){
      this.screenSize = 'Mid';
      return
    } else if(w >= 998){
      this.screenSize = 'Large';
    } else{
      this.screenSize = '';
    }
    
  }

}

//Winning Possibilities.
export const verifyList = [
  0, 1, 2, 3,
  7, 8, 9, 10,
  14, 15, 16, 17,
]
export const reverseList = [
  3, 4, 5, 6,
  10, 11, 12, 13,
  17, 18, 19, 20
]
export const horizontalList = [
  21, 22, 23, 24,
  28, 29, 30, 31,
  35, 36, 37, 38,
]
