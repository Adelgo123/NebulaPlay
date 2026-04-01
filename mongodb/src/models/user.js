import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nombre: { type: String, default: "" },
  apellidos: { type: String, default: "" },
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  pais: { type: String, default: "" },
  fechaNacimiento: { type: Date },
  genero: { type: String, enum: ["Masculino", "Femenino", "Otro", ""], default: "" },
  recibeComunicaciones: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  lastLoginIP: { type: String, default: "" }
});

export default mongoose.model("User", UserSchema);