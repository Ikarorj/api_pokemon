export interface Pokemon {
    name: string;
    url: string;
    id?: number;
    height?: number;
    weight?: number;
    sprites?: {
        front_default: string;
        other?: {
            'official-artwork'?: { front_default: string };
        };
    };
    types?: { type: { name: string } }[];
    abilities?: { ability: { name: string } }[];
}
