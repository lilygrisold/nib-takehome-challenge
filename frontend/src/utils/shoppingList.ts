export interface Ingredient {
  item: string;
  measure: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  [key: string]: string | null;
}

/**
 * Extracts ingredients from TheMealDB format (strIngredient1..20, strMeasure1..20)
 */
export function extractIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        item: ingredient.trim(),
        measure: measure?.trim() || 'to taste',
      });
    }
  }
  
  return ingredients;
}

/**
 * Parses a measure string to extract numeric value and unit
 * Handles: "500g", "2 cups", "1/2 tsp", "100 ml"
 */
function parseMeasure(measure: string): { value: number; unit: string } {
  const normalized = measure.toLowerCase().trim();
  
  // Extract number (handles decimals and fractions like 1/2)
  const match = normalized.match(/^([\d\s./]+)\s*(.*)$/);
  if (!match) return { value: 0, unit: normalized };
  
  const numPart = match[1].trim();
  let unit = match[2].trim();
  
  // Handle fractions like "1/2"
  let value: number;
  if (numPart.includes('/')) {
    const [num, denom] = numPart.split('/');
    value = parseFloat(num) / parseFloat(denom);
  } else {
    value = parseFloat(numPart) || 0;
  }
  
  return { value, unit };
}

/**
 * Combines ingredients across multiple meals
 * Aggregates amounts if units match, otherwise lists separately
 */
export function combineIngredients(meals: { ingredients: Ingredient[] }[]): Ingredient[] {
  const combined = new Map<string, { value: number; unit: string; rawMeasures: string[] }>();
  
  meals.forEach(meal => {
    meal.ingredients.forEach(({ item, measure }) => {
      const key = item.toLowerCase();
      const parsed = parseMeasure(measure);
      
      if (combined.has(key)) {
        const existing = combined.get(key)!;
        // Only add if units match (or if no unit was specified)
        if (existing.unit === parsed.unit || existing.unit === '' || parsed.unit === '') {
          existing.value += parsed.value;
          existing.rawMeasures.push(measure);
          // Normalize unit if it was empty
          if (existing.unit === '' && parsed.unit !== '') existing.unit = parsed.unit;
        } else {
          // Different units - keep separate with different key
          const altKey = `${key}_${parsed.unit}`;
          if (!combined.has(altKey)) {
            combined.set(altKey, { value: parsed.value, unit: parsed.unit, rawMeasures: [measure] });
          } else {
            combined.get(altKey)!.value += parsed.value;
            combined.get(altKey)!.rawMeasures.push(measure);
          }
        }
      } else {
        combined.set(key, { value: parsed.value, unit: parsed.unit, rawMeasures: [measure] });
      }
    });
  });
  
  // Convert back to Ingredient array, sorted alphabetically
  const result: Ingredient[] = Array.from(combined.entries())
    .map(([item, data]) => ({
      item: item.charAt(0).toUpperCase() + item.slice(1),
      measure: data.value > 0 
        ? `${data.value} ${data.unit}`.trim() 
        : data.rawMeasures.join(', '),
    }))
    .sort((a, b) => a.item.localeCompare(b.item));
  
  return result;
}