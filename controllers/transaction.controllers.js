const error = require('../utils/error-handler.utils');
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

function periodBalance() {

}

module.exports.getByAccountIdController = async (req, res) => {

    const query = { account: req.params.accountId, user: req.user.id }

    if (req.query.start) {
        query.date = {
            $gte: req.query.start
        }
    }

    if (req.query.end) {
        if (!query.date) {
            query.date = {}
        }

        query.date['$lte'] = req.query.end
    }

    if (req.query.transaction) {
        query.type = req.query.transaction
    }

    if (req.query.appointment) {
        query.appointment = req.query.appointment
    }

    if (req.query.source) {
        query.source = req.query.source
    }

    try {

        const transaction = await Transaction
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)

        res.status(200).json(transaction);

    } catch (e) {
        error(res, e);
    }
};

module.exports.createExpenseController = async (req, res) => {
    try {

        const { type, price, appointment, note, account, date } = req.body;

        const selectedAccount = await Account.findById(account);
        const newAccountData = {
            title: selectedAccount.title,
            balance: selectedAccount.balance - price,
            user: req.user.id,
            expenses: selectedAccount.expenses + price,
            incomes: selectedAccount.incomes,
            periodBalance: selectedAccount.periodBalance
        };

        await Account.findOneAndUpdate(
            { _id: account },
            { $set: newAccountData },
            { new: true }
        );

        const transaction = await Transaction({
            type,
            account,
            user: req.user.id,
            price,
            appointment,
            note,
            date
        });

        await transaction.save();

        res.status(201).json({ message: 'New transaction was successfully created', transaction });

    } catch (e) {
        error(res, e);
    }
}

module.exports.createProfitController = async (req, res) => {
    try {

        const { type, price, source, note, account, date } = req.body;

        const selectedAccount = await Account.findById(account);
        const newAccountData = {
            title: selectedAccount.title,
            balance: selectedAccount.balance + price,
            user: req.user.id,
            expenses: selectedAccount.expenses,
            incomes: selectedAccount.incomes + price,
            periodBalance: selectedAccount.periodBalance
        };

        await Account.findOneAndUpdate(
            { _id: account },
            { $set: newAccountData },
            { new: true }
        );

        const transaction = await Transaction({
            type,
            account,
            user: req.user.id,
            price,
            source,
            note,
            date
        });

        await transaction.save();

        res.status(201).json({ message: 'New transaction was successfully created', transaction });

    } catch (e) {
        error(res, e);
    }
}

module.exports.removeController = async (req, res) => {
    try {

        const beforeRemoveTransaction = await Transaction.findById({ _id: req.params.id });
        const selectedAccount = await Account.findById(beforeRemoveTransaction.account);

        switch (beforeRemoveTransaction.type) {
            case 'Expense':
                const newAccountDataExpense = {
                    title: selectedAccount.title,
                    balance: selectedAccount.balance + beforeRemoveTransaction.price,
                    user: req.user.id,
                    expenses: selectedAccount.expenses - beforeRemoveTransaction.price,
                    incomes: selectedAccount.incomes,
                    periodBalance: selectedAccount.periodBalance
                };

                await Account.findOneAndUpdate(
                    { _id: beforeRemoveTransaction.account },
                    { $set: newAccountDataExpense },
                    { new: true }
                );
                break;
            case 'Profit':
                const newAccountDataProfit = {
                    title: selectedAccount.title,
                    balance: selectedAccount.balance - beforeRemoveTransaction.price,
                    user: req.user.id,
                    expenses: selectedAccount.expenses,
                    incomes: selectedAccount.incomes - beforeRemoveTransaction.price,
                    periodBalance: selectedAccount.periodBalance
                };

                await Account.findOneAndUpdate(
                    { _id: beforeRemoveTransaction.account },
                    { $set: newAccountDataProfit },
                    { new: true }
                );
                break;
        }

        await Transaction.remove({ _id: req.params.id });

        res.status(200).json({ message: 'Transaction has been deleted' });

    } catch (e) {
        error(res, e);
    }
};

module.exports.updateController = async (req, res) => {
    try {

        const beforeUpdateTransaction = await Transaction.findById({ _id: req.params.id });
        const selectedAccount = await Account.findById(beforeUpdateTransaction.account);

        switch (beforeUpdateTransaction.type) {
            case 'Expense':
                const beforeNewAccountDataExpense = {
                    title: selectedAccount.title,
                    balance: selectedAccount.balance + beforeUpdateTransaction.price,
                    user: req.user.id,
                    expenses: selectedAccount.expenses - beforeUpdateTransaction.price,
                    incomes: selectedAccount.incomes,
                    periodBalance: selectedAccount.periodBalance
                };

                const newAccountDataExpense = {
                    title: beforeNewAccountDataExpense.title,
                    balance: beforeNewAccountDataExpense.balance - req.body.price,
                    user: beforeNewAccountDataExpense.user,
                    expenses: beforeNewAccountDataExpense.expenses + req.body.price,
                    incomes: selectedAccount.incomes,
                    periodBalance: selectedAccount.periodBalance
                };

                await Account.findOneAndUpdate(
                    { _id: beforeUpdateTransaction.account },
                    { $set: newAccountDataExpense },
                    { new: true }
                );
                break;
            case 'Profit':
                const beforeNewAccountDataProfit = {
                    title: selectedAccount.title,
                    balance: selectedAccount.balance - beforeUpdateTransaction.price,
                    user: req.user.id,
                    expenses: selectedAccount.expenses,
                    incomes: selectedAccount.incomes - beforeUpdateTransaction.price,
                    periodBalance: selectedAccount.periodBalance
                };

                const newAccountDataProfit = {
                    title: beforeNewAccountDataProfit.title,
                    balance: beforeNewAccountDataProfit.balance + req.body.price,
                    user: beforeNewAccountDataProfit.user,
                    expenses: beforeNewAccountDataProfit.expenses,
                    incomes: beforeNewAccountDataProfit.incomes + req.body.price,
                    periodBalance: beforeNewAccountDataProfit.periodBalance
                };

                await Account.findOneAndUpdate(
                    { _id: beforeUpdateTransaction.account },
                    { $set: newAccountDataProfit },
                    { new: true }
                );
                break;
        }

        const transaction = await Transaction.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({ message: 'Transaction was successfully updated', transaction });

    } catch (e) {
        error(res, e);
    }
};
