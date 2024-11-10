import { Component, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Deck } from '../deck';
import { BehaviorSubject, Observable } from 'rxjs';

export const ELEMENT_DATA: Deck[] = [
  {id: 1, name: "Kambal Tokens", commander: "Kambal, Profiteering Mayor", owner_id: 1, placements: [], ratings: []}
];

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [ MatTableModule],
  templateUrl: './decks.component.html',
  styleUrl: './decks.component.css'
})
export class DecksComponent {
  data = new BehaviorSubject<Deck[]>(ELEMENT_DATA);
  
  displayedColumns : string[] = ['name', 'owner_id', 'commander'];
  dataSource = ELEMENT_DATA;

  connect(): Observable<Deck[]> {
    return this.data;
  }

  disconnect() {}
}
