const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const documentController = require("../controllers/documentController");

// Route for uploading documents
router.post(
  "/upload",
  upload.single("file"),
  documentController.uploadDocument
);
router.post("/summarize", documentController.summarizeDocument);


module.exports = router;
