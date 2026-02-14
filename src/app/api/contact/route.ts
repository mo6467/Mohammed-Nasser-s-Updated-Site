import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Email notification function using Resend
async function sendEmailNotification(data: ContactFormData) {
  const { name, email, message } = data;
  
  // Log email for debugging
  console.log("\n" + "=".repeat(60));
  console.log("📧 NEW CONTACT FORM SUBMISSION");
  console.log("=".repeat(60));
  console.log(`From: ${name} <${email}>`);
  console.log("-".repeat(60));
  console.log("Message:");
  console.log(message);
  console.log("=".repeat(60) + "\n");

  // Store in database for persistence
  try {
    const { db } = await import('@/lib/db');
    await db.contactMessage.create({
      data: {
        name: name,
        email: email,
        message: message,
        createdAt: new Date()
      }
    });
    console.log("✅ Message saved to database");
  } catch (dbError) {
    console.error("⚠️ Database save failed:", dbError);
  }

  // Send email via Resend
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["wwwmohamednasser620@gmail.com"],
      subject: `📬 رسالة جديدة من: ${name}`,
      html: `
<!DOCTYPE html>
<html dir="ltr">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #e5e7eb; max-width: 600px; margin: 0 auto; padding: 20px; background: #111827; }
    .container { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); border-radius: 16px; overflow: hidden; border: 1px solid #374151; }
    .header { background: linear-gradient(135deg, #0891b2 0%, #14b8a6 100%); padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; color: white; }
    .content { padding: 30px; }
    .field { margin-bottom: 24px; }
    .label { font-weight: 600; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    .value { font-size: 16px; color: #f9fafb; }
    .name-value { font-size: 20px; font-weight: 600; background: linear-gradient(135deg, #06b6d4, #14b8a6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .email-link { color: #06b6d4; text-decoration: none; }
    .email-link:hover { text-decoration: underline; }
    .message-box { background: #1f2937; padding: 20px; border-left: 4px solid #14b8a6; border-radius: 0 12px 12px 0; white-space: pre-wrap; font-size: 15px; line-height: 1.7; color: #e5e7eb; }
    .footer { text-align: center; padding: 20px; border-top: 1px solid #374151; color: #6b7280; font-size: 12px; }
    .reply-btn { display: inline-block; background: linear-gradient(135deg, #0891b2 0%, #14b8a6 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 رسالة جديدة من الموقع</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">👤 الاسم</div>
        <div class="value name-value">${escapeHtml(name)}</div>
      </div>
      <div class="field">
        <div class="label">📧 البريد الإلكتروني</div>
        <div class="value"><a class="email-link" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
      </div>
      <div class="field">
        <div class="label">💬 الرسالة</div>
        <div class="message-box">${escapeHtml(message)}</div>
      </div>
      <a class="reply-btn" href="mailto:${escapeHtml(email)}?subject=Re: Your message">↩️ رد على الرسالة</a>
    </div>
    <div class="footer">
      <p>تم إرسال هذه الرسالة عبر نموذج التواصل في موقعك الشخصي</p>
    </div>
  </div>
</body>
</html>
      `,
      text: `
رسالة جديدة من الموقع
==================

الاسم: ${name}
البريد الإلكتروني: ${email}

الرسالة:
${message}

---
رد على: ${email}
      `.trim()
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return false;
    }

    console.log("✅ Email sent successfully via Resend! ID:", emailData?.id);
    return true;
  } catch (emailError) {
    console.error("❌ Failed to send email:", emailError);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();
    const { name, email, message } = data;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Trim and validate
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();

    // Name validation
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Message validation
    if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 5000 characters" },
        { status: 400 }
      );
    }

    // Spam protection - check for common spam patterns
    const spamPatterns = [
      /\[url=/i,
      /\[link=/i,
      /<a\s+href=/i,
      /viagra|cialis|casino|lottery|winner/i
    ];
    
    if (spamPatterns.some(pattern => pattern.test(trimmedMessage))) {
      console.log("⚠️ Spam detected, rejecting message");
      return NextResponse.json(
        { error: "Message contains disallowed content" },
        { status: 400 }
      );
    }

    // Send email notification
    await sendEmailNotification({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. I'll get back to you soon!"
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email directly." },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
