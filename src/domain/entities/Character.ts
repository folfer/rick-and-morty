export interface Character {
    id: string;
    name: string;
    status: CharacterStatus;
    species: string;
    type: string;
    gender: CharacterGender;
    origin: Location;
    location: Location;
    image: string;
    episode: Episode[];
    created: string;
}

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface Location {
    id?: string;
    name: string;
    type?: string;
    dimension?: string;
}

export interface Episode {
    id: string;
    name: string;
    episode: string;
    air_date: string;
}

export interface CharacterFilterInput {
    name?: string;
    status?: CharacterStatus;
    species?: string;
    gender?: CharacterGender;
    page?: number;
}

export interface CharactersResponse {
    characters: {
        info: {
            count: number;
            pages: number;
            next: number | null;
            prev: number | null;
        };
        results: Character[];
    };
}

