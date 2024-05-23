const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const forgotPasswordResetLink = async (payload) => {
  const { _id } = payload;
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' });

  const resetLink = `${process.env.Front_end_base_url}/api/reset-password/${_id}/${token}`;
  // const resetLink = ` http://localhost:5900/api/reset-password/${_id}/${token}`;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.ACCOUNT_LOGIN,
      pass: process.env.NODE_MAILER_SECRET,
    },
  });
  const mailOption = {
    from: { name: 'Customer Support', address: process.env.ACCOUNT_LOGIN },
    to: [payload.email], // list of receivers
    subject: 'Forgot Your Password? Reset Here ', // Subject line
    text: `Hello user you had requested for reset password , this link will expire in 10 min `, // plain text body
    html: `<b>Hello world?</b> <h2>reset link :${resetLink}</h2>`, // html body
  };
  try {
    transporter.sendMail(mailOption);
  } catch (err) {
    console.log('error in sending email', err);
  }
  return resetLink;
};
module.exports = { forgotPasswordResetLink };
