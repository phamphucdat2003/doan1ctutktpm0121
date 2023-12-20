const express = require('express');
const router = express.Router();

const baverageController = require('../app/controllers/BaverageControllers');
const authMiddleware = require('../app/middlewares/authMiddleware');


router.post('/newbaverage',authMiddleware, baverageController.newbaverage);
router.get('/create',authMiddleware, baverageController.create);
router.get('/:id/edit',authMiddleware, baverageController.edit);
router.post('/handle-form-actions',authMiddleware, baverageController.handleFormActions);
router.delete('/:id',authMiddleware, baverageController.delete);
router.delete('/:id/force',authMiddleware, baverageController.forceDelete);
router.put('/:id',authMiddleware, baverageController.update);
router.patch('/:id/restore',authMiddleware, baverageController.restore);
router.get('/:slug', baverageController.show);

module.exports = router;
