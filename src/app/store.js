import { configureStore } from '@reduxjs/toolkit';
import RecipeReducer from '../components/feature/Recipe/RecipeSlice';

const store = configureStore({
  reducer: {
    recipe: RecipeReducer,
  },
});

export default store;
