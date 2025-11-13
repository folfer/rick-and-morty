import { Character } from '@/domain/entities/Character';
import { Badge } from '@/components/ui/badge';
import { Dna, User } from 'lucide-react';

interface CharacterInfoProps {
    character: Character;
}

export const CharacterInfo = ({ character }: CharacterInfoProps) => {
    return (
        <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-glow-pulse p-2 rounded-lg">
                {character.name}
            </h1>

            <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="text-base px-4 py-1.5 hover:scale-110 transition-transform">
                    <Dna className="w-4 h-4 mr-2" />
                    {character.species}
                </Badge>
                {character.type && (
                    <Badge variant="outline" className="text-base px-4 py-1.5 hover:scale-110 transition-transform">
                        {character.type}
                    </Badge>
                )}
                <Badge variant="outline" className="text-base px-4 py-1.5 hover:scale-110 transition-transform">
                    <User className="w-4 h-4 mr-2" />
                    {character.gender}
                </Badge>
            </div>
        </div>
    );
};

