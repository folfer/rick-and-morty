// Mock do Apollo Client antes de qualquer importação
jest.mock('@/lib/apollo-client', () => ({
    apolloClient: {
        query: jest.fn(),
    },
}));

import { describe, it, expect, beforeEach } from '@jest/globals';
import { CharacterRepository } from '../CharacterRepository';
import { apolloClient } from '@/lib/apollo-client';

describe('CharacterRepository', () => {
    let repository: CharacterRepository;

    beforeEach(() => {
        repository = new CharacterRepository();
        jest.clearAllMocks();
    });

    describe('getCharacters', () => {
        it('should fetch characters with filters', async () => {
            const mockResponse = {
                data: {
                    characters: {
                        info: {
                            count: 826,
                            pages: 42,
                            next: 2,
                            prev: null,
                        },
                        results: [
                            {
                                id: '1',
                                name: 'Rick Sanchez',
                                status: 'Alive',
                                species: 'Human',
                                type: '',
                                gender: 'Male',
                                origin: { name: 'Earth (C-137)' },
                                location: { name: 'Citadel of Ricks' },
                                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                                episode: [{ id: '1' }],
                                created: '2017-11-04T18:48:46.250Z',
                            },
                        ],
                    },
                },
            };

            (apolloClient.query as jest.Mock).mockResolvedValue(mockResponse);

            const result = await repository.getCharacters({ page: 1, name: 'Rick' });

            expect(apolloClient.query).toHaveBeenCalledWith({
                query: expect.any(Object),
                variables: { page: 1, name: 'Rick' },
            });
            expect(result).toEqual(mockResponse.data);
            expect(result.characters.results).toHaveLength(1);
            expect(result.characters.results[0].name).toBe('Rick Sanchez');
        });

        it('should handle errors when fetching characters', async () => {
            const mockError = new Error('Network error');
            (apolloClient.query as jest.Mock).mockRejectedValue(mockError);

            await expect(repository.getCharacters({ page: 1 })).rejects.toThrow('Network error');
        });
    });

    describe('getCharacterById', () => {
        it('should fetch a single character by id', async () => {
            const mockResponse = {
                data: {
                    character: {
                        id: '1',
                        name: 'Rick Sanchez',
                        status: 'Alive',
                        species: 'Human',
                        type: '',
                        gender: 'Male',
                        origin: {
                            id: '1',
                            name: 'Earth (C-137)',
                            type: 'Planet',
                            dimension: 'Dimension C-137',
                        },
                        location: {
                            id: '3',
                            name: 'Citadel of Ricks',
                            type: 'Space station',
                            dimension: 'unknown',
                        },
                        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                        episode: [
                            {
                                id: '1',
                                name: 'Pilot',
                                episode: 'S01E01',
                                air_date: 'December 2, 2013',
                            },
                        ],
                        created: '2017-11-04T18:48:46.250Z',
                    },
                },
            };

            (apolloClient.query as jest.Mock).mockResolvedValue(mockResponse);

            const result = await repository.getCharacterById('1');

            expect(apolloClient.query).toHaveBeenCalledWith({
                query: expect.any(Object),
                variables: { id: '1' },
            });
            expect(result).toEqual(mockResponse.data.character);
            expect(result.name).toBe('Rick Sanchez');
        });

        it('should handle errors when fetching character by id', async () => {
            const mockError = new Error('Character not found');
            (apolloClient.query as jest.Mock).mockRejectedValue(mockError);

            await expect(repository.getCharacterById('999')).rejects.toThrow('Character not found');
        });
    });
});

