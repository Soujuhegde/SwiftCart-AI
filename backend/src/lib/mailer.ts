import nodemailer from "nodemailer";

// Check if real credentials exist
const hasCredentials = process.env.SMTP_HOST && process.env.EMAIL_USER;

// Create transporter - either real or a dev fallback
export const transporter = hasCredentials
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })
    : nodemailer.createTransport({
        // Fallback for dev: Log to console instead of sending
        jsonTransport: true
    });

if (!hasCredentials) {
    console.log("⚠️ No SMTP credentials found. Email will be simulated (check server console).");
}
