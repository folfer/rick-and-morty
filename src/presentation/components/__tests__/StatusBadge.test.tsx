import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../StatusBadge';

describe('StatusBadge', () => {
    it('renders Alive status', () => {
        render(<StatusBadge status="Alive" />);

        expect(screen.getByText('Alive')).toBeInTheDocument();
    });

    it('renders Dead status', () => {
        render(<StatusBadge status="Dead" />);

        expect(screen.getByText('Dead')).toBeInTheDocument();
    });

    it('renders unknown status', () => {
        render(<StatusBadge status="unknown" />);

        expect(screen.getByText('unknown')).toBeInTheDocument();
    });

    it('applies size classes correctly', () => {
        const { container, rerender } = render(<StatusBadge status="Alive" size="sm" />);

        let badge = container.querySelector('div');
        expect(badge).toHaveClass('text-xs');

        rerender(<StatusBadge status="Alive" size="md" />);
        badge = container.querySelector('div');
        expect(badge).toHaveClass('text-sm');

        rerender(<StatusBadge status="Alive" size="lg" />);
        badge = container.querySelector('div');
        expect(badge).toHaveClass('text-base');
    });

    it('applies custom className', () => {
        const { container } = render(<StatusBadge status="Alive" className="custom-class" />);

        const badge = container.querySelector('div');
        expect(badge).toHaveClass('custom-class');
    });
});

