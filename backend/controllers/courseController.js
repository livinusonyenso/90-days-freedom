// ─── GET /courses ─────────────────────────────────────────────────────────────
function getCourses(req, res) {
  // In production, query your courses table here.
  // Returning mock data to demonstrate the protected route works.
  return res.status(200).json({
    success: true,
    message: `Welcome ${req.user.name}. Here are your courses.`,
    user: { id: req.user.id, email: req.user.email },
    courses: [
      { id: "1", title: "Complete UI/UX Design Mastery", slug: "complete-uiux-design-mastery" },
      { id: "2", title: "Unity Game Development Bootcamp", slug: "unity-game-development-bootcamp" },
      { id: "3", title: "Building a Profitable Business Model", slug: "building-profitable-business-model" },
    ],
  });
}

// ─── GET /hire-talent ─────────────────────────────────────────────────────────
function getHireTalent(req, res) {
  return res.status(200).json({
    success: true,
    message: `Welcome ${req.user.name}. Hire talent page.`,
    user: { id: req.user.id, email: req.user.email },
  });
}

module.exports = { getCourses, getHireTalent };
