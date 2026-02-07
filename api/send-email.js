import { Resend } from 'resend';

/**
 * Vercel serverless function to send emails using Resend
 * Endpoint: POST /api/send-email
 *
 * Required environment variable:
 * - RESEND_API_KEY: Your Resend API key
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, name, phone, email, timestamp } = req.body;

    // Validate required fields
    if (!type || !name || !phone || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    let subject, htmlContent;

    // Build email based on type
    if (type === 'booking') {
      const { preferredTimes, goals } = req.body;

      if (!preferredTimes) {
        return res.status(400).json({ error: 'Preferred times are required for booking' });
      }

      subject = `New Booking Request - ${name}`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #24355A; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #24355A; }
            .value { margin-top: 5px; }
            .footer { margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Booking Request</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Preferred Training Times:</div>
                <div class="value">${preferredTimes}</div>
              </div>
              ${goals ? `
              <div class="field">
                <div class="label">Goals / Notes:</div>
                <div class="value">${goals}</div>
              </div>
              ` : ''}
              <div class="footer">
                Submitted on: ${new Date(timestamp).toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' })}
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (type === 'contact') {
      const { query } = req.body;

      if (!query) {
        return res.status(400).json({ error: 'Query is required for contact form' });
      }

      subject = `New Contact Inquiry - ${name}`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #24355A; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #24355A; }
            .value { margin-top: 5px; }
            .footer { margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Inquiry</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${query}</div>
              </div>
              <div class="footer">
                Submitted on: ${new Date(timestamp).toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' })}
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      return res.status(400).json({ error: 'Invalid form type' });
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Movement Based Training <onboarding@resend.dev>',
      to: 'movementbasedtraining@gmail.com',
      replyTo: email,
      subject: subject,
      html: htmlContent,
    });

    console.log('Email sent via Resend:', data.id);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: data.id
    });

  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      details: error.message
    });
  }
}
