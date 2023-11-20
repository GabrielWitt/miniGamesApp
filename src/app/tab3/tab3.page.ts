import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, IonCard, ToastController } from '@ionic/angular';
import { AnimalsCards, FoodCards, FortniteCards } from './memory.objects';

export interface gameCard {
  name: string,
  image: string,
  found?: boolean;
  id?: number;
  index?: number;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;
  gridDisplay: HTMLElement | null = document.getElementById('grid');
  gameTheme = 'food/'
  img = '../../../assets/game_two/'+this.gameTheme;
  sizeCol = ['4','3'];
  sliceFoundCard: number[] = [6,12];

  // Food card list
  flipDown: string = this.img + 'blank.png';
  flipFound: string = 'assets/game_two/white.jpg';
  cardArray: gameCard[] = FoodCards;

  // Game object
  shuffledCards: gameCard[] = [];
  cardsChosen: gameCard[] = [];
  cardsWon: any = [];
  blockButton = false;

  constructor(
    private router: Router, 
    private toastController: ToastController,
    private alertController: AlertController,
    private actionSheetCtrl: ActionSheetController
    ) { }

  ionViewDidEnter(){ this.createBoard(); }

  createBoard(){
    let cards: gameCard[] = [];
    // Card pair creator
    for( let i = 0; i < this.cardArray.length * 2; i++){
      let index = 0;
      if(i >= this.cardArray.length){ index = i - this.cardArray.length; } 
      else{ index = i;}
      let card = {  
        ...this.cardArray[index],
        image: this.flipDown, id: index, index: i
      } 
      cards.push(card)
    }
    this.shuffledCards = cards;
    // Card list shuffler
    this.shuffledCards = this.shuffle();
    let cardIndex = 0;
    // Correct the index after shuffling
    this.shuffledCards.forEach( card => {
      card.index = cardIndex;
      cardIndex++;
    })
    // Set found images to false and clean score
    this.cardArray.forEach( card => { card.found = false; });
    this.cardsWon = [];
  }

  shuffle() {
    let shuffleArray = this.shuffledCards;
    let currentIndex = shuffleArray.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [shuffleArray[currentIndex], shuffleArray[randomIndex]] = [
        shuffleArray[randomIndex], shuffleArray[currentIndex]];
    }
  
    return shuffleArray;
  }

  flipCard(card: gameCard){
    // Check if pair card has been found
    if(!card.found && !this.blockButton && this.cardsChosen.length < 2){
      const index: number = parseInt(''+card.id);
      card.image = this.cardArray[index].image;
      // Save selected card
      this.cardsChosen.push(card);
      this.checkMatch();
    }
  }

  async checkMatch(){
    // Check if a pair is selected
    if(this.cardsChosen.length > 1){
      this.blockButton = true;
      const index1: number = parseInt(''+this.cardsChosen[0].index);
      const index2: number = parseInt(''+this.cardsChosen[1].index);
      if(this.cardsChosen[0].name === this.cardsChosen[1].name){
        await this.processCards(index1,index2);
      } else {
        console.log('not match')
        this.toastShow('Sorry, try again','close-circle', 'danger');
        // If not the same card, flip both cards after 2 seconds and clean selection
        setTimeout(() => {
          this.shuffledCards[index1].image = this.flipDown;
          this.shuffledCards[index2].image = this.flipDown;
          this.blockButton = false;
          this.cardsChosen = [];
        }, 2000);
      }
    }
  }

  processCards(index1: number, index2: number){
    return new Promise((resolve)=> {
      console.log('found a match!');
      this.toastShow('You have clicked the same image!','checkmark-circle', 'success')
      // If not the same card, flip both cards after 2 seconds and clean selection
      setTimeout(() => {
        // Set card as found
        const card1: number = parseInt(''+this.cardsChosen[0].id);
        this.cardArray[card1].found = true;
        // Set images as white.
        this.shuffledCards[index1].image = this.flipFound;
        this.shuffledCards[index2].image = this.flipFound;
        // Remove ability to click on card
        this.shuffledCards[index1].found = true;
        this.shuffledCards[index2].found = true;
        // Save fount cards
        this.cardsWon.push(this.cardsChosen);
        // Check if found all pairs
        if(this.cardsWon.length === this.cardArray.length){
          this.presentAlert();
        }
        this.blockButton = false;
        this.cardsChosen = [];
        resolve('done')
      }, 2000);
    })
  }

  async presentAlert() {
    // Show an Congratulations
    const alert = await this.alertController.create({
      header: 'YOU WIN!',
      message: 'Congratulations, you found them all!',
      buttons: ['Restart'],
    });

    await alert.present();
    await alert.onDidDismiss().then(() => {
      this.createBoard();
    })
  }

  async toastShow(message:string, icon: string, color: string){
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      icon,
      color
    });

    await toast.present();
  }

  async presentLevels() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'PICK A LEVEL',
      buttons: [
        {
          text: 'Easy - Food',
          data: {
            action: 'food/',
          },
        },
        {
          text: 'Medium - Animals',
          data: {
            action: 'animals/',
          },
        },
        {
          text: 'Hard - Fortnite',
          data: {
            action: 'fortnite/',
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
    actionSheet.onDidDismiss().then(option => {
      console.log(option)
      if(option.data){
        switch(option.data.action){
          case 'food/': 
            this.gameTheme = 'food/';
            this.cardArray = FoodCards; 
            this.sizeCol = ['4','3'];
            this.sliceFoundCard = [6,13];
            this.setUpLevel();
            break;
          case 'animals/': 
            this.gameTheme = 'animals/'; 
            this.cardArray = AnimalsCards; 
            this.sizeCol = ['3','2'];
            this.sliceFoundCard = [4,13];
            this.setUpLevel();
            break;
          case 'fortnite/': 
            this.gameTheme = 'fortnite/'; 
            this.cardArray = FortniteCards; 
            this.sizeCol = ['2','2'];
            this.sliceFoundCard = [6,13];
            this.setUpLevel();
            break;
          case 'restart': this.createBoard(); break;
          default: console.log('cancel');
        }
      }
    })
  }

  setUpLevel(){
    this.img = 'assets/game_two/'+this.gameTheme;
    this.flipDown = this.img + 'blank.png';
    console.log(this.cardArray)
    this.createBoard();
  }

}

