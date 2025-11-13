'use client';

import { useState, useEffect } from 'react';
import { characterRepository } from '@/data/repositories/CharacterRepository';
import { Character } from '@/domain/entities/Character';

export const useCharacterDetails = (id: string) => {
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await characterRepository.getCharacterById(id);
                setCharacter(data);
            } catch (err) {
                const errorMessage = 'Failed to load character details. Please try again.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCharacter();
        }
    }, [id]);

    return { character, loading, error };
};

