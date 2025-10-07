import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // ✅ ajoute ceci
  category: { type: String, default: '' },
  excerpt: { type: String, default: '' },
  content: { type: String, required: true },
  image: { type: String, default: '' },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  date: { type: String, default: () => new Date().toLocaleDateString('fr-FR') },
}, {
  timestamps: true,
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
