import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, fetchRecipes } from "../feature/Recipe/RecipeSlice";

function RecipeList({ updateRecipe }) {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h4 className="text-center">Recipe List</h4>
      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-4">
            <div className="card mb-3">
              <img
                src={recipe.image}
                className="card-img-top"
                alt={recipe.name}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">
                  <b>Ingredients:</b> {recipe.ingredients}
                </p>
                <p className="card-text">
                  <b>Instructions:</b> {recipe.instructions}
                </p>
              </div>
              <div className="mx-3 mb-3">
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(deleteRecipe(recipe.id))}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning mx-3"
                  onClick={() => updateRecipe(recipe)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
