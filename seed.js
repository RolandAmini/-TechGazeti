const bcrypt = require('bcryptjs');

async function genererAdmin() {
    const email = "votre-email@exemple.com"; // 👈 Mettez l'email que vous voulez utiliser
    const motDePasseClair = "VotreMotDePasseSuperSecurise123!"; // 👈 Mettez votre mot de passe
    
    const salt = await bcrypt.genSalt(10);
    const motDePasseHache = await bcrypt.hash(motDePasseClair, salt);
    
    console.log("\n--- COPIEZ CES INFORMATIONS DANS VOTRE .env.local ---");
    console.log(`ADMIN_EMAIL=${email}`);
    console.log("\n--- DOCUMENT À INSERER DANS MONGODB (Collection: admins) ---");
    console.log(JSON.stringify({
        email: email.toLowerCase(),
        password: motDePasseHache,
        createdAt: new Date()
    }, null, 2));
}

genererAdmin();