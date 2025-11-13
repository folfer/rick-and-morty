import { StatusBadge } from './StatusBadge';
import { Character } from '@/domain/entities/Character';

interface CharacterImageProps {
    character: Character;
    size?: 'sm' | 'md' | 'lg';
    showBadge?: boolean;
    className?: string;
}

const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
};

export const CharacterImage = ({
    character,
    size = 'md',
    showBadge = true,
    className = '',
}: CharacterImageProps) => {
    return (
        <div className={`relative ${className}`}>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur-2xl animate-glow-pulse" />
            <img
                src={character.image}
                alt={character.name}
                className={`relative ${sizeClasses[size]} rounded-full object-cover border-4 border-primary/50 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2`}
            />
            {showBadge && (
                <div className="absolute top-4 right-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <StatusBadge status={character.status} size={size === 'lg' ? 'lg' : 'md'} />
                </div>
            )}
        </div>
    );
};

