import React, { useState, useEffect } from "react";
import "./styles/App.css";
import CategoriesList from "./components/CategoriesList";
import Form from "./components/Form";

function App() {
  const [categories, setCategories] = useState([]);

  const url = "http://localhost:5000/categories/data";

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(url, {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Categories manager</h1>
      </header>
      <Form
        setCategories={setCategories}
        categoriesId={categories.length + 1}
      />
      {categories.length ? (
        <CategoriesList categories={categories} setCategories={setCategories} />
      ) : (
        `No data yet...`
      )}
    </div>
  );
}

export default App;
