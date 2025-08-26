const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   
    pass: process.env.EMAIL_PASS,  
  }
});

const sendMail = async ({sender, receiver, subject, text, html}) => {
    try {
        console.log('Attempting to send email from:', sender, 'to:', receiver);
        console.log('Email config:', {
            user: process.env.EMAIL_USER,
            passExists: !!process.env.EMAIL_PASS
        });
        
        const info = await transporter.sendMail({
            to: receiver, 
            subject: subject, 
            text: text, 
            html: html, 
        });
        console.log("Email sent successfully. Message ID:", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Email sending failed:", error);
        throw error; // Re-throw to be caught by the route handler
    }
}

module.exports = sendMail;