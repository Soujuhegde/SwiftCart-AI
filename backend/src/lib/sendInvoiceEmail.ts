import { transporter } from "./mailer";

export async function sendInvoiceEmail(
    userEmail: string,
    invoiceHtml: string
) {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: userEmail,
        subject: "Your SwiftCart Invoice",
        html: invoiceHtml,
    });
}
