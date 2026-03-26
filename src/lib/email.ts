import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY!;

// Initialize Resend with the API key
export const resend = new Resend(resendApiKey);

// A reusable function for sending emails
export const sendEmail = async ({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) => {
    try {
        const data = await resend.emails.send({
            from: 'UniLink <onboarding@resend.dev>', // Change when you get a domain
            to,
            subject,
            html,
        });
        return data;
    } catch (error) {
        console.error('Email sending failed', error);
        throw error;
    }
};
