import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../actions/recipeActions';

const RecipeList = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipes!</p>;

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;

