import { Resend } from 'resend';

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
}

function sendJson(res: ApiResponse, statusCode: number, payload: Record<string, unknown>) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, {
      success: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  try {
    let parsedBody: Record<string, unknown> = {};
    if (typeof req.body === 'string') {
      try {
        parsedBody = JSON.parse(req.body) as Record<string, unknown>;
      } catch {
        return sendJson(res, 400, {
          success: false,
          error: 'Invalid JSON request body.',
        });
      }
    } else if (req.body && typeof req.body === 'object') {
      parsedBody = req.body as Record<string, unknown>;
    }

    const { name, email, subject, message } = parsedBody;

    const cleanName = typeof name === 'string' ? name.trim().slice(0, 100) : '';
    const cleanEmail = typeof email === 'string' ? email.trim().slice(0, 150) : '';
    const cleanSubject = typeof subject === 'string' ? subject.trim().slice(0, 200) : '';
    const cleanMessage = typeof message === 'string' ? message.trim().slice(0, 3000) : '';

    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return sendJson(res, 400, {
        success: false,
        error: 'All fields (Name, Email, Subject, Message) are required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return sendJson(res, 400, {
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    if (cleanName.length < 2) {
      return sendJson(res, 400, {
        success: false,
        error: 'Name must be at least 2 characters.',
      });
    }

    if (cleanMessage.length < 3) {
      return sendJson(res, 400, {
        success: false,
        error: 'Please enter a brief message (at least 3 characters).',
      });
    }

    const recipient = process.env.CONTACT_EMAIL?.trim() || 'batoolghouri000@gmail.com';
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const isConfigured = Boolean(
      apiKey && apiKey !== 're_123456789' && !apiKey.includes('YOUR_')
    );

    if (!isConfigured || !apiKey) {
      return sendJson(res, 503, {
        success: false,
        error: 'Email delivery service is not configured. Add RESEND_API_KEY in environment variables.',
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

    const fromAddress =
      process.env.RESEND_FROM_EMAIL?.trim() || 'Portfolio Contact <onboarding@resend.dev>';

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
      return sendJson(res, 502, {
        success: false,
        error:
          error.message ||
          'Resend was unable to deliver this message. Please check recipient and domain authorization.',
      });
    }

    if (!data?.id) {
      return sendJson(res, 502, {
        success: false,
        error: 'No transmission confirmation ID was received from the email provider.',
      });
    }

    return sendJson(res, 200, {
      success: true,
      message: 'Your message was delivered directly to Batool Ghouri’s inbox!',
      deliveryMode: 'resend_live',
      id: data.id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Vercel contact form exception:', message);
    return sendJson(res, 500, {
      success: false,
      error: 'An internal server error occurred while sending your message. Please try again.',
    });
  }
}
