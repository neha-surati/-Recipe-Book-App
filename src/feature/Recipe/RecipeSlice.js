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
        body: JSON.stringify(recipe),
        headers: {
          "Content-Type": "application/json",
        },
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

export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async (recipe, { rejectWithValue }) => {
    try {
      console.log("Updating recipe:", recipe);
      const res = await fetch(`http://localhost:3000/recipes/${recipe.id}`, {
        method: "PUT",
        body: JSON.stringify(recipe),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Update success:", data);
      return data;
    } catch (error) {
      console.error("Update recipe error:", error.message);
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
      .addCase(updateRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.loading = false;

        const updatedRecipe = action.payload;

        state.recipes = state.recipes.map((recipe) =>
          recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        );
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recipeSlice.reducer;

