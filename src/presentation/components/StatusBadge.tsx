import { Badge } from '@/components/ui/badge';
import { CharacterStatus } from '@/domain/entities/Character';
import { getStatusColor } from '../utils/character.utils';

interface StatusBadgeProps {
    status: CharacterStatus;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-4 py-1',
};

export const StatusBadge = ({ status, className = '', size = 'md' }: StatusBadgeProps) => {
    return (
        <Badge variant="secondary" className={`gap-1 shadow-lg ${sizeClasses[size]} ${className}`}>
            <span className={`h-2 w-2 rounded-full ${getStatusColor(status)} animate-pulse`} />
            {status}
        </Badge>
    );
};

