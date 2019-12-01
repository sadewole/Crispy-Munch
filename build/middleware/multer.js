"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer.default.diskStorage({
  filename: function filename(req, file, cb) {
    cb(null, "".concat(new Date().toISOString().replace(/:/g, '-'), " ").concat(file.originalname));
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  //  filter image type
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Image must be jpeg or png format'), false);
  }
};

var uploads = (0, _multer.default)({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
var _default = uploads;
exports.default = _default;