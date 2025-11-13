import { Skeleton } from '@/components/ui/skeleton';
import { SKELETON_COUNTS, ANIMATION_DELAYS } from '../constants/animation.constants';

export const CharactersGridSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: SKELETON_COUNTS.CHARACTERS_GRID }).map((_, i) => (
                <div
                    key={i}
                    className="space-y-4 animate-fade-in"
                    style={{ animationDelay: `${i * ANIMATION_DELAYS.CARD_STAGGER}s` }}
                >
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
        </div>
    );
};

