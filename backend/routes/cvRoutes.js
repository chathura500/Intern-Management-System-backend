const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');
const { uploadPDF, fetchAllCvs, fetchLimitedData, deleteSelectedData, updateApplicationStatus } = require('../controllers/cvController');  // Ensure this import is correct
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
router.get('/fetch_limited_data/:_id', verifyToken, verifyRole('admin'), fetchLimitedData);
router.delete('/delete_selected_data/:_id', verifyToken, verifyRole('admin'), deleteSelectedData);
router.patch('/update_application_status/:_id', verifyToken, verifyRole('admin'), updateApplicationStatus);

module.exports = router;
