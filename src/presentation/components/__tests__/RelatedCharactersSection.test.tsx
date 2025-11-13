import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { RelatedCharactersSection } from '../RelatedCharactersSection';
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

describe('RelatedCharactersSection', () => {
    it('renders nothing when not loading and no characters', () => {
        const { container } = render(
            <RelatedCharactersSection characters={[]} species="Human" loading={false} />
        );

        expect(container.firstChild).toBeNull();
    });

    it('renders section title', () => {
        render(
            <RelatedCharactersSection characters={mockCharacters} species="Human" loading={false} />
        );

        expect(screen.getByText('Related Characters')).toBeInTheDocument();
    });

    it('renders species in description', () => {
        render(
            <RelatedCharactersSection characters={mockCharacters} species="Human" loading={false} />
        );

        expect(screen.getByText(/Other Human characters/)).toBeInTheDocument();
    });

    it('renders skeleton when loading', () => {
        const { container } = render(
            <RelatedCharactersSection characters={[]} species="Human" loading={true} />
        );

        const skeletons = container.querySelectorAll('.animate-pulse');
        expect(skeletons.length).toBeGreaterThan(0);
    });

    it('renders characters when not loading', () => {
        render(
            <RelatedCharactersSection characters={mockCharacters} species="Human" loading={false} />
        );

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });

    it('renders characters grid', () => {
        const { container } = render(
            <RelatedCharactersSection characters={mockCharacters} species="Human" loading={false} />
        );

        const grid = container.querySelector('.grid');
        expect(grid).toBeInTheDocument();
    });
});

