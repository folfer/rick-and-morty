import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { CharacterInfo } from '../CharacterInfo';
import { Character } from '@/domain/entities/Character';

const mockCharacter: Character = {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: 'Genius',
    gender: 'Male',
    origin: { name: 'Earth (C-137)' },
    location: { name: 'Citadel of Ricks' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    created: '2017-11-04T18:48:46.250Z',
};

describe('CharacterInfo', () => {
    it('renders character name', () => {
        render(<CharacterInfo character={mockCharacter} />);

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    it('renders species badge', () => {
        render(<CharacterInfo character={mockCharacter} />);

        expect(screen.getByText('Human')).toBeInTheDocument();
    });

    it('renders type badge when present', () => {
        render(<CharacterInfo character={mockCharacter} />);

        expect(screen.getByText('Genius')).toBeInTheDocument();
    });

    it('renders gender badge', () => {
        render(<CharacterInfo character={mockCharacter} />);

        expect(screen.getByText('Male')).toBeInTheDocument();
    });

    it('does not render type badge when type is empty', () => {
        const characterWithoutType = { ...mockCharacter, type: '' };
        const { container } = render(<CharacterInfo character={characterWithoutType} />);

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(screen.getByText('Human')).toBeInTheDocument();
        // Verifica que não há badge com texto vazio (type badge não deve aparecer)
        const badges = container.querySelectorAll('[class*="Badge"]');
        const typeBadges = Array.from(badges).filter(badge => badge.textContent === '');
        expect(typeBadges.length).toBe(0);
    });
});

