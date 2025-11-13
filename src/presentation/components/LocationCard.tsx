import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Location } from '@/domain/entities/Character';
import { MapPin, Globe } from 'lucide-react';

interface LocationCardProps {
    location: Location;
    title: string;
    icon: 'location' | 'origin';
    animationDelay?: string;
}

export const LocationCard = ({ location, title, icon, animationDelay = '0.1s' }: LocationCardProps) => {
    const IconComponent = icon === 'location' ? MapPin : Globe;

    return (
        <Card
            className="border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 animate-fade-in-up group"
            style={{ animationDelay }}
        >
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-xl font-semibold text-foreground">{location.name}</p>
                {location.type && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Badge variant="outline" className="text-sm">
                            Type
                        </Badge>
                        <span>{location.type}</span>
                    </div>
                )}
                {location.dimension && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Badge variant="outline" className="text-sm">
                            Dimension
                        </Badge>
                        <span className="text-sm">{location.dimension}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

