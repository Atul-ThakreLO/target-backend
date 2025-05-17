import nodemailer from "nodemailer";
import transport from "../config/mailConfig.js";
// import { google } from "googleapis";
// import { OAuth2Client } from "google-auth-library";

export const sendMail = async ({to, from, subject, text, htmlPath}) => {
  try {
    // console.log(process.env.EMAIL, to, subject, text, htmlPath);
    const mailOptions = {
      to,
      from,
      subject,
      text,
      html: htmlPath,
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    throw err;
  }
}