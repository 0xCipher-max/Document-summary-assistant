const Tesseract = require("tesseract.js");

// Function to extract text from an image using Tesseract.js
exports.extractText = async (imagePath) => {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(
      imagePath,
      "eng", // Language: English
      {
        logger: (m) => console.log(m), // Optional logger to track OCR progress
      }
    );
    return text;
  } catch (error) {
    console.error("Error in OCR text extraction:", error);
    throw new Error("OCR text extraction failed");
  }
};
