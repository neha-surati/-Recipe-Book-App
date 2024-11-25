import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  loading: false,
  error: null,
};

export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (recipe, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });
      return await res.json(); 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/recipes");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id, { rejectWithValue }) => {
    try {
      await fetch(`http://localhost:3000/recipes/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRecipe1 = createAsyncThunk(
  "recipes/updateRecipe",
  async (recipe, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/recipes/${recipe.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });
      return await res.json(); 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes.push(action.payload);
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(
          (recipe) => recipe.id !== action.payload
        );
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateRecipe1.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRecipe1.fulfilled, (state, action) => {
        state.loading = false;

        const updatedRecipe1 = action.payload;

        
        state.recipes = state.recipes.map((recipe) =>
          recipe.id === updatedRecipe1.id ? updatedRecipe1 : recipe
        );
      })
      .addCase(updateRecipe1.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recipeSlice.reducer;
