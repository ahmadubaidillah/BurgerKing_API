import userModel from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userController = {
  register: async (req, res) => {
    const { name, email, phone_number, password } = req.body;

    // const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, 10);
    const data = { name, email, phone_number, hashPassword };

    try {
      await userModel.insert(name, email, phone_number, hashPassword);
      res.status(201).json({ msg: "regristasi berhasil", name });
    } catch (error) {
      res.json(error);
      console.log(error.message);
    }
  },

  listUserByid: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await userModel.findById(id);
      res.status(200).json({ msg: "Get data by id succes", user });
    } catch (error) {
      console.log(error.message);
    }
  },
  listUserByPhone: async (req, res) => {
    const { phone_number, password } = req.body;

    try {
      const user = await userModel.findByPhone(phone_number);
      console.log(user);
      const match = await bcrypt.compare(password, user.rows[0].password);
      console.log(match);

      if (!match) return res.status(400).json({ msg: "password salah!" });

      const id = user.rows[0].id;
      const name = user.rows[0].name;
      const email = user.rows[0].email;
      const accessToken = jwt.sign(
        { id, name, email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.json({ msg: "login succes", accessToken });
    } catch (error) {
      console.log(error.message);
    }
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    const data = { name, email };
    try {
      const user = await userModel.editById(id, data);
      console.log(user);
      res.json({ msg: "edit data succes" });
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default userController;
