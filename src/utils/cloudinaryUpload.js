import cloudinary from "../config/cloudinary.config.js";
// import { v2 as cloudinary } from "cloudinary";

export const cloudinaryUpload = async (file, name) => {
  try {
    if (file.mimetype.startsWith("image/")) {
      const upload = await cloudinary.uploader.upload(file.path, {
        folder: "images",
        display_name: name + "display",
        public_id: name,
        resource_type: "image",
      });
      return upload;
    } else if (file.mimetype.startsWith("application")) {
      const upload = await cloudinary.uploader.upload(file.path, {
        folder: "pdf_documents",
        display_name: name + "display",
        public_id: name,
        resource_type: "raw",
        overwrite: false,
        type: "upload",
      });
      return upload;
    } else if (file.mimetype.startsWith("video/")) {
      const upload = await cloudinary.uploader.upload(file.path, {
        folder: "videos",
        display_name: name + "display",
        public_id: name,
        resource_type: "video",
      });
      return upload;
    }
  } catch (err) {
    throw err;
  }
};

export const cloudinaryDelete = async (file, public_id) => {
  try {
    if (file.mimetype.startsWith("image/")) {
      const destroy = await cloudinary.uploader.destroy(public_id, {
        resource_type: "image",
        folder: "images",
      });
      return destroy;
    } else if (file.mimetype.startsWith("application")) {
      const destroy = await cloudinary.uploader.destroy(public_id, {
        resource_type: "raw",
        folder: "pdf_documents",
      });
      return destroy;
    } else if (file.mimetype.startsWith("video/")) {
      const destroy = await cloudinary.uploader.destroy(public_id, {
        resource_type: "video",
        folder: "videos",
      });
      return destroy;
    }
    // const destroy = await cloudinary.uploader.destroy(public_id);
    // return destroy;
  } catch (err) {
    throw err;
  }
};
