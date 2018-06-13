require('dotenv').config();

// Send error emails
const sendErrorEmail = error => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'sportsnucleus.io@gmail.com',
    from: 'sportsnucleus.io@gmail.com',
    subject: 'Error',
    text: error
  };
  sgMail.send(msg);
};

module.exports = { sendErrorEmail };
