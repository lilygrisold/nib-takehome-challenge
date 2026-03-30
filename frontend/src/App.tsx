import { useEffect } from 'react';
import { searchRecipes, getRandomRecipe } from './services/api';

const App = () => {
  useEffect(() => {
    // Test search
    searchRecipes('chicken').then(recipes => {
      console.log('Search results:', recipes);
    });
    // Test random
    getRandomRecipe().then(recipe => {
      console.log('Random recipe:', recipe);
    });
  }, []);

  return <div>Inspect page console for API results</div>;
}

export default App;