import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Deck, NewDeck } from '../deck';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private decks$: Observable<Deck[]>;

  constructor(private http: HttpClient) { 
    this.decks$ = this.http.get<Deck[]>('http://localhost:8080/api/decks');
  }

  getDecks(): Observable<Deck[]>{ 
    return this.decks$;
  }

  getFullDeck(id: Number): Observable<Deck> {
    return this.http.get<Deck>('http://localhost:8080/api/decks/' + id);
  }

  addDeck(deck: NewDeck) {
    this.http.post<User>('http://localhost:8080/api/decks', deck).subscribe(console.log);
  }
}
