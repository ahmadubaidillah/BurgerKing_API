import db from "../config/db.js";

const menuModel = {
  insert: (name, price, amount, image) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into menus (name,price,amount,image) values ('${name}',${price},${amount},'${image}')`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  list: () => {
    return new Promise((resolve, reject) => {
      db.query(`select * from menus `, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};

export default menuModel;
