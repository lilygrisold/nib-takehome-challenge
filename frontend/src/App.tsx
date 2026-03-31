import { useEffect, useState } from 'react';
import { useShoppingList } from './hooks/useShoppingList';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import type { ViewState, Recipe, Ingredient, ShoppingListItem } from './types';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import ShoppingListModal from './components/ShoppingListModal';


const App = () => {
  const { items, isLoaded, addIngredients, removeItem, clearList, getItemCount } = useShoppingList();
  // Sample items for testing
  const sampleItems: ShoppingListItem[] = [
  { 
    name: 'Chicken Breast', 
    measures: [
      { amount: 500, unit: 'g', original: '500g' },
      { amount: 2, unit: 'pieces', original: '2 pieces' }
    ] 
  },
  { 
    name: 'Rice', 
    measures: [
      { amount: 1, unit: 'cup', original: '1 cup' }
    ] 
  },
  { 
    name: 'Soy Sauce', 
    measures: [
      { amount: 3, unit: 'tbsp', original: '3 tbsp' }
    ] 
  },
  { 
    name: 'Garlic', 
    measures: [
      { amount: 3, unit: 'cloves', original: '3 cloves' }
    ] 
  },
];

  const [testItems, setTestItems] = useState(sampleItems);

  
  // State for modal
  const [isOpen, setIsOpen] = useState(false);

  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  // State for opening shopping list
  const [isShoppingOpen, setIsShoppingOpen] = useState(false);

  // Example recipe for testing
  const sampleRecipe: Recipe = {
    id: '52772',
    title: 'Teriyaki Chicken Casserole',
    category: 'Chicken',
    area: 'Japanese',
    instructions: 'Cook chicken...',
    image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    youtube: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
    source: 'https://therecipecritic.com/teriyaki-chicken-casserole/',
    ingredients: [
    { name: 'Chicken', measure: '500g' },
    { name: 'Soy Sauce', measure: '3 tbsp' },
    ],
  };
    

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
    console.log('Shopping list:', testItems);
    console.log('Item count:', getItemCount());
  }, [testItems]);

  const [currentView, setCurrentView] = useState<ViewState>('search');

  useEffect(() => {
  if (isLoaded && items.length === 0) {
    addIngredients([
      { name: 'Chicken Breast', measure: '500g' },
      { name: 'Rice', measure: '1 cup' },
    ]);
  }
}, [isLoaded]);
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

        <CardButton onClick={() => setIsOpen(true)}>
          <CardTestWrapper>
            <RecipeCard
              recipe={sampleRecipe}
              onClick={() => console.log('Clicked:', sampleRecipe.title)}
            />
          </CardTestWrapper>
          
        </CardButton>

        <RecipeModal
          recipe={sampleRecipe}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onAddToShoppingList={(ingredients) => {
            addIngredients(ingredients); 
            setIsOpen(false);
          }}
        />

      <TestButton onClick={() => setIsShoppingOpen(true)}>
        Open Shopping List
      </TestButton>
      <ShoppingListModal
        items={items}
        isOpen={isShoppingOpen}
        onClose={() => setIsShoppingOpen(false)}
        onRemoveItem={removeItem}
        onClearList={clearList}
      />
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
  margin: 0.3rem auto 0; 
`;

const CardButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  background-color: #fff;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 500;
  cursor: pointer;
`;
const TestButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  padding: 0.75rem 1.5rem; 
  background-color: #2563eb; 
  color: white; 
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #1d4ed8;
  }
`;