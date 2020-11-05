import React from 'react';
import './card.css';
import male from 'assets/male.svg';
import female from 'assets/female.svg';
import favor from 'assets/favor.svg';
import disfavor from 'assets/disfavor.svg';

interface CardProps extends Character {
  onClick: (character: Character) => void;
  toggleFavorite: (id: number) => void;
}

export const Card: React.FC<CardProps> = ({ onClick, toggleFavorite, ...character }) => (
  <div className="card" onClick={(event) => {
    const { alt } = event.target as HTMLImageElement;
    if (alt !== 'favorite') {
      onClick(character);
    }
  }}>
    <div className="card-content">
      <img className="character-img" src={character.image.medium_url} alt={character.name}></img>
      <div className="informations">
        <span>
          <img
            src={character.favorite ? favor : disfavor}
            alt="favorite"
            onClick={() => toggleFavorite(character.id)}
          />
        </span>
        <span>Name: {character.name}</span>
        <span>Real Name: {character.real_name}</span>
        <span>Gender: <img className="gender-img" src={character.gender === 1 ? male : female} alt={`${character.gender}`} /></span>
        <span>Birth: {character.birth}</span>
        <span>Aliases: {character.aliases}</span>
      </div>
    </div>
  </div>
);