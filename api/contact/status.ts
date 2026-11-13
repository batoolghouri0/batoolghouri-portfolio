interface ApiRequest {
  method?: string;
}

interface ApiResponse {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
}

export default function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method && req.method !== 'GET') {
    res.statusCode = 405;
    res.end(JSON.stringify({ status: 'error', error: 'Method not allowed' }));
    return;
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const isResendConfigured = Boolean(
    apiKey && apiKey !== 're_123456789' && !apiKey.includes('YOUR_')
  );
  const recipientEmail = process.env.CONTACT_EMAIL?.trim() || 'batoolghouri000@gmail.com';

  res.statusCode = 200;
  res.end(
    JSON.stringify({
      status: 'ok',
      configured: isResendConfigured,
      recipient: recipientEmail,
      provider: 'Resend',
      message: isResendConfigured
        ? 'Email delivery is active via Resend.'
        : 'RESEND_API_KEY is missing from your deployment environment variables.',
    })
  );
}
