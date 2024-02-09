const router = require("express").Router();
router.use("/auth", require("./authRoute"));
router.use("/diary", require("./diaryRoute"));
router.use(require("./passwordRoute"));

module.exports = router;
