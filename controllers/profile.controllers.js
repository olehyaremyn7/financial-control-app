const bcrypt = require('bcryptjs');
const error = require('../utils/error-handler.utils');
const User = require('../models/User');

module.exports.getController = async (req, res) => {
    try {

        const user = await User.find({ _id: req.user.id });
        res.status(200).json(user);

    } catch (e) {
        error(res, e);
    }
};

module.exports.createNewDataController = async (req, res) => {
    try {

        const updated = { name: req.body.name, image: req.file ? req.file.path : '' };

        const user = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: updated },
            { new: true }
        );

        res.status(200).json({ message: 'User data was successfully updated', user });

    } catch (e) {
        error(res, e)
    }
}

module.exports.updateController = async (req, res) => {
    try {

        const hashedPassword = await bcrypt.hashSync(req.body.password, 12);
        const updated = { email: req.body.email, password: hashedPassword };

        const user = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: updated },
            { new: true }
        );

        res.status(200).json({ message: 'User data was successfully updated', user });

    } catch (e) {
        error(res, e);
    }
};
