// Ingredient type - single ingredient, measure
export interface Ingredient {
    name: string;
    measure: string | null; // null for handling "pinch" of salt
}

// Recipe type - all recipe data from MealDB
export interface Recipe {
 id: string;
 title: string;
 category: string;
  area: string;
 instructions: string;
 image: string;
 youtube: string | null; // null for handling empty 
 source: string | null; // or broken links
 ingredients: Ingredient[];
}

// Shopping list - add multiples together
export interface ParsedMeasure {
  amount: number;      // 5, 500
  unit: string;        // "cups", "g"
  original: string;    // "5 cups" (for display)
}
export interface ShoppingListItem {
 name: string;
 measures: ParsedMeasure[];
}

// API responses
export interface RecipesResponse {
 recipes: Recipe[];
}
export interface RecipeResponse {
 recipe: Recipe;
}
export interface ApiError {
 error: string; 
}

// View state for the application
export type ViewState = 'search' | 'shopping-list';

// Toast notification
export interface Toast {
 id: string;
 message: string;
 type: 'success' | 'error' | 'info';
}