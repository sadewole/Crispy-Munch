import multer from 'multer';

const storage = multer.diskStorage({
  filename(req, file, cb) {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')} ${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  //  filter image type
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Image must be jpeg or png format'), false);
  }
};

const uploads = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

export default uploads;
