import emailjs from '@emailjs/browser';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const PUBLIC_KEY = typeof import.meta !== 'undefined' ? (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) : process.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = typeof import.meta !== 'undefined' ? (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) : process.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = typeof import.meta !== 'undefined' ? (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) : process.env.VITE_EMAILJS_TEMPLATE_ID;

// Initialize EmailJS if public key is available. This ensures SDK is ready.
if (PUBLIC_KEY) {
  try {
    emailjs.init(PUBLIC_KEY);
  } catch (e) {
    // initialization may throw in some runtime environments; log for debugging
    // eslint-disable-next-line no-console
    console.error('EmailJS init failed', e);
  }
}

export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validateForm(data: FormData) {
  const errors: Partial<Record<keyof FormData, string>> = {};
  if (!data.name || data.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!data.email || !validateEmail(data.email)) errors.email = 'Please enter a valid email address.';
  if (!data.subject || data.subject.trim().length < 2) errors.subject = 'Please enter a subject.';
  if (!data.message || data.message.trim().length < 5) errors.message = 'Please enter a message (min 5 characters).';
  return errors;
}

export async function sendEmail(data: FormData) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS is not configured. Missing environment variables (VITE_EMAILJS_*).');
  }

  const templateParams = {
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  };

  // Use the EmailJS browser SDK to send the template after init().
  try {
    return await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
  } catch (err: any) {
    const message = err?.text || err?.message || 'Unknown EmailJS error';
    throw new Error(`EmailJS send failed: ${message}`);
  }
}

export function getConfig() {
  return {
    publicKey: PUBLIC_KEY,
    serviceId: SERVICE_ID,
    templateId: TEMPLATE_ID,
  };
}

export default { sendEmail, validateForm, validateEmail, getConfig };