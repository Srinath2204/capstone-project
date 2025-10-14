const adminService = require("../services/admin.service");

exports.getUsers = (req, res) => {
  adminService.getUsers(req, res);
};

exports.deleteUser = (req, res) => {
  adminService.deleteUser(req, res);
};

exports.editUser = async (req, res) => {
  adminService.editUser(req, res);
};
