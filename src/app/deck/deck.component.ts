import { Component } from '@angular/core';
import { Deck } from '../deck';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DeckService } from '../services/deck.service';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})
export class DeckComponent {
  id: Number;
  deck: Deck | undefined;

  constructor(private route: ActivatedRoute, private deckService: DeckService, protected userService: UserService){
    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
    deckService.getFullDeck(this.id).subscribe(deck => this.deck = deck);
  }
  
}
