import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Deck } from '../deck';
import { DeckService } from '../services/deck.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-deck-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './deck-add.component.html',
  styleUrl: './deck-add.component.css'
})
export class DeckAddComponent {
  deckForm = new FormGroup({
    id: new FormControl<Number|null>(null),
    name: new FormControl<String|null>('', {validators: Validators.required}),
    commander: new FormControl<String|null>(null),
    owner: new FormControl<Number|null>(null, {validators: Validators.required})
  })

  constructor(
    public dialogRef: MatDialogRef<DeckAddComponent>,
    private deckService: DeckService,
    protected userService: UserService) { }

  onSubmit() {
    let deck: Deck = {
      id: undefined,
      name: this.deckForm.value.name ?? '',
      commander: this.deckForm.value.commander ?? '',
      owner: this.deckForm.value.owner?? 0
    };
    this.deckService.addDeck(deck);

    this.dialogRef.close();
  }
}
