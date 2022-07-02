const { NamespaceController } = require("../../http/controllers/support/namespace.controller");
const router = require("express").Router();
router.post("/add", NamespaceController.addNamespace)
router.get("/list", NamespaceController.getListOfNamespaces)
module.exports = {
    ApiNamespaceRouter : router
}