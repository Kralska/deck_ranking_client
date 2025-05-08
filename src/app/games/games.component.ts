import { Component, inject, OnInit } from '@angular/core';
import { GameCardComponent } from './game-card/game-card.component';
import { Game } from '../interfaces/game';
import { GameService } from '../services/game.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { GameEditComponent } from './game-edit/game-edit.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    standalone: true,
    selector: 'app-games',
    imports: [
        GameCardComponent,
        MatButtonModule,
        AsyncPipe,
        MatToolbarModule
    ],
    templateUrl: './games.component.html',
    styleUrl: './games.component.scss'
})
export class GamesComponent{
    games$: Observable<Game[]>;

    constructor(private gameService: GameService) {
        this.games$ = gameService.getGames();
    }

    readonly dialog = inject(MatDialog)

    promptAddGame() {
        const dialogRef = this.dialog.open(GameEditComponent);
    }
}
