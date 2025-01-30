import { Component } from '@angular/core';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [GameCardComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {

}
