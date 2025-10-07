// src/app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext"; // ✅ ajout du provider

export const metadata = {
  title: "Billboard Tech Blog",
  description: "Blog technologique unique avec un espace publicitaire dynamique",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900 font-sans">
        {/* ✅ AuthProvider englobe toute l’app */}
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
