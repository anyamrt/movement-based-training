import { useModal } from '../hooks/useModal';
import BookingFormModal from './BookingFormModal';

const Services = () => {
  const { isOpen: isBookingOpen, openModal: openBookingModal, closeModal: closeBookingModal } = useModal();

  const services = [
    {
      title: "New Client Intro Package, 3 for 2",
      subtitle: "Perfect for getting started",
      price: "$190",
      priceSubtext: "Total for 3 sessions",
      features: [
        "Three 45 minute sessions",
        "Pay for 2, get the 3rd free",
        "Includes all gym fees",
        "Personalized training approach",
        "Comprehensive fitness assessment",
        "Customized workout plan",
        "Technique coaching and feedback"
      ],
      type: "single"
    },
    {
      title: "Ongoing Training Packages",
      subtitle: "45 minute sessions",
      price: "$95",
      priceSubtext: "per session",
      type: "ongoing"
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

        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden hover:shadow-2xl transition-all flex flex-col"
            >
              <div className="flex-grow">
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
                      {service.priceSubtext && (
                        <p className="text-sm text-gray-600 mt-1">{service.priceSubtext}</p>
                      )}
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
                  </>
                ) : service.type === 'ongoing' ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                      {/* In-Person Training */}
                      <div className="bg-brand-navy/10 border-2 border-brand-navy rounded-xl p-5">
                        <p className="text-lg text-brand-dark font-bold mb-3">
                          In-Person Training
                        </p>
                        <p className="text-3xl text-brand-primary font-bold mb-4">
                          $95
                        </p>
                        <p className="text-sm text-gray-600 mb-4">per session</p>
                        <div className="bg-white/60 rounded-lg p-3 border border-brand-navy/30">
                          <p className="text-sm text-brand-dark font-semibold mb-1">
                            Compulsory Gym Membership:
                          </p>
                          <p className="text-sm font-bold text-brand-primary mb-2">
                            $18.95 per week
                          </p>
                          <p className="text-xs text-gray-600">
                            Includes 24 hour gym access and programs outside of sessions
                          </p>
                        </div>
                      </div>

                      {/* Remote Training */}
                      <div className="bg-brand-primary/10 border-2 border-brand-primary rounded-xl p-5">
                        <p className="text-lg text-brand-dark font-bold mb-3">
                          Remote Training
                        </p>
                        <p className="text-3xl text-brand-primary font-bold mb-4">
                          $50
                        </p>
                        <p className="text-sm text-gray-600 mb-4">per week</p>
                        <p className="text-xs font-semibold text-brand-dark mb-2">Includes:</p>
                        <ul className="space-y-1.5">
                          <li className="flex items-start gap-2 text-xs text-gray-700">
                            <svg className="w-3.5 h-3.5 text-brand-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Initial assessment</span>
                          </li>
                          <li className="flex items-start gap-2 text-xs text-gray-700">
                            <svg className="w-3.5 h-3.5 text-brand-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Monthly 1-1 in person session</span>
                          </li>
                          <li className="flex items-start gap-2 text-xs text-gray-700">
                            <svg className="w-3.5 h-3.5 text-brand-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Ongoing personalised training</span>
                          </li>
                          <li className="flex items-start gap-2 text-xs text-gray-700">
                            <svg className="w-3.5 h-3.5 text-brand-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Training package via TrainHeroic app</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              <button
                onClick={openBookingModal}
                className="w-full bg-brand-primary hover:bg-brand-accent text-white py-3 px-6 rounded-full font-semibold transition-all transform hover:scale-105 shadow-md mt-auto"
              >
                {service.type === 'single' ? 'Book Now' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingFormModal isOpen={isBookingOpen} onClose={closeBookingModal} />
    </section>
  );
};

export default Services;
