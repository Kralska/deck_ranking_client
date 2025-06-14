import { Component } from '@angular/core';
import { Deck } from '../interfaces/deck';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from '../services/deck.service';
import { UserService } from '../services/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ScryfallService } from '../services/scryfall.service';
import { concatAll, defer, map, Observable } from 'rxjs';
import { ScryfallCard } from '../interfaces/card';
import { AsyncPipe } from '@angular/common';
import { Game } from '../interfaces/game';
import { GameService } from '../services/game.service';
import { GameCardComponent } from '../games/game-card/game-card.component';

@Component({
    standalone: true,
    selector: 'app-deck',
    imports: [
      MatToolbarModule,
      MatButtonModule,
      MatListModule,
      MatIconModule,
      AsyncPipe,
      GameCardComponent
    ],
    templateUrl: './deck.component.html',
    styleUrl: './deck.component.scss'
})
export class DeckComponent {
  
  
  id: number;
  deck$: Observable<Deck>;
  commander$: Observable<ScryfallCard>;
  games$: Observable<Game[]>;

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
    private cardService: ScryfallService,
    private gameService: GameService
  ){
    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
    this.deck$ = deckService.fetchDeck(this.id);

    this.commander$ = this.deck$.pipe(
      map(deck => {
        if(!deck.commander){
          return new Observable<ScryfallCard>(
            function subscribe(subscriber){
              subscriber.complete();
            }
          )
        }
        return cardService.getCard(deck.commander);
      }),
      concatAll()
    );
    this.games$ = this.deck$.pipe(
      map(deck => deckService.fetchGamesWithDeck(deck)),
      concatAll()
    );
  }
  
}
