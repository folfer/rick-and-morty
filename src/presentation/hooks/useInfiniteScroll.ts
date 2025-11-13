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
            }
        },
        [onLoadMore, hasMore, isLoading]
    );

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                isLoadingRef.current = false;
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    useEffect(() => {
        const element = loadMoreRef.current;
        if (!element) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

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

