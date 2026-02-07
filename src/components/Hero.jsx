import { useModal } from '../hooks/useModal';
import BookingFormModal from './BookingFormModal';

const Hero = () => {
  const { isOpen: isBookingOpen, openModal: openBookingModal, closeModal: closeBookingModal } = useModal();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/herovid.webm" type="video/webm" />
          <source src="/herovid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto py-32">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Movement Based Training
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-4 text-brand-light font-medium">
            Functional Strength & Mobility Coach
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-300 max-w-3xl mx-auto">
            Level up your fitness with dynamic, varied workouts that unlock strength, agility, and mobility.
            Training that goes beyond the gym—building real ability for all parts of life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={openBookingModal}
              className="bg-brand-primary hover:bg-brand-accent text-white px-10 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-xl w-full sm:w-auto"
            >
              Book Your Session
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white px-10 py-4 rounded-full font-semibold text-lg transition-all w-full sm:w-auto"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingFormModal isOpen={isBookingOpen} onClose={closeBookingModal} />
    </section>
  );
};

export default Hero;
