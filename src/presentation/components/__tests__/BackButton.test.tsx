import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { BackButton } from '../BackButton';
import * as navigation from 'next/navigation';

// Acessa o mock global
const getMockRouter = () => {
    const router = (navigation.useRouter as jest.Mock)();
    return router;
};

describe('BackButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with default props', () => {
        render(<BackButton />);

        expect(screen.getByText('Back to Characters')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
        render(<BackButton label="Go Back" />);

        expect(screen.getByText('Go Back')).toBeInTheDocument();
    });

    it('navigates to default href when clicked', () => {
        render(<BackButton />);

        const button = screen.getByText('Back to Characters');
        fireEvent.click(button);

        const router = getMockRouter();
        expect(router.push).toHaveBeenCalledWith('/');
    });

    it('navigates to custom href when clicked', () => {
        render(<BackButton href="/characters" />);

        const button = screen.getByText('Back to Characters');
        fireEvent.click(button);

        const router = getMockRouter();
        expect(router.push).toHaveBeenCalledWith('/characters');
    });

    it('applies custom className', () => {
        const { container } = render(<BackButton className="custom-class" />);

        const button = container.querySelector('button');
        expect(button).toHaveClass('custom-class');
    });
});

