import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { ErrorAlert } from '../ErrorAlert';

describe('ErrorAlert', () => {
    it('renders title and message', () => {
        render(<ErrorAlert title="Error Title" message="Error message" />);

        expect(screen.getByText('Error Title')).toBeInTheDocument();
        expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(
            <ErrorAlert title="Error" message="Message" className="custom-class" />
        );

        const alert = container.querySelector('[role="alert"]');
        expect(alert).toHaveClass('custom-class');
    });

    it('renders without className prop', () => {
        const { container } = render(
            <ErrorAlert title="Error" message="Message" />
        );

        const alert = container.querySelector('[role="alert"]');
        expect(alert).toBeInTheDocument();
    });
});

