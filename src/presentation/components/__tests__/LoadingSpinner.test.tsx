import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
    it('renders with default message', () => {
        render(<LoadingSpinner />);

        expect(screen.getByText('Loading more characters...')).toBeInTheDocument();
    });

    it('renders with custom message', () => {
        render(<LoadingSpinner message="Custom loading message" />);

        expect(screen.getByText('Custom loading message')).toBeInTheDocument();
    });

    it('renders spinner icon', () => {
        const { container } = render(<LoadingSpinner />);

        const spinner = container.querySelector('svg');
        expect(spinner).toBeInTheDocument();
    });
});

