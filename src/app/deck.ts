import { User } from "./user";

export interface Deck {
    id: Number,
    name: String,
    commander: String,
    owner: User,
    placements: Number[],
    ratings: Number[]
}
