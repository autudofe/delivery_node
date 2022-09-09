require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const errorMiddleware = require('./middleware/errorMiddleware');

const {usersRouter} = require('./route/usersRouter');
const {trucksRouter} = require('./route/trucksRouter');
const {loadsRouter} = require('./route/loadsRouter');
const {authRouter} = require('./route/authRouter');

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(express.json());
app.use(cors({
    origin: CLIENT_URL
}));
app.use(morgan('tiny'));


app.use('/api/users/me', usersRouter);

app.use('/api/trucks', trucksRouter);

app.use('/api/loads', loadsRouter);

app.use('/api/auth', authRouter);


async function startApp() {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT || 8080, () =>
            console.log('SERVER STARTED ON PORT ' + PORT));
    } catch (err) {
        console.error(`Error on server startup: ${err.message}`);
    }
}

startApp();


// ERROR HANDLER
app.use(errorMiddleware);


