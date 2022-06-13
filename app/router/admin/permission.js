const { PermissionControlller } = require("../../http/controllers/admin/RBAC/permission.controller")

const router = require("express").Router()
router.get("/list", PermissionControlller.getAllPermissions)
router.post("/add", PermissionControlller.createNewPermission)
router.delete("/remove/:id", PermissionControlller.removePermission)
router.patch("/update/:id", PermissionControlller.updatePermissionByID)
module.exports = {
    AdminApiPermissionRouter : router
}