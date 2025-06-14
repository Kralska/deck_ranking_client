import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScryfallCard } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class ScryfallService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  getCard(name: string): Observable<ScryfallCard>{
    return this.http.get<ScryfallCard>("https://api.scryfall.com/cards/named?fuzzy=" + name);
  }
}
