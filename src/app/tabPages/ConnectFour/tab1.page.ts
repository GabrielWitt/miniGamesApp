import { Component } from '@angular/core';

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
  squares: any = [];
  CurrentPlayer: 1 | 2 = 1;
  result: any;

  constructor() {}

  ionViewDidEnter(){
    this.calculateGameSize();
    this.createBoard();
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

  clickSquare(square: Square){
    const takenSquare = this.squares[square.id + 7];
    if(takenSquare.taken && !square.lastLine && this.result === ''){
      if(this.CurrentPlayer === 1){
        this.squares[square.id].status = 'red';
        this.squares[square.id].taken = true;
        this.CurrentPlayer = 2;
      } else if(this.CurrentPlayer === 2) {
        this.squares[square.id].status = 'green';
        this.squares[square.id].taken = true;
        this.CurrentPlayer = 1;
      }
    };
    this.checkBoard();
  } 

  checkBoard(){
    for (let y = 0; y < winningArrays.length; y++) {
      const square1 = this.squares[winningArrays[y][0]]
      const square2 = this.squares[winningArrays[y][1]]
      const square3 = this.squares[winningArrays[y][2]]
      const square4 = this.squares[winningArrays[y][3]]

      //check those squares to see if they all have the class of player-one
      if (
        square1.status === 'blue' &&
        square2.status === 'blue' &&
        square3.status === 'blue' &&
        square4.status === 'blue'
      )
      {
        this.result = 'Player One Wins!'
      }
      //check those squares to see if they all have the class of player-two
      if (
        square1.status === 'red' &&
        square2.status === 'red' &&
        square3.status === 'red' &&
        square4.status === 'red'
      )
      {
        this.result = 'Player Two Wins!'
      }
    }
  }
  
  calculateGameSize(){
    var w = window.innerWidth;
    console.log(w);
    console.log(document.documentElement.style)
    
  }

}

//Winning Arrays
export const winningArrays = [
  [0, 1, 2, 3],
  [41, 40, 39, 38],
  [7, 8, 9, 10],
  [34, 33, 32, 31],
  [14, 15, 16, 17],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [20, 19, 18, 17],
  [28, 29, 30, 31],
  [13, 12, 11, 10],
  [35, 36, 37, 38],
  [6, 5, 4, 3],
  [0, 7, 14, 21],
  [41, 34, 27, 20],
  [1, 8, 15, 22],
  [40, 33, 26, 19],
  [2, 9, 16, 23],
  [39, 32, 25, 18],
  [3, 10, 17, 24],
  [38, 31, 24, 17],
  [4, 11, 18, 25],
  [37, 30, 23, 16],
  [5, 12, 19, 26],
  [36, 29, 22, 15],
  [6, 13, 20, 27],
  [35, 28, 21, 14],
  [0, 8, 16, 24],
  [41, 33, 25, 17],
  [7, 15, 23, 31],
  [34, 26, 18, 10],
  [14, 22, 30, 38],
  [27, 19, 11, 3],
  [35, 29, 23, 17],
  [6, 12, 18, 24],
  [28, 22, 16, 10],
  [13, 19, 25, 31],
  [21, 15, 9, 3],
  [20, 26, 32, 38],
  [36, 30, 24, 18],
  [5, 11, 17, 23],
  [37, 31, 25, 19],
  [4, 10, 16, 22],
  [2, 10, 18, 26],
  [39, 31, 23, 15],
  [1, 9, 17, 25],
  [40, 32, 24, 16],
  [9, 17, 25, 33],
  [8, 16, 24, 32],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [29, 30, 31, 32],
  [33, 32, 31, 30],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
]
