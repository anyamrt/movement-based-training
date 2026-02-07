import { useState, useEffect } from 'react';
import clsx from 'clsx';
import logo from '../assets/images/logo.png';
import { useModal } from '../hooks/useModal';
import BookingFormModal from './BookingFormModal';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen: isBookingOpen, openModal: openBookingModal, closeModal: closeBookingModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'About', target: 'about' },
    { label: 'Services', target: 'services' },
    { label: 'Testimonials', target: 'testimonials' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-brand-navy shadow-md py-2' : 'bg-brand-navy shadow-sm py-3'
    )}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img
              src={logo}
              alt="James Ashford Movement Based Training"
              className={clsx(
                'transition-all',
                isScrolled ? 'h-15 md:h-18' : 'h-18 md:h-21'
              )}
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className="text-white hover:text-brand-yellow transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={openBookingModal}
              className="bg-brand-primary hover:bg-brand-accent text-white px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 shadow-md"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className="block w-full text-left py-3 text-white hover:text-brand-yellow transition-colors font-medium border-b border-white/20"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                openBookingModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-4 bg-brand-primary hover:bg-brand-accent text-white px-6 py-3 rounded-full font-medium transition-all shadow-md"
            >
              Book Now
            </button>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingFormModal isOpen={isBookingOpen} onClose={closeBookingModal} />
    </nav>
  );
};

export default Navigation;
