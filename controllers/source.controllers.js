const error = require('../utils/error-handler.utils');
const Source = require('../models/Source');

module.exports.getAllController = async (req, res) => {
    try {

        const sources = await Source.find({ user: req.user.id });
        res.status(200).json(sources);

    } catch (e) {
        error(res, e);
    }
};

module.exports.removeController = async (req, res) => {
    try {

        await Source.remove({ _id: req.params.id });

        res.status(200).json({ message: 'Source has been deleted' });

    } catch (e) {
        error(res, e);
    }
};

module.exports.createController = async (req, res) => {
    try {

        const source = new Source({
            value: req.body.value,
            viewValue: req.body.viewValue,
            user: req.user.id
        });

        await source.save();

        res.status(201).json({ message: 'New profit source was successfully created', source });

    } catch (e) {
        error(res, e);
    }
};
