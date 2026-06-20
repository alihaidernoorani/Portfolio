import type { ContactMessage } from '@/types';

interface EmailJSTemplateParams extends Record<string, unknown> {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

function toTemplateParams(msg: ContactMessage): EmailJSTemplateParams {
  return {
    from_name: msg.senderName,
    from_email: msg.senderEmail,
    subject: msg.subject,
    message: msg.body,
  };
}

export async function sendContactMessage(msg: ContactMessage): Promise<void> {
  const { default: emailjs } = await import('@emailjs/browser');

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '';
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '';

  const result = await emailjs.send(serviceId, templateId, toTemplateParams(msg), {
    publicKey,
  });

  if (result.status !== 200) {
    throw new Error(`EmailJS error: ${result.text}`);
  }
}
