import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { Episode } from '@/domain/entities/Character';

interface EpisodeCardProps {
    episode: Episode;
    animationDelay?: string;
}

export const EpisodeCard = ({ episode, animationDelay = '0.4s' }: EpisodeCardProps) => {
    return (
        <Card
            className="border border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 animate-scale-in group"
            style={{ animationDelay }}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm leading-tight group-hover:text-primary transition-colors">
                        {episode.name}
                    </CardTitle>
                </div>
                <Badge variant="secondary" className="w-fit text-xs mt-2">
                    {episode.episode}
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <p className="text-xs">{episode.air_date}</p>
                </div>
            </CardContent>
        </Card>
    );
};

