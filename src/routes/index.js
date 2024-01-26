const router = require("express").Router();
router.use("/auth", require("./authRoute"));
router.use(require("./passwordRoute"));

module.exports = router;
