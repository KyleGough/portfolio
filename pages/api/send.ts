import { EmailTemplate } from '@components/EmailTemplate';
import joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

interface Email {
  email: string;
  message: string;
  name: string;
}

const resend = new Resend(process.env.EMAIL_API_KEY);

const send = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method || 'UNKNOWN'} Not Allowed`);
    return;
  }

  const schema = joi.object({
    email: joi.string().email().max(254).required(),
    message: joi.string().max(1024).required(),
    name: joi.string().max(50).required(),
  });

  try {
    const body = req.body as Email;
    const { error } = schema.validate(req.body);
    if (error) {
      throw error;
    }

    const data = await resend.emails.send({
      from: 'contact@kylegough.co.uk',
      to: 'kylegough98@gmail.com',
      subject: `Portfolio Message from ${body.name}`,
      html: '<strong>Portfolio message</strong>',
      react: EmailTemplate(body),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default send;

// POST only.
