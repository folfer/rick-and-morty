import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { CharacterImage } from '../CharacterImage';
import { Character } from '@/domain/entities/Character';

const mockCharacter: Character = {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)' },
    location: { name: 'Citadel of Ricks' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    created: '2017-11-04T18:48:46.250Z',
};

describe('CharacterImage', () => {
    it('renders character image with alt text', () => {
        render(<CharacterImage character={mockCharacter} />);

        const img = screen.getByAltText('Rick Sanchez');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', mockCharacter.image);
    });

    it('applies size classes correctly', () => {
        const { container, rerender } = render(
            <CharacterImage character={mockCharacter} size="sm" />
        );

        let img = container.querySelector('img');
        expect(img).toHaveClass('w-32', 'h-32');

        rerender(<CharacterImage character={mockCharacter} size="md" />);
        img = container.querySelector('img');
        expect(img).toHaveClass('w-48', 'h-48');

        rerender(<CharacterImage character={mockCharacter} size="lg" />);
        img = container.querySelector('img');
        expect(img).toHaveClass('w-72', 'h-72');
    });

    it('shows badge by default', () => {
        render(<CharacterImage character={mockCharacter} />);

        expect(screen.getByText('Alive')).toBeInTheDocument();
    });

    it('hides badge when showBadge is false', () => {
        render(<CharacterImage character={mockCharacter} showBadge={false} />);

        expect(screen.queryByText('Alive')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(
            <CharacterImage character={mockCharacter} className="custom-class" />
        );

        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass('custom-class');
    });
});

