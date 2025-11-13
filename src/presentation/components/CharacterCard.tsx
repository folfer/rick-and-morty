'use client';

import { Character } from '@/domain/entities/Character';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import Link from 'next/link';
import Image from 'next/image';

interface CharacterCardProps {
    character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
    return (
        <Link href={`/character/${character.id}`}>
            <Card className="group card-hover cursor-pointer overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 animate-scale-in">
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src={character.image}
                        alt={character.name}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-2 right-2 transition-transform group-hover:scale-110">
                        <StatusBadge status={character.status} />
                    </div>
                </div>
                <CardContent className="p-4 relative">
                    <h3 className="text-lg font-bold text-primary mb-2 line-clamp-1 group-hover:text-portal-glow transition-colors">
                        {character.name}
                    </h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                            <span className="text-foreground font-medium">{character.species}</span>
                            {character.type && ` - ${character.type}`}
                        </p>
                        <p className="line-clamp-1">
                            <span className="text-xs">Last seen:</span> {character.location.name}
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                            {character.episode.length} episodes
                        </p>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </CardContent>
            </Card>
        </Link>
    );
};

