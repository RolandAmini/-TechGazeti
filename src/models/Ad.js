import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  title: String,
  description: String,
  // Ajoute ici les autres champs de ta collection
});

const Ad = mongoose.models.Ad || mongoose.model('Ad', AdSchema);

export default Ad;