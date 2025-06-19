const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendMailToAuthor = async ({ to, subject, html, text }) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    await transporter.sendMail({
        from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
        to,
        subject,
        text,
        html
    });

};