'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollProps {
    onLoadMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
    threshold?: number;
}

export const useInfiniteScroll = ({
    onLoadMore,
    hasMore,
    isLoading,
    threshold = 200,
}: UseInfiniteScrollProps) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const isLoadingRef = useRef(false);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [target] = entries;

            if (target.isIntersecting && hasMore && !isLoading && !isLoadingRef.current) {
                isLoadingRef.current = true;
                onLoadMore();

                setTimeout(() => {
                    isLoadingRef.current = false;
                }, 1000);
            }
        },
        [onLoadMore, hasMore, isLoading]
    );

    useEffect(() => {
        const element = loadMoreRef.current;
        if (!element) return;

        const option = {
            root: null,
            rootMargin: `${threshold}px`,
            threshold: 0,
        };

        observerRef.current = new IntersectionObserver(handleObserver, option);
        observerRef.current.observe(element);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleObserver, threshold]);

    return loadMoreRef;
};

