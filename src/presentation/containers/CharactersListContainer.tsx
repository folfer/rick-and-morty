'use client';

import { useCharacters } from '@/presentation/hooks/useCharacters';
import { useInfiniteScroll } from '@/presentation/hooks/useInfiniteScroll';
import { useScrollToTop } from '@/presentation/hooks/useScrollToTop';
import { CharactersList } from '../components/CharactersList';

export const CharactersListContainer = () => {
    const {
        characters,
        loading,
        loadingMore,
        error,
        filters,
        updateFilters,
        resetFilters,
        loadMore,
        hasMore,
    } = useCharacters(true);

    const loadMoreRef = useInfiniteScroll({
        onLoadMore: loadMore,
        hasMore,
        isLoading: loadingMore,
        threshold: 300,
    });

    const { showButton, scrollToTop } = useScrollToTop();

    return (
        <CharactersList
            characters={characters}
            loading={loading}
            loadingMore={loadingMore}
            error={error}
            filters={filters}
            onFiltersChange={updateFilters}
            onReset={resetFilters}
            loadMoreRef={loadMoreRef}
            showScrollTop={showButton}
            onScrollToTop={scrollToTop}
        />
    );
};

