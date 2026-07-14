const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
console.log(cloudinary.config());

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "library_books",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
  }),
});

const upload = multer({ storage: storage });

module.exports = { upload, cloudinary };