'use client';

import { useState, useEffect, useCallback } from 'react';
import { characterRepository } from '@/data/repositories/CharacterRepository';

interface UseSpeciesAutocompleteProps {
    searchTerm: string;
    minLength?: number;
    debounceMs?: number;
    maxResults?: number;
}

export const useSpeciesAutocomplete = ({
    searchTerm,
    minLength = 2,
    debounceMs = 300,
    maxResults = 10,
}: UseSpeciesAutocompleteProps) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSuggestions = useCallback(
        async (term: string) => {
            if (term.length < minLength) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await characterRepository.getCharacters({
                    species: term,
                    page: 1,
                });

                const uniqueSpecies = new Set<string>();
                response.characters.results.forEach((char) => {
                    if (char.species && !uniqueSpecies.has(char.species)) {
                        uniqueSpecies.add(char.species);
                    }
                });

                const limitedResults = Array.from(uniqueSpecies).slice(0, maxResults);
                setSuggestions(limitedResults);
            } catch (err) {
                setError('Failed to load suggestions');
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        },
        [minLength, maxResults]
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSuggestions(searchTerm);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [searchTerm, debounceMs, fetchSuggestions]);

    return { suggestions, loading, error };
};

