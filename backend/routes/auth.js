const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Create a User using: POST "/api/auth". Dosen't require Auth

router.post('/', [
    body('email','Enter a valid email').isEmail(),
    body('name', 'Name must be at least of 3 characters').isLength({ min: 3 }),
    body('password','Password must be at least of 5 characters').isLength({ min: 5 }),
], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user));
})

module.exports = router