import { CharacterStatus } from '@/domain/entities/Character';

export const getStatusColor = (status: CharacterStatus): string => {
    const statusColorMap: Record<CharacterStatus, string> = {
        Alive: 'bg-green-500',
        Dead: 'bg-destructive',
        unknown: 'bg-muted',
    };

    return statusColorMap[status] || statusColorMap.unknown;
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
};

export const getEpisodeCountText = (count: number): string => {
    return `${count} episode${count !== 1 ? 's' : ''}`;
};

