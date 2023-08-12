import db from "../config/db.js";

const userModel = {
  insert: (name, email, phone_number, password) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into users (name,email,phone_number,password) values ('${name}','${email}','${phone_number}','${password}')`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  findByPhone: (phone_number) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from users where phone_number = '${phone_number}'`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from users where id = ${id}`, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  editById: (id, { name, email }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update users set name = '${name}', email='${email}' where id = ${id}`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};

export default userModel;
