import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../components/feature/Recipe/RecipeSlice';

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !ingredients) {
      alert('Title and Ingredients are required');
      return;
    }

    dispatch(addRecipe({ title, ingredients }));
    setTitle('');
    setIngredients('');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h3>Add New Recipe</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Recipe Title</label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Enter recipe title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label">Ingredients</label>
              <textarea
                id="ingredients"
                className="form-control"
                placeholder="Enter ingredients, separated by commas"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows="4"
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Add Recipe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
