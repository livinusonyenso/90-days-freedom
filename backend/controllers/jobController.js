const JobApplicationModel = require("../models/jobApplicationModel");
const { sendJobApplicationConfirmation, notifyAdminJobApplication } = require("../services/emailService");

// ─── POST /job-application ────────────────────────────────────────────────────
async function submitJobApplication(req, res) {
  try {
    const { jobId, jobTitle, fullName, email, phone, githubUrl, linkedinUrl } = req.body;

    // Save to database
    await JobApplicationModel.create({ jobId, jobTitle, fullName, email, phone, githubUrl, linkedinUrl });

    // Send emails in parallel (non-blocking)
    Promise.all([
      sendJobApplicationConfirmation({ name: fullName, email, jobTitle }),
      notifyAdminJobApplication({ fullName, email, phone, githubUrl, linkedinUrl, jobTitle, jobId }),
    ]).catch((err) => {
      console.error("Job application email error (non-critical):", err.message);
    });

    return res.status(201).json({
      success: true,
      message: "Application received! We'll review it and get back to you within 5–7 business days.",
    });
  } catch (err) {
    console.error("Job application submit error:", err);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}

// ─── GET /admin/job-applications ──────────────────────────────────────────────
async function getAllJobApplications(req, res) {
  try {
    const applications = await JobApplicationModel.findAll();
    return res.status(200).json({ success: true, count: applications.length, applications });
  } catch (err) {
    console.error("Admin getJobApplications error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
}

module.exports = { submitJobApplication, getAllJobApplications };
