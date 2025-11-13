import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterFilters } from '../CharacterFilters';
import { CharacterFilterInput } from '@/domain/entities/Character';

describe('CharacterFilters', () => {
    const mockFilters: CharacterFilterInput = {
        name: '',
        status: undefined,
        species: '',
        gender: undefined,
        page: 1,
    };

    const mockOnFiltersChange = jest.fn();
    const mockOnReset = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all filter inputs', () => {
        render(
            <CharacterFilters
                filters={mockFilters}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
            />
        );

        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Status')).toBeInTheDocument();
        expect(screen.getByLabelText('Species')).toBeInTheDocument();
        expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    });

    it('displays filter values', () => {
        const filtersWithValues: CharacterFilterInput = {
            ...mockFilters,
            name: 'Rick',
            species: 'Human',
        };

        render(
            <CharacterFilters
                filters={filtersWithValues}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
            />
        );

        expect(screen.getByDisplayValue('Rick')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Human')).toBeInTheDocument();
    });

    it('calls onFiltersChange when name input changes', () => {
        render(
            <CharacterFilters
                filters={mockFilters}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
            />
        );

        const nameInput = screen.getByLabelText('Name');
        fireEvent.change(nameInput, { target: { value: 'Morty' } });

        expect(mockOnFiltersChange).toHaveBeenCalledWith({
            ...mockFilters,
            name: 'Morty',
            page: 1,
        });
    });

    it('calls onFiltersChange when species input changes', () => {
        render(
            <CharacterFilters
                filters={mockFilters}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
            />
        );

        const speciesInput = screen.getByLabelText('Species');
        fireEvent.change(speciesInput, { target: { value: 'Alien' } });

        expect(mockOnFiltersChange).toHaveBeenCalledWith({
            ...mockFilters,
            species: 'Alien',
            page: 1,
        });
    });

    it('shows clear button when filters are active', () => {
        const filtersWithValues: CharacterFilterInput = {
            ...mockFilters,
            name: 'Rick',
        };

        render(
            <CharacterFilters
                filters={filtersWithValues}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
            />
        );

        expect(screen.getByText('Clear')).toBeInTheDocument();
    });

    it('hides clear button when no filters are active', () => {
        render(
            <CharacterFilters
                filters={mockFilters}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
            />
        );

        expect(screen.queryByText('Clear')).not.toBeInTheDocument();
    });

    it('calls onReset when clear button is clicked', () => {
        const filtersWithValues: CharacterFilterInput = {
            ...mockFilters,
            name: 'Rick',
        };

        render(
            <CharacterFilters
                filters={filtersWithValues}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
            />
        );

        const clearButton = screen.getByText('Clear');
        fireEvent.click(clearButton);

        expect(mockOnReset).toHaveBeenCalled();
    });
});

