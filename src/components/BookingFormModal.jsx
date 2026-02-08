import { useState } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import Modal from './Modal';
import { stripePromise } from '../utils/stripe';

// Stripe CardElement styling
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

/**
 * Booking form modal with optional payment integration
 * @param {boolean} requiresPayment - Whether payment is required for this booking
 * @param {number} amount - Amount in cents (e.g., 19000 for $190)
 * @param {string} serviceName - Name of the service being booked
 * @param {string} serviceType - Type identifier for the service
 */
const BookingForm = ({ onClose, requiresPayment = false, amount = 0, serviceName = '', serviceType = '' }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredTimes: '',
    goals: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [showCardElement, setShowCardElement] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentError, setPaymentError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.preferredTimes.trim()) {
      newErrors.preferredTimes = 'Preferred training times are required';
    }

    return newErrors;
  };

  // Handle continuing to payment (for paid bookings)
  const handleContinueToPayment = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setPaymentError('');

    try {
      // Create PaymentIntent on the server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferredTimes: formData.preferredTimes,
          goals: formData.goals,
          amount: amount,
          serviceName: serviceName,
          serviceType: serviceType,
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
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);
    setPaymentError('');

    try {
      // Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
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
        // Payment succeeded! Now send confirmation email
        await sendConfirmationEmail(paymentIntent.id);

        setSubmitStatus('success');

        // Auto-close after 3 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 3000);
      }

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Send confirmation email after successful payment
  const sendConfirmationEmail = async (paymentIntentId) => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'booking',
          ...formData,
          serviceName: serviceName,
          paymentIntentId: paymentIntentId,
          amountPaid: (amount / 100).toFixed(2),
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      // Don't fail the whole flow if email fails
    }
  };

  // Handle form submission for free bookings
  const handleFreeBooking = async (e) => {
    e.preventDefault();

    // Validate
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'booking',
          ...formData,
          serviceName: serviceName || 'Training Session',
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send booking request');
      }

      setSubmitStatus('success');

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        preferredTimes: '',
        goals: '',
      });

      // Auto-close after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitStatus === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-brand-success rounded-full flex items-center justify-center mx-auto mb-4 animate-fade-in">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-brand-dark mb-2">
          {requiresPayment ? 'Payment Successful!' : 'Booking Request Sent!'}
        </h3>
        <p className="text-gray-600">
          {requiresPayment
            ? `Thank you, ${formData.name}! Your payment has been processed. James will contact you shortly to confirm your training sessions.`
            : `Thank you, ${formData.name}! We'll contact you shortly to confirm your session.`
          }
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={requiresPayment ? (showCardElement ? handlePayment : handleContinueToPayment) : handleFreeBooking} className="space-y-5">
      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <p className="font-semibold">Failed to process request</p>
          <p className="text-sm">Please try again or email us directly at movementbasedtraining@gmail.com</p>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="booking-name" className="block text-sm font-semibold text-brand-dark mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="booking-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={showCardElement}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
            errors.name ? 'border-red-500' : 'border-brand-navy/30'
          }`}
          placeholder="Your full name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="booking-phone" className="block text-sm font-semibold text-brand-dark mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="booking-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={showCardElement}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
            errors.phone ? 'border-red-500' : 'border-brand-navy/30'
          }`}
          placeholder="0400 000 000"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="booking-email" className="block text-sm font-semibold text-brand-dark mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="booking-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={showCardElement}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
            errors.email ? 'border-red-500' : 'border-brand-navy/30'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Preferred Training Times Field */}
      <div>
        <label htmlFor="booking-times" className="block text-sm font-semibold text-brand-dark mb-2">
          Preferred Training Times <span className="text-red-500">*</span>
        </label>
        <textarea
          id="booking-times"
          name="preferredTimes"
          value={formData.preferredTimes}
          onChange={handleChange}
          disabled={showCardElement}
          rows={3}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed ${
            errors.preferredTimes ? 'border-red-500' : 'border-brand-navy/30'
          }`}
          placeholder="e.g., Monday mornings, Wednesday evenings, flexible weekends"
        />
        {errors.preferredTimes && <p className="text-red-500 text-sm mt-1">{errors.preferredTimes}</p>}
      </div>

      {/* Goals Field (Optional) */}
      <div>
        <label htmlFor="booking-goals" className="block text-sm font-semibold text-brand-dark mb-2">
          Goals or Other Notes
        </label>
        <textarea
          id="booking-goals"
          name="goals"
          value={formData.goals}
          onChange={handleChange}
          disabled={showCardElement}
          rows={4}
          className="w-full px-4 py-3 border border-brand-navy/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Tell us about your fitness goals, any injuries or limitations, or other relevant information..."
        />
      </div>

      {/* Card Element (shown after initial validation for paid bookings) */}
      {requiresPayment && showCardElement && (
        <div className="animate-fade-in">
          <label htmlFor="card-element" className="block text-sm font-medium text-brand-dark mb-2">
            Card Details <span className="text-red-500">*</span>
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

      {/* Price Display (for paid bookings) */}
      {requiresPayment && showCardElement && (
        <div className="bg-brand-light p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{serviceName}</span>
            <span className="text-2xl font-bold text-brand-primary">${(amount / 100).toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || submitStatus === 'success' || (requiresPayment && showCardElement && !stripe)}
          className="w-full bg-brand-primary hover:bg-brand-accent text-white py-3 px-6 rounded-full font-semibold transition-all transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : requiresPayment ? (
            showCardElement ? `Pay $${(amount / 100).toFixed(2)}` : 'Continue to Payment'
          ) : (
            'Send Booking Request'
          )}
        </button>
      </div>

      {/* Security/Info Notice */}
      <p className="text-xs text-gray-500 text-center">
        {requiresPayment && showCardElement ? (
          <>
            <svg className="inline w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure payment powered by Stripe
          </>
        ) : (
          requiresPayment ? 'Payment required to confirm booking' : "We'll contact you within 24 hours to confirm your booking"
        )}
      </p>
    </form>
  );
};

// Main BookingFormModal component with Elements provider
const BookingFormModal = ({ isOpen, onClose, requiresPayment = false, amount = 0, serviceName = '', serviceType = '' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={requiresPayment ? `Book & Pay - ${serviceName}` : 'Book Your Session'}>
      <Elements stripe={stripePromise}>
        <BookingForm
          onClose={onClose}
          requiresPayment={requiresPayment}
          amount={amount}
          serviceName={serviceName}
          serviceType={serviceType}
        />
      </Elements>
    </Modal>
  );
};

export default BookingFormModal;
