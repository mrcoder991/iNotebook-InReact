const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Create a User using: POST "/api/auth/createuser". Dosen't require Auth

router.post('/createuser', [
    body('email','Enter a valid email').isEmail(),
    body('name', 'Name must be at least of 3 characters').isLength({ min: 3 }),
    body('password','Password must be at least of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check weather the user with the same email exists allready
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(404).json({error: "Sorry an email with this email already exist"})
        }

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        res.json(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some internal error occured')
    }    
        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err) 
        //     res.json({error : 'please enter a unique value for email', message : err.message})
        // })
})

module.exports = router