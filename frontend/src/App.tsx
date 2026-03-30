import { useEffect, useState } from 'react';
import { useShoppingList } from './hooks/useShoppingList';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import type { ViewState } from './types';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';

const App = () => {

  const { items, isLoaded, addIngredients, removeItem, getItemCount } = useShoppingList();
  
  const sampleRecipe: Recipe = {
    id: '52772',
    title: 'Teriyaki Chicken Casserole',
    category: 'Chicken',
    area: 'Japanese',
    instructions: 'Cook chicken...',
    image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    youtube: null,
    source: null,
    ingredients: [
    { name: 'Chicken', measure: '500g' },
    { name: 'Soy Sauce', measure: '3 tbsp' },
    ],
  };

  const [isLoading, setIsLoading] = useState(false);
    
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };
  const handleSurpriseMe = () => {
    console.log('Surprise me!');
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  useEffect(() => {
    console.log('Shopping list:', items);
    console.log('Item count:', getItemCount());
  }, [items]);

  const [currentView, setCurrentView] = useState<ViewState>('search');

 return (
  <AppContainer>
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        shoppingListCount={getItemCount()}
      />
      <MainContent>
        <ViewText>Current view: {currentView}</ViewText>
        <SearchContainer>
          <SearchBar
            onSearch={handleSearch}
            onSurpriseMe={handleSurpriseMe}
            isLoading={isLoading}
          />
        </SearchContainer>

         <CardTestWrapper>
          <RecipeCard
            recipe={sampleRecipe}
            onClick={() => console.log('Clicked:', sampleRecipe.title)}
          />
        </CardTestWrapper>
      </MainContent>    
    </AppContainer>
 );
}

export default App;
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb; // bg-gray-50
`;

const MainContent = styled.main`
  max-width: 80rem; // max-w-7xl
  margin-left: auto;
  margin-right: auto;
  padding: 2rem 1rem; // py-8 px-4
  
  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const ViewText = styled.p`
  color: inherit;
`;

const SearchContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 48rem; 
  margin-left: auto;  
  margin-right: auto; 
`;

const CardTestWrapper = styled.div`
  max-width: 24rem;
  margin: 2rem auto 0; 
`;