export interface Deck {
    name?: string,
    owner?: number
    id: number,
    commander?: string,
    rating: number
};

export interface NewDeck {
    name : string,
    owner: number,
    commander: string
}