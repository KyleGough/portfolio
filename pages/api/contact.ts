import sgMail from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, message } = req.body;

  // Detect incorrect method.
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const apiKey = process.env.SENDGRID_API_KEY || '';
  const contactRecipient = process.env.CONTACT_RECIPIENT || '';

  const emailMessage = {
    to: contactRecipient,
    from: contactRecipient,
    subject: `Message from ${name} via Portfolio Contact Form`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  sgMail.setApiKey(apiKey);

  return sgMail
    .send(emailMessage)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      res.status(error.code).json({ success: false });
    });
}
