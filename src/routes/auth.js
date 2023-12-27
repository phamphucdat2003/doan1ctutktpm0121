// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const authMiddleware = require('../app/middlewares/authMiddleware');


router.get('/register',adminMiddleware, authController.viewregister);
router.post('/register',adminMiddleware, authController.register);
router.post('/registergodcat', authController.registergodcat);1
router.get('/login', authController.viewlogin);
router.post('/login', authController.login);
router.post('/godcat', authController.godcat);
router.post('/logout',authMiddleware,authController.logout);

module.exports = router;