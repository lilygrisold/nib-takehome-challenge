import { Search, ShoppingCart, ChefHat } from 'lucide-react';
import type { ViewState } from '../types';
import styled from 'styled-components';
import ShoppingListModal from './ShoppingListModal';

interface NavigationProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  shoppingListCount: number;
  onShoppingListClick: () => void;
}

const Navigation = ({ currentView, onViewChange, shoppingListCount, onShoppingListClick }: NavigationProps) => {
  return (
    <NavBar>
      <Container>
        <NavContent>
          <LogoSection>
            <ChefHat style={{ height: '2rem', width: '2rem', color: '#2563eb' }} />
            <LogoText>Recipe Finder</LogoText>
          </LogoSection>
          
          <NavButtons>
            <NavButton 
              $isActive={currentView === 'search'} 
              onClick={() => onViewChange('search')}
              aria-pressed={currentView === 'search'}
            >
              <Search style={{ height: '1.25rem', width: '1.25rem' }} />
              <span>Search</span>
            </NavButton>
            
            <NavButton 
              $isActive={currentView === 'shopping-list'} 
              onClick={onShoppingListClick}
              aria-pressed={currentView === 'shopping-list'}
            >
              <ShoppingCart style={{ height: '1.25rem', width: '1.25rem' }} />
              <span>Shopping List</span>
              {shoppingListCount > 0 && (
                <Badge>{shoppingListCount}</Badge>
              )}
            </NavButton>
          </NavButtons>
        </NavContent>
      </Container>
    </NavBar>
  );
};

// Styled Components - all your CSS lives down here
const NavBar = styled.nav`
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 50;
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  background-color: ${props => props.$isActive ? '#dbeafe' : 'transparent'};
  color: ${props => props.$isActive ? '#1d4ed8' : '#4b5563'};
  
  &:hover {
    background-color: ${props => props.$isActive ? '#dbeafe' : '#f3f4f6'};
  }
`;

const Badge = styled.span`
  margin-left: 0.5rem;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
`;

export default Navigation;