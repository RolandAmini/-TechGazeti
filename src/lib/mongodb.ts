import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('❌  Please define the MONGODB_URI inside .env.local');
}

/** 
 * 🔌 Connextion réutilisable.
 * Évite les reconnections multiples en dev (HMR).
 */
export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGODB_URI, {
    // options par défaut suffisent depuis Mongoose 7
  });
  console.log('✅  MongoDB connected');
}
