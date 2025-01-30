import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Deck } from '../deck';
import { DeckService } from '../services/deck.service';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DeckAddComponent } from '../deck-add/deck-add.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './decks.component.html',
  styleUrl: './decks.component.scss'
})
export class DecksComponent implements OnInit{
  displayedColumns : string[] = ['name', 'owner_id', 'commander', 'rating'];
  dataSource: MatTableDataSource<Deck> = new MatTableDataSource<Deck>([]);

  readonly dialog = inject(MatDialog);
  
  constructor(protected deckService: DeckService, protected users: UserService){
  }

  ngOnInit(): void {
    this.deckService.getDecks().subscribe(
      decks => this.dataSource = new MatTableDataSource<Deck>(decks)
    );
  }

  promptAddDeck(){
    const dialogRef = this.dialog.open(DeckAddComponent)
  }
}
