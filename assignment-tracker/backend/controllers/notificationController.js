const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

 
const sendEmailNotification = async (toEmail, assignmentTitle, deadline) => {
  console.log('Sending email to', toEmail);
  const msg = {
    to: toEmail,
    from: 'teresia@techieblitz.com',
    subject: `Reminder: Upcoming Deadline for "${assignmentTitle}"`,
    text: `Hello, just a reminder that your assignment "${assignmentTitle}" is due on ${deadline}. Please ensure it is completed before the deadline.`,
    html: `<p>Hello,</p><p>Just a reminder that your assignment <strong>"${assignmentTitle}"</strong> is due on <strong>${deadline}</strong>.</p><p>Please ensure it is completed on time.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully to', toEmail);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

module.exports = {
  sendEmailNotification,
};
