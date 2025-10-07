// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-6 mt-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 TechGazeti — Tous droits réservés.</p>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-white">Confidentialité</a></li>
            <li><a href="#" className="hover:text-white">Conditions</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </footer>
  );
}
