const nodemailer = require("nodemailer");

// ─── Transporter ─────────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",   // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ─── Send acknowledgment to the user ────────────────────────────────────────
async function sendAcknowledgment({ firstName, email, subject }) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"90-Days Freedom System" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: `We received your message — ${subject}`,
    html: `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#063114,#0d4a1e);padding:32px 40px;border-radius:12px 12px 0 0;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
            <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#14532d,#22c55e);display:flex;align-items:center;justify-content:center;text-align:center;line-height:1;">
              <span style="color:white;font-weight:800;font-size:11px;display:block;">90<br/><span style="font-size:8px;font-weight:600;">Days</span></span>
            </div>
            <span style="color:white;font-weight:700;font-size:16px;">90-Days Freedom System</span>
          </div>
          <h1 style="color:white;font-size:22px;font-weight:800;margin:0;line-height:1.3;">
            We've received your message!
          </h1>
          <p style="color:rgba(255,255,255,0.65);font-size:14px;margin:8px 0 0;">
            Thank you for reaching out, ${firstName}.
          </p>
        </div>

        <!-- Body -->
        <div style="padding:32px 40px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:14px;line-height:1.7;margin-top:0;">
            Hi <strong>${firstName}</strong>,
          </p>
          <p style="color:#374151;font-size:14px;line-height:1.7;">
            We've successfully received your message regarding <strong>"${subject}"</strong>.
            Our team will review it and get back to you as soon as possible — typically within <strong>1–2 business days</strong>.
          </p>

          <div style="background:#f0fdf4;border-left:4px solid #22c55e;border-radius:0 8px 8px 0;padding:14px 18px;margin:24px 0;">
            <p style="color:#14532d;font-size:13px;font-weight:600;margin:0 0 4px;">What happens next?</p>
            <ul style="color:#374151;font-size:13px;margin:0;padding-left:18px;line-height:1.8;">
              <li>Our team reviews your message</li>
              <li>We'll reach out to the email address you provided</li>
              <li>If urgent, reply directly to this email</li>
            </ul>
          </div>

          <p style="color:#374151;font-size:14px;line-height:1.7;">
            In the meantime, feel free to explore our courses or join our community.
          </p>

          <a href="${process.env.CLIENT_ORIGIN || "http://localhost:4000"}/courses"
            style="display:inline-block;background:linear-gradient(135deg,#14532d,#16a34a);color:white;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;margin-top:8px;">
            Browse Courses
          </a>

          <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;" />

          <p style="color:#9ca3af;font-size:12px;line-height:1.6;margin:0;">
            You're receiving this email because you submitted a contact form on 90-Days Freedom System.
            If this wasn't you, please ignore this email.
          </p>
        </div>
      </div>
    `,
  });
}

// ─── Notify admin of new contact submission ───────────────────────────────────
async function notifyAdmin({ firstName, lastName, email, phone, subject, message }) {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"90-Days Freedom System" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `📬 New Contact: ${subject}`,
    html: `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:560px;margin:0 auto;">
        <div style="background:#063114;padding:24px 32px;border-radius:12px 12px 0 0;">
          <h2 style="color:white;margin:0;font-size:18px;">New Contact Form Submission</h2>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:24px 32px;border-radius:0 0 12px 12px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${[
              ["Name", `${firstName} ${lastName}`],
              ["Email", email],
              ["Phone", phone || "—"],
              ["Subject", subject],
            ].map(([label, value]) => `
              <tr>
                <td style="padding:8px 0;color:#6b7280;font-weight:600;width:90px;vertical-align:top;">${label}</td>
                <td style="padding:8px 0;color:#111827;">${value}</td>
              </tr>
            `).join("")}
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-weight:600;vertical-align:top;">Message</td>
              <td style="padding:8px 0;color:#111827;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</td>
            </tr>
          </table>
        </div>
      </div>
    `,
  });
}

