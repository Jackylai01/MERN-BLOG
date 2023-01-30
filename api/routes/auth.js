const router = require("express").Router();
const userCtrl = require("../controllers/auth");

router.get("/", (req, res) => {
  res.json({ msg: "hi" });
});
router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);

module.exports = router;
