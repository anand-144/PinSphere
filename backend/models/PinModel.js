import mongoose from "mongoose";

const PinSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    imageUrl: { type: String, required: true },

    source: {
      type: String,
      enum: ["api", "user"],
      default: "user"
    },

    slug: { type: String, unique: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    tags: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

export default mongoose.model("Pin", PinSchema);
