import { apolloClient } from '@/lib/apollo-client';
import { ICharacterRepository } from '@/domain/repositories/ICharacterRepository';
import { Character, CharacterFilterInput, CharactersResponse } from '@/domain/entities/Character';
import { GET_CHARACTERS, GET_CHARACTER_BY_ID } from '../graphql/queries';

export class CharacterRepository implements ICharacterRepository {
    async getCharacters(filter: CharacterFilterInput): Promise<CharactersResponse> {
        const { data } = await apolloClient.query<CharactersResponse>({
            query: GET_CHARACTERS,
            variables: filter,
        });
        return data;
    }

    async getCharacterById(id: string): Promise<Character> {
        const { data } = await apolloClient.query<{ character: Character }>({
            query: GET_CHARACTER_BY_ID,
            variables: { id },
        });
        return data.character;
    }
}

export const characterRepository = new CharacterRepository();

