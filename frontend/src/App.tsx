import { useEffect, useState } from 'react';
import { useShoppingList } from './hooks/useShoppingList';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import type { ViewState } from './types';

const App = () => {
  const { items, isLoaded, addIngredients, removeItem,
    getItemCount } = useShoppingList();
    useEffect(() => {
      if (isLoaded) {
        // Test adding ingredients
        addIngredients([
        { name: 'Chicken', measure: '500g' },
        { name: 'Rice', measure: '1 cup' },
        { name: 'chicken', measure: '2 breasts' }, // Test aggregation
        ]);
      }
    }, [isLoaded]);

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
        shoppingListCount={5}
      />
      <MainContent>
        <ViewText>Current view: {currentView}</ViewText>
      </MainContent>
    {/* <div>
      <h1>Shopping List ({getItemCount()})</h1>
        {items.map(item => (
          <div key={item.name}>
            {item.name}: 
            {item.measures
              .map(m => m.original)
              .filter((value, index, self) => self.indexOf(value) === index) // dedupe
              .join(', ')}
          </div>
      ))}
    </div> */}
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
