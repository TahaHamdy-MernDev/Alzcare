const router = require("express").Router();
router.use(require("./passwordRoute"));
router.use("/auth", require("./authRoute"));
router.use("/diary", require("./diaryRoute"));
router.use("/community", require("./communityRoute"));

module.exports = router;
