const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    // ============= SHORTEN THE LINK ============
    const code = shortid.generate();

    const existing = await Link.findOne({ from }); // <===== checks if link has been created

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + "/t/" + code;

    // =========== create shortened link route
    const link = new Link({
        code, to, from, owner: req.user.userId
    })

    await link.save(); // <====== saves the newly created link

    res.status(201).json({ link }) // <======= displays the status and the link

  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId }); // < === addresses to the DB for all the links of this user
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
});

module.exports = router;
