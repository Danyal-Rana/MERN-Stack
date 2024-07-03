import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/MERN-Stack/Chai aur Backend/Project/public/temp/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

export const upload = multer({
    storage,
});