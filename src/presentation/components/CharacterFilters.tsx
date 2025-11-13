'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { CharacterFilterInput } from '@/domain/entities/Character';

interface CharacterFiltersProps {
    filters: CharacterFilterInput;
    onFiltersChange: (filters: CharacterFilterInput) => void;
    onReset: () => void;
}

export const CharacterFilters = ({ filters, onFiltersChange, onReset }: CharacterFiltersProps) => {
    const hasActiveFilters = filters.name || filters.status || filters.species || filters.gender;

    return (
        <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 p-6 space-y-4 hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary flex items-center gap-2 animate-fade-in">
                    <Search className="h-5 w-5 animate-pulse" />
                    Filters
                </h2>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onReset}
                        className="text-muted-foreground hover:text-destructive transition-colors animate-fade-in"
                    >
                        <X className="h-4 w-4 mr-2" />
                        Clear
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Name</Label>
                    <Input
                        id="name"
                        placeholder="Search by name..."
                        value={filters.name || ''}
                        onChange={(e) => onFiltersChange({ ...filters, name: e.target.value, page: 1 })}
                        className="bg-background/50"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status" className="text-foreground">Status</Label>
                    <Select
                        value={filters.status || 'all'}
                        onValueChange={(value) =>
                            onFiltersChange({ ...filters, status: value === 'all' ? undefined : value as any, page: 1 })
                        }
                    >
                        <SelectTrigger id="status" className="bg-background/50">
                            <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            <SelectItem value="Alive">Alive</SelectItem>
                            <SelectItem value="Dead">Dead</SelectItem>
                            <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="species" className="text-foreground">Species</Label>
                    <Input
                        id="species"
                        placeholder="e.g., Human, Alien..."
                        value={filters.species || ''}
                        onChange={(e) => onFiltersChange({ ...filters, species: e.target.value, page: 1 })}
                        className="bg-background/50"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="gender" className="text-foreground">Gender</Label>
                    <Select
                        value={filters.gender || 'all'}
                        onValueChange={(value) =>
                            onFiltersChange({ ...filters, gender: value === 'all' ? undefined : value as any, page: 1 })
                        }
                    >
                        <SelectTrigger id="gender" className="bg-background/50">
                            <SelectValue placeholder="All genders" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All genders</SelectItem>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Genderless">Genderless</SelectItem>
                            <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

