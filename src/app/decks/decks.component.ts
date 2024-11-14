import { Component, Injectable, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { Deck } from '../deck';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const ELEMENT_DATA: Deck[] = [
  {id: 1, name: "Kambal Tokens", commander: "Kambal, Profiteering Mayor", owner: {id: 1}, placements: [], ratings: []}
];

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [ MatTableModule],
  templateUrl: './decks.component.html',
  styleUrl: './decks.component.css'
})
@Injectable({providedIn: 'root'})
export class DecksComponent {
  data: Observable<Deck[]>;
  
  displayedColumns : string[] = ['name', 'owner_id', 'commander'];
  dataSource;

  connect(): Observable<Deck[]> {
    return this.data;
  }

  disconnect() {}

  constructor(private http: HttpClient){
    this.data = http.get<Deck[]>('http://localhost:8080/api/decks');
    this.dataSource = this.data;
  }
}
