import { Component, inject, Injectable, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Deck } from '../deck';
import { Observable } from 'rxjs';
import { DeckService } from '../services/deck.service';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';
import { UserAddComponent } from "../user-add/user-add.component";
import { MatButtonModule } from '@angular/material/button';
import { DeckAddComponent } from '../deck-add/deck-add.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    UserAddComponent],
  templateUrl: './decks.component.html',
  styleUrl: './decks.component.css'
})
@Injectable({providedIn: 'root'})
export class DecksComponent {
  displayedColumns : string[] = ['name', 'owner_id', 'commander'];
  dataSource: Observable<Deck[]>;

  readonly dialog = inject(MatDialog);

  promptAddDeck(){
    const dialogRef = this.dialog.open(DeckAddComponent)
  }

  constructor(private decks: DeckService, protected users: UserService){
    this.dataSource = decks.getDecks();
  }
}
