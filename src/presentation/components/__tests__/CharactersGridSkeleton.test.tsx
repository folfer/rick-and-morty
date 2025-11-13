import { describe, it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { CharactersGridSkeleton } from '../CharactersGridSkeleton';

describe('CharactersGridSkeleton', () => {
    it('renders skeleton grid', () => {
        const { container } = render(<CharactersGridSkeleton />);

        const grid = container.querySelector('.grid');
        expect(grid).toBeInTheDocument();
    });

    it('renders correct number of skeleton items', () => {
        const { container } = render(<CharactersGridSkeleton />);

        const skeletons = container.querySelectorAll('.animate-pulse');
        expect(skeletons.length).toBeGreaterThan(0);
    });

    it('applies correct grid classes', () => {
        const { container } = render(<CharactersGridSkeleton />);

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

