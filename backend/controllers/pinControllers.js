import Pin from "../models/PinModel.js";
import cloudinary from "../config/cloudinary.js";

export const createPin = async (req, res) => {
  const { title, description, tags } = req.body;

  const slug =
    title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: "pinsphere" },
    async (error, result) => {
      if (error)
        return res.status(500).json({ message: "Image upload failed" });

      const pin = await Pin.create({
        title,
        description,
        tags,
        slug,
        imageUrl: result.secure_url,
        createdBy: req.user.id,
        source: "user"
      });

      res.json(pin);
    }
  );

  uploadStream.end(req.file.buffer);
};

export const getPins = async (req, res) => {
  const pins = await Pin.find().sort({ createdAt: -1 });
  res.json(pins);
};

export const getPinBySlug = async (req, res) => {
  const pin = await Pin.findOne({ slug: req.params.slug });
  res.json(pin);
};
