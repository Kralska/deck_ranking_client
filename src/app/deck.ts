import { FormControl, FormGroup, Validators } from "@angular/forms"

export interface Deck {
    id: Number,
    name: String,
    commander: String,
    owner: Number
};