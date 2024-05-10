const router = require("express").Router();

router.use(require("./patient/index"));
router.use('/care-giver', require("./careGiver"));
module.exports = router;
