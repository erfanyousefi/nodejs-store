const createHttpError = require("http-errors");
const { PermissionsModel } = require("../../models/permission");
const { RoleModel } = require("../../models/role");
const { PERMISSIONS } = require("../../utils/constans");

function checkPermission(requiredPermissions = []) {
    return async function (req, res, next) {
      try {
        const allPermissions = requiredPermissions.flat(2)
        const user = req.user;
        const role = await RoleModel.findOne({title: user.Role})
        const permissions = await PermissionsModel.find({_id: {$in : role.permissions}})
        const userPermissions = permissions.map(item => item.name)
        const hasPermission = allPermissions.every(permission => {
            return userPermissions.includes(permission)
        })
        if(userPermissions.includes(PERMISSIONS.ALL)) return next()
        if (allPermissions.length == 0 || hasPermission) return next();
        throw createHttpError.Forbidden("شما به این قسمت دسترسی ندارید");
      } catch (error) {
        next(error);
      }
    };
  }
  module.exports = {
    checkPermission
  }