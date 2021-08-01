export interface BaseResponse {
    name: string;
    url: string;
}

export interface PokemonType {
    type: BaseResponse;
}

export interface EffectEntry {
    effect: string;
    language: BaseResponse;
    short_effect: string;
}

export interface PokemonAbility {
    name: string;
    effect_entries?: EffectEntry[];
}

export interface PokemonAbilities {
    ability: PokemonAbility;
}


export interface PokemonMove {
    name: string;
    power?: number;
    pp?: number;
    type?: PokemonType;
}

export interface PokemonMoves {
    move: PokemonMove
}

export interface Pokemon {
    name?: string;
    image?: string;
    owned?: number;
    nickname?: string;
    moves?: PokemonMoves[],
    types?: PokemonType;
}