import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const response = await axios.get('http://localhost:3000/recipes'); 
  return response.data; 
});
