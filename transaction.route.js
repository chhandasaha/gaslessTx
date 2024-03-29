const express = require('express');
const router = express.Router();

// Require the controllers
const transaction_controller = require('./transaction.controller');

// create a new accounts
// router.post('/newAccount', account_controller.new_account);

router.post('/transaction', transaction_controller.transfer);

module.exports = router;
