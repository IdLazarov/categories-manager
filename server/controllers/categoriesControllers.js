const { categoriesData } = require("../categoriesData");

const getCategories = async (req, res) => {
  res.send(categoriesData);
};

const createCategory = async (req, res) => {
  categoriesData.push(req.body);
  res.send(categoriesData);
};

const updateCategory = async (req, res) => {
  categoriesData.map((category) => {
    if (parseFloat(category.id) === parseFloat(req.body.id)) {
      categoriesData.splice(category.id - 1, 1, req.body);
    }
    return category.id;
  });

  res.send(`Category with id ${req.body.id} is updated to ${req.body}`);
};

const deleteCategory = async (req, res) => {
  categoriesData.map((category) => {
    if (parseFloat(category.id) === parseFloat(req.body.id)) {
      categoriesData.splice(category.id - 1, 1);
    }
    return category.id;
  });
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
