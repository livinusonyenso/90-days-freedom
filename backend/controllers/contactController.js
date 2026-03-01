const ContactModel = require("../models/contactModel");
const { sendAcknowledgment, notifyAdmin } = require("../services/emailService");

// ─── POST /contact ────────────────────────────────────────────────────────────
async function submitContact(req, res) {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // 1. Save to database
    await ContactModel.create({ firstName, lastName, email, phone, subject, message });

    // 2. Send emails in parallel (non-blocking — don't fail the request if email fails)
    Promise.all([
      sendAcknowledgment({ firstName, email, subject }),
      notifyAdmin({ firstName, lastName, email, phone, subject, message }),
    ]).catch((err) => {
      console.error("Email send error (non-critical):", err.message);
    });

    return res.status(201).json({
      success: true,
      message: "Message received! We'll get back to you within 1–2 business days.",
    });
  } catch (err) {
    console.error("Contact submit error:", err);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}

// ─── GET /admin/contacts ──────────────────────────────────────────────────────
async function getAllContacts(req, res) {
  try {
    const contacts = await ContactModel.findAll();
    return res.status(200).json({ success: true, count: contacts.length, contacts });
  } catch (err) {
    console.error("Admin getContacts error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
}

module.exports = { submitContact, getAllContacts };
