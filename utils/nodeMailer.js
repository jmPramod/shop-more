const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const forgotPasswordResetLink = async (payload) => {
  const { _id } = payload;
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' });

  // const resetLink = `http://localhost:3000/password-reset/${_id}/${token}`;
  const resetLink = `${process.env.Front_end_base_url}/password-reset/${_id}/${token}`;
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
    html: `
    
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <!--[if !mso]><!-->
    <style type="text/css">
      @font-face {
        font-family: 'flama-condensed';
        font-weight: 100;
        src: url('http://assets.vervewine.com/fonts/FlamaCond-Medium.eot');
        src: url('http://assets.vervewine.com/fonts/FlamaCond-Medium.eot?#iefix')
            format('embedded-opentype'),
          url('http://assets.vervewine.com/fonts/FlamaCond-Medium.woff')
            format('woff'),
          url('http://assets.vervewine.com/fonts/FlamaCond-Medium.ttf')
            format('truetype');
      }
      @font-face {
        font-family: 'Muli';
        font-weight: 100;
        src: url('http://assets.vervewine.com/fonts/muli-regular.eot');
        src: url('http://assets.vervewine.com/fonts/muli-regular.eot?#iefix')
            format('embedded-opentype'),
          url('http://assets.vervewine.com/fonts/muli-regular.woff2')
            format('woff2'),
          url('http://assets.vervewine.com/fonts/muli-regular.woff')
            format('woff'),
          url('http://assets.vervewine.com/fonts/muli-regular.ttf')
            format('truetype');
      }
      .address-description a {
        color: #000000;
        text-decoration: none;
      }
      @media (max-device-width: 480px) {
        .vervelogoplaceholder {
          height: 83px;
        }
      }
    </style>
    <!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
        .address-description a {
          color: #000000;
          text-decoration: none;
        }
        table {
          border-collapse: collapse;
        }
      </style>
    <![endif]-->
  </head>

  <body
    bgcolor="#e1e5e8"
    style="
      margin-top: 0;
      margin-bottom: 0;
      margin-right: 0;
      margin-left: 0;
      padding-top: 0px;
      padding-bottom: 0px;
      padding-right: 0px;
      padding-left: 0px;
      background-color: #e1e5e8;
    "
  >
    <!--[if gte mso 9]>
  <center>
  <table width="600" cellpadding="0" cellspacing="0"><tr><td valign="top">
  <![endif]-->
    <center
      style="
        width: 100%;
        table-layout: fixed;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        background-color: #e1e5e8;
      "
    >
      <div
        style="
          max-width: 600px;
          margin-top: 0;
          margin-bottom: 0;
          margin-right: auto;
          margin-left: auto;
        "
      >
        <table
          align="center"
          cellpadding="0"
          style="
            border-spacing: 0;
            font-family: 'Muli', Arial, sans-serif;
            color: #333333;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
          "
        >
          <tbody>
            <tr>
              <td
                al  ign="center"
                class="vervelogoplaceholder"
                height="143"
                style="
                  padding-top: 0;
                  padding-bottom: 0;
                  padding-right: 0;
                  padding-left: 0;
                  height: 143px;
                  vertical-align: middle;
                "
                valign="middle"
              >
                <span
                  class="sg-image"
                  data-imagelibrary="%7B%22width%22%3A%22160%22%2C%22height%22%3A34%2C%22alt_text%22%3A%22Verve%20Wine%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/79d8f4f889362f0c7effb2c26e08814bb12f5eb31c053021ada3463c7b35de6fb261440fc89fa804edbd11242076a81c8f0a9daa443273da5cb09c1a4739499f.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"
                  ><a href="#" target="_blank"
                    ><img
                      alt="Verve Wine"
                      height="34"
                      src="https://res.cloudinary.com/dtvq8ysaj/image/upload/v1721155503/Global%20Images/logo1_on8vn4.png"
                      style="
                        border-width: 0px;
                        height: 56px;
                        border-radius: 5px;
                      "
                      width="160" /></a
                ></span>
              </td>
            </tr>
            <!-- Start of Email Body-->
            <tr>
              <td
                class="one-column"
                style="
                  padding-top: 0;
                  padding-bottom: 0;
                  padding-right: 0;
                  padding-left: 0;
                  background-color: #ffffff;
                "
              >
                <!--[if gte mso 9]>
                      <center>
                      <table width="80%" cellpadding="20" cellspacing="30"><tr><td valign="top">
                      <![endif]-->
                <table style="border-spacing: 0" width="100%">
                  <tbody>
                    <tr>
                      <td
                        align="center"
                        class="inner"
                        style="
                          padding-top: 15px;
                          padding-bottom: 15px;
                          padding-right: 30px;
                          padding-left: 30px;
                        "
                        valign="middle"
                      >
                        <span
                          class="sg-image"
                          data-imagelibrary="%7B%22width%22%3A%22255%22%2C%22height%22%3A93%2C%22alt_text%22%3A%22Forgot%20Password%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/35c763626fdef42b2197c1ef7f6a199115df7ff779f7c2d839bd5c6a8c2a6375e92a28a01737e4d72f42defcac337682878bf6b71a5403d2ff9dd39d431201db.png%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"
                          ><img
                            alt="Forgot Password"
                            class="banner"
                            height="93"
                            src="https://marketing-image-production.s3.amazonaws.com/uploads/35c763626fdef42b2197c1ef7f6a199115df7ff779f7c2d839bd5c6a8c2a6375e92a28a01737e4d72f42defcac337682878bf6b71a5403d2ff9dd39d431201db.png"
                            style="
                              border-width: 0px;
                              margin-top: 30px;
                              width: 255px;
                              height: 93px;
                            "
                            width="255"
                        /></span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="inner contents center"
                        style="
                          padding-top: 15px;
                          padding-bottom: 15px;
                          padding-right: 30px;
                          padding-left: 30px;
                          text-align: left;
                        "
                      >
                        <center>
                          <p
                            class="h1 center"
                            style="
                              margin: 0;
                              text-align: center;
                              font-family: 'flama-condensed', 'Arial Narrow',
                                Arial;
                              font-weight: 100;
                              font-size: 30px;
                              margin-bottom: 26px;
                            "
                          >
                            Forgot your password?
                          </p>
                          <!--[if (gte mso 9)|(IE)]> <![endif]-->

                          <p
                            class="description center"
                            style="
                              font-family: 'Muli', 'Arial Narrow', Arial;
                              margin: 0;
                              text-align: center;
                              max-width: 320px;
                              color: #a1a8ad;
                              line-height: 24px;
                              font-size: 15px;
                              margin-bottom: 10px;
                              margin-left: auto;
                              margin-right: auto;
                            "
                          >
                            <span
                              style="
                                color: rgb(161, 168, 173);
                                font-family: Muli, 'Arial Narrow', Arial;
                                font-size: 15px;
                                text-align: center;
                                background-color: rgb(255, 255, 255);
                              "
                              >That's okay, it happens! Click on the button
                              below to reset your password.</span
                            >
                          </p>
                          <!--[if (gte mso 9)|(IE)]><br />&nbsp;<!
                          [endif]--><span
                            class="sg-image"
                            data-imagelibrary="%7B%22width%22%3A%22260%22%2C%22height%22%3A54%2C%22alt_text%22%3A%22Reset%20your%20Password%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/c1e9ad698cfb27be42ce2421c7d56cb405ef63eaa78c1db77cd79e02742dd1f35a277fc3e0dcad676976e72f02942b7c1709d933a77eacb048c92be49b0ec6f3.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"
                            ><a href='${resetLink}' target="_blank"
                              ><img
                                alt="Reset your Password"
                                height="54"
                                src="https://marketing-image-production.s3.amazonaws.com/uploads/c1e9ad698cfb27be42ce2421c7d56cb405ef63eaa78c1db77cd79e02742dd1f35a277fc3e0dcad676976e72f02942b7c1709d933a77eacb048c92be49b0ec6f3.png"
                                style="
                                  border-width: 0px;
                                  margin-top: 30px;
                                  margin-bottom: 50px;
                                  width: 260px;
                                  height: 54px;
                                "
                                width="260" /></a
                          ></span>
                          <!--[if (gte mso 9)|(IE)]><br />&nbsp;<![endif]-->
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                      </td></tr></table>
                      </center>
                      <![endif]-->
              </td>
            </tr>
            <!-- End of Email Body-->
            <!-- whitespace -->
            <tr>
              <td height="40">
                <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0">
                  &nbsp;
                </p>

                <p>&nbsp;</p>
              </td>
            </tr>
            <!-- Social Media -->
            <tr>
              <td
                align="center"
                style="
                  padding-bottom: 0;
                  padding-right: 0;
                  padding-left: 0;
                  padding-top: 0px;
                "
                valign="middle"
              >
                <span
                  class="sg-image"
                  data-imagelibrary="%7B%22width%22%3A%228%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Facebook%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/0a1d076f825eb13bd17a878618a1f749835853a3a3cce49111ac7f18255f10173ecf06d2b5bd711d6207fbade2a3779328e63e26a3bfea5fe07bf7355823567d.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"
                  ><a href="#" target="_blank"
                    ><img
                      alt="Facebook"
                      height="18"
                      src="https://marketing-image-production.s3.amazonaws.com/uploads/0a1d076f825eb13bd17a878618a1f749835853a3a3cce49111ac7f18255f10173ecf06d2b5bd711d6207fbade2a3779328e63e26a3bfea5fe07bf7355823567d.png"
                      style="
                        border-width: 0px;
                        margin-right: 21px;
                        margin-left: 21px;
                        width: 8px;
                        height: 18px;
                      "
                      width="8" /></a
                ></span>
                <!--[if gte mso 9]>&nbsp;&nbsp;&nbsp;<!
                [endif]--><span
                  class="sg-image"
                  data-imagelibrary="%7B%22width%22%3A%2223%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Twitter%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/6234335b200b187dda8644356bbf58d946eefadae92852cca49fea227cf169f44902dbf1698326466ef192bf122aa943d61bc5b092d06e6a940add1368d7fb71.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"
                  ><a href="#" target="_blank"
                    ><img
                      alt="Twitter"
                      height="18"
                      src="https://marketing-image-production.s3.amazonaws.com/uploads/6234335b200b187dda8644356bbf58d946eefadae92852cca49fea227cf169f44902dbf1698326466ef192bf122aa943d61bc5b092d06e6a940add1368d7fb71.png"
                      style="
                        border-width: 0px;
                        margin-right: 16px;
                        margin-left: 16px;
                        width: 23px;
                        height: 18px;
                      "
                      width="23" /></a
                ></span>
                <!--[if gte mso 9]>&nbsp;&nbsp;&nbsp;&nbsp;<!
                [endif]--><span
                  class="sg-image"
                  data-imagelibrary="%7B%22width%22%3A%2218%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Instagram%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/650ae3aa9987d91a188878413209c1d8d9b15d7d78854f0c65af44cab64e6c847fd576f673ebef2b04e5a321dc4fed51160661f72724f1b8df8d20baff80c46a.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"
                  ><a href="#" target="_blank"
                    ><img
                      alt="Instagram"
                      height="18"
                      src="https://marketing-image-production.s3.amazonaws.com/uploads/650ae3aa9987d91a188878413209c1d8d9b15d7d78854f0c65af44cab64e6c847fd576f673ebef2b04e5a321dc4fed51160661f72724f1b8df8d20baff80c46a.png"
                      style="
                        border-width: 0px;
                        margin-right: 16px;
                        margin-left: 16px;
                        width: 18px;
                        height: 18px;
                      "
                      width="18" /></a
                ></span>
              </td>
            </tr>
            <!-- whitespace -->
            <tr>
              <td height="25">
                <p style="line-height: 25px; padding: 0 0 0 0; margin: 0 0 0 0">
                  &nbsp;
                </p>

                <p>&nbsp;</p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td
                style="
                  padding-top: 0;
                  padding-bottom: 0;
                  padding-right: 30px;
                  padding-left: 30px;
                  text-align: center;
                  margin-right: auto;
                  margin-left: auto;
                "
              >
                <center>
                  <p
                    style="
                      font-family: 'Muli', Arial, sans-serif;
                      margin: 0;
                      text-align: center;
                      margin-right: auto;
                      margin-left: auto;
                      font-size: 15px;
                      color: #a1a8ad;
                      line-height: 23px;
                    "
                  >
                    Problems or questions? Call us at
                    <nobr
                      ><a
                        class="tel"
                        href="tel:2128102899"
                        style="color: #a1a8ad; text-decoration: none"
                        target="_blank"
                        ><span style="white-space: nowrap"
                          >212.810.2899</span
                        ></a
                      ></nobr
                    >
                  </p>

                  <p
                    style="
                      font-family: 'Muli', Arial, sans-serif;
                      margin: 0;
                      text-align: center;
                      margin-right: auto;
                      margin-left: auto;
                      font-size: 15px;
                      color: #a1a8ad;
                      line-height: 23px;
                    "
                  >
                    or email
                    <a
                      href="mailto:pramodjm4@gmail.com"
                      style="color: #a1a8ad; text-decoration: underline"
                      target="_blank"
                      >pramodjm4@gmail.com</a
                    >
                  </p>

                  <p
                    style="
                      font-family: 'Muli', Arial, sans-serif;
                      margin: 0;
                      text-align: center;
                      margin-right: auto;
                      margin-left: auto;
                      padding-top: 10px;
                      padding-bottom: 0px;
                      font-size: 15px;
                      color: #a1a8ad;
                      line-height: 23px;
                    "
                  >
                    © Shop More
                    <span style="white-space: nowrap">24 ​Hubert S​t​</span>,
                    <span style="white-space: nowrap">Ne​w Yor​k,</span>
                    <span style="white-space: nowrap">N​Y 1​0013</span>
                  </p>
                </center>
              </td>
            </tr>
            <!-- whitespace -->
            <tr>
              <td height="40">
                <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0">
                  &nbsp;
                </p>

                <p>&nbsp;</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </center>
    <!--[if gte mso 9]>
  </td></tr></table>
  </center>
  <![endif]-->
  </body>
</html>

    `, // html body
  };
  try {
    transporter.sendMail(mailOption);
  } catch (err) {
    console.log('error in sending email', err);
  }
  return resetLink;
};
module.exports = { forgotPasswordResetLink };
