const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');
const { createInterview, deleteInterview, updateInterview, fetchAllInterviews } = require('../controllers/interviewController');
const router = express.Router();

router.post('/create', verifyToken, verifyRole('admin'), createInterview);
router.delete('/delete/:id', verifyToken, verifyRole('admin'), deleteInterview);
router.patch('/update/:id', verifyToken, verifyRole('admin'), updateInterview);
router.get('/fetch_all', verifyToken, verifyRole('admin'), fetchAllInterviews); // New route for fetching all interviews

module.exports = router;