const error = require('../utils/error-handler.utils');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

module.exports.getAllController = async (req, res) => {
    try {

        const accounts = await Account.find({ user: req.user.id });
        res.status(200).json(accounts);

    } catch (e) {
        error(res, e);
    }
};

module.exports.getByIdController = async (req, res) => {
    try {

        const account = await Account.findById(req.params.id);
        res.status(200).json(account);

    } catch (e) {
        error(res, e);
    }
};

module.exports.removeController = async (req, res) => {
    try {

        await Account.remove({ _id: req.params.id });
        await Transaction.remove({ account: req.params.id });

        res.status(200).json({ message: 'Account has been deleted' });

    } catch (e) {
        error(res, e);
    }
};

module.exports.createController = async (req, res) => {
    try {

        const account = new Account({
            title: req.body.title,
            balance: req.body.balance,
            user: req.user.id
        });

        await account.save();

        res.status(201).json({ message: 'New account was successfully created', account });

    } catch (e) {
        error(res, e);
    }
};

module.exports.updateController = async (req, res) => {
    try {

        const updated = { title: req.body.title, balance: req.body.balance };

        const account = await Account.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updated },
            { new: true }
        );

        res.status(200).json({ message: 'Account was successfully updated', account });

    } catch (e) {
        error(res, e);
    }
};
