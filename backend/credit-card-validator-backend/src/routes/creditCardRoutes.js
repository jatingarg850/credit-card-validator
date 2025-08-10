const express = require('express');
const CreditCardController = require('../controllers/creditCardController');

const router = express.Router();
const creditCardController = new CreditCardController();

router.post('/validate', creditCardController.validateCard.bind(creditCardController));
router.post('/suggest-digit', creditCardController.suggestDigit.bind(creditCardController));

module.exports = () => router;