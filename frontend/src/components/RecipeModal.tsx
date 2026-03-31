import { useEffect, useCallback, useState } from 'react';
import { X, Video, ExternalLink, Plus, ChefHat } from 'lucide-react';
import type { Recipe, Ingredient } from '../types';
import styled from 'styled-components';

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToShoppingList: (ingredients: Ingredient[]) => void;
}

const RecipeModal = ({ recipe, isOpen, onClose, onAddToShoppingList }: RecipeModalProps) => {
  const [hasAdded, setHasAdded] = useState(false);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setHasAdded(false);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen || !recipe) return null;

  return (
    <ModalOverlay role="dialog" aria-modal="true" aria-labelledby="recipe-modal-title">
      <Backdrop onClick={onClose} />
      
      <ModalContainer>
        <HeaderSection>
          <HeaderImage src={recipe.image} alt={recipe.title} />
          <HeaderGradient />
          
          <CloseButton onClick={onClose} aria-label="Close modal">
            <X style={{ height: '1.5rem', width: '1.5rem' }} />
          </CloseButton>
          
          <HeaderContent>
            <ModalTitle id="recipe-modal-title">{recipe.title}</ModalTitle>
            <MetaRow>
              {recipe.category && (
                <MetaItem>
                  <ChefHat style={{ height: '1rem', width: '1rem' }} />
                  <span>{recipe.category}</span>
                </MetaItem>
              )}
              {recipe.area && <span>{recipe.area}</span>}
            </MetaRow>
          </HeaderContent>
        </HeaderSection>

        <ContentSection>
          <Column>
            <SectionTitle>Ingredients</SectionTitle>
            <IngredientsList>
              {recipe.ingredients.map((ingredient, index) => (
                <IngredientItem key={index}>
                  <IngredientName>{ingredient.name}</IngredientName>
                  {ingredient.measure && (
                    <IngredientMeasure>{ingredient.measure}</IngredientMeasure>
                  )}
                </IngredientItem>
              ))}
            </IngredientsList>
            
            <AddButton 
              onClick={() => {
                if (hasAdded) return;
                setHasAdded(true);
                setTimeout(() => {
                  onAddToShoppingList(recipe.ingredients);
                }, 200);
              }}
              disabled={hasAdded}
              style={{ opacity: hasAdded ? 0.5 : 1 }}
            >
              <Plus style={{ height: '1.25rem', width: '1.25rem' }} />
              <span>{hasAdded ? 'Added!' : 'Add to Shopping List'}</span>
            </AddButton>
  
            <SectionTitle>Instructions</SectionTitle>
            <InstructionsContent>
              {recipe.instructions.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <InstructionParagraph key={index}>
                    {paragraph.trim()}
                  </InstructionParagraph>
                )
              ))}
            </InstructionsContent>

            <LinksContainer>
              {recipe.youtube && (
                <ExternalLinkStyled 
                  href={recipe.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  $color="red"
                >
                  <Video style={{ height: '1.25rem', width: '1.25rem'}} />
                  <span>Watch on YouTube</span>
                </ExternalLinkStyled>
              )}
              {recipe.source && (
                <ExternalLinkStyled 
                  href={recipe.source} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  $color="blue"
                >
                  <ExternalLink style={{ height: '1.25rem', width: '1.25rem' }} />
                  <span>View Source</span>
                </ExternalLinkStyled>
              )}
            </LinksContainer>
          </Column>
        </ContentSection>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 56rem;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const HeaderSection = styled.div`
  position: relative;
  height: 16rem;
  flex-shrink: 0;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeaderGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 150ms ease;
  
  &:hover {
    background-color: white;
  }
`;

const HeaderContent = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1.5rem;
  right: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.9);
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ContentSection = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  max-height: calc(90vh - 16rem);
`;

const Column = styled.div`
  margin: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const IngredientsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const IngredientItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
`;

const IngredientName = styled.span`
  font-weight: 500;
`;

const IngredientMeasure = styled.span`
  color: #4b5563;
`;

const AddButton = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 150ms ease;
  
  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const InstructionsContent = styled.div`
  max-width: none;
`;

const InstructionParagraph = styled.p`
  margin-bottom: 1rem;
  color: #374151;
  line-height: 1.625;
`;

const LinksContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ExternalLinkStyled = styled.a<{ $color: 'red' | 'blue' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  color: ${props => props.$color === 'red' ? '#dc2626' : '#2563eb'};
  
  &:hover {
    color: ${props => props.$color === 'red' ? '#b91c1c' : '#1d4ed8'};
  }
`;

export default RecipeModal;