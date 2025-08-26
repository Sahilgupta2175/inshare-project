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
        const info = await transporter.sendMail({
            from: `inShare <${sender}>`, 
            to: receiver, 
            subject: subject, 
            text: text, 
            html: html, 
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
}

module.exports = sendMail;