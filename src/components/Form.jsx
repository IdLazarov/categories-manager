import React, { useState } from "react";

const Form = ({ setCategories, categoriesId }) => {
  const [categoryType, setCategoryType] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryOrder, setCategoryOrder] = useState("");

  const newCategory = {
    id: categoriesId,
    name: categoryName,
    type: categoryType,
    order: categoryOrder || 0,
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const createCategory = async () => {
      try {
        const response = fetch("http://localhost:5000/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory),
        });

        if (response) {
          setCategories((categories) => [...categories, newCategory]);
          console.log(newCategory);
        }
      } catch (error) {
        console.error(error);
      }
    };
    createCategory();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Category name:</label>
        <input
          onChange={(e) => setCategoryName(e.target.value)}
          type="text"
          className="category-name"
          value={categoryName}
          required
        />
        <label>Category order:</label>
        <input
          onChange={(e) => setCategoryOrder(e.target.value)}
          type="text"
          className="category-order"
          value={categoryOrder}
        />
        <label>Category type:</label>
        <select
          onChange={(e) => setCategoryType(e.target.value)}
          type="text"
          className="category-type"
          value={categoryType || setCategoryType("Stream")}
          required
        >
          <option value="Stream">Stream</option>
          <option value="Movie">Movie</option>
          <option value="Radio">Radio</option>
          <option value="Series">Series</option>
        </select>
        <button className="category-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
      </form>
    </div>
  );
};

export default Form;
