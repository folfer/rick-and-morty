import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { CharactersGrid } from '../CharactersGrid';
import { Character } from '@/domain/entities/Character';

const mockCharacters: Character[] = [
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
        episode: [],
        created: '2017-11-04T18:48:46.250Z',
    },
    {
        id: '2',
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth (C-137)' },
        location: { name: 'Citadel of Ricks' },
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        episode: [],
        created: '2017-11-04T18:48:46.250Z',
    },
];

describe('CharactersGrid', () => {
    it('renders all characters', () => {
        render(<CharactersGrid characters={mockCharacters} />);

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });

    it('renders empty grid when no characters', () => {
        const { container } = render(<CharactersGrid characters={[]} />);

        const grid = container.querySelector('.grid');
        expect(grid).toBeInTheDocument();
        expect(grid?.children.length).toBe(0);
    });

    it('applies correct grid classes', () => {
        const { container } = render(<CharactersGrid characters={mockCharacters} />);

        const grid = container.querySelector('.grid');
        expect(grid).toHaveClass(
            'grid',
            'grid-cols-1',
            'sm:grid-cols-2',
            'lg:grid-cols-3',
            'xl:grid-cols-4'
        );
    });
});

