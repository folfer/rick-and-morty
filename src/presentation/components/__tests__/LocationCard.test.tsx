import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { LocationCard } from '../LocationCard';
import { Location } from '@/domain/entities/Character';

const mockLocation: Location = {
    id: '1',
    name: 'Earth (C-137)',
    type: 'Planet',
    dimension: 'Dimension C-137',
};

describe('LocationCard', () => {
    it('renders location name', () => {
        render(<LocationCard location={mockLocation} title="Current Location" icon="location" />);

        expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
    });

    it('renders title', () => {
        render(<LocationCard location={mockLocation} title="Current Location" icon="location" />);

        expect(screen.getByText('Current Location')).toBeInTheDocument();
    });

    it('renders location type when present', () => {
        render(<LocationCard location={mockLocation} title="Current Location" icon="location" />);

        expect(screen.getByText('Planet')).toBeInTheDocument();
    });

    it('renders dimension when present', () => {
        render(<LocationCard location={mockLocation} title="Current Location" icon="location" />);

        expect(screen.getByText('Dimension C-137')).toBeInTheDocument();
    });

    it('does not render type badge when type is missing', () => {
        const locationWithoutType = { ...mockLocation, type: undefined };
        render(<LocationCard location={locationWithoutType} title="Location" icon="location" />);

        expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
        expect(screen.queryByText('Type')).not.toBeInTheDocument();
    });

    it('applies custom animation delay', () => {
        const { container } = render(
            <LocationCard
                location={mockLocation}
                title="Location"
                icon="location"
                animationDelay="0.2s"
            />
        );

        const card = container.querySelector('.animate-fade-in-up');
        expect(card).toHaveStyle({ animationDelay: '0.2s' });
    });

    it('uses default animation delay when not provided', () => {
        const { container } = render(
            <LocationCard location={mockLocation} title="Location" icon="location" />
        );

        const card = container.querySelector('.animate-fade-in-up');
        expect(card).toHaveStyle({ animationDelay: '0.1s' });
    });
});

