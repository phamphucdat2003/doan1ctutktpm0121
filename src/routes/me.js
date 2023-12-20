const express = require('express');
const router = express.Router();
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const meController = require('../app/controllers/MeControllers');

router.get('/stored/baverages', meController.storedBaverage);
router.get('/stored/orderdetails',meController.storedOrderdetails);
router.get('/finished/orderdetails',meController.finishedOrderdetails);
router.get('/trash/baverages', meController.trashBaverage);


module.exports = router;
