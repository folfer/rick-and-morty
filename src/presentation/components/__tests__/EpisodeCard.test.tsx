import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { EpisodeCard } from '../EpisodeCard';
import { Episode } from '@/domain/entities/Character';

const mockEpisode: Episode = {
    id: '1',
    name: 'Pilot',
    episode: 'S01E01',
    air_date: 'December 2, 2013',
};

describe('EpisodeCard', () => {
    it('renders episode name', () => {
        render(<EpisodeCard episode={mockEpisode} />);

        expect(screen.getByText('Pilot')).toBeInTheDocument();
    });

    it('renders episode code', () => {
        render(<EpisodeCard episode={mockEpisode} />);

        expect(screen.getByText('S01E01')).toBeInTheDocument();
    });

    it('renders air date', () => {
        render(<EpisodeCard episode={mockEpisode} />);

        expect(screen.getByText('December 2, 2013')).toBeInTheDocument();
    });

    it('applies custom animation delay', () => {
        const { container } = render(<EpisodeCard episode={mockEpisode} animationDelay="0.5s" />);

        const card = container.querySelector('.animate-scale-in');
        expect(card).toHaveStyle({ animationDelay: '0.5s' });
    });

    it('uses default animation delay when not provided', () => {
        const { container } = render(<EpisodeCard episode={mockEpisode} />);

        const card = container.querySelector('.animate-scale-in');
        expect(card).toHaveStyle({ animationDelay: '0.4s' });
    });
});

