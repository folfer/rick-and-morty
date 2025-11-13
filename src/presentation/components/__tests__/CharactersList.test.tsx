import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { CharactersList } from '../CharactersList';
import { Character, CharacterFilterInput } from '@/domain/entities/Character';

const mockCharacters: Character[] = [
    {
        id: '1',
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth (C-137)' },
        location: { name: 'Citadel of Ricks' },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [],
        created: '2017-11-04T18:48:46.250Z',
    },
];

const mockFilters: CharacterFilterInput = {
    name: '',
    status: undefined,
    species: '',
    gender: undefined,
    page: 1,
};

describe('CharactersList', () => {
    const mockLoadMoreRef = { current: null };
    const mockOnFiltersChange = jest.fn();
    const mockOnReset = jest.fn();
    const mockOnScrollToTop = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders header', () => {
        render(
            <CharactersList
                characters={[]}
                loading={false}
                loadingMore={false}
                error={null}
                filters={mockFilters}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
                loadMoreRef={mockLoadMoreRef as any}
                showScrollTop={false}
                onScrollToTop={mockOnScrollToTop}
            />
        );

        expect(screen.getByText(/Rick and Morty/)).toBeInTheDocument();
    });

    it('renders filters', () => {
        render(
            <CharactersList
                characters={[]}
                loading={false}
                loadingMore={false}
                error={null}
                filters={mockFilters}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
                loadMoreRef={mockLoadMoreRef as any}
                showScrollTop={false}
                onScrollToTop={mockOnScrollToTop}
            />
        );

        expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    it('renders loading skeleton when loading', () => {
        const { container } = render(
            <CharactersList
                characters={[]}
                loading={true}
                loadingMore={false}
                error={null}
                filters={mockFilters}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
                loadMoreRef={mockLoadMoreRef as any}
                showScrollTop={false}
                onScrollToTop={mockOnScrollToTop}
            />
        );

        const skeletons = container.querySelectorAll('.animate-pulse');
        expect(skeletons.length).toBeGreaterThan(0);
    });

    it('renders characters when not loading', () => {
        render(
            <CharactersList
                characters={mockCharacters}
                loading={false}
                loadingMore={false}
                error={null}
                filters={mockFilters}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
                loadMoreRef={mockLoadMoreRef as any}
                showScrollTop={false}
                onScrollToTop={mockOnScrollToTop}
            />
        );

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    it('renders error message when error exists', () => {
        render(
            <CharactersList
                characters={[]}
                loading={false}
                loadingMore={false}
                error="Something went wrong"
                filters={mockFilters}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
                loadMoreRef={mockLoadMoreRef as any}
                showScrollTop={false}
                onScrollToTop={mockOnScrollToTop}
            />
        );

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('renders empty state when no characters', () => {
        render(
            <CharactersList
                characters={[]}
                loading={false}
                loadingMore={false}
                error={null}
                filters={mockFilters}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
                loadMoreRef={mockLoadMoreRef as any}
                showScrollTop={false}
                onScrollToTop={mockOnScrollToTop}
            />
        );

        expect(screen.getByText(/No characters found/)).toBeInTheDocument();
    });

    it('renders loading spinner when loadingMore is true', () => {
        render(
            <CharactersList
                characters={mockCharacters}
                loading={false}
                loadingMore={true}
                error={null}
                filters={mockFilters}
                onFiltersChange={mockOnFiltersChange}
                onReset={mockOnReset}
                loadMoreRef={mockLoadMoreRef as any}
                showScrollTop={false}
                onScrollToTop={mockOnScrollToTop}
            />
        );

        expect(screen.getByText('Loading more characters...')).toBeInTheDocument();
    });
});

