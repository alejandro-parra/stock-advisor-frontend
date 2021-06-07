import { Component, OnInit } from '@angular/core';

interface Card {
  src: string;
  value: number;
}

const tiers = ['H', 'D', 'C', 'S'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss']
})
export class CardGameComponent implements OnInit {
  remainingCards: Card[] = [];
  maxScore: number = 0;
  currentScore: number = 0;
  playing: boolean = true;
  backCard = '../../assets/cards/2B.svg';
  currentCard: Card = {
    src: '../../assets/cards/2H.svg',
    value: 2
  }

  constructor() { }

  ngOnInit(): void {
    const localScore = localStorage.getItem('CARDSMAXSCORE');
    if(localScore) {
      this.maxScore = Number(localScore);
    }
    this.restartGame();
  }

  restartGame(): void {
    this.currentScore = 0;
    this.playing = true;
    this.createCards();
    this.shuffleCards();
    this.pushNextCard();
  }

  createCards(): void {
    let newDeck: Card[] = [];
    for(let [index, value] of values.entries()) {
      for(let tier of tiers) {
        newDeck.push({
          src: `../../assets/cards/${value}${tier}.svg`,
          value: index
        })
      }
    }
    this.remainingCards = newDeck;
  }

  shuffleCards(): void {
    var currentIndex = this.remainingCards.length;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [this.remainingCards[currentIndex], this.remainingCards[randomIndex]] = [
        this.remainingCards[randomIndex], this.remainingCards[currentIndex]];
    }
  }

  pushNextCard(): void {
    this.currentCard = this.remainingCards.pop();
  }

  decide(move: string): void {
    if(this.remainingCards.length === 0) {
      this.createCards();
      this.shuffleCards();
    }
    if((move === 'up' && this.remainingCards[this.remainingCards.length -1].value > this.currentCard.value) || (move === 'down' && this.remainingCards[this.remainingCards.length -1].value < this.currentCard.value)){
      this.currentScore += 1;
    } else {
      this.playing = false;
      if(this.maxScore < this.currentScore){
        this.maxScore = this.currentScore;
        localStorage.setItem('CARDSMAXSCORE', String(this.maxScore));
      }
    }
    this.pushNextCard();
  }
}
