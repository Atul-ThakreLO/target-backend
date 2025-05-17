import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    service: "gamil",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  export default transport;