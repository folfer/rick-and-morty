import { Character, CharacterFilterInput, CharactersResponse } from '../entities/Character';

export interface ICharacterRepository {
    getCharacters(filter: CharacterFilterInput): Promise<CharactersResponse>;
    getCharacterById(id: string): Promise<Character>;
}

