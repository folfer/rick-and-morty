'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
    href?: string;
    label?: string;
    className?: string;
}

export const BackButton = ({
    href = '/',
    label = 'Back to Characters',
    className = '',
}: BackButtonProps) => {
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            onClick={() => router.push(href)}
            className={`hover:bg-accent/50 transition-all hover:scale-105 hover:-translate-x-1 group ${className}`}
        >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {label}
        </Button>
    );
};

