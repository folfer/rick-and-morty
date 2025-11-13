'use client';

import { useState, useEffect, useCallback } from 'react';
import { characterRepository } from '@/data/repositories/CharacterRepository';
import { Character } from '@/domain/entities/Character';

interface UseCharacterAutocompleteProps {
    searchTerm: string;
    minLength?: number;
    debounceMs?: number;
    maxResults?: number;
}

export const useCharacterAutocomplete = ({
    searchTerm,
    minLength = 2,
    debounceMs = 300,
    maxResults = 10,
}: UseCharacterAutocompleteProps) => {
    const [suggestions, setSuggestions] = useState<Character[]>([]);
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
                    name: term,
                    page: 1,
                });

                // Limita o número de resultados e remove duplicatas por nome
                const uniqueNames = new Set<string>();
                const limitedResults = response.characters.results
                    .filter((char) => {
                        if (uniqueNames.has(char.name)) return false;
                        uniqueNames.add(char.name);
                        return true;
                    })
                    .slice(0, maxResults);

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

