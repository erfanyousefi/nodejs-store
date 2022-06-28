const { TransactionController } = require("../../http/controllers/admin/payment/transactions");

const router = require("express").Router();
router.get("/list", TransactionController.getAllTransactions)
module.exports = {
    AdminApiTransactionRouter: router
}