import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { collapseAnimation, pulseAnimation, rubberBandAnimation } from 'angular-animations';
import { SoundsService } from '../../shared/sounds.service';

export interface Game1Option {
  code: string,
  name: string
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [
    pulseAnimation(),
  ]
})
export class Tab2Page {
  computerChoice = '';
  userChoice = '';
  resultDisplay = '';
  resultImage= '';
  pulseState = false;
  countdown = 0;
  possibleChoices: Game1Option[] = [
    {code: 'rock', name:'Rock'},
    {code: 'paper', name:'Paper'},
    {code: 'scissors', name:'Scissors'},
  ]

  constructor(
    private router: Router,
    private sound: SoundsService
  ) { }

  clickChoice(option: Game1Option){
    this.userChoice = option.code;
    this.loadGame();
  }

  loadGame(){
    // Computer 'deciding' by two seconds
    this.countdown = 2;
    let that = this;
    this.sound.loadingSound();
    that.randomComputerChoice(3);
    setTimeout(() => { that.randomComputerChoice(2); }, 330);
    setTimeout(() => { that.randomComputerChoice(3); }, 660);
    const loading = setInterval(function () {
      if (--that.countdown < 0) {
        clearInterval(loading);
        that.randomComputerChoice();
        that.getResult();
      }else{
        that.sound.loadingSound();
        that.randomComputerChoice(1);
        setTimeout(() => { that.randomComputerChoice(2); }, 330);
        setTimeout(() => { that.randomComputerChoice(3); }, 660);
      }
    }, 1000);
  }

  randomComputerChoice(choice?: number){
    // If receives a number set that image, if not 'pick' a result
    const randomNumber = choice ? choice : Math.floor(this.randomIntFromInterval(1,this.possibleChoices.length));
    switch(randomNumber){
      case 1: this.computerChoice = 'rock'; break;
      case 2: this.computerChoice = 'paper'; break;
      case 3: this.computerChoice = 'scissors'; break;
      default: this.computerChoice = 'rock'
    }
  }

  randomIntFromInterval(min: number, max: number) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  getResult(){
    if(this.computerChoice === this.userChoice){
      this.resultDisplay = "it's a draw";
    }
    if(this.computerChoice === 'rock' && this.userChoice === 'paper'){
      this.resultDisplay = "you win!";
    }
    if(this.computerChoice === 'rock' && this.userChoice === 'scissors'){
      this.resultDisplay = "you lose!";
    }
    if(this.computerChoice === 'paper' && this.userChoice === 'rock'){
      this.resultDisplay = "you lose!";
    }
    if(this.computerChoice === 'paper' && this.userChoice === 'scissors'){
      this.resultDisplay = "you win!";
    }
    if(this.computerChoice === 'scissors' && this.userChoice === 'paper'){
      this.resultDisplay = "you lose!";
    }
    if(this.computerChoice === 'scissors' && this.userChoice === 'rock'){
      this.resultDisplay = "you win!";
    }
    switch(this.resultDisplay){
      case "you win!": 
        this.resultImage = 'win'; 
        this.sound.winSound();
        break;
      case "you lose!": 
        this.resultImage = 'lose'; 
        this.sound.loseSound();
        break;
      case "it's a draw": 
        this.resultImage = 'draw'; 
        this.sound.drawSound();
        break;
      default: this.resultImage = '';
    }
    this.pulseState = true;
    setTimeout(() => {
      this.pulseState = false;
    }, 1000);
  }

  goBack(){
    this.router.navigateByUrl('home')
  }
  

}

