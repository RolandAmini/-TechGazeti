import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  action: string;     // Ex: "Nouvel article publié"
  blog?: string;      // Ex: "Titre de l’article"
  user?: string;      // Ex: "Nom de l’utilisateur"
  time: Date;         // Quand c’est arrivé
}

const ActivitySchema = new Schema<IActivity>(
  {
    action: { type: String, required: true },
    blog: { type: String },
    user: { type: String },
    time: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Activity ||
  mongoose.model<IActivity>("Activity", ActivitySchema);
