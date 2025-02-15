const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');
const { uploadPDF, fetchAllCvs } = require('../controllers/cvController');  // Ensure this import is correct
const router = express.Router();
const multer = require('multer');

// Set up multer to handle file uploads (store file in memory)
const storage = multer.memoryStorage();  // Store file in memory (can be changed to disk storage)
const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 50 * 1024 * 1024 }  // Limit file size to 50MB
});

// Route for uploading PDF (admin only)
router.post('/upload_pdf',upload.array('pdf' , 4), verifyToken, verifyRole('admin'), uploadPDF);
router.get('/fetch_all_CVs', verifyToken, verifyRole('admin'), fetchAllCvs);

module.exports = router;
