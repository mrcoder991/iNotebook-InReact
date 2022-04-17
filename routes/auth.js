const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



const secret = process.env.SECRET || "itsuday991"

// ROUTE 1 :Create a User using: POST "/api/auth/createuser". Dosen't require (Login)Auth

router.post('/createuser', [
    body('email','Enter a valid email').isEmail(),
    body('name', 'Name must be at least of 3 characters').isLength({ min: 3 }),
    body('password','Password must be at least of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //check weather the user with the same email exists allready
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(404).json({success, error: "Sorry an email with this email already exist"})
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt) ;
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authtoken});
    } catch (error) {
        console.error(error.message)
        res.status(500).send(success, 'Some internal error occured')
    }    
       
})




// ROUTE 2 : Authenticate a User using: POST "/api/auth/login". Dosen't require Login(Auth)
router.post('/login', [
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be empty').exists()
], async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and send to user 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false;
            return res.status(404).json({success: success,  error: "User with this email id does not exist" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false;
            return res.status(404).json({ error: "Please enter correct password" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success,authtoken});
    
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some internal error occured')
    }

})


// ROUTE 3 : Get logged in user details using : POST : /api/auth/getuser
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some internal error occured');
    }
})
module.exports = router