import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';
import { Character } from '@/domain/entities/Character';
import { CharacterCard } from './CharacterCard';
import { SKELETON_COUNTS, ANIMATION_DELAYS } from '../constants/animation.constants';

interface RelatedCharactersSectionProps {
    characters: Character[];
    species: string;
    loading: boolean;
}

export const RelatedCharactersSection = ({
    characters,
    species,
    loading,
}: RelatedCharactersSectionProps) => {
    if (!loading && characters.length === 0) return null;

    return (
        <Card
            className="border-2 border-primary/20 hover:border-primary/50 transition-all animate-fade-in-up mt-8"
            style={{ animationDelay: '0.4s' }}
        >
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/20">
                        <Sparkles className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl">Related Characters</CardTitle>
                        <CardDescription className="text-base mt-1">
                            Other {species} characters you might like
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: SKELETON_COUNTS.RELATED_CHARACTERS }).map((_, i) => (
                            <Skeleton key={i} className="h-80 w-full rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {characters.map((character, index) => (
                            <div
                                key={character.id}
                                className="animate-scale-in"
                                style={{
                                    animationDelay: `${0.5 + index * ANIMATION_DELAYS.RELATED_CHARACTER_STAGGER}s`,
                                }}
                            >
                                <CharacterCard character={character} />
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

