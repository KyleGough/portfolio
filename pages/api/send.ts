import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { EmailTemplate } from '@components/EmailTemplate';

const resend = new Resend(process.env.EMAIL_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await resend.emails.send({
      from: 'contact@kylegough.co.uk',
      to: 'kylegough98@gmail.com',
      subject: `Portfolio Message from ${req.body.name}`,
      html: '<strong>Portfolio message</strong>',
      react: EmailTemplate(req.body),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
