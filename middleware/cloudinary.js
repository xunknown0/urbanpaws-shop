import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with your account credentials
cloudinary.config({
  cloud_name: "xunknown0",            // your Cloudinary cloud name
  api_key: "731414831235491",         // your Cloudinary API key
  api_secret: process.env.CLOUDINARY_SECRET, // keep your secret in .env
  secure: true,
});

export default cloudinary;
