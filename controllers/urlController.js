const URL = require("../models/url");
const { nanoid } = require("nanoid");

const getAnalyticsById = async (req, res) => {
  const { shortId } = req.params;
  if (!shortId)
    return res.status(400).json({ error: "short id is not passed" });
  //first find and then show analytics
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    anlaytics: result.visitHistory,
  });
};

const getRedirectURL = async (req, res) => {
  //get the short id and then find it
  const { shortId } = req.params;
  if (!shortId) return res.status(400).json({ error: "pass shortId" });
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
          ip: req.ip,
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
};

const postNewUrl = async (req, res) => {
  //user will pass the url
  //take shortid and give it to the database to store
  //and create the url using model
  // and save it in database
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "url is required" });
  const shortId = nanoid(8);
  await URL.create({
    shortId,
    redirectURL: url,
    visitHistory: [],
  });
  return res.status(200).json({ id: shortId, message: "Created Successfully" });
};

module.exports = {
  getAnalyticsById,
  getRedirectURL,
  postNewUrl,
};
