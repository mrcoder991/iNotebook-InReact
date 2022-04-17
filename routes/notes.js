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

// ROUTE 2 :Add a new note using: POST "/api/notes/addnote". Dosen't require (Login)Auth
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


// ROUTE 3 :Update existing note using: PUT "/api/notes/updatenote". Dosen't require (Login)Auth
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //Create newNote Object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
    
        //Find a note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send('Not found') };
        
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Some internal error occured')
    } 
  });


// ROUTE 4 :Delete existing note using: DELETE "/api/notes/deletenote". Dosen't require (Login)Auth
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
      //Find a note to be deleted and delete it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send('Not found') };
      
      //Allow deletion only if this note belong to logged in user
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send('Not Allowed')
      }

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
    
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Some internal error occured')
  } 
});
module.exports = router;
