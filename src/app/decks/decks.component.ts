import { Component, Injectable, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { Deck } from '../deck';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DeckService } from '../services/deck.service';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [ MatTableModule],
  templateUrl: './decks.component.html',
  styleUrl: './decks.component.css'
})
@Injectable({providedIn: 'root'})
export class DecksComponent {

  displayedColumns : string[] = ['name', 'owner_id', 'commander'];
  dataSource: Observable<Deck[]>;

  constructor(private decks: DeckService, protected users: UserService){
    this.dataSource = decks.getDecks();
  }
}
