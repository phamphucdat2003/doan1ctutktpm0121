const express = require('express');
const router = express.Router();

const ManageController = require('../app/controllers/ManageControllers');

router.get('/:id/edit-User', ManageController.editUser);
router.delete('/:id/force', ManageController.forceDeleteUser);
router.put('/:id', ManageController.updateUser);

router.get('/', ManageController.viewUser);

module.exports = router;
