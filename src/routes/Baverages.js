const express = require('express');
const router = express.Router();

const baverageController = require('../app/controllers/BaverageControllers');
const authMiddleware = require('../app/middlewares/authMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');



router.post('/newbaverage',adminMiddleware, baverageController.newbaverage);
router.get('/create',adminMiddleware, baverageController.create);
router.get('/:id/edit',adminMiddleware, baverageController.edit);
router.post('/handle-form-actions',adminMiddleware, baverageController.handleFormActions);
router.delete('/:id',adminMiddleware, baverageController.delete);
router.delete('/:id/force',adminMiddleware, baverageController.forceDelete);
router.put('/:id',adminMiddleware, baverageController.update);
router.patch('/:id/restore',adminMiddleware, baverageController.restore);
router.get('/:slug', baverageController.show);

module.exports = router;
