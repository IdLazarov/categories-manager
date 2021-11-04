const express = require("express");
const cors = require("cors");

const app = express();

const categoriesRouters = require("./routes/categoriesRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/categories", categoriesRouters);

app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

app.listen("5000", () => {
  console.log("The server is running on port 5000...");
});
