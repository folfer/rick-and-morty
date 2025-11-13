'use client';

import { useState, useEffect } from 'react';
import { characterRepository } from '@/data/repositories/CharacterRepository';
import { Character, CharacterFilterInput } from '@/domain/entities/Character';

export const useCharacters = (infiniteScroll = false) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pageInfo, setPageInfo] = useState({ count: 0, pages: 0, next: null as number | null });
    const [filters, setFilters] = useState<CharacterFilterInput>({ page: 1 });
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            const shouldShowFullLoading = isInitialLoad || !infiniteScroll || filters.page === 1;

            if (shouldShowFullLoading) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            setError(null);

            try {
                const response = await characterRepository.getCharacters(filters);

                setCharacters(prev => {
                    if (filters.page === 1 || !infiniteScroll) {
                        return response.characters.results;
                    }
                    return [...prev, ...response.characters.results];
                });

                setPageInfo(response.characters.info);
                setIsInitialLoad(false);
            } catch (err) {
                const errorMessage = 'Failed to load characters. Please try again.';
                setError(errorMessage);
            } finally {
                setLoading(false);
                setLoadingMore(false);
            }
        };

        fetchCharacters();
    }, [filters.page, filters.name, filters.status, filters.species, filters.gender, infiniteScroll]);

    const loadMore = () => {
        if (pageInfo.next && !loading && !loadingMore) {
            setFilters(prev => ({ ...prev, page: pageInfo.next! }));
        }
    };

    const updateFilters = (newFilters: CharacterFilterInput) => {
        const isPageChange = Object.keys(newFilters).length === Object.keys(filters).length &&
            Object.keys(newFilters).every(key => key === 'page' || newFilters[key as keyof CharacterFilterInput] === filters[key as keyof CharacterFilterInput]);

        if (!isPageChange) {
            setCharacters([]);
            setIsInitialLoad(true);
        }

        setFilters(newFilters);
    };

    const resetFilters = () => {
        setCharacters([]);
        setIsInitialLoad(true);
        setFilters({ page: 1 });
    };

    return {
        characters,
        loading,
        loadingMore,
        error,
        pageInfo,
        filters,
        updateFilters,
        resetFilters,
        loadMore,
        hasMore: pageInfo.next !== null,
    };
};

