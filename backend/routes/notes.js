const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// ROUTE 1 :Fetch all notes of user using: GET "/api/notes/fetchallnotes". Dosen't require (Login)Auth
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);  
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Some internal error occured')
  } 
});

// ROUTE  :Add a new note using: POST "/api/notes/addnote". Dosen't require (Login)Auth
router.post( "/addnote", fetchuser,[
    body("title", "Title must be at least of 3 characters").isLength({min: 3,}),
    body("description","Description must be at least of 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some internal error occured')
    } 
  }
);

module.exports = router;
