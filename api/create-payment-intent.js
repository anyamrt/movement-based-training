import Stripe from 'stripe';

/**
 * Vercel serverless function to create Stripe PaymentIntent
 * Endpoint: POST /api/create-payment-intent
 *
 * Required environment variable:
 * - STRIPE_SECRET_KEY: Your Stripe secret key
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, sessionDate, amount } = req.body;

    // Validate required fields
    if (!name || !sessionDate || !amount) {
      return res.status(400).json({ error: 'Missing required fields: name, sessionDate, amount' });
    }

    // Validate amount (should be 9500 for $95.00)
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Validate session date is in the future
    const selectedDate = new Date(sessionDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({ error: 'Session date must be in the future' });
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents (9500 = $95.00)
      currency: 'aud', // Australian dollars
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customerName: name,
        sessionDate: sessionDate,
        service: 'Single Training Session',
      },
      description: `Training session for ${name} on ${sessionDate}`,
    });

    console.log('PaymentIntent created:', paymentIntent.id);

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error('Payment Intent creation error:', error);

    // Return generic error to client (don't expose Stripe errors)
    return res.status(500).json({
      error: 'Failed to create payment intent',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
