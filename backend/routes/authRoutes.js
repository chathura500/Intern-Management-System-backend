const express = require('express');
const {register_intern,register_institute, resigter_admin, adminDashboard, internDashboard, instituteDashboard, login, logout } = require('../controllers/authController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register_intern',register_intern);
router.post('/register_institute',register_institute);
router.post('/register_admin',resigter_admin);

router.get('/admin_dashboard', verifyToken, verifyRole('admin'), adminDashboard);
router.get('/intern_dashboard', verifyToken, verifyRole('intern'), internDashboard);
router.get('/institute_dashboard', verifyToken, verifyRole('institute'), instituteDashboard);

router.post('/login',login);
router.post('/logout',verifyToken,logout);

module.exports = router;