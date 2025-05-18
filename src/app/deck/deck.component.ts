import { Component } from '@angular/core';
import { Deck } from '../interfaces/deck';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from '../services/deck.service';
import { UserService } from '../services/user.service';

@Component({
    standalone: true,
    selector: 'app-deck',
    imports: [],
    templateUrl: './deck.component.html',
    styleUrl: './deck.component.scss'
})
export class DeckComponent {
  id: number;
  deck: Deck;

  constructor(private route: ActivatedRoute, private deckService: DeckService){
    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
    this.deck = deckService.getDeck(this.id)!;
  }
  
}
