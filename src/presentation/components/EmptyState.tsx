interface EmptyStateProps {
    message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
    return (
        <div className="text-center py-16 animate-fade-in">
            <p className="text-xl text-muted-foreground">{message}</p>
        </div>
    );
};

