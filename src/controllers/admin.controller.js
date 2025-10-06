const db = require("../models");
const User = db.user;
const Role = db.role;

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).send({ message: "No users found" });
    }
    return res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Error in fetching users" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ message: `User with ID: ${userId} not found` });
    }

    const userRole = await Role.findById(user.role);

    if (userRole.name === "Admin") {
      return res.status(404).send({ message: `Cannot delete Admin role` });
    }

    const isUserDeleted = await User.findByIdAndDelete(userId);
    if (isUserDeleted) {
      return res.status(200).send({
        message: `User with ID : ${userId} deleted successfully`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error in Deleting user",
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ message: `No user found with ID ${userId}` });
    }
    const isUserUpdated = await Book.findByIdAndUpdate(userId, req.body);
    if (!isUserUpdated) {
      return res
        .status(500)
        .send({ message: `Error in updating user with ID ${userId}` });
    }
    return res
      .status(200)
      .send({ message: `User with ID ${userId} updated successfully` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
