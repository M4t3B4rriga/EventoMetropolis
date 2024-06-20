import nodemailer from 'nodemailer'

export class NodemailerService {
    static #transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    /**
     * 
     * @param {import('nodemailer/lib/sendmail-transport').MailOptions} mailOptions 
     */
    static sendMail(mailOptions) {
        this.#transporter.sendMail(mailOptions)
    }
}