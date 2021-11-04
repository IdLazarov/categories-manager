import React, { useEffect, useState } from "react";
import "../styles/App.css";
import Modal from "react-modal";

const Category = (props) => {
  const { id, name, type, order } = props.category;
  const categories = props.categories;
  const setCategories = props.setCategories;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categoryType, setCategoryType] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryOrder, setCategoryOrder] = useState("");

  useEffect(() => {
    Modal.setAppElement("*");
  }, []);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const deleteHandler = async () => {
    try {
      const response = fetch(`http://localhost:5000/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, type, order }),
      });

      if (response) {
        const afterDeleteOfCategory = categories.filter(
          (item) => item.id !== id
        );
        setCategories(afterDeleteOfCategory);
        console.log(`Category with id ${id} have been deleted`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateHandler = async () => {
    try {
      const updatedCategory = {
        id: id,
        name: categoryName,
        type: categoryType,
        order: categoryOrder,
      };
      const response = fetch(`http://localhost:5000/categories/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      });

      if (response) {
        const updatedCategories = categories.map((item) => {
          if (parseFloat(item.id) === parseFloat(updatedCategory.id)) {
            item = updatedCategory;
          }
          return item;
        });

        setCategories(updatedCategories);
        console.log(
          `Category with id ${id} have been updated with name ${updatedCategory.name}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitAndClose = (submitFunction, closeFunction) => {
    submitFunction();
    setTimeout(() => closeFunction(), 0);
  };

  return (
    <div className="category">
      <li className="category-item">
        <div className="category-card">
          <h5 className="category-title">{name}</h5>
          <p className="category-type">{`${type} type`}</p>
          <p className="category-order">{`Order number: ${order}`}</p>
        </div>
      </li>
      <div className="buttons-container">
        <button
          onClick={handleOpenModal}
          className="update-button"
          type="button"
        >
          <i className="fas fa-edit"></i>
        </button>
        <button onClick={deleteHandler} className="delete-button" type="button">
          <i className="fas fa-trash"></i>
        </button>
      </div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={modalIsOpen}
        contentLabel="onRequestClose Example"
        onRequestClose={handleCloseModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <form>
          <h2 className="modal-h2">Update the item</h2>
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
          <button
            className="category-button"
            onClick={() => submitAndClose(updateHandler, handleCloseModal)}
            type="submit"
          >
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Category;
