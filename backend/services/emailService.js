import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EmailService {
  constructor() {
    // Configure your email transporter
    this.transporter = nodemailer.createTransporter({
      // For development, you can use ethereal email or mailtrap
      host: process.env.EMAIL_HOST || "smtp.ethereal.email",
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async loadTemplate(templateName, data) {
    try {
      const templatePath = path.join(
        __dirname,
        "../templates",
        `${templateName}.hbs`
      );
      const templateContent = fs.readFileSync(templatePath, "utf8");
      const template = handlebars.compile(templateContent);
      return template(data);
    } catch (error) {
      console.error("Error loading email template:", error);
      throw new Error("Failed to load email template");
    }
  }

  async sendWelcomeEmail(userData, temporaryPassword, practiceData) {
    try {
      const emailData = {
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        temporaryPassword: temporaryPassword,
        practiceName: practiceData.practice_name,
        userRole: userData.user_role,
        loginUrl: process.env.FRONTEND_URL || "http://localhost:3000/login",
      };

      const htmlContent = await this.loadTemplate("welcome-email", emailData);

      const mailOptions = {
        from: process.env.EMAIL_FROM || "noreply@openconsult.com",
        to: userData.email,
        subject: `Welcome to ${practiceData.practice_name} - OpenConsult`,
        html: htmlContent,
        text: `Welcome to ${practiceData.practice_name}! Your login email is ${userData.email} and your temporary password is ${temporaryPassword}. Please log in and change your password immediately.`,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log("Welcome email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Error sending welcome email:", error);
      throw new Error("Failed to send welcome email");
    }
  }

  async sendPasswordResetEmail(userData, resetToken) {
    try {
      const emailData = {
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        resetToken: resetToken,
        resetUrl: `${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
      };

      const htmlContent = await this.loadTemplate("password-reset", emailData);

      const mailOptions = {
        from: process.env.EMAIL_FROM || "noreply@openconsult.com",
        to: userData.email,
        subject: "Password Reset - OpenConsult",
        html: htmlContent,
        text: `Click this link to reset your password: ${emailData.resetUrl}`,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log("Password reset email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw new Error("Failed to send password reset email");
    }
  }

  // Add more email types as needed
  async sendNotificationEmail(userData, subject, message) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || "noreply@openconsult.com",
        to: userData.email,
        subject: subject,
        text: message,
        html: `<p>${message}</p>`,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log("Notification email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Error sending notification email:", error);
      throw new Error("Failed to send notification email");
    }
  }
}

export default EmailService;
