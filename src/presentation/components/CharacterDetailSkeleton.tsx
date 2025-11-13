import { Skeleton } from '@/components/ui/skeleton';
import { SKELETON_COUNTS } from '../constants/animation.constants';

export const CharacterDetailSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                <Skeleton className="h-10 w-40 mb-8 animate-pulse" />

                {/* Hero Skeleton */}
                <div className="relative mb-8 rounded-2xl overflow-hidden border-2 border-primary/10">
                    <div className="grid lg:grid-cols-5 gap-8 p-8 lg:p-12">
                        <div className="lg:col-span-2 flex justify-center lg:justify-start">
                            <Skeleton className="w-72 h-72 rounded-full" />
                        </div>
                        <div className="lg:col-span-3 flex flex-col justify-center space-y-6">
                            <div className="space-y-4">
                                <Skeleton className="h-14 w-3/4" />
                                <div className="flex gap-3">
                                    <Skeleton className="h-8 w-24" />
                                    <Skeleton className="h-8 w-24" />
                                    <Skeleton className="h-8 w-24" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <Skeleton className="h-24 w-full rounded-lg" />
                                <Skeleton className="h-24 w-full rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards Skeleton */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-48 w-full rounded-lg" />
                </div>

                {/* Episodes Skeleton */}
                <div className="rounded-lg border-2 border-primary/10 p-6">
                    <Skeleton className="h-10 w-64 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {Array.from({ length: SKELETON_COUNTS.EPISODES }).map((_, i) => (
                            <Skeleton key={i} className="h-32 w-full rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

