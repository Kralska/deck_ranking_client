import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deck } from '../interfaces/deck';
import { BehaviorSubject, defer, Observable, Subscriber } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/game';

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
    let deck: Deck | undefined = this.decks.get(id);
    if(!deck){
      this.updateDecks()
      deck = this.decks.get(id);
    }
    return deck;
  }

  /**
   * Fetches a deck by id.
   * 
   * Either from the previously retrieved decks or, if the deck isn't contained
   * in the previously imported decks, from the API(server).
   * @param id (numerical) id of the deck
   * @returns an observable that emits the deck
   */
  fetchDeck(id: number) : Observable<Deck> {
    let decks$: BehaviorSubject<Deck[]> = this.decksArray$;
    
    return defer(() => {
      let decks: Deck[] = decks$.getValue();
      let deck: Deck | undefined = decks.find(deck => deck.id == id);
      if(deck){
        return new Observable<Deck>(
          function subscribe(subscriber){
            subscriber.next(deck);
            subscriber.complete();
          }
        )
      }
      return this.http.get<Deck>(environment.serverUrl + '/decks/' + id);
    });
  }

  fetchGamesWithDeck(deck: Deck): Observable<Game[]> {
    return this.http.get<Game[]>(environment.serverUrl + "/decks/" + deck.id + "/games");
  }

  /**
   * Posts a request to create the deck 'deck' at the server.
   * @param deck NEW deck
   */
  createDeck(deck: Deck) {
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
