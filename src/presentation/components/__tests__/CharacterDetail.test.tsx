import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { CharacterDetail } from '../CharacterDetail';
import { Character } from '@/domain/entities/Character';

const mockCharacter: Character = {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
        id: '1',
        name: 'Earth (C-137)',
        type: 'Planet',
        dimension: 'Dimension C-137',
    },
    location: {
        id: '3',
        name: 'Citadel of Ricks',
        type: 'Space station',
        dimension: 'unknown',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
        { id: '1', name: 'Pilot', episode: 'S01E01', air_date: 'December 2, 2013' },
    ],
    created: '2017-11-04T18:48:46.250Z',
};

describe('CharacterDetail', () => {
    it('renders skeleton when loading', () => {
        const { container } = render(
            <CharacterDetail
                character={null}
                loading={true}
                error={null}
                relatedCharacters={[]}
                loadingRelated={false}
            />
        );

        const skeletons = container.querySelectorAll('.animate-pulse');
        expect(skeletons.length).toBeGreaterThan(0);
    });

    it('renders error message when error exists', () => {
        render(
            <CharacterDetail
                character={null}
                loading={false}
                error="Character not found"
                relatedCharacters={[]}
                loadingRelated={false}
            />
        );

        expect(screen.getByText('Error Loading Character')).toBeInTheDocument();
        expect(screen.getByText('Character not found')).toBeInTheDocument();
    });

    it('renders character details when character exists', () => {
        render(
            <CharacterDetail
                character={mockCharacter}
                loading={false}
                error={null}
                relatedCharacters={[]}
                loadingRelated={false}
            />
        );

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(screen.getByText('Current Location')).toBeInTheDocument();
        expect(screen.getByText('Origin')).toBeInTheDocument();
        expect(screen.getByText('Episode Appearances')).toBeInTheDocument();
    });

    it('renders back button', () => {
        render(
            <CharacterDetail
                character={mockCharacter}
                loading={false}
                error={null}
                relatedCharacters={[]}
                loadingRelated={false}
            />
        );

        expect(screen.getByText('Back to Characters')).toBeInTheDocument();
    });

    it('renders location cards', () => {
        render(
            <CharacterDetail
                character={mockCharacter}
                loading={false}
                error={null}
                relatedCharacters={[]}
                loadingRelated={false}
            />
        );

        expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
        expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
    });
});

