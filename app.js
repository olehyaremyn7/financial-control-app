const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const AuthorizationRouter = require('./routes/authorization.routes');
const AccountRouter = require('./routes/account.routes');
const TransactionRouter = require('./routes/transaction.routes');
const SourceRouter = require('./routes/source.routes');
const ProfileRouter = require('./routes/profile.routes');
const AboutRouter = require('./routes/about.routes');

const app = express();

app.use(passport.initialize());
require('./middleware/passport.middleware')(passport);

app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/authorization', AuthorizationRouter);
app.use('/api/account', AccountRouter);
app.use('/api/transaction', TransactionRouter);
app.use('/api/source', SourceRouter);
app.use('/api/profile', ProfileRouter);
app.use('/api/about', AboutRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'))
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        )
    })
}

module.exports = app;
