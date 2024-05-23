import nodemailer from 'nodemailer';

import { credentialsSyncedTemplated } from './email-template';

const {
  HOST,
  EMAIL_FROM,
  EMAIL_AUTH_USER,
  EMAIL_AUTH_PASS,
  PORT
} = process.env;

const EMAIL_TEMPLATES = {
  forgotPassword: credentialsSyncedTemplated
};

export const sendEmail = async (
  email,
  subject,
  type,
  name,
  token
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secureConnection: false,
      auth: {
        user: EMAIL_AUTH_USER,
        pass: EMAIL_AUTH_PASS
      }
    });

    const emailTemplate = EMAIL_TEMPLATES[type];

    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject,
      html: emailTemplate({
        userName: name,
        token
      })
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
