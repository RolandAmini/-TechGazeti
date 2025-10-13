// hashPassword.mjs
import bcrypt from "bcryptjs";

async function generateHash() {
  // 👉 Remplace ce mot de passe par celui que tu veux utiliser pour te connecter
  const password = "roland5713"; 

  // Génération du hash
  const hashed = await bcrypt.hash(password, 10);

  console.log("✅ Nouveau hash généré :");
  console.log(hashed);
}

generateHash().catch((err) => {
  console.error("❌ Erreur lors du hash :", err);
  process.exit(1);
});
