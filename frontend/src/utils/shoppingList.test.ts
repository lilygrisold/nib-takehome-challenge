import { describe, it, expect } from 'vitest';
import { extractIngredients, combineIngredients } from './shoppingList.ts';

describe('extractIngredients', () => {
  it('extracts ingredients from TheMealDB format', () => {
    const meal = {
      idMeal: '123',
      strMeal: 'Test',
      strIngredient1: 'Beef',
      strMeasure1: '500g',
      strIngredient2: 'Carrots',
      strMeasure2: '2 cups',
      strIngredient3: null,
      strMeasure3: null,
    };
    
    const result = extractIngredients(meal);
    
    expect(result).toEqual([
      { item: 'Beef', measure: '500g' },
      { item: 'Carrots', measure: '2 cups' },
    ]);
  });
});

describe('combineIngredients', () => {
  it('aggregates duplicate ingredients with same units', () => {
    const meals = [
      { ingredients: [{ item: 'Beef', measure: '500g' }] },
      { ingredients: [{ item: 'Beef', measure: '300g' }] },
    ];
    
    const result = combineIngredients(meals);
    
    expect(result).toContainEqual({ item: 'Beef', measure: '800 g' });
  });

  it('keeps different units separate', () => {
    const meals = [
      { ingredients: [{ item: 'Flour', measure: '2 cups' }] },
      { ingredients: [{ item: 'Flour', measure: '500g' }] },
    ];
    
    const result = combineIngredients(meals);
    
    // Should have both entries
    expect(result.length).toBe(2);
  });

  it('sorts alphabetically', () => {
    const meals = [
      { ingredients: [
        { item: 'Zucchini', measure: '1' }, 
        { item: 'Apple', measure: '2' },
      ]},
    ];
    
    const result = combineIngredients(meals);
    
    expect(result[0].item).toBe('Apple');
    expect(result[1].item).toBe('Zucchini');
  });
});