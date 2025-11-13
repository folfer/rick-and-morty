import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
    title: string;
    message: string;
    className?: string;
}

export const ErrorAlert = ({ title, message, className = '' }: ErrorAlertProps) => {
    return (
        <Alert variant="destructive" className={`animate-fade-in ${className}`}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
};

