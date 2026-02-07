import { loadStripe } from '@stripe/stripe-js';

/**
 * Initialize Stripe with publishable key
 * This is safe to expose client-side
 */

// Get publishable key from environment variable
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error('Missing VITE_STRIPE_PUBLISHABLE_KEY environment variable');
}

// Load Stripe.js (this is cached by the @stripe/stripe-js library)
export const stripePromise = loadStripe(stripePublishableKey);
