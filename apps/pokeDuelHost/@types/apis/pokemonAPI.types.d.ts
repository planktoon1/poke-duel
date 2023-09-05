export interface IPokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: {
        name: string;
        url: string;
    };
}
export interface IPokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}
export interface IPokemonFormType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}
export interface IPokemonTypePast {
    generation: {
        name: string;
        url: string;
    };
    types: IPokemonType[];
}
export interface IPokemonHeldItem {
    item: {
        name: string;
        url: string;
    };
    version_details: {
        version: {
            name: string;
            url: string;
        };
        rarity: number;
    }[];
}
export interface IPokemonMove {
    move: {
        name: string;
        url: string;
    };
    version_group_details: {
        move_learn_method: {
            name: string;
            url: string;
        };
        version_group: {
            name: string;
            url: string;
        };
        level_learned_at: number;
    }[];
}
export interface IPokemonStat {
    stat: {
        name: string;
        url: string;
    };
    effort: number;
    base_stat: number;
}
export interface IPokemonSprites {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
    other: {
        dream_world: {
            front_default: string;
        };
    };
}
export interface IPokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: IPokemonAbility[];
    forms: {
        name: string;
        url: string;
    }[];
    game_indices: {
        game_index: number;
        version: {
            name: string;
            url: string;
        };
    }[];
    held_items: IPokemonHeldItem[];
    location_area_encounters: string;
    moves: IPokemonMove[];
    past_types: IPokemonTypePast[];
    sprites: IPokemonSprites;
    species: {
        name: string;
        url: string;
    };
    stats: IPokemonStat[];
    types: IPokemonType[];
}
export interface ILocation {
    name: string;
    url: string;
}
export interface IPokemonLookup {
    name: string;
    url: string;
}
