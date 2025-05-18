import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deck } from '../interfaces/deck';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private decks$: Observable<Deck[]>;
  private decksArray$: BehaviorSubject<Deck[]>;

  private decks: Map<number, Deck> = new Map<number, Deck>();

  constructor(private http: HttpClient) { 
    this.decks$ = this.http.get<Deck[]>(environment.serverUrl + '/decks');
    this.decksArray$ = new BehaviorSubject<Deck[]>([]);
    this.updateDecks()
  }

  getDecks(): BehaviorSubject<Deck[]> { 
    return this.decksArray$;
  }

  getDeck(id: number) : Deck | undefined{
    return this.decks.get(id)!;
  }

  addDeck(deck: Deck) {
    this.http.post<Deck>(environment.serverUrl + '/decks', deck).subscribe(deck => {
      let decks: Deck[] = this.decksArray$.getValue();
      decks.push(deck);
      this.decksArray$.next(decks);
    }
      
    );
  }

  updateDecks() {
    this.decks$.subscribe(decks => {
      this.decks.clear();
      this.decks$.subscribe(newDecks => {
        newDecks.forEach(deck => {
          this.decks.set(deck.id!, deck);
        });
      })
      
      this.decksArray$.next(decks);
    });
  }
}
