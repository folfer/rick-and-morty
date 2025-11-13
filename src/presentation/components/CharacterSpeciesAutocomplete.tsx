'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSpeciesAutocomplete } from '../hooks/useSpeciesAutocomplete';
import { Search } from 'lucide-react';

interface CharacterSpeciesAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    id?: string;
    className?: string;
}

export const CharacterSpeciesAutocomplete = ({
    value,
    onChange,
    id = 'species',
    className = '',
}: CharacterSpeciesAutocompleteProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const { suggestions, loading } = useSpeciesAutocomplete({
        searchTerm: value,
        minLength: 2,
        debounceMs: 300,
        maxResults: 10,
    });

    useEffect(() => {
        setIsOpen(value.length >= 2 && suggestions.length > 0 && !loading);
    }, [value, suggestions, loading]);

    useEffect(() => {
        const updatePosition = () => {
            if (inputRef.current) {
                const rect = inputRef.current.getBoundingClientRect();
                setDropdownPosition({
                    top: rect.bottom + 4,
                    left: rect.left,
                    width: rect.width,
                });
            }
        };

        if (isOpen || loading) {
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
        }

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isOpen, loading]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                containerRef.current &&
                !containerRef.current.contains(target) &&
                listRef.current &&
                !listRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                inputRef.current?.blur();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    const handleSelect = (species: string) => {
        onChange(species);
        setIsOpen(false);
        inputRef.current?.blur();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
                    handleSelect(suggestions[highlightedIndex]);
                }
                break;
        }
    };

    useEffect(() => {
        if (highlightedIndex >= 0 && listRef.current) {
            const item = listRef.current.children[highlightedIndex] as HTMLElement;
            if (item) {
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }, [highlightedIndex]);

    return (
        <div ref={containerRef} className={`relative z-0 ${className}`}>
            <Label htmlFor={id} className="text-foreground">
                Species
            </Label>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    ref={inputRef}
                    id={id}
                    placeholder="e.g., Human, Alien..."
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setHighlightedIndex(-1);
                    }}
                    onFocus={() => {
                        if (value.length >= 2 && suggestions.length > 0) {
                            setIsOpen(true);
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    className="bg-background/50 pl-10"
                    autoComplete="off"
                />
            </div>

            {typeof window !== 'undefined' &&
                isOpen &&
                suggestions.length > 0 &&
                createPortal(
                    <ul
                        ref={listRef}
                        className="fixed z-[9999] bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-auto animate-fade-in"
                        style={{
                            top: `${dropdownPosition.top}px`,
                            left: `${dropdownPosition.left}px`,
                            width: `${dropdownPosition.width}px`,
                        }}
                    >
                        {suggestions.map((species, index) => (
                            <li
                                key={species}
                                onClick={() => handleSelect(species)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                className={`
                                    px-4 py-2 cursor-pointer transition-colors
                                    ${index === highlightedIndex
                                        ? 'bg-primary/20 text-primary'
                                        : 'hover:bg-accent/50'
                                    }
                                    ${index === 0 ? 'rounded-t-lg' : ''}
                                    ${index === suggestions.length - 1 ? 'rounded-b-lg' : ''}
                                `}
                            >
                                <span className="font-medium">{species}</span>
                            </li>
                        ))}
                    </ul>,
                    document.body
                )}

            {typeof window !== 'undefined' &&
                loading &&
                value.length >= 2 &&
                createPortal(
                    <div
                        className="fixed z-[9999] bg-card border border-border rounded-lg shadow-lg p-4 text-center text-sm text-muted-foreground animate-fade-in"
                        style={{
                            top: `${dropdownPosition.top}px`,
                            left: `${dropdownPosition.left}px`,
                            width: `${dropdownPosition.width}px`,
                        }}
                    >
                        Searching...
                    </div>,
                    document.body
                )}
        </div>
    );
};

