import { Component } from '@angular/core';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
    selector: 'app-games',
    imports: [GameCardComponent],
    templateUrl: './games.component.html',
    styleUrl: './games.component.scss'
})
export class GamesComponent {

}
