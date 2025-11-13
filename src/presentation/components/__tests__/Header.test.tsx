import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
    it('renders title', () => {
        render(<Header />);

        expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
    });

    it('renders subtitle', () => {
        render(<Header />);

        expect(screen.getByText('Character Explorer')).toBeInTheDocument();
    });

    it('renders explore text', () => {
        render(<Header />);

        expect(screen.getByText('Explore the Multiverse')).toBeInTheDocument();
    });

    it('renders banner image', () => {
        const { container } = render(<Header />);

        const image = container.querySelector('img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('alt', 'Rick and Morty Portal');
    });
});

