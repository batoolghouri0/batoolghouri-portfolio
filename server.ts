import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '1mb' }));

// Health and status endpoint for email integration
app.get('/api/contact/status', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const isResendConfigured = Boolean(apiKey && apiKey !== 're_123456789' && !apiKey.includes('YOUR_'));
  const recipientEmail = process.env.CONTACT_EMAIL || 'batoolghouri000@gmail.com';
  
  res.json({
    status: 'ok',
    configured: isResendConfigured,
    recipient: recipientEmail,
    provider: 'Resend',
    message: isResendConfigured 
      ? 'Email delivery is active via Resend.' 
      : 'Email delivery is not configured. RESEND_API_KEY is missing from environment secrets.'
  });
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Real email submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body ?? {};

    const cleanName = typeof name === 'string' ? name.trim().slice(0, 100) : '';
    const cleanEmail = typeof email === 'string' ? email.trim().slice(0, 150) : '';
    const cleanSubject = typeof subject === 'string' ? subject.trim().slice(0, 200) : '';
    const cleanMessage = typeof message === 'string' ? message.trim().slice(0, 3000) : '';

    // Validation & sanitization
    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields (Name, Email, Subject, Message) are required.' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide a valid email address.' 
      });
    }

    if (cleanName.length < 2) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name must be at least 2 characters.' 
      });
    }

    if (cleanMessage.length < 3) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please enter a brief message (at least 3 characters).' 
      });
    }

    // Intended recipient verified as batoolghouri000@gmail.com
    const recipient = process.env.CONTACT_EMAIL?.trim() || 'batoolghouri000@gmail.com';
    const apiKey = process.env.RESEND_API_KEY?.trim();

    // Check if Resend is configured with a valid key
    const isConfigured = Boolean(apiKey && apiKey !== 're_123456789' && !apiKey.includes('YOUR_'));

    if (!isConfigured) {
      console.warn('[Contact API] Submission received but RESEND_API_KEY is not configured.');
      return res.status(503).json({
        success: false,
        error: 'Email delivery service is currently not configured. No message could be sent.',
        deliveryMode: 'unconfigured',
      });
    }

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeSubject = escapeHtml(cleanSubject);
    const safeMessage = escapeHtml(cleanMessage);

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0b1120; color: #f8fafc; border-radius: 12px; border: 1px solid #1e293b;">
        <div style="border-bottom: 1px solid #334155; padding-bottom: 16px; margin-bottom: 20px;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #818cf8; font-weight: bold;">Portfolio Contact Notification</span>
          <h2 style="margin: 8px 0 0; color: #f8fafc; font-size: 20px;">New Message from ${safeName}</h2>
        </div>
        <div style="margin-bottom: 16px;">
          <p style="margin: 0 0 6px; font-size: 13px; color: #94a3b8;"><strong>From:</strong> ${safeName} (<a href="mailto:${safeEmail}" style="color: #38bdf8;">${safeEmail}</a>)</p>
          <p style="margin: 0 0 6px; font-size: 13px; color: #94a3b8;"><strong>Subject:</strong> ${safeSubject}</p>
          <p style="margin: 0; font-size: 13px; color: #94a3b8;"><strong>Received:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; border-left: 3px solid #8b5cf6; margin-top: 16px;">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #f1f5f9; white-space: pre-wrap;">${safeMessage}</p>
        </div>
        <div style="margin-top: 24px; font-size: 12px; color: #64748b; text-align: center;">
          Sent via Batool Ghouri Developer Portfolio
        </div>
      </div>
    `;

    const fromAddress = process.env.RESEND_FROM_EMAIL?.trim() || 'Portfolio Contact <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [recipient],
      replyTo: cleanEmail,
      subject: `[Portfolio Contact] ${cleanSubject} - from ${cleanName}`,
      html: htmlBody,
      text: `From: ${cleanName} (${cleanEmail})\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}`,
    });

    if (error) {
      console.error('Resend delivery error:', error.message || error);
      return res.status(502).json({
        success: false,
        error: error.message || 'Resend was unable to deliver this message. Please check recipient and domain authorization.',
      });
    }

    if (!data?.id) {
      return res.status(502).json({
        success: false,
        error: 'No transmission confirmation ID was received from the email provider.',
      });
    }

    return res.json({
      success: true,
      message: 'Your message was delivered directly to Batool Ghouri’s inbox!',
      deliveryMode: 'resend_live',
      id: data.id,
    });
  } catch (err: any) {
    console.error('Server contact form exception:', err?.message || err);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while sending your message. Please try again.',
    });
  }
});

// Setup Vite dev middleware or static serving
async function setupApp() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

setupApp().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
