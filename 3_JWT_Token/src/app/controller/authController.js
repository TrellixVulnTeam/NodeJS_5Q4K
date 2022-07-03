const User = require('../models/User');

const bcrypt = require('bcrypt');

const authController = {
    // REGISTER
    async registerUser (req, res) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)
    
            // Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed
            });

            // // Save to DB
            const user = await newUser.save()
            res.status(200).json(newUser)

        } catch (error) {
            res.status(500).json(error)
        }
    },

    // LOGIN
    async loginUser (req, res) {
        try {
            const user = await User.findOne({ username: req.body.username })
            if(!user) {
                res.status(404).json('Wrong Username...');
            }
            const validPassword = await bcrypt.compare(
                req.body.password, user.password
            )
            if(!validPassword) {
                res.status(404).json('Wrong Password...')
            }
            if (user && validPassword) {
                res.status(200).json(user)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = authController