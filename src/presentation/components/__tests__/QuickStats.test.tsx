import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { QuickStats } from '../QuickStats';
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
    episode: [
        { id: '1', name: 'Pilot', episode: 'S01E01', air_date: 'December 2, 2013' },
        { id: '2', name: 'Lawnmower Dog', episode: 'S01E02', air_date: 'December 9, 2013' },
    ],
    created: '2017-11-04T18:48:46.250Z',
};

describe('QuickStats', () => {
    it('displays episode count', () => {
        render(<QuickStats character={mockCharacter} />);

        expect(screen.getByText('Episodes')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('displays created date', () => {
        render(<QuickStats character={mockCharacter} />);

        expect(screen.getByText('Created')).toBeInTheDocument();
    });

    it('updates episode count correctly', () => {
        const characterWithMoreEpisodes = {
            ...mockCharacter,
            episode: Array.from({ length: 10 }, (_, i) => ({
                id: String(i + 1),
                name: `Episode ${i + 1}`,
                episode: `S01E${String(i + 1).padStart(2, '0')}`,
                air_date: '2013-12-02',
            })),
        };

        render(<QuickStats character={characterWithMoreEpisodes} />);

        expect(screen.getByText('10')).toBeInTheDocument();
    });
});

