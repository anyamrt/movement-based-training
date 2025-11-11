const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      title: "Personal Training Single Session",
      duration: "60 minutes",
      price: "Contact for pricing",
      features: [
        "One-on-one personalized training",
        "Customized workout plan",
        "Technique coaching and feedback",
        "Flexible scheduling",
        "Focus on your specific goals"
      ],
      badge: "Popular"
    },
    {
      title: "New Starter Package",
      duration: "4-6 sessions",
      price: "Special rate available",
      features: [
        "Perfect for beginners",
        "Comprehensive fitness assessment",
        "Foundation building",
        "Learn proper form and technique",
        "Progressive program design",
        "Ongoing support"
      ],
      badge: "Best Value"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-brand-light">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Training Options
          </h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you want a single session, ongoing coaching, or a full program tailored
            to your needs, I'm here to help you move beyond limits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              {/* Badge */}
              {service.badge && (
                <div className="absolute top-6 right-6 bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {service.badge}
                </div>
              )}

              <h3 className="text-2xl font-bold text-brand-dark mb-2">
                {service.title}
              </h3>
              <div className="flex items-center gap-4 mb-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {service.duration}
                </span>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-brand-primary">
                  {service.price}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-brand-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className="w-full bg-brand-primary hover:bg-brand-accent text-white py-3 px-6 rounded-full font-semibold transition-all transform hover:scale-105 shadow-md"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* Training Tools */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <h3 className="text-2xl font-bold text-brand-dark mb-6 text-center">
            Training Tools & Methods
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['Kettlebells', 'Landmines', 'Bodyweight', 'Sandbags', 'Clubs', 'Maces', 'Ground Work', 'Mobility'].map((tool, index) => (
              <div key={index} className="p-4 bg-brand-light rounded-xl">
                <span className="font-medium text-brand-dark">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
