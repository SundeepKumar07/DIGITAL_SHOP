import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()) + 1e9;
        // const filename = file.originalname.split(".")[0];
        const baseName = path.basename(file.originalname, path.extname(file.originalname))
            .replace(/\s+/g, '-')        // replaces spaces with dashes
            .replace(/[()]/g, '')        // removes parentheses
            .replace(/[^a-zA-Z0-9-_]/g, ''); // removes other special characters

        cb(null, `${baseName}-${uniqueSuffix}.png`);
    },
});

export const upload = multer({ storage: storage });