import { describe, it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { CharacterCard } from '../CharacterCard';
import { Character } from '@/domain/entities/Character';
import '@testing-library/jest-dom';

const mockCharacter: Character = {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
        name: 'Earth (C-137)',
    },
    location: {
        name: 'Citadel of Ricks',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [{ id: '1', name: 'Pilot', episode: 'S01E01', air_date: 'December 2, 2013' }],
    created: '2017-11-04T18:48:46.250Z',
};

describe('CharacterCard', () => {
    it('renders character information correctly', () => {
        const { getByText } = render(
            <CharacterCard character={mockCharacter} />
        );

        expect(getByText('Rick Sanchez')).toBeTruthy();
        expect(getByText('Alive')).toBeTruthy();
        expect(getByText('Human')).toBeTruthy();
    });

    it('displays episode count', () => {
        const { getByText } = render(
            <CharacterCard character={mockCharacter} />
        );

        expect(getByText('1 episodes')).toBeTruthy();
    });
});

