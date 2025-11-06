import multer from "multer";

// Use memory storage for direct Cloudinary uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
