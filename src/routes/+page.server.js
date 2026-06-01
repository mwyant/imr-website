import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').Actions} */
export const actions = {
  contact: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const subject = data.get('subject') || 'General Inquiry';
    const message = data.get('message');
    const type = data.get('type'); // 'contact' or 'newsletter'

    // Validation
    if (type === 'contact') {
      if (!name || !email || !message) {
        return { success: false, error: 'All fields (Name, Email, Message) are required.' };
      }
    } else if (type === 'newsletter') {
      if (!email) {
        return { success: false, error: 'Email address is required.' };
      }
    } else {
      return { success: false, error: 'Invalid transmission type.' };
    }

    // Check environment variables
    const gmailUser = env.GMAIL_USER;
    const clientId = env.GMAIL_CLIENT_ID;
    const clientSecret = env.GMAIL_CLIENT_SECRET;
    const refreshToken = env.GMAIL_REFRESH_TOKEN;

    if (!gmailUser || !clientId || !clientSecret || !refreshToken) {
      console.error('Missing Gmail OAuth2 environment variables:', {
        GMAIL_USER: !!gmailUser,
        GMAIL_CLIENT_ID: !!clientId,
        GMAIL_CLIENT_SECRET: !!clientSecret,
        GMAIL_REFRESH_TOKEN: !!refreshToken
      });
      return { 
        success: false, 
        error: 'Mail server configuration error. Please contact administrator directly at mike@wyantswalk.net.' 
      };
    }

    try {
      // Configure OAuth2 transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: gmailUser,
          clientId: clientId,
          clientSecret: clientSecret,
          refreshToken: refreshToken
        }
      });

      let mailOptions;

      if (type === 'newsletter') {
        mailOptions = {
          from: `"IMR Systems" <${gmailUser}>`,
          to: `mike@wyantswalk.net, ${email}`,
          subject: `[IMR_NEWSLETTER_SIGNUP] New Subscriber: ${name}`,
          text: `A new user has requested to join the mission newsletter.\n\nName: ${name}\nEmail: ${email}\nTimestamp: ${new Date().toISOString()}\n\n[VERIFICATION_COPY] This is a copy of your transmission to IMR Mission Control.`,
          html: `
            <div style="font-family: monospace; background-color: #0b132b; color: #e0e1dd; padding: 20px; border: 1px solid #1b263b;">
              <h2 style="color: #ff5f1f; border-bottom: 1px solid #ff5f1f; padding-bottom: 10px;">[IMR_NEWSLETTER_SIGNUP]</h2>
              <p>A new user has requested to join the mission newsletter.</p>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #ff5f1f;">${email}</a></p>
              <p style="color: #5c677d; font-size: 11px; margin-top: 20px;">Timestamp: ${new Date().toISOString()}</p>
              <p style="color: #5c677d; font-size: 10px; margin-top: 30px; border-top: 1px solid #1b263b; padding-top: 10px;">
                [VERIFICATION_COPY] This is a copy of your transmission to IMR Mission Control.
              </p>
            </div>
          `
        };
      } else {
        mailOptions = {
          from: `"IMR Systems" <${gmailUser}>`,
          to: `mike@wyantswalk.net, ${email}`,
          replyTo: `"${name}" <${email}>`,
          subject: `[IMR_CONTACT_FORM] ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nTimestamp: ${new Date().toISOString()}\n\n[VERIFICATION_COPY] This is a copy of your transmission to IMR Mission Control.`,
          html: `
            <div style="font-family: monospace; background-color: #0b132b; color: #e0e1dd; padding: 20px; border: 1px solid #1b263b;">
              <h2 style="color: #ff5f1f; border-bottom: 1px solid #ff5f1f; padding-bottom: 10px;">[IMR_CONTACT_FORM]</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #ff5f1f;">${email}</a></p>
              <p><strong>Subject:</strong> ${subject}</p>
              <hr style="border: 0; border-top: 1px solid #1b263b; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; background-color: #1c2541; padding: 15px; border-left: 3px solid #ff5f1f;">${message}</p>
              <p style="color: #5c677d; font-size: 11px; margin-top: 20px;">Timestamp: ${new Date().toISOString()}</p>
              <p style="color: #5c677d; font-size: 10px; margin-top: 30px; border-top: 1px solid #1b263b; padding-top: 10px;">
                [VERIFICATION_COPY] This is a copy of your transmission to IMR Mission Control.
              </p>
            </div>
          `
        };
      }

      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { 
        success: false, 
        error: `Transmission failed: ${error.message || 'Unknown error'}` 
      };
    }
  }
};
