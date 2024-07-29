import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) { // req from the user file to save cb is just a callback for further code
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname) // code from hitesh chaudary
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  export const upload = multer({ storage: storage })