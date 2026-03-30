import { useState, useEffect, useCallback } from 'react';
import type { Ingredient, ShoppingListItem } from '../types';
import type { ParsedMeasure } from '../types';

const STORAGE_KEY = 'recipe-app-shopping-list';

interface UseShoppingListReturn {
    items: ShoppingListItem[];
    isLoaded: boolean
    addIngredients: (ingredients: Ingredient[]) => void;
    removeItem: (name: string) => void;
    clearList: () => void;
    getItemCount: () => number;
}

export const useShoppingList = (): UseShoppingListReturn => {
    // State to hold items
    const [items, setItems] = useState<ShoppingListItem[]>([]);
    // State to track whether loaded
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                // Parse items
                setItems(parsed);
            }
            }
        } catch (error) {
            console.error('Failed to load shopping list:', error);
            // Set items as empty
            setItems([]);
        }
        // Update state
        setIsLoaded(true);
    }, []);
    
    // Save to localStorage when items change
   useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            } catch (error) {
                console.error('Failed to save shopping list:', error);
            }
        }
    }, [items, isLoaded]);

const parseMeasure = (measureStr: string): ParsedMeasure => {
  const original = measureStr.trim();
  // Regex to handle fractions and "1-2 Cups"
  const match = original.match(/^([\d./-]+)\s*(.*)$/);
  
  if (match) {
    const [, numStr, unit] = match;
    
    // Handle fractions like "1/2"
    let amount: number;
    if (numStr.includes('/')) {
      const [numerator, denominator] = numStr.split('/').map(Number);
      amount = numerator / denominator;
    } else if (numStr.includes('-')) {
        // for 1-2 cups, take the higher number for shopping safety
        const parts = numStr.split('-').map(Number);
        amount = Math.max(...parts);  // Grab the max value
    } else {
      amount = parseFloat(numStr);
    }
    
    return {
      amount: isNaN(amount) ? 0 : amount,
      unit: unit.trim(),
      original
    };
  }
  // If no number found (like "pinch of salt"), default to 0
  return {
    amount: 0,
    unit: original,
    original
  };
};

const addIngredients = useCallback((ingredients: Ingredient[]) => {
    setItems((prevItems) => {
        const newItems = [...prevItems];
        
        for (const ingredient of ingredients) {
            const normalizedName = ingredient.name.trim();
            if (!normalizedName) continue;
            
            const existingIndex = newItems.findIndex(
                (item) => item.name.toLowerCase() === normalizedName.toLowerCase()
            );
            
            if (existingIndex >= 0) {
                // Ingredient exists - add measure if provided
                if (ingredient.measure?.trim()) {
                    newItems[existingIndex].measures.push(parseMeasure(ingredient.measure));
                }
            } else {
                // New ingredient
                newItems.push({
                    name: normalizedName,
                    measures: ingredient.measure?.trim() ? [parseMeasure(ingredient.measure)] : [],
                });
            }
        } 
        
        // Sort alphabetically (case-insensitive)
        return newItems.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
    });
}, []);

    const removeItem = useCallback((name: string) => {
        setItems((prevItems) =>
        prevItems.filter(
        (item) => item.name.toLowerCase() !== name.toLowerCase()
        )
        );
        }, []);
        const clearList = useCallback(() => {
        setItems([]);
    }, []);
    const getItemCount = useCallback(() => {
        return items.length;
    }, [items]);

    return {
        items,
        isLoaded,
        addIngredients,
        removeItem,
        clearList,
        getItemCount,
    };
};