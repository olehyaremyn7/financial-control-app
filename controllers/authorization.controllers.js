const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/keys.config');
const error = require('../utils/error-handler.utils');

module.exports.loginController = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found. Check input data' });
        }

        const isMatch = await bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(409).json({ message: 'Wrong password. Try again' });
        }

        const token = jwt.sign(
            { userId: user._id,
                email: user.email },
            config.jwt,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token: `Bearer ${token}` });

    } catch (e) {
        error(res, e);
    }
};

module.exports.registrationController = async (req, res) => {
    try {

        const { email, password } = req.body;
        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(409).json({ message: 'This email is already in use. Enter another email' });
        }

        const hashedPassword = await bcrypt.hashSync(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'User successfully created' });

    } catch (e) {
        error(res, e);
    }
};
