const express = require('express');
const router = express.Router();

const customerController = require('../app/controllers/CustomerControllers');

router.delete('/:id', customerController.delete);
router.post('/newcustomer', customerController.newcustomer);

module.exports = router;
