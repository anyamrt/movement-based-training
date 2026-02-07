import { useState } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import Modal from './Modal';
import { stripePromise } from '../utils/stripe';

// Stripe CardElement styling to match brand
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#151414',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#6B7280',
      },
    },
    invalid: {
      color: '#EF4444',
      iconColor: '#EF4444',
    },
  },
};

// Payment form component (must be inside Elements provider)
const PaymentForm = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    name: '',
    sessionDate: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [showCardElement, setShowCardElement] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.sessionDate) {
      newErrors.sessionDate = 'Session date is required';
    } else {
      // Validate date is in the future
      const selectedDate = new Date(formData.sessionDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.sessionDate = 'Please select a future date';
      }
    }

    return newErrors;
  };

  const handleContinueToPayment = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setPaymentError('');

    try {
      // Create PaymentIntent on the server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          sessionDate: formData.sessionDate,
          amount: 9500, // $95.00 in cents
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      setClientSecret(data.clientSecret);
      setShowCardElement(true);

    } catch (error) {
      console.error('Payment setup error:', error);
      setPaymentError(error.message || 'Failed to set up payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setPaymentError('');

    try {
      // Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
          },
        },
      });

      if (error) {
        // Handle payment errors
        let errorMessage = 'Payment failed. Please try again.';

        switch (error.code) {
          case 'card_declined':
            errorMessage = 'Card declined. Please try another card.';
            break;
          case 'insufficient_funds':
            errorMessage = 'Insufficient funds. Please use another card.';
            break;
          case 'expired_card':
            errorMessage = 'Card expired. Please check the expiration date.';
            break;
          case 'incorrect_cvc':
            errorMessage = 'Incorrect security code. Please try again.';
            break;
          case 'processing_error':
            errorMessage = 'Payment processing error. Please try again.';
            break;
        }

        setPaymentError(errorMessage);
      } else if (paymentIntent.status === 'succeeded') {
        // Payment succeeded!
        setSuccess(true);

        // Auto-close modal after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      }

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-brand-success rounded-full flex items-center justify-center mx-auto mb-4 animate-fade-in">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-brand-dark mb-2">Payment Successful!</h3>
        <p className="text-gray-600">
          Thank you, {formData.name}! James will contact you to confirm your training session on {new Date(formData.sessionDate).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={showCardElement ? handlePayment : handleContinueToPayment} className="space-y-6">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brand-dark mb-2">
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={showCardElement}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="John Smith"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Session Date Input */}
      <div>
        <label htmlFor="sessionDate" className="block text-sm font-medium text-brand-dark mb-2">
          Session Date *
        </label>
        <input
          type="date"
          id="sessionDate"
          name="sessionDate"
          value={formData.sessionDate}
          onChange={handleChange}
          disabled={showCardElement}
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        {errors.sessionDate && <p className="text-red-500 text-sm mt-1">{errors.sessionDate}</p>}
      </div>

      {/* Card Element (shown after initial validation) */}
      {showCardElement && (
        <div className="animate-fade-in">
          <label htmlFor="card-element" className="block text-sm font-medium text-brand-dark mb-2">
            Card Details *
          </label>
          <div className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-brand-primary focus-within:border-transparent">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>
      )}

      {/* Payment Error */}
      {paymentError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
          <p className="text-red-600 text-sm">{paymentError}</p>
        </div>
      )}

      {/* Price Display */}
      {showCardElement && (
        <div className="bg-brand-light p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Single Session (45 min)</span>
            <span className="text-2xl font-bold text-brand-primary">$95.00</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || (!showCardElement ? false : !stripe)}
        className="w-full bg-brand-primary hover:bg-brand-accent text-white py-3 px-6 rounded-full font-semibold transition-all transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : showCardElement ? (
          `Pay $95.00`
        ) : (
          'Continue to Payment'
        )}
      </button>

      {/* Security Notice */}
      <p className="text-xs text-gray-500 text-center">
        <svg className="inline w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Secure payment powered by Stripe
      </p>
    </form>
  );
};

// Main PaymentModal component with Elements provider
const PaymentModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pay for a Session">
      <Elements stripe={stripePromise}>
        <PaymentForm onClose={onClose} />
      </Elements>
    </Modal>
  );
};

export default PaymentModal;
