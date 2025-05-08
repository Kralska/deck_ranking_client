import { Deck } from "./deck"

export interface GamePlacement {
    game: Game,
    deck: Deck,
    position: number
}

export interface Game {
    id?: number,
    playedAt?: Date,
    participants?: number,
    placements?: [GamePlacement]
}


