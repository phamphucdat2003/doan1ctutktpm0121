const express = require('express');
const router = express.Router();
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const meController = require('../app/controllers/MeControllers');

router.get('/stored/baverages',adminMiddleware, meController.storedBaverage);
router.get('/stored/orderdetails',meController.storedOrderdetails);
router.get('/finished/orderdetails',meController.finishedOrderdetails);
router.get('/trash/baverages',adminMiddleware, meController.trashBaverage);
router.get('/communication', meController.communication);
router.post('/communication', meController.communicationpost);


module.exports = router;
