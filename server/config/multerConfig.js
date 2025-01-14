// server/config/multerConfig.js
const multer = require("multer");
const path = require("path");

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set destination for file upload
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Set filename to current timestamp + file extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter function (optional, for validating file types)
const fileFilter = (req, file, cb) => {
  // Accept only PDF and image files
  const allowedTypes = /pdf|jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF and image files are allowed."));
  }
};

// Initialize multer with storage and file filter
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50 MB
});

module.exports = upload;
