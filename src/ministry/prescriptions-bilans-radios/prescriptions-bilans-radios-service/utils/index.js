

exports.genID = () => {
    const id =  Array.from({ length: 8 }, () => Math.random().toString(36).charAt(2)).join('').toUpperCase();
    return id
}

exports.imageOnly = (req, file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}

exports.pdfOnly = (req, file, cb) => {
  // Allowed ext
  const filetypes = /pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}