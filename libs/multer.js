const multer = require("multer");
const path = require("path");

const filename = (req, file, callback) => {
  let fileName = Date.now() + path.extname(file.originalname);
  callback(null, fileName);
};

const generateStorage = (destination) => {
  return multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, destination);
    },
    filename: filename,
  });
};

module.exports = {
  image: multer({
    storage: generateStorage("./public/images"),
    fileFilter: (req, file, callback) => {
      let allowedMimetypes = [
        "image/png", 
        "image/jpg", 
        "image/jpeg"
    ];
      if (allowedMimetypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        let err = new Error(`Only ${allowedMimetypes} are allowed to upload!`);
        callback(err, false);
      }
    },
    onError: (err, next) => {
      next(err);
    },
  }),
  video: multer({
    storage: generateStorage("./public/videos"),
    fileFilter: (req, file, callback) => {
      let allowedMimetypes = [
        "video/mp4", 
        "video/mov", 
        "video/mkv"
    ];
      if (allowedMimetypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        let err = new Error(`Only ${allowedMimetypes} are allowed to upload!`);
        callback(err, false);
      }
    },
    onError: (err, next) => {
      next(err);
    },
  }),
  document: multer({
    storage: generateStorage("./public/documents"),
    fileFilter: (req, file, callback) => {
      let allowedMimetypes = [
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
      if (allowedMimetypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        let err = new Error(`Only ${allowedMimetypes} are allowed to upload!`);
        callback(err, false);
      }
    },
    onError: (err, next) => {
      next(err);
    },
  }),
  audio: multer({
    storage: generateStorage("./public/audios"),
    fileFilter: (req, file, callback) => {
      let allowedMimetypes = [
        "audio/mpeg",
        "audio/wav",
        "audio/ogg",
        "audio/mp4",
        "audio/m4a",
    ];
      if (allowedMimetypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        let err = new Error(`Only ${allowedMimetypes} are allowed to upload!`);
        callback(err, false);
      }
    },
    onError: (err, next) => {
      next(err);
    },
  }),
};
