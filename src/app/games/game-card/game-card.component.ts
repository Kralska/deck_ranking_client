import { Component, Input, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'
import { Game } from '../../interfaces/game';
import { DatePipe } from '@angular/common';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../interfaces/deck';
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
    selector: 'game-card',
    imports: [
        MatListModule,
        MatCardModule,
        DatePipe,
        RouterLink
    ],
    templateUrl: './game-card.component.html',
    styleUrl: './game-card.component.scss'
})
export class GameCardComponent implements OnInit{

    constructor(protected deckService : DeckService){}

    @Input({required: true})
    game?: Game;

    ngOnInit(): void {
        // Sort placements by position
        this.game?.placements?.sort((placement1, placement2) => placement1.position - placement2.position )
    }
}
