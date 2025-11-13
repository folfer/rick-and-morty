'use client';

import { Character } from '@/domain/entities/Character';
import { BackButton } from './BackButton';
import { CharacterDetailSkeleton } from './CharacterDetailSkeleton';
import { ErrorAlert } from './ErrorAlert';
import { CharacterHero } from './CharacterHero';
import { LocationCard } from './LocationCard';
import { EpisodesSection } from './EpisodesSection';
import { RelatedCharactersSection } from './RelatedCharactersSection';

interface CharacterDetailProps {
    character: Character | null;
    loading: boolean;
    error: string | null;
    relatedCharacters: Character[];
    loadingRelated: boolean;
}

export const CharacterDetail = ({
    character,
    loading,
    error,
    relatedCharacters,
    loadingRelated,
}: CharacterDetailProps) => {
    if (loading) {
        return <CharacterDetailSkeleton />;
    }

    if (error || !character) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 py-8 px-4">
                <div className="container mx-auto max-w-7xl">
                    <BackButton className="mb-8" />
                    <ErrorAlert
                        title="Error Loading Character"
                        message={error || 'Character not found'}
                        className="max-w-2xl mx-auto border-2"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                <BackButton className="mb-8 animate-fade-in" />

                <CharacterHero character={character} />

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <LocationCard
                        location={character.location}
                        title="Current Location"
                        icon="location"
                        animationDelay="0.1s"
                    />
                    <LocationCard
                        location={character.origin}
                        title="Origin"
                        icon="origin"
                        animationDelay="0.2s"
                    />
                </div>

                <EpisodesSection episodes={character.episode} />

                <RelatedCharactersSection
                    characters={relatedCharacters}
                    species={character.species}
                    loading={loadingRelated}
                />
            </div>
        </div>
    );
};

