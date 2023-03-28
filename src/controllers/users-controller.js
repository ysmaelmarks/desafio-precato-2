import { Op } from "sequelize";
import User from "../models/users-model.js";
import validator from "validator";

class UsersController {
  static listAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  };

  static listUsersByDate = async (req, res) => {
    try {
      const { start_date, end_date } = req.params;
      if (!start_date || !end_date) {
        return res.status(400).send({ error: "dates required!" });
      }
      const user = await User.findAll({
        where: {
          created_at: {
            [Op.between]: [new Date(start_date), new Date(end_date)],
          },
        },
      });
      if (user.length === 0) {
        return res.status(404).send({ error: "No data available for the given dates!" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  };

  static createUser = async (req, res) => {
    const { name, email, cpf, phone } = req.body;

    if (typeof email !== "string" || !email) {
      return res.status(400).send({ error: "Invalid email" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: "Invalid email" });
    }

    try {
      const newUser = await User.create({ name, email, cpf, phone });
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).send({ error: "Email already exists" });
      }
      return res.status(500).send({ error: "Internal server error" });
    }
  };

  static updateUser = async (req, res) => {
    const { name, email, cpf, phone } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: "Invalid email" });
    }

    try {
      const { id } = req.params;
      const [updatedRowsCount, updatedRows] = await User.update(
        { name, email, cpf, phone },
        { where: { id }, returning: true }
      );
      if (updatedRowsCount === 0) {
        return res.status(404).send({ error: "User not found" });
      }
      return res.status(200).json(updatedRows[0]);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRowsCount = await User.destroy({ where: { id } });
      if (deletedRowsCount === 0) {
        return res.status(404).send({ error: "User not found" });
      }
      return res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  };
}

export default UsersController;
