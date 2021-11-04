import React from "react";
import Category from "./Category";

const CategoriesList = ({ categories, setCategories }) => {
  categories.sort(
    (first, next) => parseFloat(next.order) - parseFloat(first.order)
  );

  return (
    <div className="categories-container">
      <ul className="categories-list">
        {categories.map((category) => {
          return (
            <Category
              key={category.id}
              category={category}
              categories={categories}
              setCategories={setCategories}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesList;
