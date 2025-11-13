'use client';

import { CharacterFilterInput, Character } from '@/domain/entities/Character';
import { Header } from './Header';
import { CharacterFilters } from './CharacterFilters';
import { CharactersGrid } from './CharactersGrid';
import { CharactersGridSkeleton } from './CharactersGridSkeleton';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorAlert } from './ErrorAlert';
import { EmptyState } from './EmptyState';
import { EndOfListMessage } from './EndOfListMessage';
import { ScrollToTopButton } from './ScrollToTopButton';
import { ANIMATION_DELAYS } from '../constants/animation.constants';

interface CharactersListProps {
    characters: Character[];
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    filters: CharacterFilterInput;
    onFiltersChange: (filters: CharacterFilterInput) => void;
    onReset: () => void;
    loadMoreRef: React.RefObject<HTMLDivElement | null>;
    showScrollTop: boolean;
    onScrollToTop: () => void;
}

export const CharactersList = ({
    characters,
    loading,
    loadingMore,
    error,
    filters,
    onFiltersChange,
    onReset,
    loadMoreRef,
    showScrollTop,
    onScrollToTop,
}: CharactersListProps) => {
    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto">
                <Header />

                <div className="px-4 md:px-8 space-y-8">
                    <div className="animate-fade-in-up" style={{ animationDelay: ANIMATION_DELAYS.FILTERS }}>
                        <CharacterFilters filters={filters} onFiltersChange={onFiltersChange} onReset={onReset} />
                    </div>

                    {error && <ErrorAlert title="Error" message={error} />}

                    {loading && <CharactersGridSkeleton />}

                    {!loading && characters.length > 0 && (
                        <div className="space-y-8">
                            <CharactersGrid characters={characters} />

                            {loadingMore && <LoadingSpinner />}

                            <div ref={loadMoreRef} className="h-4" />

                            {!loadingMore && characters.length > 0 && (
                                <EndOfListMessage totalCount={characters.length} />
                            )}
                        </div>
                    )}

                    {!loading && characters.length === 0 && !error && (
                        <EmptyState message="No characters found. Try adjusting your filters." />
                    )}
                </div>

                <ScrollToTopButton show={showScrollTop} onClick={onScrollToTop} />
            </div>
        </div>
    );
};

