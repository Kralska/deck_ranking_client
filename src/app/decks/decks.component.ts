import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Deck } from '../interfaces/deck';
import { DeckService } from '../services/deck.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DeckAddComponent } from '../deck-add/deck-add.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    standalone: true,
    selector: 'app-decks',
    imports: [
        MatTableModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        RouterLink,
        MatToolbarModule
    ],
    templateUrl: './decks.component.html',
    styleUrl: './decks.component.scss'
})
export class DecksComponent implements AfterViewInit{

  private deckService: DeckService = inject(DeckService);

  displayedColumns : string[] = ['name', 'commander', 'rating'];
  dataSource: MatTableDataSource<Deck>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly dialog = inject(MatDialog);
  
  constructor(){
    this.dataSource = new MatTableDataSource<Deck>([]);
    this.deckService.getDecks().subscribe(decks => {
      this.dataSource.data = decks;
    });
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  promptAddDeck(){
    const dialogRef = this.dialog.open(DeckAddComponent)
  }
}
