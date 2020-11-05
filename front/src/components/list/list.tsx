import React from 'react';
import { Card } from '../card/card';

interface ListProps {
  visible: boolean;
  characters: Character[];
  onClick: (character: Character) => void;
  toggleFavorite: (id: number) => void;
}

export const List: React.FC<ListProps> = ({ visible, characters, onClick, toggleFavorite }) => visible && characters.length ? (
  <div className="characters-list">
    {characters.map((character: Character, index: number) => (
      <React.Fragment key={`${index}-${character.name}`}>
        <Card {...character} onClick={onClick} toggleFavorite={toggleFavorite} />
      </React.Fragment>
    ))}
  </div>
) : null;