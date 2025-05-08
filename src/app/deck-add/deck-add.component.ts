import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Deck } from '../interfaces/deck';
import { DeckService } from '../services/deck.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../services/user.service';

@Component({
    standalone: true,
    selector: 'app-deck-add',
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule
    ],
    templateUrl: './deck-add.component.html',
    styleUrl: './deck-add.component.scss'
})
export class DeckAddComponent {
  deckForm = new FormGroup({
    name: new FormControl<string>('', {validators: Validators.required}),
    commander: new FormControl<string|undefined>(undefined)
  })

  constructor(
    public dialogRef: MatDialogRef<DeckAddComponent>,
    private deckService: DeckService,
    protected userService: UserService) { }

  addNewDeck() {
    let newDeck: Deck = {
      name: this.deckForm.value.name!,
      commander: this.deckForm.value.commander || undefined,
      rating: 1000 // Dummy for adding
    }
    this.deckService.addDeck(newDeck);

    this.dialogRef.close();
  }
}
