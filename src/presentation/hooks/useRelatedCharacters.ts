'use client';

import { useState, useEffect } from 'react';
import { Character } from '@/domain/entities/Character';
import { characterRepository } from '@/data/repositories/CharacterRepository';

export const useRelatedCharacters = (species: string, currentCharacterId: string) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRelatedCharacters = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await characterRepository.getCharacters({
                    species,
                    page: 1,
                });

                const filtered = data.characters.results
                    .filter(char => char.id !== currentCharacterId)
                    .slice(0, 8);

                setCharacters(filtered);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch related characters');
                setCharacters([]);
            } finally {
                setLoading(false);
            }
        };

        if (species && currentCharacterId) {
            fetchRelatedCharacters();
        }
    }, [species, currentCharacterId]);

    return { characters, loading, error };
};

