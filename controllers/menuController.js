import menuModel from "../models/menu_model.js";
import cloudinary from "../helper/cloudinary.js";

const userController = {
  addMenu: async (req, res) => {
    try {
      const { name, price, amount } = req.body;
      const img = await cloudinary.uploader.upload(req.file.path);
      console.log(img);
      const menu = await menuModel.insert(name, price, amount, img.url);
      res.json(menu);
    } catch (error) {
      console.log(error.message);
    }
  },

  listMenu: async (req, res) => {
    try {
      const menu = await menuModel.list();
      res.json(menu);
    } catch (error) {
      console.log(error.message);
    }
  },
};
export default userController;
