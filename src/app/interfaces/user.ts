import { Deck } from "./deck";

export interface User {
    id?: number,
    username: string,
    decks?: Deck[]
}
