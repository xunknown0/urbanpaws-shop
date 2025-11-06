import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: "xunknown0",           
  api_key: "731414831235491", 
  api_secret: process.env.CLOUDINARY_SECRET, 
  secure: true,
});

export default cloudinary;
