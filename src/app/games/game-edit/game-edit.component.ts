import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule} from '@angular/material/datepicker'
import { MatTimepickerModule} from '@angular/material/timepicker'
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Deck } from '../../interfaces/deck';
import { DeckService } from '../../services/deck.service';
import { Game } from '../../interfaces/game';
import { GameService } from '../../services/game.service';

@Component({
  standalone: true,
  selector: 'app-games-edit',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-edit.component.html',
  styleUrl: './game-edit.component.scss'
})
export class GameEditComponent {
  
  deckService: DeckService = inject(DeckService);
  userService: UserService = inject(UserService);
  gameService: GameService = inject(GameService);

  gameForm: FormGroup = new FormGroup({
    playedAtDate: new FormControl<Date | null>(new Date(), Validators.required),
    playedAtTime: new FormControl<Date | null>(new Date(), Validators.required),
    placements: new FormArray([this.getNewPlacementForm()])
  });

  constructor(public dialogRef: MatDialogRef<GameEditComponent>) {}

  toGame(): Game {
    let game: Game = this.gameForm.value;
    let playedAtDate: Date = this.gameForm.value.playedAtDate;
    let playedAtTime: Date = this.gameForm.value.playedAtTime;
    let playedAt: Date = new Date(
      playedAtDate.getFullYear(), playedAtDate.getMonth(), playedAtDate.getDate(),
      playedAtTime.getHours(), playedAtTime.getMinutes()
    );

    game.playedAt = playedAt;
    game.participants = game.placements?.length;
    return game;
  }

  onChangeComplete() {
    var game: Game = this.toGame();
    console.log(game);
    if(game.id){
      this.updateGame(game);
    } else {
      this.saveGame(game);
    }
  }

  saveGame(game: Game) {
    this.gameService.addGame(game);
  }

  updateGame(game: Game) {
    console.log("Update!");
  }

  // ========== Placements ==========
  get placements() {
    return this.gameForm.controls['placements'] as FormArray;
  };

  getNewPlacementForm(position: number = 1) {
    return new FormGroup({
      position: new FormControl<number>(position, Validators.required),
      deck: new FormControl<Deck | undefined>(undefined, Validators.required),
      player: new FormControl<User | undefined>(undefined, Validators.required)
    })
  }

  addNewPlacement() {
    var position: number = 1;
    if(this.placements.length > 0){
      position = this.placements.at(this.placements.length - 1).get('position')?.value + 1;
    }
    var lastPlacement = this.getNewPlacementForm(position);
    this.placements.push(lastPlacement);

    setTimeout(() => {
      this.positionInputs()[this.positionInputs().length - 1].nativeElement.focus();
    }, 1);
  }

  deletePlacement(idx: number) {  
    this.placements.removeAt(idx);
    delete this.filteredDecks[idx];
  }

  reorderPlacements() {
    this.gameForm.value.placements?.sort();
  }
  
  // ========== Positions ==========
  positionInputs = viewChildren<ElementRef>("positionInput");

  // ========== Deck ==========
  filteredDecks: Deck[][] = [];
  deckInputs = viewChildren<ElementRef>("deckInput");

  displayDeckFn(deck: Deck | null): string {
    return deck?.name || "";
  }
  
  onDeckSelected(placementIdx: number, event: MatAutocompleteSelectedEvent) : void {
    this.placements.at(placementIdx).get("deck")?.setValue(event.option.value || undefined);
  }

  filterDecks(idx: number) {
    const filterValue = this.deckInputs()[idx].nativeElement.value.toLowerCase();
    this.filteredDecks[idx] = this._filterDecks(filterValue);
  }

  private  _filterDecks(filterValue: string): Deck[] {
    return this.deckService.getDecks().value
      .filter(deck => deck.name?.toLowerCase().includes(filterValue.toLowerCase()));
  }

  
  // ========== User ==========
  filteredUsers: User[][] = [];
  playerInputs = viewChildren<ElementRef>("playerInput")

  displayUserFn(user: User | null): string {
    return user?.username || "";
  }

  onUserSelected(placementIdx: number, event: MatAutocompleteSelectedEvent) : void {
    this.placements.at(placementIdx).get("user")?.setValue(event.option.value || undefined);
  }

  filterUsers(idx: number) {
    const filterValue = this.playerInputs()[idx].nativeElement.value.toLowerCase();
    this.filteredUsers[idx] = this._filterUsers(filterValue);
  }

  private _filterUsers(filterValue: string): User[] {
    return this.userService.getUsers().getValue()
      .filter(deck => deck.username?.toLowerCase().includes(filterValue.toLowerCase()));
  }
}
