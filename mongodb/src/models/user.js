import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nombre: { type: String, default: "" },
  apellidos: { type: String, default: "" },
  usuario: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  pais: { type: String, default: "" },
  fecha_nacimiento: { type: Date },
  genero: { type: String, enum: ["Masculino", "Femenino", "Otro", ""], default: "" },
  novedades: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  lastLoginIP: { type: String, default: "" },
  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
}
});


export default mongoose.model("User", UserSchema);