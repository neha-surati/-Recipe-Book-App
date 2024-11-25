import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe, updateRecipe } from "../feature/Recipe/RecipeSlice";
import RecipeList from "./RecipeList";

function RecipeForm() {
  let [recipe, setRecipe] = useState({});
  let [updateId, setUpdateId] = useState("");

  const dispatch = useDispatch();

  let handleInput = (e) => {
    let { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
    console.log(recipe);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(recipe);

    if (updateId === "") {
      dispatch(addRecipe(recipe));
    } else {
      dispatch(updateRecipe(recipe));
      setUpdateId("");
    }
    setRecipe({});
  };

  let updateRecipeHandler = (recipe) => {
    setRecipe(recipe);
    setUpdateId(recipe.id);
  };

  return (
    <>
      <div className="container">
        <h4 className="text-center mt-4 text-decoration-underline">
          Add Recipe
        </h4>
        <form className="w-75 mx-auto mt-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <b>Recipe Title:</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={handleInput}
              value={recipe.title || ""}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Ingredients:</b>
            </label>
            <textarea
              className="form-control"
              name="ingredients"
              rows="4"
              onChange={handleInput}
              value={recipe.ingredients || ""}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Cooking Time (in minutes):</b>
            </label>
            <input
              type="number"
              className="form-control"
              name="cookingTime"
              onChange={handleInput}
              value={recipe.cookingTime || ""}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Category:</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="category"
              onChange={handleInput}
              value={recipe.category || ""}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <RecipeList updateRecipe={updateRecipeHandler} />
      </div>
    </>
  );
}

export default RecipeForm;
