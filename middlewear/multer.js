const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/uploadedImages');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
