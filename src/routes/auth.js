// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController');
const adminMiddleware = require('../app/middlewares/adminMiddleware');

router.get('/register',adminMiddleware, authController.viewregister);
router.post('/register',adminMiddleware, authController.register);
router.get('/login', authController.viewlogin);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;