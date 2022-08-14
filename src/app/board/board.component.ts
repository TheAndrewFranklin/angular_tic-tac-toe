import { Component, OnInit } from '@angular/core';
import { Player } from '../player/player';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: (number | 'X' | 'O')[] = [2, 7, 6, 9, 5, 1, 4, 3, 8];
  xIsNext: boolean = true;
  winner: 'X' | 'O' | null = null;

  playerX: Player = new Player('X');
  playerO: Player = new Player('O');

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = [2, 7, 6, 9, 5, 1, 4, 3, 8]
    this.playerX.squares = []
    this.playerO.squares = []
    this.winner = null;
    this.xIsNext = !!Math.round(Math.random()); // 50% true/false
  }

  get currentPlayer() {
    return this.xIsNext ? this.playerX : this.playerO;
  }

  makeMove(idx: number) {
    if (this.winner) return;

    if (typeof this.squares[idx] === 'number') {
      this.currentPlayer.squares.push(this.squares.slice(idx, idx + 1)[0] as number)
      this.squares = [...this.squares.slice(0, idx), this.currentPlayer.team, ...this.squares.slice(idx + 1)]

      this.checkWinner()
      this.xIsNext = !this.xIsNext;
    }
  }

  checkWinner() {
    if ([...this.subsetContainsSum(this.currentPlayer.squares, 15)].length) {
      this.winner = this.currentPlayer.team
    }
  }

  * subsetContainsSum(inputArray: number[], targetNum: number, solution: number[] = []): Generator<number[], any, undefined> {
    for (let i = 0; i < inputArray.length; i++) {
      const s = targetNum - inputArray[i];
      if (!s && solution.length === 2) {
          yield [...solution, inputArray[i]];
      } else if (s > 0) {
          yield* this.subsetContainsSum(inputArray.slice(i + 1), s, [...solution, inputArray[i]]);
      }
    }
  }  
}
