import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    message?: string;
}

export const LoadingSpinner = ({ message = 'Loading more characters...' }: LoadingSpinnerProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <Loader2 className="h-12 w-12 text-primary animate-spin portal-glow p-2 rounded-full" />
            <p className="mt-4 text-muted-foreground animate-pulse">{message}</p>
        </div>
    );
};

