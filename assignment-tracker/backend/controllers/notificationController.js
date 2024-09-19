const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * sends email notification
 * @async
 * @param {string} toEmail - The email address to send the notification to
 * @param {string} assignmentTitle - The title of the assignment
 * @param {string} deadline - The deadline of the assignment
 * @returns {Promise<void>} - Resolves when the email is sent
 * @throws {Error} - Logs an error message if sending the email fails
 */

const sendEmailNotification = async (toEmail, assignmentTitle, deadline) => {

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
    throw new Error('Error sending email');
  }
};

module.exports = {
  sendEmailNotification,
};
