import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    pins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pin" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPrivate: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Board", BoardSchema);
