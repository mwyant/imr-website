import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { env } from '$env/dynamic/private';

const SPREADSHEET_ID = '1WgtN1f66v9H6qDnvyZJCmd6VZHfxNOYye2ytEZJBO3c';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** @type {import('./$types').Actions} */
export const actions = {
  contact: async ({ request }) => {
    const data = await request.formData();
    
    // Honeypot check for spam bots
    const honeypot = data.get('website_url');
    if (honeypot) {
      // Silently accept without triggering email or sheets
      return { success: true };
    }

    const rawName = data.get('name');
    const rawEmail = data.get('email');
    const rawSubject = data.get('subject') || 'General Inquiry';
    const rawMessage = data.get('message') || '';
    const type = data.get('type'); // 'contact' or 'newsletter'

    const name = typeof rawName === 'string' ? rawName.trim().slice(0, 100) : '';
    const email = typeof rawEmail === 'string' ? rawEmail.trim().slice(0, 150) : '';
    const subject = typeof rawSubject === 'string' ? rawSubject.trim().slice(0, 200) : 'General Inquiry';
    const message = typeof rawMessage === 'string' ? rawMessage.trim().slice(0, 5000) : '';

    // Validation
    if (type === 'contact') {
      if (!name || !email || !message) {
        return { success: false, error: 'All fields (Name, Email, Message) are required.' };
      }
    } else if (type === 'newsletter') {
      if (!email || !name) {
        return { success: false, error: 'Name and Email address are required.' };
      }
    } else {
      return { success: false, error: 'Invalid transmission type.' };
    }

    if (!EMAIL_REGEX.test(email)) {
      return { success: false, error: 'Invalid email address format.' };
    }

    // Check environment variables
    const gmailUser = env.GMAIL_USER;
    const clientId = env.GMAIL_CLIENT_ID;
    const clientSecret = env.GMAIL_CLIENT_SECRET;
    const refreshToken = env.GMAIL_REFRESH_TOKEN;

    if (!gmailUser || !clientId || !clientSecret || !refreshToken) {
      console.error('Missing Gmail OAuth2 environment variables');
      return { 
        success: false, 
        error: 'Mail server configuration error. Please contact administrator directly.' 
      };
    }

    const auth = new google.auth.OAuth2(clientId, clientSecret);
    auth.setCredentials({ refresh_token: refreshToken });

    try {
      const timestamp = new Date().toISOString();

      // 1. Log to Google Sheets (Mission Log) - ONLY for newsletter signups
      if (type === 'newsletter') {
        const sheets = google.sheets({ version: 'v4', auth });
        
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: 'Sheet1!A:F',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[timestamp, name, email, type, subject, message]]
          }
        });
      }

      // 2. Send Email via Nodemailer
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
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safeSubject = escapeHtml(subject);
      const safeMessage = escapeHtml(message);

      if (type === 'newsletter') {
        mailOptions = {
          from: `"IMR Systems" <${gmailUser}>`,
          to: `mike@wyantswalk.net, ${email}`,
          subject: `[IMR_NEWSLETTER_SIGNUP] New Subscriber: ${name}`,
          text: `A new user has requested to join the mission newsletter.\n\nName: ${name}\nEmail: ${email}\nTimestamp: ${timestamp}\n\n[VERIFICATION_COPY] This is a copy of your transmission to IMR Mission Control.`,
          html: `
            <div style="font-family: monospace; background-color: #0b132b; color: #e0e1dd; padding: 20px; border: 1px solid #1b263b;">
              <h2 style="color: #ff5f1f; border-bottom: 1px solid #ff5f1f; padding-bottom: 10px;">[IMR_NEWSLETTER_SIGNUP]</h2>
              <p>A new user has requested to join the mission newsletter.</p>
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #ff5f1f;">${safeEmail}</a></p>
              <p style="color: #5c677d; font-size: 11px; margin-top: 20px;">Timestamp: ${timestamp}</p>
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
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nTimestamp: ${timestamp}\n\n[VERIFICATION_COPY] This is a copy of your transmission to IMR Mission Control.`,
          html: `
            <div style="font-family: monospace; background-color: #0b132b; color: #e0e1dd; padding: 20px; border: 1px solid #1b263b;">
              <h2 style="color: #ff5f1f; border-bottom: 1px solid #ff5f1f; padding-bottom: 10px;">[IMR_CONTACT_FORM]</h2>
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #ff5f1f;">${safeEmail}</a></p>
              <p><strong>Subject:</strong> ${safeSubject}</p>
              <hr style="border: 0; border-top: 1px solid #1b263b; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; background-color: #1c2541; padding: 15px; border-left: 3px solid #ff5f1f;">${safeMessage}</p>
              <p style="color: #5c677d; font-size: 11px; margin-top: 20px;">Timestamp: ${timestamp}</p>
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
      console.error('Error in mission log or email:', error);
      return { 
        success: false, 
        error: `Transmission failed: ${error.message || 'Unknown error'}` 
      };
    }
  }
};
