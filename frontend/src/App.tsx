import { useEffect } from 'react';
import { useShoppingList } from './hooks/useShoppingList';


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

 return (
    <div>
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
    </div>
 );

}

export default App;