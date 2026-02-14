import mongoose from "mongoose";

const AvatarSchema = new mongoose.Schema({
  skin: String,
  eyes: String,
  eyeColor: String,
  mouth: String,
  hair: String,
  hairColor: String,
  accessories: [String]
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  avatar: AvatarSchema,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
