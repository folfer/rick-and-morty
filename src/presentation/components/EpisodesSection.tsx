import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tv } from 'lucide-react';
import { Episode } from '@/domain/entities/Character';
import { EpisodeCard } from './EpisodeCard';
import { getEpisodeCountText } from '../utils/character.utils';
import { ANIMATION_DELAYS } from '../constants/animation.constants';

interface EpisodesSectionProps {
    episodes: Episode[];
}

export const EpisodesSection = ({ episodes }: EpisodesSectionProps) => {
    if (episodes.length === 0) return null;

    return (
        <Card
            className="border-2 border-primary/20 hover:border-primary/50 transition-all animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
        >
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/20">
                        <Tv className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl">Episode Appearances</CardTitle>
                        <CardDescription className="text-base mt-1">
                            Featured in {getEpisodeCountText(episodes.length)}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {episodes.map((episode, index) => (
                        <EpisodeCard
                            key={episode.id}
                            episode={episode}
                            animationDelay={`${0.4 + (index % 20) * ANIMATION_DELAYS.EPISODE_STAGGER}s`}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

