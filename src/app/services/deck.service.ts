import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deck } from '../deck';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private decks: Observable<Deck[]>;

  constructor(private http: HttpClient) { 
    this.decks = this.http.get<Deck[]>('http://localhost:8080/api/decks');
  }

  getDecks(): Observable<Deck[]>{
    return this.decks;
  }

  getFullDeck(id: Number): Observable<Deck>{
    return this.http.get<Deck>('http://localhost:8080/api/decks/' + id);
  }

  addDeck(deck: Deck) {
    this.http.post<User>('http://localhost:8080/api/decks', deck).subscribe(console.log);
    this.refresh();
  }

  refresh() {
    this.decks.subscribe(console.log);
  }
}
