import logo from '../assets/images/logo.png';
import { useModal } from '../hooks/useModal';
import PaymentModal from './PaymentModal';

const Footer = () => {
  const { isOpen: isPaymentOpen, openModal: openPaymentModal, closeModal: closePaymentModal } = useModal();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-navy text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <button
              onClick={scrollToTop}
              className="mb-4 hover:opacity-80 transition-opacity"
            >
              <img
                src={logo}
                alt="James Ashford Movement Based Training"
                className="h-14 md:h-16"
              />
            </button>
            <p className="text-gray-400 mb-4">
              Functional strength and mobility coaching in Bulimba, Brisbane.
              Level up your fitness with dynamic, varied workouts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'About', target: 'about' },
                { label: 'Services', target: 'services' },
                { label: 'Testimonials', target: 'testimonials' },
                { label: 'Contact', target: 'contact' }
              ].map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.target);
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={openPaymentModal}
                  className="text-brand-yellow hover:text-white transition-colors font-semibold"
                >
                  Pay for a Session
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Find us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Think 24hr Fitness,</li>
              <li>43 Godwin Street, Bulimba</li>
              <li>
                <a href="mailto:movementbasedtraining@gmail.com" className="hover:text-white transition-colors">
                  movementbasedtraining@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Movement Based Training. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms & Conditions</button>
            </div>
          </div>
          <p className="text-gray-500 text-xs text-center">
            Made by Onion Websites
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal isOpen={isPaymentOpen} onClose={closePaymentModal} />
    </footer>
  );
};

export default Footer;
