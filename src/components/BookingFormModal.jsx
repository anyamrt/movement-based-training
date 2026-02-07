import { useState } from 'react';
import Modal from './Modal';

/**
 * Booking form modal with 5 fields
 * Sends booking request via API to email
 */
const BookingFormModal = ({ isOpen, onClose }) => {
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

  // Handle form submission
  const handleSubmit = async (e) => {
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Your Session">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">Booking request sent successfully!</p>
            <p className="text-sm">We'll contact you shortly to confirm your session.</p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">Failed to send booking request</p>
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
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors ${
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
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors ${
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
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors ${
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
            rows={3}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors resize-none ${
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
            rows={4}
            className="w-full px-4 py-3 border border-brand-navy/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors resize-none"
            placeholder="Tell us about your fitness goals, any injuries or limitations, or other relevant information..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || submitStatus === 'success'}
            className="w-full bg-brand-primary hover:bg-brand-accent text-white py-3 px-6 rounded-full font-semibold transition-all transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent!' : 'Send Booking Request'}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          We'll contact you within 24 hours to confirm your booking
        </p>
      </form>
    </Modal>
  );
};

export default BookingFormModal;
