import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScrollToTopButton } from '../ScrollToTopButton';

describe('ScrollToTopButton', () => {
    it('does not render when show is false', () => {
        const { container } = render(<ScrollToTopButton show={false} onClick={jest.fn()} />);

        expect(container.firstChild).toBeNull();
    });

    it('renders when show is true', () => {
        render(<ScrollToTopButton show={true} onClick={jest.fn()} />);

        const button = screen.getByLabelText('Scroll to top');
        expect(button).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const mockOnClick = jest.fn();
        render(<ScrollToTopButton show={true} onClick={mockOnClick} />);

        const button = screen.getByLabelText('Scroll to top');
        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('has correct aria-label', () => {
        render(<ScrollToTopButton show={true} onClick={jest.fn()} />);

        const button = screen.getByLabelText('Scroll to top');
        expect(button).toHaveAttribute('aria-label', 'Scroll to top');
    });
});

