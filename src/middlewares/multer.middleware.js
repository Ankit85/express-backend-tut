import multer from "multer";

const TEMP_FILE_PATH = process.env.TEMP_FILE_PATH;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_FILE_PATH);
  },
  filename: function (req, file, cb) {
    /*   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); */
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
