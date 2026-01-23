import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("Mail transporter verification failed:", error);
  } else {
    console.log("Mail transporter is ready to send emails");
  }
});