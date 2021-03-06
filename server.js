const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// Routes
app.use(require("./routes/exerciseRoutes"));
app.use(require("./routes/apiRoutes"));

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
