require('dotenv').config(); // Load environment variables from .env
const sgMail = require('@sendgrid/mail');

// Set your SendGrid API key from the environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Set up the email content
const msg = {
  to: 'nduatiteresia82@gmail.com', // Change to your recipient's email
  from: 'teresia@techieblitz.com',  // Change to your verified sender's email
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

// Send the email
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  });
