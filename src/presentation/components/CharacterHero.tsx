import { Character } from '@/domain/entities/Character';
import { CharacterImage } from './CharacterImage';
import { CharacterInfo } from './CharacterInfo';
import { QuickStats } from './QuickStats';

interface CharacterHeroProps {
    character: Character;
}

export const CharacterHero = ({ character }: CharacterHeroProps) => {
    return (
        <div className="relative mb-8 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl hover:shadow-primary/20 transition-all duration-500 animate-fade-in group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />

            <div className="relative z-20 grid lg:grid-cols-5 gap-8 p-8 lg:p-12">
                <div className="lg:col-span-2 flex justify-center lg:justify-start">
                    <CharacterImage character={character} size="lg" />
                </div>

                <div className="lg:col-span-3 flex flex-col justify-center space-y-6">
                    <CharacterInfo character={character} />
                    <QuickStats character={character} />
                </div>
            </div>
        </div>
    );
};

