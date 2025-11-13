import { Character } from '@/domain/entities/Character';
import { CharacterCard } from './CharacterCard';
import { ANIMATION_DELAYS } from '../constants/animation.constants';

interface CharactersGridProps {
    characters: Character[];
}

export const CharactersGrid = ({ characters }: CharactersGridProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character, index) => (
                <div
                    key={character.id}
                    style={{ animationDelay: `${(index % 20) * ANIMATION_DELAYS.CARD_STAGGER}s` }}
                >
                    <CharacterCard character={character} />
                </div>
            ))}
        </div>
    );
};

