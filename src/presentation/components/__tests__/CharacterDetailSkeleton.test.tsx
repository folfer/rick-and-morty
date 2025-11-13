import { describe, it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { CharacterDetailSkeleton } from '../CharacterDetailSkeleton';

describe('CharacterDetailSkeleton', () => {
    it('renders skeleton structure', () => {
        const { container } = render(<CharacterDetailSkeleton />);

        const skeletons = container.querySelectorAll('.animate-pulse');
        expect(skeletons.length).toBeGreaterThan(0);
    });

    it('renders hero skeleton section', () => {
        const { container } = render(<CharacterDetailSkeleton />);

        const heroSection = container.querySelector('.rounded-2xl');
        expect(heroSection).toBeInTheDocument();
    });

    it('renders cards skeleton section', () => {
        const { container } = render(<CharacterDetailSkeleton />);

        const cardsSection = container.querySelector('.grid.md\\:grid-cols-2');
        expect(cardsSection).toBeInTheDocument();
    });

    it('renders episodes skeleton section', () => {
        const { container } = render(<CharacterDetailSkeleton />);

        const episodesSection = container.querySelector('.rounded-lg.border-2');
        expect(episodesSection).toBeInTheDocument();
    });
});

