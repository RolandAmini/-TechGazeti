import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema(
  {
    advertiserName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // en secondes ou minutes
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Pour éviter l'erreur de redéclaration en développement
export default mongoose.models.Ad || mongoose.model('Ad', AdSchema);
