const router = require("express").Router();
const { upload } = require("../utils/upload");
const { authenticate } = require("../middlewares/auth");
const profileController = require("../controllers/profileController");
const { validateRequestParameters } = require("../utils/validate");
const {
  updateProfileKeys,
  changePasswordKeys,
} = require("../utils/validation/profileValidation");
router.put(
  "/change-profile-image",
  authenticate,
  upload.fields([{ name: "profileImg", maxCount: 1 }]),
  profileController.changeUserProfileImage
);
router.put(
  "/update-profile",
  authenticate,
  validateRequestParameters(updateProfileKeys),
  profileController.editUserProfile
);
router.put(
  "/change-password",
  authenticate,
  validateRequestParameters(changePasswordKeys),
  profileController.changeOldPassword
);
module.exports = router;
