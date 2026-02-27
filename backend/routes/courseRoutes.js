const router = require("express").Router();
const Course = require("../models/Course");
const auth = require("../middleware/AuthMiddleware");

// POST /api/courses - Create a course
router.post("/", auth, async (req, res, next) => {
  try {
    const { courseName, courseDescription, instructor } = req.body;

    if (!courseName || !instructor) {
      return res.status(400).json({ message: "Course name and instructor are required" });
    }

    const course = await Course.create({ courseName, courseDescription, instructor });
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
});

// GET /api/courses - Get all courses
router.get("/", auth, async (req, res, next) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/courses/:id - Delete a course
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;