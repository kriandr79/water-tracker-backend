import multer from "multer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const tempDir = path.join(
  dirname(fileURLToPath(import.meta.url)),
  "../",
  "temp"
);

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

export default upload;
