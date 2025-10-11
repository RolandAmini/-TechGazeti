"use client";
import { ArrowLeft, Code, Rocket, Heart, Users, Award, Target, Mail, Github, Linkedin, Twitter } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { icon: Code, value: "50+", label: "Projets Réalisés" },
    { icon: Users, value: "1000+", label: "Lecteurs Actifs" },
    { icon: Award, value: "5+", label: "Années d'Expérience" },
    { icon: Heart, value: "100%", label: "Passion & Dévouement" }
  ];

  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "Partager des connaissances de qualité en développement web et aider les développeurs à progresser dans leur carrière."
    },
    {
      icon: Rocket,
      title: "Vision",
      description: "Devenir une référence francophone pour l'apprentissage du développement web moderne et des meilleures pratiques."
    },
    {
      icon: Heart,
      title: "Valeurs",
      description: "Qualité, pédagogie, transparence et partage de connaissances pour construire une communauté d'entraide."
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "Les Débuts",
      description: "Lancement du blog avec les premiers articles sur JavaScript et React."
    },
    {
      year: "2021",
      title: "Croissance",
      description: "Atteinte de 500 lecteurs mensuels et publication de tutoriels avancés."
    },
    {
      year: "2023",
      title: "Expansion",
      description: "Lancement de la section vidéo et partenariats avec d'autres créateurs."
    },
    {
      year: "2025",
      title: "Aujourd'hui",
      description: "Plus de 1000 lecteurs actifs et une communauté engagée de développeurs."
    }
  ];

  const team = [
    {
      name: "Roland Amini",
      role: "Fondateur & Développeur Full-Stack",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Passionné de développement web depuis plus de 5 ans, je partage mes connaissances pour aider la communauté francophone.",
      social: {
        github: "https://github.com/rolandamini",
        linkedin: "https://linkedin.com/in/rolandamini",
        twitter: "https://twitter.com/rolandamini"
      }
    }
    // Ajoutez d'autres membres d'équipe ici
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <nav className="container mx-auto px-6 py-4">
          <a href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">back Home</span>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            À Propos de Nous
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
          We are a platform dedicated to sharing web development knowledge.
Our mission is to help French-speaking developers progress through
quality articles, practical tutorials, and a supportive community.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <stat.icon className="text-white" size={32} />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
         Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <value.icon className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-6 py-16 bg-white/50 backdrop-blur-sm my-16 rounded-3xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Our History
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>
            
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative mb-12 ${
                  index % 2 === 0 ? "md:text-right md:pr-1/2" : "md:text-left md:pl-1/2"
                }`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:ml-auto md:pr-12" : "md:pl-12"}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-bold mb-4">
                      {item.year}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
         Our Team
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Meet the passionate people who make it all possible
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Avatar */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6">{member.bio}</p>

                {/* Social Links */}
                <div className="flex gap-3">
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
           Subscribe to our newsletter to receive the latest articles, tutorials, and web development news directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl">
          Subscribe
            </button>
          </div>
          <div className="mt-8">
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center gap-2 text-white hover:text-blue-100 transition-colors"
            >
              <Mail size={20} />
              <span className="font-medium">aminiroland01@gmail.com</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}