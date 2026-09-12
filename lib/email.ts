import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface WelcomeEmailParams {
  to: string;
  fullName: string;
  provider?: string;
}

export async function sendWelcomeEmail({ to, fullName, provider }: WelcomeEmailParams) {
  const method = provider === "google" ? "Google" : "email & password";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f0fdf4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdf4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#065f46,#0d9488);padding:40px 40px 30px;text-align:center;">
              <div style="font-size:36px;margin-bottom:8px;">💚</div>
              <h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0;">SewaCare</h1>
              <p style="color:#d1fae5;font-size:13px;margin:4px 0 0;letter-spacing:0.5px;">Hospital Management System</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="color:#111827;font-size:22px;font-weight:600;margin:0 0 8px;">
                Welcome aboard, ${fullName}! 🎉
              </h2>
              <p style="color:#6b7280;font-size:15px;line-height:1.7;margin:0 0 24px;">
                Your account has been created successfully using <strong style="color:#065f46;">${method}</strong> sign-in.
                You're now ready to manage hospital operations with SewaCare.
              </p>

              <!-- Info Card -->
              <div style="background-color:#f0fdf4;border:1px solid #d1fae5;border-radius:12px;padding:20px;margin-bottom:24px;">
                <p style="color:#065f46;font-size:13px;font-weight:600;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.5px;">Your Account Details</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:6px 0;color:#6b7280;font-size:14px;">Name</td>
                    <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:500;text-align:right;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#6b7280;font-size:14px;">Email</td>
                    <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:500;text-align:right;">${to}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#6b7280;font-size:14px;">Sign-in Method</td>
                    <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:500;text-align:right;">${method}</td>
                  </tr>
                </table>
              </div>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:8px 0 24px;">
                    <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard"
                       style="display:inline-block;background-color:#065f46;color:#ffffff;font-size:15px;font-weight:600;padding:14px 36px;border-radius:8px;text-decoration:none;">
                      Go to Dashboard →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color:#9ca3af;font-size:13px;line-height:1.6;margin:0;">
                If you didn't create this account, please contact our support team immediately or ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="color:#9ca3af;font-size:12px;margin:0;text-align:center;">
                © ${new Date().getFullYear()} SewaCare — Smart healthcare. Better service.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"SewaCare" <${process.env.SMTP_USER}>`,
      to,
      subject: `Welcome to SewaCare, ${fullName}! 🎉`,
      html,
    });
    console.log(`Welcome email sent to ${to}`);
    return true;
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return false;
  }
}
