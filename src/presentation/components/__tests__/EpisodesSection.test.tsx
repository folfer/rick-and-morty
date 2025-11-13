import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { EpisodesSection } from '../EpisodesSection';
import { Episode } from '@/domain/entities/Character';

const mockEpisodes: Episode[] = [
    { id: '1', name: 'Pilot', episode: 'S01E01', air_date: 'December 2, 2013' },
    { id: '2', name: 'Lawnmower Dog', episode: 'S01E02', air_date: 'December 9, 2013' },
];

describe('EpisodesSection', () => {
    it('renders nothing when episodes array is empty', () => {
        const { container } = render(<EpisodesSection episodes={[]} />);

        expect(container.firstChild).toBeNull();
    });

    it('renders section title', () => {
        render(<EpisodesSection episodes={mockEpisodes} />);

        expect(screen.getByText('Episode Appearances')).toBeInTheDocument();
    });

    it('renders episode count text', () => {
        render(<EpisodesSection episodes={mockEpisodes} />);

        expect(screen.getByText(/Featured in/)).toBeInTheDocument();
    });

    it('renders all episodes', () => {
        render(<EpisodesSection episodes={mockEpisodes} />);

        expect(screen.getByText('Pilot')).toBeInTheDocument();
        expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument();
    });

    it('renders episode cards in grid', () => {
        const { container } = render(<EpisodesSection episodes={mockEpisodes} />);

        const grid = container.querySelector('.grid');
        expect(grid).toBeInTheDocument();
    });
});

