import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { EndOfListMessage } from '../EndOfListMessage';

describe('EndOfListMessage', () => {
    it('renders the end message', () => {
        render(<EndOfListMessage totalCount={100} />);

        expect(screen.getByText(/You've reached the end of the multiverse!/)).toBeInTheDocument();
    });

    it('displays the total count', () => {
        render(<EndOfListMessage totalCount={42} />);

        expect(screen.getByText('42 characters loaded')).toBeInTheDocument();
    });

    it('updates count correctly', () => {
        const { rerender } = render(<EndOfListMessage totalCount={10} />);

        expect(screen.getByText('10 characters loaded')).toBeInTheDocument();

        rerender(<EndOfListMessage totalCount={50} />);
        expect(screen.getByText('50 characters loaded')).toBeInTheDocument();
    });
});

