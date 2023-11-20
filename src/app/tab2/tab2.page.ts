import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Game1Option {
  code: string,
  name: string
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  computerChoice = '';
  userChoice = '';
  resultDisplay = '';
  resultImage= '';
  possibleChoices: Game1Option[] = [
    {code: 'rock', name:'Rock'},
    {code: 'paper', name:'Paper'},
    {code: 'scissors', name:'Scissors'},
  ]

  constructor(private router: Router) { }

  clickChoice(option: Game1Option){
    this.userChoice = option.code;
    this.generateComputerChoice();
  }

  generateComputerChoice(){
    const randomNumber = Math.floor(this.randomIntFromInterval(1,this.possibleChoices.length));
    switch(randomNumber){
      case 1: this.computerChoice = 'rock'; break;
      case 2: this.computerChoice = 'paper'; break;
      case 3: this.computerChoice = 'scissors'; break;
      default: this.computerChoice = 'rock'
    }
    this.getResult();
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
      case "you win!": this.resultImage = 'win'; break;
      case "you lose!": this.resultImage = 'lose'; break;
      case "it's a draw": this.resultImage = 'draw'; break;
      default: this.resultImage = '';
    }
  }

  goBack(){
    this.router.navigateByUrl('home')
  }
  

}

