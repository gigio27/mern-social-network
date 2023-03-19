const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }))
app.use(cookieParser());
app.use(morgan('dev'));

// jwt to verify every request 
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

// routes
app.use('/api/user', userRoutes);

// server 
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

