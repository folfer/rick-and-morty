import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
    it('renders the message', () => {
        render(<EmptyState message="No results found" />);

        expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('applies correct styling classes', () => {
        const { container } = render(<EmptyState message="Test message" />);

        const element = container.querySelector('div');
        expect(element).toHaveClass('text-center', 'py-16', 'animate-fade-in');
    });
});

