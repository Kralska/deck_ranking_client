export interface ScryfallCard {
    id: string;
    lang: string;
    layout: string;
    cmc: number;
    color_identity: string[];
    color_indicator?: string[];
    colors?: string[];
    defense?: string
    game_changer?: boolean;
    keywords: string[];
    loyalty?: string;
    mana_cost?: string;
    name: string;
    oracle_text?: string;
    power?: string;
    produced_mana?: string;
    reserved: boolean;
    toughness?: string;
    type_line: string;
    artist?: string;
    border_color: string;
    collector_number: string;
    content_warning?: boolean;
    digital: boolean;
    frame: string;
    full_art: boolean;
    games: string[];
    highres_image: boolean;
    illustration_id: string;
    image_status: string;
    image_uris?: ScryfallImageUris;
    oversized: boolean;
    printed_name?: string;
    printed_text?: string;
    printed_type_line?: string;
    promo: boolean;
    promo_types?: string[];
    rarity: string;
    released_at: Date;
    reprint: boolean;
    set_name: string;
    set_type: string;
    set: string;
    story_spotlight: boolean;
    textless: boolean
    variation: boolean;
    security_stamp?: string;
    watermark?: string;
}

export interface ScryfallImageUris {
    art_crop?: string;
}
