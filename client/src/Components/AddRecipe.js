import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !ingredients || !instructions) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());
      
      const response = await fetch("http://localhost:5000/auth/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          ingredients: ingredientsArray,
          instructions,
          imageUrl,
        }),
      });

      if (response.ok) {
        toast.success("Recipe added successfully!");
        setTitle("");
        setIngredients("");
        setInstructions("");
        setImageUrl("");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to add recipe");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast.error("An error occurred while adding the recipe");
    }
  };

  return (
    <div className="main-content">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          color: '#2d3748',
          background: 'linear-gradient(135deg, #ff9a9e 0%, #a8edea 50%, #fed6e3 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          Add New Recipe
        </h1>
        <p style={{ color: '#718096', fontSize: '1.1rem' }}>
          Share your favorite recipe with the community
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="title">Recipe Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients *</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients separated by commas (e.g., 2 cups flour, 1 cup sugar, 3 eggs)"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions *</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter step-by-step cooking instructions"
            rows="6"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL (Optional)</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Recipe
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddRecipe;
