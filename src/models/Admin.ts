import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Interface pour TypeScript
export interface IAdmin extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

// Schéma Mongoose
const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hacher le mot de passe avant de sauvegarder
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Méthode pour comparer les mots de passe
AdminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export du modèle
export default mongoose.models.Admin ||
  mongoose.model<IAdmin>("Admin", AdminSchema);