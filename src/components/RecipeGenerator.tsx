
import React, { useState } from 'react';
import { generateRecipe, Recipe, Ingredient } from '../services/api';

interface RecipeGeneratorProps {
  selectedIngredientIds: string[];
  onRecipeGenerated: (recipe: Recipe) => void;
  ingredients: Ingredient[];
}

const RecipeGenerator: React.FC<RecipeGeneratorProps> = ({
  selectedIngredientIds,
  onRecipeGenerated,
  ingredients
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = async () => {
    if (selectedIngredientIds.length === 0) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const recipe = await generateRecipe(selectedIngredientIds);
      onRecipeGenerated(recipe);
    } catch (err) {
      setError('Failed to generate recipe');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="my-6">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-recipe-purple" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <h2 className="text-xl font-semibold">Your Basket</h2>
        </div>
        
        <div className="bg-recipe-purple text-white rounded-full px-3 py-1 text-sm">
          {selectedIngredientIds.length} items
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4 min-h-[100px]">
        {selectedIngredientIds.length > 0 ? (
          <div className="space-y-2">
            <p className="text-center mb-2">Ready to generate a recipe with your selected ingredients!</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedIngredientIds.map(id => {
                // Find the ingredient name by id
                const ingredient = ingredients.find(i => i._id === id);
                return ingredient ? (
                  <span key={id} className="bg-recipe-purple bg-opacity-20 text-recipe-purple px-3 py-1 rounded-full text-sm">
                    {ingredient.name}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Your basket is empty. Add items from your pantry!</p>
        )}
      </div>
      
      <button
        onClick={handleGenerateRecipe}
        disabled={isGenerating || selectedIngredientIds.length === 0}
        className="w-full bg-recipe-purple text-white py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Recipe...
          </span>
        ) : (
          'Generate Recipe'
        )}
      </button>
    </div>
  );
};

export default RecipeGenerator;
