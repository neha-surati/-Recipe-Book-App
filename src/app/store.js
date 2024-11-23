import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from '../feature/Recipe/RecipeSlice'; 

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
});
