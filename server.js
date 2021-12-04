const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const port = 3000;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
}).then(() => console.log("mongodb connected"))
.catch(err => console.log(err))

//require(apiRoute)(app);
require("./routes/exerciseRoutes")(app);
require("./routes/apiRoutes")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
