'use client';

import { useParams } from 'next/navigation';
import { useCharacterDetails } from '@/presentation/hooks/useCharacterDetails';
import { useRelatedCharacters } from '@/presentation/hooks/useRelatedCharacters';
import { CharacterDetail } from '../components/CharacterDetail';

export const CharacterDetailContainer = () => {
    const params = useParams();
    const id = params.id as string;
    const { character, loading, error } = useCharacterDetails(id);
    const { characters: relatedCharacters, loading: loadingRelated } = useRelatedCharacters(
        character?.species || '',
        id || ''
    );

    return (
        <CharacterDetail
            character={character}
            loading={loading}
            error={error}
            relatedCharacters={relatedCharacters}
            loadingRelated={loadingRelated}
        />
    );
};

