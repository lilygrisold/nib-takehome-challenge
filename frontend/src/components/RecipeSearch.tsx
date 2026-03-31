import { useState } from 'react';
import type { Meal } from '../utils/shoppingList';

export default function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);

  const search = async (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await res.json();
    setMeals(data.meals || []);
  };

  return (
    <div>
      <input
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={search}
      />
      <div>
        {meals.map((meal) => (
          <div key={meal.idMeal}>
            <h3>{meal.strMeal}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}