const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
//@route : test route
router.post("/test", (req, res) => {
  console.log(req.body);
  return res.json({ msg: "Submitted" });
});

//@route :  /api/task
//@access:  private
//@desc  :  Create new Task
router.post(
  "/",
  auth,
  check("title", "title is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description } = req.body;
      // console.log(req.user.is)
      const user = await User.findById(req.user.id);
      const task = new Task({
        title,
        description,
        user,
      });
      await task.save();
      return res.json(task);
    } catch (error) {
      console.log(error.message);
    }
  }
);

//@route :  /api/task
//@access:  private
//@desc  :  Delete Task

router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).json({ msg: "task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "User not Authorized" });
    }
    await task.remove();
    return res.json({ msg: "Task removed" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@route :  /api/task/all
//@access:  public
//@desc  :  get all the Task in database
router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find().populate("user", ["name", "email"]);

    if (!tasks) {
      return res.status(400).json({ msg: "Task List is empty" });
    }

    return res.json(tasks);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});
//@route :  /api/task/:id
//@access:  private
//@desc  :  Update Task
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(400).json({ msg: "Task Not found" });
    }

    return res.json(task);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@route :  /api/task/:id
//@access:  private
//@desc  :  Update Task
router.put(
  "/:id",
  auth,
  check("title", "title is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description } = req.body;
      // console.log(req.user.is)
      let task = await Task.findByIdAndUpdate(
        req.params.id,
        { $set: { title: title, description: description } },
        { new: true }
      );
      if (!task) {
        return res.status(400).json({ msg: "Task Not found" });
      }

      return res.json(task);
    } catch (error) {
      console.log(error.message);
    }
  }
);
module.exports = router;