// ─── Send welcome email after registration ────────────────────────────────────
async function sendWelcomeEmail({ name, email }) {
  const transporter = createTransporter();
  const firstName = name.split(" ")[0];
  const appUrl = process.env.CLIENT_ORIGIN || "http://localhost:4000";

  await transporter.sendMail({
    from: `"90-Days Freedom System" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: "Welcome to 90-Days Freedom System 🎉",
    html: `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#063114 0%,#0d4a1e 60%,#14532d 100%);padding:40px 40px 32px;">
          <!-- Logo -->
          <div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:28px;">
            <div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#22c55e,#16a34a);display:flex;flex-direction:column;align-items:center;justify-content:center;">
              <span style="color:white;font-weight:800;font-size:12px;line-height:1;display:block;text-align:center;">90</span>
              <span style="color:white;font-weight:600;font-size:8px;line-height:1;display:block;text-align:center;">Days</span>
            </div>
            <span style="color:white;font-weight:700;font-size:16px;letter-spacing:0.01em;">90-Days Freedom System</span>
          </div>

          <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0 0 8px;line-height:1.25;">
            Welcome aboard, ${firstName}! 🎉
          </h1>
          <p style="color:rgba(255,255,255,0.65);font-size:14px;margin:0;line-height:1.6;">
            Your account is ready. Let's build something great together.
          </p>
        </div>

        <!-- Body -->
        <div style="padding:36px 40px;">
          <p style="color:#374151;font-size:15px;line-height:1.75;margin-top:0;">
            Hi <strong>${firstName}</strong>,
          </p>
          <p style="color:#374151;font-size:14px;line-height:1.75;">
            You've successfully joined the <strong>90-Days Freedom System</strong> — a structured program designed to help you turn chaotic operations into self-running systems in just 90 days.
          </p>

          <!-- What's next cards -->
          <div style="margin:28px 0;display:flex;flex-direction:column;gap:14px;">
            ${[
              { icon: "📚", title: "Explore Courses", desc: "Browse our full library and start learning at your own pace.", link: `${appUrl}/courses`, cta: "Browse Courses" },
              { icon: "💬", title: "Join the Community", desc: "Connect with other members and get weekly office hours access.", link: `${appUrl}/#pricing`, cta: "See Plans" },
              { icon: "📩", title: "Contact Support", desc: "Got a question? Our team responds within 1–2 business days.", link: `${appUrl}/#contact`, cta: "Get Help" },
            ].map(({ icon, title, desc, link, cta }) => `
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:18px 20px;display:flex;align-items:flex-start;gap:14px;">
                <span style="font-size:22px;flex-shrink:0;margin-top:2px;">${icon}</span>
                <div style="flex:1;">
                  <p style="font-weight:700;color:#111827;font-size:14px;margin:0 0 4px;">${title}</p>
                  <p style="color:#6b7280;font-size:13px;margin:0 0 10px;line-height:1.5;">${desc}</p>
                  <a href="${link}" style="display:inline-block;background:#063114;color:white;font-size:12px;font-weight:700;padding:6px 16px;border-radius:6px;text-decoration:none;">${cta}</a>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- Big CTA -->
          <div style="text-align:center;margin:32px 0 8px;">
            <a href="${appUrl}/courses"
              style="display:inline-block;background:linear-gradient(135deg,#14532d,#16a34a);color:white;font-weight:700;font-size:15px;padding:14px 36px;border-radius:10px;text-decoration:none;letter-spacing:0.02em;box-shadow:0 4px 16px rgba(20,83,45,0.35);">
              Start Learning Now →
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
          <p style="color:#9ca3af;font-size:12px;margin:0;line-height:1.6;">
            You're receiving this because you created an account on 90-Days Freedom System.<br/>
            If this wasn't you, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  });
}

// ─── Send confirmation to job applicant ──────────────────────────────────────
async function sendJobApplicationConfirmation({ name, email, jobTitle }) {
  const transporter = createTransporter();
  const firstName = name.split(" ")[0];
  const appUrl = process.env.CLIENT_ORIGIN || "http://localhost:4000";

  await transporter.sendMail({
    from: `"90-Days Freedom System" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: `Application Received — ${jobTitle}`,
    html: `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#063114,#0d4a1e);padding:32px 40px;border-radius:12px 12px 0 0;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
            <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#14532d,#22c55e);display:flex;align-items:center;justify-content:center;text-align:center;">
              <span style="color:white;font-weight:800;font-size:11px;display:block;line-height:1.2;">90<br/><span style="font-size:8px;font-weight:600;">Days</span></span>
            </div>
            <span style="color:white;font-weight:700;font-size:16px;">90-Days Freedom System</span>
          </div>
          <h1 style="color:white;font-size:22px;font-weight:800;margin:0;line-height:1.3;">
            Application Received! 🎉
          </h1>
          <p style="color:rgba(255,255,255,0.65);font-size:14px;margin:8px 0 0;">
            Thanks for applying, ${firstName}.
          </p>
        </div>

        <!-- Body -->
        <div style="padding:32px 40px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:14px;line-height:1.7;margin-top:0;">
            Hi <strong>${firstName}</strong>,
          </p>
          <p style="color:#374151;font-size:14px;line-height:1.7;">
            We've successfully received your application for <strong>"${jobTitle}"</strong> at 90-Days Freedom System. Our hiring team will carefully review it and reach out to qualified candidates within <strong>5–7 business days</strong>.
          </p>

          <div style="background:#f0fdf4;border-left:4px solid #22c55e;border-radius:0 8px 8px 0;padding:14px 18px;margin:24px 0;">
            <p style="color:#14532d;font-size:13px;font-weight:600;margin:0 0 6px;">What happens next?</p>
            <ul style="color:#374151;font-size:13px;margin:0;padding-left:18px;line-height:1.9;">
              <li>Our hiring team reviews your application</li>
              <li>Shortlisted candidates are contacted for an initial screening call</li>
              <li>Interviews are scheduled with the relevant team members</li>
              <li>Offer extended to the best-fit candidate</li>
            </ul>
          </div>

          <p style="color:#374151;font-size:14px;line-height:1.7;">
            While you wait, feel free to explore our courses and community — we'd love for you to experience what we're building.
          </p>

          <a href="${appUrl}/job-board"
            style="display:inline-block;background:linear-gradient(135deg,#14532d,#16a34a);color:white;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;margin-top:8px;">
            View Other Openings
          </a>

          <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;" />

          <p style="color:#9ca3af;font-size:12px;line-height:1.6;margin:0;">
            You're receiving this because you applied for a position at 90-Days Freedom System.
            If this wasn't you, please ignore this email.
          </p>
        </div>
      </div>
    `,
  });
}

// ─── Notify admin of new job application ─────────────────────────────────────
async function notifyAdminJobApplication({ fullName, email, phone, githubUrl, linkedinUrl, jobTitle, jobId }) {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"90-Days Freedom System" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `📋 New Application: ${jobTitle}`,
    html: `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:560px;margin:0 auto;">
        <div style="background:#063114;padding:24px 32px;border-radius:12px 12px 0 0;">
          <h2 style="color:white;margin:0;font-size:18px;">New Job Application</h2>
          <p style="color:rgba(255,255,255,0.6);font-size:13px;margin:4px 0 0;">Position: ${jobTitle} (${jobId})</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:24px 32px;border-radius:0 0 12px 12px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${[
              ["Name", fullName],
              ["Email", email],
              ["Phone", phone || "—"],
              ["GitHub", githubUrl ? `<a href="${githubUrl}" style="color:#14532d;">${githubUrl}</a>` : "—"],
              ["LinkedIn", linkedinUrl ? `<a href="${linkedinUrl}" style="color:#14532d;">${linkedinUrl}</a>` : "—"],
              ["Position", jobTitle],
            ].map(([label, value]) => `
              <tr>
                <td style="padding:8px 0;color:#6b7280;font-weight:600;width:90px;vertical-align:top;">${label}</td>
                <td style="padding:8px 0;color:#111827;">${value}</td>
              </tr>
            `).join("")}
          </table>
        </div>
      </div>
    `,
  });
}

module.exports = { sendAcknowledgment, notifyAdmin, sendWelcomeEmail, sendJobApplicationConfirmation, notifyAdminJobApplication };
