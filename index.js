const express = require("express");
const mongoose = require("mongoose");
const urlRouter = require("./routes/urlRoute");
const URL = "mongodb://localhost:27017/urlDB";

const app = express();
app.use(express.json());
app.use("/url", urlRouter);

const PORT = 8001;

mongoose.connect(URL);

app.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}`);
});
