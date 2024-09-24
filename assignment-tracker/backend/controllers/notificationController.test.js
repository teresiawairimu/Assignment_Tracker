const sgMail = require('@sendgrid/mail');
const { sendEmailNotification } = require('../controllers/notificationController');

jest.mock('@sendgrid/mail'); 

describe('sendEmailNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  /**
   * Test the sendEmailNotification function
   * Mocks the sendEmailNotification function to return a mock object
   */
  it('should send an email notification', async () => {
    sgMail.send.mockResolvedValue();

    const toEmail = 'testuserexample.com';
    const assignmentTitle = 'Test Assignment';
    const deadline = '2024-09-30';

    await expect(sendEmailNotification(toEmail, assignmentTitle, deadline)).resolves.not.toThrow();

    expect(sgMail.send).toHaveBeenCalledWith(
      expect.objectContaining({
      to: toEmail,
      from: 'teresia@techieblitz.com',
      subject: `Reminder: Upcoming Deadline for "${assignmentTitle}"`,
      text: expect.any(String),
      html: expect.any(String),
    })
    );

    expect(sgMail.send).toHaveBeenCalledWith(1);
  });

  /**
   * Test the sendEmailNotification function
   * Mocks the sendEmailNotification function to throw an error
   */
  it('should throw an error when sending an email notification fails', async () => {
    sgMail.send.mockRejectedValue(new Error('Failed to send email'));

    const toEmail = 'testuserexample.com';
    const assignmentTitle = 'Test Assignment';
    const deadline = '2024-09-30';

    await expect(sendEmailNotification(toEmail, assignmentTitle, deadline)).rejects.toThrow('Error sending email');

    expect(sgMail.send).toHaveBeenCalledWith(
      expect.objectContaining({
      to: toEmail,
      from: 'teresia@techieblitz.com',
      subject: `Reminder: Upcoming Deadline for "${assignmentTitle}"`,
      text: expect.any(String),
      html: expect.any(String),
      })
    );

    expect(sgMail.send).toHaveBeenCalledWith(1);
    });

});