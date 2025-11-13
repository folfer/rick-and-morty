'use client';

import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopButtonProps {
    show: boolean;
    onClick: () => void;
}

export const ScrollToTopButton = ({ show, onClick }: ScrollToTopButtonProps) => {
    if (!show) return null;

    return (
        <Button
            onClick={onClick}
            size="icon"
            className="fixed bottom-8 right-8 rounded-full portal-glow shadow-2xl animate-fade-in hover:scale-110 transition-transform z-50"
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-5 w-5" />
        </Button>
    );
};

