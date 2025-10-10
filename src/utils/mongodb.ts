import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/techgazeti";

// Interface pour le cache Mongoose
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Étendre le type global pour ajouter mongooseCache
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Si aucun cache n'existe encore, on l'initialise
const globalForMongoose = global as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

if (!globalForMongoose.mongooseCache) {
  globalForMongoose.mongooseCache = { conn: null, promise: null };
}

const cached = globalForMongoose.mongooseCache!; // <-- le "!" dit à TypeScript : "je sais que ce n’est pas undefined"

async function connectDB() {
  if (cached.conn) {
    console.log("✅ MongoDB déjà connecté");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("✅ MongoDB connecté avec succès");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
