import { useState, useCallback} from 'react';
import { useShoppingList } from './hooks/useShoppingList';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import type { ViewState, Recipe } from './types';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import ShoppingListModal from './components/ShoppingListModal';
import { searchRecipes, getRandomRecipe } from './services/api';
import LoadingSkeleton from './components/LoadingSkeleton';
import Toast from './components/Toast';
import { useToast } from './hooks/useToast';


const App = () => {
  // Import ShoppingList children context
  const { items, addIngredients, removeItem, clearList, getItemCount } = useShoppingList();

  // State to control modal to avoid double clicks
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  // State for opening shopping list
  const [isShoppingOpen, setIsShoppingOpen] = useState(false);
  // State to store recipes
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // State to hold whether searched or not
  const [hasSearched, setHasSearched] = useState(false);
  // State for errors
  const [error, setError] = useState<string | null>(null);
  // State to hold selected recipe
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  // State to control view
  const [currentView, setCurrentView] = useState<ViewState>('search');


  // Toast
  const { toasts, removeToast } = useToast();

  // Search Handler
  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const results = await searchRecipes(query);
      setRecipes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search recipes');
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Updated Surprise Me Handler
  const handleSurpriseMe = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const recipe = await getRandomRecipe();
      setSelectedRecipe(recipe);
      setIsRecipeModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch random recipe');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Recipe click handler
  const handleRecipeClick = useCallback((recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsRecipeModalOpen(true);
  }, []);

  // Shopping list handler
  const handleAddToShoppingList = useCallback((ingredients: Recipe['ingredients']) => {
    setIsRecipeModalOpen(false);
    addIngredients(ingredients);
  }, [addIngredients]);

  // Navigation handler
  const handleViewChange = useCallback((view: ViewState) => {
    setCurrentView(view);
    if (view === 'shopping-list') {
      setIsShoppingOpen(true);
    }
  }, []);

  // Close Shopping List Handler
  const handleCloseShoppingList = useCallback(() => {
    setIsShoppingOpen(false);
    setCurrentView('search');
  }, []);



  return (
    <AppContainer>
      <Navigation
        currentView={currentView}
        onViewChange={handleViewChange}
        shoppingListCount={getItemCount()}
        onShoppingListClick={() => setIsShoppingOpen(true)}
      />

      <MainContent>
        <SearchContainer>
          <SearchBar
            onSearch={handleSearch}
            onSurpriseMe={handleSurpriseMe}
            isLoading={isLoading}
          />
        </SearchContainer>

        {/* Error Message */}
        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}

        {hasSearched && !isLoading && (
          <ResultsSection>
            <ResultsHeading>
              {recipes.length > 0
                ? `Found ${recipes.length} recipe${recipes.length !== 1 ? 's' : ''}`
                : 'No recipes found'}
            </ResultsHeading>
            
            {recipes.length > 0 ? (
              <RecipeGrid>
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => handleRecipeClick(recipe)}
                  />
                ))}
              </RecipeGrid>
            ) : (
              <NoResults>No recipes found. Try a different search!</NoResults>
            )}
          </ResultsSection>
        )}

        {/* Initial State */}
        {!hasSearched && !isLoading && (
          <InitialState>
            <p>Search for recipes or try "Surprise Me!" to get started</p>
          </InitialState>
        )}

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

      </MainContent>

      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        onAddToShoppingList={handleAddToShoppingList}
      />
      
      <ShoppingListModal
        items={items}
        isOpen={isShoppingOpen}
        onClose={handleCloseShoppingList}
        onRemoveItem={removeItem}
        onClearList={clearList}
      />

      {toasts.length > 0 && (
        <ToastContainer>
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onClose={removeToast} />
          ))}
        </ToastContainer>
      )}  

    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

const MainContent = styled.main`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  @media (min-width: 640px) {
    padding: 2rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem 2rem;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 2.5rem; // mb-10 equivalent
  width: 100%;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
`;

const ErrorMessage = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  color: #dc2626;
`;

const ResultsSection = styled.div`
  margin-top: 2rem;
`;

const ResultsHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #111827;
`;

const RecipeGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const NoResults = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 1.125rem;
  padding: 3rem 0;
`;

const InitialState = styled.div`
  text-align: center;
  padding: 5rem 0;
  
  p {
    color: #6b7280;
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 1rem;    
  right: 1rem;     
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;     
`;