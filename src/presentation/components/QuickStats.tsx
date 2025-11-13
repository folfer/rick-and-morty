import { Character } from '@/domain/entities/Character';
import { Tv, Calendar } from 'lucide-react';
import { formatDate } from '../utils/character.utils';

interface QuickStatsProps {
    character: Character;
}

export const QuickStats = ({ character }: QuickStatsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/20 hover:border-primary/50 hover:scale-105 transition-all">
                <div className="p-2 rounded-full bg-primary/20 shrink-0">
                    <Tv className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm text-muted-foreground">Episodes</p>
                    <p className="text-2xl font-bold truncate">{character.episode.length}</p>
                </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/20 hover:border-primary/50 hover:scale-105 transition-all">
                <div className="p-2 rounded-full bg-primary/20 shrink-0">
                    <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="text-base md:text-lg font-bold break-all">{formatDate(character.created)}</p>
                </div>
            </div>
        </div>
    );
};

