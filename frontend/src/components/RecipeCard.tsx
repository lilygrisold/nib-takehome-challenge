import { MapPin, Tag } from 'lucide-react';
import type { Recipe } from '../types';
import styled from 'styled-components';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${recipe.title}`}
    >
      <ImageWrapper>
        <CardImage
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
        />
      </ImageWrapper>
      
      <CardContent>
        <CardTitle>{recipe.title}</CardTitle>
        
        <MetaContainer>
          {recipe.category && (
            <MetaItem>
              <Tag style={{ height: '1rem', width: '1rem' }} />
              <span>{recipe.category}</span>
            </MetaItem>
          )}
          {recipe.area && (
            <MetaItem>
              <MapPin style={{ height: '1rem', width: '1rem' }} />
              <span>{recipe.area}</span>
            </MetaItem>
          )}
        </MetaContainer>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 300ms ease;
  
  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 12rem;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 300ms ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export default RecipeCard;