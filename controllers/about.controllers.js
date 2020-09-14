const error = require('../utils/error-handler.utils')
const Message = require('../models/Message')

module.exports.messageController = async (req, res) => {
    try {

        const { name, email, message } = req.body;

        const newMessage = new Message({
            user: req.user.id,
            name,
            email,
            message
        });

        await newMessage.save();

        res.status(200).json({ message: 'Thank you for your message', newMessage });

    } catch (e) {
        error(res, e);
    }
}
