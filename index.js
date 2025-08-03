const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const urlRouter = require("./routes/urlRoute");
const _URL = "mongodb://localhost:27017/urlDB";
const URL = require("./models/url");

const app = express();
app.use(express.json());

// setting the views using ejs
app.set("view engine", ejs);
app.set("views", path.resolve("./views"));

app.use("/url", urlRouter);
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  res.render("home", { urls: allUrls, name: "Deepak Tiwari" });
});

const PORT = 8001;

mongoose.connect(_URL);

app.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}`);
});
