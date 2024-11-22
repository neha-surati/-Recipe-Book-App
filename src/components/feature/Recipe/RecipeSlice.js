import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
  loading: false,
  error: null,
};

const RecipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      const newRecipe = {
        id: nanoid(),
        title: action.payload.title,
        ingredients: action.payload.ingredients,
      };
      state.recipes.push(newRecipe);
    },
  },
});

export const { addRecipe } = RecipeSlice.actions;
export default RecipeSlice.reducer;
