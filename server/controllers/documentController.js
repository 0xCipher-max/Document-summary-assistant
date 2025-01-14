const Document = require("../models/Document");
const ocrService = require("../services/ocrService");
const summaryService = require("../services/summaryService");
const fs = require("fs");
const path = require("path");
// const summaryService = require("../services/summaryService");


// Controller for uploading documents and processing them
exports.uploadDocument = async (req, res) => {
  try {
    const { filename, path: filePath } = req.file;

    // Save document metadata in MongoDB
    const document = new Document({
      filename,
      filePath,
    });

    await document.save();

    // If it's an image (needs OCR), process with OCR
    let text = "";
    if (
      filename.endsWith(".jpg") ||
      filename.endsWith(".jpeg") ||
      filename.endsWith(".png")
    ) {
      text = await ocrService.extractText(filePath); // OCR service for text extraction from images
    } else if (filename.endsWith(".pdf")) {
      // If it's a PDF, extract text (you can add PDF parsing logic here)
      text = "PDF parsing not implemented yet."; // Placeholder, can be extended later
    }

    // Save extracted text to the document in the database
    document.text = text;
    await document.save();

    // Generate summary for the extracted text
    const summary = await summaryService.generateSummary(text);

    // Send response back with the document details and summary
    res.status(200).json({
      message: "Document uploaded and processed successfully",
      document,
      summary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading or processing document" });
  }
};
exports.summarizeDocument = async (req, res) => {
  try {
    // Extract the text content (it could be from the file or OCR result)
    const documentText = req.body.text; // Assume we have the text from OCR/PDF parsing

    // Generate summary using OpenAI
    const summary = await summaryService.generateSummary(documentText);

    // Return the summary to the frontend
    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate summary" });
  }
};


