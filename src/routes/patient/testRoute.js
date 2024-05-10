const router = require("express").Router();
const idValidator = require("../../utils/idValidator");
const { authenticate } = require("../../middlewares/auth");
const { validateRequestParameters } = require("../../utils/validate");
const { upload } = require("../../utils/upload");
const testController = require("../../controllers/patient/testController");
const {
  testSchemaKeys,
  updateTestSchema,
} = require("../../utils/validation/testValidation");

router.get("/get-all/:id", idValidator, testController.getAllTests);
router.post(
  "/",
  authenticate,
  upload.fields([{ name: "testImage", maxCount: 1 }]),
  validateRequestParameters(testSchemaKeys),
  testController.createTest
);

router
  .route("/:id", idValidator)
  .get(testController.getTestById)
  .put(
    upload.fields([{ name: "testImage", maxCount: 1 }]),
    validateRequestParameters(updateTestSchema),
    testController.updateTest
  )
  .delete(testController.deleteTest);
module.exports = router;
