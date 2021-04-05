const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const TransactionValidation = require('../../validations/transaction.validation');
const TransactionController = require('../../controllers/transaction.controller');

const router = express.Router();


router
  .route('/')
  .post(auth('manageTransactions'), validate(TransactionValidation.createTransaction), TransactionController.createTransaction)
  .get(auth('getTransactions'), validate(TransactionValidation.getTransactions), TransactionController.getTransactions);

router
  .route('/:transactionId')
  .get(auth('getTransactions'), validate(TransactionValidation.getTransaction), TransactionController.getTransaction)
  .patch(auth('manageTransactions'), validate(TransactionValidation.updateTransaction), TransactionController.updateTransaction)
  .delete(auth('manageTransactions'), validate(TransactionValidation.deleteTransaction), TransactionController.deleteTransaction);

module.exports = router;
