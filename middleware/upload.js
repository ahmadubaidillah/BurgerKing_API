import multer from "multer";
import path from "path";

const maxSize = 1024 * 1024;

const multerUpload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      console.log(file.name);
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    },
    limits: maxSize,
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext == ".png" || ext == ".jpg") {
      cb(null, true);
    } else {
      const erorr = {
        message: "file must be a PNG or JPEG file",
      };
      cb(erorr, false);
    }
  },
});

export const upload = (req, res, next) => {
  const multerSingle = multerUpload.single("image");
  multerSingle(req, res, (err) => {
    if (err) {
      console.log(err);
      res.json({ messasge: "error when upload file", err });
    } else {
      next();
    }
  });
};
