const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      title: "First Time Assessment + Session",
      subtitle: "Buy One Get One Free",
      price: "$110",
      features: [
        "Comprehensive fitness assessment",
        "One-on-one personalized training",
        "Customized workout plan",
        "Technique coaching and feedback",
        "Second session completely free",
        "Perfect for first-timers"
      ],
      badge: "First Time Only",
      type: "single"
    },
    {
      title: "Ongoing Training Packages",
      subtitle: "Flexible session plans",
      type: "pricing-table"
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
              className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden hover:shadow-2xl transition-all"
            >
              {/* Badge */}
              {service.badge && (
                <div className="absolute top-6 right-6 bg-brand-yellow text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {service.badge}
                </div>
              )}

              <h3 className="text-2xl font-bold text-brand-dark mb-2">
                {service.title}
              </h3>
              <p className="text-brand-primary font-semibold mb-6">
                {service.subtitle}
              </p>

              {service.type === 'single' ? (
                <>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-brand-primary">
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
                </>
              ) : (
                <>
                  {/* Pricing Table */}
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-brand-primary">
                          <th className="text-left py-3 px-2 font-semibold text-brand-dark">Sessions/Week</th>
                          <th className="text-center py-3 px-2 font-semibold text-brand-dark">30 min</th>
                          <th className="text-center py-3 px-2 font-semibold text-brand-dark">45 min</th>
                          <th className="text-center py-3 px-2 font-semibold text-brand-dark">60 min</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-2 font-medium">1x per week</td>
                          <td className="py-3 px-2 text-center text-brand-primary font-semibold">$80</td>
                          <td className="py-3 px-2 text-center text-brand-primary font-semibold">$100</td>
                          <td className="py-3 px-2 text-center text-brand-primary font-semibold">$110</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-2 font-medium">2x per week</td>
                          <td className="py-3 px-2 text-center text-brand-primary font-semibold">$75</td>
                          <td className="py-3 px-2 text-center text-brand-primary font-semibold">$95</td>
                          <td className="py-3 px-2 text-center text-brand-primary font-semibold">$105</td>
                        </tr>
                        <tr className="border-b border-gray-200 bg-brand-light/30">
                          <td className="py-3 px-2 font-medium">3x per week</td>
                          <td className="py-3 px-2 text-center text-brand-primary font-semibold">$70</td>
                          <td className="py-3 px-2 text-center text-brand-primary font-semibold">$90</td>
                          <td className="py-3 px-2 text-center text-brand-primary font-semibold">$100</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-brand-light rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-semibold">Note:</span> Prices shown are per session.
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Gym Fee:</span> Additional gym access fee may apply depending on location.
                    </p>
                  </div>

                  <button
                    onClick={scrollToContact}
                    className="w-full bg-brand-primary hover:bg-brand-accent text-white py-3 px-6 rounded-full font-semibold transition-all transform hover:scale-105 shadow-md"
                  >
                    Get Started
                  </button>
                </>
              )}
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
