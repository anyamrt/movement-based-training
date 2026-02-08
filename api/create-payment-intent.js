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
    const {
      name,
      email,
      phone,
      sessionDate,
      preferredTimes,
      goals,
      amount,
      serviceName,
      serviceType
    } = req.body;

    // Validate required fields
    if (!name || !amount) {
      return res.status(400).json({ error: 'Missing required fields: name, amount' });
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Validate session date is in the future (if provided)
    if (sessionDate) {
      const selectedDate = new Date(sessionDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        return res.status(400).json({ error: 'Session date must be in the future' });
      }
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Build metadata object
    const metadata = {
      customerName: name,
      ...(email && { customerEmail: email }),
      ...(phone && { customerPhone: phone }),
      ...(sessionDate && { sessionDate }),
      ...(preferredTimes && { preferredTimes: preferredTimes.substring(0, 500) }), // Stripe metadata limit
      ...(goals && { goals: goals.substring(0, 500) }), // Stripe metadata limit
      ...(serviceName && { serviceName }),
      ...(serviceType && { serviceType }),
    };

    // Build description
    const description = sessionDate
      ? `Training session for ${name} on ${sessionDate}`
      : `${serviceName || 'Training'} booking for ${name}`;

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'aud', // Australian dollars
      automatic_payment_methods: {
        enabled: true,
      },
      metadata,
      description,
      ...(email && { receipt_email: email }), // Send receipt to customer if email provided
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
