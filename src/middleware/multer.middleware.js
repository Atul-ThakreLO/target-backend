import multer from "multer";
import ErrorHandler from "../helper/Error.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});


const fileFilter = (req, file, cb) => {
  // Accept only certain file types
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Accept the file
  } else {
    cb(new ErrorHandler("Only PDF files are allowed!", 500), false); // Reject the file
  }
};
const avatarFilter = (req, file, cb) => {
  // Accept only certain file types
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); // Accept the file
  } else {
    cb(new ErrorHandler("Only .jpeg and .png files are allowed!", 500), false); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: fileFilter
});

const avatar = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: avatarFilter,
});

export default upload;
export { avatar };
