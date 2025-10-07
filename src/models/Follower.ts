import mongoose, { Schema, model, models } from "mongoose";

const followerSchema = new Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: false }, // tu peux stocker une lettre ou une image
  color: { type: String, default: "from-green-400 to-blue-500" },
  date: { type: Date, default: Date.now }
});

const Follower = models.Follower || model("Follower", followerSchema);
export default Follower;
