import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { CharacterHero } from '../CharacterHero';
import { Character } from '@/domain/entities/Character';

const mockCharacter: Character = {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)' },
    location: { name: 'Citadel of Ricks' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    created: '2017-11-04T18:48:46.250Z',
};

describe('CharacterHero', () => {
    it('renders character name', () => {
        render(<CharacterHero character={mockCharacter} />);

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    it('renders character image', () => {
        render(<CharacterHero character={mockCharacter} />);

        const img = screen.getByAltText('Rick Sanchez');
        expect(img).toBeInTheDocument();
    });

    it('renders character info', () => {
        render(<CharacterHero character={mockCharacter} />);

        expect(screen.getByText('Human')).toBeInTheDocument();
    });
});

