const express = require("express");
const router = express.Router();
const {
  postNewUrl,
  getRedirectURL,
  getAnalyticsById,
} = require("../controllers/urlController");

router.post("/", postNewUrl);
router.get("/:shortId", getRedirectURL);
router.get("/analytics/:shortId", getAnalyticsById);

module.exports = router;
