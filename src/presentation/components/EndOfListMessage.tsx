interface EndOfListMessageProps {
    totalCount: number;
}

export const EndOfListMessage = ({ totalCount }: EndOfListMessageProps) => {
    return (
        <div className="text-center py-8 animate-fade-in">
            <p className="text-muted-foreground">🎉 You&apos;ve reached the end of the multiverse!</p>
            <p className="text-sm text-muted-foreground/70 mt-2">{totalCount} characters loaded</p>
        </div>
    );
};

