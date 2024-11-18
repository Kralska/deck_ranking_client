import { FormControl, FormGroup, Validators } from "@angular/forms"

export interface Deck {
    name: String,
    owner: Number
    id?: Number,
    commander?: String,
};